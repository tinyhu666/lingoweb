import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GlassCard from '@/components/ui/GlassCard'
import dota2Cover from '@/assets/games/dota2-cover.jpg'
import lolCover from '@/assets/games/lol-cover.jpg'
import ow2Cover from '@/assets/games/ow2-cover.jpg'
import wowCover from '@/assets/games/wow-cover.jpg'
import { cn } from '@/lib/cn'

const SUPPORTED_GAMES = [
  { key: 'dota2', cover: dota2Cover },
  { key: 'lol', cover: lolCover },
  { key: 'wow', cover: wowCover },
  { key: 'ow2', cover: ow2Cover },
] as const

type SupportedGame = (typeof SUPPORTED_GAMES)[number]

function SupportedGames() {
  const { t } = useTranslation()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktopLayout, setIsDesktopLayout] = useState(false)

  function getIndexFromScroll(scroller: HTMLDivElement) {
    const firstCard = scroller.querySelector<HTMLElement>('[data-game-card]')
    if (!firstCard) {
      return 0
    }

    const gap = Number.parseFloat(window.getComputedStyle(scroller).gap || '0')
    const cardSpan = firstCard.offsetWidth + gap

    return Math.max(0, Math.min(Math.round(scroller.scrollLeft / cardSpan), SUPPORTED_GAMES.length - 1))
  }

  function scrollToCard(index: number) {
    const scroller = scrollerRef.current
    const cards = scroller?.querySelectorAll<HTMLElement>('[data-game-card]')

    if (!scroller || !cards?.length) {
      return
    }

    const safeIndex = Math.max(0, Math.min(index, cards.length - 1))
    const gap = Number.parseFloat(window.getComputedStyle(scroller).gap || '0')
    const cardSpan = cards[0].offsetWidth + gap
    const targetLeft = safeIndex * cardSpan

    setActiveIndex(safeIndex)
    scroller.scrollTo({ left: targetLeft, behavior: 'smooth' })
  }

  function scrollByCard(direction: 1 | -1) {
    scrollToCard(activeIndex + direction)
  }

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) {
      return
    }

    scroller.scrollLeft = 0

    const syncActiveCard = () => setActiveIndex(getIndexFromScroll(scroller))

    syncActiveCard()
    window.addEventListener('resize', syncActiveCard)

    return () => {
      window.removeEventListener('resize', syncActiveCard)
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    const syncDesktopLayout = () => {
      setIsDesktopLayout(mediaQuery.matches)
    }

    syncDesktopLayout()
    mediaQuery.addEventListener('change', syncDesktopLayout)

    return () => {
      mediaQuery.removeEventListener('change', syncDesktopLayout)
    }
  }, [])

  const activeGame = SUPPORTED_GAMES[activeIndex] ?? SUPPORTED_GAMES[0]

  return (
    <AnimatedSection id="supported-games">
      <section>
        <span className="section-eyebrow">{t('supportedGames.eyebrow')}</span>
        <div className="section-header">
          <h2 className="section-title section-module-title section-header__title">{t('supportedGames.title')}</h2>
          <p className="section-copy section-header__copy">{t('supportedGames.subtitle')}</p>
        </div>

        <div className="section-body flex items-center justify-end gap-3 lg:hidden">
          <button
            aria-label={t('supportedGames.controls.previous')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-slate-200 bg-white/76 text-slate-600 shadow-[0_10px_20px_rgba(15,23,42,0.05)] transition hover:border-blue-200 hover:bg-white hover:text-slate-950"
            onClick={() => scrollByCard(-1)}
            type="button">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label={t('supportedGames.controls.next')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-slate-200 bg-white/76 text-slate-600 shadow-[0_10px_20px_rgba(15,23,42,0.05)] transition hover:border-blue-200 hover:bg-white hover:text-slate-950"
            onClick={() => scrollByCard(1)}
            type="button">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mt-6 overflow-hidden lg:mt-10 lg:overflow-visible">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-12 bg-gradient-to-r from-[#eef4fb] via-[#eef4fb]/70 to-transparent md:block lg:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-gradient-to-l from-[#eef4fb] via-[#eef4fb]/70 to-transparent md:block lg:hidden" />

          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 pb-3 pt-2 scroll-smooth touch-pan-y sm:gap-5 lg:grid lg:grid-cols-4 lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0 xl:gap-4"
            onScroll={(event) => setActiveIndex(getIndexFromScroll(event.currentTarget))}>
            {SUPPORTED_GAMES.map((game, index) => (
              <GameShowcaseCard
                game={game}
                index={index}
                isActive={isDesktopLayout || activeIndex === index}
                key={game.key}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:hidden">
          <div className="text-sm font-bold text-slate-500">
            {String(activeIndex + 1).padStart(2, '0')} / {String(SUPPORTED_GAMES.length).padStart(2, '0')} ·{' '}
            {t(`supportedGames.items.${activeGame.key}.name`)}
          </div>

          <div className="flex items-center gap-2">
            {SUPPORTED_GAMES.map((game, index) => (
              <button
                key={game.key}
                aria-label={t('supportedGames.controls.goTo', {
                  game: t(`supportedGames.items.${game.key}.name`),
                })}
                aria-pressed={activeIndex === index}
                className="inline-flex h-7 items-center"
                onClick={() => scrollToCard(index)}
                type="button">
                <span
                  className={cn(
                    'block h-2 rounded-full transition-all duration-300',
                    activeIndex === index ? 'w-10 bg-blue-600' : 'w-2 bg-slate-300',
                  )}
                />
              </button>
            ))}
          </div>
        </div>


      </section>
    </AnimatedSection>
  )
}

type GameShowcaseCardProps = {
  game: SupportedGame
  index: number
  isActive: boolean
}

function GameShowcaseCard({ game, index, isActive }: GameShowcaseCardProps) {
  const { t } = useTranslation()
  const [isHovering, setIsHovering] = useState(false)

  const rotateXRaw = useMotionValue(0)
  const rotateYRaw = useMotionValue(0)
  const pointerShiftXRaw = useMotionValue(0)
  const pointerShiftYRaw = useMotionValue(0)

  const rotateX = useSpring(rotateXRaw, { stiffness: 170, damping: 18, mass: 0.7 })
  const rotateY = useSpring(rotateYRaw, { stiffness: 170, damping: 18, mass: 0.7 })
  const pointerShiftX = useSpring(pointerShiftXRaw, { stiffness: 170, damping: 20, mass: 0.7 })
  const pointerShiftY = useSpring(pointerShiftYRaw, { stiffness: 170, damping: 20, mass: 0.7 })

  const badgeX = useTransform(pointerShiftX, (value) => value * 0.18)
  const badgeY = useTransform(pointerShiftY, (value) => value * -0.14)
  const imageX = useTransform(pointerShiftX, (value) => value * -0.36)
  const imageY = useTransform(pointerShiftY, (value) => value * -0.2)
  const panelX = useTransform(pointerShiftX, (value) => value * 0.42)
  const panelY = useTransform(pointerShiftY, (value) => (isActive ? -8 : 8) + value * -0.34)
  const panelScale = useTransform(pointerShiftY, (value) => {
    const baseline = isActive ? 1 : 0.985

    return baseline + Math.abs(value) * 0.00075
  })
  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const progressX = (event.clientX - rect.left) / rect.width
    const progressY = (event.clientY - rect.top) / rect.height

    rotateXRaw.set((0.5 - progressY) * (isActive ? 8 : 5))
    rotateYRaw.set((progressX - 0.5) * (isActive ? 12 : 8))
    pointerShiftXRaw.set((progressX - 0.5) * (isActive ? 18 : 12))
    pointerShiftYRaw.set((progressY - 0.5) * (isActive ? 14 : 9))

    if (!isHovering) {
      setIsHovering(true)
    }
  }

  function resetPointerState() {
    rotateXRaw.set(0)
    rotateYRaw.set(0)
    pointerShiftXRaw.set(0)
    pointerShiftYRaw.set(0)
    setIsHovering(false)
  }

  return (
    <motion.div
      data-game-card
      className={cn(
        'relative min-w-[14.75rem] snap-start pt-1 transition duration-300 sm:min-w-[16rem] md:min-w-[17.5rem] lg:min-w-0 lg:pt-0',
        isActive ? 'opacity-100' : 'opacity-74 hover:opacity-100 lg:opacity-100',
      )}
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}>
      <motion.div
        animate={{
          scale: isHovering ? (isActive ? 1.012 : 1.005) : 1,
        }}
        className="relative will-change-transform"
        onPointerCancel={resetPointerState}
        onPointerLeave={resetPointerState}
        onPointerMove={handlePointerMove}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1600,
          transformStyle: 'preserve-3d',
        }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
        <GlassCard
          className={cn(
            'group relative overflow-hidden p-0 transition duration-300',
            isActive
              ? 'ring-1 ring-cyan-300/35 shadow-[0_22px_46px_rgba(15,23,42,0.14)]'
              : 'shadow-[0_12px_28px_rgba(15,23,42,0.08)]',
          )}>
          <div className="relative aspect-[4/5.1] overflow-hidden lg:aspect-[4/4.75]">
            <motion.img
              alt={t(`supportedGames.items.${game.key}.name`)}
              animate={{ scale: isHovering ? (isActive ? 1.04 : 1.02) : isActive ? 1.01 : 1 }}
              className="h-full w-full object-cover"
              src={game.cover}
              style={{ x: imageX, y: imageY }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,12,0.02),rgba(4,6,12,0.12)_28%,rgba(4,6,12,0.44)_54%,rgba(4,6,12,0.94))]"
              animate={{ opacity: isActive ? 1 : 0.84 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              aria-hidden="true"
              animate={{ opacity: isHovering ? (isActive ? 0.36 : 0.18) : isActive ? 0.12 : 0 }}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(25,196,207,0.2),rgba(37,99,235,0.1)_42%,transparent_74%)]"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent"
              animate={{ opacity: isActive ? 0.9 : 0.3, scaleX: isActive ? 1 : 0.72 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-4 lg:p-3.5" style={{ x: badgeX, y: badgeY }}>
              <div className="inline-flex items-center gap-2 rounded-[8px] border border-white/14 bg-black/28 px-2.5 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/84 backdrop-blur-md">
                <MessageSquare className="h-3 w-3 text-cyan-200" />
                <span>{t('supportedGames.chatBadge')}</span>
              </div>
              <div className="rounded-[8px] border border-white/12 bg-black/18 px-2.5 py-1.5 text-[0.58rem] font-semibold tracking-[0.12em] text-white/60 backdrop-blur-md">
                {String(index + 1).padStart(2, '0')}
              </div>
            </motion.div>

            <motion.div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 lg:p-3.5" style={{ x: panelX, y: panelY, scale: panelScale }}>
              <div
                className={cn(
                  'relative overflow-hidden rounded-[8px] border px-3.5 py-3.5 backdrop-blur-xl transition duration-300 sm:px-4 sm:py-4 lg:px-3.5 lg:py-3.5',
                  isActive
                    ? 'border-cyan-200/18 bg-[linear-gradient(160deg,rgba(16,24,46,0.82),rgba(10,16,30,0.62))] shadow-[0_16px_32px_rgba(3,8,18,0.44)]'
                    : 'border-white/10 bg-[linear-gradient(160deg,rgba(12,18,34,0.74),rgba(8,13,24,0.54))] shadow-[0_12px_24px_rgba(3,8,18,0.28)]',
                )}>
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent"
                  animate={{ opacity: isActive ? 0.95 : 0.36, scaleX: isActive ? 1 : 0.74 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="relative min-h-[6.625rem]">
                  <h3 className="max-w-[10ch] font-display text-[1.4rem] leading-[0.98] font-extrabold text-white sm:text-[1.6rem] lg:text-[1.3rem] xl:text-[1.48rem]">
                    {t(`supportedGames.items.${game.key}.name`)}
                  </h3>
                  <p className="mt-2.5 max-w-[16rem] text-[0.8rem] leading-5 text-white/76 sm:text-[0.84rem] lg:text-[0.76rem] lg:leading-[1.35rem] xl:text-[0.82rem]">
                    {t(`supportedGames.items.${game.key}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}

export default SupportedGames
