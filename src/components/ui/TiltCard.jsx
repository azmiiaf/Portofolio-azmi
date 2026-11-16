'use client'
import { useRef } from 'react'
import { gsap } from '../../lib/gsap'

// Miring 3D mengikuti mouse
export default function TiltCard({ children, max = 14, className = '' }) {
  const ref = useRef(null)

  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    gsap.to(ref.current, { rotationY: x * max, rotationX: -y * max, transformPerspective: 900, duration: 0.5, ease: 'power3.out' })
  }
  const leave = () => gsap.to(ref.current, { rotationY: 0, rotationX: 0, duration: 1, ease: 'elastic.out(1,0.5)' })

  return <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={className}>{children}</div>
}
