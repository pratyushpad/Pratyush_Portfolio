import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: () => void
  href?: string
  intensity?: number
}

export default function TiltCard({ children, className = '', style, onClick, href, intensity = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTransform({
      rotateX: (y - 0.5) * -intensity,
      rotateY: (x - 0.5) * intensity,
    })
    setGlare({ x: x * 100, y: y * 100, opacity: 0.08 })
  }

  const handleLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 })
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  const card = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={transform}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
        }}
        aria-hidden="true"
      />
    </motion.div>
  )

  if (href) {
    return <a href={href} className="block">{card}</a>
  }
  return card
}
