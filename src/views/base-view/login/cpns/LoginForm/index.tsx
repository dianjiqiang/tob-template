import React, { memo } from "react"
import type { ReactNode } from "react"
import { LoginFormStyled } from "./style"

import { Button, Checkbox, Form, Input, Card } from "antd"
import type { FormProps } from "antd"

interface LoginFormType {
  children?: ReactNode
}

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const LoginForm: React.FC<LoginFormType> = memo(() => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values)
  }

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <LoginFormStyled>
      <Card className="form-card-wrapper">
        <h2 className="text-1" style={{ textAlign: "center" }}>
          {import.meta.env.VITE_PROJECT_NAME}
        </h2>
        <Form
          labelWrap={false}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 550 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="账号" name="username" rules={[{ required: true, message: "请输入您的账号" }]}>
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="密码" name="password" rules={[{ required: true, message: "请输入您的密码" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            style={{ textAlign: "right" }}
            wrapperCol={{ span: 22 }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" style={{ width: "280px" }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </LoginFormStyled>
  )
})

LoginForm.displayName = "LoginForm"

export default LoginForm
