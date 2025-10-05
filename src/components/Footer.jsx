import FontAwesomeIcon from './FontAwesomeIcon'
import AdSlot from './AdSlot'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <>
      {/* Footer Banner Ad */}
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        borderTop: '1px solid var(--border)',
        padding: '0.75rem 0',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <AdSlot 
          slotId="footer-banner" 
          size="banner" 
          style={{ margin: '0 auto' }}
        />
      </div>
      
      <footer className="footer">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <FontAwesomeIcon icon="fas fa-tools" style={{ fontSize: '1.2rem', color: 'var(--accent)' }} />
            <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>TrimToolsHub</span>
          </div>
          <p>&copy; {currentYear} TrimToolsHub. All rights reserved.</p>
          <p>
            <a href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Privacy Policy
            </a>
            {' | '}
            <a href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Terms of Service
            </a>
            {' | '}
            <a href="mailto:contact@trimkore.com" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Contact
            </a>
          </p>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
            Made with <FontAwesomeIcon icon="fas fa-heart" style={{ color: '#ef4444', fontSize: '0.8rem' }} /> by{' '}
            <a 
              href="https://trimkore.com" 
              style={{ 
                color: 'var(--accent)', 
                textDecoration: 'none',
                fontWeight: '500'
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              TrimKore Digital
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
