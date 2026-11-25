import { useEffect } from 'react'
import { DesktopIcon } from '../components/desktop/DesktopIcon'
import { MenuBar } from '../components/desktop/MenuBar'
import { PrintResumeSheet } from '../components/desktop/PrintResumeSheet'
import {
  AboutWorkstationDialog,
  SystemInfoPanel,
} from '../components/desktop/SystemInfoPanel'
import { WindowFrame } from '../components/desktop/WindowFrame'
import { WindowTray } from '../components/desktop/WindowTray'
import { MobileWorkstation } from '../components/mobile/MobileWorkstation'
import { AboutContent } from '../components/windows/AboutContent'
import { ContactContent } from '../components/windows/ContactContent'
import { FieldNotesContent } from '../components/windows/FieldNotesContent'
import { LaboratoryContent } from '../components/windows/LaboratoryContent'
import { ProjectsContent } from '../components/windows/ProjectsContent'
import { SystemsContent } from '../components/windows/SystemsContent'
import { WelcomeContent } from '../components/windows/WelcomeContent'
import { WorkstationProvider } from '../context/WorkstationProvider'
import { useWorkstation } from '../context/useWorkstation'
import { DESKTOP_ITEMS } from '../context/workstationContextObject'
import { FIELD_NOTES } from '../data/fieldNotes'
import { LAB_EXPERIMENTS } from '../data/laboratory'
import { PROJECTS } from '../data/projects'
import { SYSTEM_TOPICS } from '../data/systems'
import { useViewportMode } from '../hooks/useViewportMode'

function WorkstationSurface() {
  const viewportMode = useViewportMode()
  const {
    focusedWindowId,
    selectedProjectId,
    setSelectedProjectId,
    selectedNoteId,
    setSelectedNoteId,
    setSelectedDesktopIcon,
    aboutWorkstationOpen,
    setAboutWorkstationOpen,
    desktopTexture,
    closeActiveWindow,
  } = useWorkstation()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      if (aboutWorkstationOpen) {
        setAboutWorkstationOpen(false)
        return
      }
      if (focusedWindowId === 'projects' && selectedProjectId !== null) {
        setSelectedProjectId(null)
        return
      }
      if (focusedWindowId === 'notes' && selectedNoteId !== null) {
        setSelectedNoteId(null)
        return
      }
      closeActiveWindow()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    aboutWorkstationOpen,
    closeActiveWindow,
    focusedWindowId,
    selectedNoteId,
    selectedProjectId,
    setAboutWorkstationOpen,
    setSelectedNoteId,
    setSelectedProjectId,
  ])

  if (viewportMode === 'mobile') {
    return (
      <>
        <MobileWorkstation />
        <PrintResumeSheet />
      </>
    )
  }

  const isTablet = viewportMode === 'tablet'

  return (
    <>
      <div
        className={`workstation-shell ${
          desktopTexture === 'halftone' ? 'workstation-shell--halftone' : ''
        }`}
        style={
          isTablet
            ? { height: 'auto', minHeight: '100svh', overflowY: 'auto' }
            : undefined
        }
      >
        <MenuBar />

        <main
          className="desktop-stage"
          style={isTablet ? { overflow: 'visible', paddingBottom: '24px' } : undefined}
          onClick={() => setSelectedDesktopIcon(null)}
        >
          <nav
            aria-label="Workstation desktop items"
            className={`desktop-icons ${isTablet ? 'desktop-icons--tablet' : ''}`}
          >
            {DESKTOP_ITEMS.map((item) => (
              <DesktopIcon
                key={item.id}
                id={item.id}
                label={item.label}
                description={item.description}
              />
            ))}
          </nav>

          <WindowFrame id="welcome" viewportMode={viewportMode}>
            <WelcomeContent />
          </WindowFrame>

          <WindowFrame
            id="projects"
            viewportMode={viewportMode}
            leftMeta={`${PROJECTS.length} items in Archive`}
            rightMeta="Volume: /Workstation/Projects"
          >
            <ProjectsContent />
          </WindowFrame>

          <WindowFrame
            id="notes"
            viewportMode={viewportMode}
            leftMeta={`${FIELD_NOTES.length} technical notes`}
            rightMeta="Journal · UTF-8 Monograph"
          >
            <FieldNotesContent />
          </WindowFrame>

          <WindowFrame
            id="laboratory"
            viewportMode={viewportMode}
            leftMeta={`${LAB_EXPERIMENTS.length} active & archived benches`}
            rightMeta="Volume: /Workstation/Lab"
          >
            <LaboratoryContent />
          </WindowFrame>

          <WindowFrame
            id="systems"
            viewportMode={viewportMode}
            leftMeta={`${SYSTEM_TOPICS.length} architectural subjects`}
            rightMeta="Schematics & Study Notes"
          >
            <SystemsContent />
          </WindowFrame>

          <WindowFrame
            id="about"
            viewportMode={viewportMode}
            leftMeta="Operator Record"
            rightMeta="Nairobi, Kenya"
          >
            <AboutContent />
          </WindowFrame>

          <WindowFrame
            id="contact"
            viewportMode={viewportMode}
            leftMeta="External Interfaces"
            rightMeta="Status: Accepting Messages"
          >
            <ContactContent />
          </WindowFrame>

          {!isTablet && <SystemInfoPanel />}
        </main>

        <WindowTray />
        <AboutWorkstationDialog />
      </div>

      <PrintResumeSheet />
    </>
  )
}

export function Home() {
  return (
    <WorkstationProvider>
      <WorkstationSurface />
    </WorkstationProvider>
  )
}
