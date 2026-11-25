import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type {
  DesktopTexture,
  ProjectsViewMode,
  WindowId,
  WindowInstance,
  WindowPosition,
} from '../types/workstation'
import { WorkstationContext } from './workstationContextObject'
import type { OpenWindowOptions } from './workstationContextObject'

function createInitialWindows(): Record<WindowId, WindowInstance> {
  return {
    welcome: {
      id: 'welcome',
      title: 'Welcome — Engineering Workstation',
      shortTitle: 'Welcome',
      isOpen: true,
      isMinimized: false,
      isZoomed: false,
      zIndex: 10,
      position: { x: 56, y: 42 },
      defaultPosition: { x: 56, y: 42 },
      size: { width: 540, height: 390 },
    },
    projects: {
      id: 'projects',
      title: 'Projects — Project Archive',
      shortTitle: 'Projects',
      isOpen: false,
      isMinimized: false,
      isZoomed: false,
      zIndex: 1,
      position: { x: 88, y: 28 },
      defaultPosition: { x: 88, y: 28 },
      size: { width: 780, height: 530 },
    },
    notes: {
      id: 'notes',
      title: 'Field Notes — Technical Journal',
      shortTitle: 'Field Notes',
      isOpen: false,
      isMinimized: false,
      isZoomed: false,
      zIndex: 2,
      position: { x: 118, y: 38 },
      defaultPosition: { x: 118, y: 38 },
      size: { width: 740, height: 540 },
    },
    laboratory: {
      id: 'laboratory',
      title: 'Laboratory — Experiments & Prototypes',
      shortTitle: 'Laboratory',
      isOpen: false,
      isMinimized: false,
      isZoomed: false,
      zIndex: 3,
      position: { x: 104, y: 34 },
      defaultPosition: { x: 104, y: 34 },
      size: { width: 760, height: 530 },
    },
    systems: {
      id: 'systems',
      title: 'Systems — Technical Interests & Architecture',
      shortTitle: 'Systems',
      isOpen: false,
      isMinimized: false,
      isZoomed: false,
      zIndex: 4,
      position: { x: 96, y: 30 },
      defaultPosition: { x: 96, y: 30 },
      size: { width: 820, height: 545 },
    },
    about: {
      id: 'about',
      title: 'About Me — Operator Profile',
      shortTitle: 'About Me',
      isOpen: false,
      isMinimized: false,
      isZoomed: false,
      zIndex: 5,
      position: { x: 136, y: 36 },
      defaultPosition: { x: 136, y: 36 },
      size: { width: 690, height: 535 },
    },
    contact: {
      id: 'contact',
      title: 'Contact — Establish Connection',
      shortTitle: 'Contact',
      isOpen: false,
      isMinimized: false,
      isZoomed: false,
      zIndex: 6,
      position: { x: 180, y: 64 },
      defaultPosition: { x: 180, y: 64 },
      size: { width: 560, height: 460 },
    },
  }
}

const VALID_HASH_IDS: WindowId[] = [
  'welcome',
  'projects',
  'notes',
  'laboratory',
  'systems',
  'about',
  'contact',
]

