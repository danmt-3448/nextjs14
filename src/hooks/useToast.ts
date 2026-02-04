import { AxiosError } from 'axios'
import { App } from 'antd'
import { ReactNode } from 'react'

interface ApiError {
  message: string
  code?: string
  details?: any
}

export default function useToast() {
  const { message } = App.useApp()

  const getApiErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError
      return apiError?.message || error.message || 'An error occurred'
    }
    return 'An unexpected error occurred'
  }

  const toastLoading = (content: ReactNode) => message.loading(content)
  const toastSuccess = (content: ReactNode) => message.success(content)
  const toastWarning = (content: ReactNode) => message.warning(content)
  const toastError = (content: ReactNode) => message.error(content)
  const toastApiError = (error: unknown) => message.error(getApiErrorMessage(error))
  const destroy = () => message.destroy()

  return {
    toastLoading,
    toastSuccess,
    toastError,
    toastWarning,
    toastApiError,
    destroy,
  }
}
