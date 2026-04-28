import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import dota2Cover from '@/assets/games/dota2-cover.jpg'
import lolCover from '@/assets/games/lol-cover.jpg'
import ow2Cover from '@/assets/games/ow2-cover.jpg'
import wowCover from '@/assets/games/wow-cover.jpg'
import { cn } from '@/lib/cn'

const SUPPORTED_GAMES = [
  { key: 'dota2', cover: dota2Cover, hue: 'cyan' },
  { key: 'lol', cover: lolCover, hue: 'amber' },
  { key: 'wow', cover: wowCover, hue: 'emerald' },
  { key: 'ow2', cover: ow2Cover, hue: 'fuchsia' },
] as const

function SupportedGames() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const activeGame = SUPPORTED_GAMES[activeIndex]

  function move(direction: 1 | -1) {
    setActiveIndex((index) => (index + direction + SUPPORTED_GAMES.length) % SUPPORTED_GAMES.length)
  }

  return (
    <AnimatedSection id="supported-games">
      <section>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="section-eyebrow">{t('supportedGames.eyebrow')}</span>
            <h2 className="section-title mt-5 max-w-[14ch] whitespace-pre-line [word-break:keep-all]">{t('supportedGames.title')}</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label={t('supportedGames.controls.previous')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-cyan-50 shadow-[0_14px_34px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/12"
              onClick={() => move(-1)}
              type="button">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label={t('supportedGames.controls.next')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-cyan-50 shadow-[0_14px_34px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/12"
              onClick={() => move(1)}
              type="button">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative min-h-[32rem] overflow-hidden rounded-[30px] bg-black shadow-[0_34px_90px_rgba(0,0,0,0.38),0_0_96px_rgba(36,217,255,0.1)]"
            initial={false}
            key={activeGame.key}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <motion.img
              alt={t(`supportedGames.items.${activeGame.key}.name`)}
              animate={{ scale: 1.04 }}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.12 }}
              src={activeGame.cover}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,17,0.95),rgba(3,7,17,0.24)_54%,rgba(3,7,17,0.8)),linear-gradient(180deg,rgba(3,7,17,0.02),rgba(3,7,17,0.88))]" />
            <div className="absolute inset-0 scanline opacity-12" />

            <div className="relative flex h-full min-h-[32rem] flex-col justify-end p-5 sm:p-8">
              <div className="max-w-[34rem]">
                <div className="mb-4 inline-flex rounded-full bg-cyan-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-cyan-100 backdrop-blur-md">
                  {t('supportedGames.chatBadge')}
                </div>
                <h3 className="font-display text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.86] text-white text-glow">
                  {t(`supportedGames.items.${activeGame.key}.name`)}
                </h3>
                <p className="mt-5 max-w-[27rem] text-base leading-8 text-white/72">
                  {t(`supportedGames.items.${activeGame.key}.description`)}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {SUPPORTED_GAMES.map((game, index) => {
              const active = index === activeIndex

              return (
                <button
                  aria-label={t('supportedGames.controls.goTo', {
                    game: t(`supportedGames.items.${game.key}.name`),
                  })}
                  aria-pressed={active}
                  className={cn(
                    'group relative min-h-28 overflow-hidden rounded-[22px] p-0 text-left transition duration-300',
                    active ? 'opacity-100 shadow-[0_18px_48px_rgba(36,217,255,0.14)]' : 'opacity-58 hover:opacity-100',
                  )}
                  key={game.key}
                  onClick={() => setActiveIndex(index)}
                  type="button">
                  <img alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" src={game.cover} />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,17,0.88),rgba(3,7,17,0.36))]" />
                  <div className="relative flex h-full items-end justify-between gap-3 p-4">
                    <div>
                      <div className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-cyan-100/60">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="mt-2 font-display text-xl font-black text-white">
                        {t(`supportedGames.items.${game.key}.name`)}
                      </div>
                    </div>
                    <span className={cn('h-2 w-10 rounded-full transition duration-300', active ? 'bg-cyan-200 shadow-[0_0_16px_rgba(36,217,255,0.8)]' : 'bg-white/18')} />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}

export default SupportedGames
