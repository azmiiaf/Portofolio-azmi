'use client'
import { usePortfolio } from '../../context/PortfolioContext'
import Marquee from '../../components/ui/Marquee'

// overflow-hidden di luar supaya strip yang miring tidak bikin halaman geser ke samping
export default function Motto() {
  const { site } = usePortfolio()
  return (
    <div className="overflow-hidden py-8 md:py-12">
      <div className="-rotate-2 scale-105 bg-lime py-4 text-ink md:py-6">
        <Marquee items={site?.motto || ['Belajar', 'Bangun', 'Rilis']} className="text-[12vw] font-bold leading-none md:text-[7vw]" />
      </div>
    </div>
  )
}
