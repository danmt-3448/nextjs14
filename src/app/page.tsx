'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Spin } from 'antd'
import StorageUtils from '@/lib/storage'
import { ROUTES } from '@/constants'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const token = StorageUtils.getCookie('auth-token')

    // Redirect based on auth status
    if (token) {
      router.push(ROUTES.DASHBOARD)
    } else {
      router.push(ROUTES.HOME)
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spin size="large" />
        <p className="mt-4 text-gray-500">Redirecting...</p>
      </div>
    </div>
  )
}
