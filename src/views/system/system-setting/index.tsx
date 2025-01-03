import React, { memo } from "react";
import type { ReactNode } from "react"
import { SystemSettingStyled } from "./style";

interface SystemSettingType {
  children?: ReactNode;
}

const SystemSetting: React.FC<SystemSettingType> = memo(() => {
  return <SystemSettingStyled>SystemSetting</SystemSettingStyled>;
});

SystemSetting.displayName = "SystemSetting";

export default SystemSetting;