'use client'
import { usePortfolio } from '../../context/PortfolioContext'
import SectionTitle from '../../components/ui/SectionTitle'
import Reveal from '../../components/ui/Reveal'
import CertCard from '../../components/cards/CertCard'

export default function Certificates() {
  const { certificates } = usePortfolio()
  return (
    <section id="sertifikasi" className="bg-paper px-5 py-24 text-ink sm:px-6 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionTitle>Sertifikasi</SectionTitle>
        <Reveal stagger type="rotate" className="mt-12 grid gap-5 md:mt-16 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(certificates || []).map((c, i) => <CertCard key={c.id || c.title || i} cert={c} />)}
        </Reveal>
      </div>
    </section>
  )
}
