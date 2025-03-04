import React, { memo, useMemo, useState, useEffect, useCallback, type ReactNode } from "react"
import { shallowEqual, useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { Menu as AntdMenu, type MenuProps } from "antd"
import { useTranslation } from "react-i18next"
import classnames from "classnames"

import { MenuStyled } from "./style"
import { setKeyPath } from "@/store/modules/system"
import { getMenuToRoutes } from "@/utils/getMenuToRoutes"

import Fastening from "../SvgComponents/layout/menu/Fastening"
import Shrink from "../SvgComponents/layout/menu/Shrink"
import Unfold from "../SvgComponents/layout/menu/Unfold"
import Logo from "@/assets/image/logo.png"

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
  const dispatch = useDispatch()

  const getMenuItem = useMemo(() => {
    if (Array.isArray(props.routes) && userInfo?.permissions && userInfo.permissions?.length)
      return getMenuToRoutes(props.routes, userInfo.permissions) as unknown as MenuItem[]
    return []
  }, [props.routes, userInfo.permissions])

  const pathName = useLocation().pathname

  const navigate = useNavigate()

  const onSelect: MenuProps["onSelect"] = ({ key }) => {
    navigate(key)
  }
  useEffect(() => {
    const totalArr = pathName.split("/")
    totalArr.pop()
    const resultArr: string[] = []
    while (totalArr?.length > 1) {
      resultArr.push(totalArr.join("/"))
      totalArr.pop()
    }
    dispatch(setKeyPath([...resultArr, pathName]))
  }, [dispatch, pathName])

  const [menuWidthHeight, setMenuWidthHeight] = useState<{ width: number | string; height: number | string }>({
    width: "",
    height: "",
  })
  useEffect(() => {
    setMenuWidthHeight({
      width: 220,
      height: "calc(100vh - 100px)",
    })
  }, [setMenuWidthHeight])

  const [isFoundMenu, setIsFoundMenu] = useState(localStorage.getItem("isFoundMenu") === "true")
  const [isFastening, setIsFastening] = useState(localStorage.getItem("isFastening") === "true")
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

  const handleClickFastening = useCallback(() => {
    setIsFastening(!isFastening)
    localStorage.setItem("isFastening", String(!isFastening))
    if (!isFastening) {
      // 开启状态 1. 宽度变成 60 手放上去的时候宽度变成 220, 但是定位宽度需要改变成 60
    }
  }, [isFastening])

  // const handleMouseEnter = useCallback(() => {
  //   return
  //   if (isFastening) {
  //     if (menuWidthHeight.width === 60) {
  //       setMenuWidthHeight({
  //         width: 220,
  //         height: "calc(100vh - 100px)",
  //       })
  //     }
  //   }
  // }, [isFastening, menuWidthHeight])
  // const handleMouseLeave = useCallback(() => {
  //   return
  //   if (isFastening) {
  //     if (menuWidthHeight.width === 220) {
  //       setMenuWidthHeight({
  //         width: 60,
  //         height: "calc(100vh - 100px)",
  //       })
  //     }
  //   }
  // }, [isFastening, menuWidthHeight])

  return (
    <MenuStyled>
      <div className="title menu-border-line" style={{ width: menuWidthHeight.width }}>
        <img className="logo" src={Logo} alt="" />
        <div className="title-content">{t("user.title")}</div>
      </div>
      {/* onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} */}
      <AntdMenu
        onSelect={onSelect}
        style={{ width: menuWidthHeight.width, height: menuWidthHeight.height }}
        mode="inline"
        items={getMenuItem}
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={[pathName]}
        inlineCollapsed={isFoundMenu}
      />
      <div className="fold menu-border-line" style={{ width: menuWidthHeight.width }}>
        <div className={classnames("icon", "folder-menu")} onClick={() => handleChangeFoldMenuClick(!isFoundMenu)}>
          {isFoundMenu ? <Unfold style={{ fontSize: "16px" }} /> : <Shrink style={{ fontSize: "20px" }} />}
        </div>
        {!isFoundMenu && (
          <div className={classnames("icon", "fastening", { "is-fastening": isFastening })}>
            <Fastening onClick={() => handleClickFastening()} style={{ fontSize: "16px" }} />
          </div>
        )}
      </div>
    </MenuStyled>
  )
})

Menu.displayName = "Menu"

export default Menu
