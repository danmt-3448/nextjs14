import { ProtectedRoute } from '@/components/shared'
import { Header, Sidebar } from '@/components/layout'
import { USER_ROLES } from '@/domains/auth/server'
import { ROUTES } from '@/constants'

// Move outside component to avoid creating new array on every render
const ALLOWED_ROLES = [USER_ROLES.ADMIN]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={ALLOWED_ROLES} redirectTo={ROUTES.DASHBOARD}>
      <div className="min-h-screen bg-gray-50">
        <Header title="Admin Panel" showAdminButton={false} />
        <div className="flex">
          <div className="w-64">
            <Sidebar />
          </div>
          <main className="min-w-0 flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
