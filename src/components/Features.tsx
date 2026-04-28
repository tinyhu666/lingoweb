import { useState } from 'react'
import { motion } from 'motion/react'
import { Bot, Crosshair, Languages, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import dota2Cover from '@/assets/games/dota2-cover.jpg'
import ow2Cover from '@/assets/games/ow2-cover.jpg'
import { cn } from '@/lib/cn'

const FEATURE_KEYS = [
  { key: 'instant', icon: Zap, tone: 'from-cyan-300/28 to-blue-500/10' },
  { key: 'server', icon: Bot, tone: 'from-fuchsia-300/24 to-cyan-400/8' },
  { key: 'phrases', icon: Crosshair, tone: 'from-amber-300/24 to-fuchsia-400/8' },
  { key: 'languages', icon: Languages, tone: 'from-emerald-300/22 to-cyan-400/8' },
] as const

const FEATURE_STAGE_STEPS = ['input', 'translate', 'send'] as const

function Features() {
  const { t } = useTranslation()
  const [activeKey, setActiveKey] = useState<(typeof FEATURE_KEYS)[number]['key']>('instant')
  const activeFeature = FEATURE_KEYS.find((feature) => feature.key === activeKey) ?? FEATURE_KEYS[0]

  return (
    <AnimatedSection id="features">
      <section className="grid items-center gap-10 lg:grid-cols-[minmax(21rem,0.82fr)_minmax(0,1.18fr)] lg:gap-12">
        <div>
          <span className="section-eyebrow">{t('features.eyebrow')}</span>
          <h2 className="section-title mt-5 max-w-[12ch] whitespace-pre-line [word-break:keep-all]">{t('features.title')}</h2>
          <p className="section-copy mt-5 max-w-[30rem]">{t('features.subtitle')}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {FEATURE_KEYS.map((feature) => {
              const Icon = feature.icon
              const active = feature.key === activeKey

              return (
                <button
                  aria-pressed={active}
                  className={cn(
                    'group relative min-h-[5.4rem] overflow-hidden rounded-[20px] p-4 text-left transition duration-300',
                    active ? 'bg-white/[0.09] shadow-[0_20px_56px_rgba(0,0,0,0.26)]' : 'bg-white/[0.025] hover:bg-white/[0.06]',
                  )}
                  key={feature.key}
                  onFocus={() => setActiveKey(feature.key)}
                  onMouseEnter={() => setActiveKey(feature.key)}
                  type="button">
                  <div className={cn('absolute inset-0 bg-gradient-to-br opacity-0 transition duration-300 group-hover:opacity-100', feature.tone)} />
                  <div className="relative grid h-full grid-cols-[2.75rem_minmax(0,1fr)_4.4rem] items-center gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-100 shadow-[0_0_26px_rgba(36,217,255,0.12)]">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <span className="min-w-0 truncate font-display text-lg font-black text-white">
                      {t(`features.items.${feature.key}.title`)}
                    </span>
                    <span className="justify-self-end text-right font-display text-2xl font-black text-cyan-100/80 [font-variant-numeric:tabular-nums]">
                      {t(`features.items.${feature.key}.metric`)}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <FeatureStage activeFeature={activeFeature} />
      </section>
    </AnimatedSection>
  )
}

function FeatureStage({ activeFeature }: { activeFeature: (typeof FEATURE_KEYS)[number] }) {
  const { t } = useTranslation()

  return (
    <div className="relative min-h-[34rem] overflow-hidden rounded-[28px] bg-[#050b16]/70 p-5 shadow-[0_34px_90px_rgba(0,0,0,0.34),0_0_90px_rgba(36,217,255,0.1)] sm:p-6">
      <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.38] mix-blend-screen" src={activeFeature.key === 'phrases' ? ow2Cover : dota2Cover} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_28%,rgba(36,217,255,0.18),transparent_36%),linear-gradient(180deg,rgba(3,7,17,0.08),rgba(3,7,17,0.94))]" />
      <div className="absolute inset-0 scanline opacity-16" />

      <div className="relative flex h-full min-h-[32rem] flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="rounded-full bg-white/[0.06] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-100/72 backdrop-blur-md">
            {t('features.stageLabel')}
          </div>
          <motion.div
            animate={{ opacity: [0.35, 1, 0.35] }}
            className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(16,255,192,0.8)]"
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="mx-auto flex w-full max-w-[45rem] flex-1 flex-col justify-center gap-5 px-1 py-8 sm:px-3">
          <motion.div
            animate={{ opacity: [0.76, 1, 0.76] }}
            className="w-[72%] max-w-[28rem] self-start rounded-[20px] bg-black/30 p-4 shadow-[0_20px_58px_rgba(0,0,0,0.24)] backdrop-blur-xl"
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="mb-3 h-2 w-24 rounded-full bg-cyan-200/70" />
            <div className="h-2 w-48 rounded-full bg-white/22" />
            <div className="mt-2 h-2 w-36 rounded-full bg-white/14" />
          </motion.div>

          <motion.div
            animate={{ scale: [0.99, 1.02, 0.99] }}
            className="w-[66%] max-w-[27rem] self-end rounded-[20px] bg-fuchsia-300/10 p-4 shadow-[0_0_44px_rgba(183,66,255,0.18)] backdrop-blur-xl"
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="mb-3 flex items-center justify-between">
              <span className="h-2 w-20 rounded-full bg-fuchsia-200/72" />
              <span className="rounded-full bg-cyan-300/18 px-2 py-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-cyan-100">
                {t(`features.items.${activeFeature.key}.metric`)}
              </span>
            </div>
            <div className="h-2 w-56 rounded-full bg-white/30" />
            <div className="mt-2 h-2 w-40 rounded-full bg-white/16" />
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {FEATURE_STAGE_STEPS.map((step, index) => (
            <motion.div
              animate={{ opacity: [0.8, 1, 0.8] }}
              className="flex min-h-[5.75rem] flex-col items-center justify-center rounded-full bg-white/[0.065] px-3 py-4 text-center shadow-[0_16px_34px_rgba(0,0,0,0.22)] backdrop-blur-md"
              key={step}
              transition={{ duration: 2.4, delay: index * 0.18, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-cyan-100/62">
                {t(`features.stageSteps.${step}`)}
              </div>
              <div className="mt-2 font-display text-lg font-black text-white">{String(index + 1).padStart(2, '0')}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
