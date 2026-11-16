'use client'
import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'

export default function StatCard({ value, label }) {
  const ref = useRef(null)
  const num = useRef(null)

  useGSAP(() => {
    const counter = { v: 0 }
    const count = gsap.to(counter, {
      v: Number(value), duration: 1.8, ease: 'power3.out', paused: true,
      onUpdate: () => { num.current.textContent = Math.round(counter.v) },
    })
    ScrollTrigger.create({
      trigger: ref.current, start: 'top 90%',
      onEnter: () => count.restart(),
      onLeaveBack: () => { count.pause(0); num.current.textContent = 0 },
    })
  }, { scope: ref })

  return (
    <div ref={ref} data-hover className="rounded-3xl bg-ink p-6 text-paper sm:p-8 transition-transform duration-500 hover:-rotate-2 hover:scale-105">
      <p className="font-mono text-6xl font-bold text-lime sm:text-7xl"><span ref={num}>0</span>+</p>
      <p className="mt-2 text-lg">{label}</p>
    </div>
  )
}
