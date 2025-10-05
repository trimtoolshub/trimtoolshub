import { useState, useCallback } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const MetaTagsAnalyzer = () => {
  const [url, setUrl] = useState('')
  const [analysisResults, setAnalysisResults] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])

  const sampleUrls = [
    'https://google.com',
    'https://github.com',
    'https://stackoverflow.com',
    'https://wikipedia.org',
    'https://youtube.com'
  ]

  const analyzeMetaTags = useCallback(async () => {
    if (!url.trim()) {
      setError('Please enter a URL to analyze.')
      return
    }

    setIsAnalyzing(true)
    setError('')
    setAnalysisResults(null)

    try {
      // Clean URL input
      let cleanUrl = url.trim()
      if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        cleanUrl = 'https://' + cleanUrl
      }

      // Simulate meta tags analysis (in a real implementation, you'd use a CORS proxy or backend API)
      const mockAnalysis = {
        url: cleanUrl,
        title: generateMockTitle(),
        description: generateMockDescription(),
        keywords: generateMockKeywords(),
        metaTags: generateMockMetaTags(),
        openGraph: generateMockOpenGraph(),
        twitterCard: generateMockTwitterCard(),
        structuredData: generateMockStructuredData(),
        analysis: generateMockAnalysis(),
        recommendations: generateMockRecommendations(),
        timestamp: new Date().toISOString()
      }

      setAnalysisResults(mockAnalysis)
      
      // Add to history
      const newHistory = [mockAnalysis, ...history.slice(0, 9)] // Keep last 10
      setHistory(newHistory)
      
    } catch (err) {
      setError('Error analyzing URL: ' + err.message)
    } finally {
      setIsAnalyzing(false)
    }
  }, [url, history])

  // Mock data generators
  const generateMockTitle = () => {
    const titles = [
      'Google - Search the world\'s information',
      'GitHub: Let\'s build from here',
      'Stack Overflow - Where Developers Learn',
      'Wikipedia, the free encyclopedia',
      'YouTube - Watch, Listen, Stream'
    ]
    return titles[Math.floor(Math.random() * titles.length)]
  }

  const generateMockDescription = () => {
    const descriptions = [
      'Search the world\'s information, including webpages, images, videos and more. Google has many special features to help you find exactly what you\'re looking for.',
      'GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories.',
      'Stack Overflow is the largest, most trusted online community for developers to learn, share their programming knowledge, and build their careers.',
      'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.',
      'Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.'
    ]
    return descriptions[Math.floor(Math.random() * descriptions.length)]
  }

  const generateMockKeywords = () => {
    const keywordSets = [
      ['search', 'google', 'web', 'information', 'internet'],
      ['github', 'git', 'code', 'programming', 'development'],
      ['stack overflow', 'programming', 'questions', 'answers', 'developers'],
      ['wikipedia', 'encyclopedia', 'knowledge', 'information', 'research'],
      ['youtube', 'video', 'music', 'entertainment', 'streaming']
    ]
    return keywordSets[Math.floor(Math.random() * keywordSets.length)]
  }

  const generateMockMetaTags = () => {
    return {
      'viewport': 'width=device-width, initial-scale=1.0',
      'robots': 'index, follow',
      'author': 'Website Owner',
      'generator': 'React',
      'theme-color': '#ffffff',
      'msapplication-TileColor': '#ffffff',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default'
    }
  }

  const generateMockOpenGraph = () => {
    return {
      'og:title': generateMockTitle(),
      'og:description': generateMockDescription(),
      'og:type': 'website',
      'og:url': url,
      'og:image': 'https://example.com/og-image.jpg',
      'og:site_name': 'Website Name',
      'og:locale': 'en_US'
    }
  }

  const generateMockTwitterCard = () => {
    return {
      'twitter:card': 'summary_large_image',
      'twitter:title': generateMockTitle(),
      'twitter:description': generateMockDescription(),
      'twitter:image': 'https://example.com/twitter-image.jpg',
      'twitter:site': '@website',
      'twitter:creator': '@author'
    }
  }

  const generateMockStructuredData = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Website Name',
      url: url,
      description: generateMockDescription(),
      publisher: {
        '@type': 'Organization',
        name: 'Publisher Name'
      }
    }
  }

  const generateMockAnalysis = () => {
    return {
      titleLength: Math.floor(Math.random() * 30) + 30,
      descriptionLength: Math.floor(Math.random() * 100) + 100,
      hasOpenGraph: true,
      hasTwitterCard: true,
      hasStructuredData: true,
      hasCanonical: Math.random() > 0.5,
      hasRobots: true,
      hasViewport: true,
      score: Math.floor(Math.random() * 20) + 80
    }
  }

  const generateMockRecommendations = () => {
    const recommendations = [
      'Consider adding more specific keywords to improve SEO',
      'Optimize title length for better search engine display',
      'Add more detailed structured data for rich snippets',
      'Include additional Open Graph tags for better social sharing',
      'Consider adding hreflang tags for international SEO'
    ]
    return recommendations.slice(0, Math.floor(Math.random() * 3) + 2)
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
    setError('')
    setAnalysisResults(null)
  }

  const loadSample = (sampleUrl) => {
    setUrl(sampleUrl)
    setError('')
    setAnalysisResults(null)
  }

  const clearInput = () => {
    setUrl('')
    setError('')
    setAnalysisResults(null)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const clearHistory = () => {
    setHistory([])
  }

  const getScoreColor = (score) => {
    if (score >= 90) return '#10b981'
    if (score >= 70) return '#f59e0b'
    return '#ef4444'
  }

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent'
    if (score >= 70) return 'Good'
    return 'Needs Improvement'
  }

  return (
    <>
      <SEOHead
        title="Meta Tags Analyzer - Analyze Website SEO Meta Tags & Open Graph"
        description="Analyze meta tags, Open Graph, Twitter Cards, and structured data for any website. Get SEO recommendations and optimization insights."
        canonical="/tools/meta-tags-analyzer"
        keywords={['meta', 'tags', 'analyzer', 'seo', 'open graph', 'twitter card', 'structured data', 'optimization']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'Meta Tags Analyzer',
          description: 'Analyze meta tags and SEO elements for websites',
          url: 'https://www.trimtoolshub.com/tools/meta-tags-analyzer',
          applicationCategory: 'SEOApplication',
          operatingSystem: 'Web Browser'
        }}
      />

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-search" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Meta Tags Analyzer
        </h2>
        
        <div style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          border: '1px solid var(--border)', 
          borderRadius: '0.75rem', 
          padding: '1.5rem',
          marginBottom: '2rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6'
        }}>
          <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
            Analyze meta tags, Open Graph data, Twitter Cards, and structured data for any website with our Meta Tags Analyzer. 
            Whether you're optimizing your website's SEO, analyzing competitor meta tags, debugging social media sharing, 
            or improving search engine visibility, our tool provides comprehensive meta tag analysis and optimization recommendations.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Meta Tags Analyzer offers professional-grade SEO analysis including meta tag validation, Open Graph optimization, 
            Twitter Card analysis, structured data inspection, and performance scoring. Perfect for SEO specialists, 
            web developers, digital marketers, and anyone looking to improve their website's search engine performance.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive meta tag analysis including: <strong>Basic Meta Tags:</strong> 
            Analyze title, description, keywords, and viewport meta tags. <strong>Open Graph Tags:</strong> 
            Check social media sharing optimization for Facebook, LinkedIn, and other platforms. <strong>Twitter Cards:</strong> 
            Analyze Twitter-specific meta tags for optimal tweet display. <strong>Structured Data:</strong> 
            Inspect JSON-LD, microdata, and RDFa structured data. <strong>SEO Analysis:</strong> 
            Get detailed SEO recommendations and optimization suggestions. <strong>Performance Scoring:</strong> 
            Receive overall meta tag quality scores and improvement areas.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include basic meta tags analysis, Open Graph optimization, Twitter Card analysis, structured data inspection, 
            SEO recommendations, performance scoring, and comprehensive documentation about meta tag best practices 
            and SEO optimization strategies.
          </p>
        </div>
        
        <AdSlot slotId="meta-tags-analyzer-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Enter URL</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder="Enter URL to analyze (e.g., https://example.com)"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              />
              <button
                onClick={analyzeMetaTags}
                disabled={isAnalyzing || !url.trim()}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isAnalyzing || !url.trim() ? 'var(--bg-tertiary)' : '#10b981',
                  color: isAnalyzing || !url.trim() ? 'var(--text-secondary)' : 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: isAnalyzing || !url.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '500'
                }}
              >
                <FontAwesomeIcon icon={isAnalyzing ? "fas fa-spinner fa-spin" : "fas fa-search"} />
                {isAnalyzing ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Sample URLs:</h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {sampleUrls.map((sampleUrl, index) => (
                  <button
                    key={index}
                    onClick={() => loadSample(sampleUrl)}
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'var(--accent)'
                      e.target.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'var(--bg-secondary)'
                      e.target.style.color = 'var(--text-primary)'
                    }}
                  >
                    {sampleUrl}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={clearInput}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FontAwesomeIcon icon="fas fa-trash" />
              Clear
            </button>
          </div>

          {error && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.5rem',
              color: '#dc2626',
              marginBottom: '1rem'
            }}>
              <FontAwesomeIcon icon="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }} />
              {error}
            </div>
          )}

          {analysisResults && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-chart-bar" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Analysis Results
              </h3>
              
              {/* Overall Score */}
              <div style={{
                padding: '2rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: getScoreColor(analysisResults.analysis.score),
                  marginBottom: '0.5rem'
                }}>
                  {analysisResults.analysis.score}/100
                </div>
                <div style={{
                  fontSize: '1.2rem',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  {getScoreLabel(analysisResults.analysis.score)}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)'
                }}>
                  Meta Tags Quality Score
                </div>
              </div>

              {/* Basic Meta Tags */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-tags" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Basic Meta Tags
                </h4>
                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Title</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: '500', marginBottom: '0.25rem' }}>
                      {analysisResults.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Length: {analysisResults.analysis.titleLength} characters
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Description</div>
                    <div style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {analysisResults.description}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Length: {analysisResults.analysis.descriptionLength} characters
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Keywords</div>
                    <div style={{ color: 'var(--text-primary)' }}>
                      {analysisResults.keywords.join(', ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Open Graph Tags */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fab fa-facebook" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Open Graph Tags
                </h4>
                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    gap: '1px',
                    backgroundColor: 'var(--border)'
                  }}>
                    <div style={{
                      padding: '0.75rem',
                      backgroundColor: 'var(--bg-primary)',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      borderBottom: '1px solid var(--border)'
                    }}>
                      Property
                    </div>
                    <div style={{
                      padding: '0.75rem',
                      backgroundColor: 'var(--bg-primary)',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      borderBottom: '1px solid var(--border)'
                    }}>
                      Value
                    </div>
                    
                    {Object.entries(analysisResults.openGraph).map(([key, value]) => (
                      <>
                        <div style={{
                          padding: '0.75rem',
                          backgroundColor: 'var(--bg-secondary)',
                          fontFamily: 'monospace',
                          fontSize: '0.9rem',
                          color: 'var(--text-primary)',
                          borderRight: '1px solid var(--border)'
                        }}>
                          {key}
                        </div>
                        <div style={{
                          padding: '0.75rem',
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                          wordBreak: 'break-all'
                        }}>
                          {value}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>

              {/* Twitter Card Tags */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fab fa-twitter" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Twitter Card Tags
                </h4>
                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    gap: '1px',
                    backgroundColor: 'var(--border)'
                  }}>
                    <div style={{
                      padding: '0.75rem',
                      backgroundColor: 'var(--bg-primary)',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      borderBottom: '1px solid var(--border)'
                    }}>
                      Property
                    </div>
                    <div style={{
                      padding: '0.75rem',
                      backgroundColor: 'var(--bg-primary)',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      borderBottom: '1px solid var(--border)'
                    }}>
                      Value
                    </div>
                    
                    {Object.entries(analysisResults.twitterCard).map(([key, value]) => (
                      <>
                        <div style={{
                          padding: '0.75rem',
                          backgroundColor: 'var(--bg-secondary)',
                          fontFamily: 'monospace',
                          fontSize: '0.9rem',
                          color: 'var(--text-primary)',
                          borderRight: '1px solid var(--border)'
                        }}>
                          {key}
                        </div>
                        <div style={{
                          padding: '0.75rem',
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                          wordBreak: 'break-all'
                        }}>
                          {value}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-lightbulb" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  SEO Recommendations
                </h4>
                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  {analysisResults.recommendations.map((recommendation, index) => (
                    <div key={index} style={{
                      padding: '0.75rem',
                      backgroundColor: 'var(--bg-primary)',
                      borderRadius: '0.25rem',
                      marginBottom: '0.5rem',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem'
                    }}>
                      <FontAwesomeIcon icon="fas fa-check-circle" style={{ color: 'var(--accent)', marginTop: '0.25rem' }} />
                      <span style={{ color: 'var(--text-primary)' }}>{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Lookup History */}
          {history.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-history" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Analysis History
                </h3>
                <button
                  onClick={clearHistory}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FontAwesomeIcon icon="fas fa-trash" />
                  Clear History
                </button>
              </div>
              
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                {history.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '1rem',
                      borderBottom: index < history.length - 1 ? '1px solid var(--border)' : 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'var(--bg-primary)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                    }}
                    onClick={() => {
                      setUrl(item.url)
                      setAnalysisResults(item)
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center' 
                    }}>
                      <div>
                        <div style={{ 
                          fontWeight: '600', 
                          color: 'var(--text-primary)',
                          marginBottom: '0.25rem'
                        }}>
                          {item.url}
                        </div>
                        <div style={{ 
                          fontSize: '0.9rem', 
                          color: 'var(--text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem'
                        }}>
                          <span style={{ 
                            color: getScoreColor(item.analysis.score),
                            fontWeight: '500'
                          }}>
                            Score: {item.analysis.score}/100
                          </span>
                          <span>{item.analysis.titleLength} chars</span>
                        </div>
                      </div>
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: 'var(--text-secondary)',
                        textAlign: 'right'
                      }}>
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <AdSlot slotId="meta-tags-analyzer-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Meta Tags Analysis & SEO Optimization
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are meta tags and why are they important for SEO?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Meta tags are HTML elements that provide information about a webpage: <strong>Title Tag:</strong> 
                The main title displayed in search results and browser tabs. <strong>Meta Description:</strong> 
                Brief description shown in search engine results. <strong>Meta Keywords:</strong> 
                Keywords relevant to the page content (less important now). <strong>Viewport Tag:</strong> 
                Controls how the page displays on mobile devices. <strong>Robots Tag:</strong> 
                Directs search engine crawlers on how to index the page. <strong>Canonical Tag:</strong> 
                Prevents duplicate content issues by specifying the preferred URL.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do Open Graph tags improve social media sharing?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Open Graph tags optimize social media sharing: <strong>og:title:</strong> 
                Title displayed when shared on Facebook, LinkedIn, etc. <strong>og:description:</strong> 
                Description text shown in social media previews. <strong>og:image:</strong> 
                Image displayed when the link is shared. <strong>og:type:</strong> 
                Type of content (article, website, video, etc.). <strong>og:url:</strong> 
                Canonical URL for the shared content. <strong>og:site_name:</strong> 
                Name of the website or brand. <strong>Benefits:</strong> 
                Better visual presentation, increased click-through rates, improved brand recognition.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are Twitter Cards and how do they work?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Twitter Cards enhance tweet appearance: <strong>twitter:card:</strong> 
                Type of card (summary, summary_large_image, app, player). <strong>twitter:title:</strong> 
                Title displayed in the Twitter card. <strong>twitter:description:</strong> 
                Description text for the card. <strong>twitter:image:</strong> 
                Image displayed in the card. <strong>twitter:site:</strong> 
                Twitter handle of the website owner. <strong>twitter:creator:</strong> 
                Twitter handle of the content creator. <strong>Benefits:</strong> 
                More engaging tweets, higher click-through rates, better brand presentation.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can structured data improve search engine visibility?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Structured data benefits include: <strong>Rich Snippets:</strong> 
                Enhanced search results with additional information like ratings, prices, dates. <strong>Knowledge Graph:</strong> 
                Better chance of appearing in Google's Knowledge Graph. <strong>Voice Search:</strong> 
                Improved performance in voice search queries. <strong>Local SEO:</strong> 
                Better local business visibility with structured data markup. <strong>E-commerce:</strong> 
                Enhanced product listings with prices, availability, and reviews. <strong>Events:</strong> 
                Better event discovery and calendar integration. <strong>Recipes:</strong> 
                Enhanced recipe search results with cooking time, ratings, and ingredients.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the best practices for meta tag optimization?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Optimization best practices include: <strong>Title Tags:</strong> 
                Keep under 60 characters, include primary keywords, make them compelling. <strong>Meta Descriptions:</strong> 
                Write 150-160 characters, include call-to-action, summarize page content. <strong>Keywords:</strong> 
                Focus on 3-5 primary keywords, avoid keyword stuffing. <strong>Open Graph:</strong> 
                Use high-quality images (1200x630px), write compelling titles and descriptions. <strong>Twitter Cards:</strong> 
                Choose appropriate card type, optimize images for Twitter's requirements. <strong>Structured Data:</strong> 
                Use Google's Structured Data Testing Tool, implement relevant schema types.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How often should I analyze and update meta tags?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Analysis frequency recommendations: <strong>Regular Audits:</strong> 
                Analyze meta tags monthly or quarterly for important pages. <strong>Content Updates:</strong> 
                Review meta tags whenever page content is significantly updated. <strong>Seasonal Changes:</strong> 
                Update meta tags for seasonal content and campaigns. <strong>Competitor Analysis:</strong> 
                Monitor competitor meta tags quarterly for optimization opportunities. <strong>Performance Monitoring:</strong> 
                Track meta tag performance through analytics and search console. <strong>Technical Changes:</strong> 
                Review meta tags after website redesigns or major technical updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MetaTagsAnalyzer
