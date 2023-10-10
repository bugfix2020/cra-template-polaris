/// <reference types="react-scripts" />
declare namespace NodeJS {
	interface ProcessEnv {
		readonly BUILD_PATH: "dist";
		readonly REACT_APP_SITE_TITLE: string;
		readonly REACT_APP_SITE_BASE_URL: string;
		readonly REACT_APP_APP_ID: string;
		readonly REACT_APP_API_BASE_URL: string;
		readonly REACT_APP_API_VERSION: string;
	}
}
