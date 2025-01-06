import React, { memo } from "react"
import type { ReactNode } from "react"
import { LoginHeaderStyled } from "./style"
import ThemeChange from "@/components/ThemeChange"
import LangChange from "@/components/langChange"

interface LoginHeaderType {
  children?: ReactNode
}

const LoginHeader: React.FC<LoginHeaderType> = memo(() => {
  return (
    <LoginHeaderStyled>
      <LangChange />
      <ThemeChange style={{marginLeft: '10px'}} />
    </LoginHeaderStyled>
  )
})

LoginHeader.displayName = "LoginHeader"

export default LoginHeader
