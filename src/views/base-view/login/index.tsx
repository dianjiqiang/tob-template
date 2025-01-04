import React, { memo } from "react"
import type { ReactNode } from "react"
import { LoginStyled } from "./style"

import ThemeChange from "@/components/ThemeChange"

interface LoginType {
  children?: ReactNode
}

const Login: React.FC<LoginType> = memo(() => {
  return (
    <LoginStyled>
      <ThemeChange></ThemeChange>
    </LoginStyled>
  )
})

Login.displayName = "Login"

export default Login
