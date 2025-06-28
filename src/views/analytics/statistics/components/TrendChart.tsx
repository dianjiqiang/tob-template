import React from "react"
import Echarts from "components/Echarts"

interface TrendChartProps {
  options: any
  style?: React.CSSProperties
}

const TrendChart: React.FC<TrendChartProps> = ({ options, style }) => {
  return <Echarts options={options} style={{ width: "100%", height: 320, ...style }} />
}

export default TrendChart
