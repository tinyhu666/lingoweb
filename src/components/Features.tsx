import type { ReactNode } from 'react'
import { ArrowRight, BookOpenText, Keyboard, Languages, Rocket, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Kbd from '@/components/ui/Kbd'
import SectionHeading from '@/components/ui/SectionHeading'
import aegisIcon from '@/assets/icons/aegis.png'
import bkbIcon from '@/assets/icons/black_king_bar.png'
import blinkIcon from '@/assets/icons/blink.png'
import tpIcon from '@/assets/icons/tpscroll.png'
import wardIcon from '@/assets/icons/ward_observer.png'
import { MAX_PHRASES, TRANSLATION_LANGUAGES } from '@/lib/constants'
import { getPhraseModifier, getTranslationHotkey, type PlatformId } from '@/lib/platform'
import { cn } from '@/lib/cn'

const GLOSSARY_ICONS = [bkbIcon, blinkIcon, tpIcon, aegisIcon, wardIcon]

const STYLE_SWATCHES = [
  { abbr: 'NOR', className: 'bg-sig/14 text-sig', key: 'auto' },
  { abbr: 'PRO', className: 'bg-ok/14 text-ok', key: 'pro' },
  { abbr: 'TOX', className: 'bg-danger/14 text-danger', key: 'toxic' },
] as const

function Features({ preferredPlatform }: { preferredPlatform: PlatformId }) {
  const { t } = useTranslation()
  const hotkey = getTranslationHotkey(preferredPlatform)
  const phraseModifier = getPhraseModifier(preferredPlatform)
  const glossaryTags = t('features.items.glossary.tags', { returnObjects: true }) as unknown as string[]
  const phraseSamples = t('features.items.phrases.samples', { returnObjects: true }) as unknown as string[]

  return (
    <AnimatedSection id="features">
      <div className="page-shell">
        <SectionHeading eyebrow={t('features.eyebrow')} subtitle={t('features.subtitle')} title={t('features.title')} />

        <div className="mt-10 grid gap-4 md:grid-cols-6 lg:grid-cols-12">
          <BentoCard className="md:col-span-6 lg:col-span-7" icon={<Keyboard />} title={t('features.items.hotkey.title')} description={t('features.items.hotkey.desc')}>
            <div className="my-auto grid gap-2 py-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center">
              <div className="chat-line">
                <span className="ch">[ALL]</span>
                <span className="truncate">{t('features.items.hotkey.in')}</span>
              </div>
              <div className="flex items-center justify-center gap-2 py-1 text-ink-3">
                <Kbd keys={hotkey} size="sm" />
                <ArrowRight className="h-4 w-4 rotate-90 sm:rotate-0" />
              </div>
              <div className="chat-line chat-line--done">
                <span className="ch">[ALL]</span>
                <span className="truncate">{t('features.items.hotkey.out')}</span>
              </div>
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-6 lg:col-span-5" icon={<BookOpenText />} title={t('features.items.glossary.title')} description={t('features.items.glossary.desc')}>
            <ul className="mt-auto grid grid-cols-1 gap-2 sm:grid-cols-2">
              {glossaryTags.map((tag, index) => (
                <li className="flex items-center gap-3 rounded-[10px] border border-white/6 bg-white/[0.03] px-2.5 py-2 text-[0.82rem] font-semibold text-ink-1" key={tag}>
                  <img alt="" className="item-icon" decoding="async" loading="lazy" src={GLOSSARY_ICONS[index % GLOSSARY_ICONS.length]} />
                  <span className="truncate">{tag}</span>
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard className="md:col-span-3 lg:col-span-4" icon={<Sparkles />} title={t('features.items.styles.title')} description={t('features.items.styles.desc')}>
            <div className="mt-auto flex flex-wrap gap-2">
              {STYLE_SWATCHES.map((style) => (
                <span className={cn('inline-flex h-9 items-center gap-2 rounded-[10px] px-3 font-hud text-[0.72rem] font-bold tracking-[0.08em]', style.className)} key={style.key}>
                  {style.abbr}
                  <span className="font-sans text-[0.8rem] font-semibold tracking-normal text-ink-0">{t(`styles.modes.${style.key}.title`)}</span>
                </span>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-3 lg:col-span-4" icon={<Zap />} title={t('features.items.phrases.title')} description={t('features.items.phrases.desc', { max: MAX_PHRASES })}>
            <ul className="mt-auto flex flex-col gap-2">
              {phraseSamples.map((sample, index) => (
                <li className="flex items-center gap-3 font-mono text-[0.84rem] text-ink-1" key={sample}>
                  <Kbd keys={[phraseModifier, String(index + 1)]} size="sm" />
                  <span>{sample}</span>
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard className="md:col-span-6 lg:col-span-4" icon={<Languages />} title={t('features.items.languages.title')} description={t('features.items.languages.desc')}>
            <ul className="mt-auto flex flex-wrap gap-2">
              {TRANSLATION_LANGUAGES.map((code) => (
                <li className="lang-chip" key={code}>
                  <code>{code}</code>
                  {t(`features.items.languages.list.${code}`)}
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard className="md:col-span-3 lg:col-span-6" icon={<Rocket />} title={t('features.items.zeroSetup.title')} description={t('features.items.zeroSetup.desc')} />
          <BentoCard className="md:col-span-3 lg:col-span-6" icon={<ShieldCheck />} title={t('features.items.safe.title')} description={t('features.items.safe.desc')} tone="ok" />
        </div>
      </div>
    </AnimatedSection>
  )
}

function BentoCard({
  children,
  className,
  description,
  icon,
  title,
  tone = 'sig',
}: {
  children?: ReactNode
  className?: string
  description: string
  icon: ReactNode
  title: string
  tone?: 'sig' | 'ok'
}) {
  return (
    <article className={cn('bento-card', className)}>
      <div className="flex items-start gap-3">
        <span className={cn('icon-tile', tone === 'ok' && 'bg-ok/14 text-ok')}>{icon}</span>
        <div className="min-w-0">
          <h3>{title}</h3>
          <p className="mt-1.5">{description}</p>
        </div>
      </div>
      {children}
    </article>
  )
}

export default Features
