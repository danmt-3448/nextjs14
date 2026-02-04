'use client'

import { ReactNode } from 'react'
import { Breadcrumb, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: { label: string; href?: string }[]
  extra?: ReactNode
  showBack?: boolean
}

export const PageHeader = ({
  title,
  description,
  breadcrumbs,
  extra,
  showBack = false,
}: PageHeaderProps) => {
  const router = useRouter()

  return (
    <div className="mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb
          className="mb-2"
          items={breadcrumbs.map((item) => ({
            title: item.href ? (
              <a onClick={() => router.push(item.href!)}>{item.label}</a>
            ) : (
              item.label
            ),
          }))}
        />
      )}

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {showBack && (
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => router.back()}
                className="hover:bg-gray-100"
              />
            )}
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>
          {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
        </div>
        {extra && <div className="ml-4 flex items-center gap-2">{extra}</div>}
      </div>
    </div>
  )
}
