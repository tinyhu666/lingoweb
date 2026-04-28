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
        'inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/86 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.12em] text-slate-600 uppercase backdrop-blur-md',
        className,
      )}>
      {children}
    </span>
  )
}

export default Badge
