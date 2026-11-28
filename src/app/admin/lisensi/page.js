'use client'
import { AdminListPage } from '@/components/admin/AdminListPage'

const fields = [
  { name: 'title', label: 'Judul Sertifikasi', required: true, placeholder: 'Junior Web Developer' },
  { name: 'issuer', label: 'Penerbit', required: true, placeholder: 'BNSP' },
  { name: 'year_start', label: 'Tahun Terbit', type: 'number', required: true, placeholder: '2025' },
  { name: 'year_end', label: 'Tahun Kadaluarsa', type: 'number', placeholder: '2028' },
  {
    name: 'image_url',
    label: 'File Sertifikat (Gambar / PDF)',
    type: 'file',
    accept: 'image/*,.pdf,application/pdf',
    folder: 'certificates',
    placeholder: '/images/cert-1.png',
  },
]

function renderItem(item) {
  const isPdf = typeof item.image_url === 'string' && item.image_url.toLowerCase().endsWith('.pdf')

  return (
    <div className="flex items-center gap-3">
      {item.image_url && !isPdf && (
        <div className="w-10 h-10 rounded-lg bg-[#222] border border-white/10 overflow-hidden shrink-0">
          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
        </div>
      )}
      {item.image_url && isPdf && (
        <div className="w-10 h-10 rounded-lg bg-violet/20 border border-violet/30 flex items-center justify-center text-violet text-xs font-bold shrink-0">
          PDF
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-white">{item.title}</p>
        <p className="text-xs text-lime mt-0.5">{item.issuer}</p>
        <p className="text-xs text-white/35 mt-0.5">{item.year_start} &mdash; {item.year_end || 'Sekarang'}</p>
      </div>
    </div>
  )
}

export default function LisensiPage() {
  return <AdminListPage title="Lisensi & Sertifikasi" table="certification" fields={fields} renderItem={renderItem} />
}
