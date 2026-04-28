import { startTransition } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'

const LANGUAGES = ['zh', 'en', 'ru'] as const

function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  return (
    <motion.div
      aria-label={t('languageSwitcher.aria')}
      className="relative inline-flex items-center gap-1 overflow-hidden rounded-full bg-white/[0.06] p-1 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
      {LANGUAGES.map((language) => {
        const active = i18n.resolvedLanguage === language

        return (
          <div className="group relative" key={language}>
            {active ? (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-cyan-300/22 shadow-[0_0_20px_rgba(36,217,255,0.28)]"
                layoutId="language-switcher-pill"
                transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              />
            ) : null}
            <span className="pointer-events-none absolute inset-0 rounded-full bg-white/8 opacity-0 transition duration-200 group-hover:opacity-100" />
            <motion.button
              className={cn(
                'relative rounded-full px-3 py-2 text-xs font-semibold tracking-[0.08em] uppercase transition hover:text-white',
                active ? 'text-cyan-50' : 'text-cyan-50/62',
              )}
              onClick={() => {
                startTransition(() => {
                  void i18n.changeLanguage(language)
                })
              }}
              type="button"
              whileHover={{ y: active ? 0 : -1 }}
              whileTap={{ scale: 0.98 }}>
              {t(`languageSwitcher.languages.${language}.short`)}
            </motion.button>
          </div>
        )
      })}
    </motion.div>
  )
}

export default LanguageSwitcher
