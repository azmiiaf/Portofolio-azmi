'use client'
import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { experience } from '../../data/content'
import SectionTitle from '../../components/ui/SectionTitle'
import TimelineItem from '../../components/cards/TimelineItem'

export default function Journey() {
  const root = useRef(null)

  // garis timeline "tergambar" mengikuti scroll
  useGSAP(() => {
    gsap.fromTo('.t-line', { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '.t-wrap', start: 'top 70%', end: 'bottom 70%', scrub: 1 },
    })
  }, { scope: root })

  return (
    <section id="perjalanan" ref={root} className="overflow-hidden bg-paper px-5 py-24 text-ink sm:px-6 md:py-40">
      <div className="mx-auto max-w-5xl">
        <SectionTitle>Perjalanan</SectionTitle>
        <div className="t-wrap relative mt-16 md:mt-24">
          <div className="absolute left-4 top-0 h-full w-px bg-ink/10 md:left-1/2" />
          <div className="t-line absolute left-4 top-0 h-full w-1 origin-top bg-violet md:left-1/2" />
          {experience.map((item, i) => <TimelineItem key={item.role} item={item} index={i} />)}
        </div>
      </div>
    </section>
  )
}
