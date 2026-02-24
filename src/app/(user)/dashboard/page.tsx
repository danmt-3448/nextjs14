'use client'


import { Card, List, Spin, Alert, Pagination } from 'antd'
import { useState } from 'react'
import { useGetPosts } from '@/domains/public'
import { PageHeader } from '@/components/layout'


export default function DashboardPage() {
  const [page, setPage] = useState(1)
  const limit = 10
  const { data: posts, isLoading, error } = useGetPosts({ page, limit })

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-500">Loading posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load posts. Please try again later."
        type="error"
        showIcon
        className="mb-6"
      />
    )
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome to your dashboard. Here are some posts from JSONPlaceholder API:"
      />

      <List
        grid={{
          gutter: [16, 16],
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <Card
              title={<span className="text-base font-semibold">Post #{post.id}</span>}
              hoverable
              className="h-full transition-shadow duration-200 hover:shadow-lg"
            >
              <h3 className="mb-3 line-clamp-2 text-lg font-semibold capitalize text-gray-800">
                {post.title}
              </h3>
              <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-gray-600">{post.body}</p>
              <div className="mt-auto pt-2">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  User ID: {post.userId}
                </span>
              </div>
            </Card>
          </List.Item>
        )}
      />

      <div className="flex justify-center mt-8">
        <Pagination
          current={page}
          pageSize={limit}
          total={100} // JSONPlaceholder có 100 posts
          onChange={setPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}
