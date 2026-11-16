import Reveal from './Reveal'

export default function SectionTitle({ children, className = '' }) {
  return (
    <Reveal as="h2" type="clip" className={`text-[clamp(2.5rem,11vw,6.5rem)] font-bold leading-tight ${className}`}>
      {children}
    </Reveal>
  )
}
