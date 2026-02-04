'use client'

import { Card, Row, Col, Badge, List, Avatar, Button, Tag, Tabs } from 'antd'
import {
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: <CheckCircleOutlined className="text-green-600" />,
      title: 'Project Completed',
      message: 'Your project "Website Redesign" has been completed successfully.',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      icon: <InfoCircleOutlined className="text-blue-600" />,
      title: 'New Team Member',
      message: 'Sarah Johnson has joined your team.',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'warning',
      icon: <WarningOutlined className="text-orange-600" />,
      title: 'Deadline Approaching',
      message: 'Task "Update Documentation" is due in 2 days.',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 4,
      type: 'error',
      icon: <CloseCircleOutlined className="text-red-600" />,
      title: 'Build Failed',
      message: 'The latest build has failed. Please check the logs.',
      time: '5 hours ago',
      read: true,
    },
    {
      id: 5,
      type: 'info',
      icon: <InfoCircleOutlined className="text-blue-600" />,
      title: 'System Update',
      message: 'System maintenance scheduled for this weekend.',
      time: '1 day ago',
      read: true,
    },
  ]

  const activities = [
    {
      id: 1,
      user: 'John Smith',
      action: 'commented on',
      target: 'Issue #123',
      time: '10 minutes ago',
      avatar: '👨‍💼',
    },
    {
      id: 2,
      user: 'Emily Davis',
      action: 'assigned you to',
      target: 'Task: Code Review',
      time: '30 minutes ago',
      avatar: '👩‍💼',
    },
    {
      id: 3,
      user: 'Michael Chen',
      action: 'merged pull request',
      target: 'PR #456',
      time: '2 hours ago',
      avatar: '👨‍💻',
    },
    {
      id: 4,
      user: 'Sarah Johnson',
      action: 'updated',
      target: 'Project Timeline',
      time: '4 hours ago',
      avatar: '👩‍💻',
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          {unreadCount > 0 && <Badge count={unreadCount} className="mt-1" />}
        </div>
        <div className="flex gap-2">
          <Button>Mark All as Read</Button>
          <Button type="primary">Clear All</Button>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: '1',
                  label: `All (${notifications.length})`,
                  children: (
                    <List
                      dataSource={notifications}
                      renderItem={(item) => (
                        <List.Item
                          className={`${!item.read ? 'bg-blue-50' : ''} transition-colors hover:bg-gray-50`}
                          actions={[
                            <Button key="mark-read" type="text" size="small">
                              Mark as read
                            </Button>,
                            <Button key="delete" type="text" size="small" danger>
                              Delete
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                {item.icon}
                              </div>
                            }
                            title={
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{item.title}</span>
                                {!item.read && <Badge status="processing" />}
                              </div>
                            }
                            description={
                              <div>
                                <p className="mb-1">{item.message}</p>
                                <p className="text-xs text-gray-500">
                                  <ClockCircleOutlined className="mr-1" />
                                  {item.time}
                                </p>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  ),
                },
                {
                  key: '2',
                  label: `Unread (${unreadCount})`,
                  children: (
                    <List
                      dataSource={notifications.filter((n) => !n.read)}
                      renderItem={(item) => (
                        <List.Item
                          className="bg-blue-50"
                          actions={[
                            <Button key="mark-read" type="text" size="small">
                              Mark as read
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                {item.icon}
                              </div>
                            }
                            title={item.title}
                            description={
                              <div>
                                <p className="mb-1">{item.message}</p>
                                <p className="text-xs text-gray-500">{item.time}</p>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  ),
                },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {/* Recent Activity */}
          <Card title="Recent Activity" className="mb-6">
            <List
              dataSource={activities}
              renderItem={(item) => (
                <List.Item className="px-0">
                  <List.Item.Meta
                    avatar={<div className="text-2xl">{item.avatar}</div>}
                    title={
                      <div className="text-sm">
                        <span className="font-semibold">{item.user}</span>{' '}
                        <span className="text-gray-600">{item.action}</span>{' '}
                        <span className="font-semibold text-blue-600">{item.target}</span>
                      </div>
                    }
                    description={
                      <p className="text-xs text-gray-500">
                        <ClockCircleOutlined className="mr-1" />
                        {item.time}
                      </p>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Quick Stats */}
          <Card title="Notification Stats">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BellOutlined className="text-blue-600" />
                  <span className="text-gray-700">Total Today</span>
                </div>
                <span className="text-xl font-bold text-gray-800">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-green-600" />
                  <span className="text-gray-700">Read</span>
                </div>
                <span className="text-xl font-bold text-gray-800">
                  {notifications.filter((n) => n.read).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClockCircleOutlined className="text-orange-600" />
                  <span className="text-gray-700">Unread</span>
                </div>
                <span className="text-xl font-bold text-orange-600">{unreadCount}</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
