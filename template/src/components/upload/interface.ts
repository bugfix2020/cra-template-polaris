import type { ProFormUploadDraggerProps } from "@ant-design/pro-form/lib/components/UploadDragger";

export namespace UploadFC {
	export interface Props extends ProFormUploadDraggerProps {
		// 文件上传成功之后的callback
		onSuccess?: (imageUrl: string) => void;
		onFail?: () => void;
	}
}
