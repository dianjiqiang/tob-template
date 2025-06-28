import type { ThemeDataType } from "context/ThemeContext"

export const getBodyStyle = (theme: ThemeDataType) => {
  return `
      background-color: ${theme.background};
      color: ${theme.color};
      --primary-color: ${theme["primary-color"]};
      --success-color: ${theme["success-color"]};
      --danger-color: ${theme["danger-color"]};
      --disabled-color: ${theme["disabled-color"]};
      --error-color: ${theme["error-color"]};
      --text-1: ${theme["text-1"]};
      --text-2: ${theme["text-2"]};
      --text-3: ${theme["text-3"]};
      --hover-background: ${theme["hover-background"]};
      --active-background: ${theme["active-background"]};
      --active-hover-background: ${theme["active-hover-background"]};
      --menu-border-line: ${theme["menu-border-line"]};
    `
}

// 导出ECharts主题相关
export { createEchartsDarkTheme, themeColors } from "./echartsTheme"
