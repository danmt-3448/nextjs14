import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { queryKeys } from '@/lib/query'
import type { Post } from '../types'

export const useGetPosts = () => {
  return useQuery({
    queryKey: queryKeys.public.posts.all(),
    queryFn: async () => {
      const { data } = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      return data.slice(0, 10) // Get first 10 posts only
    },
  })
}
