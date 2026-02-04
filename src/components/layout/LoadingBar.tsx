'use client'

import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { Progress } from 'antd'

export const LoadingBar = () => {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const isLoading = isFetching > 0 || isMutating > 0

  if (!isLoading) return null

  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <Progress percent={100} showInfo={false} status="active" strokeColor="#1677ff" />
    </div>
  )
}
