// src/context/themeContext.tsx
import React, { memo, useState } from "react";
import type { ReactNode } from "react";
import { ConfigProvider, theme } from "antd";

export type ThemeType = {
  [key in keyof typeof basicDarkThemeData]?: string;
};

export interface ThemeDataType extends ThemeType {
  setThemeState?: React.Dispatch<React.SetStateAction<string>>
}


const basicThemeData: ThemeDataType = {
  theme: 'light',
  background: '#fff',
  color: '#333',
  'text-1': '#000',
  'text-2': '#333',
  'text-3': '#666',
  disabledColor: 'rgba(0, 0, 0, 0.25)',
  primaryColor: '#1677FF',
  successColor: '#52C41A',
  dangerColor: '#FF4D4F', // 修正拼写错误
  errorColor: '#FF4D4F'
};

const basicDarkThemeData = {
  theme: 'dark',
  background: '#000',
  color: '#ccc',
  'text-1': '#fff',
  'text-2': '#ccc',
  'text-3': '#999',
  disabledColor: 'rgba(255, 255, 255, 0.25)',
  primaryColor: '#1677FF',
  successColor: '#52C41A',
  dangerColor: '#FF4D4F', // 修正拼写错误
  errorColor: '#FF4D4F',
};

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = React.createContext<ThemeDataType>(basicThemeData);

interface ThemeProviderProps {
  children?: ReactNode;
  theme?: string;
}

const ThemeProvider: React.FC<ThemeProviderProps> = memo((props) => {
  const [themeState, setThemeState] = useState<string>(props.theme ?? localStorage.getItem('theme') ?? 'light')
  const valueData: ThemeDataType = themeState === 'light' ? basicThemeData : basicDarkThemeData;

  localStorage.setItem('theme', themeState)
  localStorage.setItem('theme-data', JSON.stringify(valueData))
  
  return (
    <ThemeContext.Provider value={{...valueData, setThemeState}}>
      <ConfigProvider theme={{ algorithm: themeState === 'dark' ? theme.darkAlgorithm : undefined }}>
        {props.children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
});

ThemeContext.displayName = "ThemeProvider";

export default ThemeProvider;