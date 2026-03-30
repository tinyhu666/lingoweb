import { useState } from 'react'
import { motion } from 'motion/react'
import { Bot, Languages, MessageSquareQuote, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GlassCard from '@/components/ui/GlassCard'
import { cn } from '@/lib/cn'

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
      <section>
        <span className="section-eyebrow">{t('features.eyebrow')}</span>
        <div className="section-header">
          <h2 className="section-title section-header__title">{t('features.title')}</h2>
          <p className="section-copy section-header__copy">{t('features.subtitle')}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {FEATURE_KEYS.map((feature, index) => (
            <FeatureCard feature={feature} index={index} key={feature.key} />
          ))}
        </div>
      </section>
    </AnimatedSection>
  )
}

function FeatureCard({ feature, index }: { feature: (typeof FEATURE_KEYS)[number]; index: number }) {
  const { t } = useTranslation()
  const [isHovering, setIsHovering] = useState(false)
  const Icon = feature.icon

  return (
    <motion.div
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
            opacity: isHovering ? 0.7 : 0.16,
            scale: isHovering ? 1.04 : 0.88,
            y: isHovering ? 2 : 8,
          }}
          className="pointer-events-none absolute inset-x-8 bottom-2 h-14 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22),rgba(129,140,248,0.18)_42%,rgba(217,70,239,0.1)_62%,transparent_78%)] blur-2xl"
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        />
        <GlassCard
          className={cn(
            'relative h-full overflow-hidden p-6 sm:p-7 transition duration-300',
            isHovering && 'shadow-[0_24px_64px_rgba(3,8,18,0.42)]',
          )}>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent"
            animate={{ opacity: isHovering ? 0.95 : 0.4, scaleX: isHovering ? 1 : 0.7 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            aria-hidden="true"
            animate={{ opacity: isHovering ? 0.42 : 0 }}
            className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-300/16 blur-3xl"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="relative">
            <motion.div
              animate={{ scale: isHovering ? 1.08 : 1 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-cyan-200"
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
              <Icon className="h-5 w-5" />
            </motion.div>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-white">
              {t(`features.items.${feature.key}.title`)}
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/72">
              {t(`features.items.${feature.key}.description`)}
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}

export default Features
