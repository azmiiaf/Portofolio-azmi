'use client'
import { useRef, useMemo } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { usePortfolio } from '../../context/PortfolioContext'
import ProjectCard from '../../components/cards/ProjectCard'

const styles = [
  'bg-lime text-ink',
  'bg-violet text-paper',
  'bg-paper text-ink',
  'bg-[#1a1a1a] text-paper border border-white/15',
  'bg-lime text-ink',
]

export default function Projects() {
  const { projects: liveProjects, moreProjects: liveMore } = usePortfolio()
  const all = useMemo(() => [...(liveProjects || []), ...(liveMore || [])], [liveProjects, liveMore])
  const root = useRef(null)
  const track = useRef(null)

  const projectsKey = useMemo(
    () => all.map((p, i) => `${p.id || p.title || i}`).join('|'),
    [all]
  )

  useGSAP(
    () => {
      if (!track.current || !all.length) return

      const distance = () => track.current.scrollWidth - window.innerWidth
      const pin = {
        trigger: root.current,
        start: 'top top',
        end: () => '+=' + distance(),
        scrub: 1,
        invalidateOnRefresh: true,
      }

      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          ...pin,
          pin: true,
          anticipatePin: 1,
          onUpdate: (s) => gsap.set('.p-bar', { scaleX: s.progress }),
        },
      })

      const cards = gsap.utils.toArray('.p-card', root.current)
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { rotate: i % 2 === 0 ? -3 : 3 },
          {
            rotate: i % 2 === 0 ? 3 : -3,
            ease: 'none',
            scrollTrigger: pin,
          }
        )
      })

      ScrollTrigger.refresh()
    },
    { scope: root, dependencies: [projectsKey], revertOnUpdate: true }
  )

  return (
    <section id="proyek" ref={root} className="relative h-[100svh] overflow-hidden bg-ink">
      <div className="absolute left-0 top-20 z-10 w-full px-5 sm:top-24 sm:px-6 md:px-12">
        <h2 className="text-4xl font-bold sm:text-5xl md:text-7xl">Proyek</h2>
        <div className="mt-5 h-1 w-full bg-white/10">
          <div className="p-bar h-full origin-left scale-x-0 bg-lime" />
        </div>
      </div>
      <div ref={track} className="flex h-full w-max items-end gap-5 px-5 pb-8 sm:gap-8 sm:px-6 md:px-12 md:pb-12">
        {all.map((p, i) => (
          <ProjectCard key={p.id || p.title || i} project={p} index={i} style={styles[i % styles.length]} />
        ))}
      </div>
    </section>
  )
}
