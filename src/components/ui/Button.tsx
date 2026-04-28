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
    'border border-cyan-200/40 bg-[linear-gradient(135deg,#24d9ff_0%,#5d5cff_58%,#b742ff_100%)] text-white shadow-[0_18px_42px_rgba(36,217,255,0.24)] hover:border-cyan-100 hover:brightness-110',
  secondary:
    'border border-white/16 bg-white/8 text-cyan-50 shadow-[0_14px_34px_rgba(0,0,0,0.22)] backdrop-blur-xl hover:border-cyan-200/36 hover:bg-white/12',
  ghost:
    'border border-transparent bg-transparent text-cyan-50/70 hover:bg-white/8 hover:text-white',
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
    'inline-flex items-center justify-center gap-2 rounded-[8px] font-semibold transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030711] whitespace-nowrap',
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
