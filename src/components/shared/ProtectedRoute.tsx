'use client'

import { useEffect, ReactNode, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Spin } from 'antd'
import { ROUTES } from '@/constants'
import type { UserRole } from '@/domains/auth/server'
import { useAuthContext } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

export const ProtectedRoute = ({ children, allowedRoles, redirectTo }: ProtectedRouteProps) => {
  const router = useRouter()
  const { isAuthenticated, role, isLoading } = useAuthContext()
  const hasRedirected = useRef(false)

  useEffect(() => {
    // Skip if loading or already redirected
    if (isLoading || hasRedirected.current) return

    if (!isAuthenticated) {
      hasRedirected.current = true
      router.replace(ROUTES.LOGIN)
      return
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role as UserRole)) {
      hasRedirected.current = true
      router.replace(redirectTo || ROUTES.DASHBOARD)
    }
  }, [isAuthenticated, role, isLoading])

  // Reset redirect flag when navigating to a new route
  useEffect(() => {
    hasRedirected.current = false
  }, [allowedRoles, redirectTo])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-500">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role as UserRole)) {
    return null
  }

  return <>{children}</>
}

