import styled from "styled-components"

export const SecuritySettingsWrapper = styled.div`
  .ant-card {
    margin-bottom: 24px;
  }

  .ant-list-item {
    padding: 16px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }
  }

  .ant-list-item-meta-title {
    font-size: 16px;
    font-weight: 500;
  }

  .ant-list-item-meta-description {
    opacity: 0.7;
    font-size: 14px;
    margin-top: 4px;
  }

  .ant-modal-body {
    padding: 24px;
  }

  .ant-form-item {
    margin-bottom: 16px;
  }

  .ant-input,
  .ant-input-password {
    background: ${(props) => props.theme.background};
    border-color: ${(props) => props.theme["menu-border-line"]};
    color: ${(props) => props.theme["text-2"]};

    &:hover {
      border-color: ${(props) => props.theme["primary-color"]};
    }

    &:focus,
    &.ant-input-focused {
      border-color: ${(props) => props.theme["primary-color"]};
      box-shadow: 0 0 0 2px ${(props) => props.theme["primary-color"]}20;
    }
  }

  .ant-input::placeholder {
    color: ${(props) => props.theme["text-3"]};
  }

  .ant-form-item-label > label {
    color: ${(props) => props.theme["text-1"]};
  }
`
