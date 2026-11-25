import { OPERATOR_PROFILE } from '../../data/profile'
import { useWorkstation } from '../../context/useWorkstation'
import { downloadOperatorResume } from '../../utils/actions'

export function AboutContent() {
  const { notify, openWindow } = useWorkstation()

  return (
    <div className="about-view">
      <div className="profile-header">
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--mid-grey)',
              marginBottom: '4px',
            }}
          >
            OPERATOR PROFILE // {OPERATOR_PROFILE.location.toUpperCase()}
          </div>
          <h2 className="doc-sheet__title">{OPERATOR_PROFILE.name}</h2>
          <p
            style={{
              marginTop: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12.5px',
              color: 'var(--deep-grey)',
            }}
          >
            {OPERATOR_PROFILE.tagline}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
            type="button"
            className="mac-btn mac-btn--sm"
            onClick={() => {
              downloadOperatorResume()
              notify('Downloaded Michael_Kamau_Resume.txt')
            }}
          >
            ↓ Résumé (.txt)
          </button>
          <button
            type="button"
            className="mac-btn mac-btn--sm"
            onClick={() => window.print()}
          >
            ⎙ Print / Save PDF
          </button>
        </div>
      </div>

      <section className="doc-section">
        <h3 className="doc-section__heading">Introduction</h3>
        {OPERATOR_PROFILE.introduction.map((para) => (
          <p key={para.slice(0, 28)}>{para}</p>
        ))}
      </section>

      <section className="doc-section">
        <h3 className="doc-section__heading">Technical Focus</h3>
        <div className="profile-grid">
          {OPERATOR_PROFILE.technicalFocus.map((item) => (
            <div key={item.area} className="profile-card">
              <div className="profile-card__title">{item.area}</div>
              <p className="profile-card__body">{item.details}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section">
        <h3 className="doc-section__heading">Experience</h3>
        <div className="timeline-list">
          {OPERATOR_PROFILE.experience.map((exp) => (
            <div key={exp.role} className="timeline-item">
              <div className="timeline-item__meta">
                {exp.period} · {exp.context}
              </div>
              <div className="timeline-item__role">{exp.role}</div>
              <ul className="doc-list" style={{ marginTop: '6px' }}>
                {exp.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section">
        <h3 className="doc-section__heading">Education & Independent Study</h3>
        <div className="timeline-list">
          {OPERATOR_PROFILE.education.map((edu) => (
            <div key={edu.qualification} className="timeline-item">
              <div className="timeline-item__meta">
                {edu.period} · {edu.institution}
              </div>
              <div className="timeline-item__role">{edu.qualification}</div>
              <p style={{ marginTop: '4px', fontSize: '14px' }}>{edu.notes}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section">
        <h3 className="doc-section__heading">Engineering Interests</h3>
        <ul className="doc-list">
          {OPERATOR_PROFILE.engineeringInterests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </section>

      <div
        style={{
          marginTop: '26px',
          paddingTop: '14px',
          borderTop: 'var(--border-thin)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--mid-grey)' }}>
          Want to discuss a backend system or engineering role?
        </span>
        <button
          type="button"
          className="mac-btn mac-btn--sm"
          onClick={() => openWindow('contact')}
        >
          Establish Connection →
        </button>
      </div>
    </div>
  )
}
