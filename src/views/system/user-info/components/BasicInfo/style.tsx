import styled from "styled-components"

export const BasicInfoWrapper = styled.div`
  .ant-card {
    margin-bottom: 24px;
  }

  .ant-card-head {
    background: ${(props) => props.theme.background};
    border-bottom: 1px solid ${(props) => props.theme["menu-border-line"]};
  }

  .ant-card-head-title {
    color: ${(props) => props.theme["text-1"]};
  }

  .ant-descriptions {
    .ant-descriptions-item-label {
      font-weight: 500;
      background-color: #fafafa;
    }

    .ant-descriptions-item-content {
      color: ${(props) => props.theme["text-2"]};
    }
  }

  .ant-form {
    .ant-form-item {
      margin-bottom: 16px;
    }

    .ant-form-item-label > label {
      color: ${(props) => props.theme["text-1"]};
    }
  }

  .ant-tag {
    border-radius: 4px;
  }

  .ant-input,
  .ant-select-selector,
  .ant-picker {
    background: ${(props) => props.theme.background};
    border-color: ${(props) => props.theme["menu-border-line"]};
    color: ${(props) => props.theme["text-2"]};

    &:hover {
      border-color: ${(props) => props.theme["primary-color"]};
    }

    &:focus,
    &.ant-input-focused,
    &.ant-select-focused .ant-select-selector {
      border-color: ${(props) => props.theme["primary-color"]};
      box-shadow: 0 0 0 2px ${(props) => props.theme["primary-color"]}20;
    }
  }

  .ant-input::placeholder {
    color: ${(props) => props.theme["text-3"]};
  }
`
