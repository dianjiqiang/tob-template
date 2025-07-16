import { create } from "zustand"

import { apiGetCurrentInfo } from "@/api/user"

import type { UserState } from "./types/user"
import { getRoutes } from "@/router/getRoutes"

export const userStore = create<UserState>((set, get) => ({
  token: "",
  userInfo: {},
  setToken: (token: string) => set({ token }),
  setUserInfo: (userInfo: UserState["userInfo"]) => set({ userInfo }),
  getUserInfo: () => get().userInfo,
  asyncGetUserInfo: async () => {
    const res = await apiGetCurrentInfo()
    set({ userInfo: res })
    return res
  },
  asyncInitialRoutes: async (permissions: string[]) => {
    await getRoutes(permissions)
  },
}))
