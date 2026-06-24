import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/animations/PageTransition'
import FadeUp from '../components/animations/FadeUp'
import Lightbox from '../components/Lightbox'

const temperatures = [
  {
    temp: '0.2',
    label: 'Conservative',
    color: '#ffffff',
    bg: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.2)',
    output: 'the president announced today that the state of the country was a strong and the party of the election was a former president of the united states...',
  },
  {
    temp: '0.5',
    label: 'Balanced',
    color: '#d4d4d4',
    bg: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.2)',
    output: 'the president announced comple vate in the has election an was be neworng do the ussistance that the clinton interely is a commenter of the state...',
  },
  {
    temp: '0.7',
    label: 'Creative',
    color: '#a3a3a3',
    bg: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.2)',
    output: 'the president announced evemipmon to post in o hatimer to consrations. marh rin n a doment that other get a foundateoth, share shick dictrual internet...',
  },
]

const steps = [
  { step: '01', title: 'Encode', desc: 'Every character in the corpus is converted to a one-hot vector across a 70-character vocabulary.' },
  { step: '02', title: 'Sequence', desc: 'A sliding window of 40 characters creates 66,000+ input/output training pairs.' },
  { step: '03', title: 'Train', desc: 'The LSTM learns to predict the next character by minimizing categorical crossentropy loss.' },
  { step: '04', title: 'Generate', desc: 'Given a seed phrase, the model generates new characters one at a time using temperature sampling.' },
]

const images = [
  { src: '/fakenews/training_loss.png', alt: 'Training Loss' },
  { src: '/fakenews/confidence_heatmap.png', alt: 'Confidence Heatmap' },
]

const techTags = ['Python', 'TensorFlow', 'Keras', 'RNN', 'LSTM', 'NLP', 'Text Generation']

const learned = [
  'LSTMs outperform SimpleRNNs on sequence tasks due to their gating mechanism.',
  'Temperature sampling controls the creativity vs coherence tradeoff in generation.',
  'Sliding window tokenization turns raw text into thousands of labeled training sequences.',
  'Character-level models reveal how modern LLMs like GPT learn language fundamentals.',
]

export default function FakeNews() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [showBack, setShowBack] = useState(false)

  useEffect(() => { document.title = 'Language Model | Pratyush Padhy' }, [])

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
          {/* Accent gradient */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="max-w-4xl mx-auto relative">
            {/* Breadcrumb */}
            <FadeUp>
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center gap-2 text-xs font-mono" style={{ color: '#9a9a9a' }}>
                  <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                  <li aria-hidden="true">/</li>
                  <li style={{ color: '#d0d0d0' }}>Character-Level Language Model</li>
                </ol>
              </nav>
            </FadeUp>

            <FadeUp delay={0.05}>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: '#a3a3a3' }}>Project 02</span>
                <span
                  className="text-xs px-2.5 py-0.5 font-mono"
                  style={{ background: 'rgba(255,255,255,0.1)', color: '#d4d4d4', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 4 }}
                >
                  LSTM outperformed SimpleRNN
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-5"
                style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
              >
                Character-Level<br className="hidden md:block" /> Language Model
              </h1>

              <p className="text-base leading-relaxed max-w-2xl mb-8" style={{ color: '#d0d0d0', lineHeight: 1.85 }}>
                An RNN and LSTM trained on 200,000 characters of text to generate new text from scratch,
                one character at a time. Built to understand how language models like GPT work at their
                most fundamental level.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {[
                  { val: '200K', label: 'Characters' },
                  { val: '70', label: 'Vocab Size' },
                  { val: '66K+', label: 'Training Pairs' },
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
                    style={{ color: '#d4d4d4', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 4 }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href="https://github.com/pratyushpad/char-level-language-model"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #a3a3a3, #d4d4d4)', borderRadius: 6 }}
              >
                View on GitHub ↗
              </a>
            </FadeUp>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-20 pb-28 md:pb-20">

          {/* How it works */}
          <FadeUp>
            <section>
              <SectionHeading number="01" label="Pipeline" title="How It Works" />
              <div className="grid md:grid-cols-2 gap-3">
                {steps.map((item) => (
                  <motion.div
                    key={item.step}
                    className="p-5"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 8,
                    }}
                    whileHover={{ borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="w-8 h-8 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.15)', color: '#d4d4d4', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 6 }}
                      >
                        {item.step}
                      </span>
                      <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                    </div>
                    <p className="text-sm" style={{ color: '#b0b0b0', lineHeight: 1.7 }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </FadeUp>

          {/* Sample outputs */}
          <FadeUp delay={0.05}>
            <section>
              <SectionHeading number="02" label="Generation" title="Sample Outputs" />
              <p className="text-sm mb-6" style={{ color: '#b0b0b0' }}>
                Seed: <span className="font-mono" style={{ color: '#d4d4d4' }}>"the president announced today that"</span>
              </p>
              <div className="space-y-3">
                {temperatures.map((t) => (
                  <div
                    key={t.temp}
                    className="p-5"
                    style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: 8 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="font-mono text-xs font-bold px-2.5 py-0.5"
                        style={{ color: t.color, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 4 }}
                      >
                        t={t.temp}
                      </span>
                      <span className="text-sm font-medium" style={{ color: t.color }}>{t.label}</span>
                    </div>
                    <p className="font-mono text-sm leading-relaxed" style={{ color: '#d0d0d0', lineHeight: 1.75 }}>
                      {t.output}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </FadeUp>

          {/* Results */}
          <FadeUp delay={0.05}>
            <section>
              <SectionHeading number="03" label="Output" title="Results" />
              <div className="grid md:grid-cols-2 gap-4">
                {images.map((img) => (
                  <motion.div
                    key={img.alt}
                    className="overflow-hidden cursor-pointer group"
                    style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8 }}
                    whileHover={{ borderColor: 'rgba(255,255,255,0.3)' }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setLightbox(img)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setLightbox(img)}
                    aria-label={`Expand ${img.alt}`}
                  >
                    <div
                      className="flex items-center justify-center p-4"
                      style={{ background: 'rgba(18,18,18,0.8)', minHeight: 180 }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-52 object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="flex items-center justify-between px-4 py-2.5"
                      style={{ background: 'rgba(18,18,18,0.6)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <p className="font-mono text-xs" style={{ color: '#9a9a9a' }}>{img.alt}</p>
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#a3a3a3' }}>expand ↗</span>
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
                      borderLeft: '2px solid rgba(255,255,255,0.4)',
                      borderRadius: '0 8px 8px 0',
                    }}
                  >
                    <span className="font-mono text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: '#a3a3a3' }}>
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
            <Link to="/projects/emotion-detection" className="block group">
              <motion.div
                className="flex items-center justify-between p-6"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10,
                }}
                whileHover={{ borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)' }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider mb-1" style={{ color: '#9a9a9a' }}>Next Project</p>
                  <p className="text-white font-semibold group-hover:text-neutral-300 transition-colors">
                    Face Pulse
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
        <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: '#a3a3a3' }}>{number}</span>
        <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.3)', display: 'block' }} />
        <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: '#9a9a9a' }}>{label}</span>
      </div>
      <h2 className="text-2xl font-bold text-white" style={{ letterSpacing: '-0.015em' }}>{title}</h2>
    </div>
  )
}
