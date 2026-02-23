'use client'

import { ROUTES } from '@/constants'
import { useLogout } from '@/domains/auth'
import { useAuthContext } from '@/contexts'
import { LogoutOutlined, SettingOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { useRouter } from 'next/navigation'
import { memo, useMemo, useCallback } from 'react'

interface HeaderProps {
  title?: string
  showUserMenu?: boolean
  showAdminButton?: boolean
}

export const Header = memo(({
  title = 'Protected Area',
  showUserMenu = true,
  showAdminButton = true,
}: HeaderProps) => {
  const router = useRouter()
  const { mutate: logout, isPending } = useLogout()
  const { role } = useAuthContext()
  const canSeeAdmin = showAdminButton && role === 'admin'
  const userLabel = role === 'admin' ? 'Admin' : 'User'

  const handleLogout = useCallback(() => logout(), [logout])
  const handleNavigateProfile = useCallback(() => router.push(ROUTES.PROFILE), [router])
  const handleNavigateSettings = useCallback(() => router.push(ROUTES.SETTINGS), [router])
  const handleNavigateCompanies = useCallback(() => router.push(ROUTES.COMPANIES), [router])

  const items: MenuProps['items'] = useMemo(() => [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
      onClick: handleNavigateProfile,
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined />,
      onClick: handleNavigateSettings,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ], [handleNavigateProfile, handleNavigateSettings, handleLogout])

  return (
    <header className="border-b bg-white px-6 py-4 shadow-sm">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
        {showUserMenu && (
          <div className="flex items-center gap-4">
            {canSeeAdmin && (
              <Button
                type="primary"
                icon={<ShopOutlined />}
                onClick={handleNavigateCompanies}
              >
                <span className="hidden sm:inline">Admin Panel</span>
              </Button>
            )}
            <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
              <Button
                type="text"
                className="flex items-center gap-2"
                icon={<Avatar size="small" icon={<UserOutlined />} />}
                loading={isPending}
              >
                <span className="hidden sm:inline">{userLabel}</span>
              </Button>
            </Dropdown>
          </div>
        )}
      </div>
    </header>
  )
})

Header.displayName = 'Header'

