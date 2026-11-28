import { NextResponse } from 'next/server'
import { COOKIE_NAME, ADMIN_COOKIE } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function POST(req) {
  try {
    const body = await req.json()
    const email = (body.email || body.username || '').trim()
    const password = body.password || ''

    if (!email || !password) {
      return NextResponse.json({ message: 'Email dan password wajib diisi' }, { status: 400 })
    }

    // Login via Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data?.session) {
      return NextResponse.json(
        {
          message:
            error?.message === 'Invalid login credentials'
              ? 'Email atau password salah'
              : (error?.message || 'Gagal login ke akun Supabase'),
        },
        { status: 401 }
      )
    }

    const token = data.session.access_token
    const userEmail = data.user.email || email

    const response = NextResponse.json({
      message: 'Berhasil login',
      user: { email: userEmail, id: data.user.id },
    })

    // Cookie token untuk akses portfolio
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    })

    // Cookie admin_token agar bisa akses /admin secara otomatis
    const adminSecret = process.env.ADMIN_SECRET || 'admin-secret-change-me'
    response.cookies.set(ADMIN_COOKIE, adminSecret, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    // Simpan email user untuk sidebar admin
    response.cookies.set('admin_email', userEmail, {
      httpOnly: false,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (err) {
    return NextResponse.json({ message: 'Terjadi kesalahan server: ' + err.message }, { status: 500 })
  }
}
