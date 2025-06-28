import React from "react"
import Echarts from "components/Echarts"

interface RadarChartProps {
  options: any
  style?: React.CSSProperties
}

const RadarChart: React.FC<RadarChartProps> = ({ options, style }) => {
  return <Echarts options={options} style={{ width: "100%", height: 260, ...style }} />
}

export default RadarChart
