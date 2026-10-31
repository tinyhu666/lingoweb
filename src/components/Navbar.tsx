import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { Download, Menu, X } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import BrandLogo from '@/components/ui/BrandLogo'
import { APP_VERSION, NAV_SECTIONS, type NavSectionKey } from '@/lib/constants'
import { cn } from '@/lib/cn'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeKey, setActiveKey] = useState<NavSectionKey | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Track which section is in view so the matching link lights up.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return
    }
    const entries = NAV_SECTIONS.map((item) => ({ key: item.key, node: document.querySelector<HTMLElement>(item.href) })).filter(
      (item): item is { key: NavSectionKey; node: HTMLElement } => Boolean(item.node),
    )
    const visible = new Map<NavSectionKey, number>()
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          const match = entries.find((item) => item.node === record.target)
          if (!match) continue
          if (record.isIntersecting) {
            visible.set(match.key, record.intersectionRatio)
          } else {
            visible.delete(match.key)
          }
        }
        let best: NavSectionKey | null = null
        let bestRatio = 0
        for (const [key, ratio] of visible) {
          if (ratio > bestRatio) {
            best = key
            bestRatio = ratio
          }
        }
        setActiveKey(best)
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.1, 0.25, 0.5] },
    )
    entries.forEach((item) => observer.observe(item.node))
    return () => observer.disconnect()
  }, [])

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
      <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
        <div className="page-shell">
          <div className={cn('nav-bar', scrolled && 'nav-bar--scrolled')}>
            <div className="flex items-center justify-between gap-4 px-3.5 py-2.5 sm:px-4">
              <a className="flex items-center" href="#top" onClick={() => setMenuOpen(false)}>
                <BrandLogo version={APP_VERSION} />
              </a>

              <nav className="hidden items-center gap-1 lg:flex">
                {NAV_SECTIONS.map((item) => (
                  <a className={cn('nav-link', activeKey === item.key && 'nav-link--active')} href={item.href} key={item.key}>
                    {t(`navbar.links.${item.key}`)}
                  </a>
                ))}
              </nav>

              <div className="hidden items-center gap-3 lg:flex">
                <LanguageSwitcher />
                <a className="btn btn--primary btn--sm" href="#download">
                  <Download />
                  {t('navbar.download')}
                </a>
              </div>

              <button
                aria-expanded={menuOpen}
                aria-label={menuOpen ? t('navbar.closeMenu') : t('navbar.menu')}
                className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04] text-ink-0 lg:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                type="button">
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.button
            animate={{ opacity: 1 }}
            aria-label={t('navbar.closeMenu')}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            transition={{ duration: 0.2 }}
            type="button"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-x-0 top-20 z-40 lg:hidden"
            exit={{ opacity: 0, y: -10 }}
            initial={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}>
            <div className="page-shell">
              <div className="surface surface-glass p-3">
                <nav className="flex flex-col gap-1">
                  {NAV_SECTIONS.map((item) => (
                    <a className="nav-link h-11 text-[1rem]" href={item.href} key={item.key} onClick={() => setMenuOpen(false)}>
                      {t(`navbar.links.${item.key}`)}
                    </a>
                  ))}
                </nav>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/8 pt-3">
                  <LanguageSwitcher />
                  <a className="btn btn--primary btn--sm" href="#download" onClick={() => setMenuOpen(false)}>
                    <Download />
                    {t('navbar.download')}
                  </a>
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
