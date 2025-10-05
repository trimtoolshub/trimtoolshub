import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'
import { getFeaturedTools, toolCategories } from '../tools/registryData.js'
import { getFeaturedBlogPosts } from '../data/blogPosts.js'
import SEO from '../components/SEO'
import FontAwesomeIcon from '../components/FontAwesomeIcon'
import VercelAnalyticsStats from '../components/VercelAnalyticsStats'
import '../styles/home-modern.css'

const Home = () => {
  const featuredTools = getFeaturedTools()
  const featuredBlogPosts = getFeaturedBlogPosts()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TrimToolsHub",
    "description": "Free online tools for developers, designers, and content creators",
    "url": "https://www.trimtoolshub.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.trimtoolshub.com/tools?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://github.com/trimtoolshub/trimtoolshub"
    ]
  }

  return (
    <>
      <SEO 
        title="Free Online Tools for Developers and Designers | TrimToolsHub"
        description="TrimToolsHub offers free online tools for developers, designers, and content creators. Text processing, data conversion, password generation, and more."
        canonical="/"
        structuredData={structuredData}
      />
      
              <div className="hero-modern">
                <div className="container">
                  <div className="hero-content">
                    <div className="hero-text">
                      <div className="hero-badge">
                        <FontAwesomeIcon icon="fas fa-sparkles" />
                        <span>Free Online Tools</span>
                      </div>
                      <h1 className="hero-title">
                        Your Ultimate <span className="gradient-text">Digital Toolbox</span>
                      </h1>
                      <p className="hero-description">
                        Professional-grade online tools for developers, designers, and content creators. 
                        Boost your productivity with our comprehensive suite of utilities. 
                        <span className="highlight">No registration required!</span>
                      </p>
                      <div className="hero-stats">
                            <div className="stat">
                              <span className="stat-number">75+</span>
                              <span className="stat-label">Tools</span>
                            </div>
                        <div className="stat">
                          <span className="stat-number">100%</span>
                          <span className="stat-label">Free</span>
                        </div>
                        <div className="stat">
                          <span className="stat-number">∞</span>
                          <span className="stat-label">Uses</span>
                        </div>
                        <VercelAnalyticsStats />
                      </div>
                      <div className="hero-actions">
                        <Link to="/tools" className="btn-primary-hero">
                          <FontAwesomeIcon icon="fas fa-rocket" />
                          Explore Tools
                        </Link>
                        <Link to="/tools?featured=true" className="btn-secondary-hero">
                          <FontAwesomeIcon icon="fas fa-star" />
                          Popular Tools
                        </Link>
                      </div>
                    </div>
                    <div className="hero-visual">
                      <div className="floating-cards">
                        <div className="floating-card card-1">
                          <FontAwesomeIcon icon="fas fa-qrcode" />
                          <span>QR Generator</span>
                        </div>
                        <div className="floating-card card-2">
                          <FontAwesomeIcon icon="fas fa-exchange-alt" />
                          <span>Unit Converter</span>
                        </div>
                        <div className="floating-card card-3">
                          <FontAwesomeIcon icon="fas fa-dice" />
                          <span>Random Numbers</span>
                        </div>
                        <div className="floating-card card-4">
                          <FontAwesomeIcon icon="fas fa-lock" />
                          <span>Password Gen</span>
                        </div>
                        <div className="floating-card card-5">
                          <FontAwesomeIcon icon="fas fa-palette" />
                          <span>Color Tools</span>
                        </div>
                        <div className="floating-card card-6">
                          <FontAwesomeIcon icon="fas fa-code" />
                          <span>Dev Tools</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hero-background">
                  <div className="gradient-orb orb-1"></div>
                  <div className="gradient-orb orb-2"></div>
                  <div className="gradient-orb orb-3"></div>
                </div>
              </div>

      <AdSlot slotId="hero-banner" size="banner" style={{ margin: '2rem auto', maxWidth: '728px' }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
          <div>
            {/* Tool Categories */}
            <section style={{ marginBottom: '4rem' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-primary)' }}>
                Tool Categories
              </h2>
              <div className="category-4-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                {toolCategories.slice(0, 4).map((category) => (
              <div key={category.id} className="category-card" style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '0.75rem',
                padding: '1.25rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)'
                e.target.style.boxShadow = '0 12px 30px var(--shadow-hover)'
                e.target.style.borderColor = category.color
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 12px var(--shadow)'
                e.target.style.borderColor = 'var(--border)'
              }}
              >
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem',
                  color: category.color,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}>
                  <FontAwesomeIcon icon={category.icon} />
                </div>
                <h3 style={{ 
                  color: category.color, 
                  marginBottom: '0.75rem', 
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  letterSpacing: '-0.025em'
                }}>
                  {category.name}
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  marginBottom: '1.5rem',
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  {category.description}
                </p>
                <Link 
                  to={`/tools?category=${category.id}`}
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: category.color,
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    fontSize: '0.9rem',
                    letterSpacing: '0.025em'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '0.9'
                    e.target.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '1'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  Browse Tools
                </Link>
              </div>
                  ))}
                </div>
              </section>

              {/* Ad between first and second row */}
              <AdSlot slotId="category-ad-1" size="banner" style={{ margin: '2rem auto', maxWidth: '728px' }} />

              {/* Second row of categories */}
              <section style={{ marginBottom: '4rem' }}>
                <div className="category-4-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                  {toolCategories.slice(4, 8).map((category) => (
                    <div key={category.id} className="category-card" style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.75rem',
                      padding: '1.25rem',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-4px)'
                      e.target.style.boxShadow = '0 12px 30px var(--shadow-hover)'
                      e.target.style.borderColor = category.color
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 4px 12px var(--shadow)'
                      e.target.style.borderColor = 'var(--border)'
                    }}
                    >
                      <div style={{ 
                        fontSize: '2rem', 
                        marginBottom: '0.75rem',
                        color: category.color,
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      }}>
                        <FontAwesomeIcon icon={category.icon} />
                      </div>
                      <h3 style={{ 
                        color: category.color, 
                        marginBottom: '0.75rem', 
                        fontSize: '1rem',
                        fontWeight: '700',
                        letterSpacing: '-0.025em'
                      }}>
                        {category.name}
                      </h3>
                      <p style={{ 
                        color: 'var(--text-secondary)', 
                        marginBottom: '1rem',
                        fontSize: '0.8rem',
                        lineHeight: '1.4'
                      }}>
                        {category.description}
                      </p>
                      <Link 
                        to={`/tools?category=${category.id}`}
                        style={{
                          display: 'inline-block',
                          padding: '0.5rem 1rem',
                          backgroundColor: category.color,
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '0.5rem',
                          fontWeight: '600',
                          transition: 'all 0.2s ease',
                          fontSize: '0.8rem',
                          letterSpacing: '0.025em'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.opacity = '0.9'
                          e.target.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.opacity = '1'
                          e.target.style.transform = 'translateY(0)'
                        }}
                      >
                        Browse Tools
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* Ad between second and third row */}
              <AdSlot slotId="category-ad-2" size="banner" style={{ margin: '2rem auto', maxWidth: '728px' }} />

              {/* Third row of categories */}
              <section style={{ marginBottom: '4rem' }}>
                <div className="category-4-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                  {toolCategories.slice(8).map((category) => (
                    <div key={category.id} className="category-card" style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.75rem',
                      padding: '1.25rem',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-4px)'
                      e.target.style.boxShadow = '0 12px 30px var(--shadow-hover)'
                      e.target.style.borderColor = category.color
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 4px 12px var(--shadow)'
                      e.target.style.borderColor = 'var(--border)'
                    }}
                    >
                      <div style={{ 
                        fontSize: '2rem', 
                        marginBottom: '0.75rem',
                        color: category.color,
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      }}>
                        <FontAwesomeIcon icon={category.icon} />
                      </div>
                      <h3 style={{ 
                        color: category.color, 
                        marginBottom: '0.75rem', 
                        fontSize: '1rem',
                        fontWeight: '700',
                        letterSpacing: '-0.025em'
                      }}>
                        {category.name}
                      </h3>
                      <p style={{ 
                        color: 'var(--text-secondary)', 
                        marginBottom: '1rem',
                        fontSize: '0.8rem',
                        lineHeight: '1.4'
                      }}>
                        {category.description}
                      </p>
                      <Link 
                        to={`/tools?category=${category.id}`}
                        style={{
                          display: 'inline-block',
                          padding: '0.5rem 1rem',
                          backgroundColor: category.color,
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '0.5rem',
                          fontWeight: '600',
                          transition: 'all 0.2s ease',
                          fontSize: '0.8rem',
                          letterSpacing: '0.025em'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.opacity = '0.9'
                          e.target.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.opacity = '1'
                          e.target.style.transform = 'translateY(0)'
                        }}
                      >
                        Browse Tools
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              <div style={{ textAlign: 'center', margin: '4rem 0' }}>
                <Link 
                  to="/tools" 
                  style={{
                    display: 'inline-block',
                    padding: '1.25rem 2.5rem',
                    backgroundColor: 'var(--accent)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    fontSize: '1.1rem',
                    letterSpacing: '0.025em',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--accent-hover)'
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--accent)'
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  View All Tools
                </Link>
              </div>
            </div>

            {/* Mobile Popular Tools */}
            <div className="popular-tools-mobile" style={{ display: 'none' }}>
              <h3 style={{ 
                color: 'var(--text-primary)', 
                marginBottom: '1rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FontAwesomeIcon icon="fas fa-star" style={{ color: 'var(--accent)' }} />
                Popular Tools
              </h3>
              <div className="tools-list" style={{ display: 'flex', overflowX: 'auto', gap: '1rem', padding: '1rem 0' }}>
                {featuredTools.slice(0, 10).map((tool) => (
                  <Link 
                    key={tool.id} 
                    to={`/tools/${tool.slug}`}
                    className="tool-item"
                    style={{
                      minWidth: '200px',
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      backgroundColor: 'var(--bg-card)',
                      borderRadius: '0.75rem',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.2s ease',
                      border: '1px solid var(--border)',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'var(--bg-secondary)'
                      e.target.style.borderColor = 'var(--border-hover)'
                      e.target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'var(--bg-card)'
                      e.target.style.borderColor = 'var(--border)'
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: toolCategories.find(cat => cat.id === tool.category)?.color || 'var(--accent)',
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.25rem'
                    }}>
                      <FontAwesomeIcon icon={toolCategories.find(cat => cat.id === tool.category)?.icon || 'fas fa-tools'} />
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '500', 
                        color: 'var(--text-primary)',
                        marginBottom: '0.25rem'
                      }}>
                        {tool.name}
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--text-secondary)',
                        lineHeight: '1.3'
                      }}>
                        {tool.shortDescription}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ position: 'sticky', top: '100px' }}>
              {/* Sidebar Ad Above Popular Tools */}
              <AdSlot slotId="sidebar-ad-top" size="rectangle" style={{ marginBottom: '1.5rem' }} />
              
              {/* Popular Tools */}
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
                  <FontAwesomeIcon icon="fas fa-star" style={{ color: 'var(--accent)' }} />
                  Popular Tools
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {featuredTools.slice(0, 10).map((tool) => (
                    <Link 
                      key={tool.id} 
                      to={`/tools/${tool.slug}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
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
                        e.target.style.backgroundColor = 'var(--bg-secondary)'
                        e.target.style.borderColor = 'var(--border-hover)'
                        e.target.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'var(--bg-tertiary)'
                        e.target.style.borderColor = 'transparent'
                        e.target.style.transform = 'translateX(0)'
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: toolCategories.find(cat => cat.id === tool.category)?.color || 'var(--accent)',
                        borderRadius: '0.375rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.875rem',
                        flexShrink: 0
                      }}>
                        <FontAwesomeIcon icon={toolCategories.find(cat => cat.id === tool.category)?.icon || 'fas fa-tools'} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: '500', 
                          color: 'var(--text-primary)',
                          marginBottom: '0.25rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {tool.name}
                        </div>
                        <div style={{ 
                          fontSize: '0.75rem', 
                          color: 'var(--text-secondary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {tool.shortDescription}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar Ad */}
              <AdSlot slotId="sidebar-ad-1" size="rectangle" style={{ marginBottom: '1.5rem' }} />
              
              {/* Sidebar Ad */}
              <AdSlot slotId="sidebar-ad-2" size="rectangle" />
            </div>
          </div>
        </div>

        {/* Blog Section */}
        {featuredBlogPosts.length > 0 && (
          <section style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            padding: '4rem 0',
            marginTop: '4rem'
          }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ 
                  fontSize: '2.25rem', 
                  fontWeight: '700', 
                  color: 'var(--text-primary)', 
                  marginBottom: '1rem' 
                }}>
                  <FontAwesomeIcon icon="fas fa-blog" style={{ marginRight: '0.75rem', color: 'var(--accent)' }} />
                  Latest Insights
                </h2>
                <p style={{ 
                  fontSize: '1.125rem', 
                  color: 'var(--text-secondary)', 
                  maxWidth: '600px', 
                  margin: '0 auto',
                  lineHeight: '1.6'
                }}>
                  Expert tips, tutorials, and insights about productivity tools and web development
                </p>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '2rem',
                marginBottom: '2rem'
              }}>
                {featuredBlogPosts.slice(0, 3).map(post => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '1rem',
                      padding: '2rem',
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

              <div style={{ textAlign: 'center' }}>
                <Link 
                  to="/blog"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--accent)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                >
                  View All Articles
                  <FontAwesomeIcon icon="fas fa-arrow-right" />
                </Link>
              </div>
            </div>
          </section>
        )}
    </>
  )
}

export default Home
