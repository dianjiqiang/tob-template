import { AppstoreOutlined } from "@ant-design/icons"
import { Outlet, Navigate } from "react-router-dom"
import { lazy } from "react"
import { rules } from "@/const"
import type { routesType } from "../type"

const Statistics = lazy(() => import("views/analytics/statistics"))
const Workbench = lazy(() => import("views/analytics/workbench"))

const routes: routesType = {
  path: "/analytics",
  name: "Analytics",
  label: "route.overview",
  icon: <AppstoreOutlined />,
  element: <Outlet></Outlet>,
  rules: [rules.SYSTEM, rules.SYSTEM_USERINFO, rules.SYSTEM_SETTING],
  no: 1,
  children: [
    {
      path: "",
      element: <Navigate to="statistics" replace />,
      hiddenMenu: true,
    },
    {
      path: "/analytics/statistics",
      name: "Statistics",
      label: "route.statistics",
      element: <Statistics></Statistics>,
      rules: [rules.SYSTEM_USERINFO],
    },
    {
      path: "/analytics/workbench",
      name: "Workbench",
      label: "route.workbench",
      element: <Workbench></Workbench>,
      rules: [rules.SYSTEM_SETTING],
    },
  ],
}

export default routes
