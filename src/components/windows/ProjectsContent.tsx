import { useMemo, useState } from 'react'
import { PROJECTS } from '../../data/projects'
import type { ProjectCategory, ProjectItem } from '../../types/workstation'
import { useWorkstation } from '../../context/useWorkstation'
import { DocumentMacIcon } from '../icons/MacIcons'

const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'ERP Architecture',
  'Backend Systems',
  'Inventory & Hardware',
  'Developer Tooling',
  'Programming Languages',
]

function ProjectDocumentView({
  project,
  onBack,
  onSelectProject,
}: {
  project: ProjectItem
  onBack: () => void
  onSelectProject: (id: string) => void
}) {
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id)
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null
  const nextProject =
    currentIndex >= 0 && currentIndex < PROJECTS.length - 1
      ? PROJECTS[currentIndex + 1]
      : null

  return (
    <div>
      <div className="doc-nav">
        <button type="button" className="mac-btn mac-btn--sm" onClick={onBack}>
          ← All Projects
        </button>
        <span className="doc-nav__path">/Workstation/Projects/{project.filename}</span>
      </div>

      <article className="doc-sheet">
        <div className="doc-sheet__meta">
          <span>{project.year}</span>
          <span>·</span>
          <span>{project.category}</span>
          <span>·</span>
          <span>Status: {project.status}</span>
        </div>

        <h2 className="doc-sheet__title">{project.name}</h2>
        <p className="doc-sheet__lead">{project.summary}</p>

        <section className="doc-section">
          <h3 className="doc-section__heading">01 // Problem Description</h3>
          <p>{project.problem}</p>
        </section>

        <section className="doc-section">
          <h3 className="doc-section__heading">02 // Engineering Approach</h3>
          <p>{project.approach}</p>
        </section>

        <section className="doc-section">
          <h3 className="doc-section__heading">03 // Architecture & Design Decisions</h3>
          <ul className="doc-list">
            {project.architecture.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </section>

        <section className="doc-section">
          <h3 className="doc-section__heading">04 // Technologies Used</h3>
          <div className="finder-row__stack">
            {project.technologies.map((tech) => (
              <span key={tech} className="mac-tag">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="doc-section">
          <h3 className="doc-section__heading">05 // Challenges & Trade-offs</h3>
          <ul className="doc-list">
            {project.tradeoffs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="doc-section">
          <h3 className="doc-section__heading">06 // Outcomes & Lessons Learned</h3>
          <ul className="doc-list">
            {project.lessons.map((lesson) => (
              <li key={lesson}>{lesson}</li>
            ))}
          </ul>
        </section>

        <div
          style={{
            marginTop: '28px',
            paddingTop: '14px',
            borderTop: 'var(--border-thin)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          {prevProject ? (
            <button
              type="button"
              className="mac-btn mac-btn--sm"
              onClick={() => onSelectProject(prevProject.id)}
            >
              ← {prevProject.name}
            </button>
          ) : (
            <span />
          )}

          {nextProject && (
            <button
              type="button"
              className="mac-btn mac-btn--sm"
              onClick={() => onSelectProject(nextProject.id)}
            >
              {nextProject.name} →
            </button>
          )}
        </div>
      </article>
    </div>
  )
}

export function ProjectsContent() {
  const {
    projectsViewMode,
    setProjectsViewMode,
    selectedProjectId,
    setSelectedProjectId,
  } = useWorkstation()

  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All')

  const activeProject = useMemo(
    () => PROJECTS.find((p) => p.id === selectedProjectId) ?? null,
    [selectedProjectId],
  )

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS
    return PROJECTS.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  if (activeProject) {
    return (
      <ProjectDocumentView
        project={activeProject}
        onBack={() => setSelectedProjectId(null)}
        onSelectProject={(id) => setSelectedProjectId(id)}
      />
    )
  }

  return (
    <div>
      <div className="finder-toolbar">
        <div className="finder-toolbar__filters" role="group" aria-label="Filter projects by category">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={`mac-pill ${activeCategory === category ? 'mac-pill--active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="finder-toolbar__modes" role="group" aria-label="View mode">
          <button
            type="button"
            className={`finder-mode-btn ${
              projectsViewMode === 'list' ? 'finder-mode-btn--active' : ''
            }`}
            onClick={() => setProjectsViewMode('list')}
          >
            ≡ List
          </button>
          <button
            type="button"
            className={`finder-mode-btn ${
              projectsViewMode === 'icons' ? 'finder-mode-btn--active' : ''
            }`}
            onClick={() => setProjectsViewMode('icons')}
          >
            ⊞ Icons
          </button>
        </div>
      </div>

      {projectsViewMode === 'list' ? (
        <table className="finder-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Technologies</th>
              <th>Status</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr
                key={project.id}
                tabIndex={0}
                className="finder-row"
                onClick={() => setSelectedProjectId(project.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedProjectId(project.id)
                  }
                }}
              >
                <td>
                  <div className="finder-row__name">
                    <span style={{ marginTop: '2px', flexShrink: 0 }}>
                      <DocumentMacIcon size={18} />
                    </span>
                    <div>
                      <div className="finder-row__title">{project.name}</div>
                      <div className="finder-row__summary">{project.summary}</div>
                    </div>
                  </div>
                </td>
                <td className="finder-row__meta">{project.category}</td>
                <td>
                  <div className="finder-row__stack">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="mac-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="finder-row__meta">{project.status}</td>
                <td className="finder-row__meta">{project.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="finder-grid">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              className="finder-card"
              onClick={() => setSelectedProjectId(project.id)}
            >
              <DocumentMacIcon size={34} />
              <span className="finder-card__title">{project.name}</span>
              <span className="finder-card__meta">
                {project.category} · {project.year}
              </span>
              <div className="finder-row__stack" style={{ justifyContent: 'center' }}>
                {project.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="mac-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
