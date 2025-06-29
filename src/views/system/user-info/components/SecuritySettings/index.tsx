import React, { useState } from "react"
import { ProForm, ProFormText } from "@ant-design/pro-components"
import { Button, message, Card, List, Modal, Form } from "antd"
import {
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { RootState } from "@/store"
import { SecuritySettingsWrapper } from "./style.tsx"

interface SecuritySettingsProps {
  onPasswordChange?: (values: any) => void
  onPhoneBind?: (phone: string) => void
  onEmailBind?: (email: string) => void
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ onPasswordChange, onPhoneBind, onEmailBind }) => {
  const [passwordModalVisible, setPasswordModalVisible] = useState(false)
  const [phoneModalVisible, setPhoneModalVisible] = useState(false)
  const [emailModalVisible, setEmailModalVisible] = useState(false)
  const [passwordForm] = Form.useForm()
  const [phoneForm] = Form.useForm()
  const [emailForm] = Form.useForm()
  const { t } = useTranslation()
  const userInfo = useSelector((state: RootState) => state.user.userInfo)

  const handlePasswordChange = async (values: any) => {
    try {
      // 这里调用修改密码的API
      // await changePassword(values)
      onPasswordChange?.(values)
      message.success(t("view.userInfo.passwordChangeSuccess"))
      setPasswordModalVisible(false)
      passwordForm.resetFields()
    } catch {
      message.error(t("view.userInfo.passwordChangeFailed"))
    }
  }

  const handlePhoneBind = async (values: any) => {
    try {
      // 这里调用绑定手机的API
      // await bindPhone(values)
      onPhoneBind?.(values.phone)
      message.success(t("view.userInfo.phoneBindSuccess"))
      setPhoneModalVisible(false)
      phoneForm.resetFields()
    } catch {
      message.error(t("view.userInfo.phoneBindFailed"))
    }
  }

  const handleEmailBind = async (values: any) => {
    try {
      // 这里调用绑定邮箱的API
      // await bindEmail(values)
      onEmailBind?.(values.email)
      message.success(t("view.userInfo.emailBindSuccess"))
      setEmailModalVisible(false)
      emailForm.resetFields()
    } catch {
      message.error(t("view.userInfo.emailBindFailed"))
    }
  }

  const securityItems = [
    {
      title: t("view.userInfo.loginPassword"),
      description: t("view.userInfo.passwordDescription"),
      icon: <LockOutlined style={{ color: "#1890ff" }} />,
      status: t("view.userInfo.bound"),
      statusColor: "green",
      action: () => setPasswordModalVisible(true),
      actionText: t("view.userInfo.modify"),
    },
    {
      title: t("view.userInfo.phoneBinding"),
      description: `${t("view.userInfo.boundPhone")}：${
        userInfo.phone ? userInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : t("view.userInfo.unbound")
      }`,
      icon: <MobileOutlined style={{ color: "#52c41a" }} />,
      status: userInfo.phone ? t("view.userInfo.bound") : t("view.userInfo.unbound"),
      statusColor: userInfo.phone ? "green" : "red",
      action: () => setPhoneModalVisible(true),
      actionText: userInfo.phone ? t("view.userInfo.change") : t("view.userInfo.bind"),
    },
    {
      title: t("view.userInfo.emailBinding"),
      description: `${t("view.userInfo.boundEmail")}：${
        userInfo.email ? userInfo.email.replace(/(.{2}).*(@.*)/, "$1***$2") : t("view.userInfo.unbound")
      }`,
      icon: <MailOutlined style={{ color: "#fa8c16" }} />,
      status: userInfo.email ? t("view.userInfo.bound") : t("view.userInfo.unbound"),
      statusColor: userInfo.email ? "green" : "red",
      action: () => setEmailModalVisible(true),
      actionText: userInfo.email ? t("view.userInfo.change") : t("view.userInfo.bind"),
    },
    {
      title: t("view.userInfo.twoFactorAuth"),
      description: t("view.userInfo.twoFactorDescription"),
      icon: <SafetyOutlined style={{ color: "#722ed1" }} />,
      status: t("view.userInfo.unbound"),
      statusColor: "red",
      action: () => message.info(t("view.userInfo.twoFactorFeature")),
      actionText: t("view.userInfo.enable"),
    },
  ]

  return (
    <SecuritySettingsWrapper>
      <Card title={t("view.userInfo.securitySettingsTitle")}>
        <List
          itemLayout="horizontal"
          dataSource={securityItems}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="link" onClick={item.action} key="action">
                  {item.actionText}
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={item.icon}
                title={
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {item.title}
                    {item.statusColor === "green" ? (
                      <CheckCircleOutlined style={{ color: "#52c41a" }} />
                    ) : (
                      <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
                    )}
                  </div>
                }
                description={item.description}
              />
              <div style={{ color: item.statusColor === "green" ? "#52c41a" : "#ff4d4f" }}>{item.status}</div>
            </List.Item>
          )}
        />
      </Card>

      {/* 修改密码弹窗 */}
      <Modal
        title={t("view.userInfo.changePassword")}
        open={passwordModalVisible}
        onCancel={() => setPasswordModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <ProForm
          form={passwordForm}
          onFinish={handlePasswordChange}
          submitter={{
            render: (props, doms) => {
              return (
                <div style={{ textAlign: "right" }}>
                  <Button onClick={() => setPasswordModalVisible(false)} style={{ marginRight: 8 }}>
                    {t("view.userInfo.cancel")}
                  </Button>
                  {doms[1]}
                </div>
              )
            },
          }}
        >
          <ProFormText.Password
            name="oldPassword"
            label={t("view.userInfo.currentPassword")}
            placeholder={t("view.userInfo.enterCurrentPassword")}
            rules={[{ required: true, message: t("view.userInfo.pleaseEnterCurrentPassword") }]}
          />
          <ProFormText.Password
            name="newPassword"
            label={t("view.userInfo.newPassword")}
            placeholder={t("view.userInfo.enterNewPassword")}
            rules={[
              { required: true, message: t("view.userInfo.pleaseEnterNewPassword") },
              { min: 6, message: t("view.userInfo.passwordLengthError") },
            ]}
          />
          <ProFormText.Password
            name="confirmPassword"
            label={t("view.userInfo.confirmPassword")}
            placeholder={t("view.userInfo.confirmNewPassword")}
            rules={[
              { required: true, message: t("view.userInfo.pleaseConfirmPassword") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(t("view.userInfo.passwordMismatch")))
                },
              }),
            ]}
          />
        </ProForm>
      </Modal>

      {/* 绑定手机弹窗 */}
      <Modal
        title={t("view.userInfo.bindPhone")}
        open={phoneModalVisible}
        onCancel={() => setPhoneModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <ProForm
          form={phoneForm}
          onFinish={handlePhoneBind}
          submitter={{
            render: (props, doms) => {
              return (
                <div style={{ textAlign: "right" }}>
                  <Button onClick={() => setPhoneModalVisible(false)} style={{ marginRight: 8 }}>
                    {t("view.userInfo.cancel")}
                  </Button>
                  {doms[1]}
                </div>
              )
            },
          }}
        >
          <ProFormText
            name="phone"
            label={t("view.userInfo.phoneNumber")}
            placeholder={t("view.userInfo.enterPhoneNumber")}
            rules={[
              { required: true, message: t("view.userInfo.pleaseEnterPhoneNumber") },
              { pattern: /^1[3-9]\d{9}$/, message: t("view.userInfo.invalidPhoneFormat") },
            ]}
          />
          <ProFormText
            name="verifyCode"
            label={t("view.userInfo.verifyCode")}
            placeholder={t("view.userInfo.enterVerifyCode")}
            rules={[{ required: true, message: t("view.userInfo.pleaseEnterVerifyCode") }]}
            fieldProps={{
              suffix: (
                <Button type="link" size="small" onClick={() => message.info(t("view.userInfo.verifyCodeFeature"))}>
                  {t("view.userInfo.getVerifyCode")}
                </Button>
              ),
            }}
          />
        </ProForm>
      </Modal>

      {/* 绑定邮箱弹窗 */}
      <Modal
        title={t("view.userInfo.bindEmail")}
        open={emailModalVisible}
        onCancel={() => setEmailModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <ProForm
          form={emailForm}
          onFinish={handleEmailBind}
          submitter={{
            render: (props, doms) => {
              return (
                <div style={{ textAlign: "right" }}>
                  <Button onClick={() => setEmailModalVisible(false)} style={{ marginRight: 8 }}>
                    {t("view.userInfo.cancel")}
                  </Button>
                  {doms[1]}
                </div>
              )
            },
          }}
        >
          <ProFormText
            name="email"
            label={t("view.userInfo.emailAddress")}
            placeholder={t("view.userInfo.enterEmailAddress")}
            rules={[
              { required: true, message: t("view.userInfo.pleaseEnterEmailAddress") },
              { type: "email", message: t("view.userInfo.invalidEmailFormat") },
            ]}
          />
        </ProForm>
      </Modal>
    </SecuritySettingsWrapper>
  )
}

export default SecuritySettings
