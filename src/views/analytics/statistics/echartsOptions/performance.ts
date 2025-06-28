import { EChartsOption } from "echarts"
import { themeColors } from "@/assets/theme/echartsTheme"

interface PerformanceData {
  name: string
  loadTime: number
  responseTime: number
  errorRate: number
}

export const getPerformanceOptions = (data: PerformanceData[], t?: (key: string) => string): EChartsOption => {
  const names = data.map((item) => item.name)
  const loadTimes = data.map((item) => item.loadTime)
  const responseTimes = data.map((item) => item.responseTime)
  const errorRates = data.map((item) => item.errorRate)

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: [
        t ? t("statistics.loadTime") : "加载时间",
        t ? t("statistics.responseTime") : "响应时间",
        t ? t("statistics.errorRate") : "错误率",
      ],
      textStyle: {
        color: "#666",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: names,
        axisLabel: {
          color: "#666",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: "#666",
          formatter: "{value}",
        },
      },
    ],
    series: [
      {
        name: t ? t("statistics.loadTime") : "加载时间",
        type: "bar",
        data: loadTimes,
        itemStyle: {
          color: themeColors.primary,
        },
      },
      {
        name: t ? t("statistics.responseTime") : "响应时间",
        type: "bar",
        data: responseTimes,
        itemStyle: {
          color: themeColors.success,
        },
      },
      {
        name: t ? t("statistics.errorRate") : "错误率",
        type: "bar",
        data: errorRates,
        itemStyle: {
          color: themeColors.warning,
        },
      },
    ],
  }
}
