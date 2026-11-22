import { motion } from 'framer-motion'
import ScrambleText from './ScrambleText'

export default function SectionTitle({ num, children }) {
  return (
    <motion.h2
      className="title"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span>{num}.</span> <ScrambleText text={children} />
      <motion.i
        className="title-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      />
    </motion.h2>
  )
}
