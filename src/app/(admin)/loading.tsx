import { Spin } from 'antd'

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <Spin size="large" />
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    </div>
  )
}
