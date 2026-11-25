import { OPERATOR_PROFILE } from '../../data/profile'
import { SYSTEM_INFO } from '../../data/systemInfo'
import { useWorkstation } from '../../context/useWorkstation'
import { WorkstationMarkIcon } from '../icons/MacIcons'

export function WelcomeContent() {
  const { openWindow } = useWorkstation()

  return (
    <div className="welcome-view">
      <div className="welcome-view__eyebrow">
        <span>STATION // NAIROBI, KE</span>
        <span>{SYSTEM_INFO.systemRelease}</span>
      </div>

      <div className="welcome-view__identity">
        <div className="welcome-view__mark" aria-hidden="true">
          <WorkstationMarkIcon size={30} />
        </div>
        <div>
          <h1 className="welcome-view__title">{OPERATOR_PROFILE.name}</h1>
          <p className="welcome-view__role">{OPERATOR_PROFILE.tagline}</p>
        </div>
      </div>

      <blockquote className="welcome-view__quote">
        “{OPERATOR_PROFILE.quote}”
      </blockquote>

      <div className="welcome-view__actions">
        <button
          type="button"
          className="mac-btn mac-btn--primary"
          onClick={() => openWindow('projects', { projectId: null })}
        >
          Explore my work
        </button>
        <button
          type="button"
          className="mac-btn"
          onClick={() => openWindow('notes', { noteId: null })}
        >
          Read my notes
        </button>
      </div>

      <div className="welcome-view__footer">
        <span>Open any folder on the desktop or use the menu bar above.</span>
        <span>Focus: {SYSTEM_INFO.currentFocus}</span>
      </div>
    </div>
  )
}
