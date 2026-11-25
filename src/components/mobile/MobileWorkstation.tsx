import { useEffect, useState } from 'react'
import { DESKTOP_ITEMS } from '../../context/workstationContextObject'
import { useWorkstation } from '../../context/useWorkstation'
import { FIELD_NOTES } from '../../data/fieldNotes'
import { LAB_EXPERIMENTS } from '../../data/laboratory'
import { PROJECTS } from '../../data/projects'
import { SYSTEM_INFO } from '../../data/systemInfo'
import { SYSTEM_TOPICS } from '../../data/systems'
import type { WindowId } from '../../types/workstation'
import { SectionIcon, WorkstationMarkIcon } from '../icons/MacIcons'
import { AboutContent } from '../windows/AboutContent'
import { ContactContent } from '../windows/ContactContent'
import { FieldNotesContent } from '../windows/FieldNotesContent'
import { LaboratoryContent } from '../windows/LaboratoryContent'
import { ProjectsContent } from '../windows/ProjectsContent'
import { SystemsContent } from '../windows/SystemsContent'
import { WelcomeContent } from '../windows/WelcomeContent'

function itemCountBadge(id: Exclude<WindowId, 'welcome'>): string {
  switch (id) {
    case 'projects':
      return `${PROJECTS.length} case studies`
    case 'notes':
      return `${FIELD_NOTES.length} essays`
    case 'laboratory':
      return `${LAB_EXPERIMENTS.length} experiments`
    case 'systems':
      return `${SYSTEM_TOPICS.length} topics`
    case 'about':
      return 'Operator profile & résumé'
    case 'contact':
      return 'Email, GitHub & LinkedIn'
  }
}

export function MobileWorkstation() {
  const {
    windows,
    mobileActiveWindow,
    setMobileActiveWindow,
    selectedProjectId,
    setSelectedProjectId,
    selectedNoteId,
    setSelectedNoteId,
    toastMessage,
    openWindow,
  } = useWorkstation()

  const [timeText, setTimeText] = useState<string>(() =>
    new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  )

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeText(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      )
    }, 20000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [mobileActiveWindow, selectedProjectId, selectedNoteId])

  const closeToDirectory = () => {
    setSelectedProjectId(null)
    setSelectedNoteId(null)
    setMobileActiveWindow(null)
    window.history.replaceState(null, '', window.location.pathname)
  }

  const handleBack = () => {
    if (mobileActiveWindow === 'projects' && selectedProjectId !== null) {
      setSelectedProjectId(null)
      return
    }
    if (mobileActiveWindow === 'notes' && selectedNoteId !== null) {
      setSelectedNoteId(null)
      return
    }
    closeToDirectory()
  }

  return (
    <div className="workstation-shell workstation-shell--mobile">
      <header className="mobile-bar">
        <button
          type="button"
          className="mobile-bar__brand"
          onClick={closeToDirectory}
          aria-label="Return to Workstation Directory"
        >
          <WorkstationMarkIcon size={18} />
          <span>Michael Kamau</span>
        </button>

        {toastMessage ? (
          <span className="menubar__toast" role="status" aria-live="polite">
            {toastMessage}
          </span>
        ) : (
          <span className="mobile-bar__clock">NBO · {timeText}</span>
        )}
      </header>

      {mobileActiveWindow === null ? (
        <main className="mobile-container">
          <section className="mobile-card" aria-label="Welcome">
            <div className="mobile-card__titlebar">
              <span className="mobile-card__title-pill">Welcome — Workstation</span>
            </div>
            <WelcomeContent />
          </section>

          <section className="mobile-card" aria-label="Workstation Directory">
            <div className="mobile-card__titlebar">
              <span className="mobile-card__title-pill">Workstation Directory</span>
            </div>
            <div className="mobile-directory">
              {DESKTOP_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="mobile-dir-row"
                  onClick={() => openWindow(item.id)}
                >
                  <span className="mobile-dir-row__left">
                    <SectionIcon id={item.id} size={32} />
                    <span>
                      <span className="mobile-dir-row__title" style={{ display: 'block' }}>
                        {item.label}
                      </span>
                      <span className="mobile-dir-row__desc">
                        {itemCountBadge(item.id)}
                      </span>
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '16px' }}
                  >
                    ›
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="mobile-card" aria-label="System Information">
            <div className="sysinfo-panel__header">
              <span>System Information</span>
              <span>{SYSTEM_INFO.systemRelease}</span>
            </div>
            <div className="sysinfo-panel__body">
              <div className="sysinfo-panel__row">
                <span className="sysinfo-panel__key">Operator</span>
                <span className="sysinfo-panel__val">{SYSTEM_INFO.operator}</span>
              </div>
              <div className="sysinfo-panel__row">
                <span className="sysinfo-panel__key">Location</span>
                <span className="sysinfo-panel__val">{SYSTEM_INFO.location}</span>
              </div>
              <div className="sysinfo-panel__row">
                <span className="sysinfo-panel__key">Focus</span>
                <span className="sysinfo-panel__val">{SYSTEM_INFO.currentFocus}</span>
              </div>
              <div className="sysinfo-panel__row">
                <span className="sysinfo-panel__key">Studying</span>
                <span className="sysinfo-panel__val">{SYSTEM_INFO.learningInterests}</span>
              </div>
              <div className="sysinfo-panel__row">
                <span className="sysinfo-panel__key">Status</span>
                <span className="sysinfo-panel__val">{SYSTEM_INFO.workstationStatus}</span>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="mobile-fullscreen">
          <div className="mobile-fullscreen__bar">
            <button type="button" className="mobile-nav-btn" onClick={handleBack}>
              ← Back
            </button>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '13.5px',
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              {windows[mobileActiveWindow].shortTitle}
            </span>
            <button
              type="button"
              className="mobile-nav-btn"
              aria-label="Close full-screen view"
              onClick={closeToDirectory}
            >
              × Close
            </button>
          </div>

          <div style={{ flex: 1 }}>
            {mobileActiveWindow === 'projects' && <ProjectsContent />}
            {mobileActiveWindow === 'notes' && <FieldNotesContent />}
            {mobileActiveWindow === 'laboratory' && <LaboratoryContent />}
            {mobileActiveWindow === 'systems' && <SystemsContent />}
            {mobileActiveWindow === 'about' && <AboutContent />}
            {mobileActiveWindow === 'contact' && <ContactContent />}
          </div>
        </main>
      )}
    </div>
  )
}
