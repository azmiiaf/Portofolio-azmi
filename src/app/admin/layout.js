import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, COOKIE_NAME } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Admin Panel — Azmi' }

export default function AdminLayout({ children }) {
  const cookieStore = cookies()
  const adminSecret = (process.env.ADMIN_SECRET || 'admin-secret-change-me').trim()
  const adminToken = cookieStore.get(ADMIN_COOKIE)?.value?.trim()
  const userToken = cookieStore.get(COOKIE_NAME)?.value

  const isAuthenticated = (adminToken && adminToken === adminSecret) || (userToken && userToken.length > 10)

  // Jika belum login, tolak akses area admin dan redirect ke /login
  if (!isAuthenticated) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" data-admin>
      <AdminSidebar />
      <main className="ml-48 min-h-screen">
        {children}
      </main>
    </div>
  )
}
