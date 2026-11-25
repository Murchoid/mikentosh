import { useState } from 'react'
import { OPERATOR_PROFILE } from '../../data/profile'
import { useWorkstation } from '../../context/useWorkstation'
import { copyTextToClipboard } from '../../utils/actions'

export function ContactContent() {
  const { notify } = useWorkstation()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (id: string, value: string) => {
    const ok = await copyTextToClipboard(value)
    if (ok) {
      setCopiedId(id)
      notify(`Copied ${value}`)
      window.setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 2000)
    }
  }

  return (
    <div className="contact-view">
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--mid-grey)',
          marginBottom: '4px',
        }}
      >
        CHOOSER // EXTERNAL CHANNELS
      </div>
      <h2 className="doc-sheet__title">Establish Connection</h2>
      <p className="doc-sheet__lead">
        Available for conversations around backend engineering, systems architecture,
        operational software projects, or thoughtful technical collaborations. Based in{' '}
        {OPERATOR_PROFILE.location} (EAT / UTC+3).
      </p>

      <div className="channel-list">
        {OPERATOR_PROFILE.channels.map((channel) => {
          const isEmail = channel.id === 'email'
          return (
            <div key={channel.id} className="channel-card">
              <div>
                <div className="channel-card__protocol">{channel.protocol}</div>
                <div className="channel-card__label">{channel.label}</div>
                <div className="channel-card__value">{channel.value}</div>
                <p
                  style={{
                    marginTop: '4px',
                    fontSize: '13px',
                    color: 'var(--deep-grey)',
                  }}
                >
                  {channel.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {isEmail && (
                  <button
                    type="button"
                    className="mac-btn mac-btn--sm"
                    onClick={() => handleCopy(channel.id, OPERATOR_PROFILE.email)}
                  >
                    {copiedId === channel.id ? '✓ Copied' : 'Copy Address'}
                  </button>
                )}
                <a
                  href={channel.href}
                  target={isEmail ? undefined : '_blank'}
                  rel={isEmail ? undefined : 'noopener noreferrer'}
                  className="mac-btn mac-btn--sm"
                >
                  {isEmail ? 'Compose Mail' : 'Open ↗'}
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
