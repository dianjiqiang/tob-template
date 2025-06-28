import type { EChartsOption } from "echarts"

export function getSourcePieOptions(data: any[], t?: (key: string) => string): EChartsOption {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: 0,
      itemGap: 16,
      itemWidth: 12,
      itemHeight: 12,
    },
    series: [
      {
        name: t ? t("statistics.visitSource") : "访问来源",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "45%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: "bold",
          },
          labelLine: {
            show: true,
          },
        },
        data,
      },
    ],
  }
}
