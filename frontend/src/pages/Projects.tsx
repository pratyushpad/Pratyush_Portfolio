import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import PageTransition from '../components/animations/PageTransition'

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const projects = [
  {
    number: '01',
    title: 'Chronicle',
    subtitle: 'Full-Stack · Job Intelligence',
    description: "A job aggregation platform ingesting live postings from 200+ companies' ATS systems (Greenhouse, Lever, Ashby) via async fan-out with per-company fault isolation, then normalizing and deduplicating cross-source postings. A hybrid semantic search and recommendation layer (pgvector HNSW, int8 ONNX embeddings, RRF fusion) runs at p95 <35ms across 10K+ jobs. Ships Google OAuth, kanban application tracking, saved-search email alerts, and a Manifest V3 browser extension that autofills applications from a stored profile.",
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Next.js', 'TypeScript'],
    path: '/projects/chronicle',
    github: 'https://github.com/pratyushpad/Chronicle',
    demo: 'https://chronicles-weld.vercel.app/',
    outcome: 'Hybrid semantic search lifted NDCG@10 from 0.853 to 0.943 and MRR to 1.000 over a rule-based baseline',
    stats: [
      { label: 'Companies Tracked', value: '200+' },
      { label: 'Search Latency (p95)', value: '<35ms' },
      { label: 'NDCG@10', value: '0.943' },
    ],
  },
  {
    number: '02',
    title: 'Forge',
    subtitle: 'Reinforcement Learning · LLM Reasoning',
    description: "Qwen2.5-1.5B, heat-treated with GRPO — the reinforcement-learning recipe behind DeepSeek-R1 — against a rule-based math checker on a single 8GB consumer GPU. An interactive playground replays the cold base model and the forged model solving the same GSM8K problems side by side, making the reasoning gap visible instead of just reported.",
    tech: ['Python', 'PyTorch', 'Transformers', 'GRPO', 'Qwen2.5'],
    path: '/projects/forge',
    github: 'https://github.com/pratyushpad/Forge',
    outcome: 'GRPO lifted GSM8K pass@1 from 58.8% to 70.0% (+11.2 pts) with ARC accuracy essentially unchanged',
    stats: [
      { label: 'GSM8K Pass@1', value: '70.0%' },
      { label: 'ARC Forgetting', value: '≈flat' },
      { label: 'Train Time', value: '86 min' },
    ],
  },
  {
    number: '03',
    title: 'Lumina',
    subtitle: 'RAG · Multimodal Retrieval',
    description: 'A retrieval-augmented generation workbench built to stop LLMs from making things up. Upload PDFs, images, and raw text; Lumina indexes and embeds the content, then answers questions with citations that point back to the exact source passage — grounded, multimodal, and auditable.',
    tech: ['Python', 'RAG', 'Vector Search', 'Next.js', 'TypeScript'],
    path: '/projects/lumina',
    github: 'https://github.com/pratyushpad/Lumina',
    demo: 'https://lumina-rag-two.vercel.app/',
    outcome: 'Every answer is grounded in cited, user-provided context across text, image, and PDF sources',
    stats: [
      { label: 'Input Types', value: 'PDF/Img/Text' },
      { label: 'Answers', value: 'Cited' },
      { label: 'Retrieval', value: 'Multimodal' },
    ],
  },
  {
    number: '04',
    title: 'Face Pulse',
    subtitle: 'Deep Learning · Computer Vision',
    description: 'A systematic comparison of 4 deep learning architectures on 35,000+ facial images across 7 emotion classes. Evaluated MLP (raw pixels), MLP (geometric landmarks), CNN, and VGG16 transfer learning — demonstrating how model complexity translates to accuracy in a genuinely hard problem where human accuracy is only ~65%.',
    tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'VGG16', 'OpenCV'],
    path: '/projects/emotion-detection',
    github: 'https://github.com/pratyushpad/fer2013-emotion-detection',
    demo: 'https://face-pulse.netlify.app/',
    outcome: 'VGG16 transfer learning outperformed all baselines',
    stats: [
      { label: 'Images', value: '35K+' },
      { label: 'Models', value: '4' },
      { label: 'Classes', value: '7' },
    ],
  },
  {
    number: '05',
    title: 'Argus AI',
    subtitle: 'Computer Vision · Object Detection',
    description: 'A full-stack traffic violation detection system — upload a dashcam frame, run YOLOv8 inference across 23 object classes, and get a structured violation report back in under 35ms. A spatial rule engine cross-checks detections to flag violations like red light running or no-entry breaches, producing output that reads like an operational review, not raw model output.',
    tech: ['Python', 'YOLOv8', 'FastAPI', 'Next.js', 'TypeScript', 'Docker', 'GCP'],
    path: '/projects/argus-ai',
    github: 'https://github.com/pratyushpad/Argus-AI',
    demo: 'https://ai-argus.netlify.app/',
    outcome: 'Rule engine flags violations across 23 detection classes in <35ms',
    stats: [
      { label: 'Object Classes', value: '23' },
      { label: 'Training Images', value: '5.2K' },
      { label: 'Inference', value: '<35ms' },
    ],
  },
]

