import React, { memo, useRef, useEffect, useCallback } from "react"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"
import { useThemeStore } from "store/theme"
import { useShallow } from "zustand/shallow"
import { createEchartsDarkTheme } from "@/assets/theme/echartsTheme"
import { EchartsStyled } from "./style"

interface EchartsProps {
  options: EChartsOption
  className?: string
  style?: React.CSSProperties
  width?: string | number
  height?: string | number
}

const Echarts: React.FC<EchartsProps> = memo((props) => {
  const { options, className, style, width = "100%", height = 300 } = props
  const themeData = useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      background: state.background,
      color: state.color,
      "text-1": state["text-1"],
      "text-2": state["text-2"],
      "text-3": state["text-3"],
      "hover-background": state["hover-background"],
      "active-background": state["active-background"],
      "menu-border-line": state["menu-border-line"],
      "active-hover-background": state["active-hover-background"],
    }))
  )
  const isDark = themeData.theme === "dark"
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const isInitializedRef = useRef(false)

  // 处理宽高值
  const getWidth = () => {
    if (typeof width === "number") {
      return `${width}px`
    }
    return width
  }

  const getHeight = () => {
    if (typeof height === "number") {
      return `${height}px`
    }
    return height
  }

  // 检查容器尺寸是否可用
  const checkContainerSize = useCallback(() => {
    if (!chartRef.current) return false
    const { clientWidth, clientHeight } = chartRef.current
    return clientWidth > 0 && clientHeight > 0
  }, [])

  // 初始化图表
  const initChart = useCallback(() => {
    if (!chartRef.current || !checkContainerSize() || isInitializedRef.current) return

    try {
      // 销毁之前的实例
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose()
      }

      // 注册主题
      if (isDark) {
        const customDarkTheme = createEchartsDarkTheme(themeData)
        echarts.registerTheme("custom-dark", customDarkTheme)
      }

      // 创建新实例
      const themeName = isDark ? "custom-dark" : undefined
      const chart = echarts.init(chartRef.current, themeName)
      chartInstanceRef.current = chart

      // 设置配置
      chart.setOption(options, true)
      isInitializedRef.current = true

      return chart
    } catch (error) {
      console.error("ECharts initialization error:", error)
    }
  }, [isDark, themeData, checkContainerSize, options])

  // 延迟初始化
  const delayedInit = useCallback(() => {
    if (isInitializedRef.current) return

    const timer = setTimeout(() => {
      if (checkContainerSize()) {
        initChart()
      } else {
        delayedInit()
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [checkContainerSize, initChart])

  // 监听尺寸变化
  useEffect(() => {
    if (!chartRef.current) return

    let resizeTimer: NodeJS.Timeout | null = null
    let lastResizeTime = 0

    const handleResize = () => {
      if (chartInstanceRef.current && isInitializedRef.current) {
        try {
          chartInstanceRef.current.resize()
        } catch (error) {
          console.error("ECharts resize error:", error)
        }
      }
    }

    const smartResize = () => {
      const now = Date.now()

      // 检查是否正在播放动画
      const isAnimating = chartInstanceRef.current
        ?.getZr()
        ?.storage?.getDisplayList()
        ?.some((item: any) => item.animeId !== undefined)

      // 如果正在播放动画，延迟resize
      if (isAnimating) {
        if (resizeTimer) {
          clearTimeout(resizeTimer)
        }
        resizeTimer = setTimeout(() => {
          handleResize()
          lastResizeTime = Date.now()
        }, 1000) // 等待动画完成
        return
      }

      // 如果距离上次resize时间很短，使用防抖
      if (now - lastResizeTime < 200) {
        if (resizeTimer) {
          clearTimeout(resizeTimer)
        }
        resizeTimer = setTimeout(() => {
          handleResize()
          lastResizeTime = Date.now()
        }, 100)
      } else {
        // 如果间隔较长，直接执行
        handleResize()
        lastResizeTime = now
      }
    }

    // 创建ResizeObserver
    resizeObserverRef.current = new ResizeObserver(smartResize)
    resizeObserverRef.current.observe(chartRef.current)

    return () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer)
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [])

  // 组件挂载时初始化
  useEffect(() => {
    delayedInit()
  }, [delayedInit])

  // 监听主题变化
  useEffect(() => {
    if (isInitializedRef.current) {
      // 重新初始化以应用新主题
      isInitializedRef.current = false
      initChart()
    }
  }, [isDark, initChart])

  // 组件卸载时清理资源
  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose()
        chartInstanceRef.current = null
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
        resizeObserverRef.current = null
      }
      isInitializedRef.current = false
    }
  }, [])

  // 更新图表配置
  const updateChart = useCallback((newOptions: EChartsOption) => {
    if (!chartInstanceRef.current || !isInitializedRef.current) return

    try {
      chartInstanceRef.current.setOption(newOptions, true)
    } catch (error) {
      console.error("ECharts update error:", error)
    }
  }, [])

  // 监听options变化 - 使用温和的防抖
  useEffect(() => {
    if (!options) return

    const timer = setTimeout(() => {
      updateChart(options)
    }, 100) // 100ms的温和防抖

    return () => clearTimeout(timer)
  }, [options, updateChart])

  return (
    <EchartsStyled
      ref={chartRef}
      className={className}
      style={{
        width: getWidth(),
        height: getHeight(),
        ...style,
      }}
    />
  )
})

Echarts.displayName = "Echarts"

export default Echarts
