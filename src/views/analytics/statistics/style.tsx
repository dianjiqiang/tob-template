import styled from "styled-components"

export const StatisticsPageWrapper = styled.div`
  & {
    padding: 16px;
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;
  }

  .ant-card {
    height: 100%;
  }

  .ant-card-body {
    height: calc(100% - 57px); // 减去卡片标题的高度
    display: flex;
    flex-direction: column;
  }
`