export default function Projects() {
  useEffect(() => { document.title = 'Projects | Pratyush Padhy' }, [])

  return (
    <PageTransition>
      <main id="main-content" className="relative z-10 max-w-5xl mx-auto px-6 pt-28 md:pt-36 pb-28 md:pb-20">

        {/* ═══ HEADER ═══ */}
        <RevealSection>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#ffffff' }}>00</span>
            <span style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#9a9a9a' }}>Projects</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
            Selected <span className="font-semibold">work</span>.
          </h1>
          <p className="text-sm mb-16" style={{ color: '#9a9a9a' }}>Deep learning and ML models built from scratch.</p>
        </RevealSection>

        {/* ═══ PROJECT LIST ═══ */}
        {projects.map((project) => (
          <RevealSection key={project.title}>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="py-12">
                {/* Meta row */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-xs" style={{ color: '#ffffff' }}>{project.number}</span>
                  <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.4)' }} />
                  <span className="font-mono text-xs" style={{ color: '#9a9a9a' }}>{project.subtitle}</span>
                </div>

                {/* Title & description */}
                <Link to={project.path} className="group block mb-8">
                  <h2
                    className="text-3xl font-semibold text-white mb-4 group-hover:text-white transition-colors duration-200"
                    style={{ letterSpacing: '-0.01em' }}
                  >
                    {project.title}
                  </h2>
                  <p className="text-sm leading-relaxed max-w-3xl" style={{ color: '#d0d0d0' }}>
                    {project.description}
                  </p>
                </Link>

                {/* Stats */}
                <div className="flex gap-10 mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-xl font-semibold text-white">{stat.value}</p>
                      <p className="text-xs font-mono mt-1" style={{ color: '#9a9a9a' }}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Outcome */}
                <p className="text-xs font-mono mb-6" style={{ color: '#d0d0d0' }}>
                  <span style={{ color: '#ffffff' }}>Result:</span> {project.outcome}
                </p>

                {/* Tech + links */}
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <motion.span
                        key={t}
                        className="text-xs px-3 py-1.5 font-mono cursor-default"
                        style={{ color: '#b0b0b0', border: '1px solid rgba(255,255,255,0.08)' }}
                        whileHover={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex gap-4 items-center">
                    {'demo' in project && project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono transition-colors hover:text-white"
                        style={{ color: '#ffffff' }}
                      >
                        Live demo ↗
                      </a>
                    )}
                    <Link
                      to={project.path}
                      className="px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20"
                      style={{ border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.08)' }}
                    >
                      Explore →
                    </Link>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono transition-colors hover:text-white"
                      style={{ color: '#9a9a9a' }}
                    >
                      source ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        ))}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

      </main>
    </PageTransition>
  )
}
