'use client'

import { Card, Col, Progress, Row } from 'antd'

type Monthly = { month: string; revenue: number; users: number }
type Product = { name: string; value: number; color: string }

export function HomeCharts({
  monthlyData,
  productSales,
}: {
  monthlyData: Monthly[]
  productSales: Product[]
}) {
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))

  return (
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
                <Progress percent={product.value} strokeColor={product.color} showInfo={false} />
              </div>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
  )
}