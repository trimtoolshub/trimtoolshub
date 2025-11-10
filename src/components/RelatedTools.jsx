import { Link } from 'react-router-dom'
import { getToolsByCategory } from '../tools/registryData.js'
import { getCategoryById } from '../tools/registryData.js'
import FontAwesomeIcon from './FontAwesomeIcon'

const RelatedTools = ({ currentToolId, currentCategory }) => {
  const relatedTools = getToolsByCategory(currentCategory)
    .filter(tool => tool.id !== currentToolId)
    .slice(0, 6)

  if (relatedTools.length === 0) return null

  const category = getCategoryById(currentCategory)

  return (
    <div style={{ 
      backgroundColor: 'var(--bg-card)', 
      border: '1px solid var(--border)', 
      borderRadius: '1rem', 
      padding: '2rem',
      marginTop: '2rem'
    }}>
      <h3 style={{ 
        marginBottom: '1.5rem', 
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <FontAwesomeIcon icon={category?.icon || 'fas fa-tools'} style={{ color: category?.color || 'var(--accent)' }} />
        Related {category?.name || 'Tools'}
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem' 
      }}>
        {relatedTools.map((tool) => (
          <Link
            key={tool.id}
            to={`/tools/${tool.slug}`}
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--bg-secondary)'
              e.target.style.borderColor = category?.color || 'var(--accent)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--bg-tertiary)'
              e.target.style.borderColor = 'var(--border)'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            <div style={{ 
              fontSize: '1.5rem', 
              marginBottom: '0.75rem',
              color: category?.color || 'var(--accent)'
            }}>
              <FontAwesomeIcon icon={category?.icon || 'fas fa-tools'} />
            </div>
            <h4 style={{ 
              marginBottom: '0.5rem', 
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontWeight: '500'
            }}>
              {tool.name}
            </h4>
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '0.875rem',
              lineHeight: '1.4'
            }}>
              {tool.shortDescription}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedTools
