import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/animations/PageTransition'
import FadeUp from '../components/animations/FadeUp'
import Lightbox from '../components/Lightbox'

const recipe = [
  {
    name: 'Cold Base',
    description: 'Start from Qwen2.5-1.5B, an off-the-shelf small language model with no math-specific tuning.',
    icon: '01',
    accent: '#e0a172',
  },
  {
    name: 'GRPO',
    description: 'Group Relative Policy Optimization samples multiple completions per problem and reinforces the ones a rule-based checker verifies as correct — no reward model needed.',
    icon: '02',
    accent: '#d4d4d4',
  },
  {
    name: 'Verifiable Reward',
    description: 'The reward is binary and mechanical: does the final answer match the ground truth? No human preference labels, no hallucinated reward signal.',
    icon: '03',
    accent: '#a3a3a3',
  },
  {
    name: 'Forged Model',
    description: '86 minutes of training on a single 8GB RTX 5060 later, the same architecture solves problems it previously got wrong.',
    icon: '04',
    accent: '#e0a172',
  },
]

const images = [
  { src: '/forge/forge_preview.svg', alt: 'Forge — Forged to Reason, playground comparing cold and forged model' },
]

const techTags = ['Python', 'PyTorch', 'Transformers', 'GRPO', 'Qwen2.5', 'Reinforcement Learning']

const learned = [
  'Verifiable rewards (a math checker) sidestep the need for a separate reward model — the checker is the reward model.',
  "GRPO's group-relative baseline made training stable enough to run on a single consumer GPU instead of a multi-GPU cluster.",
  'Measuring forgetting on an unrelated benchmark (ARC) mattered as much as measuring the gain — a model that reasons better but forgets everything else isn\'t actually better.',
  'Small models can pick up meaningfully better reasoning from RL alone, without ever seeing a labeled chain-of-thought.',
]

