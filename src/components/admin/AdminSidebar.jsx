'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, User, GraduationCap, Award, FolderOpen,
  Briefcase, Mail, Activity, LogOut, ExternalLink
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Profil', href: '/admin/profil', icon: User },
  { label: 'Pendidikan', href: '/admin/pendidikan', icon: GraduationCap },
  { label: 'Lisensi & Sertifikasi', href: '/admin/lisensi', icon: Award },
  { label: 'Projek', href: '/admin/projek', icon: FolderOpen },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Kontak', href: '/admin/kontak', icon: Mail },
  { label: 'Logs', href: '/admin/logs', icon: Activity },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-48 bg-[#111111] border-r border-white/[0.06] flex flex-col z-40">
      {/* Brand */}
      <div className="px-5 pt-6 pb-4">
        <span className="text-[10px] font-mono tracking-widest uppercase text-white/30">Admin Panel</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5" role="navigation" aria-label="Admin navigation">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime ${
                isActive
                  ? 'bg-lime/10 text-lime font-medium'
                  : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={15} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 border-t border-white/[0.06] pt-4 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-sm bg-lime text-black font-semibold hover:bg-lime/90 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
        >
          <ExternalLink size={14} aria-hidden="true" />
          Panel Portofolio
        </Link>
        <div className="px-3 pt-3 pb-1">
          <p className="text-[11px] text-white/25 truncate">azmigithub@gmail.com</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <LogOut size={14} aria-hidden="true" />
          Keluar
        </button>
      </div>
    </aside>
  )
}
