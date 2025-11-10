import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const NotFound = () => {
  return (
    <>
      <SEO 
        title="Page Not Found | TrimToolsHub"
        description="The page you're looking for doesn't exist on TrimToolsHub."
        canonical="/404"
      />
      
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--accent)' }}>
          404
        </h1>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Page Not Found
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.125rem' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            to="/"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--accent)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontWeight: '500'
            }}
          >
            Go Home
          </Link>
          <Link 
            to="/tools"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              color: 'var(--accent)',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              border: '1px solid var(--accent)',
              fontWeight: '500'
            }}
          >
            Browse Tools
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound
