import { useState } from 'react'
import { Check, Copy, MessageCircle, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import BrandLogo from '@/components/ui/BrandLogo'
import { DISCORD_URL, NAV_SECTIONS, QQ_GROUP_ID } from '@/lib/constants'

type FooterProps = {
  version: string
}

function getSectionHref(key: (typeof NAV_SECTIONS)[number]['key']) {
  return NAV_SECTIONS.find((section) => section.key === key)?.href ?? '#'
}

function Footer({ version }: FooterProps) {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const [copied, setCopied] = useState(false)

  async function handleCopyQQGroup() {
    try {
      await navigator.clipboard.writeText(QQ_GROUP_ID)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <footer className="page-shell mt-10 pb-12">
      <div
        className="glass-panel relative overflow-hidden rounded-[8px] px-6 py-8 sm:px-8">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent opacity-80" />
        <div className="pointer-events-none absolute inset-x-12 bottom-0 h-20 rounded-[8px] bg-cyan-300/14 opacity-70 blur-3xl" />

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.95fr_0.8fr]">
          <div>
            <BrandLogo className="h-[3.25rem]" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">{t('footer.tagline')}</p>
            <p className="mt-5 text-sm font-bold text-slate-800">{t('footer.version', { version })}</p>
          </div>

          <div>
            <p className="text-sm font-extrabold text-slate-950">{t('footer.product.title')}</p>
            <div className="mt-4 flex flex-col gap-1 text-sm text-slate-600">
              <FooterNavLink href={getSectionHref('features')} label={t('footer.product.features')} />
              <FooterNavLink href={getSectionHref('supportedGames')} label={t('footer.product.supportedGames')} />
              <FooterNavLink href={getSectionHref('howItWorks')} label={t('footer.product.workflow')} />
            </div>
          </div>

          <div>
            <p className="text-sm font-extrabold text-slate-950">{t('footer.community.title')}</p>
            <div className="mt-4 grid gap-3">
              <CommunityCard
                action={
                  <Button href={DISCORD_URL} size="md" variant="secondary">
                    {t('footer.community.discordAction')}
                  </Button>
                }
                description={t('footer.community.discordDescription')}
                icon={<MessageCircle className="h-4 w-4" />}
                title={t('footer.community.discord')}
              />
              <CommunityCard
                action={
                  <Button onClick={() => void handleCopyQQGroup()} size="md" variant="secondary">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? t('footer.community.copied') : t('footer.community.copy')}
                  </Button>
                }
                description={t('footer.community.qqDescription')}
                icon={<Users className="h-4 w-4" />}
                title={t('footer.community.qqGroup')}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-500">
          {t('footer.copyright', { year })}
        </div>
      </div>
    </footer>
  )
}

function FooterNavLink({ external = false, href, label }: { external?: boolean; href: string; label: string }) {
  return (
    <a
      className="group relative inline-flex w-fit items-center overflow-hidden rounded-[8px] py-1.5 transition hover:text-slate-950"
      href={href}
      rel={external ? 'noreferrer' : undefined}
      target={external ? '_blank' : undefined}>
      <span className="pointer-events-none absolute -inset-y-0 -inset-x-2 rounded-[8px] bg-blue-50 opacity-0 transition duration-200 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -inset-x-1 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
      <span className="relative z-10">{label}</span>
    </a>
  )
}

function CommunityCard({
  action,
  description,
  icon,
  title,
}: {
  action: React.ReactNode
  description: string
  icon: React.ReactNode
  title: string
}) {
  return (
    <div className="rounded-[8px] border border-slate-200 bg-white/72 px-4 py-4 shadow-[0_14px_28px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
            <span className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-cyan-200 bg-[#effcfc] text-[#007f91]">
              {icon}
            </span>
            <span>{title}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
      <div className="mt-4">{action}</div>
    </div>
  )
}

export default Footer
