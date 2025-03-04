import { configureStore } from "@reduxjs/toolkit"

import userReducer, { type UserRootState } from "./modules/user"

import systemReducer, { type SystemRootState } from "./modules/system"

export interface RootState {
  user: UserRootState
  system: SystemRootState
}

const store = configureStore({
  reducer: { user: userReducer, system: systemReducer },
  devTools: true,
})

export default store
