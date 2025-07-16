import React, { useState } from "react"
import { ProForm, ProFormText, ProFormSelect, ProFormTextArea, ProFormDatePicker } from "@ant-design/pro-components"
import { userStore } from "@/store/user"
import { Button, message, Card, Descriptions, Tag } from "antd"
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { BasicInfoWrapper } from "./style.tsx"

interface BasicInfoProps {
  onInfoUpdate?: (values: any) => void
}

const BasicInfo: React.FC<BasicInfoProps> = ({ onInfoUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [form] = ProForm.useForm()
  const { t } = useTranslation()
  const userInfo = userStore((state) => state.userInfo)

  const handleEdit = () => {
    setIsEditing(true)
    form.setFieldsValue(userInfo)
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.resetFields()
  }

  const handleSubmit = async (values: any) => {
    try {
      // 这里调用更新用户信息的API
      // await updateUserInfo(values)
      onInfoUpdate?.(values)
      message.success(t("view.userInfo.infoUpdateSuccess"))
      setIsEditing(false)
    } catch {
      message.error(t("view.userInfo.infoUpdateFailed"))
    }
  }

  const genderOptions = [
    { label: t("view.userInfo.male"), value: "male" },
    { label: t("view.userInfo.female"), value: "female" },
    { label: t("view.userInfo.secret"), value: "secret" },
  ]

  const statusOptions = [
    { label: t("view.userInfo.active"), value: "active" },
    { label: t("view.userInfo.inactive"), value: "inactive" },
    { label: t("view.userInfo.pending"), value: "pending" },
  ]

  const renderUserInfo = () => (
    <Descriptions column={2}>
      <Descriptions.Item label={t("view.userInfo.username")} span={1}>
        {userInfo.username || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("view.userInfo.realName")} span={1}>
        {userInfo.name || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("view.userInfo.email")} span={1}>
        {userInfo.email || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("view.userInfo.phone")} span={1}>
        {userInfo.phone || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("view.userInfo.gender")} span={1}>
        {userInfo.gender === "male"
          ? t("view.userInfo.male")
          : userInfo.gender === "female"
          ? t("view.userInfo.female")
          : t("view.userInfo.secret")}
      </Descriptions.Item>
      <Descriptions.Item label={t("view.userInfo.birthday")} span={1}>
        {userInfo.birthday || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("view.userInfo.department")} span={1}>
        {userInfo.department || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("view.userInfo.position")} span={1}>
        {userInfo.position || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("view.userInfo.status")} span={1}>
        <Tag color={userInfo.status === "active" ? "green" : userInfo.status === "inactive" ? "red" : "orange"}>
          {userInfo.status === "active"
            ? t("view.userInfo.active")
            : userInfo.status === "inactive"
            ? t("view.userInfo.inactive")
            : t("view.userInfo.pending")}
        </Tag>
      </Descriptions.Item>
      <Descriptions.Item label={t("view.userInfo.joinDate")} span={1}>
        {userInfo.joinDate || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("view.userInfo.bio")} span={2}>
        {userInfo.bio || "-"}
      </Descriptions.Item>
    </Descriptions>
  )

  return (
    <BasicInfoWrapper>
      <Card
        title={t("view.userInfo.basicInfoTitle")}
        extra={
          !isEditing ? (
            <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
              {t("view.userInfo.edit")}
            </Button>
          ) : (
            <div>
              <Button icon={<CloseOutlined />} onClick={handleCancel} style={{ marginRight: 8 }}>
                {t("view.userInfo.cancel")}
              </Button>
              <Button type="primary" icon={<SaveOutlined />} onClick={() => form.submit()}>
                {t("view.userInfo.save")}
              </Button>
            </div>
          )
        }
      >
        {isEditing ? (
          <ProForm
            form={form}
            onFinish={handleSubmit}
            submitter={false}
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <ProFormText
              name="username"
              label={t("view.userInfo.username")}
              placeholder={t("view.userInfo.enterUsername")}
              rules={[{ required: true, message: t("view.userInfo.pleaseEnterUsername") }]}
            />
            <ProFormText
              name="realName"
              label={t("view.userInfo.realName")}
              placeholder={t("view.userInfo.enterRealName")}
              rules={[{ required: true, message: t("view.userInfo.pleaseEnterRealName") }]}
            />
            <ProFormText
              name="email"
              label={t("view.userInfo.email")}
              placeholder={t("view.userInfo.enterEmail")}
              rules={[
                { required: true, message: t("view.userInfo.pleaseEnterEmail") },
                { type: "email", message: t("view.userInfo.invalidEmailFormat") },
              ]}
            />
            <ProFormText
              name="phone"
              label={t("view.userInfo.phone")}
              placeholder={t("view.userInfo.enterPhone")}
              rules={[
                { required: true, message: t("view.userInfo.pleaseEnterPhone") },
                { pattern: /^1[3-9]\d{9}$/, message: t("view.userInfo.invalidPhoneFormat") },
              ]}
            />
            <ProFormSelect
              name="gender"
              label={t("view.userInfo.gender")}
              options={genderOptions}
              placeholder={t("view.userInfo.selectGender")}
            />
            <ProFormDatePicker
              name="birthday"
              label={t("view.userInfo.birthday")}
              placeholder={t("view.userInfo.selectBirthday")}
            />
            <ProFormText
              name="department"
              label={t("view.userInfo.department")}
              placeholder={t("view.userInfo.enterDepartment")}
            />
            <ProFormText
              name="position"
              label={t("view.userInfo.position")}
              placeholder={t("view.userInfo.enterPosition")}
            />
            <ProFormSelect
              name="status"
              label={t("view.userInfo.status")}
              options={statusOptions}
              placeholder={t("view.userInfo.selectStatus")}
            />
            <ProFormDatePicker
              name="joinDate"
              label={t("view.userInfo.joinDate")}
              placeholder={t("view.userInfo.selectJoinDate")}
            />
            <ProFormTextArea
              name="bio"
              label={t("view.userInfo.bio")}
              placeholder={t("view.userInfo.enterBio")}
              fieldProps={{ rows: 4 }}
            />
          </ProForm>
        ) : (
          renderUserInfo()
        )}
      </Card>
    </BasicInfoWrapper>
  )
}

export default BasicInfo
