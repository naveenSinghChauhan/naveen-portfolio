import { motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'

export default function Skills({ skills, marquee, title }) {
  const items = [...marquee, ...marquee]
  return (
    <section className="section" id="skills">
      <SectionTitle num="02">{title}</SectionTitle>
      <div className="skills">
        {skills.map((s, i) => (
          <Reveal key={s.name} delay={(i % 3) * 0.1} y={24}>
            <div className="skill-top"><span>{s.name}</span><i>{s.level}%</i></div>
            <div className="bar">
              <motion.div className="bar-fill" initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="marquee">
        <div className="marquee-track">
          {items.map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </Reveal>
    </section>
  )
}
