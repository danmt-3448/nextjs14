import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { axiosInstance } from '@/lib/http'
import useToast from '@/hooks/useToast'
import StorageUtils from '@/lib/storage'
import { API_ENDPOINTS, ROUTES } from '@/constants'
import type { LoginRequest, LoginResponse } from '../types'
import { useAuthContext } from '@/contexts'

export const useLogin = () => {
  const router = useRouter()
  const { toastSuccess, toastApiError } = useToast()
  const { checkAuth } = useAuthContext()

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const { data } = await axiosInstance.post<LoginResponse>(API_ENDPOINTS.LOGIN, credentials)
      return data
    },
    onSuccess: (data) => {
      StorageUtils.setCookie('auth-token', data.token)
      StorageUtils.setCookie('auth-role', data.user.role)
      
      // Update AuthContext immediately
      checkAuth()
      
      toastSuccess('Login successful!')
      router.push(data.user.role === 'admin' ? ROUTES.COMPANIES : ROUTES.DASHBOARD)
    },
    onError: (error) => {
      toastApiError(error)
    },
  })
}
