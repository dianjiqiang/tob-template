import React, { useState } from "react"
import { ProForm, ProFormText, ProFormSelect, ProFormTextArea, ProFormDatePicker } from "@ant-design/pro-components"
import { Button, message, Card, Descriptions, Tag } from "antd"
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { RootState } from "@/store"
import { BasicInfoWrapper } from "./style.tsx"

interface BasicInfoProps {
  onInfoUpdate?: (values: any) => void
}

const BasicInfo: React.FC<BasicInfoProps> = ({ onInfoUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [form] = ProForm.useForm()
  const { t } = useTranslation("userInfo")
  const userInfo = useSelector((state: RootState) => state.user.userInfo)

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
      message.success(t("infoUpdateSuccess"))
      setIsEditing(false)
    } catch {
      message.error(t("infoUpdateFailed"))
    }
  }

  const genderOptions = [
    { label: t("male"), value: "male" },
    { label: t("female"), value: "female" },
    { label: t("secret"), value: "secret" },
  ]

  const statusOptions = [
    { label: t("active"), value: "active" },
    { label: t("inactive"), value: "inactive" },
    { label: t("pending"), value: "pending" },
  ]

  const renderUserInfo = () => (
    <Descriptions column={2} bordered>
      <Descriptions.Item label={t("username")} span={1}>
        {userInfo.username || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("realName")} span={1}>
        {userInfo.realName || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("email")} span={1}>
        {userInfo.email || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("phone")} span={1}>
        {userInfo.phone || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("gender")} span={1}>
        {userInfo.gender === "male" ? t("male") : userInfo.gender === "female" ? t("female") : t("secret")}
      </Descriptions.Item>
      <Descriptions.Item label={t("birthday")} span={1}>
        {userInfo.birthday || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("department")} span={1}>
        {userInfo.department || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("position")} span={1}>
        {userInfo.position || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("status")} span={1}>
        <Tag color={userInfo.status === "active" ? "green" : userInfo.status === "inactive" ? "red" : "orange"}>
          {userInfo.status === "active" ? t("active") : userInfo.status === "inactive" ? t("inactive") : t("pending")}
        </Tag>
      </Descriptions.Item>
      <Descriptions.Item label={t("joinDate")} span={1}>
        {userInfo.joinDate || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={t("bio")} span={2}>
        {userInfo.bio || "-"}
      </Descriptions.Item>
    </Descriptions>
  )

  return (
    <BasicInfoWrapper>
      <Card
        title={t("basicInfoTitle")}
        extra={
          !isEditing ? (
            <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
              {t("edit")}
            </Button>
          ) : (
            <div>
              <Button icon={<CloseOutlined />} onClick={handleCancel} style={{ marginRight: 8 }}>
                {t("cancel")}
              </Button>
              <Button type="primary" icon={<SaveOutlined />} onClick={() => form.submit()}>
                {t("save")}
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
              label={t("username")}
              placeholder={t("enterUsername")}
              rules={[{ required: true, message: t("pleaseEnterUsername") }]}
            />
            <ProFormText
              name="realName"
              label={t("realName")}
              placeholder={t("enterRealName")}
              rules={[{ required: true, message: t("pleaseEnterRealName") }]}
            />
            <ProFormText
              name="email"
              label={t("email")}
              placeholder={t("enterEmail")}
              rules={[
                { required: true, message: t("pleaseEnterEmail") },
                { type: "email", message: t("invalidEmailFormat") },
              ]}
            />
            <ProFormText
              name="phone"
              label={t("phone")}
              placeholder={t("enterPhone")}
              rules={[
                { required: true, message: t("pleaseEnterPhone") },
                { pattern: /^1[3-9]\d{9}$/, message: t("invalidPhoneFormat") },
              ]}
            />
            <ProFormSelect name="gender" label={t("gender")} options={genderOptions} placeholder={t("selectGender")} />
            <ProFormDatePicker name="birthday" label={t("birthday")} placeholder={t("selectBirthday")} />
            <ProFormText name="department" label={t("department")} placeholder={t("enterDepartment")} />
            <ProFormText name="position" label={t("position")} placeholder={t("enterPosition")} />
            <ProFormSelect name="status" label={t("status")} options={statusOptions} placeholder={t("selectStatus")} />
            <ProFormDatePicker name="joinDate" label={t("joinDate")} placeholder={t("selectJoinDate")} />
            <ProFormTextArea name="bio" label={t("bio")} placeholder={t("enterBio")} fieldProps={{ rows: 4 }} />
          </ProForm>
        ) : (
          renderUserInfo()
        )}
      </Card>
    </BasicInfoWrapper>
  )
}

export default BasicInfo
