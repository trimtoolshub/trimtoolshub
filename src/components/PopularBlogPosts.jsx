import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import FontAwesomeIcon from './FontAwesomeIcon'

const PopularBlogPosts = ({ limit = 5 }) => {
  // Get popular posts (featured first, then by date)
  const popularPosts = blogPosts
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.publishDate) - new Date(a.publishDate)
    })
    .slice(0, limit)

  return (
    <div style={{ 
      backgroundColor: 'var(--bg-card)', 
      border: '1px solid var(--border)', 
      borderRadius: '1rem', 
      padding: '1.5rem',
      marginBottom: '1.5rem'
    }}>
      <h3 style={{ 
        color: 'var(--text-primary)', 
        marginBottom: '1rem',
        fontSize: '1.1rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <FontAwesomeIcon icon="fas fa-fire" style={{ color: 'var(--accent)' }} />
        Popular Articles
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {popularPosts.map((post, index) => (
          <Link 
            key={post.id} 
            to={`/blog/${post.slug}`}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease',
              border: '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
              e.currentTarget.style.borderColor = 'var(--border-hover)'
              e.currentTarget.style.transform = 'translateX(4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
              e.currentTarget.style.borderColor = 'transparent'
              e.currentTarget.style.transform = 'translateX(0)'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'var(--accent)',
              borderRadius: '0.375rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '600',
              flexShrink: 0
            }}>
              {index + 1}
            </div>
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: 'var(--text-primary)',
                marginBottom: '0.25rem',
                lineHeight: '1.3',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {post.title}
              </div>
              
              <div style={{ 
                fontSize: '0.75rem', 
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)',
                  padding: '0.125rem 0.375rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.7rem',
                  fontWeight: '500'
                }}>
                  {post.category}
                </span>
                <FontAwesomeIcon icon="fas fa-clock" style={{ fontSize: '0.7rem' }} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Link 
          to="/blog"
          style={{
            fontSize: '0.875rem',
            color: 'var(--accent)',
            textDecoration: 'none',
            fontWeight: '500',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          View All Articles
          <FontAwesomeIcon icon="fas fa-arrow-right" style={{ fontSize: '0.75rem' }} />
        </Link>
      </div>
    </div>
  )
}

export default PopularBlogPosts
