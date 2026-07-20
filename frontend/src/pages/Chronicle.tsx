import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/animations/PageTransition'
import FadeUp from '../components/animations/FadeUp'
import Lightbox from '../components/Lightbox'

const pipeline = [
  {
    name: 'Ingest',
    description: 'Async fan-out across 200+ companies’ Greenhouse, Lever, and Ashby endpoints, with per-company fault isolation so one broken integration never stalls the rest.',
    icon: '01',
    accent: '#ffffff',
  },
  {
    name: 'Normalize & Dedupe',
    description: 'Cross-source postings are normalized into a common schema and deduplicated before they ever reach search.',
    icon: '02',
    accent: '#d4d4d4',
  },
  {
    name: 'Hybrid Search',
    description: 'pgvector HNSW over int8 ONNX embeddings, fused with keyword signal via Reciprocal Rank Fusion, at p95 <35ms across 10K+ jobs.',
    icon: '03',
    accent: '#a3a3a3',
  },
  {
    name: 'Track & Alert',
    description: 'Kanban application tracking, saved-search email alerts, and a Manifest V3 browser extension that autofills applications from a stored profile.',
    icon: '04',
    accent: '#ffffff',
  },
]

const images = [
  { src: '/chronicle/chronicle_preview.png', alt: 'Chronicle Job Intelligence Dashboard' },
]

const techTags = ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Next.js', 'TypeScript', 'Google OAuth']

const learned = [
  'Reciprocal Rank Fusion (blending semantic + keyword ranking) beat pure vector search on real job postings, where exact title and skill matches still matter.',
  'int8-quantized ONNX embeddings cut inference latency enough to keep hybrid search under 35ms without a GPU in the serving path.',
  'Per-company fault isolation in the ingestion fan-out meant one broken ATS integration never took down the whole pipeline.',
  'A browser extension that autofills applications turned out to be the feature people actually asked for, repeatedly.',
]

export default function Chronicle() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [showBack, setShowBack] = useState(false)

  useEffect(() => { document.title = 'Chronicle | Pratyush Padhy' }, [])

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
            style={{ background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)' }}
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
                  <li style={{ color: '#d0d0d0' }}>Chronicle</li>
                </ol>
              </nav>
            </FadeUp>

            <FadeUp delay={0.05}>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: '#ffffff' }}>Project 01</span>
                <span
                  className="text-xs px-2.5 py-0.5 font-mono"
                  style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 4 }}
                >
                  NDCG@10 0.853 → 0.943
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-5"
                style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
              >
                Chronicle
              </h1>

              <p className="text-base leading-relaxed max-w-2xl mb-8" style={{ color: '#d0d0d0', lineHeight: 1.85 }}>
                A job aggregation platform that ingests live postings directly from the ATS systems companies
                actually use — Greenhouse, Lever, Ashby — normalizes and deduplicates them across sources, then
                ranks them with a hybrid semantic search layer instead of keyword matching.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {[
                  { val: '200+', label: 'Companies Tracked' },
                  { val: '<35ms', label: 'Search Latency (p95)' },
                  { val: '0.943', label: 'NDCG@10' },
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
                  href="https://chronicles-weld.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #ffffff, #d4d4d4)', borderRadius: 6 }}
                >
                  Live Demo ↗
                </a>
                <a
                  href="https://github.com/pratyushpad/Chronicle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #d4d4d4, #a3a3a3)', borderRadius: 6 }}
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
                Job hunting usually means checking dozens of company career pages by hand, or trusting aggregators
                that are days stale and impossible to search semantically. Chronicle ingests postings directly
                from the ATS platforms companies actually use, so listings are current and structured enough to
                rank properly instead of just keyword-matched.
              </div>
            </section>
          </FadeUp>

          {/* Pipeline */}
          <FadeUp delay={0.05}>
            <section>
              <SectionHeading number="02" label="Architecture" title="How It's Built" />
              <div className="grid md:grid-cols-2 gap-3">
                {pipeline.map((step) => (
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
              <SectionHeading number="03" label="Output" title="Job Intelligence Dashboard" />
              <div className="space-y-4">
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
                      style={{ background: 'rgba(18,18,18,0.8)' }}
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
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#d4d4d4' }}>expand ↗</span>
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
                    <span className="font-mono text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: '#d4d4d4' }}>
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
            <Link to="/projects/forge" className="block group">
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
                    Forge
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
        <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: '#d4d4d4' }}>{number}</span>
        <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.3)', display: 'block' }} />
        <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: '#9a9a9a' }}>{label}</span>
      </div>
      <h2 className="text-2xl font-bold text-white" style={{ letterSpacing: '-0.015em' }}>{title}</h2>
    </div>
  )
}
