import styled from "styled-components"

export const UserInfoWrapper = styled.div`
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

  .user-info-tabs {
    .ant-tabs-nav {
      margin-bottom: 24px;
    }

    .ant-tabs-tab {
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 500;

      .anticon {
        margin-right: 8px;
      }
    }

    .ant-tabs-content-holder {
      background: transparent;
    }

    .ant-tabs-tabpane {
      padding: 0;
    }
  }

  @media (max-width: 768px) {
    & {
      padding: 12px;
    }

    .user-info-tabs {
      .ant-tabs-tab {
        padding: 8px 16px;
        font-size: 14px;
      }
    }
  }
`
