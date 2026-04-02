import { useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ArrowRight, Keyboard, Languages, MessageSquare } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
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
  const title = t('hero.title')
  const titleLines = getHeroTitleLines(title, i18n.resolvedLanguage)

  return (
    <section
      className="section-shell grid min-h-[calc(100vh-9rem)] items-center gap-10 pt-4 md:pt-6 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:pt-10"
      id="top">
      <div className="max-w-[38rem]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <HeroReleaseBadge label={t('hero.badge', { version })} />

          <h1
            className={cn(
              'section-title text-[clamp(3.25rem,6vw,5.15rem)] tracking-[-0.07em] lg:text-[clamp(3rem,3.7vw,4.25rem)]',
              titleLines.length > 1
                ? 'max-w-[7.4em] leading-[1.08] lg:max-w-none lg:leading-[1.02] lg:whitespace-nowrap'
                : 'max-w-[12ch] leading-[1.02]',
            )}>
            {titleLines.map((line) => (
              <span className="block whitespace-nowrap lg:inline" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="section-copy mt-6 max-w-[36rem] text-[clamp(1rem,1.35vw,1.12rem)]">{t('hero.subtitle')}</p>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 grid max-w-[32rem] gap-4 sm:grid-cols-2"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
          <HeroDownloadAction
            caption={t('hero.macLabel')}
            glowClassName="bg-[radial-gradient(circle,rgba(103,232,249,0.42),rgba(129,140,248,0.22)_44%,transparent_76%)]"
            href={downloads.macos}
            icon={<ArrowRight className="h-4 w-4" />}
            label={t('hero.downloadMac')}
            preferred={preferredPlatform === 'macos'}
          />

          <HeroDownloadAction
            caption={t('hero.windowsLabel')}
            glowClassName="bg-[radial-gradient(circle,rgba(217,70,239,0.34),rgba(129,140,248,0.2)_46%,transparent_76%)]"
            href={downloads.windows}
            icon={<DownloadIcon />}
            label={t('hero.downloadWindows')}
            preferred={preferredPlatform === 'windows'}
            variant="secondary"
          />
        </motion.div>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 max-w-[34rem] text-sm leading-6 text-white/58"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
          {t('hero.supportLine')}
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid max-w-[36rem] gap-3 sm:grid-cols-3"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}>
          <HeroQuickFact label={t('hero.quickFacts.release')} value={t('hero.quickFacts.releaseValue', { version })} />
          <HeroQuickFact label={t('hero.quickFacts.delivery')} value={t('hero.quickFacts.deliveryValue')} />
          <HeroQuickFact label={t('hero.quickFacts.requirements')} value={t('hero.quickFacts.requirementsValue')} />
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        transition={{ duration: 0.9, delay: 0.16, type: 'spring', stiffness: 120, damping: 22 }}>
        <HeroShowcase />
      </motion.div>
    </section>
  )
}

type HeroReleaseBadgeProps = {
  label: string
}

function HeroReleaseBadge({ label }: HeroReleaseBadgeProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.div
      className="relative mb-6 inline-flex"
      onHoverEnd={() => setIsHovering(false)}
      onHoverStart={() => setIsHovering(true)}>
      <motion.div
        aria-hidden="true"
        animate={{ opacity: isHovering ? 0.72 : 0.34, scale: isHovering ? 1.05 : 0.9 }}
        className="pointer-events-none absolute inset-x-5 bottom-0 h-8 rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.36),rgba(129,140,248,0.16)_46%,transparent_74%)] blur-2xl"
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        animate={{ y: isHovering ? -2 : 0, scale: isHovering ? 1.012 : 1 }}
        className="relative"
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isHovering ? 0.95 : 0.62, scaleX: isHovering ? 1 : 0.82 }}
          className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent"
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        />
        <Badge className="relative z-10">
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          {label}
        </Badge>
      </motion.div>
    </motion.div>
  )
}

type HeroDownloadActionProps = {
  caption: string
  glowClassName: string
  href: string
  icon: ReactNode
  label: string
  preferred?: boolean
  variant?: 'primary' | 'secondary'
}

