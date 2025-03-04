import styled from "styled-components"

interface EchartsStyleType {
  width?: string
  height?: string
}

export const EchartsStyled = styled.div<EchartsStyleType>`
  & {
    width: ${(props) => props.width || "100%"};
    height: 100%;
    min-height: ${(props) => props.height || "300px"};
    transition: all 0.3s ease-in-out;
  }
  .my-charts-es {
    width: ${(props) => props.width || "100%"};
    height: 100%;
    min-height: ${(props) => props.height || "300px"};
  }
`
