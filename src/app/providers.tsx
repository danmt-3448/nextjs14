'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { App as AntdApp } from 'antd'
import { queryClient } from '@/lib/query'
import dynamic from 'next/dynamic'
import { AuthProvider } from '@/contexts/AuthContext'

// Lazy load devtools only in development
const ReactQueryDevtools = dynamic(
  () => import('@tanstack/react-query-devtools').then((mod) => mod.ReactQueryDevtools),
  { ssr: false }
)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdApp>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </AuthProvider>
      </QueryClientProvider>
    </AntdApp>
  )
}
