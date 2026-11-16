import { NextResponse } from 'next/server'
import { COOKIE_NAME } from '../../../lib/auth'

export async function POST(req) {
  const { username, password } = await req.json()

  if (!username || !password) {
    return NextResponse.json({ message: 'Username dan password wajib diisi' }, { status: 400 })
  }

  // 1. Kirim ke API (URL & path diambil dari .env.local)
  let res
  try {
    res = await fetch(`${process.env.API_URL}${process.env.PATH_LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.API_KEY && { 'x-api-key': process.env.API_KEY }),
      },
      body: JSON.stringify({ username, password }),
      cache: 'no-store',
    })
  } catch {
    return NextResponse.json({ message: 'Tidak bisa menghubungi server API' }, { status: 502 })
  }

  const data = await res.json().catch(() => ({}))

  // 2. Gagal login
  if (!res.ok) {
    return NextResponse.json({ message: data.message || 'Username atau password salah' }, { status: 401 })
  }

  // 3. Sukses: ambil token dari respons (sesuaikan kalau struktur respons API kamu beda)
  const token = data.token || data.access_token || data.data?.token || 'logged-in'

  const response = NextResponse.json({ message: 'Berhasil login' })
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 hari
  })
  return response
}
