'use client'
import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePortfolio } from '../../context/PortfolioContext'
import Reveal from '../../components/ui/Reveal'
import SafeImage from '../../components/ui/SafeImage'
import StatCard from '../../components/cards/StatCard'

export default function About() {
  const { site } = usePortfolio()
  const root = useRef(null)

  useGSAP(() => {
    if (!site?.about) return

    const scrub = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 }

    gsap.fromTo(
      '.w',
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: '.about-text', start: 'top 80%', end: 'bottom 50%', scrub: 1 },
      }
    )

    gsap.fromTo('.about-img', { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: scrub })
    gsap.to('.big-bg', { xPercent: -30, ease: 'none', scrollTrigger: scrub })
  }, { scope: root, dependencies: [site?.about], revertOnUpdate: true })

  return (
    <section id="tentang" ref={root} className="relative overflow-hidden bg-lime px-5 py-24 text-ink sm:px-6 md:py-40">
      <div className="big-bg outline-ink pointer-events-none absolute left-0 top-8 select-none whitespace-nowrap text-[22vw] font-bold opacity-20">
        TENTANG SAYA
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal type="clip" className="h-[380px] overflow-hidden rounded-3xl bg-ink sm:h-[460px] lg:h-[600px]">
          <SafeImage src={site?.aboutImage || '/images/about.png'} alt={site?.name || 'Foto'} className="about-img h-[120%] w-full text-paper" />
        </Reveal>

        <div>
          <p className="about-text text-xl font-medium leading-snug sm:text-2xl lg:text-4xl">
            {(site?.about || '').split(' ').map((w, i) => (
              <span key={i} className="w mr-[0.3em] inline-block">
                {w}
              </span>
            ))}
          </p>
          <Reveal stagger type="rotate" className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-12">
            {(site?.stats || []).map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
