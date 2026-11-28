import { NextResponse } from 'next/server'
import { COOKIE_NAME, ADMIN_COOKIE } from '@/lib/auth'

export async function POST() {
  const res = NextResponse.json({ message: 'Logout admin berhasil' })
  res.cookies.delete(ADMIN_COOKIE)
  res.cookies.delete(COOKIE_NAME)
  res.cookies.delete('admin_email')
  return res
}
