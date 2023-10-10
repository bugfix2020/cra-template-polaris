import { useState } from "react";
import { Image, message } from "antd";
import { ProFormUploadButton } from "@ant-design/pro-components";
import { BaseUploadFileApi, Request } from "src/api";

import type { FC } from "react";
import type { UploadFile } from "antd";
import type { UploadChangeParam } from "antd/lib/upload/interface";
import type { UploadFC } from "./interface";
import ErrorCodeDict from "src/config/errorCode";
import { useRecoilValue } from "recoil";
import { TokenStore } from "src/store/user/interface";
import { tokenState } from "src/store/user";

const Upload: FC<UploadFC.Props> = ({
	title,
	name,
	label,
	max,
	accept,
	action,
	fieldProps,
	onSuccess,
	onFail,
	...rest
}) => {
	const [imgSrc, setImgSrc] = useState<Record<"url" | "thumbUrl", string>>();

	const authorization = useRecoilValue<Exclude<TokenStore.defaultValueType, undefined>>(tokenState);

	fieldProps!.headers = { authorization, ...fieldProps?.headers };

	/**
	 * @method
	 * @description 上传文件的onchange
	 * @param {UploadChangeParam<UploadFile<Request.BaseResult<BaseUploadFileApi.ResponseProps>>>} info
	 * @returns {void}
	 */
	const onChange = (
		info: UploadChangeParam<UploadFile<Request.BaseResult<BaseUploadFileApi.ResponseProps>>>
	): void => {
		const {
			file: { status, response },
		} = info;
		if (status === "done" && !!response) {
			const { data, code, msg } = response;

			if (response instanceof Object) {
				if (code === ErrorCodeDict.操作成功) {
					const { url } = data;
					void message.success("上传成功");
					onSuccess?.(url);
				} else {
					void message.error(msg);
					onFail?.();
				}
			} else {
				onFail?.();
				void message.error("上传接口异常 请联系管理员");
			}
		}

		if (status === "error") {
			onFail?.();
			const label = "网络异常 上传失败";
			void message.error(label);
			console.group(label);
			console.error(JSON.stringify(info.file?.error));
			console.groupEnd();
		}
	};

	/**
	 * @method
	 * @description 上传文件的onchange
	 * @param {UploadFile<Request.BaseResult<BaseUploadFileApi.ResponseProps>>} file
	 * @returns {void}
	 */
	const onPreview = (file: UploadFile<Request.BaseResult<BaseUploadFileApi.ResponseProps>>): void => {
		file.status === "done" &&
			setImgSrc({
				url: String(file.response?.data.url),
				thumbUrl: String(file.response?.data.url),
			});
	};

	return (
		<>
			<ProFormUploadButton
				title={title}
				name={name as unknown}
				label={label}
				max={max}
				accept={accept}
				action={action}
				fieldProps={{
					...fieldProps,
					onPreview(file: UploadFile<Request.BaseResult<BaseUploadFileApi.ResponseProps>>) {
						console.log(file);
						// 此处只处理了最基础的预览效果 如不能满足要求可自定义前置hook
						fieldProps?.onPreview?.(file);
						onPreview(file);
					},
					onChange(info: UploadChangeParam<UploadFile<Request.BaseResult<BaseUploadFileApi.ResponseProps>>>) {
						// 若此处提供的预处理不能满足要求 可自定义onChange
						fieldProps?.onChange?.(info) ?? onChange(info);
					},
				}}
				{...rest}
			/>

			<Image
				width={0}
				height={0}
				style={{ display: "none" }}
				src={imgSrc?.thumbUrl}
				preview={{
					visible: !!imgSrc?.url,
					src: imgSrc?.url,
					destroyOnClose: true,
					onVisibleChange: (visible) => {
						!visible && setImgSrc(undefined);
					},
				}}
			/>
		</>
	);
};

Upload.defaultProps = {
	max: 1,
	accept: "image/*",
	action: process.env.REACT_APP_API_BASE_URL + BaseUploadFileApi.requestUrl,
	title: "上传文件",
	fieldProps: {
		method: BaseUploadFileApi.requesMethod,
		data: { fileType: BaseUploadFileApi.FileTypeDict.图片 },
		headers: {
			appid: process.env.REACT_APP_APP_ID,
			v: process.env.REACT_APP_API_VERSION,
		},
		name: "file",
		maxCount: 1,
	},
	rules: [
		{
			required: true,
			message: "请上传文件",
		},
	],
};

export default Upload;
