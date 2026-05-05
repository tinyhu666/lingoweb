import { useMemo, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ArrowRight, CheckCircle2, Download, Gamepad2, Languages, MessageSquareText, MousePointer2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import BrandLogo from '@/components/ui/BrandLogo'
import heroCinematic from '@/assets/hero-cinematic.png'
import { cn } from '@/lib/cn'
import type { PlatformId } from '@/lib/platform'

type HeroProps = {
  downloads: {
    macos: string
    windows: string
  }
  preferredPlatform: PlatformId
}

const CHAT_ROWS = [
  { key: 'hold', from: 'CN', to: 'EN' },
  { key: 'smoke', from: 'EN', to: 'ZH' },
  { key: 'together', from: 'RU', to: 'EN' },
] as const

function Hero({ downloads, preferredPlatform }: HeroProps) {
  const { i18n, t } = useTranslation()
  const titleLines = useMemo(() => getHeroTitleLines(t('hero.title'), i18n.resolvedLanguage), [i18n.resolvedLanguage, t])
  const primaryPlatform: Exclude<PlatformId, 'unknown'> = preferredPlatform === 'macos' ? 'macos' : 'windows'

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pt-24 sm:pt-28" id="top">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <img alt="" className="h-full w-full object-cover object-[62%_50%]" src={heroCinematic} />
        <div className="absolute inset-0 media-vignette" />
        <div className="absolute inset-0 scanline opacity-40" />
      </div>

      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.28, 0.58, 0.28], scale: [0.98, 1.04, 0.98] }}
        className="absolute left-[8%] top-[24%] -z-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="page-shell grid min-h-[calc(100svh-7rem)] items-center gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(24rem,0.74fr)]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[42rem] pb-12"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="section-eyebrow shadow-[0_0_34px_rgba(36,217,255,0.16)]">
              <MessageSquareText className="h-3.5 w-3.5" />
              {t('hero.badge')}
            </span>
          </div>

          <h1 className="text-glow font-display text-[clamp(3.6rem,7vw,6.8rem)] font-black uppercase leading-[0.98] tracking-[0] text-white sm:text-[clamp(4rem,6.4vw,7rem)]">
            {titleLines.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-[34rem] text-base leading-8 text-cyan-50/78 sm:text-lg">{t('hero.subtitle')}</p>

          <div className="mt-9 grid max-w-[35rem] gap-3 sm:grid-cols-2">
            <HeroDownloadAction
              href={downloads.windows}
              icon={<Download className="h-4 w-4" />}
              label={t('hero.downloadWindows')}
              preferred={primaryPlatform === 'windows'}
              recommendedLabel={t('hero.recommended')}
              variant={primaryPlatform === 'windows' ? 'primary' : 'secondary'}
            />
            <HeroDownloadAction
              href={downloads.macos}
              icon={<ArrowRight className="h-4 w-4" />}
              label={t('hero.downloadMac')}
              preferred={primaryPlatform === 'macos'}
              recommendedLabel={t('hero.recommended')}
              variant={primaryPlatform === 'macos' ? 'primary' : 'secondary'}
            />
          </div>

          <div className="mt-8 grid max-w-[34rem] grid-cols-3 gap-2">
            <HeroSignal icon={<MessageSquareText className="h-4 w-4" />} label={t('hero.signals.beforeSend')} />
            <HeroSignal icon={<Gamepad2 className="h-4 w-4" />} label={t('hero.signals.gameContext')} />
            <HeroSignal icon={<Languages className="h-4 w-4" />} label={t('hero.signals.languages')} />
          </div>
        </motion.div>

        <HeroCockpit />
      </div>
    </section>
  )
}

