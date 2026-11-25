import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import type { ViewportMode, WindowId } from '../../types/workstation'
import { useWorkstation } from '../../context/useWorkstation'

interface WindowFrameProps {
  id: WindowId
  viewportMode: ViewportMode
  leftMeta?: string
  rightMeta?: string
  children: ReactNode
}

export function WindowFrame({
  id,
  viewportMode,
  leftMeta,
  rightMeta,
  children,
}: WindowFrameProps) {
  const {
    windows,
    focusedWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleZoomWindow,
    moveWindow,
  } = useWorkstation()

  const win = windows[id]
  const dragStateRef = useRef<{
    pointerId: number
    startClientX: number
    startClientY: number
    originX: number
    originY: number
  } | null>(null)

  if (!win.isOpen || win.isMinimized) {
    return null
  }

  const isFocused = focusedWindowId === id
  const isTablet = viewportMode === 'tablet'
  const canDrag = viewportMode === 'desktop'

  const handleTitlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canDrag || event.button !== 0) return
    const target = event.target as HTMLElement
    if (target.closest('button')) return

    focusWindow(id)
    event.currentTarget.setPointerCapture(event.pointerId)
    dragStateRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      originX: win.position.x,
      originY: win.position.y,
    }
  }

  const handleTitlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    const dx = event.clientX - drag.startClientX
    const dy = event.clientY - drag.startClientY
    moveWindow(id, {
      x: drag.originX + dx,
      y: drag.originY + dy,
    })
  }

  const handleTitlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    dragStateRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <section
      role="dialog"
      aria-label={win.title}
      aria-modal="false"
      className={`mac-window ${isFocused ? 'mac-window--focused' : ''} ${
        win.isZoomed && !isTablet ? 'mac-window--zoomed' : ''
      } ${isTablet ? 'mac-window--tablet' : ''}`}
      style={{
        left: `${win.position.x}px`,
        top: `${win.position.y}px`,
        width: `${win.size.width}px`,
        height: id === 'welcome' ? 'auto' : `${win.size.height}px`,
        zIndex: win.zIndex,
      }}
      onPointerDownCapture={() => {
        if (!isFocused) {
          focusWindow(id)
        }
      }}
    >
      <div
        className="mac-window__titlebar"
        onPointerDown={handleTitlePointerDown}
        onPointerMove={handleTitlePointerMove}
        onPointerUp={handleTitlePointerUp}
        onPointerCancel={handleTitlePointerUp}
        onDoubleClick={() => {
          if (canDrag && id !== 'welcome') {
            toggleZoomWindow(id)
          }
        }}
      >
        <div className="mac-window__controls">
          <button
            type="button"
            className="mac-window__ctrl-btn"
            aria-label={`Close ${win.shortTitle}`}
            title="Close window"
            onClick={(e) => {
              e.stopPropagation()
              closeWindow(id)
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
              <path
                d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </button>
        </div>

        <span className="mac-window__title-pill">{win.title}</span>

        <div className="mac-window__controls">
          <button
            type="button"
            className="mac-window__ctrl-btn"
            aria-label={`Minimize ${win.shortTitle}`}
            title="Minimize window"
            onClick={(e) => {
              e.stopPropagation()
              minimizeWindow(id)
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
              <line x1="1" y1="5.5" x2="7" y2="5.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
          {!isTablet && id !== 'welcome' && (
            <button
              type="button"
              className="mac-window__ctrl-btn"
              aria-label={win.isZoomed ? `Restore ${win.shortTitle} size` : `Expand ${win.shortTitle}`}
              title={win.isZoomed ? 'Restore default size' : 'Expand window'}
              onClick={(e) => {
                e.stopPropagation()
                toggleZoomWindow(id)
              }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
                <rect
                  x="1"
                  y="1"
                  width="6"
                  height="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
                {!win.isZoomed && (
                  <rect
                    x="1"
                    y="1"
                    width="3.6"
                    height="3.6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {(leftMeta || rightMeta) && (
        <div className="mac-window__subheader">
          <span>{leftMeta}</span>
          <span>{rightMeta}</span>
        </div>
      )}

      <div className="mac-window__content">{children}</div>
    </section>
  )
}
