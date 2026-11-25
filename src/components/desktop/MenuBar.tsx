import { useEffect, useRef, useState } from 'react'
import { FIELD_NOTES } from '../../data/fieldNotes'
import { OPERATOR_PROFILE } from '../../data/profile'
import { DESKTOP_ITEMS } from '../../context/workstationContextObject'
import { useWorkstation } from '../../context/useWorkstation'
import { copyTextToClipboard, downloadOperatorResume } from '../../utils/actions'
import { WorkstationMarkIcon } from '../icons/MacIcons'

type MenuKey = 'mark' | 'michael' | 'file' | 'edit' | 'view' | 'special'

interface MenuActionItem {
  kind: 'action'
  label: string
  shortcut?: string
  checked?: boolean
  disabled?: boolean
  onSelect: () => void
}

interface MenuDividerItem {
  kind: 'divider'
}

type MenuEntry = MenuActionItem | MenuDividerItem

function formatWorkstationClock(now: Date): string {
  const day = now.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  })
  const time = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  return `${day} · ${time}`
}

export function MenuBar() {
  const {
    openWindowsOrdered,
    focusedWindowId,
    selectedDesktopIcon,
    setSelectedDesktopIcon,
    projectsViewMode,
    setProjectsViewMode,
    showSystemInfo,
    setShowSystemInfo,
    setAboutWorkstationOpen,
    desktopTexture,
    setDesktopTexture,
    toastMessage,
    notify,
    openWindow,
    closeActiveWindow,
    closeAllWindows,
    cascadeWindows,
    centerActiveWindow,
    resetDesktop,
  } = useWorkstation()

  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null)
  const [clockLabel, setClockLabel] = useState<string>(() =>
    formatWorkstationClock(new Date()),
  )
  const barRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setClockLabel(formatWorkstationClock(new Date()))
    }, 15000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!openMenu) return
    const handlePointerDown = (event: PointerEvent) => {
      if (barRef.current && !barRef.current.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        setOpenMenu(null)
      }
    }
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown, true)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [openMenu])

  const runMenuAction = (fn: () => void) => {
    setOpenMenu(null)
    fn()
  }

  const menus: { key: MenuKey; label: string; isMark?: boolean; items: MenuEntry[] }[] = [
    {
      key: 'mark',
      label: 'Workstation',
      isMark: true,
      items: [
        {
          kind: 'action',
          label: 'About This Workstation…',
          onSelect: () => setAboutWorkstationOpen(true),
        },
        {
          kind: 'action',
          label: 'System Information',
          checked: showSystemInfo,
          onSelect: () => setShowSystemInfo(!showSystemInfo),
        },
        { kind: 'divider' },
        ...DESKTOP_ITEMS.map(
          (item): MenuActionItem => ({
            kind: 'action',
            label: item.label,
            shortcut: `#${item.shortcut}`,
            onSelect: () => openWindow(item.id),
          }),
        ),
      ],
    },
    {
      key: 'michael',
      label: 'Michael',
      items: [
        {
          kind: 'action',
          label: 'Welcome Window',
          onSelect: () => openWindow('welcome'),
        },
        {
          kind: 'action',
          label: 'Operator Profile',
          onSelect: () => openWindow('about'),
        },
        {
          kind: 'action',
          label: 'Establish Connection…',
          onSelect: () => openWindow('contact'),
        },
        { kind: 'divider' },
        {
          kind: 'action',
          label: 'Download Résumé (.txt)',
          onSelect: () => {
            downloadOperatorResume()
            notify('Résumé downloaded')
          },
        },
        {
          kind: 'action',
          label: 'Print Résumé Sheet…',
          onSelect: () => window.print(),
        },
        { kind: 'divider' },
        {
          kind: 'action',
          label: 'GitHub Profile ↗',
          onSelect: () => {
            window.open('https://github.com/michaelkamau', '_blank', 'noopener,noreferrer')
          },
        },
        {
          kind: 'action',
          label: 'LinkedIn Profile ↗',
          onSelect: () => {
            window.open(
              'https://www.linkedin.com/in/michaelkamau',
              '_blank',
              'noopener,noreferrer',
            )
          },
        },
      ],
    },
    {
      key: 'file',
      label: 'File',
      items: [
        {
          kind: 'action',
          label: selectedDesktopIcon
            ? `Open "${selectedDesktopIcon}"`
            : 'Open Project Archive',
          onSelect: () => openWindow(selectedDesktopIcon ?? 'projects'),
        },
        {
          kind: 'action',
          label: 'Read Latest Field Note',
          onSelect: () =>
            openWindow('notes', { noteId: FIELD_NOTES[0]?.id ?? null }),
        },
        {
          kind: 'action',
          label: 'Open Laboratory Bench',
          onSelect: () => openWindow('laboratory'),
        },
        { kind: 'divider' },
        {
          kind: 'action',
          label: 'Close Active Window',
          shortcut: 'Esc',
          disabled: focusedWindowId === null,
          onSelect: () => closeActiveWindow(),
        },
        {
          kind: 'action',
          label: 'Close All Windows',
          disabled: openWindowsOrdered.length === 0,
          onSelect: () => closeAllWindows(),
        },
      ],
    },
    {
      key: 'edit',
      label: 'Edit',
      items: [
        {
          kind: 'action',
          label: 'Copy Email Address',
          onSelect: async () => {
            const copied = await copyTextToClipboard(OPERATOR_PROFILE.email)
            notify(copied ? `Copied ${OPERATOR_PROFILE.email}` : OPERATOR_PROFILE.email)
          },
        },
        {
          kind: 'action',
          label: 'Copy Workstation URL',
          onSelect: async () => {
            const copied = await copyTextToClipboard(window.location.href)
            notify(copied ? 'Workstation link copied' : window.location.href)
          },
        },
        { kind: 'divider' },
        {
          kind: 'action',
          label: 'Clear Icon Selection',
          disabled: selectedDesktopIcon === null,
          onSelect: () => setSelectedDesktopIcon(null),
        },
      ],
    },
    {
      key: 'view',
      label: 'View',
      items: [
        {
          kind: 'action',
          label: 'Projects as List',
          checked: projectsViewMode === 'list',
          onSelect: () => {
            setProjectsViewMode('list')
            openWindow('projects', { projectId: null })
          },
        },
        {
          kind: 'action',
          label: 'Projects as Icons',
          checked: projectsViewMode === 'icons',
          onSelect: () => {
            setProjectsViewMode('icons')
            openWindow('projects', { projectId: null })
          },
        },
        { kind: 'divider' },
        {
          kind: 'action',
          label: 'Show System Info Panel',
          checked: showSystemInfo,
          onSelect: () => setShowSystemInfo(!showSystemInfo),
        },
        {
          kind: 'action',
          label: 'Center Active Window',
          disabled: focusedWindowId === null,
          onSelect: () => centerActiveWindow(),
        },
        {
          kind: 'action',
          label: 'Cascade Open Windows',
          disabled: openWindowsOrdered.length === 0,
          onSelect: () => cascadeWindows(),
        },
        ...(openWindowsOrdered.length > 0
          ? ([
              { kind: 'divider' },
              ...openWindowsOrdered.map(
                (win): MenuActionItem => ({
                  kind: 'action',
                  label: win.isMinimized
                    ? `${win.shortTitle} (minimized)`
                    : win.shortTitle,
                  checked: focusedWindowId === win.id && !win.isMinimized,
                  onSelect: () => openWindow(win.id),
                }),
              ),
            ] as MenuEntry[])
          : []),
      ],
    },
    {
      key: 'special',
      label: 'Special',
      items: [
        {
          kind: 'action',
          label: 'Desktop: Neutral Grey (#BFBFBF)',
          checked: desktopTexture === 'solid',
          onSelect: () => setDesktopTexture('solid'),
        },
        {
          kind: 'action',
          label: 'Desktop: Classic Halftone',
          checked: desktopTexture === 'halftone',
          onSelect: () => setDesktopTexture('halftone'),
        },
        { kind: 'divider' },
        {
          kind: 'action',
          label: 'Reset Desktop Layout',
          onSelect: () => resetDesktop(),
        },
      ],
    },
  ]

  return (
    <header ref={barRef} className="menubar" role="menubar" aria-label="Workstation menu bar">
      <div className="menubar__left">
        {menus.map((menu) => {
          const isActive = openMenu === menu.key
          return (
            <div key={menu.key} className="menubar__item-wrap">
              <button
                type="button"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={isActive}
                aria-label={menu.isMark ? 'Workstation system menu' : menu.label}
                className={`menubar__trigger ${menu.isMark ? 'menubar__trigger--mark' : ''} ${
                  isActive ? 'menubar__trigger--active' : ''
                }`}
                onClick={() => setOpenMenu((curr) => (curr === menu.key ? null : menu.key))}
                onPointerEnter={() => {
                  if (openMenu !== null && openMenu !== menu.key) {
                    setOpenMenu(menu.key)
                  }
                }}
              >
                {menu.isMark ? <WorkstationMarkIcon size={17} /> : menu.label}
              </button>

              {isActive && (
                <div className="menubar__dropdown" role="menu" aria-label={menu.label}>
                  {menu.items.map((entry, idx) => {
                    if (entry.kind === 'divider') {
                      return <div key={`div-${idx}`} className="menubar__divider" role="separator" />
                    }
                    return (
                      <button
                        key={entry.label}
                        type="button"
                        role="menuitem"
                        disabled={entry.disabled}
                        className="menubar__option"
                        onClick={() => runMenuAction(entry.onSelect)}
                      >
                        <span className="menubar__option-left">
                          <span className="menubar__check" aria-hidden="true">
                            {entry.checked ? '✓' : ''}
                          </span>
                          <span>{entry.label}</span>
                        </span>
                        {entry.shortcut && (
                          <span className="menubar__shortcut">{entry.shortcut}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="menubar__right">
        {toastMessage && (
          <span className="menubar__toast" role="status" aria-live="polite">
            {toastMessage}
          </span>
        )}
        <button
          type="button"
          className="menubar__clock-btn"
          title="Toggle System Information panel"
          onClick={() => setShowSystemInfo(!showSystemInfo)}
        >
          <span className="menubar__status-dot" aria-hidden="true" />
          <span>{clockLabel}</span>
        </button>
      </div>
    </header>
  )
}
