import { Request } from "./request";
import { convertValueEnum } from "src/tools/uitls";

import type { Method } from "axios";

// example 按照如下格式编写
export namespace UserLoginApi {
	export const requestUrl: typeof Request.ApiNameDict.用户登录 = Request.ApiNameDict.用户登录;
	export const requesMethod: Method = "post";

	// 登录类型
	export type Type = 1 | 2;

	// 登录类型字典
	export enum TypeDict {
		电子邮箱登录 = 1,
		手机号登录 = 2,
	}

	export interface RequestProps {
		account: string;
		password: string;
		code: number;
		type: Type;
	}

	export interface ResponseProps {
		ExpiresIn: number;
		pwdExpired: boolean;
		token: string;
		userInfo: UserInfoApi.ResponseProps;
	}
}

export namespace UserRegisterApi {
	export const requestUrl: typeof Request.ApiNameDict.用户注册 = Request.ApiNameDict.用户注册;
	export const requesMethod: Method = "post";

	export interface RequestProps {
		account: string;
		password: string;
		code: number;
	}

	export interface ResponseProps extends UserLoginApi.ResponseProps {}
}

export namespace UserInfoApi {
	export const requestUrl: typeof Request.ApiNameDict.用户详情 = Request.ApiNameDict.用户详情;
	export const requesMethod: Method = "get";

	// 用户类型
	export type AccountType = 1 | 2 /* | 3 */;

	// 实名认证审核状态
	export type CertifyAuditStatus = 0 | 1 | 2 | 3;

	// 创作人审核状态
	export type CreatorAuditStatus = 0 | 1 | 2 | 3;

	// 商户签约状态
	export type MerchantStatus = 0 | 1 | 2;

	// 上链状态
	export type ChainStatus = 0 | 1 | 2;

	// 账号有效状态
	export type AccountStatus = 1 | 2;

	// 用户有效状态
	export type UserStatus = 1 | 2;

	// 用户类型字典
	export enum AccountTypeDict {
		个人 = 1,
		企业 = 2,
		// 个体工商户 = 3,
	}

	// 实名认证审核状态字典
	export enum CertifyAuditStatusDict {
		待认证 = 0,
		审核通过 = 1,
		审核未通过 = 2,
		审核中 = 3,
	}

	// 创作人审核状态字典
	export enum CreatorAuditStatusDict {
		待认证 = 0,
		审核通过 = 1,
		审核未通过 = 2,
		审核中 = 3,
	}

	// 商户签约状态字典
	export enum MerchantStatusDict {
		待签约 = 0,
		已签约 = 1,
		签约失败 = 2,
	}

	// 商户签约状态字典
	export enum ChainStatusDict {
		待上链 = 0,
		已上链 = 1,
		上链失败 = 2,
	}

	// 账号有效状态字典
	export enum AccountStatusDict {
		有效 = 1,
		锁定 = 2,
	}

	// 用户有效状态字典
	export enum UserStatusDict {
		有效 = 1,
		锁定 = 2,
	}

	export interface RequestProps {
		userId: ResponseProps["userId"];
	}

	export interface ResponseProps {
		accountId: number;
		accountType: AccountType;
		userId: number;
		appNo: string;
		mobile: string;
		email: string;
		realName: string;
		shortName: string;
		certifyApplyTime: number;
		certifyAuditTime: number;
		certifyAuditStatus: CertifyAuditStatus;
		certifyRejectReason: string;
		creatorApplyTime: number;
		creatorAuditTime: number;
		creatorAuditStatus: CreatorAuditStatus;
		creatorRejectReason: string;
		merchantStatus: MerchantStatus;
		chainStatus: ChainStatus;
		chainTime: number;
		chainFailedReason: string;
		userAddress: string;
		userPrivateKey: string;
		credential: string;
		accountStatus: AccountStatus;
		userStatus: UserStatus;
		createTime: number;
		claim: UserRealNameApi.RequestProps["claim"];
		userCertificationInfo: UserCertificationInfo;
	}

	interface UserCertificationInfo {
		idNo: string;
		idPicFront: string;
		idPicBack: string;
		idPicHand: string;
		licenseNo: string;
		licensePic: string;
		legalPersonName: string;
		applyMaterial: string;
		contactName: string;
		contactPhone: string;
		contactAddress: string;
		logo: string;
	}
}

export namespace UserChangePwdApi {
	export const requestUrl: typeof Request.ApiNameDict.修改密码 = Request.ApiNameDict.修改密码;
	export const requesMethod: Method = "post";

	export interface RequestProps {
		password: string;
		oldPassword: string;
	}

	export type ResponseProps = null;
}

export namespace UserForgetPwdApi {
	export const requestUrl: typeof Request.ApiNameDict.忘记密码 = Request.ApiNameDict.忘记密码;
	export const requesMethod: Method = "post";

	export interface RequestProps {
		account: string;
		password: string;
		code: number;
	}

	export type ResponseProps = null;
}

export namespace UserRealNameApi {
	export const requestUrl: typeof Request.ApiNameDict.用户实名 = Request.ApiNameDict.用户实名;
	export const requesMethod: Method = "post";

	// 认证类型
	export type DidType = "individuality" | "enterprise" | "individualBusiness";

	// 认证类型字典
	export enum DidTypeDict {
		个人 = "individuality",
		企业 = "enterprise",
		个体工商户 = "individualBusiness",
	}

