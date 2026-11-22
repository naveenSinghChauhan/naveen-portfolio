import { useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

// 3D tilt + spotlight position. Spread the result on a motion element: {...tilt}
export default function useTilt(max = 8) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 220, damping: 22 })
  const sy = useSpring(ry, { stiffness: 220, damping: 22 })

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    rx.set((y / r.height - 0.5) * -max)
    ry.set((x / r.width - 0.5) * max)
    el.style.setProperty('--mx', x + 'px')
    el.style.setProperty('--my', y + 'px')
  }
  const onMouseLeave = () => { rx.set(0); ry.set(0) }

  return {
    ref,
    onMouseMove,
    onMouseLeave,
    style: { rotateX: sx, rotateY: sy, transformPerspective: 900 },
  }
}
