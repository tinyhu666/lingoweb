import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import DemoStage from '@/components/DemoStage'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import Kbd from '@/components/ui/Kbd'
import heroImage from '@/assets/backdrops/hero-heroes.jpg'
import heroImageSmall from '@/assets/backdrops/hero-heroes-sm.jpg'
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

        <motion.div className="mt-8 flex w-full max-w-[32rem] flex-col gap-3 sm:w-auto sm:flex-row" {...reveal(0.24)}>
          <HeroDownload
            href={primary === 'windows' ? release.downloads.windows : release.downloads.macos}
            label={primary === 'windows' ? t('hero.downloadWindows') : t('hero.downloadMac')}
            recommended={detected ? t('hero.recommended') : null}
            variant="primary"
          />
          <HeroDownload
            href={secondary === 'windows' ? release.downloads.windows : release.downloads.macos}
            label={secondary === 'windows' ? t('hero.downloadWindows') : t('hero.downloadMac')}
            variant="secondary"
          />
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

function HeroDownload({
  href,
  label,
  recommended = null,
  variant,
}: {
  href: string
  label: string
  recommended?: string | null
  variant: 'primary' | 'secondary'
}) {
  return (
    <Button className="w-full sm:w-auto" download href={href} size="lg" variant={variant}>
      <Download />
      {label}
      {recommended ? (
        <span className="ml-1 rounded-full bg-white/18 px-2 py-0.5 font-hud text-[0.62rem] uppercase tracking-[0.1em]">{recommended}</span>
      ) : null}
    </Button>
  )
}

export default Hero
