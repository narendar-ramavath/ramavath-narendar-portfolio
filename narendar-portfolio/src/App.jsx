import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Sparkles, Code2, Database, Cpu, Terminal } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    number: '01',
    title: 'TASKFLOW',
    type: 'FULL-STACK PRODUCT',
    description: 'A collaborative task and project management platform with secure authentication, role-based access, live search and productivity analytics.',
    contribution: 'Built a modular React dashboard, secure REST APIs and optimized PostgreSQL schemas. Implemented 15+ authenticated endpoints and 20+ reusable UI components.',
    stack: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'JWT'],
    metric: '35%',
    metricLabel: 'reported response-time reduction',
    visual: 'task',
  },
  {
    number: '02',
    title: 'SECURE CODE',
    type: 'AI · COMPUTER VISION',
    description: 'An AI-powered coding assessment platform combining automated code evaluation with webcam-based proctoring.',
    contribution: 'Designed a Spring Boot and FastAPI microservices architecture, plus facial-orientation and eye-gaze tracking using OpenCV and MediaPipe.',
    stack: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'OpenCV', 'MediaPipe'],
    metric: '92%',
    metricLabel: 'reported detection accuracy',
    visual: 'code',
  },
  {
    number: '03',
    title: 'INTERVIEW SIGNAL',
    type: 'AI · AUTOMATION',
    description: 'An automated interview scheduler that detects recruitment emails, extracts interview details and sends timely notifications.',
    contribution: 'Integrated Gemini API with Gmail API, FastAPI and APScheduler to structure interview information and trigger WhatsApp alerts.',
    stack: ['Python', 'FastAPI', 'Gemini API', 'Gmail API', 'SQLite'],
    metric: '95%',
    metricLabel: 'reported extraction precision',
    visual: 'signal',
  },
]

const skillGroups = [
  { title: 'LANGUAGES', icon: Code2, items: ['Python', 'Java', 'JavaScript', 'SQL'] },
  { title: 'FRONTEND', icon: Terminal, items: ['React.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Radix UI', 'Recharts'] },
  { title: 'BACKEND', icon: Cpu, items: ['Node.js', 'Express.js', 'FastAPI', 'Spring Boot', 'REST APIs', 'JWT'] },
  { title: 'DATA & AI', icon: Database, items: ['PostgreSQL', 'Supabase', 'MySQL', 'MongoDB', 'SQLite', 'OpenCV', 'MediaPipe', 'Gemini API'] },
]

function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(media.matches)
    const update = () => setReduced(media.matches)
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])
  return reduced
}

function Flashlight() {
  const [point, setPoint] = useState({ x: 50, y: 38 })
  const [active, setActive] = useState(false)
  const reduced = useReducedMotionPreference()
  const move = (event) => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return
    const x = (event.clientX / window.innerWidth) * 100
    const y = (event.clientY / window.innerHeight) * 100
    setPoint({ x, y })
    setActive(true)
  }
  useEffect(() => {
    const onLeave = () => setActive(false)
    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])
  if (reduced) return null
  return <div className={`torch ${active ? 'torch-active' : ''}`} style={{ '--mx': `${point.x}%`, '--my': `${point.y}%` }} aria-hidden="true" />
}

function Navbar({ onContact }) {
  const [open, setOpen] = useState(false)
  const links = [['ABOUT', '#about'], ['WORK', '#work'], ['STACK', '#stack']]
  return (
    <header className="nav-wrap">
      <a className="wordmark" href="#top" aria-label="Narendar home">NARENDAR<span>.</span></a>
      <nav className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <button className="nav-contact" onClick={() => { setOpen(false); onContact() }}>LET'S TALK <ArrowUpRight size={14} /></button>
      </nav>
      <button className="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </header>
  )
}

function ProjectVisual({ type }) {
  if (type === 'task') return <div className="visual-ui task-ui"><div className="ui-top"><span>taskflow / workspace</span><span className="ui-dot" /></div><div className="ui-layout"><div className="ui-side"><i /><i /><i /><i /></div><div className="ui-main"><div className="ui-heading">Good morning<span>.</span><small>Here's your team's pulse.</small></div><div className="ui-stats"><b>24<small>Tasks</small></b><b>08<small>In progress</small></b><b>92%<small>On track</small></b></div><div className="ui-lines"><i /><i /><i /></div></div></div></div>
  if (type === 'code') return <div className="visual-ui code-ui"><div className="code-top"><span>assessment_engine.py</span><span>● ● ●</span></div><pre><span>01</span> <b>class</b> AssessmentEngine:<br/><span>02</span>   <b>def</b> evaluate(self, submission):<br/><span>03</span>     result = sandbox.run()<br/><span>04</span>     proctor = vision.track()<br/><span>05</span>     <em>return</em> secure_score(result)<br/><span>06</span><br/><span>07</span> <i>// integrity by design</i></pre><div className="scan-line" /></div>
  return <div className="visual-ui signal-ui"><div className="signal-orbit orbit-one" /><div className="signal-orbit orbit-two" /><div className="signal-core"><Sparkles size={30}/></div><div className="signal-label label-a">GMAIL API</div><div className="signal-label label-b">GEMINI AI</div><div className="signal-label label-c">WHATSAPP</div><div className="signal-caption">MESSAGE → INTELLIGENCE → ACTION</div></div>
}

