import React, { memo } from "react";
import type { ReactNode } from "react"
import { LoginStyled } from "./style";

interface LoginType {
  children?: ReactNode;
}

const Login: React.FC<LoginType> = memo(() => {
  return <LoginStyled>Login</LoginStyled>;
});

Login.displayName = "Login";

export default Login;