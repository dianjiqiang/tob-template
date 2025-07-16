import { Suspense, useEffect, useState, memo } from "react"
import { useRoutes, useLocation, useNavigate } from "react-router-dom"
import { Spin, message } from "antd"
import { useTranslation } from "react-i18next"
import initialRoutes, { excludeRoutes } from "router/index"

import { useShallow } from "zustand/shallow"
import { userStore } from "./store/user"

import Menu from "./components/Menu"
import Header from "./components/Header"
import Loading from "./components/Loading"
import RouteProgress from "./components/RouteProgress"

import { AppStyled } from "./style"
import eventBus from "@/utils/eventbus"
import { style } from "@/const"

import type { routesType } from "./router/type"

import "./i18n"

const App = memo(() => {
  const { t } = useTranslation()
  const [isLoading, setLoading] = useState(false)
  const [showGlobalLoading, setShowGlobalLoading] = useState(false)
  const [routes, setRoutes] = useState(initialRoutes)
  const [isRoutesInitialized, setIsRoutesInitialized] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isLoadingExiting, setIsLoadingExiting] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(localStorage.getItem("isFoundMenu") === "true")
  const { asyncGetUserInfo, asyncInitialRoutes } = userStore(
    useShallow((state) => ({
      asyncGetUserInfo: state.asyncGetUserInfo,
      asyncInitialRoutes: state.asyncInitialRoutes,
    }))
  )

  const location = useLocation()
  const navigate = useNavigate()
  const renderedRoutes = useRoutes(routes)

  // 检查是否所有初始化都完成
  const isAppReady = isInitialized && (isRoutesInitialized || excludeRoutes.includes(location.pathname))

  useEffect(() => {
    const handleGlobalLoading = (data: boolean) => {
      setLoading(data)
    }
    const handleGlobalCustomLoading = (data: boolean) => {
      if (data) {
        setShowGlobalLoading(true)
        setIsLoadingExiting(false)
      } else {
        setIsLoadingExiting(true)
      }
    }
    const handleRoutesChange = (data: routesType[]) => {
      setRoutes(data)
      setIsRoutesInitialized(true)
    }

    eventBus.on("changeGlobLoading", handleGlobalLoading)
    eventBus.on("changeGlobalCustomLoading", handleGlobalCustomLoading)
    eventBus.on("changeRoutes", handleRoutesChange)

    return () => {
      eventBus.off("changeGlobLoading", handleGlobalLoading)
      eventBus.off("changeGlobalCustomLoading", handleGlobalCustomLoading)
      eventBus.off("changeRoutes", handleRoutesChange)
    }
  }, [])

  // 监听Menu折叠状态变化
  useEffect(() => {
    const handleMenuToggle = () => {
      const isCollapsed = localStorage.getItem("isFoundMenu") === "true"
      setIsMenuCollapsed(isCollapsed)
    }

    // 监听localStorage变化
    window.addEventListener("storage", handleMenuToggle)

    // 监听自定义事件（如果Menu组件触发的话）
    eventBus.on("menuToggle", handleMenuToggle)

    return () => {
      window.removeEventListener("storage", handleMenuToggle)
      eventBus.off("menuToggle", handleMenuToggle)
    }
  }, [])

  useEffect(() => {
    if (!isInitialized) {
      const initializeApp = async () => {
        const token = localStorage.getItem("token")
        if (token) {
          try {
            const res = await asyncGetUserInfo()
            asyncInitialRoutes(res.permissions || [])
          } catch {
            if (!excludeRoutes.includes(location.pathname)) {
              message.error(t("error.notLoggedInDesc"))
              navigate("/login")
            }
          }
        } else {
          if (!excludeRoutes.includes(location.pathname)) {
            navigate("/login")
          }
        }

        setIsInitialized(true)
      }

      initializeApp()
    }
  }, [t, isInitialized, location.pathname, navigate, asyncGetUserInfo, asyncInitialRoutes])

  // 当应用准备就绪时，触发Loading退出动画
  useEffect(() => {
    if (isAppReady && showLoading) {
      setIsLoadingExiting(true)
    }
  }, [isAppReady, showLoading])

  // Loading退出动画完成后的回调
  const handleLoadingExitComplete = () => {
    setShowLoading(false)
  }

  // 计算右侧内容的左边距
  const getRightMarginLeft = () => {
    return isMenuCollapsed ? style.MENU_CLOSE_WIDTH : style.MEMU_OPEN_WIDTH
  }

  // 计算Header的左边距
  const getHeaderPaddingLeft = () => {
    const menuWidth = isMenuCollapsed ? style.MENU_CLOSE_WIDTH : style.MEMU_OPEN_WIDTH
    return menuWidth + 12
  }

  return (
    <AppStyled>
      {/* 路由切换进度条 */}
      <RouteProgress />

      {/* 显示Loading组件 */}
      {(showLoading || showGlobalLoading) && (
        <Loading
          fullScreen
          size="large"
          text={import.meta.env.VITE_PROJECT_NAME}
          isExiting={isLoadingExiting}
          onExitComplete={handleLoadingExitComplete}
        />
      )}

      {/* 在应用准备就绪时就开始显示主内容，让页面在Loading渐变时慢慢变清晰 */}
      {isAppReady && (
        <Spin spinning={isLoading} size="large">
          {excludeRoutes.includes(location.pathname) ? (
            <Suspense fallback="">
              <div className="main">{renderedRoutes}</div>
            </Suspense>
          ) : (
            <div className="app-container">
              <div className="app-left">
                <Menu routes={routes}></Menu>
              </div>
              <div className="app-right" style={{ marginLeft: getRightMarginLeft() }}>
                <Header routes={routes} style={{ paddingLeft: getHeaderPaddingLeft() }} />
                <Suspense fallback="">
                  <div className="main">{renderedRoutes}</div>
                </Suspense>
              </div>
            </div>
          )}
        </Spin>
      )}
    </AppStyled>
  )
})

export default App
