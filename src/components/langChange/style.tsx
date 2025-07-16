import styled from "styled-components"
import type { ThemeType } from "store/theme"

export const LangChangeStyled = styled.div<ThemeType>`
  .ant-popover-inner {
    padding: 10px 0;
    width: 180px;
    .popover-item {
      user-select: none;
      box-sizing: border-box;
      padding: 5px 20px;
      margin: 5px 0 0 0;
      &:hover {
        background-color: var(--hover-background);
      }
    }
    .popover-item-active {
      color: var(--primary-color);
      background-color: var(--active-background);
      &:hover {
        background-color: var(--active-hover-background);
      }
    }
  }
`
