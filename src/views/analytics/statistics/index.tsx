import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Row, Col, Card } from "antd"
import {
  UserOutlined,
  EyeOutlined,
  DownloadOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  PercentageOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons"
import { themeColors } from "@/assets/theme/echartsTheme"
import StatisticCards from "./components/StatisticCards"
import TrendChart from "./components/TrendChart"
import SourcePie from "./components/SourcePie"
import RadarChart from "./components/RadarChart"
import DeviceChart from "./components/DeviceChart"
import GeoChart from "./components/GeoChart"
import PerformanceChart from "./components/PerformanceChart"
import TimeDistributionChart from "./components/TimeDistributionChart"
import { getTrendOptions } from "./echartsOptions/trend"
import { getSourcePieOptions } from "./echartsOptions/sourcePie"
import { getRadarOptions } from "./echartsOptions/radar"
import { getDeviceOptions } from "./echartsOptions/device"
import { getGeoOptions } from "./echartsOptions/geo"
import { getPerformanceOptions } from "./echartsOptions/performance"
import { getTimeDistributionOptions } from "./echartsOptions/timeDistribution"
import { StatisticsPageWrapper } from "./style"

const Statistics: React.FC = () => {
  const { t } = useTranslation()

  // 统计卡片数据
  const statisticData = useMemo(
    () => [
      {
        title: t("statistics.userCount"),
        value: 2000,
        icon: <UserOutlined />,
        color: themeColors.primary,
        suffix: "",
        trend: 12.5,
        trendIcon: <RiseOutlined />,
      },
      {
        title: t("statistics.pageViews"),
        value: 20000,
        icon: <EyeOutlined />,
        color: themeColors.success,
        suffix: "",
        trend: 8.3,
        trendIcon: <RiseOutlined />,
      },
      {
        title: t("statistics.uniqueVisitors"),
        value: 15000,
        icon: <UserOutlined />,
        color: themeColors.warning,
        suffix: "",
        trend: -2.1,
        trendIcon: <FallOutlined />,
      },
      {
        title: t("statistics.downloads"),
        value: 8000,
        icon: <DownloadOutlined />,
        color: themeColors.pink,
        suffix: "",
        trend: 15.7,
        trendIcon: <RiseOutlined />,
      },
      {
        title: t("statistics.activeUsers"),
        value: 5000,
        icon: <ThunderboltOutlined />,
        color: themeColors.primary,
        suffix: "",
        trend: 5.2,
        trendIcon: <RiseOutlined />,
      },
      {
        title: t("statistics.bounceRate"),
        value: 23.5,
        icon: <PercentageOutlined />,
        color: themeColors.success,
        suffix: "%",
        trend: -1.8,
        trendIcon: <FallOutlined />,
      },
      {
        title: t("statistics.avgSessionDuration"),
        value: 4.2,
        icon: <ClockCircleOutlined />,
        color: themeColors.warning,
        suffix: "min",
        trend: 3.1,
        trendIcon: <RiseOutlined />,
      },
      {
        title: t("statistics.conversionRate"),
        value: 2.8,
        icon: <PercentageOutlined />,
        color: themeColors.pink,
        suffix: "%",
        trend: 0.5,
        trendIcon: <RiseOutlined />,
      },
    ],
    [t]
  )

  // ECharts配置 - 使用useMemo确保稳定性
  const trendOptions = useMemo(() => {
    const mockTrendData = Array.from({ length: 16 }, (_, i) => ({
      time: `${6 + i}:00`,
      value: Math.round(2000 + Math.random() * 8000 + Math.sin(i / 2) * 3000),
    }))
    return getTrendOptions(mockTrendData, t)
  }, [t])

  const sourcePieOptions = useMemo(() => {
    const mockSourceData = [
      { value: 1048, name: t("statistics.searchEngine") },
      { value: 735, name: t("statistics.directAccess") },
      { value: 580, name: t("statistics.emailMarketing") },
      { value: 484, name: t("statistics.affiliateAds") },
      { value: 300, name: t("statistics.videoAds") },
      { value: 200, name: t("statistics.socialMedia") },
    ]
    return getSourcePieOptions(mockSourceData, t)
  }, [t])

  const radarOptions = useMemo(() => {
    const mockRadarIndicators = [
      { name: t("statistics.webpage"), max: 10000 },
      { name: t("statistics.mobile"), max: 10000 },
      { name: t("statistics.client"), max: 10000 },
      { name: t("statistics.thirdParty"), max: 10000 },
      { name: t("statistics.others"), max: 10000 },
    ]
    const mockRadarData = [
      {
        value: [8000, 6000, 7000, 5000, 4000],
        name: t("statistics.visits"),
      },
      {
        value: [6000, 5000, 4000, 3000, 2000],
        name: t("statistics.trend"),
      },
    ]
    return getRadarOptions(mockRadarIndicators, mockRadarData)
  }, [t])

  const deviceOptions = useMemo(() => {
    const mockDeviceData = [
      { value: 4500, name: t("statistics.desktop") },
      { value: 3800, name: t("statistics.mobile") },
      { value: 1200, name: t("statistics.tablet") },
    ]
    return getDeviceOptions(mockDeviceData, t)
  }, [t])

  const geoOptions = useMemo(() => {
    const mockGeoData = [
      { name: "北京", value: 2340 },
      { name: "上海", value: 1890 },
      { name: "广东", value: 1560 },
      { name: "深圳", value: 1230 },
      { name: "杭州", value: 980 },
      { name: "成都", value: 760 },
      { name: "武汉", value: 650 },
      { name: "西安", value: 540 },
    ]
    return getGeoOptions(mockGeoData, t)
  }, [t])

  const performanceOptions = useMemo(() => {
    const mockPerformanceData = [
      { name: t("statistics.homepage"), loadTime: 1200, responseTime: 800, errorRate: 0.5 },
      { name: t("statistics.productPage"), loadTime: 1800, responseTime: 1200, errorRate: 1.2 },
      { name: t("statistics.userCenter"), loadTime: 900, responseTime: 600, errorRate: 0.3 },
      { name: t("statistics.orderPage"), loadTime: 1500, responseTime: 1000, errorRate: 0.8 },
      { name: t("statistics.paymentPage"), loadTime: 2000, responseTime: 1500, errorRate: 2.1 },
    ]
    return getPerformanceOptions(mockPerformanceData, t)
  }, [t])

  const timeDistributionOptions = useMemo(() => {
    const mockTimeData = Array.from({ length: 168 }, (_, i) => ({
      hour: i % 24,
      day: Math.floor(i / 24),
      value: Math.round(100 + Math.random() * 500 + Math.sin(i / 12) * 200),
    }))
    return getTimeDistributionOptions(mockTimeData, t)
  }, [t])

  return (
    <StatisticsPageWrapper>
      <StatisticCards data={statisticData} />

      {/* 第一行：流量趋势和访问来源 */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card title={t("statistics.trafficTrend")} bordered={false} style={{ height: 400 }}>
            <TrendChart options={trendOptions} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title={t("statistics.visitSource")} bordered={false} style={{ height: 400 }}>
            <SourcePie options={sourcePieOptions} />
          </Card>
        </Col>
      </Row>

      {/* 第二行：设备分布和地理分布 */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title={t("statistics.deviceDistribution")} bordered={false} style={{ height: 400 }}>
            <DeviceChart options={deviceOptions} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={t("statistics.geographicDistribution")} bordered={false} style={{ height: 400 }}>
            <GeoChart options={geoOptions} />
          </Card>
        </Col>
      </Row>

      {/* 第三行：性能指标和时间分布 */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title={t("statistics.performanceMetrics")} bordered={false} style={{ height: 400 }}>
            <PerformanceChart options={performanceOptions} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={t("statistics.timeDistribution")} bordered={false} style={{ height: 400 }}>
            <TimeDistributionChart options={timeDistributionOptions} />
          </Card>
        </Col>
      </Row>

      {/* 第四行：用户行为分析 */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <Card title={t("statistics.userBehavior")} bordered={false} style={{ height: 400 }}>
            <RadarChart options={radarOptions} />
          </Card>
        </Col>
      </Row>
    </StatisticsPageWrapper>
  )
}

export default Statistics
