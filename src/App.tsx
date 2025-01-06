import { Suspense, useEffect, useState, memo } from "react"
import { useRoutes, type RouteObject, useLocation } from "react-router-dom"
import { Spin } from "antd"
import initialRoutes, { excludeRoutes } from "router/index"

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

  const location = useLocation()
  const renderedRoutes = useRoutes(routes)

  useEffect(() => {
    eventBus.on("changeGlobLoading", (data: boolean) => {
      setLoading(data)
    })
    eventBus.on("changeRoutes", (data: RouteObject[]) => {
      setRoutes(data)
    })
  }, [])

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
              <Menu></Menu>
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
