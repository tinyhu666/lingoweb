import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/cn'

type AnimatedSectionProps = {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
}

function AnimatedSection({ children, className, delay = 0, id }: AnimatedSectionProps) {
  return (
    <motion.div
      className={cn('section-shell', className)}
      id={id}
      initial={{ opacity: 0, y: 36 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}>
      {children}
    </motion.div>
  )
}

export default AnimatedSection
