import TiltCard from '../../components/ui/TiltCard'
import SafeImage from '../../components/ui/SafeImage'
import { FileText, ExternalLink } from 'lucide-react'

export default function CertCard({ cert }) {
  const fileUrl = cert.image || cert.image_url || '/images/cert-1.png'
  const isPdf = typeof fileUrl === 'string' && fileUrl.toLowerCase().endsWith('.pdf')

  return (
    <TiltCard>
      <div data-hover className="h-full overflow-hidden rounded-3xl bg-ink text-paper flex flex-col justify-between">
        {isPdf ? (
          <div className="aspect-[4/3] w-full bg-[#161616] border-b border-white/10 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-violet/20 border border-violet/30 flex items-center justify-center text-violet mb-3">
              <FileText size={32} />
            </div>
            <p className="text-xs font-mono text-white/50 mb-2">Dokumen Sertifikat (PDF)</p>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-lime bg-lime/10 border border-lime/20 px-3 py-1.5 rounded-full hover:bg-lime/20 transition-colors"
            >
              Lihat Dokumen <ExternalLink size={12} />
            </a>
          </div>
        ) : (
          <SafeImage src={fileUrl} alt={cert.title} className="aspect-[4/3] w-full object-cover" />
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold leading-snug">{cert.title}</h3>
          <p className="mt-2 font-mono text-sm text-lime">{cert.subtitle}</p>
        </div>
      </div>
    </TiltCard>
  )
}