function HeroDownloadAction({
  caption,
  glowClassName,
  href,
  icon,
  label,
  preferred = false,
  variant = 'primary',
}: HeroDownloadActionProps) {
  const [isHovering, setIsHovering] = useState(false)
  const active = isHovering || preferred

  return (
    <div className="flex flex-col gap-2">
      <motion.div
        className="relative w-full"
        onHoverEnd={() => setIsHovering(false)}
        onHoverStart={() => setIsHovering(true)}>
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: active ? 0.86 : 0.28,
            scale: active ? 1.06 : 0.88,
            y: active ? 2 : 8,
          }}
          className={cn('pointer-events-none absolute inset-x-5 -bottom-2 h-12 rounded-full blur-2xl', glowClassName)}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          animate={{ y: isHovering ? -3 : 0, scale: isHovering ? 1.012 : 1 }}
          className="relative"
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
          <motion.div
            aria-hidden="true"
            animate={{ opacity: active ? 0.92 : 0.42, scaleX: active ? 1 : 0.8 }}
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            aria-hidden="true"
            animate={{ opacity: active ? 0.82 : 0.18 }}
            className="pointer-events-none absolute inset-0 rounded-full border border-white/16"
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          />
          <Button
            className={cn(
              'relative z-10 w-full justify-center',
              preferred &&
                (variant === 'primary'
                  ? 'ring-2 ring-cyan-300/70 ring-offset-2 ring-offset-[#070b17]'
                  : 'ring-2 ring-fuchsia-300/70 ring-offset-2 ring-offset-[#070b17]'),
            )}
            href={href}
            size="lg"
            variant={variant}>
            {label}
            {icon}
          </Button>
        </motion.div>
      </motion.div>
      <span className="px-2 text-xs text-white/62">{caption}</span>
    </div>
  )
}

