/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { message } from "antd";
import { AxiosError } from "axios";
import cryptoJS, { AES, MD5, enc, mode, pad } from "crypto-js";
import type { Request } from "src/api";
import axiosErrorMap from "src/config/axiosError";
import ErrorCodeDict from "src/config/errorCode";
import type { Utils } from "./interface";

/**
 * @method
 * @description 用于处理接口数据的方法 统一处理
 * @version v1.0.2
 * @author liuyuxuan
 * @param {Promise<Request.BaseResult<R>} fn 异步方法 是请求数据接口
 * @param {boolean} showErrorMsg 是否提示接口或捕获错误信息
 * @returns {Promise<Request.BaseResult<R> | void>} 返回接口返回的数据 或 无返回值
 */
export const catchException = async <R = unknown>(
	fn: () => Promise<Request.BaseResult<R>>,
	showErrorMsg: boolean = true
): Promise<Utils.CatchException.returnType<R>> => {
	try {
		const xhrResult: Request.BaseResult<R> = await fn();
		/**
		 * 防止因网络等原因出现错误 未能按照预期返回泛型导致的异常 所以使用链式可选操作符
		 * code === 0 表示成功返回 反之则失败 [golang type = uint64]
		 * code >= 1 && code<=16 为grpc网关错误 非业务错误
		 */
		if (xhrResult?.code === ErrorCodeDict.操作成功) {
			return xhrResult;
		} else if (xhrResult?.code !== ErrorCodeDict["您的账户信息已过期,请重新登录"]) {
			let errorMessage: string = "服务繁忙 请联系管理员";
			if (xhrResult instanceof Object && !(xhrResult.code >= 1 && xhrResult.code <= 16)) {
				// 若未能在字典中找到对应msg 则直接使用后端提供的msg
				errorMessage = ErrorCodeDict[xhrResult.code] ?? xhrResult.msg;
			} else if (String(xhrResult).includes("Allowed memory size")) {
				errorMessage = "致命错误：数据量过大导致服务器内存溢出";
			}

			throw new Error(errorMessage);
		}
	} catch (error) {
		// 由于上方手动抛出了异常 所以错误必然是Error对象 此处只是为了ts推断类型
		let msg: string = "未知异常";
		if (error instanceof AxiosError) {
			const code = axiosErrorMap.get(String(error.code)) ?? ErrorCodeDict["unknown axios error"];
			msg = ErrorCodeDict[code];
		} else if (error instanceof Error) {
			msg = error.message;
		}
		console.error(error);
		showErrorMsg && void message.error(msg);
	}
};

/**
 * @method
 * @description setStorage的升级版本 会自动对value进行stringify并以加密形式存入
 * @author bugfix2019
 * @email liuyuxuan@inmyshow.com | ts02315607@163.com
 * @param {string} key 存入storage的key
 * @param {T} value 存入storage的value 自动对value进行stringify并以加密形式存入
 * @returns {void}
 * @example
 * setStorageForRecoil('a', 'user', 10086);
 * setStorageForRecoil('b', 'card', [1,2,3]);
 */
export const setStorageForRecoil = <T = unknown>(key: string, value: T): void => {
	const stringifyValue = JSON.stringify(value);
	const encryptionValue = encryption("AES", stringifyValue);
	if (String(encryptionValue).valueOf() === encryptionValue) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		localStorage.setItem(`RECOIL_${key}`, encryptionValue);
	}
};

/**
 * @method
 * @description getStorage的升级版本 会自动对获取到的内容进行parse并解密
 * @author bugfix2019
 * @email liuyuxuan@inmyshow.com | ts02315607@163.com
 * @param {string} key 存入storage的key
 * @param {T} defaultValue 可选参数 如果根据key取到的值为```undefined```或```null``` 则返回该默认值
 * @returns {T | V | undefined}
 * @example
 * getStorageForRecoil('a', 'user');
 * getStorageForRecoil('b', 'card', '返回的默认值');
 */
export const getStorageForRecoil = <T, V>(key: string, defaultValue: T): T | V => {
	const value = localStorage.getItem(`RECOIL_${key}`);
	if (value === null) {
		return defaultValue;
	}

	const decryptionValue = decryption("AES", value);
	if (String(decryptionValue).valueOf() === decryptionValue) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return JSON.parse(decryptionValue) as V;
	}

	return defaultValue;
};

