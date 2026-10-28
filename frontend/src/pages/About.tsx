import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import PageTransition from '../components/animations/PageTransition'
import ArrowUpRight from '../components/ArrowUpRight'

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function AnimatedCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString('en-US'))

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] })
    }
  }, [isInView, count, value])

  return (
    <div ref={ref}>
      <p className="text-3xl font-semibold text-white">
        <motion.span>{rounded}</motion.span>{suffix}
      </p>
      <p className="text-xs font-mono mt-1" style={{ color: '#9a9a9a' }}>{label}</p>
    </div>
  )
}

const experiences = [
  {
    role: 'Software Development Engineer Intern',
    org: 'Amazon Web Services (AWS)',
    period: 'Sept 2026 to Present',
    desc: 'Built an LLM agent that pins each Spark 4.1 regression to its exact commit by matching diffs to slowed operators. Replaced the team’s release-baseline checks with night-to-night Welch’s t-tests on 1,030 runs, now its primary tool. Shipped the agent 4 weeks early on Bedrock and ECS, cutting debugging time from 1-3 hours to 5 minutes. Verified 526,000+ extracted metrics per build against the team’s performance reports, with zero mismatches.',
  },
  {
    role: 'Software Engineer Intern',
    org: 'Tata Consultancy Services (TCS)',
    period: 'June 2026 to Aug 2026',
    desc: 'Rebuilt the simulation in Python on FluidLab, fixing 3 engine bugs. Fine-tuned the SmolVLA vision-language-action model from camera input and benchmarked it against a Stable-Baselines3 reinforcement learning baseline (81.5% over 3 seeds) that saw the full simulator state.',
  },
  {
    role: 'Software Developer Intern',
    org: 'Ready Tutor',
    period: 'Mar 2026 to June 2026',
    desc: 'Extended search-as-you-type over 1,200+ courses for Course Eater, a UCI degree planner. Cut database writes to 1 per action by routing 10+ scattered storage calls through a React Context provider. Shipped 30+ production fixes in TypeScript, including a credit-calculation bug that broke schedule planning.',
  },
]

const skillGroups: Record<string, string[]> = {
  'Languages': ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'Scala', 'Bash', 'HTML/CSS'],
  'Machine Learning': ['PyTorch', 'TensorFlow', 'Hugging Face', 'vLLM', 'Ollama', 'Stable-Baselines3', 'scikit-learn', 'OpenCV'],
  'Data': ['Apache Spark', 'PostgreSQL (pgvector)', 'MongoDB', 'SQLite', 'NumPy', 'Pandas', 'Matplotlib'],
  'Cloud & DevOps': ['AWS (S3, Lambda, ECS, Bedrock)', 'Google Cloud', 'Docker', 'GitHub Actions', 'Linux', 'Git'],
  'Web & Testing': ['FastAPI', 'SQLAlchemy', 'REST APIs', 'React', 'Next.js', 'Tailwind CSS', 'pytest'],
}

const clubs = ["Data@UCI", "AI@UCI", "Cyber@UCI", "Hack@UCI", "Dean's Honor List"]

