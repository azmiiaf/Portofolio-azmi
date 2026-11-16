import TiltCard from '../../components/ui/TiltCard'
import SafeImage from '../../components/ui/SafeImage'

export default function CertCard({ cert }) {
  return (
    <TiltCard>
      <div data-hover className="h-full overflow-hidden rounded-3xl bg-ink text-paper">
        <SafeImage src={cert.image} alt={cert.title} className="aspect-[4/3] w-full" />
        <div className="p-6">
          <h3 className="text-xl font-bold leading-snug">{cert.title}</h3>
          <p className="mt-2 font-mono text-sm text-lime">{cert.subtitle}</p>
        </div>
      </div>
    </TiltCard>
  )
}
