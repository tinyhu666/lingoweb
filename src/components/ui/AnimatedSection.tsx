import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/cn'

type AnimatedSectionProps = {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
}

function AnimatedSection({ children, className, delay = 0, id }: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className={cn('section-shell', className)}
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.8, 0.2, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      whileInView={{ opacity: 1, y: 0 }}>
      {children}
    </motion.section>
  )
}

export default AnimatedSection
