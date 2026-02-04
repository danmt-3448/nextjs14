import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/http'
import useToast from '@/hooks/useToast'
import { API_ENDPOINTS } from '@/constants'
import { queryKeys } from '@/lib/query'
import type { User, UpdateProfileRequest } from '../types'

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  const { toastSuccess, toastApiError } = useToast()

  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      const response = await axiosInstance.put<User>(API_ENDPOINTS.UPDATE_PROFILE, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() })
      toastSuccess('Profile updated successfully!')
    },
    onError: (error) => {
      toastApiError(error)
    },
  })
}
