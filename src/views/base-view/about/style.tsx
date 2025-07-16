import styled, { keyframes } from "styled-components"

interface AboutStyledProps {
  $isDark: boolean
}

// 渐变发光动画
const glow = keyframes`
  0% { filter: blur(16px) brightness(1.1); }
  50% { filter: blur(32px) brightness(1.4); }
  100% { filter: blur(16px) brightness(1.1); }
`

// 霓虹流光动画
const neonFlow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`

export const AboutStyled = styled.div<AboutStyledProps>`
  min-height: 100vh;
  background: ${(props) =>
    props.$isDark
      ? `linear-gradient(135deg, #0f2027 0%, #2c5364 100%)`
      : `linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)`};
  position: relative;
  overflow-x: hidden;

  .about-hero {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 320px;
    margin-bottom: 32px;
    z-index: 1;
    .hero-bg-glow {
      position: absolute;
      top: 0;
      left: 50%;
      width: 80vw;
      height: 320px;
      transform: translateX(-50%);
      background: ${(props) =>
        props.$isDark
          ? `radial-gradient(circle at 50% 30%, #1677ff88 0%, #0f2027 80%)`
          : `radial-gradient(circle at 50% 30%, #1677ff44 0%, #e0e7ff 80%)`};
      filter: blur(48px);
      opacity: 0.8;
      animation: ${glow} 4s ease-in-out infinite;
      z-index: 0;
    }
    .hero-title {
      font-size: 3.2rem;
      font-weight: 900;
      letter-spacing: 2px;
      color: ${(props) => (props.$isDark ? "#fff" : "#222")};
      text-shadow: 0 0 32px #1677ff99, 0 2px 8px #0002;
      margin-bottom: 18px;
      z-index: 1;
      background: linear-gradient(90deg, #1677ff, #00e0ff, #1677ff);
      background-size: 200% 100%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: ${neonFlow} 6s linear infinite alternate;
    }
    .hero-desc {
      font-size: 1.35rem;
      color: ${(props) => (props.$isDark ? "#b3e5ff" : "#333")};
      font-weight: 500;
      text-align: center;
      margin-bottom: 0;
      z-index: 1;
      text-shadow: 0 2px 12px #1677ff22;
    }
  }
  .about-main-row {
    display: flex;
    gap: 32px;
    justify-content: center;
    margin: 40px 0 0 0;
    flex-wrap: wrap;
  }
  @media (max-width: 900px) {
    .about-main-row {
      flex-direction: column;
      gap: 18px;
      align-items: stretch;
    }
  }
`

// 玻璃拟态卡片
export const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(16, 40, 80, 0.18), 0 1.5px 8px #1677ff33;
  backdrop-filter: blur(18px) saturate(1.2);
  border: 1.5px solid rgba(22, 119, 255, 0.18);
  padding: 36px 40px 28px 40px;
  margin: 0 auto 32px auto;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s, border 0.3s;
  &:hover {
    box-shadow: 0 12px 48px 0 #1677ff55, 0 2px 16px #00e0ff44;
    border-color: #1677ff;
  }
  .section-title {
    font-size: 1.3rem;
    font-weight: 800;
    color: #1677ff;
    margin-bottom: 24px;
    letter-spacing: 1px;
    text-shadow: 0 2px 12px #1677ff22;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  @media (max-width: 700px) {
    padding: 18px 8px 12px 8px;
    border-radius: 14px;
  }
`

// 霓虹流光标签
export const NeonTag = styled.span<{ color: string }>`
  display: inline-block;
  min-width: 90px;
  text-align: center;
  font-size: 1.08rem;
  font-weight: 700;
  color: #fff;
  padding: 10px 26px;
  margin: 0 10px 12px 0;
  border-radius: 18px;
  background: linear-gradient(90deg, ${(p) => p.color}, #1677ff, #00e0ff, ${(p) => p.color});
  background-size: 300% 100%;
  box-shadow: 0 2px 16px ${(p) => p.color}55, 0 1px 8px #1677ff33;
  border: 1.5px solid ${(p) => p.color};
  animation: ${neonFlow} 3s linear infinite alternate;
  transition: transform 0.18s, box-shadow 0.18s;
  cursor: pointer;
  &:hover {
    transform: scale(1.08) rotate(-2deg);
    box-shadow: 0 4px 32px ${(p) => p.color}99, 0 2px 16px #00e0ff77;
  }
`

// 横向流光区
export const FlowRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0;
  min-height: 60px;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
    min-height: unset;
  }
`

// 底部发光版权
export const GlowFooter = styled.footer`
  width: 100vw;
  text-align: center;
  padding: 32px 0 18px 0;
  position: relative;
  z-index: 2;
  span {
    font-size: 1.08rem;
    color: #1677ff;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-shadow: 0 0 16px #1677ff99, 0 2px 8px #0002;
    background: linear-gradient(90deg, #1677ff, #00e0ff, #1677ff);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${neonFlow} 6s linear infinite alternate;
  }
`

// 团队卡片内发光头像和信息
export const TeamAvatarGlow = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1677ff 0%, #00e0ff 100%);
  box-shadow: 0 0 32px #1677ff99, 0 2px 8px #00e0ff55;
  margin-right: 24px;
  margin-bottom: 12px;
  @media (max-width: 700px) {
    margin: 0 auto 12px auto;
  }
`
// 团队信息区
export const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  .team-name {
    font-size: 1.18rem;
    font-weight: 800;
    color: #1677ff;
    margin-bottom: 6px;
    letter-spacing: 1px;
  }
  .team-desc {
    font-size: 1.02rem;
    color: #00e0ff;
    margin-bottom: 8px;
  }
  .team-link {
    color: #1677ff;
    font-weight: 700;
    text-decoration: none;
    transition: color 0.18s, text-shadow 0.18s;
    &:hover {
      color: #00e0ff;
      text-shadow: 0 2px 12px #00e0ff77;
    }
  }
`
// 联系方式区
export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  .contact-item {
    font-size: 1.08rem;
    color: #1677ff;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 12px;
    .contact-icon {
      font-size: 1.4rem;
      color: #00e0ff;
      filter: drop-shadow(0 0 8px #00e0ff88);
    }
  }
`
