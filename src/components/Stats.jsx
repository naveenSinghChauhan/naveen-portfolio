import { motion } from 'framer-motion'
import Counter from './Counter'

export default function Stats({ stats }) {
  return (
    <section className="stats">
      {stats.map((s, i) => (
        <motion.div key={s.label} className="stat"
          initial={{ opacity: 0, y: 40, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay: i * 0.1 }}
          whileHover={{ y: -8 }}>
          <b><Counter to={s.value} suffix={s.suffix} /></b>
          <span>{s.label}</span>
        </motion.div>
      ))}
    </section>
  )
}