function HeroShowcase() {
  const { t } = useTranslation()
  const [isHovering, setIsHovering] = useState(false)

  const rotateXRaw = useMotionValue(0)
  const rotateYRaw = useMotionValue(0)
  const pointerShiftXRaw = useMotionValue(0)
  const pointerShiftYRaw = useMotionValue(0)
  const glowXRaw = useMotionValue(50)
  const glowYRaw = useMotionValue(50)

  const rotateX = useSpring(rotateXRaw, { stiffness: 180, damping: 20, mass: 0.72 })
  const rotateY = useSpring(rotateYRaw, { stiffness: 180, damping: 20, mass: 0.72 })
  const pointerShiftX = useSpring(pointerShiftXRaw, { stiffness: 185, damping: 22, mass: 0.75 })
  const pointerShiftY = useSpring(pointerShiftYRaw, { stiffness: 185, damping: 22, mass: 0.75 })
  const glowX = useSpring(glowXRaw, { stiffness: 190, damping: 22, mass: 0.75 })
  const glowY = useSpring(glowYRaw, { stiffness: 190, damping: 22, mass: 0.75 })

  const headerX = useTransform(pointerShiftX, (value) => value * 0.16)
  const headerY = useTransform(pointerShiftY, (value) => value * -0.14)
  const pillsX = useTransform(pointerShiftX, (value) => value * 0.24)
  const pillsY = useTransform(pointerShiftY, (value) => value * -0.22)
  const bodyX = useTransform(pointerShiftX, (value) => value * 0.12)
  const bodyY = useTransform(pointerShiftY, (value) => value * -0.08)
  const stackX = useTransform(pointerShiftX, (value) => value * -0.18)
  const stackY = useTransform(pointerShiftY, (value) => value * -0.12)
  const chatX = useTransform(pointerShiftX, (value) => value * 0.34)
  const chatY = useTransform(pointerShiftY, (value) => value * -0.26)
  const tagsX = useTransform(pointerShiftX, (value) => value * 0.22)
  const tagsY = useTransform(pointerShiftY, (value) => value * -0.18)
  const pointerGlow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(103, 232, 249, 0.2), rgba(129, 140, 248, 0.16) 22%, rgba(217, 70, 239, 0.08) 44%, transparent 70%)`

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const progressX = (event.clientX - rect.left) / rect.width
    const progressY = (event.clientY - rect.top) / rect.height

    rotateXRaw.set((0.5 - progressY) * 5.5)
    rotateYRaw.set((progressX - 0.5) * 8)
    pointerShiftXRaw.set((progressX - 0.5) * 16)
    pointerShiftYRaw.set((progressY - 0.5) * 14)
    glowXRaw.set(progressX * 100)
    glowYRaw.set(progressY * 100)

    if (!isHovering) {
      setIsHovering(true)
    }
  }

  function resetPointerState() {
    rotateXRaw.set(0)
    rotateYRaw.set(0)
    pointerShiftXRaw.set(0)
    pointerShiftYRaw.set(0)
    glowXRaw.set(50)
    glowYRaw.set(50)
    setIsHovering(false)
  }

  return (
    <motion.div
      animate={{ scale: isHovering ? 1.01 : 1 }}
      className="relative will-change-transform"
      onPointerCancel={resetPointerState}
      onPointerLeave={resetPointerState}
      onPointerMove={handlePointerMove}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1400,
        transformStyle: 'preserve-3d',
      }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-12 bottom-3 h-28 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.28),rgba(129,140,248,0.2)_42%,rgba(217,70,239,0.14)_62%,transparent_76%)] blur-3xl"
        animate={{ opacity: isHovering ? 0.8 : 0.48, scale: isHovering ? 1.06 : 0.92 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      <GlassCard className="relative overflow-hidden p-4 sm:p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.22),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.16),transparent_26%)]" />
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isHovering ? 0.54 : 0.18 }}
          className="pointer-events-none absolute inset-0"
          style={{ background: pointerGlow }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent"
          animate={{ opacity: isHovering ? 0.95 : 0.55, scaleX: isHovering ? 1.02 : 0.86 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="relative">
          <motion.div className="mb-4 flex items-center gap-2" style={{ x: headerX, y: headerY }}>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-300/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
            </div>
          </motion.div>

          <div className="glass-subtle relative overflow-hidden rounded-[1.75rem] p-5">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 top-0 h-32 w-32 rounded-full bg-cyan-300/12 blur-3xl"
              animate={{ opacity: isHovering ? 0.5 : 0.2, scale: isHovering ? 1.04 : 0.84 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div className="grid grid-cols-2 gap-3" style={{ x: pillsX, y: pillsY }}>
              <ConceptPill icon={<Languages className="h-4 w-4" />} label={t('hero.mockup.translateChip')} />
              <ConceptPill icon={<MessageSquare className="h-4 w-4" />} label={t('hero.mockup.chatChip')} />
            </motion.div>

            <motion.p className="mt-4 text-sm leading-7 text-white/72" style={{ x: bodyX, y: bodyY }}>
              {t('hero.mockup.body')}
            </motion.p>

            <motion.div className="mt-6 space-y-3" style={{ x: stackX, y: stackY }}>
              <div className="rounded-[1.5rem] border border-white/8 bg-white/5 px-4 py-3 shadow-[0_14px_36px_rgba(3,8,18,0.22)]">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/46">
                  {t('hero.mockup.sourceLabel')}
                </div>
                <div className="mt-2 text-sm font-medium text-white/78">{t('hero.mockup.source')}</div>
              </div>
              <div className="flex items-center gap-3 px-1 text-white/32">
                <div className="h-px flex-1 bg-current" />
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/54">
                  <Keyboard className="h-3.5 w-3.5 text-cyan-200/78" />
                  <span>{t('hero.mockup.hotkeyAction')}</span>
                </div>
                <div className="h-px flex-1 bg-current" />
              </div>
              <div className="rounded-[1.5rem] border border-accent-300/18 bg-[linear-gradient(135deg,rgba(99,102,241,0.12),rgba(34,211,238,0.08))] px-4 py-3 shadow-[0_18px_42px_rgba(3,8,18,0.26)]">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-100/78">
                  {t('hero.mockup.resultLabel')}
                </div>
                <div className="mt-2 text-sm font-medium text-white">{t('hero.mockup.result')}</div>
              </div>
            </motion.div>

            <motion.div
              className="mt-6 rounded-[1.5rem] border border-cyan-200/12 bg-[linear-gradient(135deg,rgba(148,163,184,0.08),rgba(34,211,238,0.12))] px-4 py-4 shadow-[0_20px_46px_rgba(3,8,18,0.3)]"
              style={{ x: chatX, y: chatY }}>
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent"
                animate={{ opacity: isHovering ? 0.95 : 0.62, scaleX: isHovering ? 1 : 0.82 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-100/70">{t('hero.mockup.chatLabel')}</div>
                  <div className="mt-2 text-sm font-medium text-white">{t('hero.mockup.chatDraft')}</div>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-100/14 bg-cyan-300/14 text-cyan-100">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>

            <motion.div className="mt-6 grid grid-cols-2 gap-3" style={{ x: tagsX, y: tagsY }}>
              <MockupTag icon={<Keyboard className="h-4 w-4" />} label={t('hero.mockup.hotkey')} />
              <MockupTag icon={<MessageSquare className="h-4 w-4" />} label={t('hero.mockup.chatReady')} />
            </motion.div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

function ConceptPill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[1.25rem] border border-white/8 bg-white/5 px-3 py-3 text-sm text-white/78">
      <span className="text-cyan-200">{icon}</span>
      <span>{label}</span>
    </div>
  )
}

function HeroQuickFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.035] px-4 py-3">
      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/42">{label}</div>
      <div className="mt-2 text-sm font-medium text-white/82">{value}</div>
    </div>
  )
}

function getHeroTitleLines(title: string, language?: string) {
  if (!language?.startsWith('zh')) {
    return [title]
  }

  if (title.endsWith('翻译助手') && title.length > 4) {
    return [title.slice(0, -4), '翻译助手']
  }

  return [title]
}

function MockupTag({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[1.25rem] border border-white/8 bg-white/5 px-3 py-3 text-sm text-white/78">
      <span className="text-cyan-200">{icon}</span>
      <span>{label}</span>
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
