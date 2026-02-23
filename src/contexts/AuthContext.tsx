'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react'
import { Spin } from 'antd'
import StorageUtils from '@/lib/storage'
import type { UserRole } from '@/domains/auth/server'

interface AuthState {
  isAuthenticated: boolean
  role: UserRole | null
  token: string | null
  isLoading: boolean
}

interface AuthContextValue extends AuthState {
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    token: null,
    isLoading: true,
  })

  // Memoize checkAuth to prevent re-creating function on every render
  const checkAuth = useCallback(() => {
    const token = StorageUtils.getCookie('auth-token')
    const role = StorageUtils.getCookie('auth-role') as UserRole | null

    setAuthState({
      isAuthenticated: !!token,
      role,
      token,
      isLoading: false,
    })
  }, [])

  useEffect(() => {
    checkAuth()
    
    // Re-check auth on storage change (e.g., logout in another tab)
    window.addEventListener('storage', checkAuth)
    
    return () => window.removeEventListener('storage', checkAuth)
  }, [checkAuth])

  const value = useMemo(() => ({ ...authState, checkAuth }), [authState, checkAuth])

  if (authState.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
