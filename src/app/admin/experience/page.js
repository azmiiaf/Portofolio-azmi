'use client'
import { AdminListPage } from '@/components/admin/AdminListPage'

const fields = [
  { name: 'title', label: 'Judul', required: true, placeholder: 'Lead Frontend Developer' },
  { name: 'org', label: 'Organisasi/Perusahaan', required: true, placeholder: 'Developer Student Club' },
  { name: 'type', label: 'Tipe', required: true, placeholder: 'Organisasi / Magang / Event UKM' },
  { name: 'year_start', label: 'Tahun Mulai', type: 'number', required: true, placeholder: '2025' },
  { name: 'year_end', label: 'Tahun Selesai', type: 'number', placeholder: '2026' },
  { name: 'description', label: 'Deskripsi', type: 'textarea', placeholder: 'Deskripsi singkat...' },
]

function renderItem(item) {
  return (
    <div>
      <p className="text-sm font-medium text-white">{item.title}</p>
      <p className="text-xs text-lime mt-0.5">{item.org}</p>
      <p className="text-xs text-white/35 mt-0.5">{item.year_start} &mdash; {item.year_end || 'Sekarang'}</p>
    </div>
  )
}

export default function ExperiencePage() {
  return <AdminListPage title="Experience" table="experience" fields={fields} renderItem={renderItem} />
}
