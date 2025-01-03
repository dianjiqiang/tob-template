import { useCallback, useContext, useEffect, Suspense } from "react"
import {useRoutes} from 'react-router-dom'
import { Button, Card } from "antd"

import { ThemeContext } from "context/ThemeContext"
import { getBodyStyle } from "assets/theme"
import { AppStyled } from "./style"
import routes from "router/index"

import loadRouter from "./utils/loadRouter"

loadRouter(['system-manage-systemSetting', 'system-manage-userInfo'])


function App() {
  const context = useContext(ThemeContext)
  useEffect(() => {
    const body: any = document.body
    body.classList.remove('dark')
    body.classList.remove('light')
    body.classList.add(context.theme)

    body.style = getBodyStyle(context)
  }, [context])

  const changeTheme = useCallback(() => {
    if(context.setThemeState)
      context.setThemeState(context.theme === 'light' ? 'dark' : 'light')
  }, [context])

  return (
    <AppStyled>
      <div>hello</div>
      <Card></Card>
      <Button type="primary" onClick={() => changeTheme()}>亮色</Button>
      <Button type="primary" onClick={() => changeTheme()}>暗色</Button>
      <Suspense fallback="">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
    </AppStyled>
  )
}

export default App
