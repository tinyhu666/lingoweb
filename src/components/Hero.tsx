import { useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, CheckCircle2, Download, Gamepad2, Globe2, Keyboard, Languages, MessageSquare, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import BrandLogo from '@/components/ui/BrandLogo'
import { cn } from '@/lib/cn'
import type { PlatformId } from '@/lib/platform'

type HeroProps = {
  downloads: {
    macos: string
    windows: string
  }
  preferredPlatform: PlatformId
  version: string
}

function Hero({ downloads, preferredPlatform, version }: HeroProps) {
  const { i18n, t } = useTranslation()
  const titleLines = getHeroTitleLines(t('hero.title'), i18n.resolvedLanguage)

  return (
    <section
      className="section-shell grid gap-10 pt-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12 lg:pt-8"
      id="top">
      <div className="max-w-[40rem]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0.24, y: 18 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
          <HeroReleaseBadge label={t('hero.badge', { version })} />

          <h1 className="section-title text-5xl sm:text-6xl lg:text-6xl">
            {titleLines.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="section-copy mt-6 max-w-[36rem]">{t('hero.subtitle')}</p>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 grid max-w-[36rem] gap-4 sm:grid-cols-2"
          initial={{ opacity: 0.18, y: 16 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
          <HeroDownloadAction
            caption={t('hero.macLabel')}
            detail={t('hero.macDetail')}
            href={downloads.macos}
            icon={<ArrowRight className="h-4 w-4" />}
            label={t('hero.downloadMac')}
            preferred={preferredPlatform === 'macos'}
            recommendedLabel={t('hero.recommended')}
          />

          <HeroDownloadAction
            caption={t('hero.windowsLabel')}
            detail={t('hero.windowsDetail')}
            href={downloads.windows}
            icon={<Download className="h-4 w-4" />}
            label={t('hero.downloadWindows')}
            preferred={preferredPlatform === 'windows'}
            recommendedLabel={t('hero.recommended')}
            variant="secondary"
          />
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-7 max-w-[38rem]"
          initial={{ opacity: 0.18, y: 14 }}
          transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}>
          <p className="max-w-[35rem] text-sm leading-6 text-slate-600">{t('hero.supportLine')}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <HeroQuickFact label={t('hero.quickFacts.release')} value={t('hero.quickFacts.releaseValue', { version })} />
            <HeroQuickFact label={t('hero.quickFacts.delivery')} value={t('hero.quickFacts.deliveryValue')} />
            <HeroQuickFact label={t('hero.quickFacts.requirements')} value={t('hero.quickFacts.requirementsValue')} />
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        initial={{ opacity: 0.28, y: 24, scale: 0.985 }}
        transition={{ duration: 0.75, delay: 0.12, type: 'spring', stiffness: 140, damping: 24 }}>
        <HeroShowcase />
      </motion.div>
    </section>
  )
}

type HeroReleaseBadgeProps = {
  label: string
}

function HeroReleaseBadge({ label }: HeroReleaseBadgeProps) {
  return (
    <Badge className="mb-6 border-cyan-300/40 bg-[#effcfc]/90 text-[#007f91] shadow-[0_10px_22px_rgba(0,141,160,0.08)]">
      <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]" />
      {label}
    </Badge>
  )
}

type HeroDownloadActionProps = {
  caption: string
  detail: string
  href: string
  icon: ReactNode
  label: string
  preferred?: boolean
  recommendedLabel: string
  variant?: 'primary' | 'secondary'
}

function HeroDownloadAction({
  caption,
  detail,
  href,
  icon,
  label,
  preferred = false,
  recommendedLabel,
  variant = 'primary',
}: HeroDownloadActionProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-1">
        <span className="min-w-0 flex-1 text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-slate-500 max-sm:basis-full max-sm:flex-none">
          {caption}
        </span>
        {preferred ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-[8px] border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[0.64rem] font-extrabold uppercase tracking-[0.08em] text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {recommendedLabel}
          </span>
        ) : null}
      </div>
      <motion.div
        className="relative w-full"
        onHoverEnd={() => setIsHovering(false)}
        onHoverStart={() => setIsHovering(true)}>
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isHovering || preferred ? 0.62 : 0.24, y: isHovering ? 2 : 8 }}
          className={cn(
            'pointer-events-none absolute inset-x-6 -bottom-2 h-10 rounded-[8px] blur-2xl',
            variant === 'primary' ? 'bg-blue-400/28' : 'bg-cyan-300/22',
          )}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          animate={{ y: isHovering ? -3 : 0 }}
          className="relative"
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
          <Button
            className={cn(
              'relative z-10 w-full justify-center',
              preferred && 'ring-2 ring-blue-300/70 ring-offset-2 ring-offset-[#eef4fb]',
            )}
            href={href}
            size="lg"
            variant={variant}>
            {label}
            {icon}
          </Button>
        </motion.div>
      </motion.div>
      <span className="px-1 text-xs leading-5 text-slate-500">{detail}</span>
    </div>
  )
}

