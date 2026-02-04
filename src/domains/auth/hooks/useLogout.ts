import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { axiosInstance } from '@/lib/http'
import useToast from '@/hooks/useToast'
import StorageUtils from '@/lib/storage'
import { API_ENDPOINTS, ROUTES } from '@/constants'

export const useLogout = () => {
  const router = useRouter()
  const { toastSuccess } = useToast()

  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post(API_ENDPOINTS.LOGOUT)
    },
    onSuccess: () => {
      StorageUtils.deleteCookie('auth-token')
      StorageUtils.deleteCookie('auth-role')
      toastSuccess('Logout successful!')
      router.push(ROUTES.LOGIN)
    },
  })
}
