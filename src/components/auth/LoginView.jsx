'use client'
import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import SplitChars from '../../components/ui/SplitChars'
import FloatingShapes from '../../components/ui/FloatingShapes'
import LoginForm from './LoginForm'

const landing = {
  lines: ['Portofolio', 'Azmi'],
  description:
    'Halaman portofolio ini hanya bisa dibuka setelah masuk. Silakan login untuk melihat proyek, perjalanan, dan sertifikasi saya.',
}

export default function LoginView() {
  const root = useRef(null)

  useGSAP(() => {
    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .from('.char', { yPercent: 120, rotate: 10, duration: 1, stagger: 0.03 })
      .from('.l-desc', { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
      .from('.l-card', { clipPath: 'inset(100% 0 0 0)', y: 60, duration: 1.2, ease: 'expo.out' }, 0.2)
      .from('.shape', { scale: 0, rotate: -180, opacity: 0, duration: 1, stagger: 0.15, ease: 'back.out(1.7)' }, 0.6)
    gsap.to('.blob', { x: 40, y: -30, scale: 1.2, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }, { scope: root })

  return (
    <main ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-20 sm:px-6">
      <div className="blob pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-[clamp(2.5rem,13vw,5rem)] font-bold leading-[0.95] lg:text-[clamp(3.5rem,6.5vw,6rem)]">
            <span className="block"><SplitChars text={landing.lines[0]} /></span>
            <span className="block text-lime"><SplitChars text={landing.lines[1]} /></span>
          </h1>
          <p className="l-desc mt-6 max-w-md text-base text-white/75 sm:mt-8 sm:text-lg">{landing.description}</p>
        </div>

        <div className="relative">
          <div className="l-card rounded-3xl border border-white/15 bg-[#111] p-6 sm:p-8 md:p-10">
            <h2 className="mb-8 font-mono text-2xl font-bold">Login</h2>
            <LoginForm />
          </div>
          <FloatingShapes />
        </div>
      </div>
    </main>
  )
}
