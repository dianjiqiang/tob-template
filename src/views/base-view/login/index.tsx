import React, { memo } from "react"
import type { ReactNode } from "react"
import { LoginStyled } from "./style"
import { useTranslation } from "react-i18next"

import LoginForm from "./cpns/LoginForm"
import LoginHeader from "./cpns/LoginHeader"

interface LoginType {
  children?: ReactNode
}

const Login: React.FC<LoginType> = memo(() => {
  const { t } = useTranslation()
  return (
    <LoginStyled>
      <div className="login-header">
        <LoginHeader></LoginHeader>
      </div>
      <div className="project-name text-1">
        <h1>{t("user.title")}</h1>
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
