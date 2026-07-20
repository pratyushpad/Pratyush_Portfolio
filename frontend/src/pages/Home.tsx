import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion, useInView, useScroll, useTransform, animate } from 'framer-motion'
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
    title: 'Chronicle',
    subtitle: 'Full-Stack · Job Intelligence',
    description: 'A job aggregation platform ingesting live postings from 200+ companies via async fan-out. Hybrid semantic search lifts NDCG@10 from 0.853 to 0.943 over a rule-based baseline.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Next.js'],
    path: '/projects/chronicle',
    github: 'https://github.com/pratyushpad/Chronicle',
    demo: 'https://chronicles-weld.vercel.app/',
    number: '01',
    thumbnail: '/chronicle/chronicle_preview.png',
  },
  {
    title: 'Forge',
    subtitle: 'Reinforcement Learning · LLM Reasoning',
    description: 'Fine-tuned Qwen2.5-1.5B with GRPO against a math checker on a single 8GB GPU — GSM8K accuracy climbed from 58.8% to 70.0% with no measurable forgetting.',
    tech: ['Python', 'PyTorch', 'GRPO', 'Qwen2.5'],
    path: '/projects/forge',
    github: 'https://github.com/pratyushpad/Forge',
    number: '02',
    thumbnail: '/forge/forge_preview.png',
  },
  {
    title: 'Lumina',
    subtitle: 'RAG · Multimodal Retrieval',
    description: "A grounded, multimodal RAG workbench — upload PDFs, images, and text, and get cited answers backed by your own documents instead of the model's memory.",
    tech: ['Python', 'RAG', 'Vector Search', 'Next.js'],
    path: '/projects/lumina',
    github: 'https://github.com/pratyushpad/Lumina',
    demo: 'https://lumina-rag-two.vercel.app/',
    number: '03',
    thumbnail: '/lumina/lumina_preview.png',
  },
]

const skillCategories = [
  { label: 'ML / AI', color: '#ffffff', skills: ['TensorFlow', 'Keras', 'scikit-learn', 'OpenCV', 'Dlib'] },
  { label: 'Languages', color: '#a3a3a3', skills: ['Python', 'Java', 'C++', 'R', 'TypeScript'] },
  { label: 'Web & Tools', color: '#ffffff', skills: ['React', 'Git', 'Vite', 'Tailwind'] },
]

const roles = [
  'Machine Learning Engineer.',
  'Deep Learning Researcher.',
  'CS Student @ UC Irvine.',
  'AI/ML Intern @ TCS.',
]

const sections = ['Hero', 'About', 'Projects', 'Contact']

const stats = [
  { val: 3.86, suffix: '', prefix: '', label: 'GPA' },
  { val: 93, suffix: '%', prefix: '', label: 'Model Accuracy' },
  { val: 5500, suffix: '', prefix: '$', label: 'Funding Secured' },
]

function useTypewriter(words: string[], speed = 55, pause = 2400) {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const shouldReduce = useReducedMotion()
  useEffect(() => {
    if (shouldReduce) { setDisplayed(words[0]); return }
    const word = words[idx]
    let timer: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < word.length)
      timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), speed)
    else if (!deleting && displayed.length === word.length)
      timer = setTimeout(() => setDeleting(true), pause)
    else if (deleting && displayed.length > 0)
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2)
    else { setDeleting(false); setIdx((i) => (i + 1) % words.length) }
    return () => clearTimeout(timer)
  }, [displayed, deleting, idx, words, speed, pause, shouldReduce])
  return displayed
}

function useCountUp(target: number, decimals = 0) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(0, target, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate(v) {
        if (ref.current)
          ref.current.textContent = v.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
      },
    })
    return () => controls.stop()
  }, [inView, target, decimals])
  return ref
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-16">
      <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#ffffff' }}>{number}</span>
      <span style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.35)', display: 'block' }} />
      <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#9a9a9a' }}>{label}</span>
    </div>
  )
}

