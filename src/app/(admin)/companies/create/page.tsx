'use client'

import { Form, Input, InputNumber, Button, Card } from 'antd'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PageHeader } from '@/components/layout'
import { useCreateCompany, createCompanySchema, CreateCompanyFormData } from '@/domains/admin'
import { ROUTES } from '@/constants'

const { TextArea } = Input

export default function CreateCompanyPage() {
  const router = useRouter()
  const { mutate: createCompany, isPending } = useCreateCompany()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCompanyFormData>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: '',
      description: '',
      website: '',
      employees: undefined,
    },
  })

  const onSubmit = (data: CreateCompanyFormData) => {
    createCompany(data, {
      onSuccess: () => {
        router.push(ROUTES.COMPANIES)
      },
    })
  }

  return (
    <div>
      <PageHeader
        title="Create Company"
        description="Add a new company to your organization"
        showBack
      />

      <Card className="mx-auto max-w-2xl">
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Company Name"
                required
                validateStatus={errors.name ? 'error' : ''}
                help={errors.name?.message}
              >
                <Input
                  {...field}
                  placeholder="Enter company name"
                  size="large"
                  disabled={isPending}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Description"
                validateStatus={errors.description ? 'error' : ''}
                help={errors.description?.message}
              >
                <TextArea
                  {...field}
                  placeholder="Enter company description"
                  rows={4}
                  disabled={isPending}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Website"
                validateStatus={errors.website ? 'error' : ''}
                help={errors.website?.message}
              >
                <Input
                  {...field}
                  placeholder="https://example.com"
                  size="large"
                  disabled={isPending}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="employees"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Number of Employees"
                validateStatus={errors.employees ? 'error' : ''}
                help={errors.employees?.message}
              >
                <InputNumber
                  {...field}
                  placeholder="Enter number of employees"
                  size="large"
                  min={1}
                  style={{ width: '100%' }}
                  disabled={isPending}
                />
              </Form.Item>
            )}
          />

          <Form.Item className="mb-0 mt-6">
            <div className="flex gap-2">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isPending}
                className="flex-1"
              >
                Create Company
              </Button>
              <Button size="large" onClick={() => router.back()} disabled={isPending}>
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
