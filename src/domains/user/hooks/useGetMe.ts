import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/http'
import { API_ENDPOINTS } from '@/constants'
import { queryKeys } from '@/lib/query'
import type { User } from '../types'

export const useGetMe = () => {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>(API_ENDPOINTS.GET_ME)
      return data
    },
  })
}
