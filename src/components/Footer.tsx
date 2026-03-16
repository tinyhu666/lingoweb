import type { ReactNode } from 'react'
import { FileText, Github, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CHANGELOG_URL, DISCORD_URL, LICENSE_URL, NAV_SECTIONS, RELEASES_URL, REPO_URL } from '@/lib/constants'
import logoHorizontal from '@/assets/lingo-logo-horizontal.svg'

type FooterProps = {
  version: string
}

function Footer({ version }: FooterProps) {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto mt-10 w-full max-w-7xl px-5 pb-12 sm:px-8 lg:px-10">
      <div className="glass-panel rounded-[2rem] px-6 py-8 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.8fr]">
          <div>
            <img alt={t('brand.logoAlt')} className="h-10 w-auto" src={logoHorizontal} />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/64">{t('footer.tagline')}</p>
            <p className="mt-5 text-sm font-medium text-white/78">{t('footer.version', { version })}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">{t('footer.product.title')}</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/66">
              <a href={NAV_SECTIONS[0].href}>{t('footer.product.features')}</a>
              <a href={NAV_SECTIONS[1].href}>{t('footer.product.workflow')}</a>
              <a href={NAV_SECTIONS[2].href}>{t('footer.product.download')}</a>
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
              <a href={LICENSE_URL} rel="noreferrer" target="_blank">
                {t('footer.legal.license')}
              </a>
              <a href={CHANGELOG_URL} rel="noreferrer" target="_blank">
                {t('footer.legal.changelog')}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/8 pt-6 text-sm text-white/48">
          {t('footer.copyright', { year })}
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <a className="inline-flex items-center gap-2 transition hover:text-white" href={href} rel="noreferrer" target="_blank">
      {icon}
      <span>{label}</span>
    </a>
  )
}

export default Footer
