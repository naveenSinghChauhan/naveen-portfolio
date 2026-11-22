import SectionTitle from './SectionTitle'
import Reveal from './Reveal'
import Tilt from './Tilt'

export default function Education({ education, title }) {
  return (
    <section className="section" id="education">
      <SectionTitle num="05">{title}</SectionTitle>
      <div className="edu">
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.15}>
            <Tilt className="edu-card">
              <span className="date">{e.period}</span>
              <h3>{e.degree}</h3>
              <p>{e.institute}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
