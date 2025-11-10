import { useParams, Link } from 'react-router-dom'
import { getBlogPostBySlug, getAuthorProfile } from '../data/blogPosts'
import SEO from '../components/SEO'
import FontAwesomeIcon from '../components/FontAwesomeIcon'
import PopularBlogPosts from '../components/PopularBlogPosts'
import ArticleAd from '../components/ArticleAd'
import RelatedBlogPosts from '../components/RelatedBlogPosts'
import AuthorProfile from '../components/AuthorProfile'
import SameAuthorArticles from '../components/SameAuthorArticles'

const BlogPost = () => {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)
  const authorProfile = post ? getAuthorProfile(post.author) : null

  if (!post) {
    return (
      <>
        <SEO 
          title="Article Not Found | TrimToolsHub Blog"
          description="The article you're looking for doesn't exist on TrimToolsHub Blog."
          canonical="/blog/not-found"
        />
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <FontAwesomeIcon icon="fas fa-exclamation-triangle" style={{ fontSize: '4rem', color: 'var(--accent)', marginBottom: '2rem' }} />
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Article Not Found
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            The article you're looking for doesn't exist or may have been moved.
          </p>
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
              fontWeight: '500'
            }}
          >
            <FontAwesomeIcon icon="fas fa-arrow-left" />
            Back to Blog
          </Link>
        </div>
      </>
    )
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "url": `https://www.trimtoolshub.com/blog/${post.slug}`,
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "TrimToolsHub",
      "url": "https://www.trimtoolshub.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.trimtoolshub.com/favicon.ico"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.trimtoolshub.com/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(', ')
  }

  return (
    <>
      <SEO 
        title={`${post.title} | TrimToolsHub Blog`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        structuredData={structuredData}
        keywords={post.tags}
      />
      
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '2rem' }}>
          <Link 
            to="/blog"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem'
            }}
          >
            <FontAwesomeIcon icon="fas fa-arrow-left" />
            Back to Blog
          </Link>
        </nav>

        {/* Main Layout */}
        <div 
          className="article-layout"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 300px', 
            gap: '3rem', 
            alignItems: 'start'
          }}
        >
          {/* Main Content */}
          <div>
            {/* Article Header */}
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {post.category}
                </span>
              </div>
              
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '700', 
                color: 'var(--text-primary)', 
                marginBottom: '1.5rem',
                lineHeight: '1.2'
              }}>
                {post.title}
              </h1>
              
              <p style={{ 
                fontSize: '1.25rem', 
                color: 'var(--text-secondary)', 
                maxWidth: '800px', 
                margin: '0 auto 2rem auto',
                lineHeight: '1.6'
              }}>
                {post.excerpt}
              </p>
              
              {/* Feature Image */}
              {post.featureImage && (
                <div style={{
                  width: '100%',
                  maxWidth: '800px',
                  height: '400px',
                  margin: '0 auto 2rem auto',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}>
                  <img
                    src={post.featureImage}
                    alt={post.featureImageAlt || post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '2rem',
                flexWrap: 'wrap',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-user" />
                  <span>{post.author}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-calendar" />
                  <span>{new Date(post.publishDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-clock" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <article style={{ 
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '1rem',
              padding: '3rem'
            }}>
              <div 
                style={{ 
                  color: 'var(--text-primary)', 
                  lineHeight: '1.8',
                  fontSize: '1.125rem'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .split('\n\n')
                    .map((paragraph, index) => {
                      // Add inline ad after first few paragraphs
                      if (index === 3) {
                        const adHtml = `
                          <div style="margin: 2rem 0; text-align: center; padding: 1rem; background-color: var(--bg-secondary); border-radius: 0.5rem; border: 1px solid var(--border);">
                            <div data-ad-slot="article-inline-ad-1" style="min-height: 250px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">
                              Advertisement
                            </div>
                          </div>
                        `
                        
                        if (paragraph.startsWith('## ')) {
                          return `<h2 style="fontSize: '1.75rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem', marginTop: '2rem'">${paragraph.slice(3)}</h2>${adHtml}`
                        } else if (paragraph.startsWith('### ')) {
                          return `<h3 style="fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.75rem', marginTop: '1.5rem'">${paragraph.slice(4)}</h3>${adHtml}`
                        } else if (paragraph.startsWith('#### ')) {
                          return `<h4 style="fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem', marginTop: '1rem'">${paragraph.slice(5)}</h4>${adHtml}`
                        } else if (paragraph.startsWith('- ')) {
                          const listItems = paragraph.split('\n').map(item => 
                            item.startsWith('- ') ? `<li style="marginBottom: '0.5rem'">${item.slice(2)}</li>` : item
                          ).join('')
                          return `<ul style="paddingLeft: '1.5rem', marginBottom: '1rem'">${listItems}</ul>${adHtml}`
                        } else if (paragraph.startsWith('1. ')) {
                          const listItems = paragraph.split('\n').map(item => 
                            item.match(/^\d+\. /) ? `<li style="marginBottom: '0.5rem'">${item.replace(/^\d+\. /, '')}</li>` : item
                          ).join('')
                          return `<ol style="paddingLeft: '1.5rem', marginBottom: '1rem'">${listItems}</ol>${adHtml}`
                        } else {
                          return `<p style="marginBottom: '1.5rem'">${paragraph}</p>${adHtml}`
                        }
                      }
                      
                      // Add another inline ad after more content
                      if (index === 7) {
                        const adHtml = `
                          <div style="margin: 2rem 0; text-align: center; padding: 1rem; background-color: var(--bg-secondary); border-radius: 0.5rem; border: 1px solid var(--border);">
                            <div data-ad-slot="article-inline-ad-2" style="min-height: 250px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">
                              Advertisement
                            </div>
                          </div>
                        `
                        
                        if (paragraph.startsWith('## ')) {
                          return `<h2 style="fontSize: '1.75rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem', marginTop: '2rem'">${paragraph.slice(3)}</h2>${adHtml}`
                        } else if (paragraph.startsWith('### ')) {
                          return `<h3 style="fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.75rem', marginTop: '1.5rem'">${paragraph.slice(4)}</h3>${adHtml}`
                        } else if (paragraph.startsWith('#### ')) {
                          return `<h4 style="fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem', marginTop: '1rem'">${paragraph.slice(5)}</h4>${adHtml}`
                        } else if (paragraph.startsWith('- ')) {
                          const listItems = paragraph.split('\n').map(item => 
                            item.startsWith('- ') ? `<li style="marginBottom: '0.5rem'">${item.slice(2)}</li>` : item
                          ).join('')
                          return `<ul style="paddingLeft: '1.5rem', marginBottom: '1rem'">${listItems}</ul>${adHtml}`
                        } else if (paragraph.startsWith('1. ')) {
                          const listItems = paragraph.split('\n').map(item => 
                            item.match(/^\d+\. /) ? `<li style="marginBottom: '0.5rem'">${item.replace(/^\d+\. /, '')}</li>` : item
                          ).join('')
                          return `<ol style="paddingLeft: '1.5rem', marginBottom: '1rem'">${listItems}</ol>${adHtml}`
                        } else {
                          return `<p style="marginBottom: '1.5rem'">${paragraph}</p>${adHtml}`
                        }
                      }
                      
                      if (paragraph.startsWith('## ')) {
                        return `<h2 style="fontSize: '1.75rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem', marginTop: '2rem'">${paragraph.slice(3)}</h2>`
                      } else if (paragraph.startsWith('### ')) {
                        return `<h3 style="fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.75rem', marginTop: '1.5rem'">${paragraph.slice(4)}</h3>`
                      } else if (paragraph.startsWith('#### ')) {
                        return `<h4 style="fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem', marginTop: '1rem'">${paragraph.slice(5)}</h4>`
                      } else if (paragraph.startsWith('- ')) {
                        const listItems = paragraph.split('\n').map(item => 
                          item.startsWith('- ') ? `<li style="marginBottom: '0.5rem'">${item.slice(2)}</li>` : item
                        ).join('')
                        return `<ul style="paddingLeft: '1.5rem', marginBottom: '1rem'">${listItems}</ul>`
                      } else if (paragraph.startsWith('1. ')) {
                        const listItems = paragraph.split('\n').map(item => 
                          item.match(/^\d+\. /) ? `<li style="marginBottom: '0.5rem'">${item.replace(/^\d+\. /, '')}</li>` : item
                        ).join('')
                        return `<ol style="paddingLeft: '1.5rem', marginBottom: '1rem'">${listItems}</ol>`
                      } else {
                        return `<p style="marginBottom: '1.5rem'">${paragraph}</p>`
                      }
                    })
                    .join('')
                }}
              />
            </article>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div style={{ 
                textAlign: 'center', 
                marginTop: '3rem',
                marginBottom: '3rem'
              }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  color: 'var(--text-primary)', 
                  marginBottom: '1rem' 
                }}>
                  Tags
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        padding: '0.5rem 1rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        border: '1px solid var(--border)'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Profile */}
            <AuthorProfile authorName={post.author} authorProfile={authorProfile} />

            {/* Related Articles */}
            <RelatedBlogPosts currentPostId={post.id} />

            {/* Same Author Articles */}
            <SameAuthorArticles authorName={post.author} currentPostId={post.id} />
          </div>

          {/* Sidebar */}
          <div className="sidebar" style={{ position: 'sticky', top: '100px' }}>
            {/* Popular Blog Posts */}
            <PopularBlogPosts limit={5} />
            
            {/* Sidebar Ads */}
            <ArticleAd position="sidebar" />
            <ArticleAd position="sidebar" />
          </div>
        </div>

        {/* Back to Blog */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
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
            <FontAwesomeIcon icon="fas fa-arrow-left" />
            Back to All Articles
          </Link>
        </div>
      </div>
    </>
  )
}

export default BlogPost
