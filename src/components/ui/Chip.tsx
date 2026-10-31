import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ChipProps = {
  children: ReactNode
  tone?: 'default' | 'ok' | 'warn' | 'sig' | 'acc' | 'danger'
  dot?: boolean
  hud?: boolean
  className?: string
}

function Chip({ children, tone = 'default', dot = false, hud = false, className }: ChipProps) {
  return (
    <span className={cn('lg-chip', tone !== 'default' && `lg-chip--${tone}`, hud && 'lg-chip--hud', className)}>
      {dot ? <span aria-hidden="true" className="lg-chip__dot" /> : null}
      {children}
    </span>
  )
}

export default Chip
