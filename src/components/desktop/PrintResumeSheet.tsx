import { OPERATOR_PROFILE } from '../../data/profile'

export function PrintResumeSheet() {
  return (
    <section className="print-resume" aria-hidden="true">
      <header style={{ borderBottom: '2px solid #111111', paddingBottom: '10px', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '22pt', fontWeight: 700 }}>{OPERATOR_PROFILE.name}</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10pt', marginTop: '4px' }}>
          {OPERATOR_PROFILE.tagline}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5pt', marginTop: '4px' }}>
          {OPERATOR_PROFILE.location} · {OPERATOR_PROFILE.email}
        </p>
      </header>

      <div style={{ marginBottom: '14px' }}>
        {OPERATOR_PROFILE.introduction.map((line) => (
          <p key={line.slice(0, 24)} style={{ marginBottom: '6px' }}>
            {line}
          </p>
        ))}
      </div>

      <h2 style={{ fontSize: '11pt', textTransform: 'uppercase', borderBottom: '1px solid #111111', paddingBottom: '3px', marginBottom: '8px' }}>
        Technical Focus
      </h2>
      <ul style={{ marginBottom: '14px', paddingLeft: '18px' }}>
        {OPERATOR_PROFILE.technicalFocus.map((item) => (
          <li key={item.area} style={{ marginBottom: '4px' }}>
            <strong>{item.area}:</strong> {item.details}
          </li>
        ))}
      </ul>

      <h2 style={{ fontSize: '11pt', textTransform: 'uppercase', borderBottom: '1px solid #111111', paddingBottom: '3px', marginBottom: '8px' }}>
        Experience
      </h2>
      {OPERATOR_PROFILE.experience.map((exp) => (
        <div key={exp.role} style={{ marginBottom: '12px' }}>
          <div style={{ fontWeight: 700 }}>
            {exp.role} — <span style={{ fontWeight: 400 }}>{exp.period}</span>
          </div>
          <div style={{ fontSize: '9.5pt', color: '#333333', marginBottom: '4px' }}>
            {exp.context}
          </div>
          <ul style={{ paddingLeft: '18px' }}>
            {exp.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2 style={{ fontSize: '11pt', textTransform: 'uppercase', borderBottom: '1px solid #111111', paddingBottom: '3px', marginBottom: '8px' }}>
        Education & Study
      </h2>
      {OPERATOR_PROFILE.education.map((edu) => (
        <div key={edu.qualification} style={{ marginBottom: '8px' }}>
          <strong>{edu.qualification}</strong> ({edu.institution}, {edu.period}) — {edu.notes}
        </div>
      ))}
    </section>
  )
}
