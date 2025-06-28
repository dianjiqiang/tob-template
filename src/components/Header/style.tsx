import styled from "styled-components"

export const HeaderStyled = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid var(--menu-border-line);
  padding: 0 16px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: padding-left 0.3s ease;
`
