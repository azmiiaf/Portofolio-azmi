'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../../lib/gsap'

// Lenis = smooth scroll. Disambung ke GSAP supaya ScrollTrigger ikut halus.
export default function SmoothScroll() {
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true }) // cegah loncat saat address bar HP naik-turun
    const lenis = new Lenis({ lerp: 0.07 })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return null
}
