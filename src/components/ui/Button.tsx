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
    'border border-indigo-300/35 bg-[linear-gradient(135deg,rgba(99,102,241,0.95),rgba(217,70,239,0.85))] text-white shadow-[0_18px_50px_rgba(99,102,241,0.36)] hover:border-indigo-200/50 hover:brightness-105',
  secondary:
    'border border-white/12 bg-white/8 text-white/90 hover:border-white/18 hover:bg-white/12',
  ghost:
    'border border-transparent bg-transparent text-white/70 hover:bg-white/8 hover:text-white',
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
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.02em] transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b17]',
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
