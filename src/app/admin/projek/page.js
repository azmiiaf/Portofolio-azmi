'use client'
import { AdminListPage } from '@/components/admin/AdminListPage'

const fields = [
  { name: 'title', label: 'Judul Projek', required: true, placeholder: 'TaskCo' },
  { name: 'type', label: 'Tipe', required: true, placeholder: 'Website' },
  { name: 'tags', label: 'Tags', type: 'array', placeholder: 'React, Tailwind CSS, Supabase' },
  { name: 'link', label: 'URL Projek', placeholder: 'https://...' },
  { name: 'year', label: 'Tahun', type: 'number', placeholder: '2026' },
  { name: 'image_url', label: 'URL Gambar', placeholder: '/images/project-1.png' },
]

function renderItem(item) {
  return (
    <div>
      <p className="text-sm font-medium text-white">{item.title}</p>
      <p className="text-xs text-lime mt-0.5">{item.type}</p>
      {item.tags?.length > 0 && (
        <p className="text-xs text-white/35 mt-0.5">{item.tags.join(', ')}</p>
      )}
    </div>
  )
}

export default function ProjekPage() {
  return <AdminListPage title="Projek" table="project" fields={fields} renderItem={renderItem} />
}
