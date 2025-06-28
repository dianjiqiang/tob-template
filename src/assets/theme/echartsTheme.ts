import type { ThemeDataType } from "context/ThemeContext"

// 统一的主题配色方案
const themeColors = {
  primary: "#1677FF",
  success: "#52C41A",
  warning: "#FA8C16",
  danger: "#FF4D4F",
  purple: "#722ED1",
  cyan: "#13C2C2",
  pink: "#EB2F96",
  yellow: "#FADB14",
}

export const createEchartsDarkTheme = (theme: ThemeDataType) => {
  return {
    // backgroundColor: theme.background,

    textStyle: {
      color: theme["text-2"],
      fontSize: 12,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },

    title: {
      textStyle: {
        color: theme["text-1"],
        fontSize: 16,
        fontWeight: 600,
      },
      subtextStyle: {
        color: theme["text-3"],
        fontSize: 12,
      },
    },

    legend: {
      textStyle: {
        color: theme["text-2"],
        fontSize: 12,
      },
    },

    categoryAxis: {
      axisLine: {
        lineStyle: {
          color: theme["menu-border-line"],
          width: 1,
        },
      },
      axisTick: {
        lineStyle: {
          color: theme["menu-border-line"],
          width: 1,
        },
      },
      axisLabel: {
        color: theme["text-3"],
        fontSize: 11,
      },
      splitLine: {
        lineStyle: {
          color: theme["menu-border-line"],
          width: 1,
          type: "dashed",
          opacity: 0.3,
        },
      },
    },

    valueAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: theme["text-3"],
        fontSize: 11,
      },
      splitLine: {
        lineStyle: {
          color: theme["menu-border-line"],
          width: 1,
          type: "dashed",
          opacity: 0.3,
        },
      },
    },

    radar: {
      axisLine: {
        lineStyle: {
          color: theme["menu-border-line"],
          width: 1,
        },
      },
      splitLine: {
        lineStyle: {
          color: theme["menu-border-line"],
          width: 1,
          type: "dashed",
          opacity: 0.3,
        },
      },
      splitArea: {
        areaStyle: {
          color: [theme["hover-background"], theme["active-background"]],
          opacity: 0.1,
        },
      },
    },

    pie: {
      itemStyle: {
        borderColor: theme.background,
        borderWidth: 2,
      },
    },

    tooltip: {
      backgroundColor: theme["active-background"],
      borderColor: theme["menu-border-line"],
      borderWidth: 1,
      textStyle: {
        color: theme["text-2"],
      },
      titleTextStyle: {
        color: theme["text-1"],
        fontWeight: 600,
      },
    },

    // 统一的颜色配置 - 用户不需要手动指定颜色
    color: [
      themeColors.primary,
      themeColors.success,
      themeColors.warning,
      themeColors.danger,
      themeColors.purple,
      themeColors.cyan,
      themeColors.pink,
      themeColors.yellow,
    ],

    animation: true,
    animationDuration: 1000,
    animationEasing: "cubicOut",
  }
}

export { themeColors }
