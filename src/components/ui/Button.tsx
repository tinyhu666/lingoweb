import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ButtonProps = {
  children: ReactNode
  className?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  download?: boolean
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel' | 'aria-label'> &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick' | 'disabled'>

function Button({
  children,
  className,
  disabled,
  download = false,
  href,
  onClick,
  rel,
  size = 'md',
  target,
  type = 'button',
  variant = 'primary',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cn(
    'btn',
    variant === 'primary' && 'btn--primary',
    variant === 'ghost' && 'btn--ghost',
    size === 'lg' && 'btn--lg',
    size === 'sm' && 'btn--sm',
    className,
  )

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto:')
    const opensNewTab = external && !download

    return (
      <a
        aria-label={ariaLabel}
        className={classes}
        href={href}
        onClick={onClick as AnchorHTMLAttributes<HTMLAnchorElement>['onClick']}
        rel={rel || (opensNewTab ? 'noreferrer' : undefined)}
        target={target || (opensNewTab ? '_blank' : undefined)}>
        {children}
      </a>
    )
  }

  return (
    <button aria-label={ariaLabel} className={classes} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

export default Button
