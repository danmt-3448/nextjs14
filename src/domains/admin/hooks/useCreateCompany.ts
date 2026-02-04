import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/http'
import useToast from '@/hooks/useToast'
import { queryKeys } from '@/lib/query'
import { API_ENDPOINTS } from '@/constants'
import type { CreateCompanyRequest, Company } from '../types'

export const useCreateCompany = () => {
  const queryClient = useQueryClient()
  const { toastSuccess, toastApiError } = useToast()

  return useMutation({
    mutationFn: async (data: CreateCompanyRequest) => {
      const response = await axiosInstance.post<Company>(API_ENDPOINTS.CREATE_COMPANY, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.companies.all() })
      toastSuccess('Company created successfully!')
    },
    onError: (error) => {
      toastApiError(error)
    },
  })
}