	export interface RequestProps {
		accountType: UserInfoApi.AccountType;
		realName: string;
		shortName: string;
		idNo: string;
		idPicFront: string;
		idPicBack: string;
		idPicHand: string;
		// 企业适用 start
		licenseNo?: string;
		licensePic?: string;
		legalPersonName?: string;
		// 企业适用 end
		contactName: string;
		contactPhone: string;
		contactAddress: string;
		logo: string;
		claim: {
			didType: DidType;
			name: string;
			profile: string;
			address: string;
			declareTime: string;
			extension: string;
		};
		// proof: string;
	}

	export interface ResponseProps {
		credentialId: number;
		certifyAuditStatus: UserInfoApi.ResponseProps["certifyAuditStatus"];
		credential: UserInfoApi.ResponseProps["credential"];
	}
}

export namespace UserCapitalApi {
	export const requestUrl: typeof Request.ApiNameDict.用户资金 = Request.ApiNameDict.用户资金;
	export const requesMethod: Method = "get";

	export type RequestProps = void;

	export interface ResponseProps {
		capitalBalance: number;
		presentBalance: number;
		frozenPaidAmount: number;
		frozenPresentAmount: number;
	}
}

export namespace UserCapitalListApi {
	export const requestUrl: typeof Request.ApiNameDict.用户资金明细 = Request.ApiNameDict.用户资金明细;
	export const requesMethod: Method = "get";

	/**
	 * @type
	 * @description 订单状态
	 */
	export type Status = 1 | 2 | 3;

	/**
	 * @type
	 * @description 交易类型
	 */
	export type TransactionType = 1 | 2;

	/**
	 * @enum
	 * @description 交易类型字典
	 */
	export enum TransactionTypeDict {
		充值 = 1,
		消费 = 2,
	}

	/**
	 * @enum
	 * @description 订单状态字典
	 */
	export enum StatusDict {
		成功 = 1,
		交易中 = 2,
		失败 = 3,
	}

	export const TransactionTypeValueEnum = convertValueEnum(UserCapitalListApi.TransactionTypeDict);

	export const StatusValueEnum = convertValueEnum(UserCapitalListApi.StatusDict);

	export interface RequestProps extends Request.Page {
		transactionType: TransactionType;
		status: Status;
	}

	export interface ResponseProps {
		transactionType: TransactionType;
		tradeNo: string;
		createTime: number;
		// 这个值没有具体给出枚举
		status: number;
		paidAmount: number;
		presentAmount: number;
	}
}

export namespace UserIndexStatisticsApi {
	export const requestUrl: typeof Request.ApiNameDict.用户首页数据统计 = Request.ApiNameDict.用户首页数据统计;
	export const requesMethod: Method = "get";

	export type RequestProps = void;

	export interface ResponseProps {
		compositionNum: number;
		copyrightNum: number;
		collectionNum: number;
		holdCollectionNum: number;
		capitalBalance: number;
		presentBalance: number;
		frozenPaidAmount: number;
		frozenPresentAmount: number;
		chargeNum: number;
		expendNum: number;
		dealAmount: number;
		dealNum: number;
		refundAmount: number;
		refundNum: number;
	}
}

export namespace UserBindApi {
	export const requestUrl: typeof Request.ApiNameDict.用户绑定账号 = Request.ApiNameDict.用户绑定账号;
	export const requesMethod: Method = "post";

	export interface RequestProps {
		account: string;
		code: number;
	}

	export type ResponseProps = void;
}

// test
export namespace EditUserInfoApi {
	export const requestUrl = Request.ApiNameDict.用户详情;
	export const requesMethod: Method = "get";

	// 用户类型
	export type UserType = 1 | 2 | 3;

	// 实名认证审核状态
	export type CertifyAuditStatus = 0 | 1 | 2 | 3;

	// 创作人审核状态
	export type CreatorAuditStatus = 0 | 1 | 2 | 3;

	// 商户签约状态
	export type MerchantStatus = 0 | 1 | 2;

	// 上链状态
	export type ChainStatus = 0 | 1 | 2;

	// 有效状态
	export type Status = 1 | 2;

	// 用户类型字典
	export enum UserTypeDict {
		个人 = 1,
		企业 = 2,
		个体工商户 = 3,
	}

	// 实名认证审核状态字典
	export enum CertifyAuditStatusDict {
		待认证 = 0,
		审核通过 = 1,
		审核未通过 = 2,
		审核中 = 3,
	}

	// 创作人审核状态字典
	export enum CreatorAuditStatusDict {
		待认证 = 0,
		审核通过 = 1,
		审核未通过 = 2,
		审核中 = 3,
	}

	// 商户签约状态字典
	export enum MerchantStatusDict {
		待签约 = 0,
		已签约 = 1,
		签约失败 = 2,
	}

	// 商户签约状态字典
	export enum ChainStatusDict {
		待上链 = 0,
		已上链 = 1,
		上链失败 = 2,
	}

	// 有效状态字典
	export enum ChainStatusDict {
		有效 = 1,
		锁定 = 2,
	}

	export interface RequestProps extends UserInfoApi.ResponseProps {}

	export interface ResponseProps {
		userId: number;
		appNo: string;
		accountId: number;
		userType: UserType;
		mobile: string;
		email: string;
		realName: string;
		shortName: string;
		idNo: string;
		idPicFront: string;
		idPicBack: string;
		idPicHand: string;
		licenseNo: string;
		licensePic: string;
		legalPersonName: string;
		certifyApplyTime: number;
		certifyAuditTime: number;
		certifyAuditStatus: CertifyAuditStatus;
		creatorApplyTime: number;
		creatorAuditTime: number;
		creatorAuditStatus: CreatorAuditStatus;
		merchantStatus: MerchantStatus;
		chainStatus: ChainStatus;
		userAddress: string;
		userPrivateKey: string;
		credentialId: number;
		status: Status;
		createTime: number;
	}
}
