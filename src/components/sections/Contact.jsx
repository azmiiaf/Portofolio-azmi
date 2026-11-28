'use client'
import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePortfolio } from '../../context/PortfolioContext'
import { scrollTo } from '../../lib/scroll'
import SplitChars from '../../components/ui/SplitChars'
import Button from '../../components/ui/Button'
import Magnetic from '../../components/ui/Magnetic'
import Icon from '../../components/ui/Icon'

export default function Contact() {
  const { site } = usePortfolio()
  const root = useRef(null)

  useGSAP(() => {
    gsap.fromTo('.char', { yPercent: 110, rotate: 8 }, {
      yPercent: 0,
      rotate: 0,
      stagger: 0.03,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: root.current,
        start: 'top 60%',
        toggleActions: 'play reverse play reverse',
        invalidateOnRefresh: true,
      },
    })
    gsap.fromTo('.c-orb', { scale: 0.4 }, {
      scale: 1.3,
      ease: 'none',
      scrollTrigger: {
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
  }, { scope: root, dependencies: [site?.contactLines, site?.email], revertOnUpdate: true })

  return (
    <section id="kontak" ref={root} className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-violet px-5 pb-8 pt-28 sm:px-6 md:pt-40">
      <div className="c-orb pointer-events-none absolute -right-40 top-20 h-72 w-72 md:h-[40rem] md:w-[40rem] rounded-full bg-lime/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl">
        <h2 className="text-[16vw] font-bold leading-none sm:text-[13vw] md:text-[10vw]">
          <span className="block"><SplitChars text={site?.contactLines?.[0] || "Let's Build"} /></span>
          <span className="block text-lime"><SplitChars text={site?.contactLines?.[1] || 'Something'} /></span>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3 sm:gap-4 md:mt-16">
          <Button href={site?.email ? `mailto:${site.email}` : '#'}>{site?.email || 'm.azmialfadillah19@gmail.com'}</Button>
          <Button href={site?.whatsapp || '#'} variant="ghost" target="_blank" rel="noreferrer">WhatsApp ↗</Button>
        </div>
      </div>

      <footer className="relative mx-auto mt-16 flex md:mt-24 w-full max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-white/30 pt-6 font-mono text-sm">
        <div className="flex items-center gap-5">
          {(site?.socials || []).map((s) => (
            <Magnetic key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="block p-2 hover:text-lime">
                <Icon name={s.icon} />
              </a>
            </Magnetic>
          ))}
        </div>
        <p>{site?.location || 'Bekasi, Indonesia'}</p>
        <button onClick={() => scrollTo(0, 2)} className="hover:text-lime">Kembali ke atas ↑</button>
      </footer>
    </section>
  )
}
