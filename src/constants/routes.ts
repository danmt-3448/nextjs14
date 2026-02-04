export const ROUTES = {
  HOME: '/home',
  ABOUT: '/about',
  LOGIN: '/login',
  REGISTER: '/register',

  // Protected routes
  DASHBOARD: '/dashboard',
  ACTIVITY: '/activity',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
  SETTINGS: '/settings',

  COMPANIES: '/companies',
  COMPANY_DETAIL: (id: string) => `/companies/${id}`,
  CREATE_COMPANY: '/companies/create',
} as const
