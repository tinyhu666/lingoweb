import { startTransition } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'

const LANGUAGES = ['zh', 'en', 'ru'] as const

function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n, t } = useTranslation()
  const reduceMotion = useReducedMotion()

  return (
    <div aria-label={t('languageSwitcher.aria')} className={cn('segmented', className)} role="group">
      {LANGUAGES.map((language) => {
        const active = i18n.resolvedLanguage === language

        return (
          <button
            aria-pressed={active}
            className={cn('segmented__item', active && 'is-on')}
            key={language}
            onClick={() => {
              startTransition(() => {
                void i18n.changeLanguage(language)
              })
            }}
            title={t(`languageSwitcher.languages.${language}.name`)}
            type="button">
            {active ? (
              <motion.span
                aria-hidden="true"
                className="segmented__pill"
                layoutId="language-switcher-pill"
                transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
              />
            ) : null}
            <span className="relative z-10">{t(`languageSwitcher.languages.${language}.short`)}</span>
          </button>
        )
      })}
    </div>
  )
}

export default LanguageSwitcher
