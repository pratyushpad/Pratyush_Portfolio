import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  href?: string
  to?: string
  onClick?: (e: React.MouseEvent) => void
  external?: boolean
}

export default function MagneticButton({ children, className = '', style, href, onClick, external }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15
    setPosition({ x, y })
  }

  const handleLeave = () => setPosition({ x: 0, y: 0 })

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.2 }}
      className="inline-block"
    >
      <motion.span
        className={`inline-flex items-center gap-2 ${className}`}
        style={style}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.span>
    </motion.div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className="inline-block"
      >
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className="inline-block">
      {content}
    </button>
  )
}
