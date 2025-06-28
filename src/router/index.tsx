import { lazy } from "react"
import { Navigate } from "react-router-dom"
import { routesType } from "./type"

import { CopyrightOutlined } from "@ant-design/icons"

const About = lazy(() => import("views/base-view/about"))
const NotFound = lazy(() => import("views/base-view/404"))
const LinkError = lazy(() => import("views/base-view/500"))
const RedirectError = lazy(() => import("views/base-view/503"))
const Login = lazy(() => import("views/base-view/login"))

export const initialRoutes = [
  {
    path: "/",
    element: <Navigate to="/analytics" />,
    hiddenMenu: true,
  },
  {
    path: "/about",
    name: "About",
    label: "route.about",
    icon: <CopyrightOutlined />,
    element: <About></About>,
    no: 9999,
  },
  {
    path: "/login",
    name: "Login",
    label: "route.login",
    element: <Login></Login>,
    hiddenMenu: true,
  },
  {
    path: "/500",
    name: "500",
    label: "route.error500",
    element: <LinkError></LinkError>,
    hiddenMenu: true,
  },
  {
    path: "/503",
    name: "503",
    label: "route.error503",
    element: <RedirectError></RedirectError>,
    hiddenMenu: true,
  },
  {
    path: "/*",
    element: <NotFound></NotFound>,
    hiddenMenu: true,
  },
]

export const excludeRoutes = ["/login", "/500", "/503", "/*", "/"]

export const routes: routesType[] = initialRoutes

export default routes
