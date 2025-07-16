import React, { memo, useMemo, useState, useEffect, useCallback, type ReactNode } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Menu as AntdMenu, type MenuProps } from "antd"
import { useTranslation } from "react-i18next"
import classnames from "classnames"

import { MenuStyled } from "./style"
import { userStore } from "@/store/user"
import { systemStore } from "@/store/system"
import { getMenuToRoutes } from "@/utils/getMenuToRoutes"
import eventBus from "@/utils/eventbus"

import Shrink from "../SvgComponents/layout/menu/Shrink"
import Unfold from "../SvgComponents/layout/menu/Unfold"
import Logo from "@/assets/image/logo.png"

import { style } from "@/const"

import type { routesType } from "@/router/type"

interface MenuType {
  children?: ReactNode
  routes?: routesType[]
}

type MenuItem = Required<MenuProps>["items"][number]

const Menu: React.FC<MenuType> = memo((props) => {
  const { t } = useTranslation()

  const setKeyPath = systemStore((state) => state.setKeyPath)
  const userInfo = userStore((state) => state.userInfo)

  const getMenuItem = useMemo(() => {
    if (Array.isArray(props.routes)) {
      // 如果有用户权限，使用权限过滤；如果没有权限，显示所有不需要权限的路由
      const permissions = userInfo?.permissions || []

      // 如果权限还没有加载完成，显示所有不需要权限的路由
      const menuItems = getMenuToRoutes(props.routes, permissions) as unknown as MenuItem[]

      // 处理i18n翻译
      const translateMenuItems = (items: any[]): any[] => {
        return items.map((item) => {
          const translatedItem = { ...item }

          // 如果label是i18n key，进行翻译
          if (typeof translatedItem.label === "string" && translatedItem.label.includes(".")) {
            translatedItem.label = t(translatedItem.label)
          }

          // 递归处理子菜单
          if (translatedItem.children) {
            translatedItem.children = translateMenuItems(translatedItem.children)
          }

          return translatedItem
        })
      }

      return translateMenuItems(menuItems)
    }
    return []
  }, [props.routes, userInfo?.permissions, t])

  const pathName = useLocation().pathname

  const navigate = useNavigate()

  const onSelect: MenuProps["onSelect"] = ({ key }) => {
    navigate(key)
  }

  // 监听路径变化，更新选中的菜单项
  useEffect(() => {
    const totalArr = pathName.split("/")
    totalArr.pop()
    const resultArr: string[] = []
    while (totalArr?.length > 1) {
      resultArr.push(totalArr.join("/"))
      totalArr.pop()
    }
    setKeyPath([...resultArr, pathName])
  }, [pathName, setKeyPath])

  const [isFoundMenu, setIsFoundMenu] = useState(localStorage.getItem("isFoundMenu") === "true")
  const [menuWidth, setMenuWidth] = useState<number | string>(
    isFoundMenu ? style.MENU_CLOSE_WIDTH : style.MEMU_OPEN_WIDTH
  )

  const handleChangeFoldMenuClick = useCallback(
    (flag: boolean) => {
      setIsFoundMenu(flag)
      localStorage.setItem("isFoundMenu", String(flag))
      // 触发事件通知App组件
      eventBus.emit("menuToggle")
    },
    [setIsFoundMenu]
  )

  useEffect(() => {
    if (isFoundMenu) {
      setMenuWidth(style.MENU_CLOSE_WIDTH)
    } else {
      setMenuWidth(style.MEMU_OPEN_WIDTH)
    }
  }, [isFoundMenu, setMenuWidth])

  // 计算当前选中的菜单项
  const selectedKeys = useMemo(() => {
    return [pathName]
  }, [pathName])

  // 计算默认展开的菜单项
  const defaultOpenKeys = useMemo(() => {
    if (isFoundMenu) {
      return []
    }
    const totalArr = pathName.split("/")
    totalArr.pop()
    const resultArr: string[] = []
    while (totalArr?.length > 1) {
      resultArr.push(totalArr.join("/"))
      totalArr.pop()
    }
    return resultArr
  }, [pathName, isFoundMenu])

  return (
    <MenuStyled>
      <div className="title menu-border-line" style={{ width: menuWidth }}>
        <img className="logo" src={Logo} alt="" />
        <div className="title-content">{t("user.title")}</div>
      </div>
      <AntdMenu
        onSelect={onSelect}
        style={{ width: menuWidth, height: "calc(100vh - 100px)" }}
        mode="inline"
        items={getMenuItem}
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={selectedKeys}
        inlineCollapsed={isFoundMenu}
      />
      <div className="fold menu-border-line" style={{ width: menuWidth }}>
        <div className={classnames("icon", "folder-menu")} onClick={() => handleChangeFoldMenuClick(!isFoundMenu)}>
          {isFoundMenu ? <Unfold style={{ fontSize: "16px" }} /> : <Shrink style={{ fontSize: "20px" }} />}
        </div>
      </div>
    </MenuStyled>
  )
})

Menu.displayName = "Menu"

export default Menu
