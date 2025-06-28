import { EChartsOption } from "echarts"
import * as echarts from "echarts"
import { themeColors } from "@/assets/theme/echartsTheme"

interface GeoData {
  name: string
  value: number
}

export const getGeoOptions = (data: GeoData[], t?: (key: string) => string): EChartsOption => {
  const sortedData = [...data].sort((a, b) => b.value - a.value).slice(0, 10)

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        color: "#666",
      },
    },
    yAxis: {
      type: "category",
      data: sortedData.map((item) => item.name),
      axisLabel: {
        color: "#666",
      },
    },
    series: [
      {
        name: t ? t("statistics.visits") : "访问量",
        type: "bar",
        data: sortedData.map((item) => item.value),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: themeColors.primary },
            { offset: 1, color: themeColors.success },
          ]),
          borderRadius: [0, 4, 4, 0],
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: themeColors.success },
              { offset: 1, color: themeColors.primary },
            ]),
          },
        },
      },
    ],
  }
}
