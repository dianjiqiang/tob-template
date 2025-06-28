import type { EChartsOption } from "echarts"

export function getRadarOptions(indicators: any[], data: any[]): EChartsOption {
  return {
    tooltip: {
      trigger: "item",
    },
    radar: {
      indicator: indicators,
      center: ["50%", "50%"],
      radius: "65%",
      splitNumber: 5,
    },
    series: [
      {
        type: "radar",
        data: data.map((item) => ({
          ...item,
          areaStyle: {
            opacity: 0.2,
          },
          lineStyle: {
            width: 3,
          },
          itemStyle: {
            borderWidth: 2,
          },
        })),
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  }
}
