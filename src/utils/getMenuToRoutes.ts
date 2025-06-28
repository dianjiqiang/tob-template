import { routesType } from "@/router/type"

export const getMenuToRoutes = (routes: routesType[], rules: string[]): routesType[] => {
  const processRoutes = (routes: any[]): any[] => {
    return (
      routes
        .map((route) => {
          const clonedRoute = { ...route }

          // 1. 权限过滤（有 rules 字段且不满足权限时过滤）
          if (clonedRoute.rules?.length > 0 && !clonedRoute.rules.some((r: string) => rules.includes(r))) {
            return null
          }

          // 2. 隐藏菜单过滤
          if (clonedRoute.hiddenMenu) return null

          // 3. 参数转换（添加 key 属性）
          clonedRoute.key = clonedRoute.path

          // 4. 处理子路由（包含隐藏子菜单逻辑）
          if (clonedRoute.children) {
            clonedRoute.children = processRoutes(clonedRoute.children)
            // 隐藏子菜单逻辑（保留 children 但置空）
            if (clonedRoute.hiddenChildrenMenu) {
              clonedRoute.children = []
            }
          }

          // 5. 清理不需要的字段
          delete clonedRoute.hiddenMenu
          delete clonedRoute.hiddenChildrenMenu
          if (clonedRoute.children && !clonedRoute.children.length) {
            delete clonedRoute.children
          }

          return clonedRoute
        })
        .filter(Boolean)
        // 6. 路由排序逻辑
        .sort((a, b) => (a.no ?? 999) - (b.no ?? 999))
    )
  }

  return processRoutes(routes)
}
