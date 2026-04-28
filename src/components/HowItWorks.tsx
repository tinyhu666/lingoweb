import { motion } from 'motion/react'
import { Keyboard, MessageSquareText, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'

const STEP_KEYS = [
  { key: 'select', icon: MessageSquareText, keycap: 'TYPE' },
  { key: 'hotkey', icon: Keyboard, keycap: 'CTRL' },
  { key: 'paste', icon: Send, keycap: 'SEND' },
] as const

function HowItWorks() {
  const { t } = useTranslation()

  return (
    <AnimatedSection id="how-it-works">
      <section className="neon-border relative overflow-hidden rounded-[8px] bg-[#050b16]/72 p-5 shadow-[0_34px_90px_rgba(0,0,0,0.32)] sm:p-8">
        <div className="absolute inset-0 client-grid-surface opacity-40" />
        <div className="absolute -left-28 top-0 h-72 w-72 rounded-full bg-cyan-400/16 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-fuchsia-400/16 blur-3xl" />

        <div className="relative">
          <span className="section-eyebrow">{t('howItWorks.eyebrow')}</span>
          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="section-title max-w-[12ch]">{t('howItWorks.title')}</h2>
            <p className="max-w-[24rem] text-sm leading-7 text-cyan-50/62">{t('howItWorks.subtitle')}</p>
          </div>

          <div className="relative mt-10 grid gap-4 lg:grid-cols-3">
            <motion.div
              aria-hidden="true"
              className="absolute left-[10%] right-[10%] top-14 hidden h-px origin-left bg-[linear-gradient(90deg,rgba(36,217,255,0),rgba(36,217,255,0.7),rgba(183,66,255,0.7),rgba(255,188,92,0))] lg:block"
              initial={{ scaleX: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileInView={{ scaleX: 1 }}
            />

            {STEP_KEYS.map((step, index) => {
              const Icon = step.icon

              return (
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 24 }}
                  key={step.key}
                  transition={{ duration: 0.55, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.4 }}
                  whileInView={{ opacity: 1, y: 0 }}>
                  <motion.div
                    className="neon-border relative h-full overflow-hidden rounded-[8px] bg-black/26 p-5 backdrop-blur-xl"
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(36,217,255,0.14),transparent_62%)] opacity-80" />
                    <div className="relative">
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        className="arcade-key mx-auto flex h-24 w-full max-w-[12rem] items-center justify-center rounded-[8px] text-center"
                        transition={{ duration: 2.8, delay: index * 0.22, repeat: Infinity, ease: 'easeInOut' }}>
                        <span className="font-display text-2xl font-black tracking-[0.08em] text-white">{step.keycap}</span>
                      </motion.div>

                      <div className="mt-6 flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-cyan-200/16 bg-cyan-300/10 text-cyan-100">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-cyan-100/58">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <h3 className="font-display text-xl font-black text-white">{t(`howItWorks.steps.${step.key}.title`)}</h3>
                        </div>
                      </div>
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
