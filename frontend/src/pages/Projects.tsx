import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/animations/PageTransition'
import FadeUp from '../components/animations/FadeUp'
import GlowCard from '../components/animations/GlowCard'

const projects = [
  {
    number: '01',
    title: 'FER2013 Emotion Detection',
    description: 'A systematic comparison of 4 deep learning architectures on 35,000+ facial images across 7 emotion classes. Evaluated MLP (raw pixels), MLP (geometric landmarks), CNN, and VGG16 transfer learning — demonstrating how model complexity translates to accuracy in a genuinely hard problem where human accuracy is only ~65%.',
    tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'VGG16', 'OpenCV'],
    path: '/projects/emotion-detection',
    github: 'https://github.com/Pratyushpad27/fer2013-emotion-detection',
    demo: 'https://emotion-detec.netlify.app/',
    outcome: 'VGG16 transfer learning outperformed all baselines',
  },
  {
    number: '02',
    title: 'Character-Level Language Model',
    description: 'An RNN and LSTM trained character-by-character on 200,000 characters of text — building a generative language model from scratch. Uses a 70-character vocabulary, sliding window of 40 characters creating 66,000+ training pairs, and temperature sampling to control how creative vs coherent the output is.',
    tech: ['Python', 'TensorFlow', 'Keras', 'RNN', 'LSTM', 'NLP'],
    path: '/projects/language-model',
    github: 'https://github.com/Pratyushpad27/char-level-language-model',
    outcome: 'LSTM outperformed SimpleRNN on coherent text generation',
  },
]

export default function Projects() {
  useEffect(() => { document.title = 'Projects | Pratyush Padhy' }, [])

  return (
    <PageTransition>
      <main id="main-content" className="max-w-4xl mx-auto px-6 pt-28 md:pt-36 pb-28 md:pb-20">

        <FadeUp>
          <p className="font-mono text-xs mb-2" style={{ color: '#3b82f6' }}>MY WORK</p>
          <h1 className="text-4xl font-bold text-white mb-4">Projects</h1>
          <p className="text-gray-500 mb-12">Deep learning and ML models built from scratch.</p>
        </FadeUp>

        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <FadeUp key={project.title} delay={i * 0.1}>
              <GlowCard className="p-8">
                <div className="mb-4">
                  <p className="font-mono text-xs mb-1" style={{ color: '#3b82f6' }}>
                    Project {project.number}
                  </p>
                  <h2 className="text-2xl font-bold text-white mb-3">{project.title}</h2>
                  {/* Outcome badge */}
                  <span
                    className="text-xs px-3 py-1.5 rounded-full font-mono hidden md:inline-block"
                    style={{ backgroundColor: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}
                  >
                    ✓ {project.outcome}
                  </span>
                </div>

                <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <motion.span
                      key={t}
                      className="text-xs px-3 py-1 rounded font-mono cursor-default"
                      style={{ backgroundColor: 'rgba(29,78,216,0.15)', color: '#60a5fa', border: '1px solid rgba(29,78,216,0.4)' }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(29,78,216,0.25)' }}
                      transition={{ duration: 0.15 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={project.path}
                    className="px-5 py-2 rounded-lg font-medium text-white text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
                  >
                    Explore Project →
                  </Link>
                  {'demo' in project && project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] text-white"
                      style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                    >
                      Live Demo ↗
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:text-white"
                    style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' }}
                  >
                    GitHub ↗
                  </a>
                </div>
              </GlowCard>
            </FadeUp>
          ))}
        </div>

      </main>
    </PageTransition>
  )
}
