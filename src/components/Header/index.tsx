import React, { memo } from "react"
import type { ReactNode } from "react"
import { HeaderStyled } from "./style"

import HeaderLeft from "./c-cpns/header-left/HeaderLeft"
import HeaderRight from "./c-cpns/header-right/HeaderRight"
import { routesType } from "@/router/type"

interface HeaderType {
  children?: ReactNode
  routes: routesType[]
  style?: React.CSSProperties
}

const Header: React.FC<HeaderType> = memo((props) => {
  return (
    <HeaderStyled className="bg-white" style={props.style}>
      <HeaderLeft routes={props.routes} />
      <HeaderRight />
    </HeaderStyled>
  )
})

Header.displayName = "Header"

export default Header
