import React, { memo, useMemo, useCallback, type ReactNode } from "react"
import { Breadcrumb } from "antd"
import { useSelector, shallowEqual } from "react-redux"
import { useTranslation } from "react-i18next"

import { HeaderLeftStyled } from "./style"

import { ReloadOutlined } from "@ant-design/icons"

import { getBreadcrumbItems } from "./utils"
import { routesType } from "@/router/type"
import type { RootState } from "@/store"

interface HeaderLeftType {
  children?: ReactNode
  routes: routesType[]
}

const HeaderLeft: React.FC<HeaderLeftType> = memo((props) => {
  const { t } = useTranslation()

  const { keyPath } = useSelector(
    (state: RootState) => ({
      keyPath: state.system.keyPath,
    }),
    shallowEqual
  )

  const handleRefreshClick = useCallback(() => {
    window.location.reload()
  }, [])

  const breadcrumbItems = useMemo(() => {
    if (!keyPath?.length || !props.routes?.length) {
      return []
    }
    const items = getBreadcrumbItems(props.routes, keyPath)

    // 处理i18n翻译
    const translatedItems = items.map((item) => {
      const translatedItem = { ...item }

      // 如果title是React元素，需要处理其中的文本
      if (React.isValidElement(translatedItem.title)) {
        const titleElement = translatedItem.title as React.ReactElement
        const children = titleElement.props.children

        // 处理children数组
        if (Array.isArray(children)) {
          const translatedChildren = children.map((child: any) => {
            // 如果是span元素，检查其内容是否为i18n key
            if (React.isValidElement(child) && child.type === "span") {
              const spanElement = child as React.ReactElement
              const spanContent = spanElement.props.children
              if (typeof spanContent === "string" && spanContent.includes(".")) {
                return React.cloneElement(spanElement, {}, t(spanContent))
              }
            }
            return child
          })
          translatedItem.title = React.cloneElement(titleElement, {}, ...translatedChildren)
        }
      }

      return translatedItem
    })

    return translatedItems
  }, [keyPath, props.routes, t])

  return (
    <HeaderLeftStyled>
      <ReloadOutlined className="refresh-btn" size={16} onClick={handleRefreshClick} title={t("route.refreshPage")} />
      <Breadcrumb className="breadcrumb" items={breadcrumbItems} />
    </HeaderLeftStyled>
  )
})

HeaderLeft.displayName = "HeaderLeft"

export default HeaderLeft
