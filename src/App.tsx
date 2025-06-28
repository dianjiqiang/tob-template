import { Suspense, useEffect, useState, memo } from "react"
import { useRoutes, useLocation, useNavigate } from "react-router-dom"
import { Spin, message } from "antd"
import { useTranslation } from "react-i18next"
import initialRoutes, { excludeRoutes } from "router/index"
import { asyncGetUserInfo, setUserInfo } from "./store/modules/user"
import { useDispatch } from "react-redux"
import type { routesType } from "./router/type"

import Menu from "./components/Menu"
import Header from "./components/Header"
import Loading from "./components/Loading"
import RouteProgress from "./components/RouteProgress"

import { AppStyled } from "./style"
import eventBus from "@/utils/eventbus"
import { style } from "@/const"

import "./i18n"
import "@/router/getRoutes"

const App = memo(() => {
  const { t } = useTranslation()
  const [isLoading, setLoading] = useState(false)
  const [routes, setRoutes] = useState(initialRoutes)
  const [isRoutesInitialized, setIsRoutesInitialized] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isLoadingExiting, setIsLoadingExiting] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(localStorage.getItem("isFoundMenu") === "true")
  const dispatch = useDispatch<any>()

  const location = useLocation()
  const navigate = useNavigate()
  const renderedRoutes = useRoutes(routes)

  // 检查是否所有初始化都完成
  const isAppReady = isInitialized && (isRoutesInitialized || location.pathname === "/login")

  useEffect(() => {
    eventBus.on("changeGlobLoading", (data: boolean) => {
      setLoading(data)
    })
    eventBus.on("changeRoutes", (data: routesType[]) => {
      setRoutes(data)
      setIsRoutesInitialized(true)
    })
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
      // eventBus没有off方法，这里不需要清理
    }
  }, [])

  useEffect(() => {
    if (!isInitialized) {
      if (location.pathname !== "/login") {
        if (localStorage.getItem("token")) {
          dispatch(asyncGetUserInfo({}))
            .then((res: any) => {
              dispatch(setUserInfo(res.payload))
            })
            .catch(() => {
              message.error(t("error.notLoggedInDesc"))
              navigate("/login")
            })
            .finally(() => {
              setIsInitialized(true)
            })
        } else {
          setIsInitialized(true)
          navigate("/login")
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, t, isInitialized])

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
    return menuWidth + 12 // 增加12px的额外间距
  }

  return (
    <AppStyled>
      {/* 路由切换进度条 */}
      <RouteProgress />

      {/* 显示Loading组件 */}
      {showLoading && (
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
