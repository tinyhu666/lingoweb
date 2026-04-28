import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ButtonProps = {
  children: ReactNode
  className?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>

const variantClasses = {
  primary:
    'border border-blue-600 bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_54%,#1d4ed8_100%)] text-white shadow-[0_18px_34px_rgba(37,99,235,0.2)] hover:border-blue-500 hover:brightness-105',
  secondary:
    'border border-slate-200 bg-white/86 text-slate-800 shadow-[0_10px_22px_rgba(15,23,42,0.06)] hover:border-blue-200 hover:bg-white',
  ghost:
    'border border-transparent bg-transparent text-slate-600 hover:bg-blue-50 hover:text-slate-950',
} as const

const sizeClasses = {
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-13 px-6 text-sm sm:px-7',
} as const

function Button({
  children,
  className,
  href,
  onClick,
  rel,
  size = 'md',
  target,
  type = 'button',
  variant = 'primary',
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-[8px] font-semibold transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef4fb] whitespace-nowrap',
    sizeClasses[size],
    variantClasses[variant],
    className,
  )

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto:')

    return (
      <a
        className={classes}
        href={href}
        rel={rel || (external ? 'noreferrer' : undefined)}
        target={target || (external ? '_blank' : undefined)}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

export default Button
