import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'

interface NavItem {
  label: string
  path: string
  end?: boolean
  icon: React.ReactNode
}

const navLinks: NavItem[] = [
  {
    label: 'Home',
    path: '/',
    end: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'About',
    path: '/about',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
]

export default function Navbar() {
  const { scrollYProgress } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Skip to main content for keyboard/screen reader users */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Top Navbar */}
      <motion.nav
        animate={{ paddingTop: isScrolled ? '10px' : '16px', paddingBottom: isScrolled ? '10px' : '16px' }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 w-full z-50 border-b"
        style={{
          backgroundColor: isScrolled ? 'rgba(0,0,0, 0.92)' : 'rgba(0,0,0, 0.75)',
          borderColor: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        aria-label="Main navigation"
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 origin-left"
          style={{
            scaleX: scrollYProgress,
            background: 'linear-gradient(90deg, #ffffff, #a3a3a3)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className="font-mono text-lg font-semibold transition-opacity hover:opacity-80"
            style={{ color: '#ffffff' }}
            aria-label="Pratyush Padhy — Home"
          >
            Pratyush Padhy
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                className="text-sm font-medium transition-colors duration-200 relative py-1"
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? 'text-white' : 'text-gray-400 hover:text-white'}>
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavBar"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: 'linear-gradient(90deg, #ffffff, #a3a3a3)' }}
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t"
        style={{
          backgroundColor: 'rgba(0,0,0, 0.96)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around px-2 pt-2 pb-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl min-w-[60px] min-h-[44px] justify-center transition-all duration-200"
              aria-label={link.label}
            >
              {({ isActive }) => (
                <>
                  <span style={{ color: isActive ? '#ffffff' : '#b0b0b0' }}>
                    {link.icon}
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: isActive ? '#ffffff' : '#b0b0b0' }}
                  >
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  )
}
