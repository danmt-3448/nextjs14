'use client'

import {
  ArrowUpOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined
} from '@ant-design/icons'
import { Card, Col, Progress, Row, Statistic, Table, Tag, Timeline } from 'antd'

export default function ActivityPage() {
  const recentActivities = [
    {
      time: '2 hours ago',
      action: 'Logged in from Chrome on MacOS',
      type: 'login',
      color: 'blue',
    },
    {
      time: '5 hours ago',
      action: 'Updated profile information',
      type: 'update',
      color: 'green',
    },
    {
      time: '1 day ago',
      action: 'Completed task: Code Review',
      type: 'task',
      color: 'purple',
    },
    {
      time: '2 days ago',
      action: 'Changed password',
      type: 'security',
      color: 'orange',
    },
    {
      time: '3 days ago',
      action: 'Joined project: Mobile App',
      type: 'project',
      color: 'cyan',
    },
    {
      time: '5 days ago',
      action: 'Created new company profile',
      type: 'create',
      color: 'green',
    },
  ]

  const taskHistory = [
    {
      key: '1',
      task: 'Website Redesign',
      status: 'completed',
      priority: 'high',
      completedDate: '2026-02-01',
      duration: '3 days',
    },
    {
      key: '2',
      task: 'Bug Fixing',
      status: 'completed',
      priority: 'medium',
      completedDate: '2026-01-30',
      duration: '1 day',
    },
    {
      key: '3',
      task: 'Code Review',
      status: 'in-progress',
      priority: 'high',
      completedDate: '-',
      duration: '2 days',
    },
    {
      key: '4',
      task: 'Documentation Update',
      status: 'pending',
      priority: 'low',
      completedDate: '-',
      duration: '-',
    },
  ]

  const columns = [
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config = {
          completed: { color: 'green', icon: <CheckCircleOutlined /> },
          'in-progress': { color: 'blue', icon: <SyncOutlined spin /> },
          pending: { color: 'orange', icon: <ClockCircleOutlined /> },
        }[status]
        return (
          <Tag color={config?.color} icon={config?.icon}>
            {status.toUpperCase()}
          </Tag>
        )
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'default'}>
          {priority.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Completed Date',
      dataIndex: 'completedDate',
      key: 'completedDate',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Activity & History</h1>

      {/* Stats Overview */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Total Activities"
              value={156}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Tasks Completed"
              value={89}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix={
                <span className="text-sm">
                  <ArrowUpOutlined /> 12%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="In Progress"
              value={8}
              prefix={<SyncOutlined spin />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Productivity"
              value={92}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Recent Activities Timeline */}
        <Col xs={24} lg={10}>
          <Card title="Recent Activities">
            <Timeline
              items={recentActivities.map((activity) => ({
                color: activity.color,
                children: (
                  <div>
                    <p className="font-semibold text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                ),
              }))}
            />
          </Card>
        </Col>

        {/* Progress Overview */}
        <Col xs={24} lg={14}>
          <Card title="Weekly Progress" className="mb-6">
            <div className="space-y-4">
              {[
                { day: 'Monday', tasks: 8, completed: 8, color: '#52c41a' },
                { day: 'Tuesday', tasks: 6, completed: 5, color: '#1890ff' },
                { day: 'Wednesday', tasks: 10, completed: 7, color: '#faad14' },
                { day: 'Thursday', tasks: 7, completed: 6, color: '#1890ff' },
                { day: 'Friday', tasks: 9, completed: 9, color: '#52c41a' },
                { day: 'Saturday', tasks: 3, completed: 2, color: '#faad14' },
                { day: 'Sunday', tasks: 2, completed: 2, color: '#52c41a' },
              ].map((day) => (
                <div key={day.day}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-gray-700">{day.day}</span>
                    <span className="text-gray-600">
                      {day.completed}/{day.tasks} tasks
                    </span>
                  </div>
                  <Progress
                    percent={Math.round((day.completed / day.tasks) * 100)}
                    strokeColor={day.color}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Task History Table */}
      <Card title="Task History">
        <Table columns={columns} dataSource={taskHistory} pagination={false} />
      </Card>

      {/* Monthly Summary */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title="This Month">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Tasks Completed</span>
                <span className="text-2xl font-bold text-green-600">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hours Worked</span>
                <span className="text-2xl font-bold text-blue-600">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Projects</span>
                <span className="text-2xl font-bold text-purple-600">5</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Last Month">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Tasks Completed</span>
                <span className="text-2xl font-bold text-gray-600">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hours Worked</span>
                <span className="text-2xl font-bold text-gray-600">168</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Projects</span>
                <span className="text-2xl font-bold text-gray-600">6</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Average">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Tasks</span>
                <span className="text-2xl font-bold text-orange-600">6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Hours</span>
                <span className="text-2xl font-bold text-orange-600">7.5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Efficiency</span>
                <span className="text-2xl font-bold text-orange-600">88%</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
