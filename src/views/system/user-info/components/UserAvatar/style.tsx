import styled from "styled-components"
import { themeColors } from "@/const"

export const UserAvatarWrapper = styled.div`
  .avatar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }

  .avatar-wrapper {
    position: relative;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover .avatar-overlay {
      opacity: 1;
    }
  }

  .user-avatar {
    border: 4px solid ${themeColors.border};
    transition: all 0.3s ease;
  }

  .avatar-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 50%;
  }

  .camera-icon {
    font-size: 24px;
    color: #fff;
    margin-bottom: 8px;
  }

  .upload-text {
    color: #fff;
    font-size: 12px;
    text-align: center;
  }

  .avatar-info {
    margin-top: 16px;
    text-align: center;
  }

  .user-name {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
  }

  .user-role {
    margin: 0;
    font-size: 14px;
    opacity: 0.7;
  }

  .avatar-uploader {
    .ant-upload {
      border: none;
      background: transparent;
    }
  }
`
