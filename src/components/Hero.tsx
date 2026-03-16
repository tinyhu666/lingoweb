import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Bot, Keyboard, Languages, MessageSquareQuote, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import { DOWNLOAD_URLS, REPO_URL } from '@/lib/constants'
import { cn } from '@/lib/cn'
import type { PlatformId } from '@/lib/platform'
import appIcon from '@/assets/app-icon.png'

type HeroProps = {
  preferredPlatform: PlatformId
  version: string
}

function Hero({ preferredPlatform, version }: HeroProps) {
  const { t } = useTranslation()

  return (
    <section className="section-shell grid min-h-[calc(100vh-9rem)] items-center gap-12 pt-6 lg:grid-cols-[1.05fr_0.95fr]" id="top">
      <div className="max-w-2xl">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <Badge className="mb-6">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            {t('hero.badge', { version })}
          </Badge>

          <h1 className="section-title">{t('hero.title')}</h1>
          <p className="section-copy mt-6">{t('hero.subtitle')}</p>
          <p className="mt-5 text-sm text-white/58">{t('hero.helper')}</p>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex flex-col gap-2">
            <Button
              className={cn(preferredPlatform === 'macos' && 'ring-2 ring-cyan-300/70 ring-offset-2 ring-offset-[#070b17]')}
              href={DOWNLOAD_URLS.macos}
              size="lg">
              {t('hero.downloadMac')}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <span className="px-2 text-xs text-white/56">{t('hero.macLabel')}</span>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              className={cn(preferredPlatform === 'windows' && 'ring-2 ring-fuchsia-300/70 ring-offset-2 ring-offset-[#070b17]')}
              href={DOWNLOAD_URLS.windows}
              size="lg"
              variant="secondary">
              {t('hero.downloadWindows')}
              <DownloadIcon />
            </Button>
            <span className="px-2 text-xs text-white/56">{t('hero.windowsLabel')}</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-5"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <Button href={REPO_URL} variant="ghost">
            {t('hero.github')}
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        transition={{ duration: 0.9, delay: 0.16, type: 'spring', stiffness: 120, damping: 22 }}>
        <GlassCard className="relative overflow-hidden p-4 sm:p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.22),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.16),transparent_26%)]" />
          <div className="relative">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
              </div>
              <Badge>{t('hero.mockup.liveTag')}</Badge>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="glass-subtle rounded-[1.75rem] p-5">
                <div className="flex items-center gap-4">
                  <img alt={t('brand.appIconAlt')} className="h-14 w-14 rounded-2xl shadow-[0_18px_36px_rgba(3,8,18,0.32)]" src={appIcon} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/46">{t('hero.mockup.eyebrow')}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{t('hero.mockup.title')}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-white/66">{t('hero.mockup.body')}</p>

                <div className="mt-6 space-y-3">
                  <div className="rounded-[1.5rem] border border-white/8 bg-white/5 px-4 py-3">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/38">
                      {t('languageSwitcher.languages.en.short')}
                    </div>
                    <div className="mt-2 text-sm font-medium text-white/78">{t('hero.mockup.source')}</div>
                  </div>
                  <div className="flex items-center gap-3 px-1 text-white/32">
                    <div className="h-px flex-1 bg-current" />
                    <ArrowRight className="h-4 w-4" />
                    <div className="h-px flex-1 bg-current" />
                  </div>
                  <div className="rounded-[1.5rem] border border-accent-300/18 bg-[linear-gradient(135deg,rgba(99,102,241,0.12),rgba(34,211,238,0.08))] px-4 py-3">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-100/72">
                      {t('languageSwitcher.languages.zh.short')}
                    </div>
                    <div className="mt-2 text-sm font-medium text-white">{t('hero.mockup.result')}</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/72">
                  <MockupTag icon={<Bot className="h-4 w-4" />} label={t('hero.mockup.server')} />
                  <MockupTag icon={<Keyboard className="h-4 w-4" />} label={t('hero.mockup.hotkey')} />
                  <MockupTag icon={<MessageSquareQuote className="h-4 w-4" />} label={t('hero.mockup.phrases')} />
                  <MockupTag icon={<Languages className="h-4 w-4" />} label={t('hero.mockup.languages')} />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="glass-subtle rounded-[1.75rem] p-5">
                  <div className="flex items-center gap-3 text-cyan-200">
                    <Sparkles className="h-5 w-5" />
                    <p className="text-sm font-semibold text-white">{t('hero.mockup.sideTitle')}</p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/66">{t('hero.mockup.sideBody')}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="glass-subtle rounded-[1.75rem] p-5">
                    <div className="text-xs uppercase tracking-[0.18em] text-white/38">{t('hero.mockup.statPrimaryLabel')}</div>
                    <div className="mt-3 text-2xl font-semibold text-white">{t('hero.mockup.statPrimaryValue')}</div>
                  </div>
                  <div className="glass-subtle rounded-[1.75rem] p-5">
                    <div className="text-xs uppercase tracking-[0.18em] text-white/38">{t('hero.mockup.statSecondaryLabel')}</div>
                    <div className="mt-3 text-2xl font-semibold text-white">{t('hero.mockup.statSecondaryValue')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  )
}

function MockupTag({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[1.25rem] border border-white/8 bg-white/5 px-3 py-3">
      <span className="text-cyan-200">{icon}</span>
      <span className="text-sm text-white/72">{label}</span>
    </div>
  )
}

function DownloadIcon() {
  return <ArrowDownTray className="h-4 w-4" />
}

function ArrowDownTray({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

export default Hero
