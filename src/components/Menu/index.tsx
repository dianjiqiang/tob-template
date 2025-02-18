import React, { memo, useMemo } from "react"
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons"
import { Menu as AntdMenu } from "antd"

import { MenuStyled } from "./style"
import { getMenuToRoutes } from "@/utils/getMenuToRoutes"
import { shallowEqual, useSelector } from "react-redux"

import type { MenuProps } from "antd"
import type { ReactNode } from "react"
import type { routesType } from "@/router/type"
import type { RootState } from "@/store"

interface MenuType {
  children?: ReactNode
  routes?: routesType[]
}

type MenuItem = Required<MenuProps>["items"][number]

const items: MenuItem[] = [
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      {
        key: "g1",
        label: "Item 1",
        type: "group",
        children: [
          { key: "1", label: "Option 1" },
          { key: "2", label: "Option 2" },
        ],
      },
      {
        key: "g2",
        label: "Item 2",
        type: "group",
        children: [
          { key: "3", label: "Option 3" },
          { key: "4", label: "Option 4" },
        ],
      },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "7", label: "Option 7" },
          { key: "8", label: "Option 8" },
        ],
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub4",
    label: "Navigation Three",
    icon: <SettingOutlined />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      { key: "11", label: "Option 11" },
      { key: "12", label: "Option 12" },
    ],
  },
  {
    key: "grp",
    label: "Group",
    type: "group",
    children: [
      { key: "13", label: "Option 13" },
      { key: "14", label: "Option 14" },
    ],
  },
]

const Menu: React.FC<MenuType> = memo((props) => {
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual)
  const getMenuItem = useMemo(() => {
    // console.log(props.routes)
    if (Array.isArray(props.routes)) {
      getMenuToRoutes(props.routes, userInfo.permissions)
    } else {
      return []
    }
    return []
  }, [props.routes, userInfo.rules])

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e)
  }

  return (
    <MenuStyled>
      <AntdMenu
        onClick={onClick}
        style={{ width: 210, height: "100vh" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </MenuStyled>
  )
})

Menu.displayName = "Menu"

export default Menu
