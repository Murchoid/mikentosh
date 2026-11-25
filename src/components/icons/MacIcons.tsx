import type { WindowId } from '../../types/workstation'

interface IconProps {
  size?: number
}

export function WorkstationMarkIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="2"
        width="18"
        height="20"
        fill="#FFFFFF"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <rect
        x="5.5"
        y="4.5"
        width="13"
        height="9.5"
        fill="#E5E5E5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M8.5 11.2V7.2L10.8 9.4L13.1 7.2V11.2M15.4 7.2V11.2"
        stroke="#111111"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
      <line
        x1="13"
        y1="17.5"
        x2="18.5"
        y2="17.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect x="6" y="16.8" width="2.4" height="1.6" fill="currentColor" />
    </svg>
  )
}

export function FolderMacIcon({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M4 9H14L16.5 12H32V29H4V9Z"
        fill="#FFFFFF"
        stroke="#111111"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      <rect x="5" y="13" width="26" height="15" fill="#E5E5E5" stroke="#111111" strokeWidth="1" />
      <line x1="7" y1="16" x2="29" y2="16" stroke="#FFFFFF" strokeWidth="1" />
    </svg>
  )
}

export function NotesMacIcon({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M8 4H23L29 10V32H8V4Z"
        fill="#FFFFFF"
        stroke="#111111"
        strokeWidth="1.5"
      />
      <path d="M23 4V10H29" fill="#E5E5E5" stroke="#111111" strokeWidth="1.25" />
      <line x1="12" y1="15" x2="25" y2="15" stroke="#111111" strokeWidth="1.2" />
      <line x1="12" y1="19" x2="25" y2="19" stroke="#111111" strokeWidth="1.2" />
      <line x1="12" y1="23" x2="25" y2="23" stroke="#808080" strokeWidth="1.2" />
      <line x1="12" y1="27" x2="20" y2="27" stroke="#808080" strokeWidth="1.2" />
    </svg>
  )
}

export function LabMacIcon({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="28" height="24" fill="#FFFFFF" stroke="#111111" strokeWidth="1.5" />
      <rect x="7" y="9" width="16" height="13" fill="#E5E5E5" stroke="#111111" strokeWidth="1.2" />
      <path
        d="M8.5 15.5H11L12.8 11.5L15.2 19.5L17.4 13.5L19 15.5H21.5"
        stroke="#111111"
        strokeWidth="1.35"
        strokeLinejoin="miter"
      />
      <circle cx="27.5" cy="12" r="2" fill="#FFFFFF" stroke="#111111" strokeWidth="1.2" />
      <circle cx="27.5" cy="18.5" r="2" fill="#E5E5E5" stroke="#111111" strokeWidth="1.2" />
      <line x1="7" y1="26" x2="29" y2="26" stroke="#111111" strokeWidth="1.2" />
    </svg>
  )
}

export function SystemsMacIcon({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="9" y="9" width="18" height="18" fill="#FFFFFF" stroke="#111111" strokeWidth="1.5" />
      <rect x="13" y="13" width="10" height="10" fill="#E5E5E5" stroke="#111111" strokeWidth="1.2" />
      <line x1="13" y1="4" x2="13" y2="9" stroke="#111111" strokeWidth="1.4" />
      <line x1="18" y1="4" x2="18" y2="9" stroke="#111111" strokeWidth="1.4" />
      <line x1="23" y1="4" x2="23" y2="9" stroke="#111111" strokeWidth="1.4" />
      <line x1="13" y1="27" x2="13" y2="32" stroke="#111111" strokeWidth="1.4" />
      <line x1="18" y1="27" x2="18" y2="32" stroke="#111111" strokeWidth="1.4" />
      <line x1="23" y1="27" x2="23" y2="32" stroke="#111111" strokeWidth="1.4" />
      <line x1="4" y1="13" x2="9" y2="13" stroke="#111111" strokeWidth="1.4" />
      <line x1="4" y1="18" x2="9" y2="18" stroke="#111111" strokeWidth="1.4" />
      <line x1="4" y1="23" x2="9" y2="23" stroke="#111111" strokeWidth="1.4" />
      <line x1="27" y1="13" x2="32" y2="13" stroke="#111111" strokeWidth="1.4" />
      <line x1="27" y1="18" x2="32" y2="18" stroke="#111111" strokeWidth="1.4" />
      <line x1="27" y1="23" x2="32" y2="23" stroke="#111111" strokeWidth="1.4" />
    </svg>
  )
}

export function OperatorMacIcon({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="5" y="6" width="26" height="24" fill="#FFFFFF" stroke="#111111" strokeWidth="1.5" />
      <line x1="5" y1="11" x2="31" y2="11" stroke="#111111" strokeWidth="1.2" />
      <rect x="8" y="14" width="9" height="12" fill="#E5E5E5" stroke="#111111" strokeWidth="1.1" />
      <circle cx="12.5" cy="18" r="2" fill="#111111" />
      <path d="M9.5 24.5C9.5 22.5 11 21.5 12.5 21.5C14 21.5 15.5 22.5 15.5 24.5" stroke="#111111" strokeWidth="1.2" />
      <line x1="20" y1="16" x2="28" y2="16" stroke="#111111" strokeWidth="1.3" />
      <line x1="20" y1="20" x2="28" y2="20" stroke="#808080" strokeWidth="1.2" />
      <line x1="20" y1="24" x2="26" y2="24" stroke="#808080" strokeWidth="1.2" />
    </svg>
  )
}

export function ContactMacIcon({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="28" height="20" fill="#FFFFFF" stroke="#111111" strokeWidth="1.5" />
      <path
        d="M4.5 9L18 19.5L31.5 9"
        fill="#E5E5E5"
        stroke="#111111"
        strokeWidth="1.35"
        strokeLinejoin="miter"
      />
      <line x1="4.5" y1="27.5" x2="13.5" y2="19" stroke="#808080" strokeWidth="1.1" />
      <line x1="31.5" y1="27.5" x2="22.5" y2="19" stroke="#808080" strokeWidth="1.1" />
    </svg>
  )
}

export function DocumentMacIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 2H12.5L16 5.5V18H4V2Z"
        fill="#FFFFFF"
        stroke="#111111"
        strokeWidth="1.3"
      />
      <path d="M12.5 2V5.5H16" fill="#E5E5E5" stroke="#111111" strokeWidth="1.1" />
      <line x1="6.5" y1="9" x2="13.5" y2="9" stroke="#111111" strokeWidth="1.1" />
      <line x1="6.5" y1="12" x2="13.5" y2="12" stroke="#808080" strokeWidth="1.1" />
      <line x1="6.5" y1="15" x2="11" y2="15" stroke="#808080" strokeWidth="1.1" />
    </svg>
  )
}

export function SectionIcon({
  id,
  size = 36,
}: {
  id: Exclude<WindowId, 'welcome'>
  size?: number
}) {
  switch (id) {
    case 'projects':
      return <FolderMacIcon size={size} />
    case 'notes':
      return <NotesMacIcon size={size} />
    case 'laboratory':
      return <LabMacIcon size={size} />
    case 'systems':
      return <SystemsMacIcon size={size} />
    case 'about':
      return <OperatorMacIcon size={size} />
    case 'contact':
      return <ContactMacIcon size={size} />
  }
}
