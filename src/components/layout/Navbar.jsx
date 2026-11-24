// 'use client'
// import { useRef, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
// import { site, navLinks } from '../../data/content'
// import { anchorClick, scrollTo } from '../../lib/scroll'


// export default function Navbar() {
//   const bar = useRef(null)
//   const router = useRouter()
//   const [open, setOpen] = useState(false)
//   const [loading,setLoading] = useState(false)

//   // Sembunyi saat scroll turun, muncul lagi saat scroll naik
//   useGSAP(() => {
//     ScrollTrigger.create({
//       start: 0, end: 'max',
//       onUpdate: (self) => gsap.to(bar.current, {
//         yPercent: self.direction === 1 && self.scroll() > 200 ? -110 : 0,
//         duration: 0.4, ease: 'power3.out', overwrite: true,
//       }),
//     })
//   })

//   const logout = async () => {
//     try {
//       setLoading(true)
//     await fetch('/api/logout', { method: 'POST' })
//     router.replace('/login')
//     router.refresh()
    
      
//     } catch (err) {
//       throw new Error('Gagal Logout!', err.message);
//     }
//     finally {
//       setLoading(false)
//     }
//   }

//   const linkClick = (e) => { setOpen(false); anchorClick(e) }

//   return (
//     <header ref={bar} className="fixed left-0 top-0 z-50 w-full bg-ink/70 backdrop-blur-md">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 md:py-5">
//         <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo(0, 2) }} className="font-mono text-lg font-bold">{site.name}</a>

//         <nav className="hidden items-center gap-8 text-sm text-white/60 lg:flex">
//           {navLinks.map((l) => (
//             <a key={l.href} href={l.href} onClick={anchorClick} className="transition-colors hover:text-lime">{l.label}</a>
//           ))}
//           <button onClick={logout} className="rounded-full border border-white/30 px-4 py-1 text-paper transition-colors hover:border-lime hover:text-lime">Keluar</button>
//         </nav>

//         <button onClick={() => setOpen(!open)} className="px-2 py-2 font-mono text-sm lg:hidden">{open ? 'Tutup' : 'Menu'}</button>
//       </div>

//       {open && (
//         <nav className="flex max-h-[80svh] flex-col gap-4 overflow-y-auto border-t border-white/10 px-5 py-6 text-2xl sm:px-6 ">
//           {navLinks.map((l) => <a key={l.href} href={l.href} onClick={linkClick}>{l.label}</a>)}
//           <button onClick={logout} className="text-left text-lime rounded-full border border-white/30 px-4 py-1 transition-colors hover:border-lime">{ loading? "Memproses..." : "Keluar"}</button>
//         </nav>
//       )}
//     </header>
//   )
// }


'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { site, navLinks } from '../../data/content'
import { anchorClick, scrollTo } from '../../lib/scroll'

export default function Navbar() {
  const bar = useRef(null)
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Sembunyi saat scroll turun, muncul lagi saat scroll naik
  useGSAP(() => {
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => gsap.to(bar.current, {
        yPercent: self.direction === 1 && self.scroll() > 200 ? -110 : 0,
        duration: 0.4, ease: 'power3.out', overwrite: true,
      }),
    })
  })

  const logout = async () => {
    try {
      setLoading(true)
      
      // Kirim request logout ke backend
      await fetch('/api/logout', { method: 'POST' })
      
      // Tambahkan jeda tipis (misal 600ms) biar teks "Memproses..." sempat kelihatan
      await new Promise((resolve) => setTimeout(resolve, 600))

      router.replace('/login')
      router.refresh()
    } catch (err) {
      console.error('Gagal Logout!', err.message)
    } finally {
      setLoading(false)
    }
  }

  const linkClick = (e) => { setOpen(false); anchorClick(e) }

  return (
    <header ref={bar} className="fixed left-0 top-0 z-50 w-full bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 md:py-5">
        <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo(0, 2) }} className="font-mono text-lg font-bold">{site.name}</a>

        {/* Navigasi Desktop */}
        <nav className="hidden items-center gap-8 text-sm text-white/60 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={anchorClick} className="transition-colors hover:text-lime">{l.label}</a>
          ))}
          {/* <button 
            onClick={logout} 
            disabled={loading}
            className="rounded-full border border-white/30 px-4 py-1 text-paper transition-colors hover:border-lime hover:text-lime disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Keluar"}
          </button>*/}
        </nav>

        <button onClick={() => setOpen(!open)} className="px-2 py-2 font-mono text-sm lg:hidden">{open ? 'Tutup' : 'Menu'}</button>
      </div>

      {/* Navigasi Mobile */}
      {open && (
        <nav className="flex max-h-[80svh] flex-col gap-4 overflow-y-auto border-t border-white/10 px-5 py-6 text-2xl sm:px-6 lg:hidden">
          {navLinks.map((l) => <a key={l.href} href={l.href} onClick={linkClick}>{l.label}</a>)}
          <button 
            onClick={logout} 
            disabled={loading}
            className="text-left text-lime disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Keluar"}
          </button>
        </nav>
      )}
    </header>
  )
}