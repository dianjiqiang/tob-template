import React, { memo } from "react"
import type { ReactNode } from "react"
import { Card } from "antd"
import Echarts from "@/components/Echarts"
import { StatisticsStyled } from "./style"

interface StatisticsType {
  children?: ReactNode
}

const Statistics: React.FC<StatisticsType> = memo(() => {
  return (
    <StatisticsStyled>
      <Card>
        <Echarts
          options={{
            animation: true,
            xAxis: {
              type: "category",
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: "line",
              },
            ],
          }}
        ></Echarts>
      </Card>
    </StatisticsStyled>
  )
})

Statistics.displayName = "Statistics"

export default Statistics
