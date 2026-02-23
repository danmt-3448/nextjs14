import Link from 'next/link'
import { ClientCharts } from './components/ClientCharts'

export default function HomePage() {
  // Có thể fetch server-side ở đây (db/api) nếu cần.
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero (server, không cần antd) */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
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
        {/* Client-side only charts - load after mount for better performance */}
        <ClientCharts monthlyData={monthlyData} productSales={productSales} />

        {/* CTA (server) */}
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