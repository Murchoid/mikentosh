import { useMemo, useState } from 'react'
import { FIELD_NOTES } from '../../data/fieldNotes'
import type { FieldNote, NoteCategory } from '../../types/workstation'
import { useWorkstation } from '../../context/useWorkstation'

const NOTE_CATEGORIES: ('All' | NoteCategory)[] = [
  'All',
  'Architecture',
  'Backend',
  'Databases',
  'Languages',
  'Systems',
]

function NoteReaderView({
  note,
  onBack,
  onSelectNote,
}: {
  note: FieldNote
  onBack: () => void
  onSelectNote: (id: string) => void
}) {
  const index = FIELD_NOTES.findIndex((item) => item.id === note.id)
  const prevNote = index > 0 ? FIELD_NOTES[index - 1] : null
  const nextNote =
    index >= 0 && index < FIELD_NOTES.length - 1 ? FIELD_NOTES[index + 1] : null

  return (
    <div>
      <div className="doc-nav">
        <button type="button" className="mac-btn mac-btn--sm" onClick={onBack}>
          ← All Field Notes
        </button>
        <span className="doc-nav__path">/Workstation/Notes/{note.filename}</span>
      </div>

      <article className="doc-sheet">
        <div className="doc-sheet__meta">
          <time dateTime={note.publishedAt}>{note.publishedAt}</time>
          <span>·</span>
          <span>{note.category}</span>
          <span>·</span>
          <span>{note.readingTime}</span>
        </div>

        <h2 className="doc-sheet__title">{note.title}</h2>
        <p className="doc-sheet__lead">{note.excerpt}</p>

        {note.sections.map((section, idx) => (
          <section key={section.heading ?? `sec-${idx}`} className="doc-section">
            {section.heading && (
              <h3 className="doc-section__heading">{section.heading}</h3>
            )}
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
            {section.code && (
              <figure className="doc-code">
                <figcaption className="doc-code__caption">
                  {section.code.caption}
                </figcaption>
                <pre>
                  <code>{section.code.snippet}</code>
                </pre>
              </figure>
            )}
          </section>
        ))}

        <div
          style={{
            marginTop: '30px',
            paddingTop: '14px',
            borderTop: 'var(--border-thin)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          {prevNote ? (
            <button
              type="button"
              className="mac-btn mac-btn--sm"
              onClick={() => onSelectNote(prevNote.id)}
            >
              ← Newer Note
            </button>
          ) : (
            <span />
          )}

          {nextNote && (
            <button
              type="button"
              className="mac-btn mac-btn--sm"
              onClick={() => onSelectNote(nextNote.id)}
            >
              Older Note →
            </button>
          )}
        </div>
      </article>
    </div>
  )
}

export function FieldNotesContent() {
  const { selectedNoteId, setSelectedNoteId } = useWorkstation()
  const [category, setCategory] = useState<'All' | NoteCategory>('All')
  const [query, setQuery] = useState<string>('')

  const activeNote = useMemo(
    () => FIELD_NOTES.find((n) => n.id === selectedNoteId) ?? null,
    [selectedNoteId],
  )

  const filteredNotes = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return FIELD_NOTES.filter((note) => {
      const categoryMatch = category === 'All' || note.category === category
      if (!categoryMatch) return false
      if (!normalized) return true
      return (
        note.title.toLowerCase().includes(normalized) ||
        note.excerpt.toLowerCase().includes(normalized) ||
        note.category.toLowerCase().includes(normalized)
      )
    })
  }, [category, query])

  if (activeNote) {
    return (
      <NoteReaderView
        note={activeNote}
        onBack={() => setSelectedNoteId(null)}
        onSelectNote={(id) => setSelectedNoteId(id)}
      />
    )
  }

  return (
    <div>
      <div className="finder-toolbar">
        <div className="finder-toolbar__filters" role="group" aria-label="Filter notes by topic">
          {NOTE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`mac-pill ${category === cat ? 'mac-pill--active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="search"
          className="mac-input"
          placeholder="Search notes…"
          aria-label="Search field notes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filteredNotes.length === 0 ? (
        <div style={{ padding: '28px 20px', fontFamily: 'var(--font-mono)', fontSize: '12.5px' }}>
          No field notes match “{query}”.{' '}
          <button
            type="button"
            className="mac-pill"
            onClick={() => {
              setQuery('')
              setCategory('All')
            }}
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="notes-list">
          {filteredNotes.map((note) => (
            <button
              key={note.id}
              type="button"
              className="note-item"
              onClick={() => setSelectedNoteId(note.id)}
            >
              <div className="note-item__meta">
                <span>{note.publishedAt}</span>
                <span>·</span>
                <span>{note.category}</span>
                <span>·</span>
                <span>{note.readingTime}</span>
              </div>
              <div className="note-item__title">{note.title}</div>
              <div className="note-item__excerpt">{note.excerpt}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
