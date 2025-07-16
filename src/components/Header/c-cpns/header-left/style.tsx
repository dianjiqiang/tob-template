import styled from "styled-components"
import { themeColors } from "@/const"

export const HeaderLeftStyled = styled.div`
  & {
    display: flex;
    align-items: center;

    .refresh-btn {
      color: ${themeColors.textTertiary};
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: ${themeColors.textSecondary};
      }

      &:active {
        color: ${themeColors.textPrimary};
      }
    }

    .breadcrumb {
      margin-left: 16px;
    }
  }
`
