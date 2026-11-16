import { stack } from '../../data/content'
import SectionTitle from '../../components/ui/SectionTitle'
import Reveal from '../../components/ui/Reveal'
import ScrubRow from '../../components/ui/ScrubRow'
import Chip from '../../components/ui/Chip'

const hover = ['hover:bg-lime hover:text-ink', 'hover:bg-violet', 'hover:bg-paper hover:text-ink']

export default function Stack() {
  return (
    <section id="stack" className="overflow-hidden py-24 md:py-40">
      <SectionTitle className="px-6 text-center">Teknologi</SectionTitle>

      <div className="mt-12 space-y-4 md:mt-20">
        {stack.map((g, i) => <ScrubRow key={g.category} words={g.items} reverse={i % 2 === 1} variant={i} />)}
      </div>

      <Reveal stagger type="rotate" className="mx-auto mt-16 grid max-w-6xl gap-5 px-5 sm:px-6 md:mt-28 md:gap-6 lg:grid-cols-3">
        {stack.map((g, i) => (
          <div key={g.category} data-hover className={`rounded-3xl border border-white/10 p-6 sm:p-8 transition-all duration-500 hover:-translate-y-3 ${hover[i % 3]}`}>
            <h3 className="font-mono text-2xl font-bold">{g.category}</h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {g.items.map((name) => <Chip key={name}>{name}</Chip>)}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
