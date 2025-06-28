import styled from "styled-components"

export const AppStyled = styled.div`
  .app-container {
    display: flex;

    .app-left {
      /* Menu现在是fixed定位，不需要占用空间 */
      width: 0;
      height: 0;
    }

    .app-right {
      width: 100%;
      min-height: 100vh;
      overflow-y: auto; /* 允许右侧内容滚动 */
      transition: margin-left 0.3s ease; /* 添加过渡动画 */
      padding-top: 50px; /* 为固定的Header留出空间 */
    }
  }
`
