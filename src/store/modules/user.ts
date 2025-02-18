import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiGetCurrentInfo } from "@/api/user"

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
  async (_: any, store) => {
    console.log(_, store)
    const res = await apiGetCurrentInfo()
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

export const { setToken } = userSlice.actions

export default userSlice.reducer
