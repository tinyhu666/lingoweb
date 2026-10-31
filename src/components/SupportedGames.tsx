import { Gamepad2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Chip from '@/components/ui/Chip'
import SectionHeading from '@/components/ui/SectionHeading'
import dota2Cover from '@/assets/games/dota2-cover.jpg'
import lolCover from '@/assets/games/lol-cover.jpg'
import owCover from '@/assets/games/ow2-cover.jpg'
import wowCover from '@/assets/games/wow-cover.jpg'
import dota2Icon from '@/assets/icons/game-dota2.jpg'
import lolIcon from '@/assets/icons/game-lol.svg'
import owIcon from '@/assets/icons/game-overwatch.png'
import wowIcon from '@/assets/icons/game-wow.png'
import { cn } from '@/lib/cn'

const GAMES = [
  { key: 'dota2', cover: dota2Cover, icon: dota2Icon, iconFit: 'cover', featured: true },
  { key: 'lol', cover: lolCover, icon: lolIcon, iconFit: 'contain', featured: false },
  { key: 'overwatch', cover: owCover, icon: owIcon, iconFit: 'contain', featured: false },
  { key: 'wow', cover: wowCover, icon: wowIcon, iconFit: 'contain', featured: false },
] as const

function SupportedGames() {
  const { t } = useTranslation()

  return (
    <AnimatedSection id="games">
      <div className="page-shell">
        <SectionHeading eyebrow={t('games.eyebrow')} subtitle={t('games.subtitle')} title={t('games.title')} />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {GAMES.map((game) => (
            <article className={cn('game-card', game.featured && 'md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[22rem]')} key={game.key}>
              <img alt="" className="game-card__cover" decoding="async" loading="lazy" src={game.cover} />
              <div className="flex flex-col gap-3 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="game-badge">
                    <img alt="" className={game.iconFit === 'contain' ? 'is-contain' : undefined} src={game.icon} />
                  </span>
                  <h3 className={cn('m-0 font-extrabold text-ink-0', game.featured ? 'text-2xl sm:text-3xl' : 'text-xl')}>{t(`games.items.${game.key}.name`)}</h3>
                </div>
                <p className={cn('m-0 text-ink-1', game.featured ? 'max-w-[30rem] text-[0.98rem] leading-relaxed' : 'text-[0.88rem] leading-relaxed')}>
                  {t(`games.items.${game.key}.desc`)}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Chip hud tone="sig">
                    {t('games.glossaryLabel')}
                  </Chip>
                  <span className="font-hud text-[0.72rem] tracking-[0.06em] text-ink-2">{t(`games.items.${game.key}.terms`)}</span>
                </div>
              </div>
            </article>
          ))}

          <article className="surface flex min-h-[12rem] flex-col gap-4 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="icon-tile">
                <Gamepad2 />
              </span>
              <h3 className="m-0 text-xl font-extrabold text-ink-0">{t('games.items.other.name')}</h3>
            </div>
            <p className="m-0 text-[0.92rem] leading-relaxed text-ink-2">{t('games.items.other.desc')}</p>
            <Chip hud className="mt-auto w-fit">
              {t('games.items.other.terms')}
            </Chip>
          </article>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default SupportedGames
