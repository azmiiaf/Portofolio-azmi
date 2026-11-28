import { NextResponse } from 'next/server'
import { COOKIE_NAME, ADMIN_COOKIE } from '@/lib/auth'

export async function POST() {
  const response = NextResponse.json({ message: 'Berhasil logout' })
  response.cookies.delete(COOKIE_NAME)
  response.cookies.delete(ADMIN_COOKIE)
  response.cookies.delete('admin_email')
  return response
}
