import React, { memo } from "react";
import type { ReactNode } from "react"
import { LinkErrorStyled } from "./style";

interface LinkErrorType {
  children?: ReactNode;
}

const LinkError: React.FC<LinkErrorType> = memo(() => {
  return <LinkErrorStyled>LinkError</LinkErrorStyled>;
});

LinkError.displayName = "LinkError";

export default LinkError;