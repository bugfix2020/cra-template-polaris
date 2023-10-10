import { useRecoilValue } from "recoil";
import { UserInfoApi } from "src/api";
import { userInfoState } from "src/store/user";
/**
 * @hook
 * @description 用户是否认证开发者
 * @returns {boolean}
 */
export default function useDeveloperState(): boolean {
	const userInfo = useRecoilValue(userInfoState);

	return userInfo?.userInfo.certifyAuditStatus === UserInfoApi.CertifyAuditStatusDict.审核通过;
}
