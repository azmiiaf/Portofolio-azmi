'use client'
import { AdminListPage } from '@/components/admin/AdminListPage'

const fields = [
  { name: 'school', label: 'Nama Sekolah/Universitas', required: true, placeholder: 'Universitas Bhayangkara Jakarta Raya' },
  { name: 'major', label: 'Jurusan/Program', required: true, placeholder: 'Informatika' },
  { name: 'year_start', label: 'Tahun Mulai', type: 'number', required: true, placeholder: '2022' },
  { name: 'year_end', label: 'Tahun Selesai', type: 'number', placeholder: '2026' },
]

function renderItem(item) {
  return (
    <div>
      <p className="text-sm font-medium text-white">{item.school}</p>
      <p className="text-xs text-lime mt-0.5">{item.major}</p>
      <p className="text-xs text-white/35 mt-0.5">{item.year_start} &mdash; {item.year_end || 'Sekarang'}</p>
    </div>
  )
}

export default function PendidikanPage() {
  return <AdminListPage title="Pendidikan" table="education" fields={fields} renderItem={renderItem} />
}
