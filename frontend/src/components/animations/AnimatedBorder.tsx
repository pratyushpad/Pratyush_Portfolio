import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

interface AnimatedBorderProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export default function AnimatedBorder({ children, className = '', style }: AnimatedBorderProps) {
  return (
    <div className={`relative rounded-2xl p-px ${className}`} style={style}>
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(59,130,246,0.4), transparent, rgba(139,92,246,0.3), transparent)',
          filter: 'blur(1px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <div
        className="relative rounded-2xl h-full"
        style={{ background: '#0c0c14' }}
      >
        {children}
      </div>
    </div>
  )
}
