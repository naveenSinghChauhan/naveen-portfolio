import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import Icon from './Icon'

const list = { show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }
const item = { hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }

export default function ProjectModal({ p, index, onClose }) {
  useEffect(() => {
    const key = (e) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    addEventListener('keydown', key)
    return () => { removeEventListener('keydown', key); document.body.style.overflow = prev }
  }, [onClose])

  const base = import.meta.env.BASE_URL

  return createPortal(
    <motion.div className="modal-backdrop" onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal" role="dialog" aria-modal="true" aria-label={p.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 60, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }} transition={{ type: 'spring', damping: 26, stiffness: 260 }}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" /></button>

        <div className="modal-banner">
          {p.image
            ? <img src={base + p.image} alt={p.title} />
            : <span className="big">{String(index + 1).padStart(2, '0')}</span>}
        </div>

        <div className="modal-body">
          <span className={`tag-top ${p.live ? 'live' : ''}`}>{p.live ? '● ' : ''}{p.badge}</span>
          <h3>{p.title}</h3>
          <div className="mini-tags">{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
          <p className="summary">{p.summary}</p>
          <motion.ul variants={list} initial="hidden" animate="show">
            {p.points.map((pt, i) => <motion.li key={i} variants={item}>{pt}</motion.li>)}
          </motion.ul>
          {p.link && (
            <motion.a className="btn btn-primary" style={{ marginTop: 22 }} href={p.link.url}
              target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }}>
              {p.link.label} <Icon name="external" size={16} />
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}
