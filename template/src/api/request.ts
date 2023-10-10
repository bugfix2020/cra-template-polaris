export namespace Request {
	export interface Page {
		page: number;
		limit: number;
	}

	/**
	 * @interface
	 * @description 接口基于列表的结构
	 * @author liuyuxuan
	 * @interface ListResult
	 * @template T 列表泛型
	 */
	export interface ListResult<T> {
		data: T[];
		count: number;
	}

	/**
	 * @interface
	 * @description 接口基于对象的结构
	 * @author liuyuxuan
	 * @interface ListResult
	 * @template T 列表泛型
	 * @template O 其他数据泛型
	 */
	export interface BaseResult<T> {
		code: number; // golang type = uint64  code >= 10000 业务错误  code >= 0 < 10000 通讯错误
		msg: string;
		data: T;
	}

	// 用户模块接口字典
	export enum ApiNameDict {
		用户登录 = "/user/login",
		用户注册 = "/user/register",
		用户详情 = "/user/info",
		修改密码 = "/user/change/pwd",
		忘记密码 = "/user/forget/pwd",
		用户实名 = "/user/real/name",
		用户资金 = "/user/capital",
		用户资金明细 = "/user/capital/list",
		用户首页数据统计 = "/user/index/statistics",
		用户绑定账号 = "/user/bind",
		发送短信验证码 = "/base/send/sms",
		发送邮箱验证码 = "/base/send/email",
		文件上传 = "/upload/file",
	}
}
