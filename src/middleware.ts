import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Only handle root path redirect
  if (pathname === '/') {
    const token = request.cookies.get('auth-token')
    
    // Redirect to dashboard if authenticated, otherwise to home
    const redirectPath = token ? '/dashboard' : '/home'
    return NextResponse.redirect(new URL(redirectPath, request.url))
  }
  
  return NextResponse.next()
}

// Only run middleware on root path
export const config = {
  matcher: '/',
}
