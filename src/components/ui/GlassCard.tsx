import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div className={cn('glass-panel rounded-[2rem]', className)} {...props}>
      {children}
    </div>
  )
}

export default GlassCard
