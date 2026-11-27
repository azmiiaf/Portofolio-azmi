'use client'
import { useState, useEffect, useCallback } from 'react'
import { Plus, Pencil, Trash2, X, Check, Loader2 } from 'lucide-react'

function Modal({ title, onClose, children }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/[0.07]">
          <h2 id="modal-title" className="text-sm font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded" aria-label="Tutup modal"><X size={16} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

function FormField({ label, name, value, onChange, type = 'text', required, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs text-white/50 mb-1.5">
        {label}{required && <span className="text-lime ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value || ''}
        onChange={e => onChange(name, e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-lime transition-colors"
      />
    </div>
  )
}

// Generic list page (Pendidikan, Lisensi, Projek, Experience)
export function AdminListPage({ title, table, fields, renderItem }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modal, setModal] = useState(null) // null | { mode: 'add'|'edit', data: {} }
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({})

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/data?table=${table}`)
    const data = await res.json()
    if (res.ok) setItems(data)
    else setError(data.error || 'Gagal memuat data')
    setLoading(false)
  }, [table])

  useEffect(() => { load() }, [load])

  function openAdd() { setForm({}); setModal({ mode: 'add' }) }
  function openEdit(item) { setForm({ ...item }); setModal({ mode: 'edit', id: item.id }) }
  function closeModal() { setModal(null); setForm({}) }
  function updateField(key, val) { setForm(prev => ({ ...prev, [key]: val })) }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const method = modal.mode === 'add' ? 'POST' : 'PUT'
    const url = modal.mode === 'add'
      ? `/api/admin/data?table=${table}`
      : `/api/admin/data?table=${table}&id=${modal.id}`

    const payload = { ...form }
    // Convert numeric fields
    fields.filter(f => f.type === 'number').forEach(f => {
      if (payload[f.name]) payload[f.name] = parseInt(payload[f.name])
    })
    // Convert array fields
    fields.filter(f => f.type === 'array').forEach(f => {
      if (typeof payload[f.name] === 'string') {
        payload[f.name] = payload[f.name].split(',').map(s => s.trim()).filter(Boolean)
      }
    })

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()

    if (res.ok) { closeModal(); load() }
    else setError(data.error || 'Gagal menyimpan')
    setSaving(false)
  }

  async function handleDelete(id) {
    if (!confirm('Hapus item ini?')) return
    const res = await fetch(`/api/admin/data?table=${table}&id=${id}`, { method: 'DELETE' })
    if (res.ok) load()
    else setError('Gagal menghapus')
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-white">{title}<span className="text-lime">.</span></h1>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-lime text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-lime/90 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
        >
          <Plus size={14} aria-hidden="true" />
          Tambah
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mb-4" role="alert">{error}</p>}

      {loading ? (
        <div className="flex items-center gap-2 text-white/40 text-sm">
          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          Memuat data...
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-white/30 text-sm">Belum ada data. Tambah yang pertama.</div>
      ) : (
        <div className="space-y-2 max-w-2xl">
          {items.map(item => (
            <div key={item.id} className="bg-[#141414] border border-white/[0.07] rounded-xl px-5 py-4 flex items-center justify-between hover:border-white/15 transition-colors">
              <div className="flex-1 min-w-0 mr-4">{renderItem(item)}</div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => openEdit(item)}
                  className="p-2 text-white/30 hover:text-white/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
                  aria-label="Edit item"
                >
                  <Pencil size={14} aria-hidden="true" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-white/30 hover:text-red-400 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
                  aria-label="Hapus item"
                >
                  <Trash2 size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal.mode === 'add' ? `Tambah ${title}` : `Edit ${title}`} onClose={closeModal}>
          <form onSubmit={handleSave} className="space-y-4" noValidate>
            {fields.map(f => (
              f.type === 'textarea' ? (
                <div key={f.name}>
                  <label htmlFor={f.name} className="block text-xs text-white/50 mb-1.5">
                    {f.label}{f.required && <span className="text-lime ml-0.5">*</span>}
                  </label>
                  <textarea
                    id={f.name}
                    name={f.name}
                    value={form[f.name] || ''}
                    onChange={e => updateField(f.name, e.target.value)}
                    rows={3}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-lime transition-colors resize-none"
                    placeholder={f.placeholder}
                  />
                </div>
              ) : (
                <FormField
                  key={f.name}
                  label={f.label}
                  name={f.name}
                  value={form[f.name]}
                  onChange={updateField}
                  type={f.type === 'array' ? 'text' : (f.type || 'text')}
                  required={f.required}
                  placeholder={f.type === 'array' ? 'pisahkan dengan koma' : f.placeholder}
                />
              )
            ))}

            {error && <p className="text-red-400 text-xs" role="alert">{error}</p>}

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-lime text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-lime/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              >
                {saving ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : <Check size={14} aria-hidden="true" />}
                Simpan
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2.5 rounded-lg text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                Batal
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
