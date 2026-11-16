'use client'
import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

// Baris teks raksasa yang geser mengikuti scroll (dua arah)
export default function ScrubRow({ words, reverse = false, variant = 0 }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.fromTo(ref.current, { xPercent: reverse ? -35 : 0 }, {
      xPercent: reverse ? 0 : -35, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
    })
  }, { scope: ref })

  const outline = variant % 2 ? 'outline-lime' : 'outline-text'
  const solid = variant % 2 ? 'text-violet' : 'text-lime'

  return (
    <div ref={ref} className="flex w-max gap-10 whitespace-nowrap text-[14vw] font-bold leading-none md:text-[8vw]">
      {[...words, ...words, ...words].map((w, i) => (
        <span key={i} className={i % 2 ? solid : outline}>{w}</span>
      ))}
    </div>
  )
}
