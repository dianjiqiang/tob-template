import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import { getBodyStyle } from "assets/theme"
import { themeColors } from "@/const"

export type ThemeType = {
  [key in keyof typeof basicDarkThemeData]?: string
}

export interface ThemeState extends ThemeType {
  theme: string
  setTheme: (theme: string) => void
  toggleTheme: () => void
}

export const basicThemeData: ThemeType = {
  theme: "light",
  background: themeColors.background,
  color: themeColors.textSecondary,
  "text-1": themeColors.textPrimary,
  "text-2": themeColors.textSecondary,
  "text-3": themeColors.textTertiary,
  "hover-background": themeColors.backgroundSecondary,
  "active-background": "#E3F4FC",
  "menu-border-line": themeColors.border,
  "active-hover-background": "#A5D3F0",
  "disabled-color": "rgba(0, 0, 0, 0.25)",
  "primary-color": themeColors.primary,
  "success-color": themeColors.success,
  "danger-color": themeColors.danger,
  "error-color": themeColors.error,
}

const basicDarkThemeData = {
  theme: "dark",
  background: themeColors.darkBackground,
  color: themeColors.darkTextSecondary,
  "text-1": themeColors.darkTextPrimary,
  "text-2": themeColors.darkTextSecondary,
  "text-3": themeColors.darkTextTertiary,
  "hover-background": themeColors.darkHoverBackground,
  "active-background": themeColors.darkActiveBackground,
  "menu-border-line": themeColors.darkBorder,
  "active-hover-background": themeColors.darkActiveHoverBackground,
  "disabled-color": themeColors.darkDisabledColor,
  "primary-color": themeColors.primary,
  "success-color": themeColors.success,
  "danger-color": themeColors.danger,
  "error-color": themeColors.error,
}

export const useThemeStore = create<ThemeState>()(
  subscribeWithSelector((set, get) => {
    // 获取初始主题
    const savedTheme = localStorage.getItem("theme") ?? "light"
    const initialThemeData = savedTheme === "light" ? basicThemeData : basicDarkThemeData

    return {
      ...initialThemeData,
      theme: savedTheme,
      setTheme: (newTheme: string) => {
        const themeData = newTheme === "light" ? basicThemeData : basicDarkThemeData

        // 更新 localStorage
        localStorage.setItem("theme", newTheme)
        localStorage.setItem("theme-data", JSON.stringify(themeData))

        // 更新 DOM
        const html: HTMLElement = document.documentElement
        html.classList.remove("dark", "light")
        html.classList.add(newTheme)
        html.style.cssText = getBodyStyle({ ...themeData })

        set({ ...themeData, theme: newTheme })
      },
      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === "light" ? "dark" : "light"
        get().setTheme(newTheme)
      },
    }
  })
)
;(function () {
  const savedTheme = localStorage.getItem("theme") ?? "light"
  const themeData = savedTheme === "light" ? basicThemeData : basicDarkThemeData

  const html: HTMLElement = document.documentElement
  html.classList.remove("dark", "light")
  html.classList.add(savedTheme)
  html.style.cssText = getBodyStyle({ ...themeData })
})()
