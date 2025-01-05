import React, { memo } from "react"
import type { ReactNode } from "react"
import { LoginHeaderStyled } from "./style"
import ThemeChange from "@/components/ThemeChange"

interface LoginHeaderType {
  children?: ReactNode
}

const LoginHeader: React.FC<LoginHeaderType> = memo(() => {
  return (
    <LoginHeaderStyled>
      <ThemeChange />
    </LoginHeaderStyled>
  )
})

LoginHeader.displayName = "LoginHeader"

export default LoginHeader
