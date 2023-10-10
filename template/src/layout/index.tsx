import { useEffect, useState } from "react";
import { UserOutlined, LockOutlined, LogoutOutlined, ChromeFilled } from "@ant-design/icons";
import ProLayout from "@ant-design/pro-layout";
import { ModalForm, ProFormText, getMenuData, ProBreadcrumb } from "@ant-design/pro-components";
import { Avatar, Space, Dropdown, message, Form } from "antd";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { userInfoState } from "src/store/user";
import { UserInfoStore } from "src/store/user/interface";
import { recordCurrentRouteState } from "src/store/route";
import { RecordCurrentRouteStore } from "src/store/route/interface";
import { UserChangePwdApi } from "src/api";
import { BasicRouteFC } from "src/router/interface";
import useAxios from "src/hooks/useAxios";
import dkPlus from "src/assets/dk-plus.jpg";
import type { FC } from "react";
import type { MenuInfo } from "rc-menu/lib/interface";
import type { ModalFormProps } from "@ant-design/pro-components";
import type { Route } from "@ant-design/pro-layout/es/typing";
import type { ChangePwdFormProps } from "./interface";

import "./index.scss";

const logo = "https://dcmp-img.stars-mine.com/image/2c/ba/2cba390dc7c7334fb6d310f19d01b9952d2b5aec.png";

