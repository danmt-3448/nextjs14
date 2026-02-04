export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',

  // User
  GET_ME: '/user/me',
  UPDATE_PROFILE: '/user/profile',

  // Admin - Companies
  GET_COMPANIES: '/admin/companies',
  GET_COMPANY: (id: string) => `/admin/companies/${id}`,
  CREATE_COMPANY: '/admin/companies',
  UPDATE_COMPANY: (id: string) => `/admin/companies/${id}`,
  DELETE_COMPANY: (id: string) => `/admin/companies/${id}`,
} as const
