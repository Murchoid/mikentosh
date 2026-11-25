import { useMemo, useState } from 'react'
import { LAB_EXPERIMENTS } from '../../data/laboratory'
import type { ExperimentStatus } from '../../types/workstation'

const STATUS_FILTERS: ('ALL' | ExperimentStatus)[] = [
  'ALL',
  'IN PROGRESS',
  'EXPLORING',
  'COMPLETED',
  'ON HOLD',
]

function statusBadgeClass(status: ExperimentStatus): string {
  switch (status) {
    case 'IN PROGRESS':
      return 'status-badge status-badge--in-progress'
    case 'EXPLORING':
      return 'status-badge status-badge--exploring'
    case 'COMPLETED':
      return 'status-badge status-badge--completed'
    case 'ON HOLD':
      return 'status-badge status-badge--on-hold'
  }
}

function statusIndicator(status: ExperimentStatus): string {
  switch (status) {
    case 'IN PROGRESS':
      return '●'
    case 'EXPLORING':
      return '◌'
    case 'COMPLETED':
      return '✓'
    case 'ON HOLD':
      return '‖'
  }
}

export function LaboratoryContent() {
  const [statusFilter, setStatusFilter] = useState<'ALL' | ExperimentStatus>('ALL')
  const [expandedId, setExpandedId] = useState<string | null>(LAB_EXPERIMENTS[0]?.id ?? null)

  const visibleExperiments = useMemo(() => {
    if (statusFilter === 'ALL') return LAB_EXPERIMENTS
    return LAB_EXPERIMENTS.filter((exp) => exp.status === statusFilter)
  }, [statusFilter])

  return (
    <div>
      <div className="finder-toolbar">
        <div className="finder-toolbar__filters" role="group" aria-label="Filter experiments by status">
          {STATUS_FILTERS.map((st) => (
            <button
              key={st}
              type="button"
              className={`mac-pill ${statusFilter === st ? 'mac-pill--active' : ''}`}
              onClick={() => setStatusFilter(st)}
            >
              {st}
            </button>
          ))}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--mid-grey)' }}>
          Ongoing prototypes & study harnesses
        </span>
      </div>

      <div className="lab-grid">
        {visibleExperiments.map((exp) => {
          const isExpanded = expandedId === exp.id
          return (
            <article key={exp.id} className="lab-card">
              <div className="lab-card__top">
                <span className="lab-card__code">
                  {exp.code} · {exp.domain}
                </span>
                <span className={statusBadgeClass(exp.status)}>
                  <span aria-hidden="true">{statusIndicator(exp.status)}</span>
                  <span>{exp.status}</span>
                </span>
              </div>

              <div className="lab-card__body">
                <h3 className="lab-card__title">{exp.title}</h3>
                <p className="lab-card__summary">{exp.summary}</p>

                <div className="finder-row__stack">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="mac-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {isExpanded && (
                  <div className="lab-card__details">
                    <div>
                      <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink)' }}>
                        HYPOTHESIS:
                      </strong>
                      <p style={{ marginTop: '3px' }}>{exp.hypothesis}</p>
                    </div>
                    <div>
                      <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink)' }}>
                        BENCH NOTES:
                      </strong>
                      <ul className="doc-list" style={{ marginTop: '4px', fontSize: '12.5px' }}>
                        {exp.observations.map((obs) => (
                          <li key={obs}>{obs}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink)' }}>
                        NEXT:
                      </strong>{' '}
                      <span>{exp.nextSteps}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="lab-card__footer">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--mid-grey)' }}>
                  Updated {exp.updatedAt}
                </span>
                <button
                  type="button"
                  className="mac-pill"
                  onClick={() => setExpandedId((curr) => (curr === exp.id ? null : exp.id))}
                >
                  {isExpanded ? 'Hide Notes −' : 'Lab Notes +'}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
