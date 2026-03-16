import { startTransition } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'

const LANGUAGES = ['zh', 'en', 'ru'] as const

function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  return (
    <div
      aria-label={t('languageSwitcher.aria')}
      className="glass-subtle inline-flex items-center gap-1 rounded-full p-1">
      {LANGUAGES.map((language) => {
        const active = i18n.resolvedLanguage === language

        return (
          <button
            key={language}
            className={cn(
              'rounded-full px-3 py-2 text-xs font-semibold tracking-[0.12em] uppercase transition hover:text-white',
              active
                ? 'bg-white text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.22)]'
                : 'text-white/62',
            )}
            onClick={() => {
              startTransition(() => {
                void i18n.changeLanguage(language)
              })
            }}
            type="button">
            {t(`languageSwitcher.languages.${language}.short`)}
          </button>
        )
      })}
    </div>
  )
}

export default LanguageSwitcher
