import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import TypedText from './TypedText'
import Magnetic from './Magnetic'
import Icon from './Icon'
import useTilt from '../hooks/useTilt'

const container = { hidden: {}, show: { transition: { delayChildren: 1.1, staggerChildren: 0.13 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}
const word = {
  hidden: { opacity: 0, y: 60, filter: 'blur(14px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 16, stiffness: 90 } },
}

export default function Hero({ profile, socials }) {
  const tilt = useTilt(12)
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const textOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [1, 0.95, 0.72])
  const px = useSpring(useMotionValue(0), { stiffness: 60, damping: 15 })
  const py = useSpring(useMotionValue(0), { stiffness: 60, damping: 15 })

  useEffect(() => {
    const move = (e) => {
      px.set((e.clientX / innerWidth - 0.5) * 24)
      py.set((e.clientY / innerHeight - 0.5) * 24)
    }
    addEventListener('mousemove', move)
    return () => removeEventListener('mousemove', move)
  }, [px, py])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const base = import.meta.env.BASE_URL

  return (
    <section className="hero" id="home" ref={sectionRef}>
      <div className="blobs"><i className="blob b1" /><i className="blob b2" /></div>
      <motion.div className="hero-text" variants={container} initial="hidden" animate="show" style={{ y: textY, opacity: textOpacity }}>
        <motion.p className="eyebrow" variants={fadeUp}>{profile.greeting}</motion.p>

        <h1 className="hero-name">
          {profile.name.split(' ').map((w, i) => (
            <motion.span key={i} className="word grad-text" variants={word}>{w}</motion.span>
          ))}
        </h1>

        <motion.h2 className="hero-role" variants={fadeUp}><TypedText words={profile.roles} /></motion.h2>
        <motion.p className="hero-sub" variants={fadeUp}>{profile.intro}</motion.p>

        <motion.div className="hero-cta" variants={fadeUp}>
          <Magnetic>
            <button className="btn btn-primary" onClick={() => scrollTo(profile.primaryButton.target)}>{profile.primaryButton.label}</button>
          </Magnetic>
          <Magnetic>
            <button className="btn btn-ghost" onClick={() => scrollTo(profile.secondaryButton.target)}>{profile.secondaryButton.label}</button>
          </Magnetic>
          {profile.resume && (
            <Magnetic>
              <a className="btn btn-ghost" href={base + profile.resume} download>
                <Icon name="download" size={16} /> Resume
              </a>
            </Magnetic>
          )}
        </motion.div>

        <motion.div className="socials" variants={fadeUp}>
          {socials.map((s) => (
            <motion.a key={s.label} href={s.url} target={s.url.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer" aria-label={s.label}
              whileHover={{ y: -6, rotate: 8, scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              <Icon name={s.icon} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div style={{ x: px, y: py }}>
          <motion.div className="avatar-wrap" {...tilt}>
            <div className="ring r1" />
            <div className="ring r2" />
            <motion.div className="avatar" animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <span className="initials">{profile.name.split(' ').map((w) => w[0]).join('')}</span>
              <img src={base + profile.photo} alt={profile.name} onError={(e) => (e.currentTarget.style.display = 'none')} />
            </motion.div>
            {profile.floatingChips.slice(0, 4).map((c, i) => (
              <motion.div key={c} className={`chip c${i + 1}`}
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{ opacity: { delay: 1.8 + i * 0.15 }, scale: { delay: 1.8 + i * 0.15, type: 'spring' },
                  y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 } }}>
                {c}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <a href="#about" className="scroll-hint" aria-label="Scroll down"><span /></a>
    </section>
  )
}
