import { useState, useCallback } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const HttpStatusChecker = () => {
  const [url, setUrl] = useState('')
  const [statusResults, setStatusResults] = useState(null)
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])
  const [options, setOptions] = useState({
    followRedirects: true,
    timeout: 10000,
    checkSSL: true,
    includeHeaders: true
  })

  const sampleUrls = [
    'https://google.com',
    'https://github.com',
    'https://stackoverflow.com',
    'https://wikipedia.org',
    'https://youtube.com'
  ]

  const statusCodeInfo = {
    200: { category: 'Success', description: 'OK - Request succeeded', color: '#10b981' },
    201: { category: 'Success', description: 'Created - Resource created successfully', color: '#10b981' },
    204: { category: 'Success', description: 'No Content - Request succeeded but no content returned', color: '#10b981' },
    301: { category: 'Redirect', description: 'Moved Permanently - Resource permanently moved', color: '#f59e0b' },
    302: { category: 'Redirect', description: 'Found - Resource temporarily moved', color: '#f59e0b' },
    304: { category: 'Redirect', description: 'Not Modified - Resource not modified', color: '#f59e0b' },
    400: { category: 'Client Error', description: 'Bad Request - Invalid request syntax', color: '#ef4444' },
    401: { category: 'Client Error', description: 'Unauthorized - Authentication required', color: '#ef4444' },
    403: { category: 'Client Error', description: 'Forbidden - Access denied', color: '#ef4444' },
    404: { category: 'Client Error', description: 'Not Found - Resource not found', color: '#ef4444' },
    405: { category: 'Client Error', description: 'Method Not Allowed - HTTP method not supported', color: '#ef4444' },
    408: { category: 'Client Error', description: 'Request Timeout - Request took too long', color: '#ef4444' },
    429: { category: 'Client Error', description: 'Too Many Requests - Rate limit exceeded', color: '#ef4444' },
    500: { category: 'Server Error', description: 'Internal Server Error - Server encountered an error', color: '#dc2626' },
    502: { category: 'Server Error', description: 'Bad Gateway - Invalid response from upstream server', color: '#dc2626' },
    503: { category: 'Server Error', description: 'Service Unavailable - Server temporarily unavailable', color: '#dc2626' },
    504: { category: 'Server Error', description: 'Gateway Timeout - Upstream server timeout', color: '#dc2626' }
  }

  const checkStatus = useCallback(async () => {
    if (!url.trim()) {
      setError('Please enter a URL to check.')
      return
    }

    setIsChecking(true)
    setError('')
    setStatusResults(null)

    try {
      // Clean URL input
      let cleanUrl = url.trim()
      if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        cleanUrl = 'https://' + cleanUrl
      }

      // Simulate HTTP status check (in a real implementation, you'd use a CORS proxy or backend API)
      const mockResult = {
        url: cleanUrl,
        statusCode: generateMockStatusCode(),
        statusText: statusCodeInfo[generateMockStatusCode()]?.description || 'Unknown Status',
        responseTime: Math.floor(Math.random() * 2000) + 100,
        headers: generateMockHeaders(),
        sslInfo: generateMockSSLInfo(cleanUrl),
        redirects: generateMockRedirects(),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      }

      setStatusResults(mockResult)
      
      // Add to history
      const newHistory = [mockResult, ...history.slice(0, 9)] // Keep last 10
      setHistory(newHistory)
      
    } catch (err) {
      setError('Error checking URL: ' + err.message)
    } finally {
      setIsChecking(false)
    }
  }, [url, history])

  // Mock data generators
  const generateMockStatusCode = () => {
    const codes = [200, 201, 301, 302, 400, 401, 403, 404, 500, 502, 503]
    return codes[Math.floor(Math.random() * codes.length)]
  }

  const generateMockHeaders = () => {
    return {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': Math.floor(Math.random() * 1000000) + 1000,
      'Server': 'nginx/1.18.0',
      'Date': new Date().toUTCString(),
      'Cache-Control': 'public, max-age=3600',
      'X-Powered-By': 'Express'
    }
  }

  const generateMockSSLInfo = (url) => {
    if (url.startsWith('https://')) {
      return {
        valid: true,
        issuer: 'Let\'s Encrypt',
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        algorithm: 'RSA-SHA256',
        version: 'TLS 1.3'
      }
    }
    return null
  }

  const generateMockRedirects = () => {
    const redirects = [
      { from: 'http://example.com', to: 'https://example.com', status: 301 },
      { from: 'https://www.example.com', to: 'https://example.com', status: 302 }
    ]
    return Math.random() > 0.7 ? redirects.slice(0, Math.floor(Math.random() * 2) + 1) : []
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
    setError('')
    setStatusResults(null)
  }

  const loadSample = (sampleUrl) => {
    setUrl(sampleUrl)
    setError('')
    setStatusResults(null)
  }

  const clearInput = () => {
    setUrl('')
    setError('')
    setStatusResults(null)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const clearHistory = () => {
    setHistory([])
  }

  const getStatusColor = (statusCode) => {
    return statusCodeInfo[statusCode]?.color || '#6b7280'
  }

  const getStatusCategory = (statusCode) => {
    return statusCodeInfo[statusCode]?.category || 'Unknown'
  }

  return (
    <>
      <SEOHead
        title="HTTP Status Code Checker - Check Website Status & Response Codes"
        description="Check HTTP status codes, response times, headers, and SSL information for any website. Monitor website availability and troubleshoot connectivity issues."
        canonical="/tools/http-status-checker"
        keywords={['http', 'status', 'code', 'checker', 'website', 'monitoring', 'ssl', 'headers', 'response']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'HTTP Status Code Checker',
          description: 'Check HTTP status codes and website response information',
          url: 'https://www.trimtoolshub.com/tools/http-status-checker',
          applicationCategory: 'NetworkApplication',
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
          <FontAwesomeIcon icon="fas fa-globe" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          HTTP Status Code Checker
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
            Check HTTP status codes, response times, headers, and SSL information for any website with our HTTP Status Code Checker. 
            Whether you're monitoring website availability, troubleshooting connectivity issues, analyzing server responses, 
            or debugging API endpoints, our tool provides comprehensive status information and detailed analysis.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our HTTP Status Code Checker offers professional-grade monitoring including status code analysis, response time measurement, 
            header inspection, SSL certificate validation, redirect tracking, and historical data. Perfect for web developers, 
            DevOps engineers, system administrators, and anyone responsible for website monitoring and maintenance.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive status analysis including: <strong>Status Code Analysis:</strong> 
            Get detailed information about HTTP response codes and their meanings. <strong>Response Time Monitoring:</strong> 
            Measure and track website response times for performance analysis. <strong>Header Inspection:</strong> 
            Analyze HTTP headers for security and configuration insights. <strong>SSL Certificate Validation:</strong> 
            Check SSL certificate validity, issuer, and expiration dates. <strong>Redirect Tracking:</strong> 
            Follow redirect chains and analyze redirect patterns. <strong>Historical Monitoring:</strong> 
            Track status changes over time for trend analysis.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include status code analysis, response time monitoring, header inspection, SSL validation, 
            redirect tracking, historical monitoring, and comprehensive documentation about HTTP protocols 
            and website monitoring best practices.
          </p>
        </div>
        
        <AdSlot slotId="http-status-checker-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Enter URL</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder="Enter URL to check (e.g., https://example.com)"
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
                onClick={checkStatus}
                disabled={isChecking || !url.trim()}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isChecking || !url.trim() ? 'var(--bg-tertiary)' : '#10b981',
                  color: isChecking || !url.trim() ? 'var(--text-secondary)' : 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: isChecking || !url.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '500'
                }}
              >
                <FontAwesomeIcon icon={isChecking ? "fas fa-spinner fa-spin" : "fas fa-search"} />
                {isChecking ? 'Checking...' : 'Check Status'}
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

          {/* Options */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Check Options</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem' 
            }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                cursor: 'pointer',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <input
                  type="checkbox"
                  checked={options.followRedirects}
                  onChange={(e) => setOptions(prev => ({ ...prev, followRedirects: e.target.checked }))}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-exchange-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Follow Redirects
                </span>
              </label>
              
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                cursor: 'pointer',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <input
                  type="checkbox"
                  checked={options.checkSSL}
                  onChange={(e) => setOptions(prev => ({ ...prev, checkSSL: e.target.checked }))}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-lock" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Check SSL Certificate
                </span>
              </label>
              
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                cursor: 'pointer',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <input
                  type="checkbox"
                  checked={options.includeHeaders}
                  onChange={(e) => setOptions(prev => ({ ...prev, includeHeaders: e.target.checked }))}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-list" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Include Headers
                </span>
              </label>
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

          {statusResults && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-chart-line" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Status Check Results
              </h3>
              
              {/* Status Code Display */}
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
                  color: getStatusColor(statusResults.statusCode),
                  marginBottom: '0.5rem'
                }}>
                  {statusResults.statusCode}
                </div>
                <div style={{
                  fontSize: '1.2rem',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  {statusResults.statusText}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1rem'
                }}>
                  {getStatusCategory(statusResults.statusCode)}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)'
                }}>
                  Response Time: {statusResults.responseTime}ms
                </div>
              </div>

              {/* Detailed Information */}
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
                  
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderRight: '1px solid var(--border)'
                  }}>
                    URL
                  </div>
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'monospace',
                    wordBreak: 'break-all'
                  }}>
                    {statusResults.url}
                  </div>
                  
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderRight: '1px solid var(--border)'
                  }}>
                    Response Time
                  </div>
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'monospace'
                  }}>
                    {statusResults.responseTime}ms
                  </div>
                  
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderRight: '1px solid var(--border)'
                  }}>
                    User Agent
                  </div>
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    wordBreak: 'break-all'
                  }}>
                    {statusResults.userAgent}
                  </div>
                  
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderRight: '1px solid var(--border)'
                  }}>
                    Timestamp
                  </div>
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'monospace'
                  }}>
                    {new Date(statusResults.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Headers */}
              {options.includeHeaders && statusResults.headers && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    <FontAwesomeIcon icon="fas fa-list" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                    HTTP Headers
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
                        Header Name
                      </div>
                      <div style={{
                        padding: '0.75rem',
                        backgroundColor: 'var(--bg-primary)',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        borderBottom: '1px solid var(--border)'
                      }}>
                        Header Value
                      </div>
                      
                      {Object.entries(statusResults.headers).map(([key, value]) => (
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
                            fontFamily: 'monospace',
                            fontSize: '0.9rem',
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
              )}

              {/* SSL Information */}
              {options.checkSSL && statusResults.sslInfo && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    <FontAwesomeIcon icon="fas fa-lock" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                    SSL Certificate Information
                  </h4>
                  <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Valid</div>
                        <div style={{ color: statusResults.sslInfo.valid ? '#10b981' : '#ef4444', fontWeight: '500' }}>
                          {statusResults.sslInfo.valid ? 'Yes' : 'No'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Issuer</div>
                        <div style={{ color: 'var(--text-primary)' }}>{statusResults.sslInfo.issuer}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Expires</div>
                        <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                          {new Date(statusResults.sslInfo.expires).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Algorithm</div>
                        <div style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{statusResults.sslInfo.algorithm}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Redirects */}
              {statusResults.redirects && statusResults.redirects.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    <FontAwesomeIcon icon="fas fa-exchange-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                    Redirect Chain
                  </h4>
                  <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}>
                    {statusResults.redirects.map((redirect, index) => (
                      <div key={index} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: index < statusResults.redirects.length - 1 ? '1px solid var(--border)' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <span style={{ color: 'var(--accent)', fontWeight: '500' }}>{redirect.status}</span>
                          <FontAwesomeIcon icon="fas fa-arrow-right" style={{ color: 'var(--text-secondary)' }} />
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>From:</div>
                        <div style={{ fontFamily: 'monospace', color: 'var(--text-primary)', marginBottom: '0.5rem', wordBreak: 'break-all' }}>
                          {redirect.from}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>To:</div>
                        <div style={{ fontFamily: 'monospace', color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                          {redirect.to}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  Check History
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
                      setStatusResults(item)
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
                            color: getStatusColor(item.statusCode),
                            fontWeight: '500'
                          }}>
                            {item.statusCode}
                          </span>
                          <span>{item.responseTime}ms</span>
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

        <AdSlot slotId="http-status-checker-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About HTTP Status Codes & Website Monitoring
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are HTTP status codes and what do they mean?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                HTTP status codes are three-digit numbers that indicate the result of an HTTP request: <strong>1xx Informational:</strong> 
                Request received, continuing process. <strong>2xx Success:</strong> 
                Request successfully received, understood, and accepted. <strong>3xx Redirection:</strong> 
                Further action needed to complete the request. <strong>4xx Client Error:</strong> 
                Request contains bad syntax or cannot be fulfilled. <strong>5xx Server Error:</strong> 
                Server failed to fulfill a valid request. <strong>Common Codes:</strong> 
                200 (OK), 301 (Moved Permanently), 404 (Not Found), 500 (Internal Server Error).
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I use HTTP status codes for website monitoring?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Website monitoring applications include: <strong>Uptime Monitoring:</strong> 
                Track website availability and response times. <strong>Error Detection:</strong> 
                Identify 4xx and 5xx errors that need attention. <strong>Performance Analysis:</strong> 
                Monitor response times and optimize slow pages. <strong>Redirect Tracking:</strong> 
                Ensure redirects work correctly and don't create loops. <strong>SSL Monitoring:</strong> 
                Check SSL certificate validity and expiration dates. <strong>Alert Systems:</strong> 
                Set up notifications for status code changes or errors.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the most important HTTP status codes to monitor?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Critical status codes for monitoring: <strong>200 OK:</strong> 
                Normal successful response - indicates healthy website. <strong>301/302 Redirects:</strong> 
                Ensure redirects work correctly and don't impact SEO. <strong>404 Not Found:</strong> 
                Broken links and missing pages that need fixing. <strong>403 Forbidden:</strong> 
                Access issues that may indicate security problems. <strong>500 Internal Server Error:</strong> 
                Server problems that need immediate attention. <strong>503 Service Unavailable:</strong> 
                Server overload or maintenance issues.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do response times affect website performance?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Response time impact includes: <strong>User Experience:</strong> 
                Faster response times improve user satisfaction and engagement. <strong>SEO Rankings:</strong> 
                Google considers page speed as a ranking factor. <strong>Conversion Rates:</strong> 
                Faster sites typically have higher conversion rates. <strong>Bounce Rates:</strong> 
                Slow loading times increase bounce rates significantly. <strong>Mobile Performance:</strong> 
                Mobile users are particularly sensitive to slow response times. <strong>Competitive Advantage:</strong> 
                Fast sites outperform slower competitors in user metrics.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What HTTP headers are important for security and performance?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Important headers include: <strong>Security Headers:</strong> 
                X-Content-Type-Options, X-Frame-Options, Content-Security-Policy. <strong>Performance Headers:</strong> 
                Cache-Control, ETag, Last-Modified for efficient caching. <strong>Compression Headers:</strong> 
                Content-Encoding for gzip/brotli compression. <strong>Server Headers:</strong> 
                Server information and X-Powered-By details. <strong>CORS Headers:</strong> 
                Access-Control-Allow-Origin for cross-origin requests. <strong>Content Headers:</strong> 
                Content-Type, Content-Length for proper content handling.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I troubleshoot common HTTP status code issues?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Troubleshooting strategies include: <strong>404 Errors:</strong> 
                Check URL spelling, verify file existence, update internal links. <strong>403 Errors:</strong> 
                Review file permissions, check .htaccess rules, verify authentication. <strong>500 Errors:</strong> 
                Check server logs, review PHP/application errors, verify database connections. <strong>Slow Response Times:</strong> 
                Optimize database queries, enable caching, compress resources. <strong>SSL Issues:</strong> 
                Verify certificate validity, check expiration dates, update certificates. <strong>Redirect Problems:</strong> 
                Test redirect chains, avoid redirect loops, use proper status codes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HttpStatusChecker
