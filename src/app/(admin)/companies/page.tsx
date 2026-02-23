'use client'

import { PageHeader } from '@/components/layout'
import { Company, useDeleteCompany, useGetCompanies } from '@/domains/admin'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { Button, Input, Modal, Space, Table, Tag } from 'antd'
import { useRouter } from 'next/navigation'
import { useState, useMemo, useCallback } from 'react'

const { Search } = Input

export default function CompaniesPage() {
  const router = useRouter()
  const { data: companies, isLoading } = useGetCompanies()
  const { mutate: deleteCompany } = useDeleteCompany()
  const [searchText, setSearchText] = useState('')

  const handleDelete = useCallback((id: string, name: string) => {
    Modal.confirm({
      title: 'Delete Company',
      content: `Are you sure you want to delete "${name}"?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        deleteCompany(id)
      },
    })
  }, [deleteCompany])

  // Memoize filtered companies to prevent recalculation on every render
  const filteredCompanies = useMemo(
    () =>
      companies?.filter((company) =>
        company.name.toLowerCase().includes(searchText.toLowerCase())
      ),
    [companies, searchText]
  )

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id: string) => <span className="font-mono text-xs">#{id}</span>,
    },
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Company, b: Company) => a.name.localeCompare(b.name),
      render: (name: string) => <span className="font-semibold">{name}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (desc: string) => desc || <span className="text-gray-400">N/A</span>,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (website: string) =>
        website ? (
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600">
            {website}
          </a>
        ) : (
          <span className="text-gray-400">N/A</span>
        ),
    },
    {
      title: 'Employees',
      dataIndex: 'employees',
      key: 'employees',
      width: 120,
      align: 'center' as const,
      sorter: (a: Company, b: Company) => (a.employees || 0) - (b.employees || 0),
      render: (employees: number) => employees || <span className="text-gray-400">-</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value: any, record: Company) => record.status === value,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>{status?.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
      fixed: 'right' as const,
      render: (_: any, record: Company) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => router.push(`/companies/${record.id}`)}
            title="View"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => router.push(`/companies/${record.id}?mode=edit`)}
            title="Edit"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id, record.name)}
            title="Delete"
          />
        </Space>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="Companies"
        description="Manage your companies"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push('/companies/create')}
          >
            Create Company
          </Button>
        }
      />

      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4">
          <Search
            placeholder="Search companies by name..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 400 }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredCompanies}
          loading={isLoading}
          rowKey="id"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} companies`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          scroll={{ x: 1200 }}
        />
      </div>
    </div>
  )
}
