import React from "react"
import { GithubOutlined, MailOutlined, GlobalOutlined, TeamOutlined } from "@ant-design/icons"
import { AboutStyled, GlassCard, NeonTag, FlowRow, GlowFooter } from "./style"
import { useThemeStore } from "store/theme"
import { useShallow } from "zustand/shallow"

const techStack = [
  { name: "React", color: "#61dafb" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Ant Design", color: "#1677ff" },
  { name: "Vite", color: "#646cff" },
  { name: "Zustand", color: "#ffb300" },
  { name: "Jest", color: "#c21325" },
  { name: "ESLint", color: "#4b32c3" },
  { name: "Prettier", color: "#f7b93e" },
]

const About = () => {
  const theme = useThemeStore(useShallow((state) => state.theme))
  const isDark = theme === "dark"
  return (
    <AboutStyled $isDark={isDark}>
      <div className="about-hero">
        <div className="hero-bg-glow" />
        <h1 className="hero-title">Tob Modern Template</h1>
        <p className="hero-desc">极致现代化、炫酷动效、极致体验的 React 企业级模板</p>
      </div>
      <GlassCard className="about-tech-card">
        <h2 className="section-title">技术栈 Technology Stack</h2>
        <FlowRow>
          {techStack.map((tech, idx) => (
            <NeonTag key={idx} color={tech.color}>
              {tech.name}
            </NeonTag>
          ))}
        </FlowRow>
      </GlassCard>
      <div className="about-main-row">
        <GlassCard className="about-team-card">
          <h2 className="section-title">
            <TeamOutlined /> 团队 Team
          </h2>
          <div className="team-content">
            <div className="team-avatar-glow" />
            <div className="team-info">
              <div className="team-name">Tob Dev Team</div>
              <div className="team-desc">专注于现代 Web 技术与极致体验</div>
              <a className="team-link" href="https://github.com/keyie" target="_blank" rel="noopener noreferrer">
                <GithubOutlined /> GitHub
              </a>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="about-contact-card">
          <h2 className="section-title">联系方式 Contact</h2>
          <div className="contact-list">
            <div className="contact-item">
              <MailOutlined className="contact-icon" /> contact@tob.com
            </div>
            <div className="contact-item">
              <GlobalOutlined className="contact-icon" /> https://tob.com
            </div>
          </div>
        </GlassCard>
      </div>
      <GlowFooter>
        <span>© 2024 Tob Modern Template. All Rights Reserved.</span>
      </GlowFooter>
    </AboutStyled>
  )
}

export default About
