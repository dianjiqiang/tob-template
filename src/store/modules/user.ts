import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiGetCurrentInfo } from "@/api/user"
import { getRoutes } from "@/router/getRoutes"

export type UserRootState = {
  token: string
  userInfo: {
    [key: string]: any
  }
}
const initialState: UserRootState = {
  token: localStorage.getItem("token") ?? "",
  userInfo: JSON.parse(localStorage.getItem("userInfo") ?? "{}"),
}

export const asyncGetUserInfo = createAsyncThunk<string, any, { state: UserRootState }>(
  "get/getUserInfo",
  // payload: any, { dispatch }
  async () => {
    const res = await apiGetCurrentInfo()
    getRoutes(res.permissions)
    return res
  }
)

const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setToken(state, { payload }) {
      localStorage.setItem("token", payload)
      state.token = payload
    },
    setUserInfo(state, { payload }) {
      state.userInfo = payload
    },
  },
})

export const { setToken, setUserInfo } = userSlice.actions

export default userSlice.reducer
