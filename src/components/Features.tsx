import { motion } from 'motion/react'
import { Bot, Languages, MessageSquareQuote, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GlassCard from '@/components/ui/GlassCard'

const FEATURE_KEYS = [
  { key: 'instant', icon: Sparkles },
  { key: 'server', icon: Bot },
  { key: 'phrases', icon: MessageSquareQuote },
  { key: 'languages', icon: Languages },
] as const

function Features() {
  const { t } = useTranslation()

  return (
    <AnimatedSection id="features">
      <section className="section-shell">
        <span className="section-eyebrow">{t('features.eyebrow')}</span>
        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="section-title max-w-2xl">{t('features.title')}</h2>
          <p className="section-copy">{t('features.subtitle')}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {FEATURE_KEYS.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.55, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}>
                <GlassCard className="h-full p-6 sm:p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-white">
                    {t(`features.items.${feature.key}.title`)}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/72">
                    {t(`features.items.${feature.key}.description`)}
                  </p>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </section>
    </AnimatedSection>
  )
}

export default Features
