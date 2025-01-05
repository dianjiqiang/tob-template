import React, { memo } from "react"
import type { ReactNode } from "react"
import { LoginStyled } from "./style"

import LoginForm from "./cpns/LoginForm"
import LoginHeader from "./cpns/LoginHeader"

interface LoginType {
  children?: ReactNode
}

const Login: React.FC<LoginType> = memo(() => {
  return (
    <LoginStyled>
      <div className="login-header">
        <LoginHeader></LoginHeader>
      </div>
      <div className="project-name text-1">
        <h1>{import.meta.env.VITE_PROJECT_NAME}</h1>
      </div>
      <div className="login-left"></div>
      <div className="login-right">
        <LoginForm></LoginForm>
      </div>
    </LoginStyled>
  )
})

Login.displayName = "Login"

export default Login
