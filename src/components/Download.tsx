import { useState } from 'react'
import { motion } from 'motion/react'
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

type DownloadVariant = 'primary' | 'secondary'

function Download({ downloads, preferredPlatform, version }: DownloadProps) {
  const { t } = useTranslation()

  const cards = [
    {
      key: 'macos',
      href: downloads.macos,
      glowClassName: 'bg-[radial-gradient(circle,rgba(103,232,249,0.34),rgba(129,140,248,0.2)_44%,transparent_76%)]',
    },
    {
      key: 'windows',
      href: downloads.windows,
      glowClassName: 'bg-[radial-gradient(circle,rgba(217,70,239,0.32),rgba(129,140,248,0.18)_46%,transparent_76%)]',
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
          <DownloadReleaseBadge label={t('download.latestRelease', { version })} />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {cards.map((card) => {
            const recommended = preferredPlatform === card.key

            return (
              <DownloadPlatformCard
                buttonLabel={t(`download.cards.${card.key}.button`)}
                description={t(`download.cards.${card.key}.description`)}
                glowClassName={card.glowClassName}
                href={card.href}
                key={card.key}
                meta={t(`download.cards.${card.key}.meta`)}
                recommended={recommended}
                recommendedLabel={t('download.recommended')}
                title={t(`download.cards.${card.key}.title`)}
                variant={recommended ? 'primary' : 'secondary'}
              />
            )
          })}
        </div>

        <motion.div
          className="group relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/4 p-6 sm:p-7"
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}>
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent opacity-80" />
          <div className="pointer-events-none absolute inset-x-10 bottom-0 h-16 rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.18),rgba(129,140,248,0.1)_46%,transparent_76%)] opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                {t('download.requirementsTitle')}
              </p>
              <div className="mt-4 flex flex-col gap-3 text-sm leading-7 text-white/68">
                <p>{t('download.requirements.macos')}</p>
                <p>{t('download.requirements.windows')}</p>
              </div>
            </div>

            <div className="relative w-full sm:w-auto">
              <div className="pointer-events-none absolute inset-x-5 -bottom-2 h-10 rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.22),rgba(129,140,248,0.14)_46%,transparent_76%)] opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" />
              <Button className="relative z-10" href={RELEASES_URL} variant="ghost">
                {t('download.showAll')}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </AnimatedSection>
  )
}

type DownloadReleaseBadgeProps = {
  label: string
}

function DownloadReleaseBadge({ label }: DownloadReleaseBadgeProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.div
      className="relative inline-flex"
      onHoverEnd={() => setIsHovering(false)}
      onHoverStart={() => setIsHovering(true)}>
      <motion.div
        aria-hidden="true"
        animate={{ opacity: isHovering ? 0.72 : 0.34, scale: isHovering ? 1.05 : 0.88 }}
        className="pointer-events-none absolute inset-x-6 bottom-0 h-8 rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.32),rgba(129,140,248,0.16)_46%,transparent_74%)] blur-2xl"
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        animate={{ y: isHovering ? -2 : 0, scale: isHovering ? 1.012 : 1 }}
        className="relative rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/72"
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isHovering ? 0.95 : 0.62, scaleX: isHovering ? 1 : 0.82 }}
          className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent"
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="relative z-10">{label}</span>
      </motion.div>
    </motion.div>
  )
}

type DownloadPlatformCardProps = {
  buttonLabel: string
  description: string
  glowClassName: string
  href: string
  meta: string
  recommended: boolean
  recommendedLabel: string
  title: string
  variant: DownloadVariant
}

function DownloadPlatformCard({
  buttonLabel,
  description,
  glowClassName,
  href,
  meta,
  recommended,
  recommendedLabel,
  title,
  variant,
}: DownloadPlatformCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const active = isHovering || recommended

  return (
    <motion.div
      className="relative"
      onHoverEnd={() => setIsHovering(false)}
      onHoverStart={() => setIsHovering(true)}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}>
      <motion.div
        aria-hidden="true"
        animate={{
          opacity: active ? 0.82 : 0.24,
          scale: active ? 1.05 : 0.9,
          y: active ? 2 : 10,
        }}
        className={cn('pointer-events-none absolute inset-x-10 bottom-3 h-16 rounded-full blur-2xl', glowClassName)}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      />
      <GlassCard
        className={cn(
          'group relative overflow-hidden p-6 sm:p-7',
          recommended && 'border-indigo-300/24 shadow-[0_24px_80px_rgba(99,102,241,0.28)]',
          isHovering && 'shadow-[0_28px_96px_rgba(3,8,18,0.44)]',
        )}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.16),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.12),transparent_26%)]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent opacity-80" />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">{meta}</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">{title}</h3>
            </div>

            {recommended ? (
              <motion.div
                animate={{ y: isHovering ? -1 : 0, scale: isHovering ? 1.02 : 1 }}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-300/24 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200"
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
                <BadgeCheck className="h-4 w-4" />
                {recommendedLabel}
              </motion.div>
            ) : null}
          </div>

          <motion.p
            className="mt-5 text-sm leading-7 text-white/66"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ x: 2 }}>
            {description}
          </motion.p>

          <div className="mt-8">
            <div className="relative w-full sm:w-auto">
              <motion.div
                aria-hidden="true"
                animate={{ opacity: active ? 0.9 : 0.26, scale: active ? 1.04 : 0.86, y: active ? 2 : 8 }}
                className={cn('pointer-events-none absolute inset-x-5 -bottom-2 h-11 rounded-full blur-2xl', glowClassName)}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              />
              <Button className="relative z-10 w-full sm:w-auto" href={href} variant={variant}>
                {buttonLabel}
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default Download
