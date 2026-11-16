'use client'
import { useRef } from 'react'
import { gsap } from '../../lib/gsap'

// Elemen "ketarik" ke arah mouse
export default function Magnetic({ children, strength = 0.4, className = '' }) {
  const ref = useRef(null)

  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    gsap.to(ref.current, {
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
      duration: 0.4, ease: 'power3.out',
    })
  }
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,0.4)' })

  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`inline-block ${className}`}>
      {children}
    </div>
  )
}
