import { EChartsOption } from "echarts"
import { themeColors } from "@/assets/theme/echartsTheme"

interface DeviceData {
  value: number
  name: string
}

export const getDeviceOptions = (data: DeviceData[], t?: (key: string) => string): EChartsOption => {
  return {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: {
        color: "#666",
      },
    },
    series: [
      {
        name: t ? t("statistics.deviceDistribution") : "设备分布",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["60%", "50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "18",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
        color: [themeColors.primary, themeColors.success, themeColors.warning, themeColors.pink],
      },
    ],
  }
}
