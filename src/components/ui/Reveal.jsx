'use client'
import React, { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

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

export default function Reveal({ children, type = 'up', stagger = false, as: Tag = 'div', className = '' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const targets = stagger ? Array.from(ref.current.children) : ref.current
      if (stagger && (!targets || targets.length === 0)) return

      gsap.fromTo(targets, FROM[type], {
        ...TO[type],
        duration: 0.9,
        ease: 'power3.out',
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
          invalidateOnRefresh: true,
        },
      })
    },
    {
      scope: ref,
      dependencies: [children, stagger, type],
      revertOnUpdate: true,
    }
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
