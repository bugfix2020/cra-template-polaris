import { Typography } from "antd";
import { ProTable } from "@ant-design/pro-components";

import type { FC } from "react";
import type { ProColumns } from "@ant-design/pro-components";
const HomePage: FC = () => {
	const columns: ProColumns<any>[] = [
		{ title: "姓名", dataIndex: "name", align: "center" },
		{ title: "年龄", dataIndex: "age", align: "center" },
		{ title: "性别", dataIndex: "sex", align: "center" },
		{ title: "状态", dataIndex: "status", align: "center", hideInSearch: true },
		{ title: "登录时间", dataIndex: "loginTime", align: "center", valueType: "dateTime" },
		{
			title: "操作",
			align: "center",
			valueType: "option",
			render: () => [
				<Typography key="edit">编辑</Typography>,
				<Typography key="delete">删除</Typography>,
				// 把true改成false后看页面有什么变化？
				true && <Typography key="禁用">编辑</Typography>,
			],
		},
	];

	return <ProTable columns={columns} />;
};

export default HomePage;
