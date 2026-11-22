import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CHARS = '!<>-_\\/[]{}=+*^?#01'

// Text "decodes" from random characters into the real text when it scrolls into view
export default function ScrambleText({ text }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const duration = 900
    const start = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const reveal = Math.floor(p * text.length)
      setOut(
        text.split('').map((ch, i) =>
          ch === ' ' || i < reveal ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('')
      )
      if (p < 1) raf = requestAnimationFrame(tick)
      else setOut(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, text])

  return <span ref={ref}>{out}</span>
}
