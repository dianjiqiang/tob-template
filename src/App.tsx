import { Suspense, useEffect, useState } from "react"
import { useRoutes } from "react-router-dom"
import { Spin } from "antd"
import routes from "router/index"

import { AppStyled } from "./style"
import eventBus from "@/utils/eventbus"

import loadRouter from "@/utils/loadRouter"
import './i18n';

loadRouter(["system-manage-systemSetting", "system-manage-userInfo"])

function App() {
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    eventBus.on("changeGlobLoading", (data: boolean) => {
      setLoading(data)
    })
  }, [])

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
