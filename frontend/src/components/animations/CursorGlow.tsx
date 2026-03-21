import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) return
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [shouldReduce])

  if (shouldReduce) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-[1]"
      animate={{ x: pos.x - 300, y: pos.y - 300 }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      style={{
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
      }}
      aria-hidden="true"
    />
  )
}
