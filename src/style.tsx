import styled from "styled-components";

import type { ThemeType } from "context/ThemeContext";

export const AppStyled = styled.div.attrs<ThemeType>({
  'text-1': '#000',
  'text-2': '#333',
  'text-3': '#666',
})`
  .text-1{
    color: ${(props) => props['text-1']};
  }
  .text-2{
    color: ${(props) => props['text-2']};
  }
  .text-3{
    color: ${(props) => props['text-3']};
  }
`
