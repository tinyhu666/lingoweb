import { useTranslation } from 'react-i18next'
import chinese from '@/assets/microsoft-store/zh-cn.svg'
import english from '@/assets/microsoft-store/en-us.svg'
import russian from '@/assets/microsoft-store/ru.svg'
import { MICROSOFT_STORE_URL } from '@/lib/constants'

export default function MicrosoftStoreBadge() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage?.split('-')[0]
  const src = language === 'zh' ? chinese : language === 'ru' ? russian : english
  return (
    <a className="inline-flex rounded-md" href={MICROSOFT_STORE_URL} target="_blank" rel="noreferrer">
      <img src={src} width={161} height={44} alt={t('download.windows.store')} />
    </a>
  )
}
