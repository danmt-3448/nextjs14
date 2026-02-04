'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { App as AntdApp } from 'antd'
import { queryClient } from '@/lib/query'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdApp>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AntdApp>
  )
}
