import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { blogPosts, blogCategories, getBlogPostsByCategory } from '../data/blogPosts'
import BlogCard from '../components/BlogCard'
import SEO from '../components/SEO'
import FontAwesomeIcon from '../components/FontAwesomeIcon'

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParams] = useSearchParams()
  const authorFilter = searchParams.get('author')

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesAuthor = !authorFilter || post.author === authorFilter
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesAuthor && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "TrimToolsHub Blog",
    "description": "Expert insights, tutorials, and guides about online tools, productivity, and web development",
    "url": "https://www.trimtoolshub.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "TrimToolsHub",
      "url": "https://www.trimtoolshub.com"
    },
    "blogPost": blogPosts.slice(0, 5).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://www.trimtoolshub.com/blog/${post.slug}`,
      "datePublished": post.publishDate,
      "author": {
        "@type": "Person",
        "name": post.author
      }
    }))
  }

  return (
    <>
      <SEO 
        title="Blog - Expert Insights & Tutorials | TrimToolsHub"
        description="Discover expert insights, tutorials, and guides about online tools, productivity, web development, and digital marketing."
        canonical="/blog"
        structuredData={structuredData}
      />
      
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: 'var(--text-primary)', 
            marginBottom: '1rem' 
          }}>
            <FontAwesomeIcon icon="fas fa-blog" style={{ marginRight: '0.75rem', color: 'var(--accent)' }} />
            {authorFilter ? `Articles by ${authorFilter}` : 'TrimToolsHub Blog'}
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {authorFilter 
              ? `Discover all articles written by ${authorFilter}`
              : 'Expert insights, tutorials, and guides about online tools, productivity, and web development'
            }
          </p>
          {authorFilter && (
            <div style={{ marginTop: '1rem' }}>
              <Link 
                to="/blog"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  border: '1px solid var(--border)'
                }}
              >
                <FontAwesomeIcon icon="fas fa-arrow-left" />
                Back to All Articles
              </Link>
            </div>
          )}
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '600', 
              color: 'var(--text-primary)', 
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Featured Articles
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '2rem' 
            }}>
              {featuredPosts.map(post => (
                <BlogCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem', 
          marginBottom: '3rem',
          alignItems: 'center'
        }}>
          {/* Search */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                border: '1px solid var(--border)',
                borderRadius: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            />
            <FontAwesomeIcon 
              icon="fas fa-search" 
              style={{ 
                position: 'absolute', 
                left: '0.75rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'var(--text-secondary)'
              }} 
            />
          </div>

          {/* Category Filter */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.75rem', 
            justifyContent: 'center' 
          }}>
            {blogCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: selectedCategory === category.id ? 'var(--accent)' : 'var(--bg-card)',
                  color: selectedCategory === category.id ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '1rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {category.name}
                <span style={{
                  backgroundColor: selectedCategory === category.id ? 'rgba(255,255,255,0.2)' : 'var(--bg-secondary)',
                  color: selectedCategory === category.id ? 'white' : 'var(--text-secondary)',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.75rem'
                }}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div style={{ 
          marginBottom: '2rem', 
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
          {selectedCategory !== 'all' && ` in ${blogCategories.find(c => c.id === selectedCategory)?.name}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            {filteredPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 0',
            color: 'var(--text-secondary)'
          }}>
            <FontAwesomeIcon icon="fas fa-search" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              No articles found
            </h3>
            <p>
              Try adjusting your search terms or category filter
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default Blog
