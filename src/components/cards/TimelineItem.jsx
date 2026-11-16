'use client'
import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import Reveal from '../../components/ui/Reveal'

export default function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const right = index % 2 === 1

  // titik di garis membesar saat masuk, mengecil saat balik
  useGSAP(() => {
    gsap.fromTo('.t-dot', { scale: 0 }, {
      scale: 1, duration: 0.6, ease: 'back.out(3)',
      scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play reverse play reverse' },
    })
  }, { scope: ref })

  return (
    <div ref={ref} className={`relative mb-14 pl-14 md:mb-20 md:w-1/2 md:pl-0 ${right ? 'md:ml-auto md:pl-14' : 'md:pr-14 md:text-right'}`}>
      {/* HP: dot di garis kiri. Desktop: dot di tengah garis */}
      <span className={`t-dot absolute left-2 top-2 h-5 w-5 rounded-full bg-lime ring-4 ring-ink ${right ? 'md:-left-[10px]' : 'md:left-auto md:-right-[10px]'}`} />
      <Reveal type={right ? 'right' : 'left'}>
        <p className="font-mono text-sm font-bold text-violet">{item.date}</p>
        <h3 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">{item.role}</h3>
        <p className="mt-1 text-lg font-medium">{item.org}</p>
        <p className="mt-3 text-ink/70">{item.description}</p>
      </Reveal>
    </div>
  )
}
