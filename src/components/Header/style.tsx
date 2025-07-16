import styled from "styled-components"
import { themeColorMap } from "@/const"

interface HeaderStyledProps {
  $isDark: boolean
}

export const HeaderStyled = styled.div<HeaderStyledProps>`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid ${(props) => (props.$isDark ? themeColorMap.dark.border : themeColorMap.light.border)};
  padding: 0 16px;
  background: ${(props) => (props.$isDark ? themeColorMap.dark.background : themeColorMap.light.background)};
  box-shadow: 0 1px 4px ${(props) => (props.$isDark ? themeColorMap.dark.shadow : themeColorMap.light.shadow)};
  transition: padding-left 0.3s ease;
`
