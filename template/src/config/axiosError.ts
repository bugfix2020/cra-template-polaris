import { AxiosError } from "axios";
import ErrorCodeDict from "./errorCode";

const axiosErrorMap = new Map<string, number>();
axiosErrorMap.set(AxiosError.ERR_NETWORK, ErrorCodeDict["网络不稳定,请检查网络连接后再试"]);
axiosErrorMap.set(AxiosError.ETIMEDOUT, ErrorCodeDict["请求超时,请稍后再试"]);
axiosErrorMap.set(AxiosError.ECONNABORTED, ErrorCodeDict["网络异常,连接被中止"]);
axiosErrorMap.set(AxiosError.ERR_CANCELED, ErrorCodeDict["请求被用户主动取消"]);
axiosErrorMap.set(AxiosError.ERR_BAD_REQUEST, ErrorCodeDict["无法处理错误的请求"]);
axiosErrorMap.set(AxiosError.ERR_BAD_RESPONSE, ErrorCodeDict["无法处理错误的响应"]);
axiosErrorMap.set(AxiosError.ERR_FR_TOO_MANY_REDIRECTS, ErrorCodeDict["无法处理错误的响应"]);

export default axiosErrorMap;
