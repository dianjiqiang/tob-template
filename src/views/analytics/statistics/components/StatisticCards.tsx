import React from "react"
import { Card, Statistic, Row, Col, Space, Typography } from "antd"
import { RiseOutlined, FallOutlined } from "@ant-design/icons"
import { useThemeStore } from "store/theme"
import { useShallow } from "zustand/shallow"

const { Text } = Typography

export interface StatisticCardItem {
  title: string
  value: number | string
  icon?: React.ReactNode
  color?: string
  suffix?: string
  trend?: number
  trendIcon?: React.ReactNode
}

interface StatisticCardsProps {
  data: StatisticCardItem[]
}

const StatisticCards: React.FC<StatisticCardsProps> = ({ data }) => {
  const {
    "success-color": successColor,
    "danger-color": dangerColor,
    "primary-color": primaryColor,
  } = useThemeStore(
    useShallow((state) => ({
      "success-color": state["success-color"],
      "danger-color": state["danger-color"],
      "primary-color": state["primary-color"],
    }))
  )

  const getTrendColor = (trend: number) => {
    return trend >= 0 ? successColor : dangerColor
  }

  const getTrendIcon = (trend: number) => {
    return trend >= 0 ? <RiseOutlined /> : <FallOutlined />
  }

  return (
    <Row gutter={[24, 24]}>
      {data.map((item) => (
        <Col xs={24} sm={12} md={6} key={item.title}>
          <Card style={{ borderLeft: `4px solid ${item.color || primaryColor}` }}>
            <Statistic
              title={item.title}
              value={item.value}
              prefix={item.icon}
              valueStyle={{ color: item.color || primaryColor, fontWeight: 600 }}
              suffix={item.suffix}
            />
            {item.trend !== undefined && (
              <Space style={{ marginTop: 8 }}>
                {item.trendIcon || getTrendIcon(item.trend)}
                <Text
                  style={{
                    color: getTrendColor(item.trend),
                    fontSize: "12px",
                  }}
                >
                  {item.trend >= 0 ? "+" : ""}
                  {item.trend}%
                </Text>
              </Space>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default StatisticCards
