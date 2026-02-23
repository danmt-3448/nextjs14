'use client'

import { Menu } from 'antd'
import {
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  BellOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { useRouter, usePathname } from 'next/navigation'
import { ROUTES } from '@/constants'
import { useAuthContext } from '@/contexts'
import { useMemo, useCallback, memo } from 'react'

export const Sidebar = memo(() => {
  const router = useRouter()
  const pathname = usePathname()
  const { role } = useAuthContext()
  const isAdmin = role === 'admin'

  const handleNavigate = useCallback((path: string) => {
    router.push(path)
  }, [router])

  const userItems = useMemo(() => [
    {
      key: ROUTES.DASHBOARD,
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => handleNavigate(ROUTES.DASHBOARD),
    },
    {
      key: ROUTES.ACTIVITY,
      icon: <ThunderboltOutlined />,
      label: 'Activity',
      onClick: () => handleNavigate(ROUTES.ACTIVITY),
    },
    {
      key: ROUTES.NOTIFICATIONS,
      icon: <BellOutlined />,
      label: 'Notifications',
      onClick: () => handleNavigate(ROUTES.NOTIFICATIONS),
    },
    {
      key: ROUTES.PROFILE,
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => handleNavigate(ROUTES.PROFILE),
    },
    {
      key: ROUTES.SETTINGS,
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => handleNavigate(ROUTES.SETTINGS),
    },
  ], [handleNavigate])

  const adminItems = useMemo(() => [
    {
      key: ROUTES.COMPANIES,
      icon: <TeamOutlined />,
      label: 'Companies',
      onClick: () => handleNavigate(ROUTES.COMPANIES),
    },
  ], [handleNavigate])

  const menuItems = useMemo(() => {
    return isAdmin
      ? [...userItems, { type: 'divider' as const }, ...adminItems]
      : userItems
  }, [isAdmin, userItems, adminItems])

  const selectedKey = useMemo(() => {
    if (pathname.startsWith(ROUTES.COMPANIES)) return ROUTES.COMPANIES
    if (pathname.startsWith(ROUTES.ACTIVITY)) return ROUTES.ACTIVITY
    if (pathname.startsWith(ROUTES.NOTIFICATIONS)) return ROUTES.NOTIFICATIONS
    if (pathname.startsWith(ROUTES.PROFILE)) return ROUTES.PROFILE
    if (pathname.startsWith(ROUTES.SETTINGS)) return ROUTES.SETTINGS
    if (pathname.startsWith(ROUTES.DASHBOARD)) return ROUTES.DASHBOARD
    return pathname
  }, [pathname])

  return (
    <aside className="h-full border-r bg-white">
      <div className="p-4">
        <h2 className="mb-4 px-4 text-lg font-bold text-gray-800">Menu</h2>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          className="border-none"
        />
      </div>
    </aside>
  )
})

Sidebar.displayName = 'Sidebar'

