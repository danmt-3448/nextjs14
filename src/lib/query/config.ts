import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - cache longer for better performance
      gcTime: 10 * 60 * 1000, // 10 minutes - keep cache longer
      refetchOnWindowFocus: false,
      refetchOnReconnect: false, // Reduce unnecessary refetches
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 0, // Don't retry mutations by default
    },
  },
})

