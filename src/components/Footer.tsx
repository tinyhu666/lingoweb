import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { FileText, Github, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CHANGELOG_URL, DISCORD_URL, LICENSE_URL, NAV_SECTIONS, RELEASES_URL, REPO_URL } from '@/lib/constants'
import logoHorizontal from '@/assets/lingo-logo-horizontal.svg'

type FooterProps = {
  version: string
}

function getSectionHref(key: (typeof NAV_SECTIONS)[number]['key']) {
  return NAV_SECTIONS.find((section) => section.key === key)?.href ?? '#'
}

function Footer({ version }: FooterProps) {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto mt-10 w-full max-w-7xl px-5 pb-12 sm:px-8 lg:px-10">
      <motion.div
        className="glass-panel relative overflow-hidden rounded-[2rem] px-6 py-8 sm:px-8"
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -2 }}>
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent opacity-80" />
        <div className="pointer-events-none absolute inset-x-12 bottom-0 h-20 rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.16),rgba(129,140,248,0.1)_46%,transparent_76%)] opacity-70 blur-3xl" />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.8fr]">
          <div>
            <img alt={t('brand.logoAlt')} className="h-10 w-auto" src={logoHorizontal} />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/64">{t('footer.tagline')}</p>
            <p className="mt-5 text-sm font-medium text-white/78">{t('footer.version', { version })}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">{t('footer.product.title')}</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/66">
              <FooterNavLink href={getSectionHref('features')} label={t('footer.product.features')} />
              <FooterNavLink href={getSectionHref('supportedGames')} label={t('footer.product.supportedGames')} />
              <FooterNavLink href={getSectionHref('howItWorks')} label={t('footer.product.workflow')} />
              <FooterNavLink href={getSectionHref('download')} label={t('footer.product.download')} />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">{t('footer.community.title')}</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/66">
              <FooterLink href={REPO_URL} icon={<Github className="h-4 w-4" />} label={t('footer.community.github')} />
              <FooterLink href={DISCORD_URL} icon={<MessageCircle className="h-4 w-4" />} label={t('footer.community.discord')} />
              <FooterLink href={RELEASES_URL} icon={<FileText className="h-4 w-4" />} label={t('footer.community.releases')} />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">{t('footer.legal.title')}</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/66">
              <FooterNavLink external href={LICENSE_URL} label={t('footer.legal.license')} />
              <FooterNavLink external href={CHANGELOG_URL} label={t('footer.legal.changelog')} />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/8 pt-6 text-sm text-white/48">
          {t('footer.copyright', { year })}
        </div>
      </motion.div>
    </footer>
  )
}

function FooterNavLink({ external = false, href, label }: { external?: boolean; href: string; label: string }) {
  return (
    <a
      className="group relative inline-flex w-fit items-center overflow-hidden rounded-full px-2 py-1.5 transition hover:text-white"
      href={href}
      rel={external ? 'noreferrer' : undefined}
      target={external ? '_blank' : undefined}>
      <span className="pointer-events-none absolute inset-0 rounded-full bg-white/6 opacity-0 transition duration-200 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
      <span className="relative z-10">{label}</span>
    </a>
  )
}

function FooterLink({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <a
      className="group relative inline-flex w-fit items-center gap-2 overflow-hidden rounded-full px-2 py-1.5 transition hover:text-white"
      href={href}
      rel="noreferrer"
      target="_blank">
      <span className="pointer-events-none absolute inset-0 rounded-full bg-white/6 opacity-0 transition duration-200 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </span>
    </a>
  )
}

export default Footer
