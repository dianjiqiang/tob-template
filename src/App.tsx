import { useContext, Suspense, useEffect, useState } from "react"
import { useRoutes } from "react-router-dom"
import { Spin } from "antd"
import routes from "router/index"

import { ThemeContext } from "context/ThemeContext"
import { getBodyStyle } from "assets/theme"
import { AppStyled } from "./style"
import eventBus from "@/utils/eventbus"

import loadRouter from "@/utils/loadRouter"

loadRouter(["system-manage-systemSetting", "system-manage-userInfo"])

function App() {
  const context = useContext(ThemeContext)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    eventBus.on("changeGlobLoading", (data: boolean) => {
      setLoading(data)
    })
  }, [])

  useEffect(() => {
    const body: any = document.body
    body.classList.remove("dark")
    body.classList.remove("light")
    body.classList.add(context.theme)

    body.style = getBodyStyle(context)
  }, [context])

  // const changeTheme = useCallback(() => {
  //   if (context.setThemeState) context.setThemeState(context.theme === "light" ? "dark" : "light")
  // }, [context])

  return (
    <AppStyled>
      <Spin spinning={isLoading} size="large">
        <Suspense fallback="">
          <div className="main">{useRoutes(routes)}</div>
        </Suspense>
      </Spin>
    </AppStyled>
  )
}

export default App
