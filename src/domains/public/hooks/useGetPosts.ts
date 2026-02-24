import { useQuery, keepPreviousData } from '@tanstack/react-query'
import axios from 'axios'
import { queryKeys } from '@/lib/query'
import type { Post } from '../types'

interface UseGetPostsOptions {
  page?: number
  limit?: number
}

export const useGetPosts = ({ page = 1, limit = 10 }: UseGetPostsOptions = {}) => {
  return useQuery({
    queryKey: queryKeys.public.posts.list({ page, limit }),
    queryFn: async () => {
      const { data } = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      const start = (page - 1) * limit
      return data.slice(start, start + limit)
    },
    placeholderData: keepPreviousData,
  })
}
