import { Link } from 'react-router-dom'
import { getBlogPostsByAuthor } from '../data/blogPosts'
import FontAwesomeIcon from './FontAwesomeIcon'

const SameAuthorArticles = ({ authorName, currentPostId, limit = 3 }) => {
  const sameAuthorPosts = getBlogPostsByAuthor(authorName, currentPostId, limit)

  if (sameAuthorPosts.length === 0) {
    return null
  }

  return (
    <section style={{ marginTop: '4rem' }}>
      <h2 style={{ 
        fontSize: '1.75rem', 
        fontWeight: '600', 
        color: 'var(--text-primary)', 
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <FontAwesomeIcon icon="fas fa-user-edit" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
        More Articles by {authorName}
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem' 
      }}>
        {sameAuthorPosts.map(post => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '1rem',
              padding: '1.5rem',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'
              e.currentTarget.style.borderColor = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'
              e.currentTarget.style.borderColor = 'var(--border)'
            }}
          >
            <div style={{ marginBottom: '1rem' }}>
              <span style={{
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
              </span>
              
              <h3 style={{
                fontSize: '1.25rem',
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
                fontSize: '0.9rem',
                marginBottom: '1rem',
                display: '-webkit-box',
                WebkitLineClamp: 3,
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
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <FontAwesomeIcon icon="fas fa-clock" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {post.readTime}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SameAuthorArticles
