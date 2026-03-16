import { ArrowUpRight, BadgeCheck, Download as DownloadIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import { RELEASES_URL } from '@/lib/constants'
import { cn } from '@/lib/cn'
import type { PlatformId } from '@/lib/platform'

type DownloadProps = {
  downloads: {
    macos: string
    windows: string
  }
  preferredPlatform: PlatformId
  version: string
}

function Download({ downloads, preferredPlatform, version }: DownloadProps) {
  const { t } = useTranslation()

  const cards = [
    {
      key: 'macos',
      href: downloads.macos,
    },
    {
      key: 'windows',
      href: downloads.windows,
    },
  ] as const

  return (
    <AnimatedSection>
      <section className="section-shell" id="download">
        <span className="section-eyebrow">{t('download.eyebrow')}</span>
        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="section-title max-w-2xl">{t('download.title')}</h2>
            <p className="mt-6 section-copy">{t('download.subtitle')}</p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/72">
            {t('download.latestRelease', { version })}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {cards.map((card) => {
            const recommended = preferredPlatform === card.key

            return (
              <GlassCard
                key={card.key}
                className={cn(
                  'relative overflow-hidden p-6 sm:p-7',
                  recommended && 'border-indigo-300/24 shadow-[0_24px_80px_rgba(99,102,241,0.28)]',
                )}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.16),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.12),transparent_26%)]" />
                <div className="relative">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                        {t(`download.cards.${card.key}.meta`)}
                      </p>
                      <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
                        {t(`download.cards.${card.key}.title`)}
                      </h3>
                    </div>

                    {recommended ? (
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/24 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                        <BadgeCheck className="h-4 w-4" />
                        {t('download.recommended')}
                      </div>
                    ) : null}
                  </div>

                  <p className="mt-5 text-sm leading-7 text-white/66">
                    {t(`download.cards.${card.key}.description`)}
                  </p>

                  <div className="mt-8">
                    <Button
                      className="w-full sm:w-auto"
                      href={card.href}
                      variant={recommended ? 'primary' : 'secondary'}>
                      {t(`download.cards.${card.key}.button`)}
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </GlassCard>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/4 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
              {t('download.requirementsTitle')}
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm leading-7 text-white/68">
              <p>{t('download.requirements.macos')}</p>
              <p>{t('download.requirements.windows')}</p>
            </div>
          </div>

          <Button href={RELEASES_URL} variant="ghost">
            {t('download.showAll')}
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </AnimatedSection>
  )
}

export default Download
