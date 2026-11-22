import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const INTERACTIVE = 'a,button,input,textarea,[role=button]'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [down, setDown] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 })

  useEffect(() => {
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return
    setEnabled(true)
    document.body.classList.add('has-custom-cursor')
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => setHover(!!e.target.closest?.(INTERACTIVE))
    const dn = () => setDown(true)
    const up = () => setDown(false)
    addEventListener('mousemove', move)
    addEventListener('mouseover', over)
    addEventListener('mousedown', dn)
    addEventListener('mouseup', up)
    return () => {
      document.body.classList.remove('has-custom-cursor')
      removeEventListener('mousemove', move)
      removeEventListener('mouseover', over)
      removeEventListener('mousedown', dn)
      removeEventListener('mouseup', up)
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div className="cursor-ring" style={{ x: rx, y: ry }}
        animate={{ scale: hover ? 1.7 : down ? 0.7 : 1, opacity: hover ? 0.55 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }} />
      <motion.div className="cursor-dot" style={{ x, y }} animate={{ scale: hover ? 0.4 : 1 }} />
    </>
  )
}
