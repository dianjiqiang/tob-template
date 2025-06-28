import React from "react"
import Echarts from "components/Echarts"

interface SourcePieProps {
  options: any
  style?: React.CSSProperties
}

const SourcePie: React.FC<SourcePieProps> = ({ options, style }) => {
  return <Echarts options={options} style={{ width: "100%", height: 260, ...style }} />
}

export default SourcePie
