import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/http'
import { API_ENDPOINTS } from '@/constants'
import { queryKeys } from '@/lib/query'
import type { Company } from '../types'

export const useGetCompany = (id: string) => {
  return useQuery({
    queryKey: queryKeys.admin.companies.detail(id),
    queryFn: async () => {
      const { data } = await axiosInstance.get<Company>(API_ENDPOINTS.GET_COMPANY(id))
      return data
    },
    enabled: !!id,
  })
}
