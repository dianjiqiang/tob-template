import React, { memo } from "react"
import type { ReactNode } from "react"
import { WorkbenchStyled } from "./style"

interface WorkbenchType {
  children?: ReactNode
}

const Workbench: React.FC<WorkbenchType> = memo(() => {
  return <WorkbenchStyled>Workbench</WorkbenchStyled>
})

Workbench.displayName = "Workbench"

export default Workbench
