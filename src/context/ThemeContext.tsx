// src/context/themeContext.tsx
import React, { memo, useState, useMemo } from "react"
import type { ReactNode } from "react"
import { ConfigProvider, theme } from "antd"
import { getBodyStyle } from "assets/theme"

export type ThemeType = {
  [key in keyof typeof basicDarkThemeData]?: string
}

export interface ThemeDataType extends ThemeType {
  setThemeState?: React.Dispatch<React.SetStateAction<string>>
}

export const basicThemeData: ThemeDataType = {
  theme: "light",
  background: "#fff",
  color: "#333",
  "text-1": "#000",
  "text-2": "#333",
  "text-3": "#666",
  "hover-background": "#F5F5F5",
  "active-background": "#E3F4FC",
  "menu-border-line": "#f0f0f0",
  "active-hover-background": "#A5D3F0",
  "disabled-color": "rgba(0, 0, 0, 0.25)",
  "primary-color": "#1677FF",
  "success-color": "#52C41A",
  "danger-color": "#FF4D4F", // 修正拼写错误
  "error-color": "#FF4D4F",
}

const basicDarkThemeData = {
  theme: "dark",
  background: "#000",
  color: "#ccc",
  "text-1": "#fff",
  "text-2": "#ccc",
  "text-3": "#999",
  "hover-background": "#313131",
  "active-background": "#111822",
  "menu-border-line": "#313131",
  "active-hover-background": "#0F2035",
  "disabled-color": "rgba(255, 255, 255, 0.25)",
  "primary-color": "#1677FF",
  "success-color": "#52C41A",
  "danger-color": "#FF4D4F", // 修正拼写错误
  "error-color": "#FF4D4F",
}

export const ThemeContext = React.createContext<ThemeDataType>(basicThemeData)

interface ThemeProviderProps {
  children?: ReactNode
  theme?: string
}

const ThemeProvider: React.FC<ThemeProviderProps> = memo((props) => {
  const [themeState, setThemeState] = useState<string>(props.theme ?? localStorage.getItem("theme") ?? "light")
  const valueData: ThemeDataType = themeState === "light" ? basicThemeData : basicDarkThemeData

  localStorage.setItem("theme", themeState)
  localStorage.setItem("theme-data", JSON.stringify(valueData))

  const themeStateMemo = useMemo(() => {
    return themeState
  }, [themeState])

  const html: any = document.documentElement
  html.classList.remove("dark")
  html.classList.remove("light")
  html.classList.add(themeState)

  html.style = getBodyStyle({ ...valueData })

  return (
    <ThemeContext.Provider value={{ ...valueData, setThemeState }}>
      <ConfigProvider theme={{ algorithm: themeStateMemo === "dark" ? theme.darkAlgorithm : undefined }}>
        {props.children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
})

ThemeContext.displayName = "ThemeProvider"

export default ThemeProvider
