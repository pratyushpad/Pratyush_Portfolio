import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import PageTransition from '../components/animations/PageTransition'

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
      <p className="text-xs font-mono mt-1" style={{ color: '#475569' }}>{label}</p>
    </div>
  )
}

const experiences = [
  {
    role: 'Software Engineer Intern',
    org: 'Tata Consultancy Services',
    period: 'Jun 2026 – Present',
    desc: "Building computer vision and deep learning models (TensorFlow, PyTorch, OpenCV) at TCS's Medical Robotics Center on Carnegie Mellon University's campus for early cancer prediction and detection. Developing end-to-end CNN-based segmentation, detection, and classification pipelines over DICOM/NIfTI volumetric scans — spanning preprocessing, augmentation, and validation tuned for clinical-grade accuracy and real-time inference.",
  },
  {
    role: 'Software Engineer Intern',
    org: 'AXENTRA OS',
    period: 'May 2026 – Present',
    desc: 'Software Engineer – Python & FastAPI.',
  },
  {
    role: 'API Developer',
    org: 'ZotBins',
    period: 'May 2026 – Present',
    desc: 'On the API subteam, working on FastAPI and API development.',
  },
  {
    role: 'Software Developer Intern',
    org: 'Ready Tutor',
    period: 'Mar – Jun 2026',
    desc: 'Built CourseEater — a full-stack course planner for UC Irvine students. Engineered a scalable MongoDB/SQLite schema class with React useContext integration, replacing 10+ component-level instances across the stack. Built a Fall Quarter catalog with real-time retrieval of 1,200+ UCI courses and resolved 30+ bugs, contributing to securing $5,500 in funding. Redesigned the year-planning data model with a JSON-stringified array schema to support fully dynamic multi-year scheduling.',
  },
  {
    role: 'Undergraduate Mentor',
    org: 'Data@UCI',
    period: 'Jan – Mar 2026',
    desc: 'Mentored 50+ students on data-focused projects using Python, HTML, and JavaScript. Guided mentees through data collection, variable selection, exploratory analysis with Kaggle datasets, and predictive model development using Google Colab.',
  },
  {
    role: 'Software Intern',
    org: 'Computers 4 Kids',
    period: 'Aug 2023 – May 2025',
    desc: 'Assisted in planning and executing the collection and refurbishment of computers for underrepresented students. Led meetings proposing scalable outreach initiatives and established a school-based chapter with 200+ members.',
  },
  {
    role: 'Software Intern',
    org: 'Robotics for All',
    period: 'June 2023 – Aug 2024',
    desc: 'Contributed to the development of an AI-powered chatbot to enhance website functionality. Designed an online training system for volunteer tutors. Awarded the Presidential Service Award (Gold) for 250+ volunteer hours.',
  },
  {
    role: 'Research Mentee',
    org: 'iLab Stanford',
    period: 'Dec 2023 – July 2024',
    desc: 'Conducted research on human bulk RNA-seq data for non-small cell lung cancer (GSE268175). Generated graphical and statistical analyses using R under Dr. Qian Wang and Stanford researchers.',
  },
  {
    role: 'Competitor',
    org: 'Berkeley ROAR',
    period: 'June – Aug 2023',
    desc: 'Trained under UC Berkeley faculty in Python, AI, and autonomous systems. Optimized an autonomous vehicle simulation using ML, neural networks, and decision trees. Placed top 10.',
  },
]