export default function Forge() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [showBack, setShowBack] = useState(false)

  useEffect(() => { document.title = 'Forge | Pratyush Padhy' }, [])

  useEffect(() => {
    const handleScroll = () => setShowBack(window.scrollY > 200)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <PageTransition>
      <main id="main-content" className="relative z-10">

        {/* ── Hero band ── */}
        <div className="relative overflow-hidden pt-28 md:pt-36 pb-16 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(224,161,114,0.08) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="max-w-4xl mx-auto relative">
            <FadeUp>
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center gap-2 text-xs font-mono" style={{ color: '#9a9a9a' }}>
                  <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                  <li aria-hidden="true">/</li>
                  <li style={{ color: '#d0d0d0' }}>Forge</li>
                </ol>
              </nav>
            </FadeUp>

            <FadeUp delay={0.05}>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: '#e0a172' }}>Project 02</span>
                <span
                  className="text-xs px-2.5 py-0.5 font-mono"
                  style={{ background: 'rgba(224,161,114,0.12)', color: '#e0a172', border: '1px solid rgba(224,161,114,0.3)', borderRadius: 4 }}
                >
                  GSM8K 58.8% → 70.0%
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-5"
                style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
              >
                Forge
              </h1>

              <p className="text-base leading-relaxed max-w-2xl mb-8" style={{ color: '#d0d0d0', lineHeight: 1.85 }}>
                Qwen2.5-1.5B, heat-treated with GRPO — the reinforcement-learning recipe behind DeepSeek-R1 — trained
                against a rule-based math checker on a single 8GB consumer GPU. An interactive playground replays the
                cold base model and the forged model solving the same problem, side by side.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {[
                  { val: '70.0%', label: 'GSM8K Pass@1 (+11.2 pts)' },
                  { val: '≈flat', label: 'ARC Forgetting' },
                  { val: '86 min', label: 'Train Time (8GB GPU)' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-white">{s.val}</p>
                    <p className="font-mono text-xs mt-1 uppercase tracking-wider" style={{ color: '#9a9a9a' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {techTags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-3 py-1"
                    style={{ color: '#e0a172', background: 'rgba(224,161,114,0.08)', border: '1px solid rgba(224,161,114,0.25)', borderRadius: 4 }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href="https://github.com/pratyushpad/Forge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #e0a172, #f0b088)', borderRadius: 6 }}
              >
                View on GitHub ↗
              </a>
            </FadeUp>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-20 pb-28 md:pb-20">

          {/* Problem */}
          <FadeUp>
            <section>
              <SectionHeading number="01" label="Context" title="The Problem" />
              <div
                className="p-6 text-sm leading-relaxed"
                style={{
                  color: '#d0d0d0',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 8,
                  lineHeight: 1.85,
                }}
              >
                Fine-tuning a language model to reason better usually means either massive compute or a labeled
                dataset of reasoning traces. Forge tests a third path: reinforcement learning with verifiable
                rewards — a small model, a cheap GPU, and a reward signal that's just "is the final answer
                correct" — the same recipe DeepSeek-R1 used at a much larger scale.
              </div>
            </section>
          </FadeUp>

          {/* Recipe */}
          <FadeUp delay={0.05}>
            <section>
              <SectionHeading number="02" label="Method" title="Training Recipe" />
              <div className="grid md:grid-cols-2 gap-3">
                {recipe.map((step) => (
                  <motion.div
                    key={step.name}
                    className="p-5"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 8,
                    }}
                    whileHover={{ borderColor: step.accent + '40', background: step.accent + '06' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="w-8 h-8 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                        style={{ background: step.accent + '18', color: step.accent, border: `1px solid ${step.accent}30`, borderRadius: 6 }}
                      >
                        {step.icon}
                      </span>
                      <h3 className="text-white font-semibold text-sm">{step.name}</h3>
                    </div>
                    <p className="text-sm" style={{ color: '#b0b0b0', lineHeight: 1.7 }}>{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </FadeUp>

          {/* Preview */}
          <FadeUp delay={0.05}>
            <section>
              <SectionHeading number="03" label="Output" title="Playground — Cold vs. Forged" />
              <div className="space-y-4">
                {images.map((img) => (
                  <motion.div
                    key={img.alt}
                    className="overflow-hidden cursor-pointer group"
                    style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8 }}
                    whileHover={{ borderColor: 'rgba(224,161,114,0.4)' }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setLightbox(img)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setLightbox(img)}
                    aria-label={`Expand ${img.alt}`}
                  >
                    <div
                      className="flex items-center justify-center p-4"
                      style={{ background: 'rgba(10,9,8,0.9)' }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full object-contain rounded transition-transform duration-500 group-hover:scale-[1.02]"
                        style={{ maxHeight: 480 }}
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="flex items-center justify-between px-4 py-2.5"
                      style={{ background: 'rgba(18,18,18,0.6)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <p className="font-mono text-xs" style={{ color: '#9a9a9a' }}>{img.alt}</p>
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#e0a172' }}>expand ↗</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </FadeUp>

          {/* What I Learned */}
          <FadeUp delay={0.05}>
            <section>
              <SectionHeading number="04" label="Takeaways" title="What I Learned" />
              <div className="space-y-3">
                {learned.map((item, i) => (
                  <div
                    key={item}
                    className="flex gap-4 p-4 text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderLeft: '2px solid rgba(224,161,114,0.4)',
                      borderRadius: '0 8px 8px 0',
                    }}
                  >
                    <span className="font-mono text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: '#e0a172' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ color: '#d0d0d0', lineHeight: 1.75 }}>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </FadeUp>

          {/* Next project */}
          <FadeUp delay={0.05}>
            <Link to="/projects/lumina" className="block group">
              <motion.div
                className="flex items-center justify-between p-6"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10,
                }}
                whileHover={{ borderColor: 'rgba(224,161,114,0.3)', background: 'rgba(224,161,114,0.04)' }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider mb-1" style={{ color: '#9a9a9a' }}>Next Project</p>
                  <p className="text-white font-semibold group-hover:text-neutral-300 transition-colors">
                    Lumina
                  </p>
                </div>
                <motion.span
                  className="text-gray-500 group-hover:text-neutral-300 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.span>
              </motion.div>
            </Link>
          </FadeUp>

        </div>
      </main>

      {/* Sticky back button */}
      <AnimatePresence>
        {showBack && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 bottom-24 md:bottom-8 z-40"
          >
            <Link
              to="/projects"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:text-white"
              style={{
                color: '#d0d0d0',
                background: 'rgba(0,0,0,0.9)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
              }}
              aria-label="Back to Projects"
            >
              ← Projects
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && (
          <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </PageTransition>
  )
}

function SectionHeading({ number, label, title }: { number: string; label: string; title: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: '#e0a172' }}>{number}</span>
        <span style={{ width: 24, height: 1, background: 'rgba(224,161,114,0.3)', display: 'block' }} />
        <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: '#9a9a9a' }}>{label}</span>
      </div>
      <h2 className="text-2xl font-bold text-white" style={{ letterSpacing: '-0.015em' }}>{title}</h2>
    </div>
  )
}
