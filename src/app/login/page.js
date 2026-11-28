import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, COOKIE_NAME } from '@/lib/auth'
import LoginView from '../../components/auth/LoginView'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Login — Portofolio Azmi' }

export default function LoginPage() {
  const cookieStore = cookies()
  const adminSecret = (process.env.ADMIN_SECRET || 'admin-secret-change-me').trim()
  const adminToken = cookieStore.get(ADMIN_COOKIE)?.value?.trim()
  const userToken = cookieStore.get(COOKIE_NAME)?.value

  const isAuthenticated = (adminToken && adminToken === adminSecret) || (userToken && userToken.length > 10)

  // Jika sudah login, tolak akses /login dan redirect ke /admin
  if (isAuthenticated) {
    redirect('/admin')
  }

  return <LoginView />
}