export default function About() {
  useEffect(() => { document.title = 'About | Pratyush Padhy' }, [])

  return (
    <PageTransition>
      <main id="main-content" className="relative z-10 max-w-5xl mx-auto px-6 pt-28 md:pt-36 pb-28 md:pb-20">

        {/* ═══ HEADER ═══ */}
        <RevealSection>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#ffffff' }}>00</span>
            <span style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#9a9a9a' }}>About</span>
          </div>
        </RevealSection>

        <RevealSection>
          <div className="grid md:grid-cols-5 gap-12 mb-20">
            <div className="md:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/Pratyush.png"
                  alt="Pratyush Padhy"
                  className="w-16 h-16 object-cover"
                  style={{ border: '1px solid rgba(255,255,255,0.3)' }}
                />
                <div>
                  <h1 className="text-3xl font-light text-white" style={{ letterSpacing: '-0.02em' }}>
                    Pratyush <span className="font-semibold">Padhy</span>
                  </h1>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#d0d0d0' }}>
                Computer Science student at UC Irvine (Intelligent Systems, Dean's Honor List) who ships ML and
                full-stack systems. Currently a Software Development Engineer Intern at Amazon Web Services (AWS).
                Previously a Software Engineer Intern at Tata Consultancy Services (TCS) and a Software Developer
                Intern at Ready Tutor.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {clubs.map((item) => (
                  <motion.span
                    key={item}
                    className="text-xs px-3 py-1.5 font-mono cursor-default"
                    style={{ color: '#b0b0b0', border: '1px solid rgba(255,255,255,0.08)' }}
                    whileHover={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="p-6" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="font-mono text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#9a9a9a' }}>Education</p>
                <h3 className="text-white font-semibold text-lg">UC Irvine</h3>
                <p className="text-sm mb-4" style={{ color: '#d0d0d0' }}>B.S. Computer Science, Intelligent Systems</p>
                <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-3xl font-semibold text-white">3.8</p>
                  <p className="text-xs font-mono mt-1" style={{ color: '#9a9a9a' }}>GPA · Expected June 2028</p>
                  <p className="text-xs font-mono mt-2" style={{ color: '#ffffff' }}>Dean's Honor List: Fall '25, Winter '26, Spring '26</p>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ═══ STATS ═══ */}
        <RevealSection>
          <div className="flex flex-wrap gap-x-8 gap-y-6 md:gap-x-16 mb-20 pt-8 pb-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <AnimatedCounter value={70} suffix="%" label="GSM8K after GRPO" />
            <AnimatedCounter value={1200} suffix="+" label="UCI courses indexed" />
            <AnimatedCounter value={1319} label="GSM8K test problems" />
            <AnimatedCounter value={596} label="Chronicle boards" />
          </div>
        </RevealSection>

        {/* ═══ EXPERIENCE ═══ */}
        <RevealSection>
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#ffffff' }}>01</span>
            <span style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#9a9a9a' }}>Experience</span>
          </div>
        </RevealSection>

        <div className="mb-20">
          {experiences.map((exp, i) => (
            <RevealSection key={exp.org + exp.role}>
              <motion.div
                className="group"
                style={{ borderTop: i === 0 ? '1px solid rgba(255,255,255,0.06)' : undefined }}
              >
                <div
                  className="py-8 grid md:grid-cols-12 gap-4 md:gap-8 cursor-default"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="md:col-span-3 flex items-start gap-3">
                    <p className="text-xs font-mono" style={{ color: '#9a9a9a' }}>{exp.period}</p>
                  </div>
                  <div className="md:col-span-9">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="text-white font-semibold group-hover:text-white transition-colors duration-200">{exp.role}</h3>
                      <span style={{ color: '#ffffff' }} className="text-sm font-mono">@ {exp.org}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#d0d0d0' }}>{exp.desc}</p>
                  </div>
                </div>
              </motion.div>
            </RevealSection>
          ))}
        </div>

        {/* ═══ SKILLS ═══ */}
        <RevealSection>
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#ffffff' }}>02</span>
            <span style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#9a9a9a' }}>Skills</span>
          </div>
        </RevealSection>

        <div className="mb-20">
          {Object.entries(skillGroups).map(([category, skills], i) => (
            <RevealSection key={category}>
              <div
                className="py-6 grid md:grid-cols-12 gap-4"
                style={{
                  borderTop: i === 0 ? '1px solid rgba(255,255,255,0.06)' : undefined,
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="md:col-span-3">
                  <p className="text-xs font-mono uppercase tracking-wider" style={{ color: '#9a9a9a' }}>{category}</p>
                </div>
                <div className="md:col-span-9 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-4 py-2 text-xs font-mono cursor-default"
                      style={{ color: '#d0d0d0', border: '1px solid rgba(255,255,255,0.08)' }}
                      whileHover={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.06)' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        {/* ═══ CTA ═══ */}
        <RevealSection>
          <div className="py-16 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-3xl font-light text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              Want to <span className="font-semibold">work together</span>?
            </h3>
            <p className="text-sm mb-10" style={{ color: '#9a9a9a' }}>Open to ML &amp; software internships and collaborations.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/Pratyush_Padhy_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20"
                style={{ border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.08)' }}
              >
                Resume <ArrowUpRight />
              </a>
              <a
                href="https://github.com/pratyushpad"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 text-sm font-medium transition-all duration-200 hover:text-white hover:border-white/30"
                style={{ color: '#b0b0b0', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pratyushpad"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 text-sm font-medium transition-all duration-200 hover:text-white hover:border-white/30"
                style={{ color: '#b0b0b0', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </RevealSection>

      </main>
    </PageTransition>
  )
}
