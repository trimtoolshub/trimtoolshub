import { useState } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const RobotsTxtGenerator = () => {
  const [config, setConfig] = useState({
    allowAll: true,
    disallowPaths: [],
    allowPaths: [],
    sitemapUrl: '',
    crawlDelay: '',
    userAgent: '*',
    customRules: ''
  })

  const [generatedRobots, setGeneratedRobots] = useState('')

  const generateRobotsTxt = () => {
    let robotsContent = ''

    if (config.customRules) {
      robotsContent = config.customRules
    } else {
      robotsContent += `User-agent: ${config.userAgent}\n`
      
      if (config.allowAll) {
        robotsContent += 'Allow: /\n'
      } else {
        config.allowPaths.forEach(path => {
          robotsContent += `Allow: ${path}\n`
        })
      }

      config.disallowPaths.forEach(path => {
        robotsContent += `Disallow: ${path}\n`
      })

      if (config.crawlDelay) {
        robotsContent += `Crawl-delay: ${config.crawlDelay}\n`
      }
    }

    if (config.sitemapUrl) {
      robotsContent += `\nSitemap: ${config.sitemapUrl}\n`
    }

    setGeneratedRobots(robotsContent)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedRobots)
  }

  const downloadRobotsTxt = () => {
    const blob = new Blob([generatedRobots], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'robots.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const addDisallowPath = () => {
    setConfig(prev => ({
      ...prev,
      disallowPaths: [...prev.disallowPaths, '']
    }))
  }

  const addAllowPath = () => {
    setConfig(prev => ({
      ...prev,
      allowPaths: [...prev.allowPaths, '']
    }))
  }

  const updateDisallowPath = (index, value) => {
    setConfig(prev => ({
      ...prev,
      disallowPaths: prev.disallowPaths.map((path, i) => i === index ? value : path)
    }))
  }

  const updateAllowPath = (index, value) => {
    setConfig(prev => ({
      ...prev,
      allowPaths: prev.allowPaths.map((path, i) => i === index ? value : path)
    }))
  }

  const removeDisallowPath = (index) => {
    setConfig(prev => ({
      ...prev,
      disallowPaths: prev.disallowPaths.filter((_, i) => i !== index)
    }))
  }

  const removeAllowPath = (index) => {
    setConfig(prev => ({
      ...prev,
      allowPaths: prev.allowPaths.filter((_, i) => i !== index)
    }))
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '700', 
        color: 'var(--text-primary)', 
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <FontAwesomeIcon icon="fas fa-robot" style={{ color: 'var(--accent)' }} />
        Robots.txt Generator
      </h2>
      
      <p style={{ 
        fontSize: '1.125rem', 
        color: 'var(--text-secondary)', 
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Generate a robots.txt file to control how search engines crawl your website. 
        This tool helps you create proper directives for allowing or blocking crawlers 
        from specific areas of your site.
      </p>

      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          color: 'var(--text-primary)', 
          marginBottom: '1.5rem' 
        }}>
          Configuration
        </h3>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {/* User Agent */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '1rem', 
              fontWeight: '500', 
              color: 'var(--text-primary)', 
              marginBottom: '0.5rem' 
            }}>
              User Agent
            </label>
            <input
              type="text"
              value={config.userAgent}
              onChange={(e) => setConfig(prev => ({ ...prev, userAgent: e.target.value }))}
              placeholder="* (for all crawlers)"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Allow All */}
          <div>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              fontSize: '1rem', 
              fontWeight: '500', 
              color: 'var(--text-primary)', 
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={config.allowAll}
                onChange={(e) => setConfig(prev => ({ ...prev, allowAll: e.target.checked }))}
                style={{ transform: 'scale(1.2)' }}
              />
              Allow all crawlers to access all content
            </label>
          </div>

          {/* Disallow Paths */}
          {!config.allowAll && (
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '1rem', 
                fontWeight: '500', 
                color: 'var(--text-primary)', 
                marginBottom: '0.5rem' 
              }}>
                Disallow Paths
              </label>
              {config.disallowPaths.map((path, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={path}
                    onChange={(e) => updateDisallowPath(index, e.target.value)}
                    placeholder="/admin/, /private/, etc."
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}
                  />
                  <button
                    onClick={() => removeDisallowPath(index)}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: 'var(--danger)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <FontAwesomeIcon icon="fas fa-trash" />
                  </button>
                </div>
              ))}
              <button
                onClick={addDisallowPath}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-plus" style={{ marginRight: '0.5rem' }} />
                Add Disallow Path
              </button>
            </div>
          )}

          {/* Allow Paths */}
          {!config.allowAll && (
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '1rem', 
                fontWeight: '500', 
                color: 'var(--text-primary)', 
                marginBottom: '0.5rem' 
              }}>
                Allow Paths
              </label>
              {config.allowPaths.map((path, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={path}
                    onChange={(e) => updateAllowPath(index, e.target.value)}
                    placeholder="/public/, /images/, etc."
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}
                  />
                  <button
                    onClick={() => removeAllowPath(index)}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: 'var(--danger)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <FontAwesomeIcon icon="fas fa-trash" />
                  </button>
                </div>
              ))}
              <button
                onClick={addAllowPath}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-plus" style={{ marginRight: '0.5rem' }} />
                Add Allow Path
              </button>
            </div>
          )}

          {/* Crawl Delay */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '1rem', 
              fontWeight: '500', 
              color: 'var(--text-primary)', 
              marginBottom: '0.5rem' 
            }}>
              Crawl Delay (seconds)
            </label>
            <input
              type="number"
              value={config.crawlDelay}
              onChange={(e) => setConfig(prev => ({ ...prev, crawlDelay: e.target.value }))}
              placeholder="Optional delay between requests"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Sitemap URL */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '1rem', 
              fontWeight: '500', 
              color: 'var(--text-primary)', 
              marginBottom: '0.5rem' 
            }}>
              Sitemap URL
            </label>
            <input
              type="url"
              value={config.sitemapUrl}
              onChange={(e) => setConfig(prev => ({ ...prev, sitemapUrl: e.target.value }))}
              placeholder="https://yoursite.com/sitemap.xml"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Custom Rules */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '1rem', 
              fontWeight: '500', 
              color: 'var(--text-primary)', 
              marginBottom: '0.5rem' 
            }}>
              Custom Rules (Advanced)
            </label>
            <textarea
              value={config.customRules}
              onChange={(e) => setConfig(prev => ({ ...prev, customRules: e.target.value }))}
              placeholder="Enter custom robots.txt content here..."
              rows={6}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                fontFamily: 'monospace',
                resize: 'vertical'
              }}
            />
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary)', 
              marginTop: '0.5rem' 
            }}>
              If you enter custom rules, they will override all other settings above.
            </p>
          </div>
        </div>

        <button
          onClick={generateRobotsTxt}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '1.5rem',
            transition: 'all 0.3s ease'
          }}
        >
          <FontAwesomeIcon icon="fas fa-cog" style={{ marginRight: '0.5rem' }} />
          Generate Robots.txt
        </button>
      </div>

      {generatedRobots && (
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1rem' 
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              color: 'var(--text-primary)' 
            }}>
              Generated Robots.txt
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--success)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-copy" style={{ marginRight: '0.5rem' }} />
                Copy
              </button>
              <button
                onClick={downloadRobotsTxt}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-download" style={{ marginRight: '0.5rem' }} />
                Download
              </button>
            </div>
          </div>
          
          <pre style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--border)',
            fontSize: '0.875rem',
            color: 'var(--text-primary)',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            overflow: 'auto',
            maxHeight: '400px'
          }}>
            {generatedRobots}
          </pre>
        </div>
      )}

      {/* FAQ Section */}
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginTop: '2rem'
      }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          color: 'var(--text-primary)', 
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FontAwesomeIcon icon="fas fa-question-circle" style={{ color: 'var(--accent)' }} />
          About Robots.txt & SEO Best Practices
        </h3>
        
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              What is robots.txt?
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Robots.txt is a text file that tells search engine crawlers which pages or sections of your website 
              they can or cannot access. It's placed in the root directory of your website and helps control 
              how search engines index your content.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Common Disallow Patterns
            </h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
              <li><code>/admin/</code> - Block admin areas</li>
              <li><code>/private/</code> - Block private content</li>
              <li><code>/*.pdf$</code> - Block PDF files</li>
              <li><code>/temp/</code> - Block temporary files</li>
              <li><code>/cgi-bin/</code> - Block server scripts</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Best Practices
            </h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
              <li>Always include your sitemap URL</li>
              <li>Test your robots.txt with Google Search Console</li>
              <li>Don't use robots.txt for security (it's publicly accessible)</li>
              <li>Use specific user agents when needed</li>
              <li>Keep it simple and avoid complex rules</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Testing Your Robots.txt
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              After creating your robots.txt file, test it using Google Search Console's robots.txt tester 
              to ensure it works as expected. You can also use online robots.txt validators to check for syntax errors.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RobotsTxtGenerator
