import type { RouteObject } from "react-router-dom";

export namespace BasicRouteFC {
	export const enum RoutesDict {
		登录 = "/login",
		首页 = "/admin/home",
	}

	export interface routesConfigItem {
		path: Required<RouteObject>["path"];
		needLogin: boolean;
		name: string;
		children?: routesConfigItem[];
	}

	export interface WhiteListItem {
		path: string;
		exact: boolean;
	}
}
