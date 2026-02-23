'use client'

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Statistic } from 'antd'

export function HomeKpis() {
  return (
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
  )
}