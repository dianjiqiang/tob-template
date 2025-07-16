export interface UserState {
  token: string
  userInfo: {
    name?: string
    username?: string
    gender?: string
    birthday?: string
    joinDate?: string
    bio?: string
    permissions?: string[]
    email?: string
    avatar?: string
    phone?: string
    role?: string
    department?: string
    position?: string
    status?: string
    createTime?: string
    updateTime?: string
  }
  setToken: (token: string) => void
  setUserInfo: (userInfo: UserState["userInfo"]) => void
  getUserInfo: () => UserState["userInfo"]
  asyncGetUserInfo: () => Promise<UserState["userInfo"]>
  asyncInitialRoutes: (permissions: string[]) => Promise<void>
}
