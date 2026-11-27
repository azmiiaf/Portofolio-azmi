import { NextResponse } from 'next/server'
import { COOKIE_NAME, ADMIN_COOKIE } from '@/lib/auth'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin-secret-change-me'

export function middleware(req) {
  const { pathname } = req.nextUrl

  // Static assets, API, Next internals — lewati
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  // Admin login page: selalu bisa diakses
  if (pathname === '/admin/login') {
    // Kalau sudah login admin, redirect ke dashboard
    const adminToken = req.cookies.get(ADMIN_COOKIE)?.value
    if (adminToken === ADMIN_SECRET) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    return NextResponse.next()
  }

  // Admin area: butuh cookie admin_token
  if (pathname.startsWith('/admin')) {
    const adminToken = req.cookies.get(ADMIN_COOKIE)?.value
    if (adminToken !== ADMIN_SECRET) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    return NextResponse.next()
  }

  // Portfolio area: butuh cookie biasa
  const loggedIn = req.cookies.has(COOKIE_NAME)
  const isLoginPage = pathname === '/login'

  if (!loggedIn && !isLoginPage) return NextResponse.redirect(new URL('/login', req.url))
  if (loggedIn && isLoginPage) return NextResponse.redirect(new URL('/', req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
