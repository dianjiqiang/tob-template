import type { routesType } from "./type"
import routes from "."
import eventBus from "@/utils/eventbus"
import { cloneDeep } from "lodash-es"

interface ModuleType {
  default: Record<string, any>
}

const filterRules = (rulesList: string[], validRules: string[]): string[] => {
  return rulesList.filter((rule) => validRules.includes(rule))
}

const filterRoute = (routeObj: routesType, validRules: string[] | null): any => {
  if (!validRules || !routeObj.rules || routeObj.rules.length === 0) {
    return { ...routeObj }
  }

  const filteredRules = filterRules(routeObj.rules, validRules)

  if (filteredRules.length === 0) return null

  const filteredChildren = routeObj.children
    ? routeObj.children.map((child: any) => filterRoute(child, validRules)).filter((child) => child !== null)
    : []
  return {
    ...routeObj,
    rules: filteredRules,
    children: filteredChildren,
  }
}

export const getRoutes = async (roles: string[]) => {
  try {
    // 显示自定义全局 Loading
    eventBus.emit("changeGlobalCustomLoading", true)

    const initialRoutes = cloneDeep(routes)
    const routesModules = import.meta.glob<ModuleType>("./modules/**/*.tsx")

    const urlList = Object.keys(routesModules)
    const routesList: routesType[] = []
    for (const item of urlList) {
      const route = await routesModules[item]()
      routesList.push(route.default)
    }
    routesList.forEach((routeData) => {
      const resultRoute = filterRoute(routeData, roles)
      if (resultRoute) {
        initialRoutes.push(resultRoute)
      }
    })

    eventBus.emit("changeRoutes", initialRoutes)
  } finally {
    // 隐藏自定义全局 Loading
    eventBus.emit("changeGlobalCustomLoading", false)
  }
}
