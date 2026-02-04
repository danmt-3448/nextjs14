import { useGetMe } from '@/domains/user'
import StorageUtils from '@/lib/storage'

export const useAuth = () => {
  const { data: user, isLoading, error } = useGetMe()
  const token = StorageUtils.getCookie('auth-token')

  return {
    user,
    isLoading,
    isAuthenticated: !!token && !!user,
    error,
  }
}
