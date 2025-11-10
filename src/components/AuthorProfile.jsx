import { Link } from 'react-router-dom'
import FontAwesomeIcon from './FontAwesomeIcon'

const AuthorProfile = ({ authorName, authorProfile }) => {
  if (!authorProfile) return null

  return (
    <div style={{ 
      backgroundColor: 'var(--bg-card)', 
      border: '1px solid var(--border)', 
      borderRadius: '1rem', 
      padding: '2rem',
      marginTop: '3rem',
      marginBottom: '3rem'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        gap: '1.5rem',
        flexWrap: 'wrap'
      }}>
        {/* Author Avatar */}
        <div style={{ flexShrink: 0 }}>
          <img
            src={authorProfile.avatar}
            alt={authorProfile.name}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid var(--accent)'
            }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            }}
          />
        </div>

        {/* Author Info */}
        <div style={{ flex: 1, minWidth: '250px' }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            color: 'var(--text-primary)', 
            marginBottom: '0.5rem' 
          }}>
            About {authorProfile.name}
          </h3>
          
          <p style={{ 
            color: 'var(--text-secondary)', 
            lineHeight: '1.6', 
            marginBottom: '1rem',
            fontSize: '1rem'
          }}>
            {authorProfile.bio}
          </p>

          {/* Social Links */}
          {authorProfile.social && Object.keys(authorProfile.social).length > 0 && (
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              {authorProfile.social.twitter && (
                <a
                  href={authorProfile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    border: '1px solid var(--border)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent)'
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.borderColor = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  <FontAwesomeIcon icon="fab fa-twitter" />
                  Twitter
                </a>
              )}
              
              {authorProfile.social.linkedin && (
                <a
                  href={authorProfile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    border: '1px solid var(--border)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent)'
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.borderColor = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  <FontAwesomeIcon icon="fab fa-linkedin" />
                  LinkedIn
                </a>
              )}
            </div>
          )}

          {/* View All Articles Link */}
          <Link 
            to={`/blog?author=${encodeURIComponent(authorName)}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--accent)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
          >
            <FontAwesomeIcon icon="fas fa-user" />
            View All Articles by {authorProfile.name}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthorProfile
