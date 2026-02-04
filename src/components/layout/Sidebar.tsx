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
import StorageUtils from '@/lib/storage'

export const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const role = StorageUtils.getCookie('auth-role')
  const isAdmin = role === 'admin'

  const userItems = [
    {
      key: ROUTES.DASHBOARD,
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => router.push(ROUTES.DASHBOARD),
    },
    {
      key: ROUTES.ACTIVITY,
      icon: <ThunderboltOutlined />,
      label: 'Activity',
      onClick: () => router.push(ROUTES.ACTIVITY),
    },
    {
      key: ROUTES.NOTIFICATIONS,
      icon: <BellOutlined />,
      label: 'Notifications',
      onClick: () => router.push(ROUTES.NOTIFICATIONS),
    },
    {
      key: ROUTES.PROFILE,
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => router.push(ROUTES.PROFILE),
    },
    {
      key: ROUTES.SETTINGS,
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => router.push(ROUTES.SETTINGS),
    },
  ]

  const adminItems = [
    {
      key: ROUTES.COMPANIES,
      icon: <TeamOutlined />,
      label: 'Companies',
      onClick: () => router.push(ROUTES.COMPANIES),
    },
  ]

  const menuItems = isAdmin
    ? [...userItems, { type: 'divider' as const }, ...adminItems]
    : userItems

  const selectedKey = (() => {
    if (pathname.startsWith(ROUTES.COMPANIES)) return ROUTES.COMPANIES
    if (pathname.startsWith(ROUTES.ACTIVITY)) return ROUTES.ACTIVITY
    if (pathname.startsWith(ROUTES.NOTIFICATIONS)) return ROUTES.NOTIFICATIONS
    if (pathname.startsWith(ROUTES.PROFILE)) return ROUTES.PROFILE
    if (pathname.startsWith(ROUTES.SETTINGS)) return ROUTES.SETTINGS
    if (pathname.startsWith(ROUTES.DASHBOARD)) return ROUTES.DASHBOARD
    return pathname
  })()

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
}
