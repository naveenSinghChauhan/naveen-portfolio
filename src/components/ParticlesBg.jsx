import { useEffect, useRef } from 'react'

export default function ParticlesBg({ theme }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w, h, pts = [], raf
    const mouse = { x: null, y: null }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      w = canvas.width = innerWidth
      h = canvas.height = innerHeight
      const n = Math.min(90, Math.floor((w * h) / 18000))
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.6 + 0.6,
      }))
    }
    const move = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    resize()
    addEventListener('resize', resize)
    addEventListener('mousemove', move)

    const css = getComputedStyle(document.documentElement)
    const hexToRgb = (hex) => {
      const v = hex.trim().replace('#', '')
      return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16)).join(',')
    }
    const c1 = hexToRgb(css.getPropertyValue('--a1') || '#6ee7f9')
    const c2 = hexToRgb(css.getPropertyValue('--a2') || '#8b5cf6')

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        if (!reduce) { p.x += p.vx; p.y += p.vy }
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c1},.7)`
        ctx.fill()
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 130) {
            ctx.strokeStyle = `rgba(${c2},${(1 - d / 130) * 0.35})`
            ctx.lineWidth = 0.7
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
          }
        }
        if (mouse.x !== null) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y)
          if (d < 160) {
            ctx.strokeStyle = `rgba(${c1},${(1 - d / 160) * 0.5})`
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
            p.x += (mouse.x - p.x) * 0.003; p.y += (mouse.y - p.y) * 0.003
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
      removeEventListener('mousemove', move)
    }
  }, [theme])
  return <canvas id="bg" ref={ref} />
}
