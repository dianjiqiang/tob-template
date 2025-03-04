import { routesType } from "@/router/type"

type ResultType = {
  href?: string
  title: JSX.Element
}

const findRouteForPath = (routeMenu: routesType[], path: string) => {
  for (const item of routeMenu) {
    if (item.path === path) {
      return {
        href: item.path,
        title: (
          <>
            {item?.icon ? item.icon : null}
            <span>{item.label}</span>
          </>
        ),
      }
    }
    if (item.children && Array.isArray(item.children) && item.children.length) {
      return findRouteForPath(item.children, path)
    }
  }
}

export const getBreadcrumbItems = (routeMenu: routesType[], keyPath: string[]) => {
  const breadcrumbItems: ResultType[] = []
  keyPath.forEach((item: string) => {
    const result = findRouteForPath(routeMenu, item)
    if (result) {
      breadcrumbItems.push(result)
    }
  })
  delete breadcrumbItems[breadcrumbItems.length - 1]?.href

  return breadcrumbItems
}