function HeroShowcase() {
  const { t } = useTranslation()

  return (
    <GlassCard className="relative overflow-hidden p-3">
      <div className="client-grid-surface overflow-hidden rounded-[8px] border border-slate-200/80 bg-[#edf3fb] shadow-[0_26px_58px_rgba(15,23,42,0.09)]">
        <div className="flex h-14 items-center justify-between border-b border-slate-200/80 bg-white/80 px-3 sm:px-4">
          <BrandLogo className="h-10" />
          <div className="hidden items-center gap-2 text-xs font-bold text-slate-500 sm:flex">
            <span className="rounded-[8px] border border-slate-200 bg-white px-3 py-1.5">{t('hero.mockup.languages')}</span>
            <span className="rounded-[8px] border border-slate-200 bg-white px-3 py-1.5">{t('hero.mockup.hotkey')}</span>
          </div>
        </div>

        <div className="grid gap-3 p-3 md:grid-cols-[9.5rem_minmax(0,1fr)] md:p-4">
          <aside className="hidden rounded-[8px] border border-slate-200/80 bg-white/72 p-3 md:block">
            <BrandLogo className="mb-4 h-11" />
            <MockSidebarItem active icon={<MessageSquare className="h-4 w-4" />} label={t('hero.mockup.chatReady')} />
            <MockSidebarItem icon={<Languages className="h-4 w-4" />} label={t('hero.mockup.translateChip')} />
            <MockSidebarItem icon={<Keyboard className="h-4 w-4" />} label={t('hero.mockup.hotkey')} />
          </aside>

          <div className="min-w-0 space-y-3">
            <div className="grid gap-3 rounded-[8px] border border-slate-200/80 bg-white/86 p-4 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:p-5">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-[8px] border border-cyan-200 bg-[#effcfc] px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-[#007f91]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t('hero.mockup.eyebrow')}
                </div>
                <h2 className="mt-4 font-display text-4xl font-extrabold leading-none text-slate-950 sm:text-5xl">
                  {t('brand.name')}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">{t('hero.mockup.body')}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <MockChip icon={<Gamepad2 className="h-3.5 w-3.5" />} label={t('hero.mockup.translateChip')} />
                  <MockChip icon={<Globe2 className="h-3.5 w-3.5" />} label={t('hero.mockup.chatChip')} />
                </div>
              </div>

              <div className="client-grid-surface rounded-[8px] border border-slate-200 p-3">
                <div className="mb-3 text-xs font-extrabold text-slate-600">{t('hero.mockup.title')}</div>
                <div className="grid items-stretch gap-3">
                  <MockTextPanel label={t('hero.mockup.sourceLabel')} value={t('hero.mockup.source')} />
                  <div className="flex items-center justify-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-cyan-200 bg-[#effcfc] text-[#007f91]">
                      <ArrowRight className="h-4 w-4 rotate-90" />
                    </span>
                  </div>
                  <MockTextPanel featured label={t('hero.mockup.resultLabel')} value={t('hero.mockup.result')} />
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <MockMetric icon={<Languages className="h-4 w-4" />} label={t('hero.mockup.server')} value={t('hero.mockup.translateChip')} />
              <MockMetric icon={<Keyboard className="h-4 w-4" />} label={t('hero.mockup.statPrimaryLabel')} value={t('hero.mockup.statPrimaryValue')} />
              <MockMetric icon={<Gamepad2 className="h-4 w-4" />} label={t('hero.mockup.chatLabel')} value={t('hero.mockup.chatReady')} />
              <MockMetric icon={<Globe2 className="h-4 w-4" />} label={t('hero.mockup.statSecondaryLabel')} value={t('hero.mockup.statSecondaryValue')} />
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

function MockSidebarItem({ active = false, icon, label }: { active?: boolean; icon: ReactNode; label: string }) {
  return (
    <div
      className={cn(
        'mb-2 flex items-center gap-3 rounded-[8px] border px-3 py-3 text-sm font-bold',
        active ? 'border-cyan-300 bg-[#effcfc] text-slate-950' : 'border-slate-200 bg-white/66 text-slate-600',
      )}>
      <span className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-cyan-200 bg-[#effcfc] text-[#007f91]">
        {icon}
      </span>
      <span className="min-w-0 truncate">{label}</span>
    </div>
  )
}

function MockChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-600">
      <span className="text-[#007f91]">{icon}</span>
      {label}
    </span>
  )
}

function MockTextPanel({ featured = false, label, value }: { featured?: boolean; label: string; value: string }) {
  return (
    <div
      className={cn(
        'min-h-24 rounded-[8px] border p-4',
        featured ? 'border-cyan-300 bg-[#effcfc]' : 'border-slate-200 bg-white',
      )}>
      <div className="text-xs font-extrabold text-slate-500">{label}</div>
      <div className="mt-4 break-words font-display text-base font-extrabold leading-snug text-slate-950 sm:text-lg">{value}</div>
    </div>
  )
}

function MockMetric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-[8px] border border-slate-200/80 bg-white/82 p-4 shadow-[0_14px_28px_rgba(15,23,42,0.05)]">
      <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-cyan-200 bg-[#effcfc] text-[#007f91]">
        {icon}
      </div>
      <div className="mt-4 text-xs font-extrabold uppercase tracking-[0.1em] text-slate-500">{label}</div>
      <div className="mt-2 font-display text-base font-extrabold leading-snug text-slate-950 [word-break:keep-all]">{value}</div>
    </div>
  )
}

function HeroQuickFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[8px] border border-slate-200 bg-white/76 px-4 py-3 shadow-[0_12px_24px_rgba(15,23,42,0.05)]">
      <div className="text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-bold text-slate-900">{value}</div>
    </div>
  )
}

function getHeroTitleLines(title: string, language?: string) {
  if (language?.startsWith('zh') && title.length > 4) {
    const splitAt = Math.min(4, title.length)

    return [title.slice(0, splitAt), title.slice(splitAt)]
  }

  return [title]
}

export default Hero
