'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { usePortfolio } from '../../context/PortfolioContext'
import { anchorClick, scrollTo } from '../../lib/scroll'

const navLinks = [
  { label: 'Layanan', href: '#layanan' },
  { label: 'Perjalanan', href: '#perjalanan' },
  { label: 'Proyek', href: '#proyek' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Sertifikasi', href: '#sertifikasi' },
  { label: 'Kontak', href: '#kontak' },
]

export default function Navbar() {
  const { site } = usePortfolio()
  const bar = useRef(null)
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) =>
        gsap.to(bar.current, {
          yPercent: self.direction === 1 && self.scroll() > 200 ? -110 : 0,
          duration: 0.4,
          ease: 'power3.out',
          overwrite: true,
        }),
    })
  })

  const logout = async () => {
    try {
      setLoading(true)
      await fetch('/api/logout', { method: 'POST' })
      await new Promise((resolve) => setTimeout(resolve, 500))
      router.replace('/login')
      router.refresh()
    } catch (err) {
      console.error('Gagal logout', err)
    } finally {
      setLoading(false)
    }
  }

  const linkClick = (e) => {
    setOpen(false)
    anchorClick(e)
  }

  return (
    <header ref={bar} className="fixed left-0 top-0 z-50 w-full bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 md:py-5">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollTo(0, 2)
          }}
          className="font-mono text-lg font-bold"
        >
          {site?.name || 'M. Azmi Al Fadillah'}
        </a>

        <nav className="hidden items-center gap-8 text-sm text-white/60 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={anchorClick} className="transition-colors hover:text-lime">
              {l.label}
            </a>
          ))}
        </nav>

        <button onClick={() => setOpen(!open)} className="px-2 py-2 font-mono text-sm lg:hidden">
          {open ? 'Tutup' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav className="flex max-h-[80svh] flex-col gap-4 overflow-y-auto border-t border-white/10 px-5 py-6 text-2xl sm:px-6 lg:hidden">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={linkClick}>
              {l.label}
            </a>
          ))}
          <button
            onClick={logout}
            disabled={loading}
            className="text-left text-lime disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Keluar'}
          </button>
        </nav>
      )}
    </header>
  )
}
