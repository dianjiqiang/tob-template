import { Suspense, useEffect, useState, memo } from "react"
import { useRoutes, useLocation } from "react-router-dom"
import { Spin } from "antd"
import initialRoutes, { excludeRoutes } from "router/index"
import { asyncGetUserInfo } from "./store/modules/user"
import { useDispatch } from "react-redux"
import type { routesType } from "./router/type"

import Menu from "./components/Menu"

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
    if (localStorage.getItem("token")) {
      dispatch(asyncGetUserInfo({}))
        .then((res: any) => {
          console.log(res.payload, "currentUserInfo")
        })
        .catch((error: any) => {
          console.error("Failed to fetch user info:", error)
        })
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
