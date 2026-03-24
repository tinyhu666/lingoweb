import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { NAV_SECTIONS } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import appIcon from '@/assets/app-icon.png'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { progress, scrollY } = useScrollProgress()
  const { t } = useTranslation()
  const scrolled = scrollY > 100

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-4">
        <div className="page-shell">
          <div
            className={cn(
              'w-full rounded-full border border-white/8 transition duration-300',
              scrolled ? 'glass-panel bg-black/45' : 'bg-transparent',
            )}>
            <div className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
              <a className="group flex items-center gap-3 pr-4" href="#top" onClick={() => setMenuOpen(false)}>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-[1.35rem] border border-white/14 bg-white/[0.05] p-1 shadow-[0_16px_36px_rgba(3,8,18,0.24)] ring-1 ring-inset ring-cyan-100/10 sm:h-14 sm:w-14">
                  <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_30%_22%,rgba(125,211,252,0.2),transparent_58%),radial-gradient(circle_at_75%_78%,rgba(217,70,239,0.16),transparent_55%)]" />
                  <img
                    alt={t('brand.appIconAlt')}
                    className="relative h-full w-full rounded-[1rem] object-cover shadow-[0_12px_28px_rgba(3,8,18,0.18)]"
                    src={appIcon}
                  />
                </span>
                <span className="text-base font-semibold tracking-[-0.04em] text-white drop-shadow-[0_8px_24px_rgba(3,8,18,0.38)] transition duration-200 group-hover:text-cyan-50 sm:text-[1.05rem]">
                  {t('brand.name')}
                </span>
              </a>

              <div className="hidden lg:ml-auto lg:flex lg:items-center lg:gap-4">
                <nav className="flex items-center justify-end gap-1 text-sm text-white/72">
                  {NAV_SECTIONS.map((item) => (
                    <a
                      key={item.key}
                      className="group relative inline-flex items-center overflow-hidden rounded-full px-4 py-2 transition hover:text-white"
                      href={item.href}
                      onClick={() => setMenuOpen(false)}>
                      <span className="pointer-events-none absolute inset-0 rounded-full bg-white/6 opacity-0 transition duration-200 group-hover:opacity-100" />
                      <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
                      <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-300/80 to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
                      <span className="relative z-10">{t(`navbar.links.${item.key}`)}</span>
                    </a>
                  ))}
                </nav>

                <LanguageSwitcher />
              </div>

              <button
                aria-label={menuOpen ? t('navbar.closeMenu') : t('navbar.menu')}
                className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/16 bg-white/12 text-white shadow-[0_12px_30px_rgba(3,8,18,0.2)] backdrop-blur-xl sm:right-5 lg:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                type="button">
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            <div
              className="h-px rounded-full bg-[linear-gradient(90deg,rgba(99,102,241,0.5),rgba(34,211,238,0.35),rgba(217,70,239,0.45))] transition-[width]"
              style={{ width: `${Math.max(progress * 100, 6)}%` }}
            />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-x-0 top-24 z-40 lg:hidden"
            exit={{ opacity: 0, y: -12 }}
            initial={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}>
            <div className="page-shell">
              <div className="glass-panel rounded-[2rem] p-4">
                <div className="flex flex-col gap-3">
                  {NAV_SECTIONS.map((item) => (
                    <a
                      key={item.key}
                      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm font-medium text-white/84"
                      href={item.href}
                      onClick={() => setMenuOpen(false)}>
                      <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-white/6 opacity-0 transition duration-200 group-hover:opacity-100" />
                      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
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
