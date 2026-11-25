import { SYSTEM_INFO } from '../../data/systemInfo'
import { useWorkstation } from '../../context/useWorkstation'

export function WindowTray() {
  const { openWindowsOrdered, focusedWindowId, openWindow, focusWindow } = useWorkstation()

  return (
    <footer className="window-tray" aria-label="Open and minimized windows">
      <div className="window-tray__left">
        <span className="window-tray__label">Windows:</span>
        {openWindowsOrdered.length === 0 ? (
          <span className="window-tray__label" style={{ color: 'var(--mid-grey)' }}>
            No open windows — select any desktop icon
          </span>
        ) : (
          openWindowsOrdered.map((win) => {
            const isFocused = focusedWindowId === win.id && !win.isMinimized
            return (
              <button
                key={win.id}
                type="button"
                className={`window-tray__tab ${
                  isFocused ? 'window-tray__tab--focused' : ''
                } ${win.isMinimized ? 'window-tray__tab--minimized' : ''}`}
                title={
                  win.isMinimized
                    ? `Restore ${win.shortTitle}`
                    : `Focus ${win.shortTitle}`
                }
                onClick={() => {
                  if (win.isMinimized) {
                    openWindow(win.id)
                  } else {
                    focusWindow(win.id)
                  }
                }}
              >
                <span className="window-tray__badge" aria-hidden="true">
                  {win.isMinimized ? '–' : '▣'}
                </span>
                <span>{win.shortTitle}</span>
              </button>
            )
          })
        )}
      </div>

      <div className="window-tray__right">
        {SYSTEM_INFO.location} · {SYSTEM_INFO.workstationStatus}
      </div>
    </footer>
  )
}
