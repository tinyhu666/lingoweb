import { useState } from 'react'
import { motion } from 'motion/react'
import { Bot, Crosshair, Languages, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import dota2Cover from '@/assets/games/dota2-cover.jpg'
import ow2Cover from '@/assets/games/ow2-cover.jpg'
import { cn } from '@/lib/cn'

const FEATURE_KEYS = [
  { key: 'instant', icon: Zap, metric: '0.4s', tone: 'from-cyan-300/28 to-blue-500/10' },
  { key: 'server', icon: Bot, metric: 'AI', tone: 'from-fuchsia-300/24 to-cyan-400/8' },
  { key: 'phrases', icon: Crosshair, metric: 'GG', tone: 'from-amber-300/24 to-fuchsia-400/8' },
  { key: 'languages', icon: Languages, metric: '3x', tone: 'from-emerald-300/22 to-cyan-400/8' },
] as const

function Features() {
  const { t } = useTranslation()
  const [activeKey, setActiveKey] = useState<(typeof FEATURE_KEYS)[number]['key']>('instant')
  const activeFeature = FEATURE_KEYS.find((feature) => feature.key === activeKey) ?? FEATURE_KEYS[0]

  return (
    <AnimatedSection id="features">
      <section className="grid items-center gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <span className="section-eyebrow">{t('features.eyebrow')}</span>
          <h2 className="section-title mt-5 max-w-[10ch]">{t('features.title')}</h2>
          <p className="section-copy mt-5 max-w-[30rem]">{t('features.subtitle')}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {FEATURE_KEYS.map((feature) => {
              const Icon = feature.icon
              const active = feature.key === activeKey

              return (
                <button
                  aria-pressed={active}
                  className={cn(
                    'group neon-border relative overflow-hidden rounded-[8px] p-4 text-left transition duration-300',
                    active ? 'bg-white/[0.095] shadow-[0_20px_56px_rgba(0,0,0,0.3)]' : 'bg-white/[0.045] hover:bg-white/[0.075]',
                  )}
                  key={feature.key}
                  onFocus={() => setActiveKey(feature.key)}
                  onMouseEnter={() => setActiveKey(feature.key)}
                  type="button">
                  <div className={cn('absolute inset-0 bg-gradient-to-br opacity-0 transition duration-300 group-hover:opacity-100', feature.tone)} />
                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-cyan-200/16 bg-black/20 text-cyan-100">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="truncate font-display text-lg font-black text-white">
                        {t(`features.items.${feature.key}.title`)}
                      </span>
                    </div>
                    <span className="font-display text-2xl font-black text-cyan-100/80">{feature.metric}</span>
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
  return (
    <div className="neon-border relative min-h-[34rem] overflow-hidden rounded-[8px] bg-[#050b16]/76 p-4 shadow-[0_34px_90px_rgba(0,0,0,0.34)]">
      <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.34] mix-blend-screen" src={activeFeature.key === 'phrases' ? ow2Cover : dota2Cover} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_28%,rgba(36,217,255,0.22),transparent_36%),linear-gradient(180deg,rgba(3,7,17,0.22),rgba(3,7,17,0.96))]" />
      <div className="absolute inset-0 scanline opacity-30" />

      <div className="relative flex h-full min-h-[32rem] flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="rounded-[8px] border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-100/72">
            Tactical overlay
          </div>
          <motion.div
            animate={{ opacity: [0.35, 1, 0.35] }}
            className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(16,255,192,0.8)]"
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="mx-auto grid w-full max-w-[33rem] gap-3">
          <motion.div
            animate={{ x: [-8, 0, -8], opacity: [0.72, 1, 0.72] }}
            className="max-w-[25rem] rounded-[8px] border border-cyan-200/16 bg-black/34 p-4 backdrop-blur-xl"
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="mb-3 h-2 w-24 rounded-full bg-cyan-200/70" />
            <div className="h-2 w-48 rounded-full bg-white/22" />
            <div className="mt-2 h-2 w-36 rounded-full bg-white/14" />
          </motion.div>

          <motion.div
            animate={{ scale: [0.98, 1.03, 0.98], y: [0, -4, 0] }}
            className="ml-auto max-w-[26rem] rounded-[8px] border border-fuchsia-200/18 bg-fuchsia-300/10 p-4 shadow-[0_0_44px_rgba(183,66,255,0.18)] backdrop-blur-xl"
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="mb-3 flex items-center justify-between">
              <span className="h-2 w-20 rounded-full bg-fuchsia-200/72" />
              <span className="rounded-[6px] bg-cyan-300/18 px-2 py-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-cyan-100">
                {activeFeature.metric}
              </span>
            </div>
            <div className="h-2 w-56 rounded-full bg-white/30" />
            <div className="mt-2 h-2 w-40 rounded-full bg-white/16" />
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {['Input', 'AI', 'Send'].map((label, index) => (
            <motion.div
              animate={{ y: [0, index === 1 ? -5 : -2, 0] }}
              className="arcade-key rounded-[8px] px-3 py-4 text-center"
              key={label}
              transition={{ duration: 2.4, delay: index * 0.18, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-cyan-100/62">{label}</div>
              <div className="mt-2 font-display text-lg font-black text-white">{String(index + 1).padStart(2, '0')}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
