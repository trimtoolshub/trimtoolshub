import { useState, useEffect } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const WhatIsMyUserAgent = () => {
  const [userAgent, setUserAgent] = useState('')
  const [parsedInfo, setParssedInfo] = useState({})

  useEffect(() => {
    const ua = navigator.userAgent
    setUserAgent(ua)
    
    // Parse user agent information
    const info = {
      browser: getBrowser(ua),
      os: getOS(ua),
      device: getDevice(ua),
      engine: getEngine(ua),
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screenResolution: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
    
    setParssedInfo(info)
  }, [])

  const getBrowser = (ua) => {
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Google Chrome'
    if (ua.includes('Firefox')) return 'Mozilla Firefox'
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari'
    if (ua.includes('Edg')) return 'Microsoft Edge'
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera'
    if (ua.includes('Trident')) return 'Internet Explorer'
    return 'Unknown Browser'
  }

  const getOS = (ua) => {
    if (ua.includes('Windows NT 10.0')) return 'Windows 10/11'
    if (ua.includes('Windows NT 6.3')) return 'Windows 8.1'
    if (ua.includes('Windows NT 6.2')) return 'Windows 8'
    if (ua.includes('Windows NT 6.1')) return 'Windows 7'
    if (ua.includes('Mac OS X')) return 'macOS'
    if (ua.includes('Linux')) return 'Linux'
    if (ua.includes('Android')) return 'Android'
    if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS'
    return 'Unknown OS'
  }

  const getDevice = (ua) => {
    if (ua.includes('Mobile')) return 'Mobile'
    if (ua.includes('Tablet')) return 'Tablet'
    if (ua.includes('iPad')) return 'Tablet (iPad)'
    if (ua.includes('iPhone')) return 'Mobile (iPhone)'
    return 'Desktop'
  }

  const getEngine = (ua) => {
    if (ua.includes('Chrome')) return 'Blink'
    if (ua.includes('Firefox')) return 'Gecko'
    if (ua.includes('Safari')) return 'WebKit'
    if (ua.includes('Trident')) return 'Trident'
    return 'Unknown Engine'
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const downloadInfo = () => {
    const infoText = `User Agent Information
=====================

User Agent: ${userAgent}
Browser: ${parsedInfo.browser}
Operating System: ${parsedInfo.os}
Device Type: ${parsedInfo.device}
Engine: ${parsedInfo.engine}
Language: ${parsedInfo.language}
Platform: ${parsedInfo.platform}
Screen Resolution: ${parsedInfo.screenResolution}
Color Depth: ${parsedInfo.colorDepth} bits
Timezone: ${parsedInfo.timezone}
Cookies Enabled: ${parsedInfo.cookieEnabled ? 'Yes' : 'No'}
Online Status: ${parsedInfo.onLine ? 'Online' : 'Offline'}

Generated on: ${new Date().toLocaleString()}`

    const blob = new Blob([infoText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'user-agent-info.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
        <FontAwesomeIcon icon="fas fa-desktop" style={{ color: 'var(--accent)' }} />
        What Is My User Agent?
      </h2>
      
      <p style={{ 
        fontSize: '1.125rem', 
        color: 'var(--text-secondary)', 
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Discover detailed information about your browser, operating system, and device. 
        Your user agent string reveals technical details that websites use to optimize 
        content delivery and functionality.
      </p>

      {/* User Agent String */}
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
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FontAwesomeIcon icon="fas fa-code" style={{ color: 'var(--accent)' }} />
          Your User Agent String
        </h3>
        
        <div style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          padding: '1rem', 
          borderRadius: '0.5rem', 
          border: '1px solid var(--border)',
          marginBottom: '1rem'
        }}>
          <code style={{ 
            fontSize: '0.875rem', 
            color: 'var(--text-primary)', 
            wordBreak: 'break-all',
            lineHeight: '1.5'
          }}>
            {userAgent}
          </code>
        </div>
        
        <button
          onClick={() => copyToClipboard(userAgent)}
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
          <FontAwesomeIcon icon="fas fa-copy" style={{ marginRight: '0.5rem' }} />
          Copy User Agent
        </button>
      </div>

      {/* Parsed Information */}
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
          marginBottom: '1.5rem' 
        }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ color: 'var(--accent)' }} />
            Parsed Information
          </h3>
          <button
            onClick={downloadInfo}
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
            <FontAwesomeIcon icon="fas fa-download" style={{ marginRight: '0.5rem' }} />
            Download Info
          </button>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          <div style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            padding: '1.5rem', 
            borderRadius: '0.75rem',
            border: '1px solid var(--border)'
          }}>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              color: 'var(--text-primary)', 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FontAwesomeIcon icon="fas fa-globe" style={{ color: 'var(--accent)' }} />
              Browser Information
            </h4>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Browser:</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>{parsedInfo.browser}</span>
              </div>
              <div>
                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Engine:</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>{parsedInfo.engine}</span>
              </div>
              <div>
                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Language:</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>{parsedInfo.language}</span>
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            padding: '1.5rem', 
            borderRadius: '0.75rem',
            border: '1px solid var(--border)'
          }}>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              color: 'var(--text-primary)', 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FontAwesomeIcon icon="fas fa-laptop" style={{ color: 'var(--accent)' }} />
              System Information
            </h4>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Operating System:</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>{parsedInfo.os}</span>
              </div>
              <div>
                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Platform:</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>{parsedInfo.platform}</span>
              </div>
              <div>
                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Device Type:</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>{parsedInfo.device}</span>
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            padding: '1.5rem', 
            borderRadius: '0.75rem',
            border: '1px solid var(--border)'
          }}>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              color: 'var(--text-primary)', 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FontAwesomeIcon icon="fas fa-desktop" style={{ color: 'var(--accent)' }} />
              Display Information
            </h4>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Screen Resolution:</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>{parsedInfo.screenResolution}</span>
              </div>
              <div>
                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Color Depth:</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>{parsedInfo.colorDepth} bits</span>
              </div>
              <div>
                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Timezone:</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>{parsedInfo.timezone}</span>
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            padding: '1.5rem', 
            borderRadius: '0.75rem',
            border: '1px solid var(--border)'
          }}>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              color: 'var(--text-primary)', 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FontAwesomeIcon icon="fas fa-cog" style={{ color: 'var(--accent)' }} />
              Browser Settings
            </h4>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Cookies Enabled:</span>
                <span style={{ 
                  color: parsedInfo.cookieEnabled ? 'var(--success)' : 'var(--danger)', 
                  marginLeft: '0.5rem',
                  fontWeight: '500'
                }}>
                  {parsedInfo.cookieEnabled ? 'Yes' : 'No'}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Online Status:</span>
                <span style={{ 
                  color: parsedInfo.onLine ? 'var(--success)' : 'var(--danger)', 
                  marginLeft: '0.5rem',
                  fontWeight: '500'
                }}>
                  {parsedInfo.onLine ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          About User Agent Strings & Browser Detection
        </h3>
        
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              What is a User Agent String?
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              A user agent string is a text identifier that browsers send to websites to identify themselves. 
              It contains information about the browser, operating system, device type, and other technical details 
              that help websites deliver optimized content.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Why Do Websites Need This Information?
            </h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
              <li>Optimize content for different browsers</li>
              <li>Detect mobile devices for responsive design</li>
              <li>Provide browser-specific features</li>
              <li>Track analytics and compatibility</li>
              <li>Block malicious bots and crawlers</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Privacy Considerations
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              While user agent strings don't contain personal information, they can be used for fingerprinting. 
              Some browsers offer options to send minimal user agent strings or allow users to customize them 
              for enhanced privacy.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Common Use Cases
            </h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
              <li>Web development and testing</li>
              <li>Browser compatibility checking</li>
              <li>Analytics and user behavior tracking</li>
              <li>Security and fraud detection</li>
              <li>Content optimization and personalization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatIsMyUserAgent
