'use client'
import { useState, useEffect } from 'react'
import { Loader2, Check } from 'lucide-react'

export default function KontakPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({})

  useEffect(() => {
    fetch('/api/admin/data?table=contact')
      .then(r => r.json())
      .then(d => {
        const item = Array.isArray(d) ? d[0] : d
        setData(item)
        setForm(item || {})
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  function update(key, val) { setForm(prev => ({ ...prev, [key]: val })) }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    const method = data?.id ? 'PUT' : 'POST'
    const url = data?.id
      ? `/api/admin/data?table=contact&id=${data.id}`
      : `/api/admin/data?table=contact`

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const saved = await res.json()

    if (res.ok) { setData(saved); setSuccess(true); setTimeout(() => setSuccess(false), 3000) }
    else setError(saved.error || 'Gagal menyimpan')
    setSaving(false)
  }

  if (loading) return (
    <div className="p-10 flex items-center gap-2 text-white/40 text-sm">
      <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Memuat kontak...
    </div>
  )

  const fields = [
    { key: 'email', label: 'Email', type: 'email', placeholder: 'm.azmialfadillah19@gmail.com' },
    { key: 'github_url', label: 'URL GitHub', type: 'url', placeholder: 'https://github.com/azmiiaf/' },
    { key: 'linkedin_url', label: 'URL LinkedIn', type: 'url', placeholder: 'https://www.linkedin.com/in/m-azmi-al-fadillah/' },
    { key: 'whatsapp', label: 'URL WhatsApp', type: 'url', placeholder: 'https://wa.me/6288...' },
  ]

  return (
    <div className="p-10 max-w-2xl">
      <h1 className="text-3xl font-semibold text-white mb-8">
        Kontak<span className="text-lime">.</span>
      </h1>

      <form onSubmit={handleSave} className="space-y-5" noValidate>
        {fields.map(({ key, label, type, placeholder }) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm text-white/60 mb-1.5">{label}</label>
            <input
              id={key}
              type={type}
              value={form[key] || ''}
              onChange={e => update(key, e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-lime transition-colors"
              placeholder={placeholder}
            />
          </div>
        ))}

        {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-lime text-black text-sm font-semibold px-5 py-3 rounded-lg hover:bg-lime/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
          >
            {saving ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : <Check size={14} aria-hidden="true" />}
            Simpan Kontak
          </button>
          {success && <span className="text-lime text-sm">Tersimpan.</span>}
        </div>
      </form>
    </div>
  )
}
