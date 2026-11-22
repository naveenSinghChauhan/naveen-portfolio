import { useEffect, useState } from 'react'

export default function TypedText({ words }) {
  const [text, setText] = useState('')
  useEffect(() => {
    let i = 0, c = 0, del = false, t
    const tick = () => {
      const w = words[i]
      setText(w.slice(0, c))
      let d = del ? 40 : 80
      if (!del && c === w.length) { del = true; d = 1600 }
      else if (del && c === 0) { del = false; i = (i + 1) % words.length; d = 300 }
      else c += del ? -1 : 1
      t = setTimeout(tick, d)
    }
    tick()
    return () => clearTimeout(t)
  }, [words])
  return <>{text}<span className="caret" /></>
}
