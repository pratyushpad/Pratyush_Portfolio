import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const pages = [
  { label: 'Home', path: '/', keywords: 'home landing hero' },
  { label: 'About', path: '/about', keywords: 'about bio education experience' },
  { label: 'Projects', path: '/projects', keywords: 'projects work portfolio' },
  { label: 'Face Pulse', path: '/projects/emotion-detection', keywords: 'face pulse fer2013 cnn vgg16 emotion detection facial' },
  { label: 'Language Model', path: '/projects/language-model', keywords: 'rnn lstm character language model text generation' },
  { label: 'Resume', path: '/Pratyush_Padhy_Resume.pdf', keywords: 'resume cv pdf download' },
  { label: 'GitHub', path: 'https://github.com/Pratyushpad27', keywords: 'github code source' },
  { label: 'LinkedIn', path: 'https://www.linkedin.com/in/pratyush-padhy-b7017a269/', keywords: 'linkedin social connect' },
  { label: 'Email', path: 'mailto:ppadhy@uci.edu', keywords: 'email contact mail' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const filtered = pages.filter((p) => {
    const q = query.toLowerCase()
    return p.label.toLowerCase().includes(q) || p.keywords.includes(q)
  })

  const handleSelect = (path: string) => {
    setOpen(false)
    if (path.startsWith('http') || path.startsWith('mailto:') || path.endsWith('.pdf')) {
      window.open(path, '_blank')
    } else {
      navigate(path)
    }
  }

  // Focus trap: cycle through input → list items → back to input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      if (filtered[activeIndex]) handleSelect(filtered[activeIndex].path)
    } else if (e.key === 'Tab') {
      // Trap tab within dialog — keep focus on input
      e.preventDefault()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-lg rounded-xl overflow-hidden"
            style={{
              background: 'rgba(19,19,26,0.98)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#6b7280' }}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-gray-500"
                aria-label="Search pages"
                aria-autocomplete="list"
                aria-controls="command-palette-list"
                aria-activedescendant={filtered[activeIndex] ? `cmd-item-${activeIndex}` : undefined}
              />
              <kbd
                className="text-xs px-2 py-1 rounded font-mono"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#6b7280' }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div
              id="command-palette-list"
              ref={listRef}
              className="max-h-64 overflow-y-auto py-2"
              role="listbox"
              aria-label="Search results"
            >
              {filtered.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-8">No results found</p>
              ) : (
                filtered.map((page, i) => (
                  <button
                    id={`cmd-item-${i}`}
                    key={page.path}
                    role="option"
                    aria-selected={i === activeIndex}
                    onClick={() => handleSelect(page.path)}
                    className="w-full flex items-center gap-3 px-5 py-3 text-left text-sm transition-colors"
                    style={{
                      color: i === activeIndex ? '#ffffff' : '#9ca3af',
                      backgroundColor: i === activeIndex ? 'rgba(59,130,246,0.12)' : 'transparent',
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    <span className="flex-shrink-0" style={{ color: '#3b82f6' }}>→</span>
                    <span>{page.label}</span>
                    {(page.path.startsWith('http') || page.path.endsWith('.pdf')) && (
                      <span className="text-xs ml-auto" style={{ color: '#4b5563' }} aria-hidden="true">↗</span>
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div
              className="px-5 py-3 flex items-center gap-4 text-xs"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: '#4b5563' }}
            >
              <span>
                <kbd className="font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>↑↓</kbd> navigate
              </span>
              <span>
                <kbd className="font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>↵</kbd> select
              </span>
              <span>
                <kbd className="font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>esc</kbd> close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
