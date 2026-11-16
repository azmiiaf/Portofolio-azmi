'use client'
import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import Icon from './Icon'

// Teks berjalan terus. Arahnya ikut berbalik kalau user scroll ke atas.
export default function Marquee({ items, className = '' }) {
  const ref = useRef(null)

  useGSAP(() => {
    const loop = gsap.to('.m-track', { xPercent: -50, duration: 20, ease: 'none', repeat: -1 })
    ScrollTrigger.create({
      onUpdate: (self) => gsap.to(loop, { timeScale: self.direction, duration: 0.4, overwrite: true }),
    })
  }, { scope: ref })

  const group = [...items, ...items, ...items]
  return (
    <div ref={ref} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="m-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center gap-10 pr-10">
            {group.map((t, i) => (
              <span key={i} className="flex items-center gap-10">
                {t}
                <Icon name="star4" size="0.6em" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
