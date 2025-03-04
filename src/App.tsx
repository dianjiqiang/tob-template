import { Suspense, useEffect, useState, memo } from "react"
import { useRoutes, useLocation, useNavigate } from "react-router-dom"
import { Spin, message } from "antd"
import initialRoutes, { excludeRoutes } from "router/index"
import { asyncGetUserInfo, setUserInfo } from "./store/modules/user"
import { useDispatch } from "react-redux"
import type { routesType } from "./router/type"

import Menu from "./components/Menu"
import Header from "./components/Header"

import { AppStyled } from "./style"
import eventBus from "@/utils/eventbus"

import loadRouter from "@/utils/loadRouter"

import "./i18n"
import "@/router/getRoutes"

loadRouter(["system-manage-systemSetting", "system-manage-userInfo"])

const App = memo(() => {
  const [isLoading, setLoading] = useState(false)
  const [routes, setRoutes] = useState(initialRoutes)
  const dispatch = useDispatch<any>()

  const location = useLocation()
  const navigate = useNavigate()
  const renderedRoutes = useRoutes(routes)

  useEffect(() => {
    eventBus.on("changeGlobLoading", (data: boolean) => {
      setLoading(data)
    })
    eventBus.on("changeRoutes", (data: routesType[]) => {
      setRoutes(data)
    })
  }, [])

  useEffect(() => {
    if (location.pathname !== "/login") {
      if (localStorage.getItem("token")) {
        dispatch(asyncGetUserInfo({}))
          .then((res: any) => {
            dispatch(setUserInfo(res.payload))
          })
          .catch(() => {
            // error: any
            message.error("登录信息已过期, 请重新登录")
            navigate("/login")
          })
      } else {
        navigate("/login")
      }
    }
  }, [dispatch])

  return (
    <AppStyled>
      <Spin spinning={isLoading} size="large">
        {excludeRoutes.includes(location.pathname) ? (
          <Suspense fallback="">
            <div className="main">{renderedRoutes}</div>
          </Suspense>
        ) : (
          <div className="app-container">
            <div className="app-left">
              <Menu routes={routes}></Menu>
            </div>
            <div className="app-right">
              <Header routes={routes}></Header>
              <Suspense fallback="">
                <div className="main">{renderedRoutes}</div>
              </Suspense>
            </div>
          </div>
        )}
      </Spin>
    </AppStyled>
  )
})

export default App
