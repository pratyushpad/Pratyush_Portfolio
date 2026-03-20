import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/animations/PageTransition'
import FadeUp from '../components/animations/FadeUp'
import GlowCard from '../components/animations/GlowCard'
import Lightbox from '../components/Lightbox'

const models = [
  {
    name: 'MLP (Pixels)',
    description: 'Fully connected network on raw 48×48 pixel inputs',
    result: 'Baseline performance',
  },
  {
    name: 'MLP (Landmarks)',
    description: 'MLP trained on geometric facial landmark distances',
    result: 'Improved over pixels',
  },
  {
    name: 'CNN',
    description: 'Convolutional network with batch normalization and dropout',
    result: 'Strong spatial feature learning',
  },
  {
    name: 'VGG16 Transfer',
    description: 'Pretrained ImageNet model fine-tuned for emotion classification',
    result: 'Best overall performance',
  },
]

const images = [
  { src: '/emotion/cnn_training.png', alt: 'CNN Training Curves' },
  { src: '/emotion/cnn_confusion_matrix.png', alt: 'CNN Confusion Matrix' },
  { src: '/emotion/model_comparison.png', alt: 'Model Comparison' },
  { src: '/emotion/vgg16_transfer_learning_training.png', alt: 'VGG16 Training' },
]

const techTags = ['Python', 'TensorFlow', 'Keras', 'CNN', 'VGG16', 'Transfer Learning', 'OpenCV']

export default function EmotionDetection() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [showBack, setShowBack] = useState(false)

  useEffect(() => { document.title = 'Emotion Detection | Pratyush Padhy' }, [])

  useEffect(() => {
    const handleScroll = () => setShowBack(window.scrollY > 200)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <PageTransition>
      <main id="main-content" className="max-w-4xl mx-auto px-6 pt-28 md:pt-36 pb-28 md:pb-20">

        {/* Breadcrumbs */}
        <FadeUp>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">FER2013 Emotion Detection</li>
            </ol>
          </nav>
        </FadeUp>

        {/* Header */}
        <FadeUp>
          <section className="mb-12">
            <p className="font-mono text-sm mb-2" style={{ color: '#3b82f6' }}>Project 01</p>
            <h1 className="text-4xl font-bold text-white mb-4">FER2013 Emotion Detection</h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mb-6">
              A comparative study of 4 deep learning architectures for detecting human emotions
              from facial images. Built to explore how model complexity affects accuracy — from
              a simple MLP all the way to VGG16 transfer learning on 35,000+ images.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {techTags.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded font-mono"
                  style={{ backgroundColor: 'rgba(29,78,216,0.15)', color: '#60a5fa', border: '1px solid rgba(29,78,216,0.4)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://emotion-detec.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
              >
                Live Demo ↗
              </a>
              <a
                href="https://github.com/Pratyushpad27/fer2013-emotion-detection"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
              >
                View on GitHub ↗
              </a>
            </div>
          </section>
        </FadeUp>

        {/* Problem */}
        <FadeUp delay={0.05}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Problem</h2>
            <GlowCard className="p-6">
              <p className="text-gray-400 leading-relaxed">
                Human emotion recognition has applications in mental health tech,
                human-computer interaction, and security systems. The challenge is that
                facial expressions are subtle and vary significantly across individuals.
                Human accuracy on FER2013 is only ~65%, making it a genuinely difficult problem.
              </p>
            </GlowCard>
          </section>
        </FadeUp>

        {/* Models */}
        <FadeUp delay={0.1}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Models Compared</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {models.map((model, index) => (
                <GlowCard key={model.name} className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
                      style={{ backgroundColor: 'rgba(29,78,216,0.2)', color: '#60a5fa', border: '1px solid rgba(29,78,216,0.4)' }}
                    >
                      {index + 1}
                    </span>
                    <h3 className="text-white font-semibold">{model.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{model.description}</p>
                  <p className="text-sm font-mono" style={{ color: '#60a5fa' }}>{model.result}</p>
                </GlowCard>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* Results — click to expand */}
        <FadeUp delay={0.15}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">Results</h2>
            <p className="text-gray-500 text-sm mb-6">Click any image to expand</p>
            <div className="grid md:grid-cols-2 gap-4">
              {images.map((img) => (
                <motion.div
                  key={img.alt}
                  className="rounded-xl overflow-hidden cursor-pointer"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  whileHover={{ borderColor: 'rgba(59,130,246,0.35)', scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setLightbox(img)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setLightbox(img)}
                  aria-label={`Expand ${img.alt}`}
                >
                  <div className="relative flex items-center justify-center p-3" style={{ backgroundColor: 'rgba(19,19,26,0.8)' }}>
                    <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: 'rgba(30,30,46,0.8)' }} />
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="relative w-full h-48 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-gray-500 text-xs text-center py-2 font-mono" style={{ backgroundColor: 'rgba(19,19,26,0.8)' }}>
                    {img.alt}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* What I Learned */}
        <FadeUp delay={0.2}>
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-4">What I Learned</h2>
            <ul className="flex flex-col gap-3">
              {[
                'CNNs outperform flat MLPs on image data by learning spatial features directly',
                'Transfer learning with VGG16 dramatically improves accuracy by reusing ImageNet features',
                'Dropout and batch normalization are essential for preventing overfitting',
                'Geometric landmark features can outperform raw pixels as model inputs',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                  <span style={{ color: '#3b82f6' }} className="mt-0.5 flex-shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </FadeUp>

        {/* Next project */}
        <FadeUp delay={0.25}>
          <div
            className="rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div>
              <p className="text-gray-500 text-xs font-mono mb-1">NEXT PROJECT</p>
              <p className="text-white font-semibold">Character-Level Language Model</p>
            </div>
            <Link
              to="/projects/language-model"
              className="px-5 py-2.5 rounded-lg font-medium text-white text-sm transition-all duration-200 hover:opacity-90 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
            >
              View Project →
            </Link>
          </div>
        </FadeUp>

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
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-all duration-200"
              style={{
                background: 'rgba(10,10,15,0.9)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)',
              }}
              aria-label="Back to Projects"
            >
              ← Projects
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox.src}
            alt={lightbox.alt}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
