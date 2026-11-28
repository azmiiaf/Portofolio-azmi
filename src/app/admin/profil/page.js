'use client'
import { useState, useEffect, useRef } from 'react'
import { Loader2, Upload, X, Plus, Check, FileText, ExternalLink } from 'lucide-react'

const SKILLS_SUGGESTIONS = [
  'React JS', 'Next.js', 'Tailwind CSS', 'JavaScript', 'TypeScript',
  'HTML', 'CSS', 'Node JS', 'Express JS', 'PHP', 'Laravel', 'MySQL',
  'Supabase', 'Prisma', 'REST API', 'Git', 'GitHub', 'Figma', 'Flutter', 'Vite'
]

export default function ProfilPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [uploadingCv, setUploadingCv] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({})
  const [skillInput, setSkillInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef(null)
  const photoInputRef = useRef(null)
  const cvInputRef = useRef(null)

  useEffect(() => {
    fetch('/api/admin/data?table=profile')
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

  async function handlePhotoUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingPhoto(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'profile')
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const resData = await res.json()
      if (!res.ok) throw new Error(resData.error || 'Gagal mengupload foto profil')
      update('photo_url', resData.url)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploadingPhoto(false)
    }
  }

  async function handleCvUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingCv(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'cv')
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const resData = await res.json()
      if (!res.ok) throw new Error(resData.error || 'Gagal mengupload file CV')
      update('cv_url', resData.url)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploadingCv(false)
    }
  }

  function addSkill(skill) {
    const trimmed = skill.trim()
    if (!trimmed) return
    const existing = form.skills || []
    if (!existing.includes(trimmed)) {
      setForm(prev => ({ ...prev, skills: [...existing, trimmed] }))
    }
    setSkillInput('')
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  function removeSkill(skill) {
    setForm(prev => ({ ...prev, skills: (prev.skills || []).filter(s => s !== skill) }))
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    const method = data?.id ? 'PUT' : 'POST'
    const url = data?.id
      ? `/api/admin/data?table=profile&id=${data.id}`
      : `/api/admin/data?table=profile`

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const saved = await res.json()

    if (res.ok) {
      setData(saved)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } else {
      setError(saved.error || 'Gagal menyimpan profil')
    }
    setSaving(false)
  }

  const filteredSuggestions = SKILLS_SUGGESTIONS.filter(s =>
    s.toLowerCase().includes(skillInput.toLowerCase()) && !(form.skills || []).includes(s)
  )

  if (loading) return (
    <div className="p-10 flex items-center gap-2 text-white/40 text-sm">
      <Loader2 size={16} className="animate-spin" /> Memuat profil...
    </div>
  )

  return (
    <div className="p-10 max-w-2xl">
      <h1 className="text-3xl font-semibold text-white mb-8">
        Profil<span className="text-lime">.</span>
      </h1>

      <form onSubmit={handleSave} className="space-y-6" noValidate>
        {/* Foto Profil */}
        <div>
          <label className="block text-sm text-white/60 mb-2">Foto Profil</label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/30 text-xs overflow-hidden shrink-0">
              {form.photo_url ? (
                <img src={form.photo_url} alt="Foto profil" className="w-full h-full object-cover" />
              ) : (
                <span>Foto</span>
              )}
            </div>
            <div className="flex-1">
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={uploadingPhoto}
                  onClick={() => photoInputRef.current?.click()}
                  className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  {uploadingPhoto ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                  {uploadingPhoto ? 'Mengupload...' : 'Upload Foto'}
                </button>
                {form.photo_url && (
                  <button
                    type="button"
                    onClick={() => update('photo_url', '')}
                    className="text-xs text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Hapus
                  </button>
                )}
              </div>
              <input
                id="photo_url"
                type="text"
                value={form.photo_url || ''}
                onChange={e => update('photo_url', e.target.value)}
                className="mt-2 w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-lime transition-colors"
                placeholder="Atau masukkan URL foto (https://...)"
              />
            </div>
          </div>
        </div>

        {/* File CV */}
        <div>
          <label className="block text-sm text-white/60 mb-2">File CV (PDF)</label>
          <div className="flex items-center gap-4 bg-[#141414] border border-white/10 rounded-xl p-4">
            <div className="w-12 h-12 rounded-xl bg-violet/20 border border-violet/30 flex items-center justify-center text-violet shrink-0">
              <FileText size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <input
                ref={cvInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleCvUpload}
                className="hidden"
              />
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  disabled={uploadingCv}
                  onClick={() => cvInputRef.current?.click()}
                  className="flex items-center gap-2 text-sm bg-lime text-ink font-semibold px-4 py-2 rounded-lg hover:bg-lime/90 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {uploadingCv ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                  {uploadingCv ? 'Mengupload CV...' : 'Upload CV Baru'}
                </button>
                {form.cv_url && (
                  <>
                    <a
                      href={form.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-lime underline hover:text-lime/80 py-1"
                    >
                      Buka File CV <ExternalLink size={12} />
                    </a>
                    <button
                      type="button"
                      onClick={() => update('cv_url', '')}
                      className="text-xs text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      Hapus
                    </button>
                  </>
                )}
              </div>
              <input
                id="cv_url"
                type="text"
                value={form.cv_url || ''}
                onChange={e => update('cv_url', e.target.value)}
                className="mt-2 w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-lime transition-colors"
                placeholder="Atau URL CV: https://... / file path"
              />
            </div>
          </div>
        </div>

        {/* Nama */}
        <div>
          <label htmlFor="name" className="block text-sm text-white/60 mb-1.5">Nama <span className="text-lime">*</span></label>
          <input
            id="name" type="text" value={form.name || ''} onChange={e => update('name', e.target.value)}
            required
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-lime transition-colors"
            placeholder="M. Azmi Al Fadillah"
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm text-white/60 mb-1.5">Role <span className="text-lime">*</span></label>
          <input
            id="role" type="text" value={form.role || ''} onChange={e => update('role', e.target.value)}
            required
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-lime transition-colors"
            placeholder="Fullstack Developer | Frontend Developer"
          />
        </div>

        {/* Deskripsi Singkat */}
        <div>
          <label htmlFor="short_desc" className="block text-sm text-white/60 mb-1.5">Deskripsi Singkat</label>
          <textarea
            id="short_desc" value={form.short_desc || ''} onChange={e => update('short_desc', e.target.value)}
            rows={3}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-lime transition-colors resize-none"
            placeholder="Satu paragraf perkenalan singkat..."
          />
        </div>

        {/* Tentang Diri */}
        <div>
          <label htmlFor="about" className="block text-sm text-white/60 mb-1.5">Tentang Diri</label>
          <textarea
            id="about" value={form.about || ''} onChange={e => update('about', e.target.value)}
            rows={6}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-lime transition-colors resize-none"
            placeholder="Ceritakan lebih lengkap tentang dirimu..."
          />
        </div>

        {/* Keahlian */}
        <div>
          <label className="block text-sm text-white/60 mb-1.5">Keahlian</label>
          <div className="relative">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={skillInput}
                onChange={e => { setSkillInput(e.target.value); setShowSuggestions(true) }}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(skillInput) } }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-lime transition-colors"
                placeholder="Pilih dari dropdown atau ketik keahlian baru..."
              />
              <button
                type="button"
                onClick={() => addSkill(skillInput)}
                className="px-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-white/50 hover:text-white transition-colors cursor-pointer"
                aria-label="Tambah keahlian"
              >
                <Plus size={16} />
              </button>
            </div>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden z-10 shadow-xl">
                {filteredSuggestions.slice(0, 6).map(s => (
                  <li key={s}>
                    <button
                      type="button"
                      onMouseDown={() => addSkill(s)}
                      className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {(form.skills || []).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {(form.skills || []).map(skill => (
                <span key={skill} className="flex items-center gap-1.5 bg-[#1a1a1a] border border-white/10 px-3 py-1 rounded-md text-xs text-white/70">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-white/30 hover:text-white/70 transition-colors cursor-pointer"
                    aria-label={`Hapus keahlian ${skill}`}
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-lime text-black text-sm font-semibold px-5 py-3 rounded-lg hover:bg-lime/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            Simpan Profil
          </button>
          {success && <span className="text-lime text-sm">Tersimpan.</span>}
        </div>
      </form>
    </div>
  )
}
