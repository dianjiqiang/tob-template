import React from "react"
import Echarts from "@/components/Echarts"

interface TimeDistributionChartProps {
  options: any
}

const TimeDistributionChart: React.FC<TimeDistributionChartProps> = ({ options }) => {
  return <Echarts options={options} style={{ height: "100%" }} />
}

export default TimeDistributionChart
