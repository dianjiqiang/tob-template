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
  const { t } = useTranslation("userInfo")
  const userInfo = useSelector((state: RootState) => state.user.userInfo)

  const handlePasswordChange = async (values: any) => {
    try {
      // 这里调用修改密码的API
      // await changePassword(values)
      onPasswordChange?.(values)
      message.success(t("passwordChangeSuccess"))
      setPasswordModalVisible(false)
      passwordForm.resetFields()
    } catch {
      message.error(t("passwordChangeFailed"))
    }
  }

  const handlePhoneBind = async (values: any) => {
    try {
      // 这里调用绑定手机的API
      // await bindPhone(values)
      onPhoneBind?.(values.phone)
      message.success(t("phoneBindSuccess"))
      setPhoneModalVisible(false)
      phoneForm.resetFields()
    } catch {
      message.error(t("phoneBindFailed"))
    }
  }

  const handleEmailBind = async (values: any) => {
    try {
      // 这里调用绑定邮箱的API
      // await bindEmail(values)
      onEmailBind?.(values.email)
      message.success(t("emailBindSuccess"))
      setEmailModalVisible(false)
      emailForm.resetFields()
    } catch {
      message.error(t("emailBindFailed"))
    }
  }

  const securityItems = [
    {
      title: t("loginPassword"),
      description: t("passwordDescription"),
      icon: <LockOutlined style={{ color: "#1890ff" }} />,
      status: t("bound"),
      statusColor: "green",
      action: () => setPasswordModalVisible(true),
      actionText: t("modify"),
    },
    {
      title: t("phoneBinding"),
      description: `${t("boundPhone")}：${
        userInfo.phone ? userInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : t("unbound")
      }`,
      icon: <MobileOutlined style={{ color: "#52c41a" }} />,
      status: userInfo.phone ? t("bound") : t("unbound"),
      statusColor: userInfo.phone ? "green" : "red",
      action: () => setPhoneModalVisible(true),
      actionText: userInfo.phone ? t("change") : t("bind"),
    },
    {
      title: t("emailBinding"),
      description: `${t("boundEmail")}：${
        userInfo.email ? userInfo.email.replace(/(.{2}).*(@.*)/, "$1***$2") : t("unbound")
      }`,
      icon: <MailOutlined style={{ color: "#fa8c16" }} />,
      status: userInfo.email ? t("bound") : t("unbound"),
      statusColor: userInfo.email ? "green" : "red",
      action: () => setEmailModalVisible(true),
      actionText: userInfo.email ? t("change") : t("bind"),
    },
    {
      title: t("twoFactorAuth"),
      description: t("twoFactorDescription"),
      icon: <SafetyOutlined style={{ color: "#722ed1" }} />,
      status: t("unbound"),
      statusColor: "red",
      action: () => message.info(t("twoFactorFeature")),
      actionText: t("enable"),
    },
  ]

  return (
    <SecuritySettingsWrapper>
      <Card title={t("securitySettingsTitle")}>
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
        title={t("changePassword")}
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
                    {t("cancel")}
                  </Button>
                  {doms[1]}
                </div>
              )
            },
          }}
        >
          <ProFormText.Password
            name="oldPassword"
            label={t("currentPassword")}
            placeholder={t("enterCurrentPassword")}
            rules={[{ required: true, message: t("pleaseEnterCurrentPassword") }]}
          />
          <ProFormText.Password
            name="newPassword"
            label={t("newPassword")}
            placeholder={t("enterNewPassword")}
            rules={[
              { required: true, message: t("pleaseEnterNewPassword") },
              { min: 6, message: t("passwordLengthError") },
            ]}
          />
          <ProFormText.Password
            name="confirmPassword"
            label={t("confirmPassword")}
            placeholder={t("confirmNewPassword")}
            rules={[
              { required: true, message: t("pleaseConfirmPassword") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(t("passwordMismatch")))
                },
              }),
            ]}
          />
        </ProForm>
      </Modal>

      {/* 绑定手机弹窗 */}
      <Modal
        title={t("bindPhone")}
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
                    {t("cancel")}
                  </Button>
                  {doms[1]}
                </div>
              )
            },
          }}
        >
          <ProFormText
            name="phone"
            label={t("phoneNumber")}
            placeholder={t("enterPhoneNumber")}
            rules={[
              { required: true, message: t("pleaseEnterPhoneNumber") },
              { pattern: /^1[3-9]\d{9}$/, message: t("invalidPhoneFormat") },
            ]}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <ProFormText
              name="verifyCode"
              label={t("verifyCode")}
              placeholder={t("enterVerifyCode")}
              rules={[{ required: true, message: t("pleaseEnterVerifyCode") }]}
              style={{ flex: 1 }}
            />
            <Button style={{ marginTop: 32 }} onClick={() => message.info(t("verifyCodeFeature"))}>
              {t("getVerifyCode")}
            </Button>
          </div>
        </ProForm>
      </Modal>

      {/* 绑定邮箱弹窗 */}
      <Modal
        title={t("bindEmail")}
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
                    {t("cancel")}
                  </Button>
                  {doms[1]}
                </div>
              )
            },
          }}
        >
          <ProFormText
            name="email"
            label={t("emailAddress")}
            placeholder={t("enterEmailAddress")}
            rules={[
              { required: true, message: t("pleaseEnterEmailAddress") },
              { type: "email", message: t("invalidEmailFormat") },
            ]}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <ProFormText
              name="verifyCode"
              label={t("verifyCode")}
              placeholder={t("enterVerifyCode")}
              rules={[{ required: true, message: t("pleaseEnterVerifyCode") }]}
              style={{ flex: 1 }}
            />
            <Button style={{ marginTop: 32 }} onClick={() => message.info(t("verifyCodeFeature"))}>
              {t("getVerifyCode")}
            </Button>
          </div>
        </ProForm>
      </Modal>
    </SecuritySettingsWrapper>
  )
}

export default SecuritySettings
