import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Chip from '@/components/ui/Chip'
import SectionHeading from '@/components/ui/SectionHeading'
import auroraImage from '@/assets/backdrops/style-aurora.jpg'
import { cn } from '@/lib/cn'

const STYLE_IDS = ['auto', 'pro', 'toxic'] as const
const STYLE_ABBR = { auto: 'NOR', pro: 'PRO', toxic: 'TOX' } as const

type StyleId = (typeof STYLE_IDS)[number]

/** The translation style picker from the client, with its live typed preview. */
function Styles() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState<StyleId>('auto')
  const [typed, setTyped] = useState('')
  const tokenRef = useRef(0)
  const target = t(`styles.modes.${active}.preview`)
  const shown = reduceMotion ? target : typed

  // Re-type the preview output whenever the active style (or language) changes.
  useEffect(() => {
    if (reduceMotion) {
      return undefined
    }

    const token = tokenRef.current + 1
    tokenRef.current = token
    let index = 0
    let timer = window.setTimeout(step, 0)

    function step() {
      if (tokenRef.current !== token) {
        return
      }
      setTyped(target.slice(0, index))
      index += 1
      if (index <= target.length) {
        timer = window.setTimeout(step, index === 1 ? 250 : 22)
      }
    }

    return () => {
      window.clearTimeout(timer)
    }
  }, [target, reduceMotion])

  return (
    <AnimatedSection className="relative isolate overflow-hidden" id="styles">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img
          alt=""
          className="h-full w-full object-cover object-[70%_center] opacity-40 [mask-image:linear-gradient(180deg,transparent,black_18%,black_82%,transparent)]"
          decoding="async"
          loading="lazy"
          src={auroraImage}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,18,0.96)_0%,rgba(10,12,18,0.7)_45%,rgba(10,12,18,0.4)_100%)]" />
      </div>

      <div className="page-shell py-6 sm:py-10">
        <SectionHeading
          aside={
            <Chip dot tone="sig">
              {t('styles.liveChip')}
            </Chip>
          }
          eyebrow={t('styles.eyebrow')}
          subtitle={t('styles.subtitle')}
          title={t('styles.title')}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {STYLE_IDS.map((id) => {
            const isActive = id === active
            return (
              <button aria-pressed={isActive} className={cn('tone', isActive && 'tone--on')} key={id} onClick={() => setActive(id)} type="button">
                <span aria-hidden="true" className="tone__check">
                  <Check />
                </span>
                <div className="tone__head">
                  <span className={cn('tone__icon', `tone__icon--${id}`)}>{STYLE_ABBR[id]}</span>
                  <div>
                    <h3>{t(`styles.modes.${id}.title`)}</h3>
                    <div className={cn('tone__tag', id === 'toxic' && 'tone__tag--warn')}>{t(`styles.modes.${id}.tag`)}</div>
                  </div>
                </div>
                <p>{t(`styles.modes.${id}.desc`)}</p>
                <div className="tone__sample">
                  <div className="in">
                    <span className="lab">In</span>
                    <span className="truncate">{t(`styles.modes.${id}.src`)}</span>
                  </div>
                  <div className="out">
                    <span className="lab">Out</span>
                    <span className="truncate">{t(`styles.modes.${id}.out`)}</span>
                  </div>
                </div>
                <div className="tone__note">· {t(`styles.modes.${id}.note`)}</div>
              </button>
            )
          })}
        </div>

        <div className="tone-preview mt-4">
          <div>
            <span className="tone-preview__lab">{t('styles.inputLabel')}</span>
            <div className="tone-preview__box">
              <span className="ch">[ALL]</span>
              <span>{t('styles.previewSource')}</span>
            </div>
          </div>
          <div aria-hidden="true" className="tone-preview__arrow">
            <ArrowRight />
          </div>
          <div>
            <span className="tone-preview__lab">
              {t('styles.outputLabel')} · {t(`styles.modes.${active}.title`)}
            </span>
            <div aria-live="polite" className="tone-preview__box">
              <span className="ch">[ALL]</span>
              <span>{shown}</span>
              <span aria-hidden="true" className="tone-preview__caret" />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default Styles
