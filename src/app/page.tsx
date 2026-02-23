import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { ROUTES } from '@/constants'

export default function RootPage() {
  // Server-side redirect (handled by middleware, but keep as fallback)
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token')
  
  if (token) {
    redirect(ROUTES.DASHBOARD)
  } else {
    redirect(ROUTES.HOME)
  }
}
