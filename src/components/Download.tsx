import type { ReactNode } from 'react'
import { Download as DownloadIcon, FileArchive, Laptop, Monitor } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import SectionHeading from '@/components/ui/SectionHeading'
import mapImage from '@/assets/backdrops/download-map.jpg'
import type { ReleaseInfo } from '@/lib/release'
import type { PlatformId } from '@/lib/platform'
import { cn } from '@/lib/cn'

type DownloadProps = {
  release: ReleaseInfo
  preferredPlatform: PlatformId
}

function Download({ release, preferredPlatform }: DownloadProps) {
  const { t } = useTranslation()

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
        <SectionHeading align="center" eyebrow={t('download.eyebrow')} subtitle={t('download.subtitle')} title={t('download.title')} />

        <div className="mx-auto mt-10 grid max-w-[56rem] gap-4 md:grid-cols-2">
          <PlatformCard
            button={t('download.windows.button')}
            href={release.downloads.windows}
            icon={<Monitor />}
            meta={t('download.windows.meta')}
            preferred={preferredPlatform === 'windows'}
            recommendedLabel={t('download.recommended')}
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
            requirement={t('download.macos.requirement')}
            title={t('download.macos.title')}
          />
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
  requirement: string
  secondary?: ReactNode
  title: string
}) {
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

      <div className="mt-2 flex flex-col gap-2">
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
