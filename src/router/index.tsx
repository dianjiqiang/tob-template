import {lazy} from "react";
import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

const About = lazy(() => import("@/views/base-view/about"))
const NotFound = lazy(() => import("@/views/base-view/404"))
const LinkError = lazy(() => import("@/views/base-view/500"))
const RedirectError = lazy(() => import("@/views/base-view/503"))
const Login = lazy(() => import("@/views/base-view/login"))

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/about" />,
  },
  {
    path: "/about",
    element: <About></About>
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/500",
    element: <LinkError></LinkError>
  },
  {
    path: "/503",
    element: <RedirectError></RedirectError>
  },
  {
    path: "/*",
    element: <NotFound></NotFound>
  },
]

export default routes;