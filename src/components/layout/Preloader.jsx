'use client'
import { useRef, useEffect } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePortfolio } from '../../context/PortfolioContext'

export default function Preloader({ isLoaded, onDone }) {
  const { site } = usePortfolio()
  const box = useRef(null)
  const num = useRef(null)
  const progressObj = useRef({ v: 0 })
  const tweenRef = useRef(null)
  const isFinished = useRef(false)

  useGSAP(() => {
    document.body.style.overflow = 'hidden'

    // Tahap 1: Animasikan angka dari 0 ke 85% sambil menunggu data
    tweenRef.current = gsap.to(progressObj.current, {
      v: 85,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => {
        if (num.current) {
          num.current.textContent = Math.round(progressObj.current.v)
        }
      },
    })
  }, { scope: box })

  // Ketika data Supabase sudah siap (isLoaded = true), selesaikan ke 100%
  useEffect(() => {
    if (!isLoaded || isFinished.current) return
    isFinished.current = true

    if (tweenRef.current) tweenRef.current.kill()

    gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onDone?.()
      },
    })
      .to(progressObj.current, {
        v: 100,
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (num.current) {
            num.current.textContent = Math.round(progressObj.current.v)
          }
        },
      })
      .to('.pre-inner', { y: -40, opacity: 0, duration: 0.35 })
      .to(box.current, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' })
  }, [isLoaded, onDone])

  return (
    <div ref={box} className="fixed inset-0 z-[150] flex items-end justify-between bg-lime p-6 text-ink md:p-12">
      <p className="pre-inner font-mono text-sm font-bold">{site?.name || 'M. Azmi Al Fadillah'}</p>
      <p className="pre-inner font-mono text-[22vw] font-bold leading-none">
        <span ref={num}>0</span>%
      </p>
    </div>
  )
}
