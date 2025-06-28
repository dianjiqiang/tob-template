import styled, { keyframes, css } from "styled-components"

// 分离的动画定义
const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-40px);
  }
  100% {
    transform: translateY(0);
  }
`

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`

const dots = keyframes`
  0%, 20% {
    opacity: 0;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-5px);
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
`

const gradientMove = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
`

const particleFloat = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
`

// 退出动画
const fadeOutScale = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
`

interface LoadingStyledProps {
  $isDark: boolean
  $size: "small" | "medium" | "large"
  $fullScreen: boolean
  $isExiting: boolean
}

export const LoadingStyled = styled.div<LoadingStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.$fullScreen ? "100vw" : "100%")};
  height: ${(props) => (props.$fullScreen ? "100vh" : "100%")};
  position: ${(props) => (props.$fullScreen ? "fixed" : "relative")};
  top: ${(props) => (props.$fullScreen ? "0" : "auto")};
  left: ${(props) => (props.$fullScreen ? "0" : "auto")};
  z-index: ${(props) => (props.$fullScreen ? "20" : "auto")};
  background: ${(props) =>
    props.$isDark
      ? "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)"
      : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 50%, #e0eafc 100%)"};
  overflow: hidden;
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;

  ${(props) =>
    props.$isExiting
      ? css`
          animation: ${fadeOutScale} 0.8s ease-out forwards;
          z-index: 19;
        `
      : ""}

  .loading-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .background-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
  }

  .gradient-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    animation: ${gradientMove} 8s ease-in-out infinite;
  }

  .circle-1 {
    width: 300px;
    height: 300px;
    background: ${(props) =>
      props.$isDark
        ? "radial-gradient(circle, rgba(103, 58, 183, 0.3) 0%, rgba(33, 150, 243, 0.2) 50%, transparent 100%)"
        : "radial-gradient(circle, rgba(103, 58, 183, 0.2) 0%, rgba(33, 150, 243, 0.1) 50%, transparent 100%)"};
    top: 20%;
    left: 20%;
    animation-delay: 0s;
  }

  .circle-2 {
    width: 200px;
    height: 200px;
    background: ${(props) =>
      props.$isDark
        ? "radial-gradient(circle, rgba(255, 64, 129, 0.3) 0%, rgba(156, 39, 176, 0.2) 50%, transparent 100%)"
        : "radial-gradient(circle, rgba(255, 64, 129, 0.2) 0%, rgba(156, 39, 176, 0.1) 50%, transparent 100%)"};
    top: 60%;
    right: 20%;
    animation-delay: 2s;
  }

  .circle-3 {
    width: 250px;
    height: 250px;
    background: ${(props) =>
      props.$isDark
        ? "radial-gradient(circle, rgba(0, 188, 212, 0.3) 0%, rgba(76, 175, 80, 0.2) 50%, transparent 100%)"
        : "radial-gradient(circle, rgba(0, 188, 212, 0.2) 0%, rgba(76, 175, 80, 0.1) 50%, transparent 100%)"};
    bottom: 20%;
    left: 50%;
    animation-delay: 4s;
  }

  .loading-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .animation-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bouncing-element {
    animation: ${bounce} 1s ease-in-out infinite;
    position: relative;
    z-index: 2;
  }

  .rotating-element {
    animation: ${rotate} 2s linear infinite;
  }

  .loading-shape {
    width: ${(props) => {
      switch (props.$size) {
        case "small":
          return "32px"
        case "large":
          return "64px"
        default:
          return "48px"
      }
    }};
    height: ${(props) => {
      switch (props.$size) {
        case "small":
          return "32px"
        case "large":
          return "64px"
        default:
          return "48px"
      }
    }};
    background: ${(props) =>
      props.$isDark
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
    border-radius: 12px;
    box-shadow: ${(props) =>
      props.$isDark
        ? "0 8px 32px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(102, 126, 234, 0.1)"
        : "0 8px 32px rgba(102, 126, 234, 0.3), 0 0 0 1px rgba(102, 126, 234, 0.1)"};
    position: relative;
    overflow: hidden;
  }

  .loading-shape::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%);
    animation: ${pulse} 2s ease-in-out infinite;
  }

  .element-shadow {
    width: ${(props) => {
      switch (props.$size) {
        case "small":
          return "40px"
        case "large":
          return "80px"
        default:
          return "60px"
      }
    }};
    height: 16px;
    background: ${(props) =>
      props.$isDark
        ? "radial-gradient(ellipse, rgba(0, 0, 0, 0.4) 0%, transparent 70%)"
        : "radial-gradient(ellipse, rgba(0, 0, 0, 0.2) 0%, transparent 70%)"};
    border-radius: 50%;
    margin-top: 8px;
    animation: ${float} 1s ease-in-out infinite;
    position: relative;
    z-index: 2;
  }

  .bottom-mask {
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: ${(props) => {
      switch (props.$size) {
        case "small":
          return "45px"
        case "large":
          return "90px"
        default:
          return "68px"
      }
    }};
    height: ${(props) => {
      switch (props.$size) {
        case "small":
          return "20px"
        case "large":
          return "35px"
        default:
          return "28px"
      }
    }};
    background: ${(props) =>
      props.$isDark
        ? "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)"
        : "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)"};
    border-radius: 50%;
    z-index: 3;
    filter: blur(2px);
  }

  .loading-text {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${(props) => {
      switch (props.$size) {
        case "small":
          return "14px"
        case "large":
          return "20px"
        default:
          return "16px"
      }
    }};
    font-weight: 500;
    color: ${(props) => (props.$isDark ? "#ffffff" : "#333333")};
    text-shadow: ${(props) => (props.$isDark ? "0 0 10px rgba(255, 255, 255, 0.3)" : "0 0 10px rgba(0, 0, 0, 0.1)")};
  }

  .text-content {
    animation: ${float} 3s ease-in-out infinite;
  }

  .text-dots {
    display: flex;
    gap: 2px;
  }

  .dot {
    animation: ${dots} 1.4s ease-in-out infinite;
    animation-delay: calc(var(--dot-index) * 0.2s);
  }

  .dot:nth-child(1) {
    --dot-index: 1;
  }

  .dot:nth-child(2) {
    --dot-index: 2;
  }

  .dot:nth-child(3) {
    --dot-index: 3;
  }

  .decorative-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: ${(props) =>
      props.$isDark ? "linear-gradient(45deg, #667eea, #764ba2)" : "linear-gradient(45deg, #667eea, #764ba2)"};
    border-radius: 50%;
    animation: ${particleFloat} 3s ease-in-out infinite;
  }

  .particle-1 {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  .particle-2 {
    top: 30%;
    right: 15%;
    animation-delay: 0.5s;
  }

  .particle-3 {
    bottom: 25%;
    left: 20%;
    animation-delay: 1s;
  }

  .particle-4 {
    bottom: 35%;
    right: 10%;
    animation-delay: 1.5s;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .gradient-circle {
      filter: blur(20px);
    }

    .circle-1 {
      width: 200px;
      height: 200px;
    }

    .circle-2 {
      width: 150px;
      height: 150px;
    }

    .circle-3 {
      width: 180px;
      height: 180px;
    }
  }
`
