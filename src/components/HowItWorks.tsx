import { useState } from 'react'
import { motion } from 'motion/react'
import { Keyboard, MessageSquareText, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GlassCard from '@/components/ui/GlassCard'
import { cn } from '@/lib/cn'

const STEP_KEYS = [
  { key: 'select', icon: MessageSquareText },
  { key: 'hotkey', icon: Keyboard },
  { key: 'paste', icon: Send },
] as const

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
            {STEP_KEYS.map((step, index) => (
              <StepCard index={index} key={step.key} step={step} />
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}

function StepCard({ index, step }: { index: number; step: (typeof STEP_KEYS)[number] }) {
  const { t } = useTranslation()
  const [isHovering, setIsHovering] = useState(false)
  const Icon = step.icon

  return (
    <motion.div
      className="relative z-10"
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}>
      <motion.div
        className="relative h-full"
        onHoverEnd={() => setIsHovering(false)}
        onHoverStart={() => setIsHovering(true)}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}>
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: isHovering ? 0.65 : 0.14,
            scale: isHovering ? 1.04 : 0.88,
            y: isHovering ? 2 : 8,
          }}
          className="pointer-events-none absolute inset-x-8 bottom-2 h-14 rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.24),rgba(217,70,239,0.16)_46%,transparent_78%)] blur-2xl"
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        />
        <GlassCard
          className={cn(
            'relative h-full overflow-hidden p-6 sm:p-7 transition duration-300',
            isHovering && 'shadow-[0_24px_64px_rgba(3,8,18,0.42)]',
          )}>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/80 to-transparent"
            animate={{ opacity: isHovering ? 0.95 : 0.36, scaleX: isHovering ? 1 : 0.7 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="relative">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ scale: isHovering ? 1.06 : 1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-indigo-300/28 bg-[linear-gradient(135deg,rgba(99,102,241,0.2),rgba(217,70,239,0.14))] text-xl font-semibold text-white"
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
                {String(index + 1).padStart(2, '0')}
              </motion.div>
              <motion.div
                animate={{ scale: isHovering ? 1.08 : 1, opacity: isHovering ? 1 : 0.7 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/6 text-cyan-200"
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
                <Icon className="h-5 w-5" />
              </motion.div>
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-white">
              {t(`howItWorks.steps.${step.key}.title`)}
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/72">
              {t(`howItWorks.steps.${step.key}.description`)}
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}

export default HowItWorks
