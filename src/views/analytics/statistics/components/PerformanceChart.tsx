import React from "react"
import Echarts from "@/components/Echarts"

interface PerformanceChartProps {
  options: any
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ options }) => {
  return <Echarts options={options} style={{ height: "100%" }} />
}

export default PerformanceChart
