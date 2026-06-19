import { motion } from 'framer-motion'

export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center my-20">
      <motion.div
        className="h-px w-full max-w-md"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        }}
        aria-hidden="true"
      />
    </div>
  )
}
