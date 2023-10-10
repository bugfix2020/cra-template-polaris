import { atom, selector } from "recoil";
import { TokenStore, UserInfoStore } from "./interface";
import { removeStorageForRecoil, setStorageForRecoil } from "src/tools/uitls";

// 用户信息
export const userInfoState = atom<UserInfoStore.defaultValueType>({
	key: UserInfoStore.key,
	default: UserInfoStore.defaultValue,
	effects: [
		({ onSet }) => {
			onSet((newValue, oldValue, isReset) => {
				isReset ? removeStorageForRecoil(userInfoState.key) : setStorageForRecoil(userInfoState.key, newValue);
			});
		},
	],
});

// 登录token
export const tokenState = selector<Exclude<TokenStore.defaultValueType, undefined>>({
	key: TokenStore.key,
	get({ get }) {
		return get(userInfoState)?.token ?? "";
	},
});
