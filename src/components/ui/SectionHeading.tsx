import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  aside?: ReactNode
  className?: string
}

function SectionHeading({ eyebrow, title, subtitle, align = 'left', aside, className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between',
        className,
      )}>
      <div className={cn('flex flex-col gap-4', align === 'center' && 'items-center')}>
        <span className="section-eyebrow">{eyebrow}</span>
        <h2 className="section-title max-w-[22ch]">{title}</h2>
        {subtitle ? <p className={cn('section-copy', align === 'center' && 'mx-auto')}>{subtitle}</p> : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  )
}

export default SectionHeading
