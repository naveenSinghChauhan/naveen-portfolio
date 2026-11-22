import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import Icon from './Icon'

export default function Contact({ profile, contact, title }) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const submit = async (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = f.get('name'), email = f.get('email'), message = f.get('message')

    // If a form endpoint (e.g. Formspree) is set in portfolio.json, post to it. Otherwise open the mail app.
    if (contact.formEndpoint) {
      try {
        setStatus('sending')
        const res = await fetch(contact.formEndpoint, {
          method: 'POST', headers: { Accept: 'application/json' }, body: f,
        })
        setStatus(res.ok ? 'sent' : 'error')
        if (res.ok) e.currentTarget.reset()
      } catch { setStatus('error') }
      return
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const rows = [
    { icon: 'mail', text: profile.email, href: `mailto:${profile.email}` },
    { icon: 'phone', text: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: 'pin', text: profile.location },
  ]

  return (
    <section className="section" id="contact">
      <SectionTitle num="06">{title}</SectionTitle>
      <div className="contact-grid">
        <div className="contact-info">
          <Reveal as="p">{contact.text}</Reveal>
          {rows.map((r, i) => (
            <Reveal key={r.icon} delay={0.1 + i * 0.1} x={-30} y={0}>
              {r.href ? (
                <motion.a className="c-row" href={r.href} whileHover={{ x: 8 }}>
                  <b><Icon name={r.icon} /></b>
                  <span><small>{r.icon === 'mail' ? 'Email' : r.icon === 'phone' ? 'Phone' : 'Location'}</small>{r.text}</span>
                </motion.a>
              ) : (
                <div className="c-row">
                  <b><Icon name={r.icon} /></b>
                  <span><small>Location</small>{r.text}</span>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal x={40} y={0}>
          <form className="contact-form" onSubmit={submit}>
            <input name="name" type="text" placeholder="Your Name" required />
            <input name="email" type="email" placeholder="Your Email" required />
            <textarea name="message" rows="5" placeholder="Your Message" required />
            <Magnetic strength={0.15}>
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </Magnetic>
            {status === 'sent' && <motion.p className="form-msg ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Thanks! Your message was sent.</motion.p>}
            {status === 'error' && <motion.p className="form-msg err" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Something went wrong. Please email me directly.</motion.p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
