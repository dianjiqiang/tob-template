import { useEffect } from "react"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

NProgress.configure({ showSpinner: false })

const GlobalLoadingProgress = () => {
  useEffect(() => {
    NProgress.start()

    const timer = setTimeout(() => {
      NProgress.done()
    }, 1000)

    return () => {
      clearTimeout(timer)
      NProgress.done()
    }
  }, [])

  return null
}

export default GlobalLoadingProgress
