import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import type { MutableSnapshot } from "recoil";
import BasicRoute from "./router";
import { getStorageForRecoil } from "./tools/uitls";
import { userInfoState } from "./store/user";
import { recordCurrentRouteState } from "./store/route";
import { recordOutTradeNoState } from "./store/pay";

import { UserInfoStore } from "./store/user/interface";
import { RecordCurrentRouteStore } from "./store/route/interface";
import { RecordOutTradeNoStore } from "./store/pay/interface";
import packageJson from "../package.json";

const { version } = packageJson;
console.table({ version });
function App() {
	const initializeState = ({ set }: MutableSnapshot) => {
		const userInfoValue = getStorageForRecoil<UserInfoStore.defaultValueType, UserInfoStore.defaultValueType>(
			UserInfoStore.key,
			UserInfoStore.defaultValue
		);

		const recordCurrentRouteValue = getStorageForRecoil<
			RecordCurrentRouteStore.defaultValueType,
			RecordCurrentRouteStore.defaultValueType
		>(RecordCurrentRouteStore.key, RecordCurrentRouteStore.defaultValue);

		const recordOutTradeNoValue = getStorageForRecoil<
			RecordOutTradeNoStore.defaultValueType,
			RecordOutTradeNoStore.defaultValueType
		>(RecordOutTradeNoStore.key, RecordOutTradeNoStore.defaultValue);

		// 用户信息
		set(userInfoState, userInfoValue);
		// 登录前 or 登录过期前 访问的页面 path + query
		set(recordCurrentRouteState, recordCurrentRouteValue);
		// 支付订单号
		set(recordOutTradeNoState, recordOutTradeNoValue);
	};

	return (
		<RecoilRoot initializeState={initializeState}>
			<BrowserRouter>
				<BasicRoute />
			</BrowserRouter>
		</RecoilRoot>
	);
}

export default App;
