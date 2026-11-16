'use client'
import Magnetic from './Magnetic'
import { anchorClick } from '../../lib/scroll'

const styles = {
  lime: 'bg-lime text-ink',
  violet: 'bg-violet text-paper',
  ghost: 'border border-white/40 text-paper',
}

export default function Button({ href, onClick, variant = 'lime', className = '', children, ...rest }) {
  const cls = `block rounded-full px-6 py-3 text-center font-mono text-sm font-bold [overflow-wrap:anywhere] sm:px-8 sm:py-4 sm:text-base ${styles[variant]}`
  return (
    <Magnetic className={`max-w-full ${className}`}>
      {href ? (
        <a href={href} onClick={href.startsWith('#') ? anchorClick : onClick} className={cls} {...rest}>{children}</a>
      ) : (
        <button onClick={onClick} className={cls} {...rest}>{children}</button>
      )}
    </Magnetic>
  )
}
