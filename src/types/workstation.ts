export type WindowId =
  | 'welcome'
  | 'projects'
  | 'notes'
  | 'laboratory'
  | 'systems'
  | 'about'
  | 'contact'

export type ViewportMode = 'desktop' | 'tablet' | 'mobile'

export type ProjectsViewMode = 'list' | 'icons'

export type DesktopTexture = 'solid' | 'halftone'

export interface WindowPosition {
  x: number
  y: number
}

export interface WindowSize {
  width: number
  height: number
}

export interface WindowInstance {
  id: WindowId
  title: string
  shortTitle: string
  isOpen: boolean
  isMinimized: boolean
  isZoomed: boolean
  zIndex: number
  position: WindowPosition
  defaultPosition: WindowPosition
  size: WindowSize
}

export type ProjectCategory =
  | 'Backend Systems'
  | 'ERP Architecture'
  | 'Inventory & Hardware'
  | 'Developer Tooling'
  | 'Programming Languages'

export interface ProjectItem {
  id: string
  filename: string
  name: string
  category: ProjectCategory
  technologies: string[]
  status: 'Maintained' | 'Completed' | 'Active Exploration' | 'Prototype'
  year: string
  summary: string
  problem: string
  approach: string
  architecture: string[]
  tradeoffs: string[]
  lessons: string[]
  repositoryLabel?: string
}

export type NoteCategory =
  | 'Architecture'
  | 'Backend'
  | 'Databases'
  | 'Languages'
  | 'Systems'

export interface NoteSection {
  heading?: string
  paragraphs: string[]
  code?: {
    caption: string
    snippet: string
  }
}

export interface FieldNote {
  id: string
  filename: string
  title: string
  publishedAt: string
  category: NoteCategory
  readingTime: string
  excerpt: string
  sections: NoteSection[]
}

export type ExperimentStatus =
  | 'EXPLORING'
  | 'IN PROGRESS'
  | 'COMPLETED'
  | 'ON HOLD'

export interface LabExperiment {
  id: string
  code: string
  title: string
  domain: string
  status: ExperimentStatus
  updatedAt: string
  technologies: string[]
  summary: string
  hypothesis: string
  observations: string[]
  nextSteps: string
}

export type DiagramId =
  | 'storage-page'
  | 'outbox-relay'
  | 'bytecode-vm'
  | 'edge-rfid'

export interface SystemTopic {
  id: string
  code: string
  title: string
  subtitle: string
  diagramId: DiagramId
  diagramCaption: string
  overview: string
  coreQuestions: string[]
  architecturalNotes: {
    label: string
    detail: string
  }[]
  references: string[]
}

export interface SystemInfoData {
  operator: string
  location: string
  currentFocus: string
  learningInterests: string
  workstationStatus: string
  systemRelease: string
}

export interface ExperienceEntry {
  period: string
  role: string
  context: string
  highlights: string[]
}

export interface EducationEntry {
  period: string
  qualification: string
  institution: string
  notes: string
}

export interface ContactChannel {
  id: string
  label: string
  value: string
  href: string
  protocol: string
  description: string
}

export interface OperatorProfile {
  name: string
  tagline: string
  quote: string
  location: string
  email: string
  introduction: string[]
  engineeringInterests: string[]
  technicalFocus: {
    area: string
    details: string
  }[]
  experience: ExperienceEntry[]
  education: EducationEntry[]
  channels: ContactChannel[]
}
