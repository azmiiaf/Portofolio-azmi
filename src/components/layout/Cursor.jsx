'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.1 })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.1 })
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })

    const move = (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY) }
    const over = (e) => {
      const hit = e.target.closest('a,button,input,[data-hover]')
      gsap.to(ring.current, { scale: hit ? 2.2 : 1, backgroundColor: hit ? 'rgba(182,245,0,.25)' : 'rgba(182,245,0,0)', duration: 0.3 })
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [])

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[200] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div ref={dot} className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-lime" />
      <div ref={ring} className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-lime" />
    </div>
  )
}
