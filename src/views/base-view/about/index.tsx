import React, { memo } from "react";
import type { ReactNode } from "react"
import { AboutStyled } from "./style";

interface AboutType {
  children?: ReactNode;
}

const About: React.FC<AboutType> = memo(() => {
  return <AboutStyled>About</AboutStyled>;
});

About.displayName = "About";

export default About;