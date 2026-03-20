import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import PageTransition from '../components/animations/PageTransition'
import FadeUp from '../components/animations/FadeUp'
import StaggerContainer, { staggerItem } from '../components/animations/StaggerContainer'

const projects = [
  {
    title: 'FER2013 Emotion Detection',
    description: 'Compared 4 deep learning architectures on 35,000+ facial images. VGG16 achieved best accuracy; CNN demonstrated strong spatial feature learning.',
    tech: ['Python', 'TensorFlow', 'CNN', 'VGG16'],
    path: '/projects/emotion-detection',
    github: 'https://github.com/Pratyushpad27/fer2013-emotion-detection',
    demo: 'https://emotion-detec.netlify.app/',
    number: '01',
    thumbnail: '/emotion/cnn_confusion_matrix.png',
  },
  {
    title: 'Character-Level Language Model',
    description: 'Trained RNN and LSTM on 200,000 characters with temperature sampling controlling creativity vs coherence in generated text.',
    tech: ['Python', 'TensorFlow', 'RNN', 'LSTM'],
    path: '/projects/language-model',
    github: 'https://github.com/Pratyushpad27/char-level-language-model',
    number: '02',
    thumbnail: '/fakenews/training_loss.png',
  },
]

const skillGroups: Record<string, string[]> = {
  'Languages': ['Python', 'Java', 'R', 'C++', 'TypeScript', 'JavaScript'],
  'ML / AI': ['TensorFlow', 'Keras', 'CNNs', 'LSTMs', 'scikit-learn'],
  'Libraries': ['numpy', 'Pandas', 'Matplotlib'],
  'Web': ['React', 'Tailwind CSS', 'HTML', 'CSS'],
  'Tools': ['Git', 'VS Code', 'Google Colab', 'Vite'],
}

const roles = [
  'Machine Learning Engineer.',
  'Deep Learning Researcher.',
  'CS Student @ UC Irvine.',
  'Data@UCI Mentor.',
]

function useTypewriter(words: string[], speed = 55, pause = 2400) {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) {
      setDisplayed(words[0])
      return
    }
    const word = words[idx]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < word.length) {
      timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), speed)
    } else if (!deleting && displayed.length === word.length) {
      timer = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2)
    } else {
      setDeleting(false)
      setIdx((i) => (i + 1) % words.length)
    }

    return () => clearTimeout(timer)
  }, [displayed, deleting, idx, words, speed, pause, shouldReduce])

  return displayed
}

const heroLines = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } },
  item: {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
  },
}

