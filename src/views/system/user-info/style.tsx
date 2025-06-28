import styled from "styled-components"

export const UserInfoWrapper = styled.div`
  .user-info-container {
    padding: 24px;
    min-height: 100vh;
  }

  .page-header {
    margin-bottom: 24px;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .page-title {
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 600;
  }

  .page-description {
    margin: 0;
    font-size: 14px;
    opacity: 0.7;
  }

  .page-content {
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
  }

  @media (max-width: 768px) {
    .user-info-container {
      padding: 16px;
    }

    .page-header {
      padding: 16px;
      margin-bottom: 16px;
    }

    .page-title {
      font-size: 20px;
    }

    .user-info-tabs {
      .ant-tabs-tab {
        padding: 8px 16px;
        font-size: 14px;
      }
    }
  }
`