export const Layout: FC = () => {
	const { pathname } = useLocation();

	const [searchParams, setSearchParams] = useSearchParams();

	const {
		userInfo: { realName, mobile, email },
	} = useRecoilValue<UserInfoStore.defaultValueType>(userInfoState)!;

	const setRecordCurrentRoute = useSetRecoilState<RecordCurrentRouteStore.defaultValueType>(recordCurrentRouteState)!;

	const resetUserInfo = useResetRecoilState(userInfoState);

	const navigate = useNavigate();

	const [changePwdFormVisible, setChangePwdFormVisible] = useState<Required<ModalFormProps>["visible"]>(false);

	const [form] = Form.useForm<UserChangePwdApi.RequestProps>();

	const userChangePwd = useAxios<UserChangePwdApi.RequestProps, UserChangePwdApi.ResponseProps>();

	const pwdExpired = searchParams.get("pwdExpired") as "true" | null;

	const routes: Route[] = [
		{
			icon: <ChromeFilled />,
			path: BasicRouteFC.RoutesDict.首页,
			name: "首页",
		},
		{
			icon: <ChromeFilled />,
			path: "/admin/a",
			name: "A页面",
			children: [
				{
					path: "/admin/a/1",
					name: "A-1页面",
					component: "./Welcome",
				},
				{
					path: "/admin/a/2",
					name: "A-2页面",
					component: "./Welcome2",
				},
			],
		},
	];

	const { menuData } = getMenuData(routes);

	useEffect(() => {
		pwdExpired === "true" && setChangePwdFormVisible(true);
	}, [pwdExpired]);

	/**
	 * @method
	 * @async
	 * @description 转换修改密码所需数据
	 * @param {ChangePwdFormProps} values
	 * @returns {Promise<void>}
	 */
	const _coverUserChangePwdData = async (values: ChangePwdFormProps): Promise<void> => {
		delete values._confirmPassword;

		await _userChangePwd(values);
	};

	/**
	 * @method
	 * @async
	 * @description 修改密码
	 * @param {UserChangePwdApi.RequestProps} data
	 * @returns {Promise<void>}
	 */
	const _userChangePwd = async (data: UserChangePwdApi.RequestProps): Promise<void> => {
		const result = await userChangePwd({
			axiosRequestConfig: {
				url: UserChangePwdApi.requestUrl,
				method: UserChangePwdApi.requesMethod,
				data,
			},
		});

		if (result !== undefined) {
			void message.success("修改成功 请重新登陆", 1.5, () => {
				setChangePwdFormVisible(false);
				setRecordCurrentRoute(`${pathname}?${searchParams.toString()}`);

				resetUserInfo();
				navigate(BasicRouteFC.RoutesDict.登录, { replace: true });
			});
		}
	};

	return (
		<div>
			<ProLayout
				fixedHeader
				fixSiderbar
				navTheme="light"
				layout="mix"
				title={process.env.REACT_APP_SITE_TITLE}
				logo={logo}
				waterMarkProps={{
					content: realName || mobile || email,
				}}
				headerContentRender={() => <ProBreadcrumb />}
				route={{ routes }}
				location={{ pathname }}
				appList={[
					{
						// icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
						icon: dkPlus,
						title: "dk-plus",
						desc: "轻量 高效的vue3组件库",
						url: "https://ant.design",
					},
					{
						icon: "https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png",
						title: "AntV",
						desc: "蚂蚁集团全新一代数据可视化解决方案",
						url: "https://antv.vision/",
						target: "_blank",
					},
					{
						icon: "https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg",
						title: "Pro Components",
						desc: "专业级 UI 组件库",
						url: "https://procomponents.ant.design/",
					},
					{
						icon: "https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png",
						title: "umi",
						desc: "插件化的企业级前端应用框架。",
						url: "https://umijs.org/zh-CN/docs",
					},

					{
						icon: "https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png",
						title: "qiankun",
						desc: "可能是你见过最完善的微前端解决方案🧐",
						url: "https://qiankun.umijs.org/",
					},
					{
						icon: "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",
						title: "语雀",
						desc: "知识创作与分享工具",
						url: "https://www.yuque.com/",
					},
					{
						icon: "https://gw.alipayobjects.com/zos/rmsportal/LFooOLwmxGLsltmUjTAP.svg",
						title: "Kitchen ",
						desc: "Sketch 工具集",
						url: "https://kitchen.alipay.com/",
					},
					{
						icon: "https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png",
						title: "dumi",
						desc: "为组件开发场景而生的文档工具",
						url: "https://d.umijs.org/zh-CN",
					},
				]}
				menuData={menuData}
				menuProps={{
					onClick: ({ key }: MenuInfo) => navigate(key),
				}}
				onMenuHeaderClick={() => navigate("/admin")}
				avatarProps={{
					render: () => (
						<Dropdown
							arrow
							menu={{
								items: [
									{
										key: 0,
										label: "个人信息",
										icon: <UserOutlined />,
									},
									{
										key: 1,
										label: "修改密码",
										icon: <LockOutlined />,
										onClick: () => setChangePwdFormVisible(true),
									},
									{
										key: 2,
										label: "退出登录",
										icon: <LogoutOutlined />,
										onClick: () => {
											resetUserInfo();
											navigate(BasicRouteFC.RoutesDict.登录, { replace: true });
										},
									},
								],
							}}
						>
							<Space>
								<span style={{ cursor: "default" }}>{realName || mobile || email}</span>
								<Avatar shape="square" src={logo} />
							</Space>
						</Dropdown>
					),
				}}
				siderWidth={216}
				bgLayoutImgList={[
					{
						src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
						left: 85,
						bottom: 100,
						height: "303px",
					},
					{
						src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
						bottom: -68,
						right: -45,
						height: "303px",
					},
					{
						src: "https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png",
						bottom: 0,
						left: 0,
						width: "331px",
					},
				]}
				style={{ height: "100vh", overflowY: "scroll" }}
			>
				<Outlet />
			</ProLayout>

			<ModalForm<ChangePwdFormProps>
				title="修改密码"
				width={520}
				open={changePwdFormVisible}
				layout="horizontal"
				labelCol={{ span: 4 }}
				form={form}
				onFinish={_coverUserChangePwdData}
				modalProps={{
					destroyOnClose: true,
					afterClose() {
						if (pwdExpired === "true") {
							searchParams.delete("pwdExpired");
							setSearchParams(searchParams.toString());
						}
					},
				}}
				onOpenChange={setChangePwdFormVisible}
			>
				<input autoComplete="username" hidden />
				<ProFormText.Password
					label="旧密码"
					placeholder="请输入旧密码"
					name="oldPassword"
					rules={[
						{
							required: true,
							message: "请输入旧密码",
						},
						{
							type: "string",
							min: 6,
							max: 16,
							message: "密码长度为6-16位",
						},
					]}
					fieldProps={{
						autoComplete: "new-password",
					}}
				/>

				<ProFormText.Password
					label="新密码"
					placeholder="请输入新密码"
					name="password"
					validateFirst={true}
					rules={[
						{ required: true, message: "密码6-16位，需包含大、小写字母、数字和特殊符号" },
						{ min: 6, max: 16, message: "密码6-16位，需包含大、小写字母、数字和特殊符号" },
						{ pattern: /[a-z]+/, message: "密码6-16位，需包含大、小写字母、数字和特殊符号" },
						{ pattern: /[A-Z]+/, message: "密码6-16位，需包含大、小写字母、数字和特殊符号" },
						{ pattern: /\d+/, message: "密码6-16位，需包含大、小写字母、数字和特殊符号" },
						{
							validator(_, value: Partial<ChangePwdFormProps>["password"]) {
								if (!value) {
									return Promise.reject<void>();
								}

								const specialSymbols: string[] = [
									"!",
									'"',
									"#",
									"$",
									"%",
									"&",
									"'",
									"(",
									")",
									"*",
									"+",
									",",
									"-",
									".",
									"/",
									":",
									";",
									"<",
									"=",
									">",
									"?",
									"@",
									"[",
									"]",
									"^",
									"_",
									"`",
									"{",
									"|",
									"}",
									"~",
								];

								return specialSymbols.some((symbols) => value.includes(symbols))
									? Promise.resolve()
									: Promise.reject<Error>(
											new Error("密码6-16位，需包含大、小写字母、数字和特殊符号")
									  );
							},
						},
					]}
					fieldProps={{
						autoComplete: "new-password",
					}}
				/>

				<ProFormText.Password
					label="确认密码"
					placeholder="请再次输入新密码"
					name="_confirmPassword"
					validateFirst={true}
					rules={[
						{
							required: true,
							message: "请再次输入新密码",
						},
						{
							validateTrigger: "onChange",
							validator(_, value: Partial<ChangePwdFormProps>["_confirmPassword"]) {
								if (value !== form.getFieldValue("password")) {
									return Promise.reject<Error>(new Error("两次输入的密码不一致"));
								}

								return Promise.resolve();
							},
						},
					]}
					fieldProps={{
						autoComplete: "new-password",
					}}
				/>
			</ModalForm>
		</div>
	);
};

export default Layout;
