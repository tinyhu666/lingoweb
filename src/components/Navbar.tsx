import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import BrandLogo from '@/components/ui/BrandLogo'
import { NAV_SECTIONS } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { useScrollProgress } from '@/hooks/useScrollProgress'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { progress, scrollY } = useScrollProgress()
  const { t } = useTranslation()
  const scrolled = scrollY > 100

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuOpen(false)
      }
    }

    mediaQuery.addEventListener('change', closeMenuOnDesktop)

    return () => {
      mediaQuery.removeEventListener('change', closeMenuOnDesktop)
    }
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-4">
        <div className="page-shell">
          <div
            className={cn(
              'neon-border w-full rounded-[8px] border border-white/10 bg-[#050b16]/52 transition duration-300 backdrop-blur-2xl',
              scrolled ? 'shadow-[0_18px_56px_rgba(0,0,0,0.34)]' : 'shadow-[0_12px_34px_rgba(0,0,0,0.18)]',
            )}>
            <div className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
              <a className="group flex items-center pr-4" href="#top" onClick={() => setMenuOpen(false)}>
                <BrandLogo className="h-12 brightness-125 drop-shadow-[0_0_22px_rgba(36,217,255,0.2)] transition duration-200 group-hover:opacity-90" />
              </a>

              <div className="hidden lg:ml-auto lg:flex lg:items-center lg:gap-4">
                <nav className="flex items-center justify-end gap-1 text-sm text-cyan-50/70">
                  {NAV_SECTIONS.map((item) => (
                    <a
                      key={item.key}
                      className="group relative inline-flex items-center overflow-hidden rounded-[8px] px-4 py-2 transition hover:text-white"
                      href={item.href}
                      onClick={() => setMenuOpen(false)}>
                      <span className="pointer-events-none absolute inset-0 rounded-[8px] bg-white/8 opacity-0 transition duration-200 group-hover:opacity-100" />
                      <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/90 to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
                      <span className="relative z-10">{t(`navbar.links.${item.key}`)}</span>
                    </a>
                  ))}
                </nav>

                <LanguageSwitcher />
              </div>

              <button
                aria-label={menuOpen ? t('navbar.closeMenu') : t('navbar.menu')}
                className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-[8px] border border-white/12 bg-white/8 text-cyan-50 shadow-[0_12px_24px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:right-5 lg:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                type="button">
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            <div
              className="h-px rounded-full bg-[linear-gradient(90deg,rgba(36,217,255,0.2),rgba(183,66,255,0.76),rgba(255,188,92,0.52))] transition-[width]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.button
            aria-label={t('navbar.closeMenu')}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            transition={{ duration: 0.2 }}
            type="button"
            animate={{ opacity: 1 }}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-x-0 top-24 z-40 lg:hidden"
            exit={{ opacity: 0, y: -12 }}
            initial={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}>
            <div className="page-shell">
              <div className="glass-panel rounded-[8px] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.38)]">
                <div className="flex flex-col gap-3">
                  {NAV_SECTIONS.map((item) => (
                    <a
                      key={item.key}
                      className="group relative overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm font-medium text-cyan-50/78"
                      href={item.href}
                      onClick={() => setMenuOpen(false)}>
                      <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-white/8 opacity-0 transition duration-200 group-hover:opacity-100" />
                      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
                      <span className="relative z-10">{t(`navbar.links.${item.key}`)}</span>
                    </a>
                  ))}
                </div>

                <div className="mt-4">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Navbar