function ContactOverlay({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && <motion.div className="contact-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
        <motion.div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" initial={{ y: 30, opacity: 0, scale: .97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: .98 }} transition={{ type: 'spring', damping: 24, stiffness: 220 }}>
          <button className="modal-close" onClick={onClose} aria-label="Close contact window"><X /></button>
          <p className="eyebrow dark-eyebrow">GOOD THINGS START WITH A HELLO</p>
          <h2 id="contact-title">LET'S MAKE<br/><i>something</i> happen.</h2>
          <p className="modal-copy">Have an opportunity, an idea, or a product worth building? I'd be glad to hear from you.</p>
          <a className="modal-email" href="mailto:narendareduc@gmail.com"><Mail size={18}/> narendareduc@gmail.com <ArrowUpRight size={17}/></a>
          <div className="modal-socials"><a href="https://www.linkedin.com/in/narendar-ramavath" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a><a href="https://github.com/narendar-ramavath" target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a></div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  )
}

export default function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const heroRef = useRef(null)
  const reduced = useReducedMotionPreference()

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker, .hero-title-line, .hero-description, .hero-actions, .hero-portrait', {
        y: 38, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.15,
      })
      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 48, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })
      gsap.to('.hero-portrait img', {
        yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })
    }, heroRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div className="site-shell" ref={heroRef}>
      <Flashlight />
      <Navbar onContact={() => setContactOpen(true)} />
      <main>
        <section className="hero section-pad" id="top">
          <div className="hero-meta"><span>PORTFOLIO / 2026</span><span>HYDERABAD, INDIA</span></div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-kicker"><span className="status-dot" /> SOFTWARE ENGINEER · FULL-STACK DEVELOPER</p>
              <h1 className="hero-title">
                <span className="hero-title-line">BUILDING</span>
                <span className="hero-title-line title-outline">WHAT'S</span>
                <span className="hero-title-line">NEXT<span className="yellow-period">.</span></span>
              </h1>
              <p className="hero-description">I'm <strong>Ramavath Narendar</strong> — an IT graduate and software developer interested in building useful products, intelligent systems and thoughtful digital experiences.</p>
              <div className="hero-actions">
                <a href="#work" className="button button-yellow">EXPLORE MY WORK <ArrowDown size={16}/></a>
                <a href="https://github.com/narendar-ramavath" target="_blank" rel="noreferrer" className="text-link"><Github size={16}/> GITHUB PROFILE <ArrowUpRight size={14}/></a>
              </div>
            </div>
            <div className="hero-portrait">
              <div className="portrait-frame"><img src="/images/narendar.jpg" alt="Portrait of Ramavath Narendar" /><div className="portrait-stamp">DESIGNING<br/>IN CODE<br/><span>✳</span></div></div>
              <div className="portrait-caption"><span>01 / THE BUILDER</span><span>CURIOUS BY DEFAULT.</span></div>
            </div>
          </div>
          <div className="hero-bottom"><span>SCROLL TO DISCOVER</span><div className="scroll-line" /><span>01 — 06</span></div>
          <div className="hero-asterisk" aria-hidden="true">✳</div>
        </section>

        <section className="intro-section section-pad" id="about">
          <div className="section-index" data-reveal><span>01</span> / A LITTLE ABOUT ME</div>
          <div className="intro-content" data-reveal>
            <p className="eyebrow dark-eyebrow">THE PERSON BEHIND THE PIXELS</p>
            <h2>CURIOUS MIND.<br/><span>ENGINEERING</span><br/>IN MOTION.</h2>
            <div className="intro-bottom"><p>I'm a 2026 Information Technology graduate from CMR Technical Campus, Hyderabad. I enjoy connecting the dots between frontend experiences, backend architecture and AI-powered workflows.</p><p>My approach is simple: understand the problem, build with intention, and keep learning with every iteration.</p></div>
          </div>
          <div className="intro-note">BASED IN INDIA <span>✳</span> OPEN TO OPPORTUNITIES</div>
        </section>

        <section className="work-section section-pad" id="work">
          <div className="section-heading" data-reveal><div className="section-index"><span>02</span> / SELECTED WORK</div><h2>BUILT WITH<br/><i>purpose.</i></h2><p>A few projects where engineering meets problem-solving. Each one taught me something new about building for people.</p></div>
          <div className="project-list">
            {projects.map((project, index) => <article className={`project project-${index + 1}`} key={project.number} data-reveal>
              <div className="project-topline"><span>{project.number} — {project.type}</span><span>PERSONAL PROJECT</span></div>
              <div className="project-layout">
                <div className="project-copy"><h3>{project.title}</h3><p className="project-description">{project.description}</p><p className="project-contribution">{project.contribution}</p><div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><div className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div></div>
                <ProjectVisual type={project.visual}/>
              </div>
            </article>)}
          </div>
        </section>

        <section className="skills-section section-pad" id="stack">
          <div className="section-index" data-reveal><span>03</span> / MY TOOLKIT</div>
          <div className="skills-heading" data-reveal><h2>TOOLS OF<br/><i>the trade.</i></h2><p>A growing toolkit for turning ideas into working software — from interfaces and APIs to data and intelligent automation.</p></div>
          <div className="skill-grid">
            {skillGroups.map(({ title, icon: Icon, items }, i) => <div className="skill-card" key={title} data-reveal><div className="skill-card-top"><span>0{i + 1}</span><Icon size={22}/></div><h3>{title}</h3><div className="skill-items">{items.map(item => <span key={item}>{item}</span>)}</div></div>)}
          </div>
          <div className="fundamentals" data-reveal><span>FOUNDATIONS</span><p>Data Structures & Algorithms · OOP · DBMS · Operating Systems · Computer Networks · SDLC · Git · Postman</p></div>
        </section>

        <section className="education-section section-pad">
          <div className="section-index" data-reveal><span>04</span> / THE FOUNDATION</div>
          <div className="education-content" data-reveal><h2>ALWAYS<br/><i>learning.</i></h2><div className="education-list">
            <div className="education-item"><span>2022 — 2026</span><div><h3>B.Tech · Information Technology</h3><p>CMR Technical Campus · Hyderabad</p></div><strong>7.51 / 10</strong></div>
            <div className="education-item"><span>2020 — 2022</span><div><h3>Intermediate · MPC</h3><p>TSRJC Balconda · Nizamabad</p></div><strong>92.5%</strong></div>
            <div className="education-item"><span>2019 — 2020</span><div><h3>Secondary School Certificate</h3><p>Indur Model High School · Bodhan</p></div><strong>10 / 10</strong></div>
          </div></div>
          <div className="cert-row" data-reveal><span>CERTIFICATIONS</span><p>Cisco — Introduction to Cybersecurity</p><p>Hexart — Artificial Intelligence (Advanced Level)</p><p>Salesforce — AI with Agentforce Foundations</p></div>
        </section>

        <section className="collab-section">
          <div className="collab-noise" />
          <div className="collab-inner section-pad" data-reveal>
            <p className="eyebrow dark-eyebrow">05 / HAVE SOMETHING IN MIND?</p>
            <h2>LET'S MAKE<br/><i>it matter.</i></h2>
            <div className="collab-bottom"><p>I'm open to conversations about software engineering roles, interesting products and opportunities to create something meaningful.</p><motion.button className="collab-button" whileHover={{ y: -5, rotate: -1, scale: 1.025 }} whileTap={{ scale: .97 }} onClick={() => setContactOpen(true)}><span>LET'S COLLABORATE</span><ArrowUpRight size={22}/></motion.button></div>
            <div className="string-art" aria-hidden="true"><svg viewBox="0 0 440 150" fill="none"><path d="M5 4 C90 24 100 115 210 128 S335 50 430 8" /><path d="M0 25 C100 40 110 132 215 138 S340 64 440 30" /><path d="M15 0 C110 20 125 102 220 118 S350 42 425 0" /></svg><span>✳</span></div>
          </div>
          <footer className="footer section-pad"><a className="wordmark dark-wordmark" href="#top">N<span>.</span></a><span>DESIGNED & BUILT BY NARENDAR · 2026</span><div><a href="mailto:narendareduc@gmail.com">EMAIL</a><a href="https://www.linkedin.com/in/narendar-ramavath" target="_blank" rel="noreferrer">LINKEDIN</a><a href="https://github.com/narendar-ramavath" target="_blank" rel="noreferrer">GITHUB</a></div></footer>
        </section>
      </main>
      <ContactOverlay open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}