import Chip from '../../components/ui/Chip'
import SafeImage from '../../components/ui/SafeImage'

export default function ProjectCard({ project, index, style }) {
  return (
    <article data-hover className={`p-card flex h-[calc(100svh-15rem)] max-h-[640px] min-h-[300px] w-[85vw] max-w-[640px] shrink-0 flex-col overflow-hidden rounded-3xl sm:w-[60vw] md:h-[calc(100svh-17rem)] lg:w-[38vw] ${style}`}>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <SafeImage src={project.image} alt={project.title} className="h-full w-full transition-transform duration-700 hover:scale-105" />
        <span className="absolute left-4 top-3 font-mono text-4xl font-bold text-white sm:text-5xl mix-blend-difference">0{index + 1}</span>
      </div>
      <div className="p-5 sm:p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold sm:text-2xl lg:text-3xl">{project.title}</h3>
          {project.year && <span className="font-mono text-sm">{project.year}</span>}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.tags.map((t) => <Chip key={t}>{t}</Chip>)}
          <a href={project.link} target={project.link === '#' ? undefined : '_blank'} onClick={(e) => project.link === '#' && e.preventDefault()} className="ml-auto font-mono text-sm font-bold underline hover:text-base duration-100">Lihat ↗</a>
        </div>
      </div>
    </article>
  )
}
