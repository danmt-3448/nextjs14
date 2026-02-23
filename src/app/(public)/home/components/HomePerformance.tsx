'use client'

import { Card, Col, Progress, Row } from 'antd'

type Monthly = { month: string; revenue: number; users: number }

export function HomePerformance({ monthlyData }: { monthlyData: Monthly[] }) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={12}>
        <Card title="User Growth">
          <div className="space-y-3">
            {monthlyData.map((item) => (
              <div key={item.month} className="flex items-end gap-2">
                <div className="w-16 text-sm text-gray-600">{item.month}</div>
                <div className="flex-1">
                  <div
                    className="rounded-t-lg bg-gradient-to-t from-green-500 to-green-300 transition-all duration-500 hover:from-green-600 hover:to-green-400"
                    style={{
                      height: `${(item.users / 350) * 120}px`,
                      width: '100%',
                    }}
                  />
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
  )
}