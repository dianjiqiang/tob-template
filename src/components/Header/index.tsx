import React, { memo } from "react"
import type { ReactNode } from "react"
import { HeaderStyled } from "./style"

interface HeaderType {
  children?: ReactNode
}

const Header: React.FC<HeaderType> = memo(() => {
  return <HeaderStyled>Header</HeaderStyled>
})

Header.displayName = "Header"

export default Header
