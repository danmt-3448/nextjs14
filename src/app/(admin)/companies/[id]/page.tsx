'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Spin,
  Alert,
  Descriptions,
  Tag,
  Select,
  Space,
} from 'antd'
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PageHeader } from '@/components/layout'
import {
  useGetCompany,
  useUpdateCompany,
  updateCompanySchema,
  UpdateCompanyFormData,
} from '@/domains/admin'
import Utils from '@/lib/utils'
import DateUtils from '@/lib/date'

const { TextArea } = Input

interface CompanyDetailPageProps {
  params: { id: string }
}

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isEditMode, setIsEditMode] = useState(searchParams.get('mode') === 'edit')

  const { data: company, isLoading, error } = useGetCompany(params.id)
  const { mutate: updateCompany, isPending } = useUpdateCompany(params.id)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateCompanyFormData>({
    resolver: zodResolver(updateCompanySchema),
  })

  useEffect(() => {
    if (company) {
      reset({
        name: company.name,
        description: company.description || '',
        website: company.website || '',
        employees: company.employees,
        status: company.status,
      })
    }
  }, [company, reset])

  const onSubmit = (data: UpdateCompanyFormData) => {
    updateCompany(data, {
      onSuccess: () => {
        setIsEditMode(false)
      },
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-500">Loading company details...</p>
        </div>
      </div>
    )
  }

  if (error || !company) {
    return (
      <Alert
        message="Error"
        description="Failed to load company details. Please try again."
        type="error"
        showIcon
      />
    )
  }

  return (
    <div>
      <PageHeader
        title={company.name}
        description={`Company ID: #${company.id}`}
        showBack
        breadcrumbs={[{ label: 'Companies', href: '/companies' }, { label: company.name }]}
        extra={
          !isEditMode && (
            <Button type="primary" icon={<EditOutlined />} onClick={() => setIsEditMode(true)}>
              Edit Company
            </Button>
          )
        }
      />

      <Card className="mx-auto max-w-3xl">
        {!isEditMode ? (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Company Name">
              <span className="font-semibold">{company.name}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {company.description || <span className="text-gray-400">No description</span>}
            </Descriptions.Item>
            <Descriptions.Item label="Website">
              {company.website ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {company.website}
                </a>
              ) : (
                <span className="text-gray-400">No website</span>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Employees">
              {company.employees || <span className="text-gray-400">Not specified</span>}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={company.status === 'active' ? 'green' : 'red'}>
                {company.status.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {DateUtils.formatDateTime(company.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {DateUtils.formatDateTime(company.updatedAt)}
            </Descriptions.Item>
          </Descriptions>
        ) : (
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

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="Status"
                  validateStatus={errors.status ? 'error' : ''}
                  help={errors.status?.message}
                >
                  <Select
                    {...field}
                    size="large"
                    disabled={isPending}
                    options={[
                      { label: 'Active', value: 'active' },
                      { label: 'Inactive', value: 'inactive' },
                    ]}
                  />
                </Form.Item>
              )}
            />

            <Form.Item className="mb-0 mt-6">
              <Space className="w-full" direction="vertical" size="middle">
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    icon={<SaveOutlined />}
                    loading={isPending}
                    disabled={!isDirty}
                    className="flex-1"
                  >
                    Save Changes
                  </Button>
                  <Button
                    size="large"
                    icon={<CloseOutlined />}
                    onClick={() => {
                      setIsEditMode(false)
                      reset()
                    }}
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                </div>
                {isDirty && (
                  <Alert
                    message="You have unsaved changes"
                    type="warning"
                    showIcon
                    closable={false}
                  />
                )}
              </Space>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  )
}
