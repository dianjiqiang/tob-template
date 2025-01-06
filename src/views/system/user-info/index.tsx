import React, { memo } from "react"
import type { ReactNode } from "react"
import { UserInfoStyled } from "./style"

interface UserInfoType {
  children?: ReactNode
}

const UserInfo: React.FC<UserInfoType> = memo(() => {
  return <UserInfoStyled>UserInfo</UserInfoStyled>
})

UserInfo.displayName = "UserInfo"

export default UserInfo
