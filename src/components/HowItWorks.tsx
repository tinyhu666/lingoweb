import { motion } from 'motion/react'
import { Languages, MessageSquareText, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'

const STEP_KEYS = [
  { key: 'select', icon: MessageSquareText },
  { key: 'translate', icon: Languages },
  { key: 'paste', icon: Send },
] as const

function HowItWorks() {
  const { t } = useTranslation()

  return (
    <AnimatedSection id="how-it-works">
      <section className="relative overflow-hidden rounded-[32px] bg-[#050b16]/56 p-5 shadow-[0_34px_90px_rgba(0,0,0,0.28),0_0_90px_rgba(183,66,255,0.08)] sm:p-8">
        <div className="absolute inset-0 client-grid-surface opacity-75" />
        <div className="absolute -left-28 top-0 h-72 w-72 rounded-full bg-cyan-400/14 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-fuchsia-400/14 blur-3xl" />

        <div className="relative">
          <span className="section-eyebrow">{t('howItWorks.eyebrow')}</span>
          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="section-title max-w-[12ch] whitespace-pre-line [word-break:keep-all]">{t('howItWorks.title')}</h2>
            <p className="max-w-[24rem] text-sm leading-7 text-cyan-50/62">{t('howItWorks.subtitle')}</p>
          </div>

          <div className="relative mt-10 grid gap-5 lg:grid-cols-3">
            {STEP_KEYS.map((step, index) => {
              const Icon = step.icon

              return (
                <motion.div
                  className="relative min-h-[16rem]"
                  initial={{ opacity: 1, y: 0 }}
                  key={step.key}
                  transition={{ duration: 0.55, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}>
                  <motion.div
                    className="relative h-full overflow-hidden rounded-[26px] bg-white/[0.035] p-5 backdrop-blur-xl"
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(36,217,255,0.14),transparent_58%)] opacity-80" />
                    <div className="relative">
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        className="mx-auto flex h-24 w-full max-w-[12rem] items-center justify-center rounded-[24px] bg-[linear-gradient(180deg,rgba(36,217,255,0.2),rgba(93,92,255,0.08))] text-center shadow-[0_24px_54px_rgba(0,0,0,0.28),0_0_34px_rgba(36,217,255,0.12)]"
                        transition={{ duration: 2.8, delay: index * 0.22, repeat: Infinity, ease: 'easeInOut' }}>
                        <span className="font-display text-2xl font-black tracking-[0.08em] text-white">
                          {t(`howItWorks.steps.${step.key}.keycap`)}
                        </span>
                      </motion.div>

                      <div className="mt-6 flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-100">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-cyan-100/58">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <h3 className="font-display text-xl font-black text-white">{t(`howItWorks.steps.${step.key}.title`)}</h3>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-cyan-50/58">{t(`howItWorks.steps.${step.key}.description`)}</p>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}

export default HowItWorks
