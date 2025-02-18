import type { ForwardRefExoticComponent, RefAttributes, LazyExoticComponent, FC } from "react"
import type { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon"
import { Navigate, RouteObject } from "react-router-dom"

export type routesType = Partial<RouteObject> & {
  path?: string
  name?: string
  label?: string
  icon?: ForwardRefExoticComponent<Omit<AntdIconProps, "ref"> & RefAttributes<HTMLSpanElement>>
  element?: LazyExoticComponent<FC<any>> | typeof Navigate | React.ReactElement | null
  rules?: string[]
  children?: routesType[]
  no?: number
  hiddenMenu?: boolean
  hiddenChildrenMenu?: boolean
}
