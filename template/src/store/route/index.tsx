import { atom } from "recoil";
import { removeStorageForRecoil, setStorageForRecoil } from "src/tools/uitls";
import { RecordCurrentRouteStore } from "./interface";

// 登录过期时记录当前路由
export const recordCurrentRouteState = atom<RecordCurrentRouteStore.defaultValueType>({
	key: RecordCurrentRouteStore.key,
	default: RecordCurrentRouteStore.defaultValue,
	effects: [
		({ onSet }) => {
			onSet((newValue, oldValue, isReset) => {
				isReset
					? removeStorageForRecoil(recordCurrentRouteState.key)
					: setStorageForRecoil(recordCurrentRouteState.key, newValue);
			});
		},
	],
});
