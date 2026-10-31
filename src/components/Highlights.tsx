import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Chip from '@/components/ui/Chip'
import screenEn from '@/assets/screens/client-home-en.jpg'
import screenRu from '@/assets/screens/client-home-ru.jpg'
import screenZh from '@/assets/screens/client-home-zh.jpg'
import { GITHUB_RELEASES_URL } from '@/lib/constants'
import { formatReleaseDate, type ReleaseInfo } from '@/lib/release'

type HighlightItem = { title: string; desc: string }

const SCREENSHOTS: Record<string, string> = {
  zh: screenZh,
  en: screenEn,
  ru: screenRu,
}

function Highlights({ release }: { release: ReleaseInfo }) {
  const { i18n, t } = useTranslation()
  const language = i18n.resolvedLanguage || 'en'
  const items = t('highlights.items', { returnObjects: true }) as unknown as HighlightItem[]
  const screenshot = SCREENSHOTS[language] ?? screenEn
  const releaseDate = formatReleaseDate(release.publishedAt, language)

  return (
    <AnimatedSection id="whats-new">
      <div className="page-shell grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
        <div className="flex flex-col gap-6">
          <span className="section-eyebrow">{t('highlights.eyebrow')}</span>
          <h2 className="section-title max-w-[22ch]">{t('highlights.title')}</h2>
          <p className="section-copy">{t('highlights.subtitle')}</p>

          <ol className="mt-2 flex flex-col gap-3">
            {items.map((item, index) => (
              <li className="surface flex gap-4 p-4" key={item.title}>
                <span className="icon-tile font-hud text-[0.78rem] font-bold">{String(index + 1).padStart(2, '0')}</span>
                <div className="min-w-0">
                  <h3 className="m-0 text-[1rem] font-extrabold text-ink-0">{item.title}</h3>
                  <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-2">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-2">
            <Chip hud tone="sig">
              {t('highlights.versionLabel')} · v{release.version}
            </Chip>
            {releaseDate ? (
              <Chip hud>
                {t('highlights.dateLabel')} · {releaseDate}
              </Chip>
            ) : null}
            <a className="footer-link ml-auto font-semibold text-sig hover:text-ink-0" href={GITHUB_RELEASES_URL} rel="noreferrer" target="_blank">
              {t('highlights.changelog')}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(47,111,255,0.22),transparent)] blur-2xl" />
          <div className="window-frame">
            <img alt={t('highlights.screenshotAlt')} decoding="async" height={900} loading="lazy" src={screenshot} width={1600} />
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default Highlights
