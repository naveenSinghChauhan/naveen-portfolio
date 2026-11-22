import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'

export default function Navbar({ logo, nav, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const on = () => setScrolled(scrollY > 40)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ;['home', ...nav.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [nav])

  const go = () => setOpen(false)

  return (
    <motion.header
      className={`nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#home" className="logo">{logo}<span>.</span></a>

      <div className="nav-right">
        <ul className="nav-links desktop">
          {nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className={n.cta ? 'btn-nav' : active === n.id ? 'active' : ''}>
                {n.label}
                {!n.cta && active === n.id && <motion.i layoutId="nav-underline" className="underline" />}
              </a>
            </li>
          ))}
        </ul>

        <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme" title="Toggle theme">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={theme} style={{ display: 'grid' }}
              initial={{ rotate: -90, scale: 0, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="nav-links drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {nav.map((n, i) => (
              <motion.li key={n.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }}>
                <a href={`#${n.id}`} onClick={go} className={n.cta ? 'btn-nav' : active === n.id ? 'active' : ''}>{n.label}</a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
