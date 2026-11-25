import { useState } from 'react'
import { SYSTEM_TOPICS } from '../../data/systems'
import { SystemSchematic } from './SystemDiagrams'

export function SystemsContent() {
  const [activeId, setActiveId] = useState<string>(SYSTEM_TOPICS[0].id)

  const topic = SYSTEM_TOPICS.find((t) => t.id === activeId) ?? SYSTEM_TOPICS[0]

  return (
    <div className="systems-layout">
      <nav className="systems-sidebar" aria-label="Systems engineering topics">
        {SYSTEM_TOPICS.map((item) => {
          const isActive = item.id === topic.id
          return (
            <button
              key={item.id}
              type="button"
              className={`systems-tab ${isActive ? 'systems-tab--active' : ''}`}
              onClick={() => setActiveId(item.id)}
            >
              <span className="systems-tab__code">{item.code}</span>
              <span className="systems-tab__title">{item.title}</span>
            </button>
          )
        })}
      </nav>

      <div className="systems-detail">
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--mid-grey)',
              marginBottom: '4px',
            }}
          >
            {topic.code} // ARCHITECTURAL EXPLORATION
          </div>
          <h2 className="doc-sheet__title">{topic.title}</h2>
          <p
            style={{
              marginTop: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12.5px',
              color: 'var(--deep-grey)',
            }}
          >
            {topic.subtitle}
          </p>
        </div>

        <figure className="diagram-frame">
          <SystemSchematic diagramId={topic.diagramId} />
          <figcaption className="diagram-frame__caption">
            {topic.diagramCaption}
          </figcaption>
        </figure>

        <section>
          <h3 className="doc-section__heading">Overview</h3>
          <p style={{ fontSize: '14.5px', lineHeight: 1.68, color: 'var(--deep-grey)' }}>
            {topic.overview}
          </p>
        </section>

        <section>
          <h3 className="doc-section__heading">Architectural Notes</h3>
          <div className="systems-notes-grid">
            {topic.architecturalNotes.map((note) => (
              <div key={note.label} className="systems-note-box">
                <div className="systems-note-box__label">{note.label}</div>
                <p className="systems-note-box__detail">{note.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="doc-section__heading">Questions Under Study</h3>
          <ul className="doc-list">
            {topic.coreQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="doc-section__heading">Reference Shelf</h3>
          <ul className="doc-list" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
            {topic.references.map((ref) => (
              <li key={ref}>{ref}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
