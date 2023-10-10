import { Request } from "./request";
import type { Method } from "axios";
import type { UploadProps } from "antd";

// example
export namespace BaseSendSmsApi {
	export const requestUrl: typeof Request.ApiNameDict.发送短信验证码 = Request.ApiNameDict.发送短信验证码;
	export const requesMethod: Method = "post";

	// 短信类型
	export type Type = 0 | 1 | 2 | 3 | 4;

	// 短信类型字典
	export enum TypeDict {
		通用,
		登录注册,
		绑定手机号,
		重置密码,
		忘记密码,
	}

	export interface RequestProps {
		type: Type;
		mobile: string;
	}

	export type ResponseProps = null;
}

export namespace BaseSendEmailApi {
	export const requestUrl: typeof Request.ApiNameDict.发送邮箱验证码 = Request.ApiNameDict.发送邮箱验证码;
	export const requesMethod: Method = "post";

	// 邮箱验证码类型
	export type Type = 0 | 1 | 2 | 3 | 4;

	// 邮箱验证码类型字典
	export enum TypeDict {
		通用,
		登录注册,
		绑定手机号,
		重置密码,
		忘记密码,
	}

	export interface RequestProps {
		type: Type;
		email: string;
	}

	export type ResponseProps = null;
}

export namespace BaseUploadFileApi {
	export const requestUrl: typeof Request.ApiNameDict.文件上传 = Request.ApiNameDict.文件上传;
	export const requesMethod: Required<UploadProps>["method"] = "post";

	// 文件类型
	export type FileType = 1;

	// 文件类型字典
	export enum FileTypeDict {
		图片 = 1,
	}

	export interface RequestProps {
		fileType: FileType;
		fileData: Buffer;
	}

	export interface ResponseProps {
		url: string;
	}
}
