import React, { useState } from "react"
import { Tabs, Row, Col, message } from "antd"
import { UserOutlined, SafetyOutlined, HistoryOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import UserAvatar from "./components/UserAvatar"
import BasicInfo from "./components/BasicInfo"
import SecuritySettings from "./components/SecuritySettings"
import LoginHistory from "./components/LoginHistory"
import { UserInfoWrapper } from "./style.tsx"

const UserInfo: React.FC = () => {
  const [activeKey, setActiveKey] = useState("basic")
  const { t } = useTranslation("userInfo")

  const handleAvatarChange = (avatarUrl: string) => {
    // 这里处理头像更新逻辑
    console.log("头像更新:", avatarUrl)
    message.success(t("avatarUpdateSuccess"))
  }

  const handleInfoUpdate = (values: any) => {
    // 这里处理基本信息更新逻辑
    console.log("基本信息更新:", values)
    message.success(t("infoUpdateSuccess"))
  }

  const handlePasswordChange = (values: any) => {
    // 这里处理密码修改逻辑
    console.log("密码修改:", values)
    message.success(t("passwordChangeSuccess"))
  }

  const handlePhoneBind = (phone: string) => {
    // 这里处理手机绑定逻辑
    console.log("手机绑定:", phone)
    message.success(t("phoneBindSuccess"))
  }

  const handleEmailBind = (email: string) => {
    // 这里处理邮箱绑定逻辑
    console.log("邮箱绑定:", email)
    message.success(t("emailBindSuccess"))
  }

  const tabItems = [
    {
      key: "basic",
      label: (
        <span>
          <UserOutlined />
          {t("basicInfo")}
        </span>
      ),
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={8} lg={6} xl={6}>
            <UserAvatar onAvatarChange={handleAvatarChange} />
          </Col>
          <Col xs={24} sm={24} md={16} lg={18} xl={18}>
            <BasicInfo onInfoUpdate={handleInfoUpdate} />
          </Col>
        </Row>
      ),
    },
    {
      key: "security",
      label: (
        <span>
          <SafetyOutlined />
          {t("securitySettings")}
        </span>
      ),
      children: (
        <SecuritySettings
          onPasswordChange={handlePasswordChange}
          onPhoneBind={handlePhoneBind}
          onEmailBind={handleEmailBind}
        />
      ),
    },
    {
      key: "history",
      label: (
        <span>
          <HistoryOutlined />
          {t("loginHistory")}
        </span>
      ),
      children: <LoginHistory />,
    },
  ]

  return (
    <UserInfoWrapper>
      <div className="user-info-container">
        <div className="page-header">
          <h1 className="page-title">{t("pageTitle")}</h1>
          <p className="page-description">{t("pageDescription")}</p>
        </div>

        <div className="page-content">
          <Tabs
            activeKey={activeKey}
            onChange={setActiveKey}
            items={tabItems}
            type="card"
            size="large"
            tabPosition="top"
            className="user-info-tabs"
          />
        </div>
      </div>
    </UserInfoWrapper>
  )
}

export default UserInfo