function SectionNav({ active }: { active: number }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-4">
      {sections.map((name, i) => (
        <a
          key={name}
          href={`#s${i}`}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(`s${i}`)?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="group flex items-center gap-3"
        >
          <span
            className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ color: active === i ? '#ffffff' : '#9a9a9a' }}
          >
            {name}
          </span>
          <span
            className="block transition-all duration-300"
            style={{
              width: active === i ? 32 : 12,
              height: 2,
              background: active === i ? '#ffffff' : 'rgba(255,255,255,0.12)',
            }}
          />
        </a>
      ))}
    </div>
  )
}

function NextSection({ target, label }: { target: string; label: string }) {
  return (
    <motion.a
      href={`#${target}`}
      onClick={(e) => {
        e.preventDefault()
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
      }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <span className="text-xs font-mono uppercase tracking-widest group-hover:text-white transition-colors" style={{ color: '#9a9a9a' }}>
        {label}
      </span>
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v12M3 9l5 5 5-5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.a>
  )
}

function TerminalCard() {
  const lines = [
    { prompt: true, text: 'whoami', color: '' },
    { prompt: false, text: 'pratyush padhy', color: '#ffffff' },
    { prompt: true, text: 'status', color: '' },
    { prompt: false, text: '✦ open to ML & software internships', color: '#ffffff' },
    { prompt: true, text: 'current --list', color: '' },
    { prompt: false, text: '├── AI/ML Intern @ TCS', color: '#e5e7eb' },
    { prompt: false, text: '├── UC Irvine CS, Class of 2028', color: '#e5e7eb' },
    { prompt: false, text: '└── Robotics · RL & Imitation Learning', color: '#e5e7eb' },
    { prompt: true, text: 'location', color: '' },
    { prompt: false, text: 'Irvine, CA', color: '#ffffff' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
      style={{
        background: 'rgba(12,14,16,0.92)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 12,
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 50px rgba(255,255,255,0.07), inset 0 0 0 1px rgba(255,255,255,0.02)',
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        <span className="ml-2 font-mono text-xs">
          <span style={{ color: '#ffffff' }}>pratyush@portfolio</span>
          <span style={{ color: '#b0b0b0' }}> : ~ %</span>
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.07, duration: 0.3 }}
            className="flex items-start gap-2"
          >
            {line.prompt ? (
              <>
                <span style={{ color: '#ffffff' }}>❯</span>
                <span style={{ color: '#ffffff' }}>{line.text}</span>
              </>
            ) : (
              <span className="pl-4" style={{ color: line.color || '#9ca3af' }}>{line.text}</span>
            )}
          </motion.div>
        ))}
        {/* Blinking cursor */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span style={{ color: '#ffffff' }}>❯</span>
          <motion.span
            className="inline-block w-2 h-4"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            style={{ background: '#ffffff' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

function StatCounter({ val, suffix, label, decimals = 0, prefix = '' }: { val: number; suffix: string; label: string; decimals?: number; prefix?: string }) {
  const ref = useCountUp(val, decimals)
  return (
    <div className="text-center md:text-left">
      <p className="text-3xl font-bold text-white tabular-nums">
        <span>{prefix}</span>
        <span ref={ref}>{val.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>
        <span>{suffix}</span>
      </p>
      <p className="text-xs font-mono mt-1.5 uppercase tracking-wider" style={{ color: '#9a9a9a' }}>{label}</p>
    </div>
  )
}

export default function Home() {
  const typeText = useTypewriter(roles)
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { document.title = 'Pratyush Padhy | Portfolio' }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.id.replace('s', ''))
            if (!isNaN(idx)) setActiveSection(idx)
          }
        })
      },
      { threshold: 0.35 }
    )
    for (let i = 0; i < 4; i++) {
      const el = document.getElementById(`s${i}`)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 700], [0, 140])
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])

  const stagger = {
    container: { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } },
    item: {
      hidden: { opacity: 0, y: 24 },
      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
    },
  }

  return (
    <PageTransition>
      <SectionNav active={activeSection} />

      <main id="main-content" className="relative z-10" ref={containerRef}>

        {/* ═══ HERO ═══ */}
        <section id="s0" className="min-h-screen flex items-center px-6 pt-28 pb-20 relative overflow-hidden">

          {/* Ambient background glow */}
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <div style={{
              position: 'absolute', top: '15%', left: '5%', width: 480, height: 480,
              background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
              borderRadius: '50%', filter: 'blur(40px)',
            }} />
            <div style={{
              position: 'absolute', top: '40%', right: '10%', width: 360, height: 360,
              background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)',
              borderRadius: '50%', filter: 'blur(40px)',
            }} />
          </div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 w-full max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">

              {/* Left — main text */}
              <motion.div variants={stagger.container} initial="hidden" animate="show">

                {/* Name — single h1, inline gradient on last name */}
                <motion.h1
                  variants={stagger.item}
                  className="font-bold text-white mb-5"
                  style={{ fontSize: 'clamp(3rem, 7.5vw, 6rem)', letterSpacing: '-0.035em', lineHeight: 1.0 }}
                >
                  Pratyush{' '}
                  <span className="text-white">Padhy</span>
                  <span style={{ color: '#ffffff' }}>.</span>
                </motion.h1>

                {/* Short descriptor */}
                <motion.p
                  variants={stagger.item}
                  className="text-lg font-light mb-4"
                  style={{ color: '#d0d0d0', letterSpacing: '-0.01em', lineHeight: 1.5 }}
                >
                  I build <span className="text-white font-medium">intelligent systems</span> — deep learning models,{' '}
                  NLP experiments, and things that learn from data.
                </motion.p>

                {/* Typewriter */}
                <motion.div variants={stagger.item} className="flex items-center gap-2 mb-10 h-6">
                  <span className="font-mono text-xs" style={{ color: '#ffffff' }}>~$</span>
                  <span className="font-mono text-sm" style={{ color: '#ffffff' }}>
                    {typeText}
                    <span className="inline-block w-px h-3.5 ml-0.5 align-middle animate-pulse" style={{ backgroundColor: '#ffffff' }} aria-hidden="true" />
                  </span>
                </motion.div>

                {/* CTAs — primary filled + secondary ghost */}
                <motion.div variants={stagger.item} className="flex gap-3 flex-wrap mb-12">
                  <a
                    href="#s2"
                    onClick={(e) => { e.preventDefault(); document.getElementById('s2')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="px-7 py-3 text-sm font-semibold text-black transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #ffffff, #d4d4d4)', borderRadius: 8 }}
                  >
                    View my work
                  </a>
                  <a
                    href="/Pratyush_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3 text-sm font-medium transition-all duration-200 hover:text-white hover:border-white/20 active:scale-95"
                    style={{ color: '#d0d0d0', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                  >
                    Resume ↗
                  </a>
                  <a
                    href="https://github.com/pratyushpad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3 text-sm font-medium transition-all duration-200 hover:text-white hover:border-white/20 active:scale-95"
                    style={{ color: '#d0d0d0', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                  >
                    GitHub ↗
                  </a>
                </motion.div>

                {/* Stats row — with dividers */}
                <motion.div
                  variants={stagger.item}
                  className="flex items-center gap-0 pt-8"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {stats.map((s, i) => (
                    <div key={s.label} className="flex items-center">
                      <div className="pr-8 md:pr-10">
                        <StatCounter val={s.val} suffix={s.suffix} prefix={s.prefix} label={s.label} decimals={s.val % 1 !== 0 ? 2 : 0} />
                      </div>
                      {i < stats.length - 1 && (
                        <div className="h-10 mr-8 md:mr-10" style={{ width: 1, background: 'rgba(255,255,255,0.07)' }} />
                      )}
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right — terminal card */}
              <div className="hidden lg:block">
                <TerminalCard />
              </div>
            </div>
          </motion.div>

          <NextSection target="s1" label="About me" />
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="s1" className="min-h-screen flex items-center px-6 py-32 relative">
          <div className="max-w-5xl mx-auto w-full">
            <RevealSection>
              <SectionLabel number="01" label="About" />
            </RevealSection>

            <div className="grid md:grid-cols-2 gap-16">
              <RevealSection>
                <h2
                  className="text-4xl font-light text-white mb-8"
                  style={{ lineHeight: 1.2, letterSpacing: '-0.02em' }}
                >
                  CS student at <span className="font-semibold">UC Irvine</span>{' '}
                  focused on deep learning and NLP.
                </h2>
                <p className="text-sm leading-relaxed mb-10" style={{ color: '#d0d0d0', lineHeight: 1.85 }}>
                  I build deep learning models from scratch and ship full-stack ML systems. Currently an AI/ML
                  intern at TCS's Medical Robotics Center, training reinforcement- and imitation-learning models
                  that teach robots how to act. Previously built course-planning tools at Ready Tutor, mentored
                  50+ students at Data@UCI, and conducted RNA-seq research at Stanford iLab.
                </p>

                {/* Currently block */}
                <div
                  className="p-5 mb-8"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 8,
                  }}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.25em] mb-3" style={{ color: '#ffffff' }}>
                    Currently
                  </p>
                  <ul className="space-y-2">
                    {[
                      'AI/ML intern at TCS — reinforcement & imitation learning for robotics',
                      'Building full-stack ML tools & research projects',
                      'Open to ML & software internship opportunities',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: '#d0d0d0' }}>
                        <span style={{ color: '#ffffff', marginTop: 2 }}>›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-6">
                  <a href="/Pratyush_Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm font-medium transition-colors hover:text-white" style={{ color: '#ffffff' }}>Resume ↗</a>
                  <a href="https://www.linkedin.com/in/pratyushpad" target="_blank" rel="noopener noreferrer" className="text-sm font-medium transition-colors hover:text-white" style={{ color: '#9a9a9a' }}>LinkedIn ↗</a>
                  <a href="mailto:ppadhy@uci.edu" className="text-sm font-medium transition-colors hover:text-white" style={{ color: '#9a9a9a' }}>Email ↗</a>
                </div>
              </RevealSection>

              <RevealSection>
                <p className="font-mono text-xs uppercase tracking-[0.3em] mb-6" style={{ color: '#9a9a9a' }}>
                  Technologies
                </p>
                <div className="space-y-6">
                  {skillCategories.map((cat) => (
                    <div key={cat.label}>
                      <p
                        className="font-mono text-xs mb-3 flex items-center gap-2"
                        style={{ color: cat.color }}
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full"
                          style={{ background: cat.color }}
                        />
                        {cat.label}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((s) => (
                          <motion.span
                            key={s}
                            className="px-3 py-1.5 text-xs font-mono cursor-default transition-all duration-150"
                            style={{
                              color: '#d0d0d0',
                              border: '1px solid rgba(255,255,255,0.07)',
                              borderRadius: 4,
                            }}
                            whileHover={{
                              color: '#fff',
                              borderColor: cat.color + '60',
                              background: cat.color + '10',
                            }}
                          >
                            {s}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </RevealSection>
            </div>
          </div>

          <NextSection target="s2" label="Projects" />
        </section>

        {/* ═══ PROJECTS ═══ */}
        <section id="s2" className="min-h-screen flex flex-col justify-center px-6 py-32 relative">
          <div className="max-w-5xl mx-auto w-full">
            <RevealSection>
              <SectionLabel number="02" label="Projects" />
              <div className="flex items-end justify-between mb-12">
                <h2
                  className="text-4xl font-light text-white"
                  style={{ lineHeight: 1.2, letterSpacing: '-0.02em' }}
                >
                  Selected <span className="font-semibold">work</span>.
                </h2>
                <Link
                  to="/projects"
                  className="hidden md:flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
                  style={{ color: '#9a9a9a' }}
                >
                  All projects →
                </Link>
              </div>
            </RevealSection>

            <div className="space-y-0">
              {projects.map((project, idx) => (
                <RevealSection key={project.title}>
                  <Link to={project.path} className="group block relative overflow-hidden">
                    {/* Ghost project number */}
                    <span
                      className="absolute pointer-events-none select-none font-bold"
                      style={{
                        fontSize: 'clamp(80px, 14vw, 160px)',
                        letterSpacing: '-0.04em',
                        color: 'transparent',
                        WebkitTextStroke: '1px rgba(255,255,255,0.03)',
                        right: idx % 2 === 0 ? '2%' : 'auto',
                        left: idx % 2 !== 0 ? '2%' : 'auto',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 0,
                        transition: 'opacity 0.3s',
                        userSelect: 'none',
                      }}
                      aria-hidden="true"
                    >
                      {project.number}
                    </span>

                    <div
                      className="relative z-10"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className={`grid md:grid-cols-2 gap-0 ${idx % 2 !== 0 ? 'md:[direction:rtl]' : ''}`}>
                        {/* Image */}
                        <div
                          className="relative overflow-hidden"
                          style={{ minHeight: 300, direction: 'ltr' }}
                        >
                          <div
                            className="absolute inset-0 flex items-center justify-center p-10"
                            style={{ backgroundColor: 'rgba(10,10,10,0.95)' }}
                          >
                            <img
                              src={project.thumbnail}
                              alt={project.title}
                              className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105 opacity-50 group-hover:opacity-100"
                              loading="lazy"
                            />
                          </div>
                          {/* Hover overlay */}
                          <div
                            className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: 'rgba(0,0,0,0.65)' }}
                          >
                            <span
                              className="px-5 py-2.5 text-sm font-medium text-white"
                              style={{ border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.12)', borderRadius: 4 }}
                            >
                              View project →
                            </span>
                            {'demo' in project && project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                                style={{ border: '1px solid rgba(255,255,255,0.2)', borderRadius: 4 }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                Live demo ↗
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Text */}
                        <div className="p-10 md:p-12 flex flex-col justify-between" style={{ direction: 'ltr' }}>
                          <div>
                            <div className="flex items-center gap-4 mb-4">
                              <span className="font-mono text-xs" style={{ color: '#9a9a9a' }}>{project.number}</span>
                              <span
                                className="font-mono text-xs px-2 py-0.5"
                                style={{ color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 3 }}
                              >
                                {project.subtitle}
                              </span>
                            </div>
                            <h3
                              className="text-2xl font-semibold text-white mb-4 group-hover:text-white transition-colors duration-300"
                              style={{ letterSpacing: '-0.01em' }}
                            >
                              {project.title}
                            </h3>
                            <p className="text-sm leading-relaxed mb-8" style={{ color: '#d0d0d0', lineHeight: 1.8 }}>
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((t) => (
                                <span
                                  key={t}
                                  className="text-xs font-mono px-3 py-1"
                                  style={{ color: '#b0b0b0', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 3 }}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div
                            className="flex gap-4 items-center mt-8 pt-6"
                            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
                          >
                            <span
                              className="text-sm font-medium group-hover:text-white transition-colors inline-flex items-center gap-1"
                              style={{ color: '#ffffff' }}
                            >
                              Learn more
                              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                            </span>
                            <span className="flex-1" />
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono transition-colors hover:text-white"
                              style={{ color: '#9a9a9a' }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              source ↗
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </RevealSection>
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link to="/projects" className="text-sm font-medium hover:text-white transition-colors" style={{ color: '#9a9a9a' }}>
                All projects →
              </Link>
            </div>
          </div>

          <NextSection target="s3" label="Contact" />
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="s3" className="min-h-[75vh] flex items-center justify-center px-6 py-32 relative overflow-hidden">
          {/* Ghost text */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="font-bold uppercase"
              style={{
                fontSize: 'clamp(60px, 14vw, 180px)',
                letterSpacing: '-0.04em',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.025)',
              }}
            >
              CONNECT
            </span>
          </div>

          <RevealSection className="max-w-2xl text-center relative z-10">
            <SectionLabel number="03" label="Contact" />
            <h2
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              style={{ lineHeight: 1.05, letterSpacing: '-0.03em' }}
            >
              Let's build something.
            </h2>
            <p className="text-sm leading-relaxed mb-12 max-w-md mx-auto" style={{ color: '#d0d0d0', lineHeight: 1.85 }}>
              Open to machine learning and software internships, research, and collaborations.
              I respond to every message.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="mailto:ppadhy@uci.edu"
                className="px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/25 active:scale-95"
                style={{ border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.1)', borderRadius: 6 }}
              >
                Email ↗
              </a>
              <a
                href="https://www.linkedin.com/in/pratyushpad"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 text-sm font-medium transition-all duration-200 hover:text-white hover:border-white/30 active:scale-95"
                style={{ color: '#b0b0b0', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6 }}
              >
                LinkedIn ↗
              </a>
            </div>
          </RevealSection>
        </section>

      </main>
    </PageTransition>
  )
}
