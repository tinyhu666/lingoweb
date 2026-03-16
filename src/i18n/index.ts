import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from '@/i18n/en.json'
import ru from '@/i18n/ru.json'
import zh from '@/i18n/zh.json'

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      ru: { translation: ru },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh', 'ru'],
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'lingoweb.locale',
      caches: ['localStorage'],
    },
  })

export default i18n
