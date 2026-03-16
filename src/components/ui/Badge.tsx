import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BadgeProps = {
  children: ReactNode
  className?: string
}

function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.14em] text-white/80 uppercase backdrop-blur-md',
        className,
      )}>
      {children}
    </span>
  )
}

export default Badge
