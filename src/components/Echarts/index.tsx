import React, { memo, useRef, useEffect, useState } from "react"
import { debounce } from "lodash-es"
import type { ReactNode } from "react"
import * as echarts from "echarts"
import type { EChartsOption, ECharts } from "echarts"
import { EchartsStyled } from "./style"

interface EchartsType {
  children?: ReactNode
  width?: string
  height?: string
  options?: EChartsOption
}

const resizeFn = (charts: ECharts | undefined) => {
  if (charts) {
    charts.resize()
  }
}

const resizeFnDebounce = debounce(resizeFn, 300, { leading: false, trailing: true })

const Echarts: React.FC<EchartsType> = memo((props) => {
  const [currentInstance, setCurrentInstance] = useState<ECharts>()
  const [isOnce, setIsOnce] = useState<boolean>(true)
  const echartsRef = useRef<HTMLDivElement | null>(null)

  // init
  useEffect(() => {
    const echartsInstance = echarts.init(echartsRef.current)
    if (!currentInstance) {
      setCurrentInstance(echartsInstance)
    }
    if (echartsRef.current && props.options) {
      echartsInstance.setOption(props.options)
    }
  }, [echartsRef])

  // runtime
  useEffect(() => {
    if (currentInstance && props.options) {
      currentInstance.setOption(props.options)
    }
  }, [props.options, currentInstance])

  // resize
  useEffect(() => {
    if (currentInstance) {
      currentInstance.resize()
    }
  }, [props.width, props.height])

  useEffect(() => {
    if (currentInstance) {
      const resizeObserver = new ResizeObserver(() => {
        if (isOnce) {
          setTimeout(() => {
            setIsOnce(false)
          }, 3000)
          return
        }
        resizeFnDebounce(currentInstance)
      })
      resizeObserver.observe(echartsRef.current as Element)
    }
  }, [currentInstance, isOnce])
  return (
    <EchartsStyled width={props.width} height={props.height}>
      <div className="my-charts-es" ref={echartsRef}></div>
    </EchartsStyled>
  )
})

Echarts.displayName = "Echarts"

export default Echarts
