/**
 * Query keys factory for centralized cache key management
 */
export const queryKeys = {
  // Auth domain
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },

  // User domain
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
  },

  // Admin domain
  admin: {
    all: ['admin'] as const,
    companies: {
      all: () => [...queryKeys.admin.all, 'companies'] as const,
      list: (filters?: Record<string, unknown>) =>
        [...queryKeys.admin.companies.all(), 'list', filters] as const,
      detail: (id: string) => [...queryKeys.admin.companies.all(), 'detail', id] as const,
    },
  },

  // Public domain
  public: {
    all: ['public'] as const,
    posts: {
      all: () => [...queryKeys.public.all, 'posts'] as const,
      list: (filters?: Record<string, unknown>) =>
        [...queryKeys.public.posts.all(), 'list', filters] as const,
    },
  },
} as const
