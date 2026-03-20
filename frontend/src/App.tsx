import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy-load pages so each route is its own JS chunk
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const EmotionDetection = lazy(() => import('./pages/EmotionDetection'))
const FakeNews = lazy(() => import('./pages/FakeNews'))


// AnimatePresence needs to be inside the Router to access location
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/emotion-detection" element={<EmotionDetection />} />
        <Route path="/projects/fake-news" element={<FakeNews />} />

        <Route path="*" element={
          <main id="main-content" className="max-w-4xl mx-auto px-6 pt-28 md:pt-36 pb-28 md:pb-20 text-center">
            <p className="font-mono text-sm mb-4" style={{ color: '#3b82f6' }}>404</p>
            <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
            <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
            <a href="/" className="px-6 py-3 rounded-lg font-medium text-white" style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
              Go Home
            </a>
          </main>
        } />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>
        <ScrollToTop />
        <CommandPalette />
        <Navbar />
        <ErrorBoundary>
          <Suspense
            fallback={
              <div
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: '#0a0a0f' }}
              >
                <div
                  className="w-8 h-8 rounded-full border-2 animate-spin"
                  style={{ borderColor: '#1e1e2e', borderTopColor: '#3b82f6' }}
                  aria-label="Loading page"
                />
              </div>
            }
          >
            <AnimatedRoutes />
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </div>
    </Router>
  )
}

export default App
