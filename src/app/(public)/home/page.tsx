'use client'

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Card, Col, Progress, Row, Statistic } from 'antd'
import Link from 'next/link'

export default function HomePage() {
  // Sample data
  const monthlyData = [
    { month: 'Jan', revenue: 4200, users: 150 },
    { month: 'Feb', revenue: 5300, users: 180 },
    { month: 'Mar', revenue: 4800, users: 165 },
    { month: 'Apr', revenue: 6100, users: 220 },
    { month: 'May', revenue: 7200, users: 280 },
    { month: 'Jun', revenue: 8500, users: 350 },
  ]

  const productSales = [
    { name: 'Product A', value: 35, color: '#1890ff' },
    { name: 'Product B', value: 25, color: '#52c41a' },
    { name: 'Product C', value: 20, color: '#faad14' },
    { name: 'Product D', value: 15, color: '#f5222d' },
    { name: 'Others', value: 5, color: '#722ed1' },
  ]

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 ">
          <h1 className="mb-4 text-5xl font-bold">Business Analytics Dashboard</h1>
          <p className="mb-8 text-xl text-blue-100">
            Real-time insights and comprehensive data visualization
          </p>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold transition hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Key Metrics */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Revenue"
                value={35400}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<DollarOutlined />}
                suffix={
                  <span className="text-sm">
                    <ArrowUpOutlined className="text-green-600" /> 12.5%
                  </span>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Users"
                value={1345}
                valueStyle={{ color: '#1890ff' }}
                prefix={<UserOutlined />}
                suffix={
                  <span className="text-sm">
                    <ArrowUpOutlined className="text-green-600" /> 8.3%
                  </span>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Orders"
                value={892}
                valueStyle={{ color: '#faad14' }}
                prefix={<ShoppingCartOutlined />}
                suffix={
                  <span className="text-sm">
                    <ArrowDownOutlined className="text-red-600" /> 2.1%
                  </span>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Team Members"
                value={48}
                valueStyle={{ color: '#722ed1' }}
                prefix={<TeamOutlined />}
                suffix={
                  <span className="text-sm">
                    <ArrowUpOutlined className="text-green-600" /> 15%
                  </span>
                }
              />
            </Card>
          </Col>
        </Row>

        {/* Revenue Chart */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} lg={16}>
            <Card title="Monthly Revenue Trend" className="h-full">
              <div className="space-y-4">
                {monthlyData.map((item) => (
                  <div key={item.month}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold text-gray-700">{item.month}</span>
                      <span className="text-blue-600">${item.revenue.toLocaleString()}</span>
                    </div>
                    <div className="h-8 overflow-hidden rounded-lg bg-gray-100">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Product Distribution" className="h-full">
              <div className="space-y-4">
                {productSales.map((product) => (
                  <div key={product.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-gray-700">{product.name}</span>
                      <span className="font-semibold" style={{ color: product.color }}>
                        {product.value}%
                      </span>
                    </div>
                    <Progress
                      percent={product.value}
                      strokeColor={product.color}
                      showInfo={false}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* User Growth Chart */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="User Growth">
              <div className="space-y-3">
                {monthlyData.map((item, index) => (
                  <div key={item.month} className="flex items-end gap-2">
                    <div className="w-16 text-sm text-gray-600">{item.month}</div>
                    <div className="flex-1">
                      <div className="flex items-end justify-between">
                        <div
                          className="rounded-t-lg bg-gradient-to-t from-green-500 to-green-300 transition-all duration-500 hover:from-green-600 hover:to-green-400"
                          style={{
                            height: `${(item.users / 350) * 120}px`,
                            width: '100%',
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm font-semibold text-green-600">
                      {item.users}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Performance Metrics">
              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-gray-700">Conversion Rate</span>
                    <span className="font-semibold text-blue-600">68%</span>
                  </div>
                  <Progress percent={68} strokeColor="#1890ff" />
                </div>
                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-gray-700">Customer Satisfaction</span>
                    <span className="font-semibold text-green-600">92%</span>
                  </div>
                  <Progress percent={92} strokeColor="#52c41a" />
                </div>
                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-gray-700">System Performance</span>
                    <span className="font-semibold text-purple-600">85%</span>
                  </div>
                  <Progress percent={85} strokeColor="#722ed1" />
                </div>
                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-gray-700">Goal Completion</span>
                    <span className="font-semibold text-orange-600">74%</span>
                  </div>
                  <Progress percent={74} strokeColor="#faad14" />
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* CTA Section */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-blue-100">
            Join thousands of businesses already using our platform
          </p>
          <Link
            href="/login"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  )
}
