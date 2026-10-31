import type { ReactNode } from 'react'
import { ArrowUpRight, Download as DownloadIcon, FileArchive, Laptop, Monitor } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import SectionHeading from '@/components/ui/SectionHeading'
import mapImage from '@/assets/backdrops/download-map.jpg'
import { COS_PUBLIC_BASE_URL, GITHUB_RELEASES_URL } from '@/lib/constants'
import { formatReleaseDate, parseReleaseNotes, type ReleaseInfo } from '@/lib/release'
import type { PlatformId } from '@/lib/platform'
import { cn } from '@/lib/cn'

type DownloadProps = {
  release: ReleaseInfo
  preferredPlatform: PlatformId
}

function Download({ release, preferredPlatform }: DownloadProps) {
  const { i18n, t } = useTranslation()
  const language = i18n.resolvedLanguage || 'en'
  const releaseDate = formatReleaseDate(release.publishedAt, language)
  const bundledNotes = t('download.notes', { returnObjects: true }) as unknown as string[]
  const manifestNotes = parseReleaseNotes(release.notes)
  const notes = manifestNotes.length > 0 ? manifestNotes : bundledNotes

  return (
    <AnimatedSection className="relative isolate overflow-hidden" id="download">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img
          alt=""
          className="h-full w-full object-cover object-center opacity-30 [mask-image:linear-gradient(180deg,transparent,black_20%,black_80%,transparent)]"
          decoding="async"
          loading="lazy"
          src={mapImage}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,18,0.7),rgba(10,12,18,0.85))]" />
      </div>

      <div className="page-shell py-6 sm:py-10">
        <SectionHeading
          align="center"
          aside={null}
          eyebrow={t('download.eyebrow')}
          subtitle={t('download.subtitle')}
          title={t('download.title')}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <PlatformCard
            button={t('download.windows.button')}
            href={release.downloads.windows}
            icon={<Monitor />}
            meta={t('download.windows.meta')}
            preferred={preferredPlatform === 'windows'}
            recommendedLabel={t('download.recommended')}
            release={release}
            releaseDate={releaseDate}
            requirement={t('download.windows.requirement')}
            secondary={
              release.downloads.windowsPortable ? (
                <Button download href={release.downloads.windowsPortable} size="sm" variant="ghost">
                  <FileArchive />
                  {t('download.windows.portable')}
                </Button>
              ) : null
            }
            title={t('download.windows.title')}
          />
          <PlatformCard
            button={t('download.macos.button')}
            href={release.downloads.macos}
            icon={<Laptop />}
            meta={t('download.macos.meta')}
            preferred={preferredPlatform === 'macos'}
            recommendedLabel={t('download.recommended')}
            release={release}
            releaseDate={releaseDate}
            requirement={t('download.macos.requirement')}
            title={t('download.macos.title')}
          />
        </div>

        <div className="download-card mt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="m-0 text-lg font-extrabold text-ink-0">{t('download.notesTitle', { version: release.version })}</h3>
            <ul className="note-list">
              {notes.map((note) => (
                <li key={note}>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2 border-t border-white/8 pt-4 text-sm lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <a className="footer-link font-semibold text-ink-0" href={GITHUB_RELEASES_URL} rel="noreferrer" target="_blank">
              {t('download.github')}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <span className="text-ink-3">{t('download.githubDesc')}</span>
            <a className="footer-link mt-2 text-xs" href={`${COS_PUBLIC_BASE_URL}/releases/latest-web.json`} rel="noreferrer" target="_blank">
              {t('download.mirror')}
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

function PlatformCard({
  button,
  href,
  icon,
  meta,
  preferred,
  recommendedLabel,
  release,
  releaseDate,
  requirement,
  secondary,
  title,
}: {
  button: string
  href: string
  icon: ReactNode
  meta: string
  preferred: boolean
  recommendedLabel: string
  release: ReleaseInfo
  releaseDate: string | null
  requirement: string
  secondary?: ReactNode
  title: string
}) {
  const { t } = useTranslation()

  return (
    <div className={cn('download-card', preferred && 'download-card--preferred')}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="icon-tile">{icon}</span>
          <div>
            <h3 className="m-0 text-lg font-extrabold text-ink-0">{title}</h3>
            <p className="m-0 text-sm text-ink-2">{meta}</p>
          </div>
        </div>
        {preferred ? (
          <Chip dot tone="ok">
            {recommendedLabel}
          </Chip>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Chip hud tone="sig">
          {t('download.latestVersion')} · v{release.version}
        </Chip>
        {releaseDate ? (
          <Chip hud>
            {t('download.releasedOn')} · {releaseDate}
          </Chip>
        ) : null}
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <Button className="w-full" download href={href} size="lg" variant={preferred ? 'primary' : 'secondary'}>
          <DownloadIcon />
          {button}
        </Button>
        {secondary}
      </div>

      <p className="m-0 text-xs leading-relaxed text-ink-3">{requirement}</p>
    </div>
  )
}

export default Download
