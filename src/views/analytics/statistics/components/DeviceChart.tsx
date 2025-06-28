import React from "react"
import Echarts from "@/components/Echarts"

interface DeviceChartProps {
  options: any
}

const DeviceChart: React.FC<DeviceChartProps> = ({ options }) => {
  return <Echarts options={options} style={{ height: "100%" }} />
}

export default DeviceChart
