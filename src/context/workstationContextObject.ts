import { createContext } from 'react'
import type {
  DesktopTexture,
  ProjectsViewMode,
  WindowId,
  WindowInstance,
  WindowPosition,
} from '../types/workstation'

export interface DesktopItemMeta {
  id: Exclude<WindowId, 'welcome'>
  label: string
  description: string
  shortcut: string
}

export const DESKTOP_ITEMS: DesktopItemMeta[] = [
  {
    id: 'projects',
    label: 'Projects',
    description: 'Project archive & architecture notes',
    shortcut: '1',
  },
  {
    id: 'notes',
    label: 'Field Notes',
    description: 'Technical writing & observations',
    shortcut: '2',
  },
  {
    id: 'laboratory',
    label: 'Laboratory',
    description: 'Experiments & prototypes',
    shortcut: '3',
  },
  {
    id: 'systems',
    label: 'Systems',
    description: 'Systems engineering explorations',
    shortcut: '4',
  },
  {
    id: 'about',
    label: 'About Me',
    description: 'Operator profile & résumé',
    shortcut: '5',
  },
  {
    id: 'contact',
    label: 'Contact',
    description: 'Establish connection',
    shortcut: '6',
  },
]

export interface OpenWindowOptions {
  projectId?: string | null
  noteId?: string | null
}

export interface WorkstationContextValue {
  windows: Record<WindowId, WindowInstance>
  openWindowsOrdered: WindowInstance[]
  focusedWindowId: WindowId | null
  mobileActiveWindow: Exclude<WindowId, 'welcome'> | null
  setMobileActiveWindow: (id: Exclude<WindowId, 'welcome'> | null) => void
  selectedDesktopIcon: WindowId | null
  setSelectedDesktopIcon: (id: WindowId | null) => void
  projectsViewMode: ProjectsViewMode
  setProjectsViewMode: (mode: ProjectsViewMode) => void
  selectedProjectId: string | null
  setSelectedProjectId: (id: string | null) => void
  selectedNoteId: string | null
  setSelectedNoteId: (id: string | null) => void
  showSystemInfo: boolean
  setShowSystemInfo: (show: boolean) => void
  aboutWorkstationOpen: boolean
  setAboutWorkstationOpen: (open: boolean) => void
  desktopTexture: DesktopTexture
  setDesktopTexture: (texture: DesktopTexture) => void
  toastMessage: string | null
  notify: (message: string) => void
  openWindow: (id: WindowId, options?: OpenWindowOptions) => void
  closeWindow: (id: WindowId) => void
  closeActiveWindow: () => void
  closeAllWindows: () => void
  minimizeWindow: (id: WindowId) => void
  toggleZoomWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  moveWindow: (id: WindowId, position: WindowPosition) => void
  cascadeWindows: () => void
  centerActiveWindow: () => void
  resetDesktop: () => void
}

export const WorkstationContext = createContext<WorkstationContextValue | null>(null)
