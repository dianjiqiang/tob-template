import React, { memo } from "react";
import type { ReactNode } from "react"
import { RedirectErrorStyled } from "./style";

interface RedirectErrorType {
  children?: ReactNode;
}

const RedirectError: React.FC<RedirectErrorType> = memo(() => {
  return <RedirectErrorStyled>RedirectError</RedirectErrorStyled>;
});

RedirectError.displayName = "RedirectError";

export default RedirectError;