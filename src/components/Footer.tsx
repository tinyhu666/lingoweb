import { useState, type ReactNode } from 'react'
import { ArrowUpRight, Check, Copy, Mail, MessageSquare } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import BrandLogo from '@/components/ui/BrandLogo'
import { APP_VERSION, CONTACT_EMAIL, DISCORD_URL, GITHUB_REPO_URL, NAV_SECTIONS, QQ_GROUP_ID } from '@/lib/constants'

function Footer() {
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
    <footer className="page-shell mt-6 pb-10">
      <div className="surface surface-glass overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-acc/14 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.7fr_1.1fr]">
          <div>
            <BrandLogo version={APP_VERSION} />
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-ink-2">{t('footer.tagline')}</p>
          </div>

          <div>
            <p className="m-0 font-hud text-[0.7rem] uppercase tracking-[0.14em] text-ink-3">{t('footer.product.title')}</p>
            <nav className="mt-4 flex flex-col gap-1">
              {NAV_SECTIONS.map((item) => (
                <a className="footer-link" href={item.href} key={item.key}>
                  {t(`navbar.links.${item.key}`)}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="m-0 font-hud text-[0.7rem] uppercase tracking-[0.14em] text-ink-3">{t('footer.community.title')}</p>
            <div className="mt-4 grid gap-2">
              <ContactRow
                action={
                  <a className="btn btn--sm" href={DISCORD_URL} rel="noreferrer" target="_blank">
                    {t('footer.community.discord.action')}
                    <ArrowUpRight />
                  </a>
                }
                description={t('footer.community.discord.desc')}
                icon={<DiscordIcon />}
                title={t('footer.community.discord.title')}
              />
              <ContactRow
                action={
                  <button className="btn btn--sm" onClick={() => void handleCopyQQGroup()} type="button">
                    {copied ? <Check /> : <Copy />}
                    {copied ? t('footer.community.qq.copied') : t('footer.community.qq.action')}
                  </button>
                }
                description={t('footer.community.qq.desc')}
                icon={<MessageSquare />}
                title={t('footer.community.qq.title', { id: QQ_GROUP_ID })}
              />
              <ContactRow
                action={
                  <a className="btn btn--sm" href={`mailto:${CONTACT_EMAIL}`}>
                    {t('footer.community.email.action')}
                    <ArrowUpRight />
                  </a>
                }
                description={CONTACT_EMAIL}
                icon={<Mail />}
                title={t('footer.community.email.title')}
              />
              <ContactRow
                action={
                  <a className="btn btn--sm" href={GITHUB_REPO_URL} rel="noreferrer" target="_blank">
                    {t('footer.community.github.action')}
                    <ArrowUpRight />
                  </a>
                }
                description={t('footer.community.github.desc')}
                icon={<GitHubIcon />}
                title={t('footer.community.github.title')}
              />
            </div>
          </div>
        </div>

        <div className="relative mt-8 flex flex-col gap-2 border-t border-white/8 pt-5 text-xs leading-relaxed text-ink-3 sm:flex-row sm:items-start sm:justify-between">
          <span>{t('footer.legal.copyright', { year })}</span>
          <span className="max-w-[34rem] sm:text-right">{t('footer.legal.valve')}</span>
        </div>
      </div>
    </footer>
  )
}

function ContactRow({ action, description, icon, title }: { action: ReactNode; description: string; icon: ReactNode; title: string }) {
  return (
    <div className="contact-row">
      <span className="icon-tile">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[0.92rem] font-bold text-ink-0">{title}</div>
        <div className="truncate text-xs text-ink-2">{description}</div>
      </div>
      {action}
    </div>
  )
}

function DiscordIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.2.4a18 18 0 0 1 4.5 2.2 15.6 15.6 0 0 0-5.5-1.7 16 16 0 0 0-4.4 0 15.6 15.6 0 0 0-5.5 1.7A18 18 0 0 1 8.8 3.4L8.6 3a19.7 19.7 0 0 0-4.9 1.4C.6 9 .1 13.3.3 17.6a19.9 19.9 0 0 0 6 3l1.2-1.9a12.9 12.9 0 0 1-2-.9l.5-.4a14.2 14.2 0 0 0 12 0l.5.4-2 .9 1.2 1.9a19.8 19.8 0 0 0 6-3c.3-4.9-.6-9.2-3.4-13.2ZM8.6 15c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4c1.2 0 2.2 1.1 2.1 2.4 0 1.3-.9 2.4-2.1 2.4Zm6.8 0c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4c1.2 0 2.2 1.1 2.1 2.4 0 1.3-.9 2.4-2.1 2.4Z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.5 11.5 0 0 0 7.9-10.9A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

export default Footer
