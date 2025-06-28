import React from "react"
import Echarts from "@/components/Echarts"

interface GeoChartProps {
  options: any
}

const GeoChart: React.FC<GeoChartProps> = ({ options }) => {
  return <Echarts options={options} style={{ height: "100%" }} />
}

export default GeoChart
