import React, { memo, useContext } from "react"
import type { ReactNode } from "react"
import { ThemeChangeStyled } from "./style"
import { Switch } from "antd"

import { ThemeContext } from "context/ThemeContext"

interface ThemeChangeType {
  children?: ReactNode
}
type ChangeEvent = React.KeyboardEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
type MouseEvent = React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>

const ThemeChange: React.FC<ThemeChangeType> = memo(() => {
  const context = useContext(ThemeContext)

  const { theme } = context

  const handleChangeTheme = (_: boolean, event: ChangeEvent) => {
    const transition = document.startViewTransition(() => {
      if (context.setThemeState) context.setThemeState(context.theme === "light" ? "dark" : "light")
    })

    transition.ready.then(() => {
      const { clientX, clientY } = (event as MouseEvent)
      const radius = Math.hypot(
        Math.max(clientX, innerWidth - clientX),
        Math.max(clientY, innerHeight - clientY)
      )
      if (context.theme === 'dark') {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0% at ${clientX}px ${clientY}px)`,
              `circle(${radius}px at ${clientX}px ${clientY}px)`
            ]
          },
          {
            duration: 500,
            pseudoElement: '::view-transition-new(root)'
          }
        )
      }else{
        document.documentElement.animate(
          {
            clipPath: [
              `circle(${radius}px at ${clientX}px ${clientY}px)`,
              `circle(0% at ${clientX}px ${clientY}px)`
            ]
          },
          {
            duration: 500,
            pseudoElement: '::view-transition-old(root)'
          }
        )
      }
    })
  }

  return (
    <ThemeChangeStyled>
      <Switch
        className={"theme-button"}
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
