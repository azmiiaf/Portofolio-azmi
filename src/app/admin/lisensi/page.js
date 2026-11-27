'use client'
import { AdminListPage } from '@/components/admin/AdminListPage'

const fields = [
  { name: 'title', label: 'Judul Sertifikasi', required: true, placeholder: 'Junior Web Developer' },
  { name: 'issuer', label: 'Penerbit', required: true, placeholder: 'BNSP' },
  { name: 'year_start', label: 'Tahun Terbit', type: 'number', required: true, placeholder: '2025' },
  { name: 'year_end', label: 'Tahun Kadaluarsa', type: 'number', placeholder: '2028' },
]

function renderItem(item) {
  return (
    <div>
      <p className="text-sm font-medium text-white">{item.title}</p>
      <p className="text-xs text-lime mt-0.5">{item.issuer}</p>
      <p className="text-xs text-white/35 mt-0.5">{item.year_start} &mdash; {item.year_end || 'Sekarang'}</p>
    </div>
  )
}

export default function LisensiPage() {
  return <AdminListPage title="Lisensi & Sertifikasi" table="certification" fields={fields} renderItem={renderItem} />
}
