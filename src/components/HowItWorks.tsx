import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GlassCard from '@/components/ui/GlassCard'

const STEP_KEYS = ['select', 'hotkey', 'paste'] as const

function HowItWorks() {
  const { t } = useTranslation()

  return (
    <AnimatedSection id="how-it-works">
      <section>
        <span className="section-eyebrow">{t('howItWorks.eyebrow')}</span>
        <div className="section-header">
          <h2 className="section-title section-header__title">{t('howItWorks.title')}</h2>
          <p className="section-copy section-header__copy">{t('howItWorks.subtitle')}</p>
        </div>

        <div className="relative mt-10">
          <motion.div
            className="absolute left-[12%] right-[12%] top-8 hidden h-px origin-left bg-[linear-gradient(90deg,rgba(129,140,248,0),rgba(129,140,248,0.8),rgba(34,211,238,0.75),rgba(217,70,239,0.78),rgba(217,70,239,0))] lg:block"
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileInView={{ scaleX: 1 }}
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {STEP_KEYS.map((stepKey, index) => (
              <motion.div
                key={stepKey}
                className="relative z-10"
                initial={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.55, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}>
                <GlassCard className="h-full p-6 sm:p-7">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-indigo-300/28 bg-[linear-gradient(135deg,rgba(99,102,241,0.2),rgba(217,70,239,0.14))] text-xl font-semibold text-white">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-white">
                    {t(`howItWorks.steps.${stepKey}.title`)}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/72">
                    {t(`howItWorks.steps.${stepKey}.description`)}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}

export default HowItWorks
