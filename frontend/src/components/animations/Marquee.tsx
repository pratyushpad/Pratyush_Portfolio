import { motion } from 'framer-motion'

interface MarqueeProps {
  items: string[]
  speed?: number
}

export default function Marquee({ items, speed = 30 }: MarqueeProps) {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden py-6 relative">
      <div
        className="absolute inset-y-0 left-0 w-24 z-10"
        style={{ background: 'linear-gradient(to right, #000000, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10"
        style={{ background: 'linear-gradient(to left, #000000, transparent)' }}
        aria-hidden="true"
      />
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-2 text-sm font-mono px-4 py-2 rounded-lg flex-shrink-0"
            style={{
              color: '#d0d0d0',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: '#ffffff' }}
              aria-hidden="true"
            />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
