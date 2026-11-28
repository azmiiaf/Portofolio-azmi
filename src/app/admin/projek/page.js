'use client'
import { AdminListPage } from '@/components/admin/AdminListPage'

const fields = [
  { name: 'title', label: 'Judul Projek', required: true, placeholder: 'TaskCo' },
  { name: 'type', label: 'Tipe', required: true, placeholder: 'Website' },
  { name: 'tags', label: 'Tags', type: 'array', placeholder: 'React, Tailwind CSS, Supabase' },
  { name: 'link', label: 'URL Projek', placeholder: 'https://...' },
  { name: 'year', label: 'Tahun', type: 'number', placeholder: '2026' },
  {
    name: 'image_url',
    label: 'Gambar Projek',
    type: 'file',
    accept: 'image/*',
    folder: 'projects',
    placeholder: '/images/project-1.png',
  },
]

function renderItem(item) {
  return (
    <div className="flex items-center gap-3">
      {item.image_url && (
        <div className="w-10 h-10 rounded-lg bg-[#222] border border-white/10 overflow-hidden shrink-0">
          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-white">{item.title}</p>
        <p className="text-xs text-lime mt-0.5">{item.type} {item.year ? `• ${item.year}` : ''}</p>
        {item.tags?.length > 0 && (
          <p className="text-xs text-white/35 mt-0.5">{item.tags.join(', ')}</p>
        )}
      </div>
    </div>
  )
}

export default function ProjekPage() {
  return <AdminListPage title="Projek" table="project" fields={fields} renderItem={renderItem} />
}
