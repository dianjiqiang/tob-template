import React, { memo, useContext } from "react"
import type { ReactNode } from "react"
import { ThemeChangeStyled } from "./style"
import { Switch } from "antd"

import { ThemeContext } from "context/ThemeContext"

interface ThemeChangeType {
  children?: ReactNode
}
type ChangeEvent = React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>
type MouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

const ThemeChange: React.FC<ThemeChangeType> = memo(() => {
  const context = useContext(ThemeContext)

  const { theme } = context

  const handleChangeTheme = (_: boolean, event: ChangeEvent) => {
    const clientX = (event as MouseEvent).clientX
    const clientY = (event as MouseEvent).clientY
    const doAnimate = () => {
      const radius = Math.hypot(
        Math.max(clientX, window.innerWidth - clientX),
        Math.max(clientY, window.innerHeight - clientY)
      )

      const clipPath = [`circle(0px at ${clientX}px ${clientY}px)`, `circle(${radius}px at ${clientX}px ${clientY}px)`]

      document.documentElement.animate(
        { clipPath: _ ? clipPath.reverse() : clipPath },
        {
          duration: 600,
          pseudoElement: _ ? "::view-transition-old(root)" : "::view-transition-new(root)",
        }
      )
    }
    if (document.startViewTransition) {
      document
        .startViewTransition(context.setThemeState(context.theme === "light" ? "dark" : "light"))
        .ready.then(doAnimate)
    } else {
      if (context.setThemeState) context.setThemeState(context.theme === "light" ? "dark" : "light")
    }
  }

  return (
    <ThemeChangeStyled>
      <Switch
        value={theme === "light"}
        onChange={(type, event) => handleChangeTheme(type, event)}
        checkedChildren="🌞"
        unCheckedChildren="🌙"
      />
    </ThemeChangeStyled>
  )
})

ThemeChange.displayName = "ThemeChange"

export default ThemeChange