export default function Home() {
  const typeText = useTypewriter(roles)

  useEffect(() => { document.title = 'Pratyush Padhy | Portfolio' }, [])

  return (
    <PageTransition>
      <main id="main-content" className="max-w-6xl mx-auto px-6 pt-24 md:pt-32 pb-28 md:pb-20">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="min-h-[82vh] flex flex-col justify-center mb-24 relative overflow-hidden">
          <div
            className="absolute pointer-events-none"
            aria-hidden="true"
            style={{
              top: '-20%',
              left: '-10%',
              width: '80%',
              height: '80%',
              background: 'radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.14) 0%, rgba(139,92,246,0.07) 45%, transparent 70%)',
              filter: 'blur(48px)',
            }}
          />
          <div
            className="absolute pointer-events-none"
            aria-hidden="true"
            style={{
              bottom: '-10%',
              right: '-5%',
              width: '50%',
              height: '50%',
              background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 65%)',
              filter: 'blur(40px)',
            }}
          />

          <motion.div
            variants={heroLines.container}
            initial="hidden"
            animate="show"
            className="relative z-10"
          >
            <motion.p
              variants={heroLines.item}
              className="font-mono text-xs tracking-[0.28em] uppercase mb-7"
              style={{ color: '#3b82f6' }}
            >
              Pratyush Padhy · UC Irvine · CS &apos;28
            </motion.p>

            <motion.div variants={heroLines.item} className="mb-8">
              <h1
                className="font-bold leading-[0.88] text-white block"
                style={{ fontSize: 'clamp(3.8rem, 11vw, 8.5rem)', letterSpacing: '-0.025em' }}
              >
                Building
              </h1>
              <h1
                className="font-bold leading-[0.88] gradient-text block"
                style={{ fontSize: 'clamp(3.8rem, 11vw, 8.5rem)', letterSpacing: '-0.025em' }}
              >
                intelligent
              </h1>
              <h1
                className="font-bold leading-[0.88] text-white block"
                style={{ fontSize: 'clamp(3.8rem, 11vw, 8.5rem)', letterSpacing: '-0.025em' }}
              >
                systems.
              </h1>
            </motion.div>

            <motion.div
              variants={heroLines.item}
              className="flex items-center mb-7 h-8"
              aria-live="polite"
              aria-label={`Currently: ${typeText}`}
            >
              <span className="font-mono text-base md:text-lg" style={{ color: '#60a5fa' }}>
                {typeText}
                <span
                  className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse"
                  style={{ backgroundColor: '#3b82f6' }}
                  aria-hidden="true"
                />
              </span>
            </motion.div>

            <motion.p
              variants={heroLines.item}
              className="text-gray-400 text-lg max-w-lg mb-10 leading-relaxed"
            >
              Deep learning models, NLP research, and mentoring 50+ students — from
              scratch, one epoch at a time.
            </motion.p>

            <motion.div variants={heroLines.item} className="flex gap-4 flex-wrap">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-7 py-3.5 rounded-xl font-semibold text-white text-base transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
              >
                View Projects
              </a>
              <a
                href="/Pratyush_Padhy_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:text-white hover:border-blue-400"
                style={{ border: '1px solid rgba(59,130,246,0.4)', color: '#60a5fa' }}
              >
                Resume
              </a>
              <a
                href="https://github.com/Pratyushpad27"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:text-white"
                style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pratyush-padhy-b7017a269/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:text-white"
                style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' }}
              >
                LinkedIn
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Projects with thumbnails + animated border ──────── */}
        <FadeUp>
          <section id="projects" className="mb-28 scroll-mt-24">
            <p className="font-mono text-xs mb-2" style={{ color: '#3b82f6' }}>SELECTED WORK</p>
            <h3 className="text-2xl font-bold text-white mb-2">Projects</h3>
            <p className="text-gray-500 mb-8 text-sm">Deep learning models built from scratch</p>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <FadeUp key={project.title} delay={i * 0.1}>
                  <motion.div
                    className="relative rounded-xl overflow-hidden h-full group"
                    whileHover="hover"
                    initial="idle"
                  >
                    {/* Animated border glow on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none z-10"
                      variants={{
                        idle: {
                          boxShadow: '0 0 0px rgba(59,130,246,0), inset 0 0 0px rgba(59,130,246,0)',
                          borderColor: 'rgba(255,255,255,0.08)',
                        },
                        hover: {
                          boxShadow: '0 0 40px rgba(59,130,246,0.15), inset 0 0 0px rgba(59,130,246,0)',
                          borderColor: 'rgba(59,130,246,0.5)',
                        },
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                      aria-hidden="true"
                    />

                    <div
                      className="h-full flex flex-col"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      {/* Thumbnail */}
                      <div
                        className="h-40 overflow-hidden flex items-center justify-center relative"
                        style={{ backgroundColor: 'rgba(19,19,26,0.8)' }}
                      >
                        <img
                          src={project.thumbnail}
                          alt={`${project.title} preview`}
                          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 transition-opacity duration-300 opacity-40 group-hover:opacity-20"
                          style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)' }}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <p className="font-mono text-xs mb-2" style={{ color: '#3b82f6' }}>
                          Project {project.number}
                        </p>
                        <h4 className="text-lg font-semibold text-white mb-3">
                          {project.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.tech.map((t) => (
                            <motion.span
                              key={t}
                              className="text-xs px-2 py-1 rounded font-mono cursor-default"
                              style={{ backgroundColor: 'rgba(29,78,216,0.15)', color: '#60a5fa', border: '1px solid rgba(29,78,216,0.4)' }}
                              whileHover={{ scale: 1.05, backgroundColor: 'rgba(29,78,216,0.25)' }}
                              transition={{ duration: 0.15 }}
                            >
                              {t}
                            </motion.span>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          <Link
                            to={project.path}
                            className="text-sm font-medium transition-colors hover:text-white"
                            style={{ color: '#3b82f6' }}
                          >
                            View Project →
                          </Link>
                          {'demo' in project && project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium transition-colors hover:text-white"
                              style={{ color: '#10b981' }}
                            >
                              Live Demo ↗
                            </a>
                          )}
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                          >
                            GitHub ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                to="/projects"
                className="text-sm font-medium transition-colors hover:text-white"
                style={{ color: '#60a5fa' }}
              >
                View all projects →
              </Link>
            </div>
          </section>
        </FadeUp>

        {/* ── Skills ───────────────────────────────────────────── */}
        <FadeUp>
          <section className="mb-28">
            <p className="font-mono text-xs mb-2" style={{ color: '#3b82f6' }}>TECH STACK</p>
            <h3 className="text-2xl font-bold text-white mb-2">Skills</h3>
            <p className="text-gray-500 mb-8 text-sm">Technologies I work with</p>
            <div className="flex flex-col gap-6">
              {Object.entries(skillGroups).map(([category, skills]) => (
                <div key={category}>
                  <p className="text-gray-500 text-xs font-mono mb-3 uppercase tracking-wider">
                    {category}
                  </p>
                  <StaggerContainer className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={staggerItem}
                        className="px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 hover:text-white cursor-default"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: '#9ca3af',
                        }}
                        whileHover={{
                          borderColor: 'rgba(59,130,246,0.4)',
                          color: '#ffffff',
                          background: 'rgba(59,130,246,0.08)',
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </StaggerContainer>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── Contact ──────────────────────────────────────────── */}
        <FadeUp>
          <section
            className="rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 60%)',
              }}
            />
            <div className="relative z-10">
              <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#3b82f6' }}>
                Get in Touch
              </p>
              <h3
                className="font-bold text-white mb-4"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
              >
                Let&apos;s connect.
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Open to ML research opportunities, internships, and collaborations.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="mailto:pratyushpadhy007@gmail.com"
                  className="px-7 py-3.5 rounded-xl font-semibold text-white text-base transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
                >
                  pratyushpadhy007@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/pratyush-padhy-b7017a269/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:text-white"
                  style={{ border: '1px solid rgba(59,130,246,0.4)', color: '#60a5fa' }}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </section>
        </FadeUp>

      </main>
    </PageTransition>
  )
}
