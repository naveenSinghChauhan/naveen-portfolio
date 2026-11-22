import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import Reveal from './Reveal'
import Icon from './Icon'
import ProjectModal from './ProjectModal'
import useTilt from '../hooks/useTilt'

function ProjectCard({ p, index, onOpen }) {
  const tilt = useTilt(7)
  return (
    <motion.article
      layout
      className="card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(p)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen(p))}
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      {...tilt}
    >
      <div className="card-head">
        <span className="num">{String(index + 1).padStart(2, '0')}</span>
        <span className={`tag-top ${p.live ? 'live' : ''}`}>{p.live ? '● ' : ''}{p.badge}</span>
      </div>
      <h3>{p.title}</h3>
      <p className="summary">{p.summary}</p>
      <div className="mini-tags">{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
      <span className="view-more">View details <Icon name="arrow" size={16} /></span>
    </motion.article>
  )
}

export default function Projects({ projects, filters, title }) {
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)
  const list = projects.filter((p) => active === 'all' || p.categories.includes(active))
  const close = useCallback(() => setSelected(null), [])
  const selectedIndex = selected ? projects.findIndex((p) => p.id === selected.id) : 0

  return (
    <section className="section" id="projects">
      <SectionTitle num="04">{title}</SectionTitle>
      <Reveal className="filters">
        {filters.map((f) => (
          <button key={f.key} className={`f ${active === f.key ? 'active' : ''}`} onClick={() => setActive(f.key)}>
            {active === f.key && <motion.span layoutId="filter-pill" className="pill" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
            <span className="f-label">{f.label}</span>
          </button>
        ))}
      </Reveal>

      <motion.div className="projects" layout>
        <AnimatePresence>
          {list.map((p, i) => <ProjectCard key={p.id} p={p} index={i} onOpen={setSelected} />)}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal key="modal" p={selected} index={selectedIndex} onClose={close} />}
      </AnimatePresence>
    </section>
  )
}
