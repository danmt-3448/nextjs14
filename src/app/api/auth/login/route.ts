import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, role } = body as {
      email?: string
      password?: string
      role?: 'admin' | 'user'
    }

    // Mock validation - accept any email/password
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
    }

    // Hard-coded role check (mock BE): only allow admin role for a specific email.
    const ADMIN_EMAIL = 'admin@demo.com'
    const resolvedRole: 'admin' | 'user' =
      role === 'admin' && email === ADMIN_EMAIL ? 'admin' : 'user'

    // Mock successful login response
    const mockResponse = {
      token: `mock-jwt-token-${resolvedRole}-` + Date.now(),
      user: {
        id: '1',
        email: email,
        name: resolvedRole === 'admin' ? 'Admin User' : 'Normal User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
        role: resolvedRole,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }

    const response = NextResponse.json(mockResponse, { status: 200 })
    response.cookies.set('auth-token', mockResponse.token, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
    response.cookies.set('auth-role', resolvedRole, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
    return response
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
