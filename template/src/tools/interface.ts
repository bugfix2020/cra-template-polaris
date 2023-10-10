import { Request } from "src/api";

export namespace Utils {
	export namespace CatchException {
		export type returnType<T> = Request.BaseResult<T> | void;
	}

	export namespace Encryption {
		export type encryptionType = "MD5" | "AES" | "OTHER";
	}

	export namespace Decryption {
		export type decryptionType = "AES" | "OTHER";
	}

	export namespace EnumToOptions {
		export type ReturnType<T> = {
			value: keyof T;
			label: T[keyof T];
		}[];
	}
}
