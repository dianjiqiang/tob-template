import styled from "styled-components"

export const RouteProgressStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  pointer-events: none;

  .progress-container {
    position: relative;
    height: 3px;
    background: rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shimmer 1.5s infinite;
    }
  }

  .progress-glow {
    position: absolute;
    top: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    transform: translateX(-50%);
    transition: left 0.3s ease;
    animation: glow 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes glow {
    0%,
    100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
`
