'use client'

import { USER_ROLES, useLogin } from '@/domains/auth'
import { Button, Form, Input } from 'antd'

export default function LoginPage() {
  const [form] = Form.useForm()
  const { mutate: login, isPending } = useLogin()

  const loginAs = async (role: (typeof USER_ROLES)[keyof typeof USER_ROLES]) => {
    if (role === USER_ROLES.ADMIN) {
      form.setFieldsValue({
        email: 'admin@demo.com',
        password: '123456',
      })
    }

    const values = await form.validateFields()
    login({ ...values, role })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-center text-xl font-semibold text-gray-800">Login</h1>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            email: 'thanhdan1999@gmail.com',
            password: '123456',
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="test@example.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>
          <Form.Item>
            <div className="flex gap-3">
              <Button
                type="primary"
                className="w-full"
                loading={isPending}
                onClick={() => loginAs(USER_ROLES.USER)}
              >
                Login User
              </Button>
              <Button
                className="w-full"
                loading={isPending}
                onClick={() => loginAs(USER_ROLES.ADMIN)}
              >
                Login Admin
              </Button>
            </div>
          </Form.Item>
        </Form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Tip: Role is hard-coded via the button you click.
        </p>
      </div>
    </div>
  )
}
