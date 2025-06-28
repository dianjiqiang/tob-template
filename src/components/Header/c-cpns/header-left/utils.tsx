import { routesType } from "@/router/type"
import React from "react"

type ResultType = {
  href?: string
  title: JSX.Element
}

// 路由映射表类型
type RouteMap = Map<
  string,
  {
    href: string
    title: JSX.Element
  }
>

// 构建路由映射表
const buildRouteMap = (routeMenu: routesType[]): RouteMap => {
  const routeMap = new Map<string, { href: string; title: JSX.Element }>()

  const traverseRoutes = (routes: routesType[]) => {
    for (const item of routes) {
      if (item.path) {
        routeMap.set(item.path, {
          href: item.path,
          title: (
            <>
              {item?.icon && React.isValidElement(item.icon) ? item.icon : null}
              <span>{item.label}</span>
            </>
          ),
        })
      }

      if (item.children && Array.isArray(item.children) && item.children.length) {
        traverseRoutes(item.children)
      }
    }
  }

  traverseRoutes(routeMenu)
  return routeMap
}

// 缓存路由映射表
let routeMapCache: RouteMap | null = null
let lastRouteMenu: routesType[] | null = null

// 获取或构建路由映射表
const getRouteMap = (routeMenu: routesType[]): RouteMap => {
  // 如果路由菜单没有变化，直接返回缓存
  if (routeMapCache && lastRouteMenu === routeMenu) {
    return routeMapCache
  }

  // 重新构建映射表
  routeMapCache = buildRouteMap(routeMenu)
  lastRouteMenu = routeMenu
  return routeMapCache
}

const findRouteForPath = (routeMenu: routesType[], path: string) => {
  const routeMap = getRouteMap(routeMenu)
  return routeMap.get(path)
}

export const getBreadcrumbItems = (routeMenu: routesType[], keyPath: string[]) => {
  const breadcrumbItems: ResultType[] = []

  keyPath.forEach((item: string) => {
    const result = findRouteForPath(routeMenu, item)

    if (result) {
      breadcrumbItems.push(result)
    }
  })

  if (breadcrumbItems.length > 0) {
    delete breadcrumbItems[breadcrumbItems.length - 1]?.href
  }

  return breadcrumbItems
}
