import { AxiosError } from "axios"
import { Request } from "src/api"
import ErrorCodeDict from "src/config/errorCode"
import { catchException } from "./uitls"

describe("开始测试 utils工具", () => {
    describe("functional catchException", () => {
        test("resolve 【正常响应】", async () => {
            const result = catchException<number>(() => {
                return new Promise<Request.BaseResult<number>>((resolve) => {
                    setTimeout(() => {
                        return resolve({ code: ErrorCodeDict.操作成功, data: 1, msg: "" })
                    }, 300);
                })
            })

            await expect(result).resolves.toMatchObject({
                code: 0,
                data: expect.any(Number),
                msg: expect.any(String)
            })
        })

        test("reject 【接口返回业务逻辑错误】", async () => {
            const result = catchException<null>(() => {
                return new Promise<Request.BaseResult<null>>((resolve) => {
                    setTimeout(() => {
                        // 仅仅测试用例 非真实code code>16均为业务错误
                        return resolve({ code: 10_0019, data: null, msg: "数据已存在" })
                    }, 300);
                })
            })

            await expect(result).resolves.toEqual(undefined);
        })

        test("reject 【网络请求/响应时错误】", async () => {
            const result = catchException<null>(() => {
                return new Promise<Request.BaseResult<null>>((_, reject) => {
                    setTimeout(() => {
                        reject(new AxiosError(AxiosError.ERR_NETWORK, AxiosError.ERR_NETWORK));
                    }, 300);
                })
            })

            await expect(result).resolves.toEqual(undefined);
        })

        test("reject 【网关错误】", async () => {
            const result = catchException<null>(() => {
                return new Promise<Request.BaseResult<null>>((resolve) => {
                    setTimeout(() => {
                        return resolve({ code: 6, data: null, msg: "服务异常" })
                    }, 300);
                })
            })

            await expect(result).resolves.toEqual(undefined)
        })

        test("reject【内存溢出】", async () => {
            const result = catchException<never>(() => {
                return new Promise<string>((resolve) => {
                    setTimeout(() => {
                        return resolve("Fatal error: Allowed memory size of 134217728 bytes exhausted (tried to allocate 128 bytes")
                    }, 300);
                }) as any
            })

            await expect(result).resolves.toEqual(undefined)
        })
    })
})

export { }