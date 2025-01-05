import styled from "styled-components"

import loginBackground from "@/assets/image/login-background.png"

export const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;

  .login-left {
    width: 60%;
    background: url(${loginBackground}) no-repeat;
    background-position: center;
    background-size: 60%;
  }
  .login-right {
    flex: 1;
  }

  .login-header {
    position: fixed;
    top: 30px;
    right: 30px;
  }

  .project-name {
    position: fixed;
    top: 30px;
    left: 30%;
    transform: translateX(-50%);
  }
`
