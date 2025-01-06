import styled from "styled-components"

import { ThemeDataType } from "@/context/ThemeContext"

export const LangChangeStyled = styled.div<ThemeDataType>`
  .ant-popover-inner {
    padding: 10px 0 !important;
    width: 180px !important;
    .popover-item {
      user-select: none !important;
      box-sizing: border-box;
      padding: 5px 20px !important;
      margin: 5px 0 0 0 !important;
      &:hover {
        background-color: ${(props) => props["hover-background"]} !important;
      }
    }
    .popover-item-active {
      color: ${(props) => props.primaryColor} !important;
      background-color: ${(props) => props.activeBackground} !important;
      &:hover {
        background-color: ${(props) => props.activeHoverBackground} !important;
      }
    }
  }
`
