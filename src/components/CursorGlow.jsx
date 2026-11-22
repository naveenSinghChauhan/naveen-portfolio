import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const x = useSpring(useMotionValue(-500), { stiffness: 90, damping: 20 })
  const y = useSpring(useMotionValue(-500), { stiffness: 90, damping: 20 })
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    addEventListener('mousemove', move)
    return () => removeEventListener('mousemove', move)
  }, [x, y])
  return <motion.div className="cursor-glow" style={{ left: x, top: y }} />
}
