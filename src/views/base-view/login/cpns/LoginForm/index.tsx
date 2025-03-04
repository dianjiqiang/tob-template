import React, { memo } from "react"
import type { ReactNode } from "react"
import { LoginFormStyled } from "./style"
import { apiPostLogin } from "@/api/user"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setToken, asyncGetUserInfo, setUserInfo } from "@/store/modules/user"

import { Button, Checkbox, Form, Input, Card, message } from "antd"
import { useTranslation } from "react-i18next"

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
  const dispatch = useDispatch()

  const [form] = Form.useForm()
  const navigate = useNavigate()

  const handleSubmitClick = () => {
    form
      .validateFields()
      .then(async (values) => {
        const res = await apiPostLogin(values)

        localStorage.setItem("token", res.token)
        dispatch(setToken(res.token))
        if (values.remember === true) {
          localStorage.setItem("username", values.username)
          localStorage.setItem("password", values.password)
        } else {
          localStorage.setItem("username", values.username)
          localStorage.removeItem("username")
        }
        dispatch(asyncGetUserInfo({}) as any)
          .then((res: any) => {
            dispatch(setUserInfo(res.payload))
            navigate("/analytics/statistics")
          })
          .catch(() => {
            message.error("获取用户信息失败")
          })
      })
      .catch((error) => {
        console.error("表单校验失败", error)
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
          <Button type="primary" size="large" style={{ width: "320px" }} onClick={handleSubmitClick}>
            {t("user.login")}
          </Button>
        </div>
      </Card>
    </LoginFormStyled>
  )
})

LoginForm.displayName = "LoginForm"

export default LoginForm
