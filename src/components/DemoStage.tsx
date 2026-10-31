import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Kbd from '@/components/ui/Kbd'
import stagePhoto from '@/assets/backdrops/stage-dota2.jpg'
import minimapPhoto from '@/assets/backdrops/minimap-dota2.jpg'
import { cn } from '@/lib/cn'

type DemoLine = { source: string; target: string; mate: string; reply: string }
type IntroLine = { who: string; text: string }

type DemoStageProps = {
  hotkeyKeys: string[]
  className?: string
}

const SCENE = { teamA: 'Radiant', teamB: 'Dire', score: '23 : 19' }
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/|#%&*+=-'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * The looping "type → hotkey → replace → send" demo from the client's 1.0 home
 * screen. Runs on refs rather than state so the animation never re-renders the
 * page, and pauses while scrolled out of view.
 */
function DemoStage({ hotkeyKeys, className }: DemoStageProps) {
  const { t } = useTranslation()
  const rootRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const keysRef = useRef<HTMLDivElement>(null)
  const enterRef = useRef<HTMLDivElement>(null)
  const sweepRef = useRef<HTMLSpanElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const hiddenRef = useRef(false)

  useEffect(() => {
    const node = rootRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        hiddenRef.current = !entry.isIntersecting
      },
      { threshold: 0.05 },
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let cancelled = false
    const reduce = prefersReducedMotion()
    const lines = t('stage.lines', { returnObjects: true }) as unknown as DemoLine[]
    const intro = t('stage.intro', { returnObjects: true }) as unknown as IntroLine
    const youLabel = t('stage.you')

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms)
      })
    const guard = () => {
      if (cancelled) {
        throw new Error('stage-cancelled')
      }
    }
    const waitUntilVisible = async () => {
      while (hiddenRef.current) {
        guard()
        await wait(400)
      }
    }

    const setStep = (step: number) => {
      const spans = stepsRef.current?.querySelectorAll('span') ?? []
      spans.forEach((span, index) => {
        span.classList.toggle('is-on', index === step)
        span.classList.toggle('is-done', index < step)
      })
    }

    const typeText = async (text: string, ms: number) => {
      const el = textRef.current
      if (!el) {
        return
      }
      if (reduce) {
        el.textContent = text
        return
      }
      el.textContent = ''
      for (const char of text) {
        guard()
        el.textContent += char
        await wait(ms)
      }
    }

    const scramble = (target: string, duration = 1000) =>
      new Promise<void>((resolve) => {
        const el = textRef.current
        if (!el || reduce) {
          if (el) {
            el.textContent = target
          }
          resolve()
          return
        }
        const length = target.length
        const start = performance.now()
        const frame = (now: number) => {
          if (cancelled) {
            resolve()
            return
          }
          const elapsed = now - start
          let out = ''
          for (let index = 0; index < length; index += 1) {
            const settle = 260 + index * ((duration - 320) / length)
            out += elapsed >= settle || target[index] === ' ' ? target[index] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          }
          el.textContent = out
          if (elapsed < duration) {
            requestAnimationFrame(frame)
          } else {
            el.textContent = target
            resolve()
          }
        }
        requestAnimationFrame(frame)
      })

    const addLine = (cls: string, who: string, text: string) => {
      const log = logRef.current
      if (!log) {
        return
      }
      const line = document.createElement('div')
      line.className = `stage__line ${cls}`
      const whoEl = document.createElement('span')
      whoEl.className = 'who'
      whoEl.textContent = who
      const msgEl = document.createElement('span')
      msgEl.textContent = text
      line.append(whoEl, msgEl)
      log.appendChild(line)
      while (log.children.length > 3) {
        log.firstChild?.remove()
      }
      Array.from(log.children)
        .slice(0, -1)
        .forEach((node) => node.classList.add('stage__line--fade'))
    }

    const setClasses = (el: HTMLElement | null, add: string[] = [], remove: string[] = []) => {
      if (!el) {
        return
      }
      remove.forEach((cls) => el.classList.remove(cls))
      add.forEach((cls) => el.classList.add(cls))
    }

    const pressKeys = async (container: HTMLElement | null) => {
      const caps = container?.querySelectorAll('.lg-kbd') ?? []
      caps.forEach((cap) => cap.classList.add('lg-kbd--press'))
      await wait(240)
      caps.forEach((cap) => cap.classList.remove('lg-kbd--press'))
    }

    if (logRef.current) {
      logRef.current.innerHTML = ''
    }
    if (textRef.current) {
      textRef.current.textContent = ''
    }
    addLine('stage__line--mate', intro.who, intro.text)

    const loop = async () => {
      let index = 0
      while (!cancelled) {
        await waitUntilVisible()
        const line = lines[index % lines.length]
        index += 1

        setStep(0)
        setClasses(inputRef.current, [], ['stage__input--hot', 'stage__input--ping', 'stage__input--busy', 'stage__input--done'])
        textRef.current?.classList.remove('stage__text--scr')
        await wait(500)
        await typeText(line.source, 75)
        await wait(650)

        setStep(1)
        setClasses(keysRef.current, ['stage__keys--show'])
        await wait(420)
        setClasses(inputRef.current, ['stage__input--hot', 'stage__input--ping', 'stage__input--busy'])
        await pressKeys(keysRef.current)
        await wait(320)
        setClasses(keysRef.current, [], ['stage__keys--show'])

        setStep(2)
        setClasses(sweepRef.current, ['stage__sweep--go'])
        textRef.current?.classList.add('stage__text--scr')
        await scramble(line.target, 1000)
        guard()
        textRef.current?.classList.remove('stage__text--scr')
        setClasses(inputRef.current, ['stage__input--done'], ['stage__input--hot', 'stage__input--ping'])
        setClasses(sweepRef.current, [], ['stage__sweep--go'])
        await wait(900)

        setStep(3)
        setClasses(enterRef.current, ['stage__keys--show'])
        await wait(380)
        await pressKeys(enterRef.current)
        addLine('stage__line--me', `[ALL] ${youLabel}:`, line.target)
        if (textRef.current) {
          textRef.current.textContent = ''
        }
        setClasses(inputRef.current, [], ['stage__input--done', 'stage__input--busy'])
        await wait(260)
        setClasses(enterRef.current, [], ['stage__keys--show'])
        await wait(700)
        addLine('stage__line--mate', `[ALLIES] ${line.mate}:`, line.reply)
        await wait(1500)
      }
    }

    loop().catch(() => {
      /* cancelled on unmount or language change */
    })

    return () => {
      cancelled = true
    }
  }, [t])

  return (
    <div className={cn('stage', className)} ref={rootRef}>
      <div aria-hidden="true" className="stage__scene">
        <div className="stage__photo" style={{ backgroundImage: `url(${stagePhoto})` }} />
        <div className="stage__shade" />
        <div className="stage__score">
          <span className="stage__team stage__team--a">{SCENE.teamA}</span>
          <span className="stage__heroes stage__heroes--a">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <b>{SCENE.score}</b>
          <span className="stage__heroes stage__heroes--b">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="stage__team stage__team--b">{SCENE.teamB}</span>
        </div>
        <div className="stage__clock">34:12</div>
        <div className="stage__feed">
          <div>
            <em className="a">Kuro</em>
            <s />
            <em className="b">Dendi</em>
          </div>
          <div>
            <em className="b">Puppey</em>
            <s />
            <em className="a">Miracle</em>
          </div>
        </div>
        <div className="stage__map">
          <div className="stage__map-photo" style={{ backgroundImage: `url(${minimapPhoto})` }} />
          <div className="stage__dots">
            <i className="a" style={{ left: '28%', top: '64%' }} />
            <i className="a" style={{ left: '34%', top: '58%' }} />
            <i className="a" style={{ left: '22%', top: '76%' }} />
            <i className="a" style={{ left: '46%', top: '52%' }} />
            <i className="b" style={{ left: '60%', top: '42%' }} />
            <i className="b" style={{ left: '68%', top: '34%' }} />
            <i className="b ping" style={{ left: '52%', top: '47%' }} />
          </div>
          <i className="stage__view" />
        </div>
      </div>

      <div className="stage__hud">
        <span>
          {t('stage.game')} · {t('stage.allChat')}
        </span>
        <b>
          <i />
          {t('stage.live')}
        </b>
      </div>

      <div className="stage__left">
        <div aria-hidden="true" className="stage__log" ref={logRef} />
        <div className="stage__inputwrap">
          <div aria-hidden="true" className="stage__input" ref={inputRef}>
            <span className="ch">[ALL]</span>
            <span className="stage__text" ref={textRef} />
            <span className="stage__caret" />
            <span className="stage__sweep" ref={sweepRef} />
          </div>
          <div aria-hidden="true" className="stage__keys" ref={keysRef}>
            <Kbd keys={hotkeyKeys} />
          </div>
          <div aria-hidden="true" className="stage__keys" ref={enterRef}>
            <Kbd keys={['Enter ↵']} />
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="stage__steps" ref={stepsRef}>
        <span className="is-on">{t('stage.steps.type')}</span>
        <i />
        <span>{t('stage.steps.hotkey')}</span>
        <i />
        <span>{t('stage.steps.replace')}</span>
        <i />
        <span>{t('stage.steps.send')}</span>
      </div>
    </div>
  )
}

export default DemoStage
