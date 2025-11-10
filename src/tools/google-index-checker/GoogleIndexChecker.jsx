import { useState } from 'react'

const GoogleIndexChecker = () => {
  const [url, setUrl] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheck = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL')
      return
    }

    setLoading(true)
    setError('')
    
    // Simulate API call
    setTimeout(() => {
      const isIndexed = Math.random() > 0.3 // 70% chance of being indexed
      const lastCrawled = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within last 30 days
      
      setResults({
        url: url,
        indexed: isIndexed,
        lastCrawled: lastCrawled,
        title: isIndexed ? 'Sample Page Title' : null,
        description: isIndexed ? 'This is a sample page description that appears in search results.' : null,
        keywords: isIndexed ? ['sample', 'page', 'content', 'website'] : [],
        pageRank: isIndexed ? Math.floor(Math.random() * 10) + 1 : 0
      })
      setLoading(false)
    }, 2000)
  }

  const handleClear = () => {
    setUrl('')
    setResults(null)
    setError('')
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          Google Index Checker
        </h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
            Website URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              color: 'var(--text-primary)',
              fontSize: '1rem'
            }}
          />
          {error && (
            <p style={{ color: 'var(--error)', marginTop: '0.5rem', fontSize: '0.875rem' }}>
              {error}
            </p>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleCheck}
            disabled={loading || !url.trim()}
            style={{
              padding: '0.875rem 2rem',
              backgroundColor: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: loading || !url.trim() ? 'not-allowed' : 'pointer',
              opacity: loading || !url.trim() ? 0.7 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? 'Checking...' : 'Check Index Status'}
          </button>
          
          <button
            onClick={handleClear}
            style={{
              padding: '0.875rem 2rem',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {results && (
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Index Status Results
          </h3>
          
          <div style={{ 
            backgroundColor: results.indexed ? 'var(--success)' : 'var(--error)',
            color: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: '1.1rem'
          }}>
            {results.indexed ? '✅ Indexed by Google' : '❌ Not Indexed by Google'}
          </div>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ 
              backgroundColor: 'var(--bg-tertiary)', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              border: '1px solid var(--border)'
            }}>
              <strong style={{ color: 'var(--text-primary)' }}>URL:</strong>
              <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                {results.url}
              </span>
            </div>
            
            {results.indexed && (
              <>
                <div style={{ 
                  backgroundColor: 'var(--bg-tertiary)', 
                  padding: '1rem', 
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)'
                }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Last Crawled:</strong>
                  <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                    {formatDate(results.lastCrawled)}
                  </span>
                </div>
                
                <div style={{ 
                  backgroundColor: 'var(--bg-tertiary)', 
                  padding: '1rem', 
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)'
                }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Page Title:</strong>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    {results.title}
                  </div>
                </div>
                
                <div style={{ 
                  backgroundColor: 'var(--bg-tertiary)', 
                  padding: '1rem', 
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)'
                }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Meta Description:</strong>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    {results.description}
                  </div>
                </div>
                
                <div style={{ 
                  backgroundColor: 'var(--bg-tertiary)', 
                  padding: '1rem', 
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)'
                }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Keywords Found:</strong>
                  <div style={{ marginTop: '0.5rem' }}>
                    {results.keywords.map((keyword, index) => (
                      <span key={index} style={{
                        display: 'inline-block',
                        backgroundColor: 'var(--accent)',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem',
                        margin: '0.25rem 0.25rem 0.25rem 0',
                        fontWeight: '500'
                      }}>
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={{ 
                  backgroundColor: 'var(--bg-tertiary)', 
                  padding: '1rem', 
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)'
                }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Estimated Page Rank:</strong>
                  <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                    {results.pageRank}/10
                  </span>
                </div>
              </>
            )}
          </div>
          
          {!results.indexed && (
            <div style={{ 
              backgroundColor: 'var(--warning)', 
              color: 'white',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginTop: '1rem'
            }}>
              <strong>Why isn't my page indexed?</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li>The page might be new and hasn't been crawled yet</li>
                <li>Check if your robots.txt allows Google to crawl the page</li>
                <li>Ensure the page is accessible and returns a 200 status code</li>
                <li>Submit your sitemap to Google Search Console</li>
                <li>Check for duplicate content issues</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default GoogleIndexChecker
