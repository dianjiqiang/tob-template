import { SettingOutlined } from "@ant-design/icons"
import { Outlet, Navigate } from "react-router-dom"
import { lazy } from "react"
import i18next from "i18next"
import { rules } from "@/const"
import type { routesType } from "../type"

const UserInfo = lazy(() => import("views/system/user-info"))
const SystemSetting = lazy(() => import("views/system/system-setting"))

const routes: routesType = {
  path: "/system",
  name: "System",
  label: i18next.t("menu.system"),
  icon: <SettingOutlined />,
  element: <Outlet />,
  rules: [rules.SYSTEM, rules.SYSTEM_USERINFO, rules.SYSTEM_SETTING],
  no: 999,
  children: [
    {
      path: "",
      element: <Navigate to="user-info" replace />,
      hiddenMenu: true,
    },
    {
      path: "/system/user-info",
      name: "UserInfo",
      label: i18next.t("menu.userInfo"),
      element: <UserInfo></UserInfo>,
      rules: [rules.SYSTEM_USERINFO],
    },
    {
      path: "/system/system-setting",
      name: "SystemSetting",
      label: i18next.t("menu.systemSetting"),
      element: <SystemSetting></SystemSetting>,
      rules: [rules.SYSTEM_SETTING],
    },
  ],
}

export default routes
