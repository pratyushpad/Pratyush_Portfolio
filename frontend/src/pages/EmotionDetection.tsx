import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/animations/PageTransition'
import FadeUp from '../components/animations/FadeUp'
import Lightbox from '../components/Lightbox'

const models = [
  {
    name: 'MLP (Pixels)',
    description: 'Fully connected network on raw 48×48 pixel inputs.',
    result: 'Baseline performance',
    icon: '01',
    accent: '#9a9a9a',
  },
  {
    name: 'MLP (Landmarks)',
    description: 'MLP trained on geometric facial landmark distances.',
    result: 'Improved over pixels',
    icon: '02',
    accent: '#b0b0b0',
  },
  {
    name: 'CNN',
    description: 'Convolutional network with batch normalization and dropout.',
    result: 'Strong spatial feature learning',
    icon: '03',
    accent: '#ffffff',
  },
  {
    name: 'VGG16 Transfer',
    description: 'Pretrained ImageNet model fine-tuned for emotion classification.',
    result: 'Best overall performance ✦',
    icon: '04',
    accent: '#ffffff',
  },
]

const images = [
  { src: '/emotion/cnn_training.png', alt: 'CNN Training Curves' },
  { src: '/emotion/cnn_confusion_matrix.png', alt: 'CNN Confusion Matrix' },
  { src: '/emotion/model_comparison.png', alt: 'Model Comparison' },
  { src: '/emotion/vgg16_transfer_learning_training.png', alt: 'VGG16 Training' },
]

const techTags = ['Python', 'TensorFlow', 'Keras', 'CNN', 'VGG16', 'Transfer Learning', 'OpenCV']

const learned = [
  'CNNs outperform flat MLPs on image data by learning spatial features directly.',
  'Transfer learning with VGG16 dramatically improves accuracy by reusing ImageNet features.',
  'Dropout and batch normalization are essential for preventing overfitting.',
  'Geometric landmark features can outperform raw pixels as model inputs.',
]

export default function EmotionDetection() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [showBack, setShowBack] = useState(false)

  useEffect(() => { document.title = 'Face Pulse | Pratyush Padhy' }, [])

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
                  <li style={{ color: '#d0d0d0' }}>Face Pulse</li>
                </ol>
              </nav>
            </FadeUp>

            <FadeUp delay={0.05}>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: '#ffffff' }}>Project 04</span>
                <span
                  className="text-xs px-2.5 py-0.5 font-mono"
                  style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 4 }}
                >
                  VGG16 outperformed all baselines
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-5"
                style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
              >
                Face Pulse
              </h1>

              <p className="text-base leading-relaxed max-w-2xl mb-8" style={{ color: '#d0d0d0', lineHeight: 1.85 }}>
                A real-time emotion recognition system and comparative study of 4 deep learning architectures
                for detecting human emotions from facial images — from a simple MLP all the way to VGG16 transfer learning on 35,000+ images.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {[
                  { val: '35K+', label: 'Training Images' },
                  { val: '4', label: 'Models Compared' },
                  { val: '7', label: 'Emotion Classes' },
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
                    style={{ color: '#ffffff', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 4 }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://face-pulse.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #ffffff, #d4d4d4)', borderRadius: 6 }}
                >
                  Live Demo ↗
                </a>
                <a
                  href="https://github.com/pratyushpad/Face-Pulse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #ffffff, #d4d4d4)', borderRadius: 6 }}
                >
                  View on GitHub ↗
                </a>
              </div>
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
                Human emotion recognition has applications in mental health tech, human-computer interaction,
                and security systems. The challenge is that facial expressions are subtle and vary significantly
                across individuals. Human accuracy on FER2013 is only ~65%, making it a genuinely difficult
                benchmark for any model.
              </div>
            </section>
          </FadeUp>

          {/* Models */}
          <FadeUp delay={0.05}>
            <section>
              <SectionHeading number="02" label="Approach" title="Models Compared" />
              <div className="grid md:grid-cols-2 gap-3">
                {models.map((model) => (
                  <motion.div
                    key={model.name}
                    className="p-5"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 8,
                    }}
                    whileHover={{ borderColor: model.accent + '40', background: model.accent + '06' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="w-8 h-8 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                        style={{ background: model.accent + '18', color: model.accent, border: `1px solid ${model.accent}30`, borderRadius: 6 }}
                      >
                        {model.icon}
                      </span>
                      <h3 className="text-white font-semibold text-sm">{model.name}</h3>
                    </div>
                    <p className="text-sm mb-3" style={{ color: '#b0b0b0', lineHeight: 1.7 }}>{model.description}</p>
                    <p className="text-xs font-mono" style={{ color: model.accent }}>{model.result}</p>
                  </motion.div>
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
                        className="w-full h-44 object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="flex items-center justify-between px-4 py-2.5"
                      style={{ background: 'rgba(18,18,18,0.6)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <p className="font-mono text-xs" style={{ color: '#9a9a9a' }}>{img.alt}</p>
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#ffffff' }}>expand ↗</span>
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
                    <span className="font-mono text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: '#ffffff' }}>
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
            <Link to="/projects/argus-ai" className="block group">
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
                  <p className="text-white font-semibold group-hover:text-white transition-colors">
                    Argus AI
                  </p>
                </div>
                <motion.span
                  className="text-gray-500 group-hover:text-white transition-colors"
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
        <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: '#ffffff' }}>{number}</span>
        <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.3)', display: 'block' }} />
        <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: '#9a9a9a' }}>{label}</span>
      </div>
      <h2 className="text-2xl font-bold text-white" style={{ letterSpacing: '-0.015em' }}>{title}</h2>
    </div>
  )
}
