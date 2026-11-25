import type { WindowId } from '../../types/workstation'
import { useWorkstation } from '../../context/useWorkstation'
import { SectionIcon } from '../icons/MacIcons'

interface DesktopIconProps {
  id: Exclude<WindowId, 'welcome'>
  label: string
  description: string
}

export function DesktopIcon({ id, label, description }: DesktopIconProps) {
  const {
    windows,
    focusedWindowId,
    selectedDesktopIcon,
    setSelectedDesktopIcon,
    openWindow,
  } = useWorkstation()

  const win = windows[id]
  const isSelected = selectedDesktopIcon === id || focusedWindowId === id

  return (
    <button
      type="button"
      className={`desktop-icon ${isSelected ? 'desktop-icon--active' : ''} ${
        win.isOpen ? 'desktop-icon--open' : ''
      }`}
      title={`${label} — ${description}`}
      aria-label={`Open ${label}: ${description}`}
      onClick={(event) => {
        event.stopPropagation()
        setSelectedDesktopIcon(id)
        openWindow(id)
      }}
    >
      <span className="desktop-icon__art">
        <SectionIcon id={id} size={36} />
      </span>
      <span className="desktop-icon__label">{label}</span>
    </button>
  )
}
