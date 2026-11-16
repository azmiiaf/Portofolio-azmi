import { site, services } from '../../data/content'
import SectionTitle from '../../components/ui/SectionTitle'
import Reveal from '../../components/ui/Reveal'
import ServiceCard from '../../components/cards/ServiceCard'

export default function Services() {
  return (
    <section id="layanan" className="px-5 py-24 sm:px-6 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionTitle>Layanan</SectionTitle>
        <Reveal className="mt-6 max-w-2xl text-base text-white/70 sm:text-lg">{site.serviceDesc}</Reveal>
        <Reveal stagger type="rotate" className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} wide={i === services.length - 1 && services.length % 2 === 1} />)}
        </Reveal>
      </div>
    </section>
  )
}
