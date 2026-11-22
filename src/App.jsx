import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import data from './data/portfolio.json'

import Loader from './components/Loader'
import ParticlesBg from './components/ParticlesBg'
import CursorGlow from './components/CursorGlow'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ToTop from './components/ToTop'

// Colours come from src/data/portfolio.json -> theme (dark / light)
function applyTheme(mode) {
  const t = data.theme[mode]
  const el = document.documentElement
  el.dataset.theme = mode
  el.style.setProperty('--bg', t.bg)
  el.style.setProperty('--a1', t.accent1)
  el.style.setProperty('--a2', t.accent2)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t.bg)
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch { /* ignore */ }
  return data.theme.default || 'dark'
}

const initialTheme = getInitialTheme()
applyTheme(initialTheme) // before first paint

export default function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(initialTheme)
  const t = data.sectionTitles

  useLayoutEffect(() => {
    applyTheme(theme)
    try { localStorage.setItem('theme', theme) } catch { /* ignore */ }
  }, [theme])

  const toggleTheme = useCallback(() => setTheme((m) => (m === 'dark' ? 'light' : 'dark')), [])

  useEffect(() => {
    document.title = data.site.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', data.site.description)
    const timer = setTimeout(() => setLoading(false), 1300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Loader key="loader" logo={data.site.logo} />}</AnimatePresence>

      <ParticlesBg theme={theme} />
      <CursorGlow />
      <CustomCursor />
      <ScrollProgress />
      <Navbar logo={data.site.logo} nav={data.nav} theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Hero profile={data.profile} socials={data.socials} />
        <Stats stats={data.stats} />
        <About about={data.about} title={t.about} />
        <Skills skills={data.skills} marquee={data.techMarquee} title={t.skills} />
        <Experience experience={data.experience} title={t.experience} />
        <Projects projects={data.projects} filters={data.projectFilters} title={t.projects} />
        <Education education={data.education} title={t.education} />
        <Contact profile={data.profile} contact={data.contact} title={t.contact} />
      </main>

      <Footer text={data.site.footerText} />
      <ToTop />
    </MotionConfig>
  )
}
