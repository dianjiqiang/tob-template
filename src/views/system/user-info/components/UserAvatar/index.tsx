import React, { useState } from "react"
import { Avatar, Upload, message, Modal } from "antd"
import { UserOutlined, CameraOutlined } from "@ant-design/icons"
import type { UploadProps } from "antd"
import { useTranslation } from "react-i18next"
import { userStore } from "@/store/user"
import { UserAvatarWrapper } from "./style.tsx"
import Image from "@/assets/image/avatar.jpg"

interface UserAvatarProps {
  onAvatarChange?: (avatarUrl: string) => void
}

const UserAvatar: React.FC<UserAvatarProps> = ({ onAvatarChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const { t } = useTranslation()
  const userInfo = userStore((state) => state.userInfo)

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })

  const uploadProps: UploadProps = {
    name: "avatar",
    listType: "picture-circle",
    className: "avatar-uploader",
    showUploadList: false,
    action: "/api/upload/avatar", // 这里需要替换为实际的上传接口
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
      if (!isJpgOrPng) {
        message.error(t("view.userInfo.avatarFormatError"))
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error(t("view.userInfo.avatarSizeError"))
      }
      return isJpgOrPng && isLt2M
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        const avatarUrl = info.file.response?.url || URL.createObjectURL(info.file.originFileObj!)
        onAvatarChange?.(avatarUrl)
        message.success(t("view.userInfo.avatarUploadSuccess"))
      } else if (info.file.status === "error") {
        message.error(t("view.userInfo.avatarUploadFailed"))
      }
    },
    onPreview: handlePreview,
  }

  return (
    <UserAvatarWrapper>
      <div className="avatar-container">
        <Upload {...uploadProps}>
          <div className="avatar-wrapper">
            <Avatar size={120} src={userInfo.avatar || Image} icon={<UserOutlined />} className="user-avatar" />
            <div className="avatar-overlay">
              <CameraOutlined className="camera-icon" />
              <span className="upload-text">{t("view.userInfo.changeAvatar")}</span>
            </div>
          </div>
        </Upload>
        <div className="avatar-info">
          <h3 className="user-name">{userInfo.name || userInfo.username || t("view.userInfo.normalUser")}</h3>
          <p className="user-role">{userInfo.role || t("view.userInfo.normalUser")}</p>
        </div>
      </div>

      <Modal
        open={previewOpen}
        title={t("view.userInfo.uploadAvatar")}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="avatar" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </UserAvatarWrapper>
  )
}

export default UserAvatar
