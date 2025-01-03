import React, { memo } from "react";
import type { ReactNode } from "react"
import { NotFoundStyled } from "./style";

interface NotFoundType {
  children?: ReactNode;
}

const NotFound: React.FC<NotFoundType> = memo(() => {
  return <NotFoundStyled>NotFound</NotFoundStyled>;
});

NotFound.displayName = "NotFound";

export default NotFound;