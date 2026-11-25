import { SYSTEM_INFO } from '../../data/systemInfo'
import { useWorkstation } from '../../context/useWorkstation'
import { WorkstationMarkIcon } from '../icons/MacIcons'

export function SystemInfoPanel() {
  const { showSystemInfo, setShowSystemInfo } = useWorkstation()

  if (!showSystemInfo) {
    return null
  }

  return (
    <aside className="sysinfo-panel" aria-label="System information">
      <div className="sysinfo-panel__header">
        <span>System Info</span>
        <button
          type="button"
          className="sysinfo-panel__close"
          aria-label="Hide System Information panel"
          title="Hide System Info (re-open from View menu)"
          onClick={() => setShowSystemInfo(false)}
        >
          ×
        </button>
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
    </aside>
  )
}

export function AboutWorkstationDialog() {
  const { aboutWorkstationOpen, setAboutWorkstationOpen } = useWorkstation()

  if (!aboutWorkstationOpen) {
    return null
  }

  return (
    <div
      className="dialog-backdrop"
      role="presentation"
      onClick={() => setAboutWorkstationOpen(false)}
    >
      <div
        className="mac-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-workstation-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mac-dialog__inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="welcome-view__mark">
              <WorkstationMarkIcon size={28} />
            </div>
            <div>
              <h2
                id="about-workstation-title"
                style={{ fontFamily: 'var(--font-ui)', fontSize: '17px', fontWeight: 700 }}
              >
                Personal Engineering Workstation
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11.5px',
                  color: 'var(--mid-grey)',
                }}
              >
                {SYSTEM_INFO.systemRelease}
              </p>
            </div>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--deep-grey)', lineHeight: 1.6 }}>
            A personal workspace for {SYSTEM_INFO.operator}—housing software architecture case
            studies, technical field notes, ongoing laboratory prototypes, and systems engineering
            explorations.
          </p>

          <div
            style={{
              padding: '10px 12px',
              backgroundColor: 'var(--surface-subtle)',
              border: 'var(--border-thin)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11.5px',
              display: 'grid',
              gap: '4px',
            }}
          >
            <div>Operator: {SYSTEM_INFO.operator}</div>
            <div>Station: {SYSTEM_INFO.location}</div>
            <div>Visual System: Classic System 6/7 Monograph</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="mac-btn mac-btn--primary mac-btn--sm"
              onClick={() => setAboutWorkstationOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
