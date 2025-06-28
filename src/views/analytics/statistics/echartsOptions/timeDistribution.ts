import { EChartsOption } from "echarts"
import { themeColors } from "@/assets/theme/echartsTheme"

interface TimeData {
  hour: number
  day: number
  value: number
}

export const getTimeDistributionOptions = (data: TimeData[], t?: (key: string) => string): EChartsOption => {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const days = t
    ? [
        t("statistics.monday"),
        t("statistics.tuesday"),
        t("statistics.wednesday"),
        t("statistics.thursday"),
        t("statistics.friday"),
        t("statistics.saturday"),
        t("statistics.sunday"),
      ]
    : ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]

  return {
    tooltip: {
      position: "top",
      formatter: function (params: any) {
        const visitText = t ? t("statistics.visits") : "访问量"
        return `${days[params.data[1]]} ${params.data[0]}:00<br/>${visitText}: ${params.data[2]}`
      },
    },
    grid: {
      height: "50%",
      top: "10%",
    },
    xAxis: {
      type: "category",
      data: hours,
      splitArea: {
        show: true,
      },
      axisLabel: {
        color: "#666",
      },
    },
    yAxis: {
      type: "category",
      data: days,
      splitArea: {
        show: true,
      },
      axisLabel: {
        color: "#666",
      },
    },
    visualMap: {
      min: 0,
      max: Math.max(...data.map((item) => item.value)),
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "15%",
      inRange: {
        color: [themeColors.primary, themeColors.success],
      },
    },
    series: [
      {
        name: t ? t("statistics.visits") : "访问量",
        type: "heatmap",
        data: data.map((item) => [item.hour, item.day, item.value]),
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  }
}
