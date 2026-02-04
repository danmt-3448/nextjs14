'use client'

import { useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Spin } from 'antd'
import StorageUtils from '@/lib/storage'
import { ROUTES } from '@/constants'
import type { UserRole } from '@/domains/auth/server'

interface AuthCheckProps {
  children: ReactNode
  fallback?: ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

export const AuthCheck = ({ children, fallback, allowedRoles, redirectTo }: AuthCheckProps) => {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = StorageUtils.getCookie('auth-token')
    const role = StorageUtils.getCookie('auth-role')

    if (!token) {
      router.replace(ROUTES.LOGIN)
      setIsChecking(false)
      return
    }

    if (allowedRoles && allowedRoles.length > 0) {
      const hasAccess = allowedRoles.includes(role as UserRole)
      if (!hasAccess) {
        router.replace(redirectTo || ROUTES.DASHBOARD)
        setIsChecking(false)
        return
      }
    }

    setIsAuthenticated(true)
    setIsChecking(false)
  }, [router, allowedRoles, redirectTo])

  if (isChecking) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <Spin size="large" />
            <p className="mt-4 text-gray-500">Checking authentication...</p>
          </div>
        </div>
      )
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

export const ProtectedRoute = AuthCheck
