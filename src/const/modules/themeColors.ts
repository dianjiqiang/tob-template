// 主题颜色常量
export const themeColors = {
  // 基础颜色
  primary: "#1677FF",
  success: "#52c41a",
  warning: "#faad14",
  error: "#f5222d",
  info: "#1890ff",

  // 功能颜色
  danger: "#D89614",
  pink: "#eb2f96",
  purple: "#722ed1",
  orange: "#fa8c16",
  cyan: "#13c2c2",
  green: "#52c41a",
  blue: "#1890ff",
  red: "#f5222d",

  // 文本颜色
  textPrimary: "#262626",
  textSecondary: "#595959",
  textTertiary: "#8c8c8c",
  textQuaternary: "#bfbfbf",

  // 背景颜色
  background: "#ffffff",
  backgroundSecondary: "#f5f5f5",
  backgroundTertiary: "#fafafa",

  // 边框颜色
  border: "#f0f0f0",
  borderSecondary: "#e9ecef",
  borderTertiary: "#d9d9d9",

  // 暗色主题
  darkBackground: "#000000",
  darkBackgroundSecondary: "#1f1f1f",
  darkBackgroundTertiary: "#2a2a2a",
  darkBorder: "#303030",
  darkBorderSecondary: "#404040",
  darkTextPrimary: "#ffffff",
  darkTextSecondary: "#cccccc",
  darkTextTertiary: "#999999",
  darkHoverBackground: "#313131",
  darkActiveBackground: "#111822",
  darkActiveHoverBackground: "#0F2035",
  darkDisabledColor: "rgba(255, 255, 255, 0.25)",

  // 阴影颜色
  shadowLight: "rgba(0, 0, 0, 0.1)",
  shadowMedium: "rgba(0, 0, 0, 0.15)",
  shadowDark: "rgba(0, 0, 0, 0.3)",
  shadowDarker: "rgba(0, 0, 0, 0.4)",

  // 特殊颜色
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
} as const

// 主题颜色映射
export const themeColorMap = {
  light: {
    background: themeColors.background,
    backgroundSecondary: themeColors.backgroundSecondary,
    backgroundTertiary: themeColors.backgroundTertiary,
    textPrimary: themeColors.textPrimary,
    textSecondary: themeColors.textSecondary,
    textTertiary: themeColors.textTertiary,
    border: themeColors.border,
    borderSecondary: themeColors.borderSecondary,
    shadow: themeColors.shadowLight,
    shadowMedium: themeColors.shadowMedium,
  },
  dark: {
    background: themeColors.darkBackground,
    backgroundSecondary: themeColors.darkBackgroundSecondary,
    backgroundTertiary: themeColors.darkBackgroundTertiary,
    textPrimary: themeColors.darkTextPrimary,
    textSecondary: themeColors.darkTextSecondary,
    textTertiary: themeColors.darkTextTertiary,
    border: themeColors.darkBorder,
    borderSecondary: themeColors.darkBorderSecondary,
    shadow: themeColors.shadowDark,
    shadowMedium: themeColors.shadowDarker,
  },
} as const
