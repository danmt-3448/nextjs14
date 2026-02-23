import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { axiosInstance } from '@/lib/http'
import useToast from '@/hooks/useToast'
import StorageUtils from '@/lib/storage'
import { API_ENDPOINTS, ROUTES } from '@/constants'
import { useAuthContext } from '@/contexts'

export const useLogout = () => {
  const router = useRouter()
  const { toastSuccess } = useToast()
  const { checkAuth } = useAuthContext()

  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post(API_ENDPOINTS.LOGOUT)
    },
    onSuccess: () => {
      StorageUtils.deleteCookie('auth-token')
      StorageUtils.deleteCookie('auth-role')
      
      // Update AuthContext immediately
      checkAuth()
      
      toastSuccess('Logout successful!')
      router.push(ROUTES.LOGIN)
    },
  })
}
