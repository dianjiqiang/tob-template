import type { EChartsOption } from "echarts"

export function getTrendOptions(data: any[], t?: (key: string) => string): EChartsOption {
  return {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: 40,
      right: 24,
      top: 40,
      bottom: 32,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.time),
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: t ? t("statistics.visits") : "访问量",
        type: "line",
        smooth: true,
        data: data.map((item) => item.value),
        areaStyle: {
          opacity: 0.2,
        },
        lineStyle: {
          width: 3,
        },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  }
}
