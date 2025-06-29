import React, { useState } from "react"
import { Tabs, Row, Col, message, Card } from "antd"
import { UserOutlined, SafetyOutlined, HistoryOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import UserAvatar from "./components/UserAvatar"
import BasicInfo from "./components/BasicInfo"
import SecuritySettings from "./components/SecuritySettings"
import LoginHistory from "./components/LoginHistory"
import { UserInfoWrapper } from "./style.tsx"

const UserInfo: React.FC = () => {
  const [activeKey, setActiveKey] = useState("basic")
  const { t } = useTranslation()

  const handleAvatarChange = (avatarUrl: string) => {
    // 这里处理头像更新逻辑
    console.log("头像更新:", avatarUrl)
    message.success(t("view.userInfo.avatarUpdateSuccess"))
  }

  const handleInfoUpdate = (values: any) => {
    // 这里处理基本信息更新逻辑
    console.log("基本信息更新:", values)
    message.success(t("view.userInfo.infoUpdateSuccess"))
  }

  const handlePasswordChange = (values: any) => {
    // 这里处理密码修改逻辑
    console.log("密码修改:", values)
    message.success(t("view.userInfo.passwordChangeSuccess"))
  }

  const handlePhoneBind = (phone: string) => {
    // 这里处理手机绑定逻辑
    console.log("手机绑定:", phone)
    message.success(t("view.userInfo.phoneBindSuccess"))
  }

  const handleEmailBind = (email: string) => {
    // 这里处理邮箱绑定逻辑
    console.log("邮箱绑定:", email)
    message.success(t("view.userInfo.emailBindSuccess"))
  }

  const tabItems = [
    {
      key: "basic",
      label: (
        <span>
          <UserOutlined />
          {t("view.userInfo.basicInfo")}
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
          {t("view.userInfo.securitySettings")}
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
          {t("view.userInfo.loginHistory")}
        </span>
      ),
      children: <LoginHistory />,
    },
  ]

  return (
    <UserInfoWrapper>
      {/* 页面标题 */}
      <Card title={t("view.userInfo.pageTitle")} bordered={false} style={{ marginBottom: 24 }}>
        <p style={{ margin: 0, opacity: 0.7 }}>{t("view.userInfo.pageDescription")}</p>
      </Card>

      {/* 主要内容区域 */}
      <Card bordered={false}>
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          items={tabItems}
          type="card"
          size="large"
          tabPosition="top"
          className="user-info-tabs"
        />
      </Card>
    </UserInfoWrapper>
  )
}

export default UserInfo
