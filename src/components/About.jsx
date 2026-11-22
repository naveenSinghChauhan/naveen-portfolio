import { motion } from 'framer-motion'
import Reveal from './Reveal'
import Tilt from './Tilt'
import SectionTitle from './SectionTitle'

// turns **bold** in the JSON text into <strong>
const rich = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p
  )

export default function About({ about, title }) {
  return (
    <section className="section" id="about">
      <SectionTitle num="01">{title}</SectionTitle>
      <div className="about-grid">
        <div className="about-text">
          {about.paragraphs.map((p, i) => <Reveal as="p" key={i} delay={i * 0.12}>{rich(p)}</Reveal>)}
          <div className="soft">
            {about.softSkills.map((s, i) => (
              <motion.span key={s} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1, type: 'spring' }} whileHover={{ y: -4 }}>
                {s}
              </motion.span>
            ))}
          </div>
        </div>

        <Reveal x={50} y={0}>
          <Tilt className="about-card">
            <h3>{about.factsTitle}</h3>
            <ul>
              {about.facts.map((f) => (
                <li key={f.label}><em>{f.label}</em>{f.value}</li>
              ))}
            </ul>
          </Tilt>
        </Reveal>
      </div>
    </section>
  )
}
