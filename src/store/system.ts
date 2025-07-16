import { create } from "zustand"

import type { SystemState } from "./types/system"

export const systemStore = create<SystemState>((set) => ({
  keyPath: [],
  setKeyPath: (keyPath: string[]) => set({ keyPath }),
}))
