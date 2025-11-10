import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Search from './Search'
import ThemeToggle from './ThemeToggle'
import FontAwesomeIcon from './FontAwesomeIcon'
import AdSlot from './AdSlot'

const Header = () => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // '/' focuses search
      if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault()
        const searchInput = document.querySelector('.search-input')
        if (searchInput) {
          searchInput.focus()
        }
      }
      
      // 'g h' goes to Home
      if (e.key === 'h' && e.metaKey) {
        e.preventDefault()
        window.location.href = '/'
      }
      
      // 'g t' goes to All Tools
      if (e.key === 't' && e.metaKey) {
        e.preventDefault()
        window.location.href = '/tools'
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FontAwesomeIcon icon="fas fa-tools" style={{ fontSize: '1.5rem', color: 'var(--accent)' }} />
              TrimToolsHub
            </Link>
            <Search />
            <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link 
                to="/tools" 
                style={{ 
                  color: 'var(--text-secondary)', 
                  textDecoration: 'none',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  transition: 'color 0.2s ease',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                <FontAwesomeIcon icon="fas fa-tools" style={{ fontSize: '0.9rem' }} />
                Tools
              </Link>
              <Link 
                to="/blog" 
                style={{ 
                  color: 'var(--text-secondary)', 
                  textDecoration: 'none',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  transition: 'color 0.2s ease',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                <FontAwesomeIcon icon="fas fa-blog" style={{ fontSize: '0.9rem' }} />
                Blog
              </Link>
              <Link 
                to="/terms" 
                style={{ 
                  color: 'var(--text-secondary)', 
                  textDecoration: 'none',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  transition: 'color 0.2s ease',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                <FontAwesomeIcon icon="fas fa-file-contract" style={{ fontSize: '0.9rem' }} />
                Terms
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>
      
      {/* Header Banner Ad */}
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        borderBottom: '1px solid var(--border)',
        padding: '0.75rem 0',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <AdSlot 
          slotId="header-banner" 
          size="banner" 
          style={{ margin: '0 auto' }}
        />
      </div>
    </>
  )
}

export default Header
