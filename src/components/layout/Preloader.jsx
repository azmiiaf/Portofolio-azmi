'use client'
import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { site } from '../../data/content'

export default function Preloader({ onDone }) {
  const box = useRef(null)
  const num = useRef(null)

  useGSAP(() => {
    document.body.style.overflow = 'hidden'
    const counter = { v: 0 }
    gsap.timeline({ onComplete: () => { document.body.style.overflow = ''; onDone() } })
      .to(counter, { v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => { num.current.textContent = Math.round(counter.v) } })
      .to('.pre-inner', { y: -40, opacity: 0, duration: 0.4 })
      .to(box.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' })
  }, { scope: box })

  return (
    <div ref={box} className="fixed inset-0 z-[150] flex items-end justify-between bg-lime p-6 text-ink md:p-12">
      <p className="pre-inner font-mono text-sm font-bold">{site.name}</p>
      <p className="pre-inner font-mono text-[22vw] font-bold leading-none"><span ref={num}>0</span>%</p>
    </div>
  )
}
