import React, { memo, useState } from "react"
import { LoginFormStyled } from "./style"
import { apiPostLogin } from "@/api/user"
import { useNavigate } from "react-router-dom"
import { userStore } from "@/store/user"
import { useShallow } from "zustand/shallow"
import { Router } from "@/const"

import { Button, Checkbox, Form, Input, Card, message } from "antd"
import { useTranslation } from "react-i18next"

import type { ReactNode } from "react"

interface LoginFormType {
  children?: ReactNode
}

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const LoginForm: React.FC<LoginFormType> = memo(() => {
  const { t } = useTranslation()
  const [loginLoading, setLoginLoading] = useState(false)
  const { setToken, asyncGetUserInfo, asyncInitialRoutes } = userStore(
    useShallow((state) => ({
      setToken: state.setToken,
      asyncGetUserInfo: state.asyncGetUserInfo,
      setUserInfo: state.setUserInfo,
      asyncInitialRoutes: state.asyncInitialRoutes,
    }))
  )

  const [form] = Form.useForm()
  const navigate = useNavigate()

  const handleSubmitClick = () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoginLoading(true)
        try {
          // 登录接口调用
          const loginRes = await apiPostLogin(values)

          localStorage.setItem("token", loginRes.token)
          setToken(loginRes.token)
          if (values.remember === true) {
            localStorage.setItem("username", values.username)
            localStorage.setItem("password", values.password)
          } else {
            localStorage.setItem("username", values.username)
            localStorage.removeItem("password")
          }
          const userInfo = await asyncGetUserInfo()
          await asyncInitialRoutes(userInfo.permissions || [])
          navigate(Router.initialPath)
        } catch {
          message.error(t("error.getUserInfoFailed"))
        } finally {
          setLoginLoading(false)
        }
      })
      .catch((error) => {
        console.error(t("error.formValidationFailed"), error)
      })
  }

  return (
    <LoginFormStyled>
      <Card className="form-card-wrapper">
        <h2 className="text-1" style={{ textAlign: "center" }}>
          {t("user.title")}
        </h2>
        <Form
          form={form}
          labelWrap={false}
          className="form-wrapper"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 550 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label={t("user.user")}
            name="username"
            initialValue={localStorage.getItem("username")}
            rules={[{ required: true, message: t("placeholder.userName") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={t("user.password")}
            name="password"
            initialValue={localStorage.getItem("password")}
            rules={[{ required: true, message: t("placeholder.password") }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            style={{ textAlign: "right" }}
            wrapperCol={{ span: 22 }}
          >
            <Checkbox>{t("user.rememberMe")}</Checkbox>
          </Form.Item>
        </Form>
        <div className="form-submit-button">
          <Button
            type="primary"
            size="large"
            style={{ width: "320px" }}
            onClick={handleSubmitClick}
            loading={loginLoading}
          >
            {t("user.login")}
          </Button>
        </div>
      </Card>
    </LoginFormStyled>
  )
})

LoginForm.displayName = "LoginForm"

export default LoginForm