const skillGroups: Record<string, string[]> = {
  'Languages': ['Python', 'Java', 'R', 'C++', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  'ML / AI': ['TensorFlow', 'Keras', 'CNNs', 'LSTMs', 'scikit-learn', 'OpenCV', 'Dlib'],
  'Libraries': ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Chart.js'],
  'Web': ['React', 'Tailwind CSS', 'Vite', 'Express.js'],
  'Tools': ['Git', 'VS Code', 'PyCharm', 'Google Colab'],
}

const awards = [
  'California ELC Award (Top 9% of Students)',
  'AP Scholar with Distinction',
  '5th Place @ DECA State (EIP)',
  'Presidential Service Award (Gold)',
]

const certifications = [
  'PCEP — Python',
  'Coursera UCSC — C++',
  'WorldTutor — Java',
]

const clubs = ["Data@UCI", "AI@UCI", "Cyber@UCI", "Hack@UCI", "Dean's Honor List"]

export default function About() {
  useEffect(() => { document.title = 'About | Pratyush Padhy' }, [])

  return (
    <PageTransition>
      <main id="main-content" className="relative z-10 max-w-5xl mx-auto px-6 pt-28 md:pt-36 pb-28 md:pb-20">

        {/* ═══ HEADER ═══ */}
        <RevealSection>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#3b82f6' }}>00</span>
            <span style={{ width: 40, height: 1, background: 'rgba(59,130,246,0.4)' }} />
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#475569' }}>About</span>
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
                  style={{ border: '1px solid rgba(59,130,246,0.3)' }}
                />
                <div>
                  <h1 className="text-3xl font-light text-white" style={{ letterSpacing: '-0.02em' }}>
                    Pratyush <span className="font-semibold">Padhy</span>
                  </h1>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
                Computer Science student at UC Irvine (Dean's Honor List) with a passion
                for machine learning and AI. Currently a software engineer intern at TCS, building medical AI and
                computer vision models for early cancer detection. Previously built full-stack course-planning tools
                at Ready Tutor, mentored 50+ students at Data@UCI, and conducted RNA-seq research at Stanford iLab.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {clubs.map((item) => (
                  <motion.span
                    key={item}
                    className="text-xs px-3 py-1.5 font-mono cursor-default"
                    style={{ color: '#64748b', border: '1px solid rgba(255,255,255,0.08)' }}
                    whileHover={{ color: '#fff', borderColor: 'rgba(59,130,246,0.4)' }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="p-6" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="font-mono text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#475569' }}>Education</p>
                <h3 className="text-white font-semibold text-lg">UC Irvine</h3>
                <p className="text-sm mb-4" style={{ color: '#94a3b8' }}>B.S. Computer Science</p>
                <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-3xl font-semibold text-white">3.86</p>
                  <p className="text-xs font-mono mt-1" style={{ color: '#475569' }}>GPA · Class of 2027</p>
                  <p className="text-xs font-mono mt-2" style={{ color: '#4ade80' }}>Dean's Honor List: Fall '25, Winter '26, Spring '26</p>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ═══ STATS ═══ */}
        <RevealSection>
          <div className="flex gap-10 md:gap-16 mb-20 pt-8 pb-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <AnimatedCounter value={93} suffix="%" label="Model accuracy" />
            <AnimatedCounter value={1200} suffix="+" label="UCI courses indexed" />
            <AnimatedCounter value={50} suffix="+" label="Students mentored" />
            <div>
              <p className="text-3xl font-semibold text-white">Top 10</p>
              <p className="text-xs font-mono mt-1" style={{ color: '#475569' }}>Berkeley ROAR</p>
            </div>
          </div>
        </RevealSection>

        {/* ═══ EXPERIENCE ═══ */}
        <RevealSection>
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#3b82f6' }}>01</span>
            <span style={{ width: 40, height: 1, background: 'rgba(59,130,246,0.4)' }} />
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#475569' }}>Experience</span>
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
                    <p className="text-xs font-mono" style={{ color: '#475569' }}>{exp.period}</p>
                  </div>
                  <div className="md:col-span-9">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors duration-200">{exp.role}</h3>
                      <span style={{ color: '#3b82f6' }} className="text-sm font-mono">@ {exp.org}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{exp.desc}</p>
                  </div>
                </div>
              </motion.div>
            </RevealSection>
          ))}
        </div>

        {/* ═══ SKILLS ═══ */}
        <RevealSection>
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#3b82f6' }}>02</span>
            <span style={{ width: 40, height: 1, background: 'rgba(59,130,246,0.4)' }} />
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#475569' }}>Skills</span>
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
                  <p className="text-xs font-mono uppercase tracking-wider" style={{ color: '#475569' }}>{category}</p>
                </div>
                <div className="md:col-span-9 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-4 py-2 text-xs font-mono cursor-default"
                      style={{ color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }}
                      whileHover={{ color: '#fff', borderColor: 'rgba(59,130,246,0.4)', background: 'rgba(59,130,246,0.06)' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        {/* ═══ AWARDS & CERTS ═══ */}
        <RevealSection>
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#3b82f6' }}>03</span>
            <span style={{ width: 40, height: 1, background: 'rgba(59,130,246,0.4)' }} />
            <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: '#475569' }}>Recognition</span>
          </div>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <RevealSection>
            <p className="text-xs font-mono uppercase tracking-wider mb-6" style={{ color: '#475569' }}>Awards</p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {awards.map((award, i) => (
                <div
                  key={award}
                  className="py-4 flex items-center gap-4"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="font-mono text-xs" style={{ color: '#3b82f6' }}>0{i + 1}</span>
                  <span className="text-sm" style={{ color: '#94a3b8' }}>{award}</span>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection>
            <p className="text-xs font-mono uppercase tracking-wider mb-6" style={{ color: '#475569' }}>Certifications</p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {certifications.map((cert, i) => (
                <div
                  key={cert}
                  className="py-4 flex items-center gap-4"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="font-mono text-xs" style={{ color: '#3b82f6' }}>0{i + 1}</span>
                  <span className="text-sm" style={{ color: '#94a3b8' }}>{cert}</span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>

        {/* ═══ CTA ═══ */}
        <RevealSection>
          <div className="py-16 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-3xl font-light text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              Want to <span className="font-semibold">work together</span>?
            </h3>
            <p className="text-sm mb-10" style={{ color: '#475569' }}>Open to ML &amp; software internships and collaborations.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/Pratyush_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-500/20"
                style={{ border: '1px solid rgba(59,130,246,0.5)', background: 'rgba(59,130,246,0.08)' }}
              >
                Resume ↗
              </a>
              <a
                href="https://github.com/Pratyushpad27"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 text-sm font-medium transition-all duration-200 hover:text-white hover:border-white/30"
                style={{ color: '#64748b', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pratyush-padhy-b7017a269/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 text-sm font-medium transition-all duration-200 hover:text-white hover:border-white/30"
                style={{ color: '#64748b', border: '1px solid rgba(255,255,255,0.1)' }}
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
