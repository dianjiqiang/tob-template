import React, { memo, useMemo, useState, useEffect, useCallback } from "react"
import { Menu as AntdMenu } from "antd"

import { MenuStyled } from "./style"
import { getMenuToRoutes } from "@/utils/getMenuToRoutes"
import { shallowEqual, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import Logo from "@/assets/image/logo.png"

import type { MenuProps } from "antd"
import type { ReactNode } from "react"
import type { routesType } from "@/router/type"
import type { RootState } from "@/store"

interface MenuType {
  children?: ReactNode
  routes?: routesType[]
}

type MenuItem = Required<MenuProps>["items"][number]

const Menu: React.FC<MenuType> = memo((props) => {
  const { t } = useTranslation()

  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual)
  const getMenuItem = useMemo(() => {
    if (Array.isArray(props.routes) && userInfo?.permissions && userInfo.permissions?.length) {
      return getMenuToRoutes(props.routes, userInfo.permissions) as unknown as MenuItem[]
    } else {
      return []
    }
  }, [props.routes, userInfo.permissions])

  const pathName = useLocation().pathname

  const navigate = useNavigate()
  const onClick: MenuProps["onClick"] = (item) => {
    navigate(item.key)
  }

  const [menuWidthHeight, setMenuWidthHeight] = useState<{ width: number | string; height: number | string }>({
    width: 220,
    height: "100vw",
  })
  useEffect(() => {
    setMenuWidthHeight({
      width: 220,
      height: "calc(100vh - 100px)",
    })
  }, [setMenuWidthHeight])

  const [isFoundMenu, setIsFoundMenu] = useState(localStorage.getItem("isFoundMenu") === "true")
  const handleChangeFoldMenuClick = useCallback(
    (flag: boolean) => {
      setIsFoundMenu(flag)
      localStorage.setItem("isFoundMenu", String(flag))
    },
    [setIsFoundMenu]
  )

  useEffect(() => {
    if (isFoundMenu) {
      setMenuWidthHeight({
        width: 60,
        height: "calc(100vh - 100px)",
      })
    } else {
      setMenuWidthHeight({
        width: 220,
        height: "calc(100vh - 100px)",
      })
    }
  }, [isFoundMenu, setMenuWidthHeight])

  return (
    <MenuStyled>
      <div className="title menu-border-line" style={{ width: menuWidthHeight.width }}>
        <img className="logo" src={Logo} alt="" />
        <div className="title-content">{t("user.title")}</div>
      </div>
      <AntdMenu
        onClick={onClick}
        style={{ width: menuWidthHeight.width, height: menuWidthHeight.height }}
        mode="inline"
        items={getMenuItem}
        defaultOpenKeys={["/" + pathName.split("/")[1]]}
        defaultSelectedKeys={[pathName]}
        inlineCollapsed={isFoundMenu}
      />
      <div className="fold menu-border-line" style={{ width: menuWidthHeight.width }}>
        <div className="icon" onClick={() => handleChangeFoldMenuClick(!isFoundMenu)}>
          {isFoundMenu ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </div>
      </div>
    </MenuStyled>
  )
})

Menu.displayName = "Menu"

export default Menu
