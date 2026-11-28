import { NextResponse } from 'next/server'
import { COOKIE_NAME, ADMIN_COOKIE } from '@/lib/auth'

const ADMIN_SECRET = (process.env.ADMIN_SECRET || 'admin-secret-change-me').trim()

export function middleware(req) {
  const { pathname } = req.nextUrl

  // 1. Lewati file statis, API routes, dan internal Next.js
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  // 2. Jika membuka /admin/login langsung, arahkan ke /login
  if (pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const adminToken = req.cookies.get(ADMIN_COOKIE)?.value?.trim()
  const userToken = req.cookies.get(COOKIE_NAME)?.value
  const isAuthenticated = (adminToken && adminToken === ADMIN_SECRET) || (userToken && userToken.length > 10)
  const isLoginPage = pathname === '/login'

  // 3. Jika sudah login dan mencoba akses halaman /login, TOLAK dan tetap di /admin
  // Harus klik logout dulu baru bisa masuk ke halaman login
  if (isLoginPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    return NextResponse.next()
  }

  // 4. Panel admin (/admin dan semua subpath /admin/*): WAJIB login
  // Jika belum login, tolak dan arahkan ke /login
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next()
  }

  // 5. Halaman portofolio utama (/) bersifat publik, tidak perlu login
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
