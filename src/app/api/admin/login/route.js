import { NextResponse } from 'next/server'
import { ADMIN_COOKIE } from '@/lib/auth'

export async function POST(req) {
  const { password } = await req.json()
  const secret = process.env.ADMIN_SECRET || 'admin-secret-change-me'

  if (!password || password !== secret) {
    return NextResponse.json({ message: 'Password salah' }, { status: 401 })
  }

  const res = NextResponse.json({ message: 'Login admin berhasil' })
  res.cookies.set(ADMIN_COOKIE, secret, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 jam
  })
  return res
}
