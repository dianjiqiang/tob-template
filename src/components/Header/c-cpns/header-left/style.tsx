import styled from "styled-components"

export const HeaderLeftStyled = styled.div`
  & {
    display: flex;
    align-items: center;

    .refresh-btn {
      color: #8c8c8c;
      cursor: pointer;
      transition: color 0.2s ease;
      
      &:hover {
        color: #595959;
      }
      
      &:active {
        color: #262626;
      }
    }

    .breadcrumb {
      margin-left: 16px;
    }
  }
`
