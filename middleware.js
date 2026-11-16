import { NextResponse } from 'next/server'
import { COOKIE_NAME } from '@/lib/auth'

// Belum login -> paksa ke /login. Sudah login -> jangan balik ke /login.
export function middleware(req) {
  const loggedIn = req.cookies.has(COOKIE_NAME)
  const isLoginPage = req.nextUrl.pathname === '/login'

  if (!loggedIn && !isLoginPage) return NextResponse.redirect(new URL('/login', req.url))
  if (loggedIn && isLoginPage) return NextResponse.redirect(new URL('/', req.url))
  return NextResponse.next()
}

// Lewati /api, file internal Next, dan file statis (yang ada titiknya: .png, .gif, dll)
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] }