/**
 * @method
 * @description 根据key 移除缓存在storage中的数据
 * @author bugfix2019
 * @email liuyuxuan@inmyshow.com | ts02315607@163.com
 * @param {string} key 存入storage的key
 * @example
 * removeStorageForRecoil('a');
 */
export const removeStorageForRecoil = (key: string): void => {
	localStorage.removeItem(`RECOIL_${key}`);
};

/**
 * @method
 * @description 对数据进行加密 详情 https://github.com/brix/crypto-js
 * @author bugfix2019
 * @email liuyuxuan@inmyshow.com | ts02315607@163.com
 * @param {encryptionType} type 加密的类型 如果值是AES或MD5会返回加密好的字符串 否则返回crypto实例
 * @param {string} message 要加密的文字
 * @param {string} key 加密用的秘钥 会自动进行utf8编码 仅AES方式需要此key
 * @returns {string | typeof cryptoJS} 已加密的字符串或cryptoJS实例
 * @example
 * encryption('MD5', '张三丰');  //output 4a6042865bf82a8311bc5fc53d7fc9fe
 * encryption('AES', '张三丰');  //output WBV+1iTfGk1eN2hxaWY/AA==
 *
 */
export const encryption = (
	type: Utils.Encryption.encryptionType,
	message: string,
	key: string = "ae0e4bda"
): string | typeof cryptoJS => {
	switch (type) {
		case "AES":
			return AES.encrypt(message, enc.Utf8.parse(key), {
				mode: mode.ECB,
				padding: pad.Pkcs7,
			}).toString();
		case "MD5":
			return MD5(message).toString();

		default:
			return cryptoJS;
	}
};

/**
 * @method
 * @description 对数据进行解密 详情 https://github.com/brix/crypto-js
 * @author bugfix2019
 * @email liuyuxuan@inmyshow.com | ts02315607@163.com
 * @param {decryptionType} type 解密的类型 如果值是AES会返回解密好的字符串 否则返回crypto实例
 * @param {string} message 要解密的内容
 * @param {string} key 解密用的秘钥 应当与加密时的秘钥一致 否则会解密失败 仅AES方式需要此key
 *
 * 特别注意：每一种加密模式的密码长度都不相同 如果解密失败 优先检查密码长度是否符合要求
 * @returns {string | typeof cryptoJS} 已解密的字符串或cryptoJS实例
 * @example
 * decryption('AES', 'WBV+1iTfGk1eN2hxaWY/AA=='); //output 张三丰
 */
export const decryption = (
	type: Utils.Decryption.decryptionType,
	message: string,
	key: string = "ae0e4bda"
): string | typeof cryptoJS => {
	switch (type) {
		case "AES":
			return AES.decrypt(message, enc.Utf8.parse(key), {
				mode: mode.ECB,
				padding: pad.Pkcs7,
			}).toString(enc.Utf8);

		default:
			return cryptoJS;
	}
};

/**
 * @method
 * @description ts enum转换为antdPro 所需的 valueEnum
 * @author bugfix2019
 * @email liuyuxuan@inmyshow.com | ts02315607@163.com
 * @param {T extends Record<number | string, number | string} dict ts enum 对象
 * @param {Array<string | number>} exclude 排除的key
 * @returns {Map<keyof T, T[keyof T]>}
 * @example
 * enum Test { a = 1, b = 2 };
 * enumToOptions(Test); //output Map(2) {1 => 'a', 2 => 'b'}
 */
export const convertValueEnum = <T extends Record<number | string, number | string>>(
	dict: T,
	exclude: Array<string | number> = [],
	forceCoverNumber: boolean = true
): Map<keyof T, T[keyof T]> => {
	const enumMap = new Map<keyof T, T[keyof T]>();

	let key: keyof T;
	for (key in dict) {
		!exclude.includes(key) && !isNaN(Number(key)) && enumMap.set(forceCoverNumber ? Number(key) : key, dict[key]);
	}

	return enumMap;
};
