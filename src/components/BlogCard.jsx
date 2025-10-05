import { Link } from 'react-router-dom'
import FontAwesomeIcon from './FontAwesomeIcon'

const BlogCard = ({ post, featured = false }) => {
  const cardStyle = {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '1rem',
    padding: featured ? '2rem' : '1.5rem',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    overflow: 'hidden'
  }

  const hoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    borderColor: 'var(--accent)'
  }

  return (
    <Link
      to={`/blog/${post.slug}`}
      style={cardStyle}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyle)
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      {featured && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: 'var(--accent)',
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: '1rem',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          Featured
        </div>
      )}
      
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          display: 'inline-block',
          backgroundColor: 'var(--accent)',
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: '1rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          marginBottom: '1rem'
        }}>
          {post.category}
        </div>
        
        <h3 style={{
          fontSize: featured ? '1.5rem' : '1.25rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '0.75rem',
          lineHeight: '1.3'
        }}>
          {post.title}
        </h3>
        
        <p style={{
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          fontSize: featured ? '1rem' : '0.9rem',
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: featured ? 4 : 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {post.excerpt}
        </p>
      </div>
      
      <div style={{
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FontAwesomeIcon icon="fas fa-user" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }} />
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {post.author}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <FontAwesomeIcon icon="fas fa-calendar" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }} />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {new Date(post.publishDate).toLocaleDateString()}
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <FontAwesomeIcon icon="fas fa-clock" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }} />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {post.readTime}
            </span>
          </div>
        </div>
      </div>
      
      {post.tags && post.tags.length > 0 && (
        <div style={{
          marginTop: '1rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}

export default BlogCard
