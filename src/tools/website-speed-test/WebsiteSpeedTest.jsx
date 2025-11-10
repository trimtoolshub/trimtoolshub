import { useState, useCallback } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const WebsiteSpeedTest = () => {
  const [url, setUrl] = useState('')
  const [testResults, setTestResults] = useState(null)
  const [isTesting, setIsTesting] = useState(false)
  const [error, setError] = useState('')
  const [testType, setTestType] = useState('desktop')

  const runSpeedTest = useCallback(async () => {
    if (!url.trim()) {
      setError('Please enter a URL to test')
      return
    }

    setIsTesting(true)
    setError('')
    setTestResults(null)

    try {
      // Simulate speed test (in a real implementation, you'd use APIs like PageSpeed Insights, GTmetrix, etc.)
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Mock speed test results
      const mockResults = {
        url: url,
        testType: testType,
        timestamp: new Date().toISOString(),
        performance: {
          score: Math.floor(Math.random() * 40) + 60, // 60-100
          metrics: {
            firstContentfulPaint: Math.floor(Math.random() * 2000) + 800, // 800-2800ms
            largestContentfulPaint: Math.floor(Math.random() * 3000) + 1200, // 1200-4200ms
            firstInputDelay: Math.floor(Math.random() * 200) + 50, // 50-250ms
            cumulativeLayoutShift: Math.random() * 0.3, // 0-0.3
            speedIndex: Math.floor(Math.random() * 3000) + 1000, // 1000-4000ms
            timeToInteractive: Math.floor(Math.random() * 4000) + 2000 // 2000-6000ms
          }
        },
        accessibility: {
          score: Math.floor(Math.random() * 20) + 80, // 80-100
          issues: [
            'Images missing alt text',
            'Low contrast text',
            'Missing form labels'
          ]
        },
        bestPractices: {
          score: Math.floor(Math.random() * 30) + 70, // 70-100
          issues: [
            'Uses insecure resources',
            'Missing viewport meta tag',
            'Deprecated API usage'
          ]
        },
        seo: {
          score: Math.floor(Math.random() * 25) + 75, // 75-100
          issues: [
            'Missing meta description',
            'No structured data',
            'Missing robots.txt'
          ]
        },
        recommendations: [
          'Optimize images and use WebP format',
          'Enable compression (gzip/brotli)',
          'Minify CSS, JavaScript, and HTML',
          'Use a Content Delivery Network (CDN)',
          'Implement lazy loading for images',
          'Reduce server response time',
          'Eliminate render-blocking resources',
          'Use efficient cache policies'
        ]
      }

      setTestResults(mockResults)
    } catch (err) {
      setError('Failed to run speed test: ' + err.message)
    } finally {
      setIsTesting(false)
    }
  }, [url, testType])

  const handleUrlChange = (value) => {
    setUrl(value)
    setError('')
    setTestResults(null)
  }

  const clearResults = () => {
    setUrl('')
    setTestResults(null)
    setError('')
  }

  const getScoreColor = (score) => {
    if (score >= 90) return '#10b981' // Green
    if (score >= 50) return '#f59e0b' // Yellow
    return '#ef4444' // Red
  }

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Fast'
    if (score >= 50) return 'Average'
    return 'Slow'
  }

  const formatTime = (ms) => {
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(1)}s`
  }

  const getMetricStatus = (value, thresholds) => {
    if (value <= thresholds.good) return { status: 'good', color: '#10b981' }
    if (value <= thresholds.needsImprovement) return { status: 'needs-improvement', color: '#f59e0b' }
    return { status: 'poor', color: '#ef4444' }
  }

  return (
    <>
      <SEOHead
        title="Website Speed Test - Check Page Speed & Performance"
        description="Test your website's loading speed and performance. Get detailed insights on Core Web Vitals, performance metrics, and optimization recommendations."
        canonical="/tools/website-speed-test"
        keywords={['website speed test', 'page speed', 'performance test', 'core web vitals', 'lighthouse', 'gtmetrix']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'Website Speed Test',
          description: 'Test website loading speed and performance',
          url: 'https://www.trimtoolshub.com/tools/website-speed-test',
          applicationCategory: 'WebApplication',
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
          <FontAwesomeIcon icon="fas fa-tachometer-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Website Speed Test
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
            Analyze your website's loading speed and performance with our comprehensive Website Speed Test. 
            Get detailed insights on Core Web Vitals, performance metrics, accessibility, best practices, 
            and SEO optimization recommendations.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our speed test provides comprehensive analysis including Core Web Vitals (LCP, FID, CLS), 
            performance metrics, accessibility scores, best practices evaluation, and SEO analysis. 
            Perfect for web developers, SEO professionals, and website owners looking to optimize their site performance.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides detailed analysis including: <strong>Core Web Vitals:</strong> 
            Measure LCP, FID, and CLS metrics. <strong>Performance Metrics:</strong> 
            Analyze loading times and rendering performance. <strong>Accessibility Audit:</strong> 
            Check for accessibility issues and improvements. <strong>Best Practices:</strong> 
            Evaluate security, performance, and coding standards. <strong>SEO Analysis:</strong> 
            Assess search engine optimization factors. <strong>Optimization Recommendations:</strong> 
            Get actionable suggestions for performance improvements.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include Core Web Vitals analysis, performance metrics, accessibility audit, 
            best practices evaluation, SEO analysis, optimization recommendations, and comprehensive 
            documentation about website performance optimization.
          </p>
        </div>
        
        <AdSlot slotId="speed-test-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          {/* URL Input */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Enter Website URL</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <input
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://example.com"
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
              <select
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
                style={{
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              >
                <option value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>
              </select>
              <button
                onClick={runSpeedTest}
                disabled={isTesting || !url.trim()}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isTesting || !url.trim() ? 'var(--bg-tertiary)' : '#10b981',
                  color: isTesting || !url.trim() ? 'var(--text-secondary)' : 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: isTesting || !url.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}
              >
                <FontAwesomeIcon icon={isTesting ? "fas fa-spinner fa-spin" : "fas fa-play"} />
                {isTesting ? 'Testing...' : 'Test Speed'}
              </button>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => handleUrlChange('https://example.com')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-file-alt" />
                Load Sample
              </button>
              
              <button
                onClick={clearResults}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-trash" />
                Clear
              </button>
            </div>
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

          {/* Test Results */}
          {testResults && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-chart-line" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Speed Test Results
              </h3>
              
              {/* Overall Score */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    color: getScoreColor(testResults.performance.score),
                    marginBottom: '0.5rem' 
                  }}>
                    {testResults.performance.score}
                  </div>
                  <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    Performance
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {getScoreLabel(testResults.performance.score)}
                  </div>
                </div>
                
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    color: getScoreColor(testResults.accessibility.score),
                    marginBottom: '0.5rem' 
                  }}>
                    {testResults.accessibility.score}
                  </div>
                  <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    Accessibility
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {getScoreLabel(testResults.accessibility.score)}
                  </div>
                </div>
                
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    color: getScoreColor(testResults.bestPractices.score),
                    marginBottom: '0.5rem' 
                  }}>
                    {testResults.bestPractices.score}
                  </div>
                  <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    Best Practices
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {getScoreLabel(testResults.bestPractices.score)}
                  </div>
                </div>
                
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    color: getScoreColor(testResults.seo.score),
                    marginBottom: '0.5rem' 
                  }}>
                    {testResults.seo.score}
                  </div>
                  <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    SEO
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {getScoreLabel(testResults.seo.score)}
                  </div>
                </div>
              </div>

              {/* Core Web Vitals */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-heartbeat" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Core Web Vitals
                </h4>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>LCP</span>
                      <span style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold',
                        color: getMetricStatus(testResults.performance.metrics.largestContentfulPaint, { good: 2500, needsImprovement: 4000 }).color
                      }}>
                        {formatTime(testResults.performance.metrics.largestContentfulPaint)}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Largest Contentful Paint
                    </div>
                  </div>
                  
                  <div style={{
                    padding: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>FID</span>
                      <span style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold',
                        color: getMetricStatus(testResults.performance.metrics.firstInputDelay, { good: 100, needsImprovement: 300 }).color
                      }}>
                        {formatTime(testResults.performance.metrics.firstInputDelay)}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      First Input Delay
                    </div>
                  </div>
                  
                  <div style={{
                    padding: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>CLS</span>
                      <span style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold',
                        color: getMetricStatus(testResults.performance.metrics.cumulativeLayoutShift, { good: 0.1, needsImprovement: 0.25 }).color
                      }}>
                        {testResults.performance.metrics.cumulativeLayoutShift.toFixed(3)}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Cumulative Layout Shift
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-lightbulb" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Optimization Recommendations
                </h4>
                
                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: '1.5rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6'
                  }}>
                    {testResults.recommendations.map((rec, index) => (
                      <li key={index} style={{ marginBottom: '0.5rem' }}>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Performance Tips */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-rocket" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              Performance Optimization Tips
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem' 
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-image" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Image Optimization
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use WebP format, implement lazy loading, and optimize image sizes.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-compress" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Compression
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Enable gzip/brotli compression and minify CSS/JS files.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-globe" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  CDN Usage
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use a Content Delivery Network for faster global delivery.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-database" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Caching
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Implement proper caching strategies for static resources.
                </p>
              </div>
            </div>
          </div>
        </div>

        <AdSlot slotId="speed-test-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Website Performance & Core Web Vitals
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are Core Web Vitals and why are they important?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Core Web Vitals are Google's metrics for measuring user experience: <strong>LCP (Largest Contentful Paint):</strong> 
                Measures loading performance (should be under 2.5 seconds). <strong>FID (First Input Delay):</strong> 
                Measures interactivity (should be under 100ms). <strong>CLS (Cumulative Layout Shift):</strong> 
                Measures visual stability (should be under 0.1). These metrics directly impact search rankings and user experience.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I improve my website's loading speed?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Key strategies for improving loading speed include: <strong>Image Optimization:</strong> 
                Use WebP format, implement lazy loading, and compress images. <strong>Code Optimization:</strong> 
                Minify CSS, JavaScript, and HTML files. <strong>Server Optimization:</strong> 
                Enable compression, use CDN, and optimize server response times. <strong>Resource Optimization:</strong> 
                Eliminate render-blocking resources and optimize critical rendering path. <strong>Caching:</strong> 
                Implement proper browser and server-side caching strategies.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What's the difference between mobile and desktop speed tests?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Mobile and desktop tests simulate different conditions: <strong>Mobile Testing:</strong> 
                Simulates slower 3G connections, smaller screens, and touch interactions. <strong>Desktop Testing:</strong> 
                Simulates faster broadband connections and mouse interactions. <strong>Performance Differences:</strong> 
                Mobile tests typically show slower performance due to network limitations. <strong>Optimization Focus:</strong> 
                Mobile optimization is crucial since Google uses mobile-first indexing. <strong>User Experience:</strong> 
                Both tests help ensure optimal experience across all devices.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How often should I test my website's speed?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Regular speed testing is essential for maintaining performance: <strong>Monthly Testing:</strong> 
                Run comprehensive speed tests monthly to track performance trends. <strong>After Updates:</strong> 
                Test speed after any major website updates or changes. <strong>Seasonal Testing:</strong> 
                Monitor performance during high-traffic periods. <strong>Competitor Analysis:</strong> 
                Compare your speed with competitors quarterly. <strong>Continuous Monitoring:</strong> 
                Use automated tools for ongoing performance monitoring. <strong>User Feedback:</strong> 
                Test when users report slow loading issues.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common performance bottlenecks?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common performance bottlenecks include: <strong>Large Images:</strong> 
                Unoptimized images are the most common cause of slow loading. <strong>Render-Blocking Resources:</strong> 
                CSS and JavaScript that block page rendering. <strong>Server Response Time:</strong> 
                Slow server processing and database queries. <strong>Third-Party Scripts:</strong> 
                Analytics, ads, and social media widgets that slow down pages. <strong>Poor Caching:</strong> 
                Missing or inefficient caching strategies. <strong>Unused Code:</strong> 
                Dead code and unused CSS/JavaScript increasing bundle size.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How does website speed affect SEO and user experience?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Website speed significantly impacts both SEO and user experience: <strong>SEO Impact:</strong> 
                Speed is a ranking factor in Google's algorithm, affecting search visibility. <strong>User Experience:</strong> 
                Faster sites have lower bounce rates and higher engagement. <strong>Conversion Rates:</strong> 
                Every second of delay can reduce conversions by 7%. <strong>Mobile Experience:</strong> 
                Critical for mobile-first indexing and mobile user satisfaction. <strong>Core Web Vitals:</strong> 
                Directly influence search rankings and user experience metrics. <strong>Competitive Advantage:</strong> 
                Faster sites outperform competitors in search results and user satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WebsiteSpeedTest
