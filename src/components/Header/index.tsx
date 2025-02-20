import React, { memo } from "react"
import type { ReactNode } from "react"
import { HeaderStyled } from "./style"

import HeaderLeft from "./c-cpns/header-left/HeaderLeft"
import HeaderRight from "./c-cpns/header-right/HeaderRight"

interface HeaderType {
  children?: ReactNode
}

const Header: React.FC<HeaderType> = memo(() => {
  return (
    <HeaderStyled className="bg-white">
      <HeaderLeft />
      <HeaderRight />
    </HeaderStyled>
  )
})

Header.displayName = "Header"

export default Header
