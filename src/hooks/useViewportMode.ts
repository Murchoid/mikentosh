import { useEffect, useState } from 'react'
import type { ViewportMode } from '../types/workstation'

function computeViewportMode(): ViewportMode {
  if (typeof window === 'undefined') {
    return 'desktop'
  }
  const width = window.innerWidth
  if (width < 768) {
    return 'mobile'
  }
  if (width < 1024) {
    return 'tablet'
  }
  return 'desktop'
}

export function useViewportMode(): ViewportMode {
  const [mode, setMode] = useState<ViewportMode>(computeViewportMode)

  useEffect(() => {
    const handleResize = () => {
      setMode(computeViewportMode())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return mode
}