function parseWindowFromHash(): WindowId | null {
  if (typeof window === 'undefined') return null
  const raw = window.location.hash.replace(/^#/, '').trim().toLowerCase()
  return VALID_HASH_IDS.includes(raw as WindowId) ? (raw as WindowId) : null
}

export function WorkstationProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<Record<WindowId, WindowInstance>>(() => {
    const base = createInitialWindows()
    const hashTarget = parseWindowFromHash()
    if (hashTarget && hashTarget !== 'welcome') {
      base[hashTarget] = {
        ...base[hashTarget],
        isOpen: true,
        isMinimized: false,
        zIndex: 12,
      }
    }
    return base
  })

  const topZRef = useRef<number>(15)
  const toastTimerRef = useRef<number | null>(null)

  const [mobileActiveWindow, setMobileActiveWindow] = useState<
    Exclude<WindowId, 'welcome'> | null
  >(() => {
    const hashTarget = parseWindowFromHash()
    return hashTarget && hashTarget !== 'welcome' ? hashTarget : null
  })

  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState<WindowId | null>(null)
  const [projectsViewMode, setProjectsViewMode] = useState<ProjectsViewMode>('list')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [showSystemInfo, setShowSystemInfo] = useState<boolean>(true)
  const [aboutWorkstationOpen, setAboutWorkstationOpen] = useState<boolean>(false)
  const [desktopTexture, setDesktopTexture] = useState<DesktopTexture>('solid')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const notify = useCallback((message: string) => {
    setToastMessage(message)
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current)
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null)
      toastTimerRef.current = null
    }, 2400)
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current)
      }
    }
  }, [])

  const openWindowsOrdered = useMemo(() => {
    return Object.values(windows)
      .filter((w) => w.isOpen)
      .sort((a, b) => a.zIndex - b.zIndex)
  }, [windows])

  const focusedWindowId = useMemo<WindowId | null>(() => {
    const visible = openWindowsOrdered.filter((w) => !w.isMinimized)
    if (visible.length === 0) return null
    return visible[visible.length - 1].id
  }, [openWindowsOrdered])

  const focusWindow = useCallback((id: WindowId) => {
    topZRef.current += 1
    const nextZ = topZRef.current
    setWindows((prev) => {
      const target = prev[id]
      if (!target.isOpen) return prev
      return {
        ...prev,
        [id]: {
          ...target,
          isMinimized: false,
          zIndex: nextZ,
        },
      }
    })
  }, [])

  const openWindow = useCallback((id: WindowId, options?: OpenWindowOptions) => {
    topZRef.current += 1
    const nextZ = topZRef.current

    if (options?.projectId !== undefined) {
      setSelectedProjectId(options.projectId)
    }
    if (options?.noteId !== undefined) {
      setSelectedNoteId(options.noteId)
    }

    if (id !== 'welcome') {
      setMobileActiveWindow(id)
    } else {
      setMobileActiveWindow(null)
    }

    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      },
    }))

    if (typeof window !== 'undefined') {
      const nextHash = id === 'welcome' ? '' : `#${id}`
      window.history.replaceState(null, '', nextHash || window.location.pathname)
    }
  }, [])

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false,
        isZoomed: false,
      },
    }))
    setMobileActiveWindow((curr) => (curr === id ? null : curr))
  }, [])

  const closeActiveWindow = useCallback(() => {
    if (mobileActiveWindow) {
      setMobileActiveWindow(null)
      return
    }
    if (focusedWindowId) {
      closeWindow(focusedWindowId)
    }
  }, [closeWindow, focusedWindowId, mobileActiveWindow])

  const closeAllWindows = useCallback(() => {
    setWindows((prev) => {
      const updated = { ...prev }
      for (const key of Object.keys(updated) as WindowId[]) {
        updated[key] = {
          ...updated[key],
          isOpen: false,
          isMinimized: false,
          isZoomed: false,
        }
      }
      return updated
    })
    setMobileActiveWindow(null)
  }, [])

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }))
  }, [])

  const toggleZoomWindow = useCallback((id: WindowId) => {
    topZRef.current += 1
    const nextZ = topZRef.current
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: false,
        isZoomed: !prev[id].isZoomed,
        zIndex: nextZ,
      },
    }))
  }, [])

  const moveWindow = useCallback((id: WindowId, position: WindowPosition) => {
    const maxX = typeof window !== 'undefined' ? Math.max(40, window.innerWidth - 140) : 1200
    const maxY = typeof window !== 'undefined' ? Math.max(40, window.innerHeight - 110) : 700
    const clampedX = Math.max(8, Math.min(position.x, maxX))
    const clampedY = Math.max(6, Math.min(position.y, maxY))

    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isZoomed: false,
        position: { x: clampedX, y: clampedY },
      },
    }))
  }, [])

  const cascadeWindows = useCallback(() => {
    setWindows((prev) => {
      const openList = Object.values(prev)
        .filter((w) => w.isOpen)
        .sort((a, b) => a.zIndex - b.zIndex)
      if (openList.length === 0) return prev

      const next = { ...prev }
      openList.forEach((win, idx) => {
        topZRef.current += 1
        next[win.id] = {
          ...win,
          isMinimized: false,
          isZoomed: false,
          zIndex: topZRef.current,
          position: {
            x: 48 + idx * 28,
            y: 22 + idx * 26,
          },
        }
      })
      return next
    })
  }, [])

  const centerActiveWindow = useCallback(() => {
    if (!focusedWindowId || typeof window === 'undefined') return
    setWindows((prev) => {
      const target = prev[focusedWindowId]
      const availWidth = Math.max(360, window.innerWidth - 110)
      const availHeight = Math.max(320, window.innerHeight - 70)
      const centeredX = Math.max(16, Math.round((availWidth - target.size.width) / 2))
      const centeredY = Math.max(12, Math.round((availHeight - target.size.height) / 2))
      return {
        ...prev,
        [focusedWindowId]: {
          ...target,
          isZoomed: false,
          position: { x: centeredX, y: centeredY },
        },
      }
    })
  }, [focusedWindowId])

  const resetDesktop = useCallback(() => {
    topZRef.current = 15
    setWindows(createInitialWindows())
    setSelectedProjectId(null)
    setSelectedNoteId(null)
    setSelectedDesktopIcon(null)
    setMobileActiveWindow(null)
    setShowSystemInfo(true)
    setDesktopTexture('solid')
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname)
    }
    notify('Workstation layout restored')
  }, [notify])

  const value = useMemo(
    () => ({
      windows,
      openWindowsOrdered,
      focusedWindowId,
      mobileActiveWindow,
      setMobileActiveWindow,
      selectedDesktopIcon,
      setSelectedDesktopIcon,
      projectsViewMode,
      setProjectsViewMode,
      selectedProjectId,
      setSelectedProjectId,
      selectedNoteId,
      setSelectedNoteId,
      showSystemInfo,
      setShowSystemInfo,
      aboutWorkstationOpen,
      setAboutWorkstationOpen,
      desktopTexture,
      setDesktopTexture,
      toastMessage,
      notify,
      openWindow,
      closeWindow,
      closeActiveWindow,
      closeAllWindows,
      minimizeWindow,
      toggleZoomWindow,
      focusWindow,
      moveWindow,
      cascadeWindows,
      centerActiveWindow,
      resetDesktop,
    }),
    [
      windows,
      openWindowsOrdered,
      focusedWindowId,
      mobileActiveWindow,
      selectedDesktopIcon,
      projectsViewMode,
      selectedProjectId,
      selectedNoteId,
      showSystemInfo,
      aboutWorkstationOpen,
      desktopTexture,
      toastMessage,
      notify,
      openWindow,
      closeWindow,
      closeActiveWindow,
      closeAllWindows,
      minimizeWindow,
      toggleZoomWindow,
      focusWindow,
      moveWindow,
      cascadeWindows,
      centerActiveWindow,
      resetDesktop,
    ],
  )

  return <WorkstationContext.Provider value={value}>{children}</WorkstationContext.Provider>
}
