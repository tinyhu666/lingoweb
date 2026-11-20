import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ChevronDown, Download, Store } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import DemoStage from '@/components/DemoStage'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import Kbd from '@/components/ui/Kbd'
import heroImage from '@/assets/backdrops/hero-heroes.jpg'
import heroImageSmall from '@/assets/backdrops/hero-heroes-sm.jpg'
import { MICROSOFT_STORE_URL } from '@/lib/constants'
import type { ReleaseInfo } from '@/lib/release'
import { getTranslationHotkey, type PlatformId } from '@/lib/platform'

type HeroProps = {
  release: ReleaseInfo
  preferredPlatform: PlatformId
}

function Hero({ release, preferredPlatform }: HeroProps) {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const hotkey = getTranslationHotkey(preferredPlatform)
  const primary: Exclude<PlatformId, 'unknown'> = preferredPlatform === 'macos' ? 'macos' : 'windows'
  const secondary: Exclude<PlatformId, 'unknown'> = primary === 'macos' ? 'windows' : 'macos'
  const detected = preferredPlatform !== 'unknown'

  const reveal = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: [0.2, 0.8, 0.2, 1] as const },
        }

  return (
    <section className="relative isolate overflow-hidden pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-36" id="top">
      <div className="hero-backdrop">
        <picture>
          <source media="(max-width: 639px)" srcSet={heroImageSmall} />
          <img alt="" decoding="async" fetchPriority="high" src={heroImage} />
        </picture>
      </div>

      <div className="page-shell flex flex-col items-center text-center">
        <motion.div {...reveal(0)}>
          <Chip dot hud tone="acc">
            {t('hero.eyebrow')}
          </Chip>
        </motion.div>

        <motion.h1 className="hero-title mt-6 max-w-[24ch]" {...reveal(0.08)}>
          {t('hero.title')}
        </motion.h1>

        <motion.p className="hero-copy mt-6 max-w-[40rem]" {...reveal(0.16)}>
          {t('hero.subtitleBefore')}
          <Kbd keys={hotkey} size="sm" />
          {t('hero.subtitleAfter')}
        </motion.p>

        <motion.div className="relative z-10 mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap" {...reveal(0.24)}>
          {[primary, secondary].map((platform) => {
            const variant = platform === primary ? 'primary' : 'secondary'
            const content = (
              <>
                <Download />
                {t(platform === 'windows' ? 'hero.downloadWindows' : 'hero.downloadMac')}
                {detected && platform === primary && (
                  <span className="rounded-full bg-white/18 px-2 py-0.5 font-hud text-[0.62rem] uppercase tracking-[0.1em]">
                    {t('hero.recommended')}
                  </span>
                )}
              </>
            )
            return platform === 'windows' ? (
              <WindowsDownload key={platform} href={release.downloads.windows} primary={variant === 'primary'}>
                {content}
              </WindowsDownload>
            ) : (
              <Button key={platform} download href={release.downloads.macos} size="lg" variant={variant}>
                {content}
              </Button>
            )
          })}
        </motion.div>

        <motion.p className="mt-4 text-sm text-ink-3" {...reveal(0.3)}>
          {t('hero.note')}
        </motion.p>

        <motion.div className="mt-12 w-full max-w-[56rem]" {...reveal(0.36)}>
          <DemoStage hotkeyKeys={hotkey} />
        </motion.div>

        <motion.div className="mt-4 grid w-full max-w-[56rem] grid-cols-2 gap-3 sm:grid-cols-4" {...reveal(0.46)}>
          <div className="fact">
            <span className="fact__label">{t('hero.facts.hotkey')}</span>
            <span className="fact__value">
              <Kbd keys={hotkey} size="sm" />
            </span>
          </div>
          <div className="fact">
            <span className="fact__label">{t('hero.facts.languages')}</span>
            <span className="fact__value">{t('hero.facts.languagesValue')}</span>
          </div>
          <div className="fact">
            <span className="fact__label">{t('hero.facts.games')}</span>
            <span className="fact__value">{t('hero.facts.gamesValue')}</span>
          </div>
          <div className="fact">
            <span className="fact__label">{t('hero.facts.platforms')}</span>
            <span className="fact__value">{t('hero.facts.platformsValue')}</span>
          </div>
        </motion.div>

        <a
          aria-hidden="true"
          className="mt-10 hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-3 transition hover:text-ink-0 lg:inline-flex"
          href="#features"
          tabIndex={-1}>
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}

function WindowsDownload({ children, href, primary }: {
  children: React.ReactNode
  href: string
  primary: boolean
}) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      const details = ref.current
      if (details?.open && event.target instanceof Node && !details.contains(event.target)) {
        details.open = false
      }
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [])

  const option = 'flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-ink-0 hover:bg-white/10 focus-visible:bg-white/10'
  return (
    <details ref={ref} className="group relative" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false
    }} onKeyDown={(event) => {
      if (event.key === 'Escape' && event.currentTarget.open) {
        event.currentTarget.open = false
        event.currentTarget.querySelector('summary')?.focus()
      }
    }}>
      <summary className={`btn btn--lg w-full cursor-pointer [&::-webkit-details-marker]:hidden ${primary ? 'btn--primary' : ''}`}>
        {children}
        <ChevronDown aria-hidden="true" className="transition-transform group-open:rotate-180" />
      </summary>
      <div className="absolute left-1/2 top-full mt-2 grid w-full min-w-max -translate-x-1/2 rounded-xl border border-white/15 bg-[#151924] p-1.5 shadow-xl" onClick={() => {
        if (ref.current) ref.current.open = false
      }}>
        <a className={option} href={MICROSOFT_STORE_URL} target="_blank" rel="noreferrer">
          <Store size={17} />{t('download.windows.store')}
        </a>
        <a className={option} href={href}>
          <Download size={17} />{t('download.windows.button')}
        </a>
      </div>
    </details>
  )
}

export default Hero
