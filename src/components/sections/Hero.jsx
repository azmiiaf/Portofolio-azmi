'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { site } from '../../data/content'
import { useIntro } from '../../components/layout/Intro'
import SplitChars from '../../components/ui/SplitChars'
import Button from '../../components/ui/Button'
import TiltCard from '../../components/ui/TiltCard'
import SafeImage from '../../components/ui/SafeImage'
import FloatingShapes from '../../components/ui/FloatingShapes'

export default function Hero() {
  const ready = useIntro()
  const root = useRef(null)
  const intro = useRef(null)

  useGSAP(() => {
    // Animasi masuk (dijalankan setelah preloader selesai)
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } })
    tl.from('.h-tag', { y: 20, opacity: 0, duration: 0.6 })
      .from('.char', { yPercent: 120, rotate: 10, duration: 1, stagger: 0.03 }, '-=0.3')
      .from('.h-role', { y: 30, opacity: 0, duration: 0.7 }, '-=0.6')
      .from('.h-desc', { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
      .from('.h-btn', { scale: 0, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(2)' }, '-=0.4')
      .from('.h-card', { clipPath: 'inset(100% 0 0 0)', y: 80, duration: 1.3, ease: 'expo.out' }, 0.2)
      .from('.h-badge', { scale: 0, rotate: -20, duration: 0.8, ease: 'back.out(2)' }, 0.9)
      .from('.shape', { scale: 0, rotate: -180, opacity: 0, duration: 1.1, stagger: 0.15, ease: 'back.out(1.7)' }, 0.6)
    intro.current = tl

    // Keluar dari hero -> animasi mundur. Balik ke atas -> main lagi.
    ScrollTrigger.create({
      trigger: root.current, start: 'top top', end: 'bottom 40%',
      onLeave: () => tl.timeScale(2.5).reverse(),
      onEnterBack: () => tl.timeScale(1).play(),
    })

    // Parallax saat scroll
    const scrub = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to('.h-text', { yPercent: -25, opacity: 0.2, ease: 'none', scrollTrigger: scrub })
    gsap.to('.h-visual', { yPercent: 20, ease: 'none', scrollTrigger: scrub })
    gsap.to('.blob', { x: 40, y: -30, scale: 1.2, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }, { scope: root })

  useEffect(() => { if (ready) intro.current?.play() }, [ready])

  return (
    <section id="top" ref={root} className="relative min-h-[100svh] overflow-hidden px-5 pb-20 pt-28 sm:px-6 md:pt-36 lg:pt-40">
      <div className="blob pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full " />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="h-text relative z-10">
          <p className="h-tag mb-6 flex items-center gap-3 font-mono text-sm font-bold text-lime">
            {site.location}
          </p>
          <h1 className="text-[clamp(2.25rem,12vw,4rem)] font-bold leading-[0.95] md:text-[clamp(4rem,10vw,7rem)] lg:text-[clamp(3rem,6vw,5.5rem)] font-devanagri">
            {site.lines.map((line) => (
              <span key={line} className="block"><SplitChars text={line} /></span>
            ))}
          </h1>
          <p className="h-role mt-6 font-mono text-base text-lime sm:text-xl md:mt-8 md:text-2xl">{site.role}</p>
          <p className="h-desc mt-5 max-w-md text-base text-white/85 sm:text-lg">{site.statement}</p>
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
            <a href={ site.cv} target='_blank'><Button className="h-btn" variant="violet">Unduh CV ↓</Button></a>
            <Button className="h-btn" href="#proyek">Lihat Proyek ↓</Button>
          </div>
        </div>

        <div className="h-visual relative mx-auto aspect-[4/5] w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px]">
          <TiltCard className="h-full w-full">
            <div className="h-card h-full w-full overflow-hidden rounded-3xl border border-white/15 bg-[#111]">
              {/* <SafeImage src={site.heroImage} alt={site.name} className="h-full w-full" />*/}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className={`background-video h-full w-full object-cover`}
                onError={() => setFailed(true)}
              >
                <source src={site.heroImage} type="video/mp4" />
                Browser kamu tidak mendukung pemutaran video.
              </video>
            </div>
          </TiltCard>
          <div className="h-badge absolute -left-3 bottom-8 rounded-2xl bg-lime px-4 py-2 font-mono text-xs font-bold sm:-left-6 sm:bottom-10 sm:px-5 sm:py-3 sm:text-sm text-ink shadow-xl">
            {site.label.map((l) => <p key={l}>{l}</p>)}
          </div>
          <FloatingShapes />
        </div>
      </div>
    </section>
  )
}
