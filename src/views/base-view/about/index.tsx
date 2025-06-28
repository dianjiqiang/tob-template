import React, { memo, useContext } from "react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { Card, Row, Col, Typography, Divider, Space, Tag, Timeline, Statistic } from "antd"
import {
  InfoCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  GlobalOutlined,
  TeamOutlined,
  RocketOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  HeartOutlined,
} from "@ant-design/icons"
import { AboutStyled } from "./style"
import { ThemeContext } from "../../../context/ThemeContext"

const { Title, Paragraph, Text } = Typography

interface AboutType {
  children?: ReactNode
}

const About: React.FC<AboutType> = memo(() => {
  const { t } = useTranslation()
  const theme = useContext(ThemeContext)
  const isDark = theme.theme === "dark"
  const projectName = "Keyie Template"

  const features = [
    { icon: <RocketOutlined />, text: t("about.feature1"), color: "#1890ff" },
    { icon: <GlobalOutlined />, text: t("about.feature2"), color: "#52c41a" },
    { icon: <ThunderboltOutlined />, text: t("about.feature3"), color: "#faad14" },
    { icon: <SafetyOutlined />, text: t("about.feature4"), color: "#f5222d" },
    { icon: <TeamOutlined />, text: t("about.feature5"), color: "#722ed1" },
    { icon: <HeartOutlined />, text: t("about.feature6"), color: "#eb2f96" },
  ]

  const techStack = [
    { name: "React", version: "18.x", color: "#61dafb" },
    { name: "TypeScript", version: "5.x", color: "#3178c6" },
    { name: "Ant Design", version: "5.x", color: "#1890ff" },
    { name: "Vite", version: "5.x", color: "#646cff" },
    { name: "Redux Toolkit", version: "2.x", color: "#764abc" },
    { name: "React Router", version: "6.x", color: "#ca4245" },
  ]

  const milestones = [
    { year: "2024", title: t("about.milestone1"), description: t("about.milestone1Desc") },
    { year: "2024", title: t("about.milestone2"), description: t("about.milestone2Desc") },
    { year: "2024", title: t("about.milestone3"), description: t("about.milestone3Desc") },
  ]

  return (
    <AboutStyled $isDark={isDark}>
      <div className="about-container">
        <Card className="about-card">
          <div className="header-section">
            <InfoCircleOutlined className="title-icon" />
            <Title level={2} className="title">
              {projectName}
            </Title>
            <Paragraph className="description">{t("about.description")}</Paragraph>
            <div className="version-info">
              <Tag color="blue" className="version-tag">
                {t("about.version")}: {t("about.versionNumber")}
              </Tag>
            </div>
          </div>

          <Divider />

          <div className="stats-section">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Statistic title={t("about.users")} value={10000} suffix="+" />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic title={t("about.projects")} value={500} suffix="+" />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic title={t("about.countries")} value={20} suffix="+" />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic title={t("about.satisfaction")} value={99.5} suffix="%" />
              </Col>
            </Row>
          </div>

          <Divider />

          <div className="features-section">
            <Title level={3} className="section-title">
              {t("about.features")}
            </Title>
            <Row gutter={[16, 16]}>
              {features.map((feature, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <div className="feature-item">
                    <div className="feature-icon" style={{ color: feature.color }}>
                      {feature.icon}
                    </div>
                    <Text className="feature-text">{feature.text}</Text>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          <Divider />

          <div className="tech-section">
            <Title level={3} className="section-title">
              {t("about.techStack")}
            </Title>
            <div className="tech-tags">
              {techStack.map((tech, index) => (
                <Tag key={index} color={tech.color} className="tech-tag">
                  {tech.name} {tech.version}
                </Tag>
              ))}
            </div>
          </div>

          <Divider />

          <div className="timeline-section">
            <Title level={3} className="section-title">
              {t("about.development")}
            </Title>
            <Timeline
              items={milestones.map((milestone) => ({
                children: (
                  <div className="timeline-item">
                    <Title level={4} className="timeline-title">
                      {milestone.title}
                    </Title>
                    <Text className="timeline-description">{milestone.description}</Text>
                  </div>
                ),
              }))}
            />
          </div>

          <Divider />

          <div className="contact-section">
            <Title level={3} className="section-title">
              {t("about.contact")}
            </Title>
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Space direction="vertical" size="large" className="contact-info">
                  <div className="contact-item">
                    <MailOutlined className="contact-icon" />
                    <div className="contact-details">
                      <Text strong>{t("about.email")}</Text>
                      <Text>contact@keyie.com</Text>
                    </div>
                  </div>
                  <div className="contact-item">
                    <PhoneOutlined className="contact-icon" />
                    <div className="contact-details">
                      <Text strong>{t("about.phone")}</Text>
                      <Text>+86 400-123-4567</Text>
                    </div>
                  </div>
                  <div className="contact-item">
                    <EnvironmentOutlined className="contact-icon" />
                    <div className="contact-details">
                      <Text strong>{t("about.address")}</Text>
                      <Text>{t("about.addressDetail")}</Text>
                    </div>
                  </div>
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <div className="social-links">
                  <Title level={4} className="social-title">
                    {t("about.followUs")}
                  </Title>
                  <Space size="large">
                    <a href="https://github.com/keyie" target="_blank" rel="noopener noreferrer">
                      <GithubOutlined className="social-icon" />
                    </a>
                    <a href="https://keyie.com" target="_blank" rel="noopener noreferrer">
                      <GlobalOutlined className="social-icon" />
                    </a>
                  </Space>
                </div>
              </Col>
            </Row>
          </div>

          <Divider />

          <div className="footer-section">
            <Text type="secondary" className="copyright">
              {t("about.copyright")} {projectName}
            </Text>
          </div>
        </Card>
      </div>
    </AboutStyled>
  )
})

About.displayName = "About"

export default About
