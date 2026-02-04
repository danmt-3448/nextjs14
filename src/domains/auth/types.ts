export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password: string
  role?: UserRole
}

export interface LoginResponse {
  token: string
  user: User
}
