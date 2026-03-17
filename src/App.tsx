import { startTransition, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Download from '@/components/Download'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Navbar from '@/components/Navbar'
import SupportedGames from '@/components/SupportedGames'
import { APP_VERSION, SITE_URL } from '@/lib/constants'
import { FALLBACK_RELEASE_INFO, fetchLatestReleaseInfo } from '@/lib/release'
import { detectPreferredPlatform, type PlatformId } from '@/lib/platform'

function updateMeta(selector: string, value: string, attribute = 'content') {
  const node = document.querySelector<HTMLMetaElement>(selector)
  if (!node) {
    return
  }

  node.setAttribute(attribute, value)
}

function App() {
  const [preferredPlatform] = useState<PlatformId>(() => detectPreferredPlatform())
  const [release, setRelease] = useState(FALLBACK_RELEASE_INFO)
  const { i18n, t } = useTranslation()

  useEffect(() => {
    const title = t('meta.title')
    const description = t('meta.description')

    document.title = title
    document.documentElement.lang = i18n.resolvedLanguage || 'en'

    updateMeta('meta[name="description"]', description)
    updateMeta('meta[property="og:title"]', title)
    updateMeta('meta[property="og:description"]', description)
    updateMeta('meta[name="twitter:title"]', title)
    updateMeta('meta[name="twitter:description"]', description)
    updateMeta('meta[property="og:url"]', SITE_URL)
    updateMeta('meta[property="og:image"]', `${SITE_URL}og-image.png`)
    updateMeta('meta[name="twitter:image"]', `${SITE_URL}og-image.png`)

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) {
      canonical.href = SITE_URL
    }
  }, [i18n.resolvedLanguage, t])

  useEffect(() => {
    let active = true

    void fetchLatestReleaseInfo().then((nextRelease) => {
      if (!active) {
        return
      }

      startTransition(() => {
        setRelease(nextRelease)
      })
    })

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="relative overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-12rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.36)_0%,_rgba(129,140,248,0)_72%)] blur-3xl" />
        <div className="absolute left-[-8rem] top-[20rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(6,182,212,0.18)_0%,_rgba(6,182,212,0)_72%)] blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,_rgba(217,70,239,0.2)_0%,_rgba(217,70,239,0)_70%)] blur-3xl" />
      </div>

      <Navbar />

      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-24 px-5 pb-20 pt-28 sm:px-8 lg:px-10">
        <Hero downloads={release.downloads} preferredPlatform={preferredPlatform} version={release.version || APP_VERSION} />
        <Features />
        <SupportedGames />
        <HowItWorks />
        <Download downloads={release.downloads} preferredPlatform={preferredPlatform} version={release.version || APP_VERSION} />
      </main>

      <Footer version={release.version || APP_VERSION} />
    </div>
  )
}

export default App
