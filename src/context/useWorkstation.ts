import { useContext } from 'react'
import { WorkstationContext } from './workstationContextObject'
import type { WorkstationContextValue } from './workstationContextObject'

export function useWorkstation(): WorkstationContextValue {
  const ctx = useContext(WorkstationContext)
  if (!ctx) {
    throw new Error('useWorkstation must be used inside WorkstationProvider')
  }
  return ctx
}
