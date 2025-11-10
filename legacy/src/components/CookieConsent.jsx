import { useState, useEffect } from 'react'

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner */}
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        padding: '1.5rem',
        zIndex: 1000,
        boxShadow: '0 -4px 12px var(--shadow)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <p style={{ 
                color: 'var(--text-primary)', 
                margin: 0, 
                fontSize: '0.95rem',
                lineHeight: '1.5'
              }}>
                🍪 This site uses cookies and may show ads to support free tools. By continuing, you accept our use of cookies.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowDetails(true)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--bg-tertiary)'
                  e.target.style.color = 'var(--text-primary)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = 'var(--text-secondary)'
                }}
              >
                Learn More
              </button>
              
              <button
                onClick={handleAccept}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--accent-hover)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--accent)'
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Details Modal */}
      {showDetails && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 20px 40px var(--shadow-hover)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Cookie Policy</h2>
              <button
                onClick={() => setShowDetails(false)}
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  lineHeight: 1
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>What are cookies?</h3>
              <p style={{ marginBottom: '1rem' }}>
                Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience and support our free tools.
              </p>
              
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>How we use cookies:</h3>
              <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Essential cookies:</strong> Required for the website to function properly
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Analytics cookies:</strong> Help us understand how visitors use our tools
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Advertising cookies:</strong> Enable us to show relevant ads to support free tools
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Preference cookies:</strong> Remember your theme and settings choices
                </li>
              </ul>
              
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Your choices:</h3>
              <p style={{ marginBottom: '1rem' }}>
                You can accept all cookies or decline non-essential ones. Note that declining cookies may affect some functionality and we may show fewer ads.
              </p>
              
              <p style={{ fontSize: '0.875rem', fontStyle: 'italic' }}>
                By using TrimToolsHub, you agree to our use of cookies as described above. 
                We never sell your personal data and are committed to protecting your privacy.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={handleDecline}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--bg-tertiary)'
                  e.target.style.color = 'var(--text-primary)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = 'var(--text-secondary)'
                }}
              >
                Decline Non-Essential
              </button>
              
              <button
                onClick={handleAccept}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--accent-hover)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--accent)'
                }}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CookieConsent
