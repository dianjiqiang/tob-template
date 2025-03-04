import React, { memo, useMemo, type ReactNode } from "react"
import { Breadcrumb } from "antd"
import { useSelector, shallowEqual } from "react-redux"

import { HeaderLeftStyled } from "./style"

import { ReloadOutlined } from "@ant-design/icons"

import { getBreadcrumbItems } from "./utils"
import { routesType } from "@/router/type"

interface HeaderLeftType {
  children?: ReactNode
  routes: routesType[]
}

const HeaderLeft: React.FC<HeaderLeftType> = memo((props) => {
  const { keyPath } = useSelector(
    (state: any) => ({
      keyPath: state.system.keyPath,
    }),
    shallowEqual
  )
  const handleRefushClick = () => {
    window.location.reload()
  }
  const breadcrumbItems = useMemo(() => {
    if (keyPath?.length) return getBreadcrumbItems(props.routes, keyPath)
    return []
  }, [keyPath, props.routes])
  return (
    <HeaderLeftStyled>
      <ReloadOutlined className="hover-active" size={16} onClick={handleRefushClick} />
      <Breadcrumb className="breadcrumb" items={breadcrumbItems} />
    </HeaderLeftStyled>
  )
})

HeaderLeft.displayName = "HeaderLeft"

export default HeaderLeft
