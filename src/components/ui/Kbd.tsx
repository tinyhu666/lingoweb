import { Fragment } from 'react'
import { cn } from '@/lib/cn'

type KbdProps = {
  keys: string[]
  size?: 'sm' | 'md' | 'lg'
  pressed?: number[]
  recording?: boolean
  className?: string
}

/** A row of keycaps separated by "+" glyphs, matching the client's Kbd component. */
function Kbd({ keys, size = 'md', pressed = [], recording = false, className }: KbdProps) {
  return (
    <span className={cn('lg-kbd-row', recording && 'lg-kbd-row--rec', className)}>
      {keys.map((key, index) => (
        <Fragment key={`${key}-${index}`}>
          {index > 0 ? (
            <span aria-hidden="true" className="lg-kbd-row__plus">
              +
            </span>
          ) : null}
          <kbd className={cn('lg-kbd', size === 'sm' && 'lg-kbd--sm', size === 'lg' && 'lg-kbd--lg', pressed.includes(index) && 'lg-kbd--press')}>
            {key}
          </kbd>
        </Fragment>
      ))}
    </span>
  )
}

export default Kbd
