'use client'
import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

// Tiga bentuk yang melayang terus dan ikut gerak mouse. Taruh di dalam parent "relative".
export default function FloatingShapes() {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.to('.spin-a', { rotate: 360, duration: 14, repeat: -1, ease: 'none' })
    gsap.to('.spin-b', { y: -24, rotate: 15, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' })

    // di HP/tablet (tanpa mouse) efek ikut-mouse dimatikan
    if (!window.matchMedia('(hover: hover)').matches) return

    const move = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      gsap.to('[data-mouse]', { x: (i, t) => nx * 60 * t.dataset.mouse, y: (i, t) => ny * 60 * t.dataset.mouse, duration: 1, ease: 'power3.out' })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, { scope: ref })

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      <div data-mouse="1.5" className="absolute -bottom-4 -right-3 sm:-bottom-6 sm:-right-6">
        <div className="shape"><div className="spin-a h-14 w-14 rounded-2xl sm:h-20 sm:w-20 bg-lime" /></div>
      </div>
      <div data-mouse="-1.2" className="absolute -left-4 top-10 sm:-left-10">
        <div className="shape"><div className="spin-b h-11 w-11 rounded-full border-4 sm:h-16 sm:w-16 border-violet" /></div>
      </div>
      <div data-mouse="2" className="absolute -right-2 top-4 sm:-right-8">
        <div className="shape"><div className="spin-b h-8 w-8 rotate-45 bg-violet" /></div>
      </div>
    </div>
  )
}
