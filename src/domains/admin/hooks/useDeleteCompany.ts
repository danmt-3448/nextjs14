import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/http'
import useToast from '@/hooks/useToast'
import { API_ENDPOINTS } from '@/constants'
import { queryKeys } from '@/lib/query'

export const useDeleteCompany = () => {
  const queryClient = useQueryClient()
  const { toastSuccess, toastApiError } = useToast()

  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(API_ENDPOINTS.DELETE_COMPANY(id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.companies.all() })
      toastSuccess('Company deleted successfully!')
    },
    onError: (error) => {
      toastApiError(error)
    },
  })
}
