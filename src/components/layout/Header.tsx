'use client'

import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { UserOutlined, LogoutOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { useLogout } from '@/domains/auth'
import { ROUTES } from '@/constants'
import StorageUtils from '@/lib/storage'

interface HeaderProps {
  title?: string
  showUserMenu?: boolean
  showAdminButton?: boolean
}

export const Header = ({
  title = 'Protected Area',
  showUserMenu = true,
  showAdminButton = true,
}: HeaderProps) => {
  const router = useRouter()
  const { mutate: logout, isPending } = useLogout()
  const role = StorageUtils.getCookie('auth-role')
  const canSeeAdmin = showAdminButton && role === 'admin'
  const displayName = role === 'admin' ? 'Admin' : 'User'

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
      onClick: () => router.push(ROUTES.PROFILE),
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined />,
      onClick: () => router.push(ROUTES.SETTINGS),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => logout(),
    },
  ]

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
                onClick={() => router.push(ROUTES.COMPANIES)}
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
                <span className="hidden sm:inline">{displayName}</span>
              </Button>
            </Dropdown>
          </div>
        )}
      </div>
    </header>
  )
}
