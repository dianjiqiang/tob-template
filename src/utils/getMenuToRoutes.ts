import { routesType } from "@/router/type"
export const getMenuToRoutes = (routes: routesType[], rules: string[]): routesType[] => {
  const sortRoutes = (a: routesType, b: routesType) => {
    const noA = a.no ?? 999
    const noB = b.no ?? 999
    return noA - noB
  }

  // 转换路由，检查权限，隐藏菜单等
  const transformRoute = (route: routesType): routesType | null => {
    if (route.hiddenMenu) {
      return null
    }

    if (!route.rules) {
      if (route.children) {
        ;(route as any).children = route.children.filter((child: routesType) => {
          if (child.hiddenChildrenMenu) {
            return false
          }
          return !child.rules || child.rules.some((rule) => rules.includes(rule))
        })
      }
      return route
    }

    if (!route.rules.some((rule) => rules.includes(rule))) {
      return null
    }

    // 检查子路由权限
    if (route.children) {
      ;(route as any).children = route.children.filter((child: routesType) => {
        if (child.hiddenChildrenMenu) {
          return false
        }
        return !child.rules || child.rules.some((rule) => rules.includes(rule))
      })
    }

    // 返回过滤后的路由
    return route
  }

  // 对 routes 进行处理
  const filteredRoutes = routes
    .map(transformRoute) // 转换每个路由
    .filter((route) => route !== null) // 过滤掉 null 的路由
    .sort(sortRoutes) // 排序路由

  return filteredRoutes as routesType[] // 返回最终的路由列表
}
