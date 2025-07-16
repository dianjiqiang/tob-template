import styled from "styled-components"
import { themeColors } from "@/const"
import type { ThemeType } from "store/theme"

export const UserCenterStyled = styled.div<ThemeType>`
  .popover-wrapper {
    position: relative;
  }

  .avatar-container {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;

    &:hover {
      transform: scale(1.05);
      border-color: var(--primary-color);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

      .avatar-overlay {
        opacity: 1;
      }

      .avatar-image {
        filter: brightness(0.7);
      }
    }
  }

  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s ease;
  }

  .avatar-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .overlay-icon {
    color: white;
    font-size: 18px;
  }

  .ant-popover-inner {
    padding: 8px 0;
    width: 200px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);

    .user-popover-content {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    .user-info-simple {
      padding: 16px 20px 12px 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      margin-bottom: 8px;

      .user-info-name {
        font-size: 16px;
        font-weight: 600;
        color: ${themeColors.textPrimary};
        margin-bottom: 4px;
        line-height: 1.4;
      }

      .user-info-phone {
        font-size: 13px;
        color: ${themeColors.textSecondary};
        line-height: 1.3;
      }
    }

    .user-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.06), transparent);
      margin: 4px 0;
    }

    .popover-item {
      user-select: none;
      box-sizing: border-box;
      padding: 12px 20px;
      margin: 3px 12px;
      display: flex;
      align-items: center;
      gap: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 8px;
      position: relative;
      overflow: hidden;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s ease;
      }

      &:hover {
        background: linear-gradient(
          135deg,
          ${themeColors.backgroundTertiary} 0%,
          ${themeColors.backgroundSecondary} 100%
        );
        transform: translateX(4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

        &::before {
          left: 100%;
        }
      }

      .item-icon {
        font-size: 16px;
        color: ${themeColors.textSecondary};
        flex-shrink: 0;
        transition: all 0.3s ease;
      }

      .item-label {
        font-size: 15px;
        color: ${themeColors.textPrimary};
        font-weight: 600;
        flex: 1;
        transition: all 0.3s ease;
      }

      &:hover .item-icon {
        color: var(--primary-color);
        transform: scale(1.1);
      }

      &:hover .item-label {
        color: var(--primary-color);
      }
    }
  }

  .ant-popover-arrow {
    display: none;
  }
`
