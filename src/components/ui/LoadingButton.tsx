'use client'

import { Button } from 'antd'
import { useLoadingStore } from '@/store'

interface LoadingButtonProps {
  children: React.ReactNode
  loadingKey?: string
  onClick?: () => void
  [key: string]: any
}

export const LoadingButton = ({ children, loadingKey, onClick, ...props }: LoadingButtonProps) => {
  const { isLoadingKey } = useLoadingStore()
  const isLoading = loadingKey ? isLoadingKey(loadingKey) : false

  return (
    <Button loading={isLoading} onClick={onClick} {...props}>
      {children}
    </Button>
  )
}
