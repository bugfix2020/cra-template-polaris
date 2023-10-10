import axios from "axios";
import { message } from "antd";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { tokenState, userInfoState } from "src/store/user";
import { catchException } from "src/tools/uitls";
import { recordCurrentRouteState } from "src/store/route";
import ErrorCodeDict from "src/config/errorCode";
import { BasicRouteFC } from "src/router/interface";

import type { TokenStore } from "src/store/user/interface";
import type { RecordCurrentRouteStore } from "src/store/route/interface";
import type { Request } from "src/api";
import type { Utils } from "src/tools/interface";
import type { UseAxiosHook } from "./interface";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * @hook
 * @description axios request Hook
 * @interface RequestProps
 * @interface ResponseProps
 * @return {(props: UseAxiosHook.Props<RequestProps>) => Promise<Utils.CatchException.returnType<ResponseProps>>}
 */
function useAxios<RequestProps, ResponseProps>(): (
	props: UseAxiosHook.Props<RequestProps>
) => Promise<Utils.CatchException.returnType<ResponseProps>> {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const authorization = useRecoilValue<Exclude<TokenStore.defaultValueType, undefined>>(tokenState);
	const setRecordCurrentRoute = useSetRecoilState<RecordCurrentRouteStore.defaultValueType>(recordCurrentRouteState);
	const resetUserInfo = useResetRecoilState(userInfoState);

	axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
	const _axios = axios.create({
		baseURL: process.env.REACT_APP_API_BASE_URL,
		timeout: 1000 * 60,
	});

	_axios.interceptors.request.use((config: AxiosRequestConfig<RequestProps>) => {
		config = {
			...config,
			headers: {
				authorization,
				appid: process.env.REACT_APP_APP_ID,
				v: process.env.REACT_APP_API_VERSION,
				...config.headers,
			},
		};

		return config;
	});

	_axios.interceptors.response.use((response: AxiosResponse<Request.BaseResult<ResponseProps>, RequestProps>) => {
		if ([ErrorCodeDict["您的账户信息已过期,请重新登录"]].includes(response.data.code)) {
			void message.warning("身份验证信息已过期,请重新登录!", 1, () => {
				setRecordCurrentRoute(pathname);
				resetUserInfo();
				navigate(BasicRouteFC.RoutesDict.登录, { replace: true });
			});

			return { code: ErrorCodeDict["您的账户信息已过期,请重新登录"], msg: "token无效", data: null };
		}

		return response.data;
	});

	return async (props: UseAxiosHook.Props): Promise<Utils.CatchException.returnType<ResponseProps>> => {
		const { axiosRequestConfig = {}, showErrorMsg = true } = props;

		return catchException<ResponseProps>(
			() =>
				_axios.request<unknown, Request.BaseResult<ResponseProps>, RequestProps>({
					...axiosRequestConfig,
				}),
			showErrorMsg
		);
	};
}

export default useAxios;
