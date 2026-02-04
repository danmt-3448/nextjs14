'use client'

import { Form, Input } from 'antd'

interface FormFieldProps {
  name: string
  label: string
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
}

export const FormField = ({
  name,
  label,
  required = false,
  type = 'text',
  placeholder,
}: FormFieldProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required, message: `Please input ${label.toLowerCase()}!` }]}
    >
      {type === 'password' ? (
        <Input.Password placeholder={placeholder} />
      ) : (
        <Input type={type} placeholder={placeholder} />
      )}
    </Form.Item>
  )
}
