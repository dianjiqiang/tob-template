import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiGetCurrentInfo } from "@/api/user"

const initialState = {
  token: localStorage.getItem("token") ?? "",
  userInfo: localStorage.getItem("userInfo") ?? {},
}
type RootState = typeof initialState

export const asyncGetUserInfo = createAsyncThunk<string, any, { state: RootState }>(
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
