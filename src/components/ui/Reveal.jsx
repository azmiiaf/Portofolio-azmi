'use client'
import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

// Keadaan awal & akhir tiap jenis animasi
const FROM = {
  up: { y: 70, opacity: 0 },
  left: { x: -100, opacity: 0 },
  right: { x: 100, opacity: 0 },
  scale: { scale: 0.7, opacity: 0 },
  clip: { clipPath: 'inset(0 0 100% 0)', y: 40 },
  rotate: { y: 80, rotate: 6, opacity: 0 },
}
const TO = {
  up: { y: 0, opacity: 1 },
  left: { x: 0, opacity: 1 },
  right: { x: 0, opacity: 1 },
  scale: { scale: 1, opacity: 1 },
  clip: { clipPath: 'inset(0 0 0% 0)', y: 0 },
  rotate: { y: 0, rotate: 0, opacity: 1 },
}

// Bungkus apa saja. Masuk saat scroll turun, balik lagi saat scroll naik.
// stagger = true -> anak-anaknya muncul satu per satu.
export default function Reveal({ children, type = 'up', stagger = false, as: Tag = 'div', className = '' }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.fromTo(stagger ? ref.current.children : ref.current, FROM[type], {
      ...TO[type],
      duration: 1,
      ease: 'power4.out',
      stagger: stagger ? 0.1 : 0,
      scrollTrigger: { trigger: ref.current, start: 'top 88%', toggleActions: 'play reverse play reverse' },
    })
  }, { scope: ref })

  return <Tag ref={ref} className={className}>{children}</Tag>
}
