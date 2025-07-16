import React, { memo } from "react"
import type { ReactNode } from "react"
import { ConfigProvider, theme } from "antd"
import { useThemeStore } from "store/theme"
import { useShallow } from "zustand/shallow"

interface ThemeProviderProps {
  children?: ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = memo((props) => {
  const currentTheme = useThemeStore(useShallow((state) => state.theme))

  return (
    <ConfigProvider theme={{ algorithm: currentTheme === "dark" ? theme.darkAlgorithm : undefined }}>
      {props.children}
    </ConfigProvider>
  )
})

ThemeProvider.displayName = "ThemeProvider"

export default ThemeProvider
