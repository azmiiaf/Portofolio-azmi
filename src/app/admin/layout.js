import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = { title: 'Admin Panel — Azmi' }

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" data-admin>
      <AdminSidebar />
      <main className="ml-48 min-h-screen">
        {children}
      </main>
    </div>
  )
}
