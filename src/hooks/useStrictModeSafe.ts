import { useRef, useEffect } from "react"

/**
 * 在 StrictMode 下安全地执行副作用
 * 防止在开发模式下重复执行
 */
export const useStrictModeSafe = (effect: () => void | (() => void), deps: React.DependencyList = []) => {
  const hasRunRef = useRef(false)
  const cleanupRef = useRef<(() => void) | void>()

  useEffect(() => {
    // 在 StrictMode 下，effect 会被调用两次
    // 我们只在第一次调用时执行
    if (!hasRunRef.current) {
      hasRunRef.current = true
      cleanupRef.current = effect()
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
      hasRunRef.current = false
    }
  }, deps)
}

/**
 * 在 StrictMode 下安全地执行异步副作用
 */
export const useStrictModeSafeAsync = (effect: () => Promise<void | (() => void)>, deps: React.DependencyList = []) => {
  const hasRunRef = useRef(false)
  const cleanupRef = useRef<(() => void) | void>()

  useEffect(() => {
    if (!hasRunRef.current) {
      hasRunRef.current = true

      effect().then((cleanup) => {
        cleanupRef.current = cleanup
      })
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
      hasRunRef.current = false
    }
  }, deps)
}
