import { UserLoginApi } from "src/api";

export namespace UserInfoStore {
	export const key = "userInfo";
	export type KeyType = typeof key;

	export const defaultValue = undefined;
	export type defaultValueType = typeof defaultValue | UserLoginApi.ResponseProps;
}

export namespace TokenStore {
	export const key = "token";
	export type KeyType = typeof key;

	export const defaultValue = undefined;
	export type defaultValueType = typeof defaultValue | UserLoginApi.ResponseProps["token"];
}
