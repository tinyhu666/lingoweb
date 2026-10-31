import { startTransition, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Download from '@/components/Download'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Highlights from '@/components/Highlights'
import HowItWorks from '@/components/HowItWorks'
import Navbar from '@/components/Navbar'
import Styles from '@/components/Styles'
import SupportedGames from '@/components/SupportedGames'
import { SITE_URL } from '@/lib/constants'
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
    const keywords = t('meta.keywords')
    const language = i18n.resolvedLanguage || 'en'

    document.title = title
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : language

    updateMeta('meta[name="description"]', description)
    updateMeta('meta[name="keywords"]', keywords)
    updateMeta('meta[property="og:title"]', title)
    updateMeta('meta[property="og:description"]', description)
    updateMeta('meta[property="og:locale"]', language === 'zh' ? 'zh_CN' : language === 'ru' ? 'ru_RU' : 'en_US')
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
    <div className="relative min-h-screen overflow-x-clip">
      <Navbar />

      <main className="flex min-h-screen flex-col">
        <Hero preferredPlatform={preferredPlatform} release={release} />
        <div className="flex flex-col gap-24 pb-24 pt-8 sm:gap-28 sm:pt-12">
          <Highlights release={release} />
          <Features preferredPlatform={preferredPlatform} />
          <Styles />
          <SupportedGames />
          <HowItWorks preferredPlatform={preferredPlatform} />
          <Download preferredPlatform={preferredPlatform} release={release} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
