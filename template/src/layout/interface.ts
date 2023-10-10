import { UserChangePwdApi, UserInfoApi } from "src/api";

export interface UserTypeOptionsItem {
	label: keyof typeof UserInfoApi.AccountTypeDict;
	value: UserInfoApi.AccountType;
}

export interface ChangePwdFormProps extends UserChangePwdApi.RequestProps {
	_confirmPassword?: string;
}
