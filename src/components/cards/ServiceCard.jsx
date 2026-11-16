import Icon from '../../components/ui/Icon'

const colors = ['hover:bg-lime hover:text-ink', 'hover:bg-violet', 'hover:bg-paper hover:text-ink']

export default function ServiceCard({ service, index, wide = false }) {
  return (
    <div data-hover className={`group rounded-3xl border border-white/15 p-6 transition-all duration-500 hover:-translate-y-3 sm:p-8 ${wide ? 'md:col-span-2 lg:col-span-1' : ''} ${colors[index % 3]}`}>
      <Icon name={service.icon} size={48} className="transition-transform duration-700 group-hover:rotate-[270deg]" />
      <h3 className="mt-6 text-2xl font-bold sm:mt-8 sm:text-3xl">{service.title}</h3>
      <p className="mt-3 opacity-75">{service.description}</p>
      <ul className="mt-6 space-y-2 font-mono text-sm">
        {service.items.map((item) => <li key={item}>+ {item}</li>)}
      </ul>
    </div>
  )
}
