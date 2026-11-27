import Link from 'next/link'
import { LayoutDashboard, User, GraduationCap, Award, FolderOpen, Briefcase, Mail, Activity } from 'lucide-react'

const sections = [
  { label: 'Profil', desc: 'Nama, role, foto, keahlian', href: '/admin/profil', icon: User },
  { label: 'Pendidikan', desc: 'Riwayat pendidikan', href: '/admin/pendidikan', icon: GraduationCap },
  { label: 'Sertifikasi', desc: 'Lisensi & sertifikasi', href: '/admin/lisensi', icon: Award },
  { label: 'Projek', desc: 'Portfolio projek', href: '/admin/projek', icon: FolderOpen },
  { label: 'Experience', desc: 'Pengalaman kerja', href: '/admin/experience', icon: Briefcase },
  { label: 'Kontak', desc: 'Email, GitHub, LinkedIn', href: '/admin/kontak', icon: Mail },
  { label: 'Logs & Analitik', desc: 'Statistik & log pengunjung', href: '/admin/logs', icon: Activity },
]

export default function AdminDashboard() {
  return (
    <div className="p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">
          Dashboard<span className="text-lime">.</span>
        </h1>
        <p className="text-sm text-white/40 mt-1">Pilih bagian yang ingin dikelola.</p>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-3xl">
        {sections.map(({ label, desc, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="bg-[#141414] border border-white/[0.07] rounded-xl p-5 hover:border-white/20 hover:bg-[#1a1a1a] transition-all group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
          >
            <div className="flex items-start gap-3">
              <Icon size={16} className="text-white/40 mt-0.5 shrink-0 group-hover:text-white/60 transition-colors" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-white group-hover:text-lime transition-colors">{label}</p>
                <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
