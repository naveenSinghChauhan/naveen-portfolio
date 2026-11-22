import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'

export default function ToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(scrollY > 600)
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button className="to-top" aria-label="Back to top"
          initial={{ opacity: 0, y: 30, scale: 0.6 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.6 }}
          whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Icon name="up" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
