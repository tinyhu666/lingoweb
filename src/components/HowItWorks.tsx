import { useCallback, useEffect, useRef, useState } from 'react'
import { Play, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import Kbd from '@/components/ui/Kbd'
import SectionHeading from '@/components/ui/SectionHeading'
import panoramaImage from '@/assets/backdrops/tutorial-panorama.jpg'
import { getTranslationHotkey, type PlatformId } from '@/lib/platform'
import { cn } from '@/lib/cn'

type Step = { title: string; desc: string }
type LogLine = { who: string; text: string; tone: 'ally' | 'enemy' }

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** The client's tutorial page: three steps on the left, a replayable stage on the right. */
function HowItWorks({ preferredPlatform }: { preferredPlatform: PlatformId }) {
  const { t } = useTranslation()
  const hotkeyKeys = getTranslationHotkey(preferredPlatform)
  const steps = t('howItWorks.steps', { returnObjects: true }) as unknown as Step[]
  const log = t('howItWorks.log', { returnObjects: true }) as unknown as LogLine[]

  const [activeStep, setActiveStep] = useState(-1)
  const [doneSteps, setDoneSteps] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [typed, setTyped] = useState('')
  const [boxState, setBoxState] = useState('')
  const [keysVisible, setKeysVisible] = useState(false)
  const [keyMessage, setKeyMessage] = useState('')
  const [pressed, setPressed] = useState<number[]>([])
  const runRef = useRef(0)
  const playingRef = useRef(false)
  const stageRef = useRef<HTMLDivElement>(null)

  const play = useCallback(async () => {
    if (playingRef.current) {
      return
    }
    const token = runRef.current + 1
    runRef.current = token
    const alive = () => runRef.current === token
    const reduce = prefersReducedMotion()
    const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, reduce ? 0 : ms))
    const typeText = async (text: string, ms: number) => {
      if (reduce) {
        setTyped(text)
        return
      }
      setTyped('')
      for (let index = 1; index <= text.length; index += 1) {
        if (!alive()) {
          return
        }
        setTyped(text.slice(0, index))
        await wait(ms)
      }
    }

    playingRef.current = true
    setPlaying(true)
    setDoneSteps(0)
    setBoxState('')
    setKeysVisible(false)
    setPressed([])

    try {
      setActiveStep(0)
      await wait(400)
      await typeText(t('howItWorks.mockText'), 80)
      if (!alive()) return
      await wait(700)

      setActiveStep(1)
      setDoneSteps(1)
      setKeyMessage(t('howItWorks.pressingKeys'))
      setKeysVisible(true)
      await wait(400)
      setPressed([0])
      await wait(120)
      setPressed([0, hotkeyKeys.length - 1])
      await wait(260)
      setPressed([])
      setKeyMessage(t('howItWorks.translating'))
      setBoxState('rec shimmer')
      await wait(1400)
      if (!alive()) return

      setActiveStep(2)
      setDoneSteps(2)
      setBoxState('rec flash')
      setKeyMessage(t('howItWorks.doneSend'))
      await typeText(t('howItWorks.resultText'), 20)
      if (!alive()) return
      await wait(600)
      setBoxState('')
      await wait(1400)
      setKeysVisible(false)
      setDoneSteps(3)
      setActiveStep(-1)
    } finally {
      if (alive()) {
        playingRef.current = false
        setPlaying(false)
      }
    }
  }, [hotkeyKeys.length, t])

  // Autoplay once when the stage scrolls into view.
  useEffect(() => {
    const node = stageRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      return
    }
    let fired = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true
          observer.disconnect()
          void play()
        }
      },
      { threshold: 0.45 },
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      runRef.current += 1
      playingRef.current = false
    }
  }, [play])

  const boxClass = cn('tutorial__box', ...boxState.split(' ').filter(Boolean).map((state) => `tutorial__box--${state}`))

  return (
    <AnimatedSection id="how-it-works">
      <div className="page-shell">
        <SectionHeading
          aside={
            <Button disabled={playing} onClick={() => void play()} variant="secondary">
              <Play />
              {t('howItWorks.play')}
            </Button>
          }
          eyebrow={t('howItWorks.eyebrow')}
          subtitle={t('howItWorks.subtitle')}
          title={t('howItWorks.title')}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[21rem_minmax(0,1fr)]">
          <div className="flex flex-col gap-3">
            {steps.map((step, index) => (
              <div className={cn('tutorial__step', activeStep === index && 'tutorial__step--on', doneSteps > index && activeStep !== index && 'tutorial__step--done')} key={step.title}>
                <span className="tutorial__num">{index + 1}</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
            <div className="tutorial__step mt-1">
              <span className="icon-tile bg-ok/14 text-ok">
                <ShieldCheck />
              </span>
              <div>
                <h4>{t('howItWorks.safety.title')}</h4>
                <p>{t('howItWorks.safety.desc')}</p>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="tutorial__stage" ref={stageRef} style={{ backgroundImage: `url(${panoramaImage})` }}>
            <div className="tutorial__hud">
              <span>{t('howItWorks.hud.score')}</span>
              <span>
                {t('howItWorks.hud.clock')} · <b>{t('howItWorks.hud.roshan')}</b>
              </span>
            </div>
            <div className="tutorial__log">
              {log.map((line) => (
                <div key={`${line.who}${line.text}`}>
                  <span className={line.tone}>{line.who}</span> {line.text}
                </div>
              ))}
            </div>
            <div className={boxClass}>
              <span className="ch">{t('howItWorks.channel')}</span>
              <span className="whitespace-pre">{typed}</span>
              <span className="stage__caret" />
            </div>
            <div className={cn('tutorial__keys', keysVisible && 'tutorial__keys--on')}>
              <Kbd keys={hotkeyKeys} pressed={pressed} size="sm" />
              <span>{keyMessage}</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default HowItWorks
