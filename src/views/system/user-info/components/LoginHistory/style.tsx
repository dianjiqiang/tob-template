import styled from "styled-components"

export const LoginHistoryWrapper = styled.div`
  .ant-card {
    margin-bottom: 24px;
  }

  .ant-table {
    .ant-table-thead > tr > th {
      font-weight: 500;
    }
  }

  .ant-tag {
    border-radius: 4px;
  }

  .ant-pagination {
    .ant-pagination-item {
      background: ${(props) => props.theme.background};
      border-color: ${(props) => props.theme["menu-border-line"]};
      color: ${(props) => props.theme["text-2"]};

      &:hover {
        border-color: ${(props) => props.theme["primary-color"]};
        color: ${(props) => props.theme["primary-color"]};
      }

      &.ant-pagination-item-active {
        background: ${(props) => props.theme["primary-color"]};
        border-color: ${(props) => props.theme["primary-color"]};
        color: #fff;
      }
    }

    .ant-pagination-prev,
    .ant-pagination-next {
      background: ${(props) => props.theme.background};
      border-color: ${(props) => props.theme["menu-border-line"]};
      color: ${(props) => props.theme["text-2"]};

      &:hover {
        border-color: ${(props) => props.theme["primary-color"]};
        color: ${(props) => props.theme["primary-color"]};
      }
    }
  }
`
