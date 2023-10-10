import { RouteObject, useLocation, useRoutes, Navigate } from "react-router-dom";
import { Button, Result } from "antd";

import Layout from "src/layout";
import LoginPage from "src/pages/login";
import HomePage from "src/pages/home";

import { BasicRouteFC } from "./interface";
import { useRecoilValue } from "recoil";
import { tokenState } from "src/store/user";

import type { FC } from "react";
import type { TokenStore } from "src/store/user/interface";

const routes: RouteObject[] = [
	{
		path: "",
		element: <Navigate to={BasicRouteFC.RoutesDict.首页} />,
	},
	{
		path: BasicRouteFC.RoutesDict.登录,
		element: <LoginPage />,
	},
	{
		path: "/admin",
		element: <Layout />,
		children: [
			{
				path: "",
				element: <Navigate to={BasicRouteFC.RoutesDict.首页} replace />,
			},
			{
				path: BasicRouteFC.RoutesDict.首页,
				element: <HomePage />,
			},
			{
				path: "*",
				element: (
					<Result
						status="404"
						title="404"
						subTitle="页面跑丢了~"
						extra={
							<Button type="primary" href="/admin">
								回到首页
							</Button>
						}
					/>
				),
			},
		],
	},
	{
		path: "*",
		element: (
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={
					<Button type="primary" href="/admin/main">
						Back Home
					</Button>
				}
			/>
		),
	},
];

const BasicRoute: FC = () => {
	const token = useRecoilValue<TokenStore.defaultValueType>(tokenState);
	const routesElement = useRoutes(routes);
	const { pathname } = useLocation();

	const whiteList: BasicRouteFC.WhiteListItem[] = [
		{
			path: BasicRouteFC.RoutesDict.登录,
			exact: true,
		},
		{
			path: "",
			exact: true,
		},
	];

	if (whiteList.every(({ exact, path }) => (exact ? path !== pathname : !pathname.startsWith(path))) && !token) {
		return <Navigate to={BasicRouteFC.RoutesDict.登录} replace />;
	}

	return routesElement;
};

export default BasicRoute;
