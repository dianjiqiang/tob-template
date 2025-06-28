import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { RouteProgressStyled } from "./style.tsx"

const RouteProgress: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const location = useLocation()

  useEffect(() => {
    // 路由变化时启动进度条
    setIsVisible(true)
    setProgress(0)

    // 快速进度增长
    const timer1 = setTimeout(() => setProgress(50), 50)
    const timer2 = setTimeout(() => setProgress(80), 150)
    const timer3 = setTimeout(() => setProgress(95), 250)
    const timer4 = setTimeout(() => {
      setProgress(100)
      // 完成后快速隐藏进度条
      setTimeout(() => setIsVisible(false), 100)
    }, 300)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [location.pathname])

  if (!isVisible) return null

  return (
    <RouteProgressStyled>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
        <div className="progress-glow" style={{ left: `${progress}%` }} />
      </div>
    </RouteProgressStyled>
  )
}

RouteProgress.displayName = "RouteProgress"

export default RouteProgress
