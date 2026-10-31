import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'

type LingoMarkProps = {
  className?: string
  /** Render the rounded dark tile behind the mark, like the app icon. */
  tile?: boolean
}

/**
 * The Lingo 1.0 mark: a game controller with two chat bubbles and translation
 * arrows, drawn flat in the azure brand gradient. Inlined so it scales crisply
 * and can be reused at any size without shipping a bitmap.
 */
export function LingoMark({ className, tile = true }: LingoMarkProps) {
  const id = useId()
  const gradientId = `lingo-grad-${id}`
  const tintId = `lingo-tint-${id}`
  const clipId = `lingo-clip-${id}`

  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id={gradientId} x1="207" x2="817" y1="330" y2="720">
          <stop offset="0" stopColor="#4da3ff" />
          <stop offset="1" stopColor="#2b6bff" />
        </linearGradient>
        <linearGradient id={tintId} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#4da3ff" />
          <stop offset="1" stopColor="#2b6bff" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect height="1024" rx="230" width="1024" />
        </clipPath>
      </defs>
      {tile ? (
        <g clipPath={`url(#${clipId})`}>
          <rect fill="#0b0d14" height="1024" width="1024" />
          <rect fill={`url(#${tintId})`} height="1024" opacity="0.16" width="1024" />
        </g>
      ) : null}
      <g transform={tile ? 'translate(32 32) scale(0.9375)' : undefined}>
        <g transform="translate(512 512) scale(1.32) translate(-512 -512)">
          <g fill={`url(#${gradientId})`}>
            <rect height="255" rx="118" width="610" x="207" y="350" />
            <rect height="235" rx="66" transform="translate(684 513.5) rotate(-3)" width="152" x="-76" y="-65" />
            <rect height="235" rx="66" transform="translate(340 513.5) rotate(3)" width="152" x="-76" y="-65" />
          </g>
          <g transform="translate(512 466) scale(1.22) translate(-512 -466)">
            <g fill="#ffffff">
              <path d="M322 420h74a20 20 0 0 1 20 20v30a20 20 0 0 1-20 20h-32l-28 24 6-24h-20a20 20 0 0 1-20-20v-30a20 20 0 0 1 20-20z" />
              <path d="M628 416h74a20 20 0 0 1 20 20v30a20 20 0 0 1-20 20h-20l6 24-28-24h-32a20 20 0 0 1-20-20v-30a20 20 0 0 1 20-20z" />
            </g>
            <g fill="#2b6bff">
              <circle cx="339" cy="455" r="7" />
              <circle cx="359" cy="455" r="7" />
              <circle cx="379" cy="455" r="7" />
              <circle cx="645" cy="451" r="7" />
              <circle cx="665" cy="451" r="7" />
              <circle cx="685" cy="451" r="7" />
            </g>
            <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16">
              <path d="M462 452h100M536 428l26 24-26 24" />
              <path d="M562 500H462M488 476l-26 24 26 24" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

type BrandLogoProps = {
  className?: string
  markClassName?: string
  wordmark?: boolean
  version?: string
}

function BrandLogo({ className, markClassName, wordmark = true, version }: BrandLogoProps) {
  const { t } = useTranslation()

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)} role="img" aria-label={t('brand.logoAlt')}>
      <LingoMark className={cn('h-8 w-8 rounded-[7px] shadow-[0_6px_16px_-6px_rgba(47,111,255,0.7)]', markClassName)} />
      {wordmark ? (
        <span className="text-[1.15rem] font-extrabold tracking-[-0.03em] text-ink-0">{t('brand.name')}</span>
      ) : null}
      {version ? <span className="font-hud text-[0.7rem] tracking-[0.06em] text-ink-3">v{version}</span> : null}
    </span>
  )
}

export default BrandLogo
