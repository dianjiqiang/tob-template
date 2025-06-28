import React, { memo, useContext, useState, useEffect } from "react"
import { ThemeContext } from "@/context/ThemeContext"
import { LoadingStyled } from "./style.tsx"

interface LoadingProps {
  text?: string
  size?: "small" | "medium" | "large"
  fullScreen?: boolean
  isExiting?: boolean
  onExitComplete?: () => void
}

const Loading: React.FC<LoadingProps> = memo(
  ({ text = "Keyie Template", size = "medium", fullScreen = false, isExiting = false, onExitComplete }) => {
    const theme = useContext(ThemeContext)
    const isDark = theme.theme === "dark"
    const [shouldRender, setShouldRender] = useState(true)

    useEffect(() => {
      if (isExiting) {
        // 开始退出动画
        const timer = setTimeout(() => {
          setShouldRender(false)
          onExitComplete?.()
        }, 400)

        return () => clearTimeout(timer)
      }
    }, [isExiting, onExitComplete])

    if (!shouldRender) {
      return null
    }

    return (
      <LoadingStyled $isDark={isDark} $size={size} $fullScreen={fullScreen} $isExiting={isExiting}>
        <div className="loading-container">
          {/* 背景渐变 */}
          <div className="background-gradient">
            <div className="gradient-circle circle-1"></div>
            <div className="gradient-circle circle-2"></div>
            <div className="gradient-circle circle-3"></div>
          </div>

          {/* 主要内容 */}
          <div className="loading-content">
            {/* 动画图形 */}
            <div className="animation-container">
              <div className="bouncing-element">
                <div className="rotating-element">
                  <div className="loading-shape"></div>
                </div>
              </div>
              <div className="element-shadow"></div>
              {/* 触底遮挡效果 */}
              <div className="bottom-mask"></div>
            </div>

            {/* 文字 */}
            <div className="loading-text">
              <span className="text-content">{text}</span>
              <div className="text-dots">
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            </div>

            {/* 装饰性元素 */}
            <div className="decorative-elements">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
            </div>
          </div>
        </div>
      </LoadingStyled>
    )
  }
)

Loading.displayName = "Loading"

export default Loading
