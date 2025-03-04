import styled from "styled-components"

export const MenuStyled = styled.div`
  & {
    display: flex;
    flex-direction: column;

    .title {
      height: 60px;
      display: flex;
      align-items: center;
      box-sizing: border-box;

      .logo {
        margin-left: 10px;
        width: 40px;
        height: 40px;
      }

      .title-content {
        font-size: 18px;
        font-weight: 700;
        margin-left: 16px;
        width: calc(220px - 16px - 10px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .fold {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 16px;
      font-size: 24px;

      .fastening,
      .folder-menu {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .is-fastening {
        color: var(--primary-color);
        /* background-color: var(--active-hover-background); */
      }
    }
  }
`
