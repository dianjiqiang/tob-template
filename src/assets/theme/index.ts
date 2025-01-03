import type { ThemeDataType } from "context/ThemeContext";

export const getBodyStyle = (theme: ThemeDataType) => {

  return `
      background-color: ${theme.background};
      color: ${theme.color};
      --primaryColor: ${theme.primaryColor};
      --successColor: ${theme.successColor};
      --dangerColor: ${theme.dangerColor};
      --disabledColor: ${theme.disabledColor};
      --errorColor: ${theme.errorColor};
      --text-1: ${theme["text-1"]};
      --text-2: ${theme["text-2"]};
      --text-3: ${theme["text-3"]};
    `;
}