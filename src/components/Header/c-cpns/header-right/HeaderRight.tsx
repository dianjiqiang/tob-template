import React, { memo } from "react"
import type { ReactNode } from "react"
import { HeaderRightStyled } from "./style"
import ThemeChange from "@/components/ThemeChange"
import LangChange from "@/components/langChange"

interface HeaderRightType {
  children?: ReactNode
}

const HeaderRight: React.FC<HeaderRightType> = memo(() => {
  return (
    <HeaderRightStyled>
      <LangChange />
      <ThemeChange style={{ marginLeft: "10px" }} />
    </HeaderRightStyled>
  )
})

HeaderRight.displayName = "HeaderRight"

export default HeaderRight
