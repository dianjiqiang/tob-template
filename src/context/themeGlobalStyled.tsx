import { createGlobalStyle } from "styled-components"

interface ThemeProps {
  bodyStyled?: string
}

const GlobalStyle = createGlobalStyle<ThemeProps>`
  html {
  }
`

export default GlobalStyle
