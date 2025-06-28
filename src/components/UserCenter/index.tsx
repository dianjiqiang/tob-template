import React, { memo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import type { ReactNode } from "react"
import { UserCenterStyled } from "./style"
import { Popover, message } from "antd"
import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { setToken, setUserInfo } from "@/store/modules/user"
import type { RootState } from "@/store"
import AvatarImage from "@/assets/image/avatar.jpg"

interface UserCenterType {
  children?: ReactNode
}

const UserCenter: React.FC<UserCenterType> = memo(() => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector((state: RootState) => state.user.userInfo, shallowEqual)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userInfo")
    dispatch(setToken(""))
    dispatch(setUserInfo({}))
    message.success(t("user.logout") + " " + t("user.success"))
    navigate("/login")
    setOpen(false)
  }

  const handleNavigateToUserCenter = () => {
    navigate("/system/user-info")
    setOpen(false)
  }

  const popoverContent = (
    <div className="user-popover-content">
      <div className="user-divider" />
      <div className="popover-item" onClick={handleNavigateToUserCenter}>
        <span className="item-icon">
          <UserOutlined />
        </span>
        <span className="item-label">{t("user.userCenter")}</span>
      </div>
      <div className="popover-item" onClick={handleLogout}>
        <span className="item-icon">
          <LogoutOutlined />
        </span>
        <span className="item-label">{t("user.logout")}</span>
      </div>
    </div>
  )

  return (
    <UserCenterStyled setThemeState={undefined}>
      <div className="popover-wrapper">
        <Popover
          content={popoverContent}
          getPopupContainer={() => document.querySelector(".popover-wrapper")!}
          trigger="hover"
          open={open}
          onOpenChange={setOpen}
          placement="bottomRight"
        >
          <div className="avatar-container">
            <img src={userInfo.avatar || AvatarImage} alt="用户头像" className="avatar-image" />
            <div className="avatar-overlay">
              <UserOutlined className="overlay-icon" />
            </div>
          </div>
        </Popover>
      </div>
    </UserCenterStyled>
  )
})

UserCenter.displayName = "UserCenter"

export default UserCenter
