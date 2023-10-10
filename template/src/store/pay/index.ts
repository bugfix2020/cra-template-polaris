import { atom } from "recoil";
import { removeStorageForRecoil, setStorageForRecoil } from "src/tools/uitls";
import { RecordOutTradeNoStore } from "./interface";

// 登录过期时记录当前路由
export const recordOutTradeNoState = atom<RecordOutTradeNoStore.defaultValueType>({
	key: RecordOutTradeNoStore.key,
	default: RecordOutTradeNoStore.defaultValue,
	effects: [
		({ onSet }) => {
			onSet((newValue, oldValue, isReset) => {
				isReset
					? removeStorageForRecoil(RecordOutTradeNoStore.key)
					: setStorageForRecoil(RecordOutTradeNoStore.key, newValue);
			});
		},
	],
});
