import type { AxiosRequestConfig } from "axios";

export namespace UseAxiosHook {
	export interface Props<D = any> {
		axiosRequestConfig: AxiosRequestConfig<D>;
		showErrorMsg?: boolean;
	}
}
