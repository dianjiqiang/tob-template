import { createSlice } from "@reduxjs/toolkit"

export type SystemRootState = {
  keyPath: string[]
}
const initialState: SystemRootState = {
  keyPath: [],
}
const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setKeyPath(state, action) {
      state.keyPath = action.payload
    },
  },
})

export const { setKeyPath } = systemSlice.actions

export default systemSlice.reducer
