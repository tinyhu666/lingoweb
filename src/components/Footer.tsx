import { useTranslation } from 'react-i18next'
import { DISCORD_URL, NAV_SECTIONS } from '@/lib/constants'
import appIcon from '@/assets/app-icon.png'

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
    <footer className="page-shell mt-10 pb-12">
      <div
        className="glass-panel relative overflow-hidden rounded-[2rem] px-6 py-8 sm:px-8">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent opacity-80" />
        <div className="pointer-events-none absolute inset-x-12 bottom-0 h-20 rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.16),rgba(129,140,248,0.1)_46%,transparent_76%)] opacity-70 blur-3xl" />

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.95fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                alt={t('brand.appIconAlt')}
                className="h-10 w-10 rounded-xl object-cover sm:h-11 sm:w-11"
                src={appIcon}
              />
              <span className="text-[1.35rem] font-semibold tracking-[-0.04em] text-white drop-shadow-[0_8px_26px_rgba(3,8,18,0.38)]">
                {t('brand.name')}
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">{t('footer.tagline')}</p>
            <p className="mt-5 text-sm font-medium text-white/84">{t('footer.version', { version })}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white/94">{t('footer.product.title')}</p>
            <div className="mt-4 flex flex-col gap-1 text-sm text-white/72">
              <FooterNavLink href={getSectionHref('features')} label={t('footer.product.features')} />
              <FooterNavLink href={getSectionHref('supportedGames')} label={t('footer.product.supportedGames')} />
              <FooterNavLink href={getSectionHref('howItWorks')} label={t('footer.product.workflow')} />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white/94">{t('footer.community.title')}</p>
            <div className="mt-4 flex flex-col gap-1 text-sm text-white/72">
              <FooterNavLink external href={DISCORD_URL} label={t('footer.community.discord')} />
              <FooterInfoItem label={t('footer.community.qqGroup')} />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/8 pt-6 text-sm text-white/54">
          {t('footer.copyright', { year })}
        </div>
      </div>
    </footer>
  )
}

function FooterNavLink({ external = false, href, label }: { external?: boolean; href: string; label: string }) {
  return (
    <a
      className="group relative inline-flex w-fit items-center overflow-hidden rounded-full py-1.5 transition hover:text-white"
      href={href}
      rel={external ? 'noreferrer' : undefined}
      target={external ? '_blank' : undefined}>
      <span className="pointer-events-none absolute -inset-y-0 -inset-x-2 rounded-full bg-white/6 opacity-0 transition duration-200 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -inset-x-1 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
      <span className="relative z-10">{label}</span>
    </a>
  )
}

function FooterInfoItem({ label }: { label: string }) {
  return <div className="inline-flex w-fit rounded-full py-1.5 text-white/72">{label}</div>
}

export default Footer
