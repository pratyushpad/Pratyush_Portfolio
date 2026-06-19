import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  style?: CSSProperties
}

export default function GlowCard({ children, className = '', onClick, style }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -3,
        boxShadow: '0 0 40px rgba(255,255,255, 0.18), 0 0 80px rgba(255,255,255, 0.06)',
        borderColor: 'rgba(255,255,255, 0.4)',
      }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`rounded-xl ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 0 30px rgba(255,255,255, 0.05)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}
