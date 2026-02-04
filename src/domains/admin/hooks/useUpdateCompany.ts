import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/http'
import useToast from '@/hooks/useToast'
import { API_ENDPOINTS } from '@/constants'
import { queryKeys } from '@/lib/query'
import type { UpdateCompanyRequest, Company } from '../types'

export const useUpdateCompany = (id: string) => {
  const queryClient = useQueryClient()
  const { toastSuccess, toastApiError } = useToast()

  return useMutation({
    mutationFn: async (data: UpdateCompanyRequest) => {
      const response = await axiosInstance.put<Company>(API_ENDPOINTS.UPDATE_COMPANY(id), data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.companies.all() })
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.companies.detail(id) })
      toastSuccess('Company updated successfully!')
    },
    onError: (error) => {
      toastApiError(error)
    },
  })
}
