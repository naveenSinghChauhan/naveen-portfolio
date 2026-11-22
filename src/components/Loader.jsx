import { motion } from 'framer-motion'

export default function Loader({ logo }) {
  return (
    <motion.div className="loader" exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.6 }}>
      <motion.span
        initial={{ opacity: 0, scale: 0.6, letterSpacing: '0.6em' }}
        animate={{ opacity: 1, scale: 1, letterSpacing: '0.05em' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {logo}
      </motion.span>
      <motion.div className="loader-bar" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, ease: 'easeInOut' }} />
    </motion.div>
  )
}
