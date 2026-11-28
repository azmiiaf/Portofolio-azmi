'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from '../../lib/gsap'
import Input from '../../components/ui/Input'

export default function LoginForm() {
  const router = useRouter()
  const formRef = useRef(null)
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login gagal')

      // Berhasil login -> langsung arahkan ke panel admin
      router.replace('/admin')
      router.refresh()
    } catch (err) {
      setError(err.message)
      gsap.fromTo(formRef.current, { x: -14 }, { x: 0, duration: 0.7, ease: 'elastic.out(1,0.3)' }) 
    } finally {
      setLoading(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Email"
        name="username"
        type="email"
        value={form.username}
        onChange={handleChange}
        autoComplete="email"
        placeholder="nama@email.com"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        autoComplete="current-password"
        placeholder="••••••••"
        required
      />

      {error && <p className="font-mono text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-lime py-4 font-mono font-bold text-ink transition-transform hover:scale-[1.02] disabled:opacity-60 cursor-pointer"
      >
        {loading ? 'Memproses...' : 'Masuk ↗'}
      </button>
    </form>
  )
}
