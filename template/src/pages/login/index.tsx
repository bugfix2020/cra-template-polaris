import {
	AlipayOutlined,
	LockOutlined,
	MobileOutlined,
	TaobaoOutlined,
	UserOutlined,
	WeiboOutlined,
} from "@ant-design/icons";
import {
	LoginFormPage,
	ProConfigProvider,
	ProFormCaptcha,
	ProFormCheckbox,
	ProFormText,
} from "@ant-design/pro-components";
import { Button, Divider, message, Space, Tabs, theme, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "src/store/user";

import type { CSSProperties, FC } from "react";
import { UserLoginApi } from "src/api";
import { BasicRouteFC } from "src/router/interface";
import { UserInfoStore } from "src/store/user/interface";
// import useAxios from "src/hooks/useAxios";
type LoginType = "phone" | "account";

const iconStyles: CSSProperties = {
	color: "rgba(0, 0, 0, 0.2)",
	fontSize: "18px",
	verticalAlign: "middle",
	cursor: "pointer",
};

const LoginPage: FC = () => {
	const [loginType, setLoginType] = useState<LoginType>("phone");

	const navigate = useNavigate();

	const setUserInfo = useSetRecoilState<UserInfoStore.defaultValueType>(userInfoState);

	const { token: antdToken } = theme.useToken();
	// const userLogin = useAxios<UserLoginApi.RequestProps, UserLoginApi.ResponseProps>();

	/**
	 * @async
	 * @method
	 * @description 用户登录
	 * @param {UserLoginApi.RequestProps} data 接口所需数据
	 * @returns
	 */
	const _userLogin = async (data: UserLoginApi.RequestProps) => {
		// 异常已由 userLogin接管 这里只需要提示成功或者做操作失败的回滚即可
		// const result = await userLogin({
		// 	axiosRequestConfig: {
		// 		url: UserLoginApi.requestUrl,
		// 		method: UserLoginApi.requesMethod,
		// 		data,
		// 	},
		// });

		// mock request success

		await Promise.resolve();
		const result: UserLoginApi.ResponseProps = {
			ExpiresIn: 9999999999,
			pwdExpired: false,
			token: "xxxxxx.yyyyyy.zzzzzz",
			userInfo: {
				realName: "Polaris",
				// 此处只是为了mock成功的状态 开发时必须禁用双重断言
			} as unknown as UserLoginApi.ResponseProps["userInfo"],
		};

		if (result !== void 0) {
			setUserInfo(result);
			navigate(BasicRouteFC.RoutesDict.首页);
			void message.success("登录成功");
		}
	};

	return (
		<ProConfigProvider dark={false} token={{ proComponentsCls: "" }}>
			<div
				style={{
					backgroundColor: "white",
					height: "100vh",
				}}
			>
				<LoginFormPage<UserLoginApi.RequestProps>
					backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
					logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
					title={process.env.REACT_APP_SITE_TITLE}
					subTitle="全球最大的代码托管平台"
					activityConfig={{
						style: {
							boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
							color: antdToken.colorTextHeading,
							borderRadius: 8,
							backgroundColor: "rgba(255,255,255,0.25)",
							backdropFilter: "blur(4px)",
						},
						title: "活动标题，可配置图片",
						subTitle: "活动介绍说明文字",
						action: (
							<Button
								size="large"
								style={{
									borderRadius: 20,
									background: antdToken.colorBgElevated,
									color: antdToken.colorPrimary,
									width: 120,
								}}
							>
								去看看
							</Button>
						),
					}}
					actions={
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "column",
							}}
						>
							<Divider plain>
								<span
									style={{
										color: antdToken.colorTextPlaceholder,
										fontWeight: "normal",
										fontSize: 14,
									}}
								>
									其他登录方式
								</span>
							</Divider>
							<Space align="center" size={24}>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										flexDirection: "column",
										height: 40,
										width: 40,
										border: "1px solid " + antdToken.colorPrimaryBorder,
										borderRadius: "50%",
									}}
								>
									<AlipayOutlined style={{ ...iconStyles, color: "#1677FF" }} />
								</div>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										flexDirection: "column",
										height: 40,
										width: 40,
										border: "1px solid " + antdToken.colorPrimaryBorder,
										borderRadius: "50%",
									}}
								>
									<TaobaoOutlined style={{ ...iconStyles, color: "#FF6A10" }} />
								</div>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										flexDirection: "column",
										height: 40,
										width: 40,
										border: "1px solid " + antdToken.colorPrimaryBorder,
										borderRadius: "50%",
									}}
								>
									<WeiboOutlined style={{ ...iconStyles, color: "#1890ff" }} />
								</div>
							</Space>
						</div>
					}
					onFinish={_userLogin}
				>
					<Tabs centered activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
						<Tabs.TabPane key={"account"} tab={"账号密码登录"} />
						<Tabs.TabPane key={"phone"} tab={"手机号登录"} />
					</Tabs>

					{loginType === "account" && (
						<>
							<ProFormText
								name="username"
								fieldProps={{
									size: "large",
									prefix: (
										<UserOutlined
											style={{
												color: antdToken.colorText,
											}}
											className={"prefixIcon"}
										/>
									),
								}}
								placeholder={"用户名: admin or user"}
								rules={[
									{
										required: true,
										message: "请输入用户名!",
									},
								]}
							/>
							<ProFormText.Password
								name="password"
								fieldProps={{
									size: "large",
									prefix: (
										<LockOutlined
											style={{
												color: antdToken.colorText,
											}}
											className={"prefixIcon"}
										/>
									),
								}}
								placeholder={"密码: ant.design"}
								rules={[
									{
										required: true,
										message: "请输入密码！",
									},
								]}
							/>
						</>
					)}
					{loginType === "phone" && (
						<>
							<ProFormText
								fieldProps={{
									size: "large",
									prefix: (
										<MobileOutlined
											style={{
												color: antdToken.colorText,
											}}
											className={"prefixIcon"}
										/>
									),
								}}
								name="mobile"
								placeholder={"手机号"}
								rules={[
									{
										required: true,
										message: "请输入手机号！",
									},
									{
										pattern: /^1\d{10}$/,
										message: "手机号格式错误！",
									},
								]}
							/>
							<ProFormCaptcha
								fieldProps={{
									size: "large",
									prefix: (
										<LockOutlined
											style={{
												color: antdToken.colorText,
											}}
											className={"prefixIcon"}
										/>
									),
								}}
								captchaProps={{
									size: "large",
								}}
								placeholder={"请输入验证码"}
								captchaTextRender={(timing, count) => {
									if (timing) {
										return `${count} ${"获取验证码"}`;
									}
									return "获取验证码";
								}}
								name="captcha"
								rules={[
									{
										required: true,
										message: "请输入验证码！",
									},
								]}
								onGetCaptcha={async () => {
									await Promise.resolve();
									void message.success("获取验证码成功！验证码为：1234");
								}}
							/>
						</>
					)}
					<div
						style={{
							marginBlockEnd: 24,
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<ProFormCheckbox noStyle name="autoLogin">
							自动登录
						</ProFormCheckbox>
						<Typography.Link href="https://baidu/com">忘记密码</Typography.Link>
					</div>
				</LoginFormPage>
			</div>
		</ProConfigProvider>
	);
};

export default LoginPage;
