import { NextResponse } from 'next/server'
import { COOKIE_NAME, ADMIN_COOKIE } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function POST(req) {
  try {
    const body = await req.json()
    const { email, password } = body
    const adminSecret = process.env.ADMIN_SECRET || 'admin-secret-change-me'

    // Opsi 1: Jika memasukkan password master admin langsung
    if (!email && password && password === adminSecret) {
      const res = NextResponse.json({ message: 'Login admin berhasil' })
      res.cookies.set(ADMIN_COOKIE, adminSecret, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
      res.cookies.set(COOKIE_NAME, 'admin-session', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
      return res
    }

    // Opsi 2: Login via akun Supabase (Email & Password)
    if (email && password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (!error && data?.session) {
        const userEmail = data.user.email || email
        const res = NextResponse.json({ message: 'Login admin berhasil' })
        res.cookies.set(ADMIN_COOKIE, adminSecret, {
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        })
        res.cookies.set(COOKIE_NAME, data.session.access_token, {
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        })
        res.cookies.set('admin_email', userEmail, {
          httpOnly: false,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        })
        return res
      }
    }

    return NextResponse.json({ message: 'Email atau password salah' }, { status: 401 })
  } catch (err) {
    return NextResponse.json({ message: 'Error: ' + err.message }, { status: 500 })
  }
}
