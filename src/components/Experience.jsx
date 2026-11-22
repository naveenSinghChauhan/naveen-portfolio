import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionTitle from './SectionTitle'

export default function Experience({ experience, title }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <section className="section" id="experience">
      <SectionTitle num="03">{title}</SectionTitle>
      <div className="timeline" ref={ref}>
        <div className="timeline-track" />
        <motion.div className="timeline-fill" style={{ scaleY }} />
        {experience.map((e, i) => (
          <motion.div key={e.company} className="t-item"
            initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div className="t-dot" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.3 }} />
            <motion.div className="t-card" whileHover={{ x: 8 }}>
              <span className="date">{e.period}</span>
              <h3>{e.role}</h3>
              <h4>{e.company}</h4>
              <p>{e.description}</p>
              {e.stack && <div className="mini-tags">{e.stack.map((t) => <span key={t}>{t}</span>)}</div>}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
