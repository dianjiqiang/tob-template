import { configureStore } from "@reduxjs/toolkit"

import userReducer from "./modules/user"
import type { UserRootState } from "./modules/user"

export interface RootState {
  user: UserRootState
}

const store = configureStore({
  reducer: { user: userReducer },
  devTools: true,
})

export default store