function HeroDownloadAction({
  href,
  icon,
  label,
  preferred = false,
  recommendedLabel,
  variant = 'primary',
}: {
  href: string
  icon: ReactNode
  label: string
  preferred?: boolean
  recommendedLabel: string
  variant?: 'primary' | 'secondary'
}) {
  return (
    <div className="group relative">
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-x-4 -bottom-2 h-10 rounded-[8px] blur-2xl transition duration-300 group-hover:opacity-80',
          variant === 'primary' ? 'bg-cyan-400/34 opacity-60' : 'bg-fuchsia-400/22 opacity-40',
        )}
      />
      {preferred ? (
        <span className="absolute -top-3 right-3 z-20 inline-flex items-center gap-1 rounded-full bg-emerald-400/16 px-2 py-1 text-[0.62rem] font-black uppercase tracking-[0.1em] text-emerald-100 backdrop-blur-md">
          <CheckCircle2 className="h-3 w-3" />
          {recommendedLabel}
        </span>
      ) : null}
      <Button className="relative z-10 w-full justify-center" href={href} size="lg" variant={variant}>
        {label}
        {icon}
      </Button>
    </div>
  )
}

function HeroSignal({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="rounded-full bg-white/[0.065] px-4 py-3 text-white/82 shadow-[0_12px_28px_rgba(0,0,0,0.18)] backdrop-blur-md">
      <div className="mb-2 text-cyan-200">{icon}</div>
      <div className="truncate text-xs font-black uppercase tracking-[0.08em]">{label}</div>
    </div>
  )
}

function HeroCockpit() {
  const { t } = useTranslation()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 90, damping: 20, mass: 0.7 })
  const springY = useSpring(pointerY, { stiffness: 90, damping: 20, mass: 0.7 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-9, 9])

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="hidden justify-self-end lg:block"
      initial={{ opacity: 0, y: 28 }}
      onPointerLeave={() => {
        pointerX.set(0)
        pointerY.set(0)
      }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
      }}
      transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
      <motion.div
        className="relative w-[27rem] overflow-hidden rounded-[18px] bg-[#050b16]/60 p-4 shadow-[0_34px_90px_rgba(0,0,0,0.42),0_0_80px_rgba(36,217,255,0.14)] backdrop-blur-2xl"
        style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 scanline opacity-25" />
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/18 blur-3xl" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <BrandLogo className="h-11 brightness-125 drop-shadow-[0_0_24px_rgba(36,217,255,0.18)]" />
            <span className="rounded-full bg-cyan-300/12 px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.12em] text-cyan-100">
              {t('hero.cockpit.live')}
            </span>
          </div>

          <div className="mt-6 grid gap-3">
            {CHAT_ROWS.map((row, index) => (
              <motion.div
                animate={{ opacity: [0.72, 1, 0.72], x: [0, index % 2 ? -4 : 4, 0] }}
                className="rounded-[16px] bg-white/[0.06] p-4 shadow-[0_18px_44px_rgba(0,0,0,0.16)]"
                key={row.key}
                transition={{ duration: 3.8, delay: index * 0.45, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="flex items-center justify-between text-[0.62rem] font-black uppercase tracking-[0.16em] text-cyan-100/72">
                  <span>{row.from}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-fuchsia-200" />
                  <span>{row.to}</span>
                </div>
                <div className="mt-3 text-sm font-bold text-white/78">{t(`hero.cockpit.rows.${row.key}.source`)}</div>
                <div className="mt-2 rounded-[12px] bg-cyan-300/12 px-3 py-2 text-sm font-black text-cyan-50">
                  {t(`hero.cockpit.rows.${row.key}.result`)}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={{ y: [0, -5, 0], boxShadow: ['0 0 24px rgba(36,217,255,0.2)', '0 0 44px rgba(255,188,92,0.38)', '0 0 24px rgba(36,217,255,0.2)'] }}
            className="mt-5 flex items-center justify-between rounded-full bg-white/[0.075] px-4 py-3 shadow-[0_16px_38px_rgba(0,0,0,0.22)] backdrop-blur-md"
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}>
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-white/82">
              <MousePointer2 className="h-4 w-4 text-amber-200" />
              {t('hero.cockpit.reviewReady')}
            </span>
            <span className="text-sm font-black text-cyan-100">{t('hero.cockpit.sendControl')}</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function getHeroTitleLines(title: string, language?: string) {
  if (title.includes('\n')) {
    return title.split('\n').filter(Boolean)
  }

  if (language?.startsWith('zh') && title.length > 4) {
    return [title.slice(0, 4), title.slice(4)]
  }

  return title.includes(' ') ? title.split(' ').slice(0, 3).join(' ') === title ? [title] : [title] : [title]
}

export default Hero
