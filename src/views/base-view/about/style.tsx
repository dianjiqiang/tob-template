import styled from "styled-components"

interface AboutStyledProps {
  $isDark: boolean
}

export const AboutStyled = styled.div<AboutStyledProps>`
  .about-container {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .about-card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, ${(props) => (props.$isDark ? "0.3" : "0.1")});
    border-radius: 8px;
    background: ${(props) => (props.$isDark ? "#1f1f1f" : "#fff")};
    border: 1px solid ${(props) => (props.$isDark ? "#303030" : "#f0f0f0")};
  }

  .header-section {
    text-align: center;
    padding: 24px 0;

    .title-icon {
      font-size: 48px;
      color: #1890ff;
      margin-bottom: 16px;
    }

    .title {
      margin-bottom: 16px !important;
      color: ${(props) => (props.$isDark ? "#fff" : "#262626")};
    }

    .description {
      font-size: 16px;
      color: ${(props) => (props.$isDark ? "#ccc" : "#595959")};
      margin-bottom: 16px !important;
    }

    .version-info {
      margin-top: 16px;
    }

    .version-tag {
      font-size: 14px;
      padding: 4px 12px;
    }
  }

  .stats-section {
    padding: 24px 0;
  }

  .features-section {
    padding: 24px 0;

    .section-title {
      margin-bottom: 24px !important;
      color: ${(props) => (props.$isDark ? "#fff" : "#262626")};
    }

    .feature-item {
      display: flex;
      align-items: center;
      padding: 16px;
      background: ${(props) => (props.$isDark ? "#2a2a2a" : "#f8f9fa")};
      border-radius: 8px;
      transition: all 0.3s ease;
      border: 1px solid ${(props) => (props.$isDark ? "#404040" : "#e9ecef")};

      &:hover {
        background: ${(props) => (props.$isDark ? "#404040" : "#e6f7ff")};
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, ${(props) => (props.$isDark ? "0.4" : "0.15")});
      }

      .feature-icon {
        font-size: 20px;
        margin-right: 12px;
        flex-shrink: 0;
      }

      .feature-text {
        color: ${(props) => (props.$isDark ? "#fff" : "#333")};
        font-size: 14px;
      }
    }
  }

  .tech-section {
    padding: 24px 0;

    .section-title {
      margin-bottom: 24px !important;
      color: ${(props) => (props.$isDark ? "#fff" : "#262626")};
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tech-tag {
      font-size: 14px;
      padding: 6px 12px;
      border-radius: 6px;
    }
  }

  .timeline-section {
    padding: 24px 0;

    .section-title {
      margin-bottom: 24px !important;
      color: ${(props) => (props.$isDark ? "#fff" : "#262626")};
    }

    .timeline-item {
      .timeline-title {
        color: ${(props) => (props.$isDark ? "#fff" : "#262626")};
        margin-bottom: 8px !important;
      }

      .timeline-description {
        color: ${(props) => (props.$isDark ? "#ccc" : "#595959")};
        font-size: 14px;
      }
    }
  }

  .contact-section {
    padding: 24px 0;

    .section-title {
      margin-bottom: 24px !important;
      color: ${(props) => (props.$isDark ? "#fff" : "#262626")};
    }

    .contact-info {
      width: 100%;
    }

    .contact-item {
      display: flex;
      align-items: flex-start;
      padding: 12px 0;

      .contact-icon {
        color: #1890ff;
        font-size: 18px;
        margin-right: 12px;
        width: 20px;
        flex-shrink: 0;
        margin-top: 2px;
      }

      .contact-details {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .ant-typography {
          color: ${(props) => (props.$isDark ? "#fff" : "#333")};
        }
      }
    }

    .social-links {
      text-align: center;

      .social-title {
        color: ${(props) => (props.$isDark ? "#fff" : "#262626")};
        margin-bottom: 16px !important;
      }

      .social-icon {
        font-size: 24px;
        color: #1890ff;
        transition: all 0.3s ease;

        &:hover {
          color: #40a9ff;
          transform: scale(1.1);
        }
      }
    }
  }

  .footer-section {
    text-align: center;
    padding: 24px 0;

    .copyright {
      font-size: 14px;
      color: ${(props) => (props.$isDark ? "#999" : "#666")};
    }
  }

  @media (max-width: 768px) {
    .about-container {
      padding: 16px;
    }

    .feature-item {
      margin-bottom: 12px;
    }

    .tech-tags {
      justify-content: center;
    }
  }
`
