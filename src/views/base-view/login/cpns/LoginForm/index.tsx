import React, { memo } from "react"
import type { ReactNode } from "react"
import { LoginFormStyled } from "./style"

import { Button, Checkbox, Form, Input, Card } from "antd"
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

  const [form] = Form.useForm()

  const handleSubmitClick = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values)
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
            rules={[{ required: true, message: t("placeholder.userName") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={t("user.password")}
            name="password"
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
