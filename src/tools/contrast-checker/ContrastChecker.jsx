import { useState, useCallback, useEffect } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const ContrastChecker = () => {
  const [foregroundColor, setForegroundColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [contrastResults, setContrastResults] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])

  const sampleColorPairs = [
    { fg: '#000000', bg: '#ffffff', name: 'Black on White' },
    { fg: '#ffffff', bg: '#000000', name: 'White on Black' },
    { fg: '#0066cc', bg: '#ffffff', name: 'Blue on White' },
    { fg: '#ffffff', bg: '#0066cc', name: 'White on Blue' },
    { fg: '#333333', bg: '#f0f0f0', name: 'Dark Gray on Light Gray' },
    { fg: '#ff0000', bg: '#ffffff', name: 'Red on White' }
  ]

  const calculateContrast = useCallback(async () => {
    if (!foregroundColor || !backgroundColor) {
      setError('Please select both foreground and background colors.')
      return
    }

    setIsProcessing(true)
    setError('')
    setContrastResults(null)

    try {
      const fgRgb = hexToRgb(foregroundColor)
      const bgRgb = hexToRgb(backgroundColor)

      if (!fgRgb || !bgRgb) {
        throw new Error('Invalid color format')
      }

      const contrastRatio = calculateContrastRatio(fgRgb, bgRgb)
      const wcagLevel = getWcagLevel(contrastRatio)
      const recommendations = getRecommendations(contrastRatio, wcagLevel)

      const result = {
        foregroundColor,
        backgroundColor,
        foregroundRgb: fgRgb,
        backgroundRgb: bgRgb,
        contrastRatio: contrastRatio.toFixed(2),
        wcagLevel,
        recommendations,
        timestamp: new Date().toISOString()
      }

      setContrastResults(result)
      
      // Add to history
      const newHistory = [result, ...history.slice(0, 9)] // Keep last 10
      setHistory(newHistory)
      
    } catch (err) {
      setError('Error calculating contrast: ' + err.message)
    } finally {
      setIsProcessing(false)
    }
  }, [foregroundColor, backgroundColor, history])

  // Helper functions
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const getLuminance = (rgb) => {
    const { r, g, b } = rgb
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const calculateContrastRatio = (rgb1, rgb2) => {
    const lum1 = getLuminance(rgb1)
    const lum2 = getLuminance(rgb2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    return (brightest + 0.05) / (darkest + 0.05)
  }

  const getWcagLevel = (ratio) => {
    if (ratio >= 7) return { level: 'AAA', description: 'Enhanced', color: '#10b981' }
    if (ratio >= 4.5) return { level: 'AA', description: 'Standard', color: '#f59e0b' }
    if (ratio >= 3) return { level: 'A', description: 'Large Text', color: '#ef4444' }
    return { level: 'Fail', description: 'Insufficient', color: '#dc2626' }
  }

  const getRecommendations = (ratio, wcagLevel) => {
    const recommendations = []
    
    if (ratio < 3) {
      recommendations.push('Contrast ratio is too low for any text size. Consider using darker/lighter colors.')
    } else if (ratio < 4.5) {
      recommendations.push('Contrast ratio is insufficient for normal text. Use only for large text (18pt+).')
    } else if (ratio < 7) {
      recommendations.push('Good contrast for normal text. Consider improving for enhanced accessibility.')
    } else {
      recommendations.push('Excellent contrast ratio! Meets WCAG AAA standards.')
    }

    if (wcagLevel.level === 'Fail') {
      recommendations.push('Try adjusting colors to increase contrast difference.')
      recommendations.push('Consider using color contrast tools to find better combinations.')
    }

    return recommendations
  }

  const handleColorChange = (color, type) => {
    if (type === 'foreground') {
      setForegroundColor(color)
    } else {
      setBackgroundColor(color)
    }
    setError('')
    setContrastResults(null)
  }

  const loadSample = (sample) => {
    setForegroundColor(sample.fg)
    setBackgroundColor(sample.bg)
    setError('')
    setContrastResults(null)
  }

  const clearInput = () => {
    setForegroundColor('#000000')
    setBackgroundColor('#ffffff')
    setError('')
    setContrastResults(null)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const clearHistory = () => {
    setHistory([])
  }

  // Auto-calculate when colors change
  useEffect(() => {
    if (foregroundColor && backgroundColor) {
      calculateContrast()
    }
  }, [foregroundColor, backgroundColor, calculateContrast])

  return (
    <>
      <SEOHead
        title="Color Contrast Checker - WCAG Accessibility Compliance Tool"
        description="Check color contrast ratios for WCAG compliance. Test foreground and background color combinations for accessibility standards AA and AAA."
        canonical="/tools/contrast-checker"
        keywords={['color', 'contrast', 'checker', 'wcag', 'accessibility', 'compliance', 'aa', 'aaa', 'design']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'Color Contrast Checker',
          description: 'Check color contrast ratios for WCAG accessibility compliance',
          url: 'https://www.trimtoolshub.com/tools/contrast-checker',
          applicationCategory: 'AccessibilityApplication',
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
          <FontAwesomeIcon icon="fas fa-eye" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Color Contrast Checker
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
            Check color contrast ratios for WCAG accessibility compliance with our Color Contrast Checker. 
            Whether you're designing websites, creating accessible content, ensuring compliance with accessibility standards, 
            or improving user experience for all users, our tool provides accurate contrast ratio calculations and recommendations.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Color Contrast Checker offers professional-grade accessibility testing including WCAG AA and AAA compliance checking, 
            real-time contrast ratio calculation, accessibility recommendations, and color combination analysis. Perfect for 
            web designers, UX designers, accessibility specialists, and anyone committed to creating inclusive digital experiences.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive contrast analysis including: <strong>WCAG Compliance:</strong> 
            Check against WCAG 2.1 AA and AAA standards for different text sizes. <strong>Contrast Ratio Calculation:</strong> 
            Accurate calculation using WCAG 2.1 formulas and luminance values. <strong>Real-time Testing:</strong> 
            Instant feedback as you adjust colors with live preview. <strong>Accessibility Recommendations:</strong> 
            Get specific suggestions for improving contrast and compliance. <strong>Color History:</strong> 
            Track previous color combinations for reference and comparison. <strong>Multiple Standards:</strong> 
            Support for different accessibility standards and requirements.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include WCAG compliance checking, contrast ratio calculation, real-time testing, accessibility recommendations, 
            color history, multiple standards support, and comprehensive documentation about color accessibility 
            and WCAG compliance best practices.
          </p>
        </div>
        
        <AdSlot slotId="contrast-checker-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          {/* Color Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Color Selection</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem' 
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}>
                  Foreground Color (Text):
                </label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={foregroundColor}
                    onChange={(e) => handleColorChange(e.target.value, 'foreground')}
                    style={{
                      width: '60px',
                      height: '60px',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}
                  />
                  <input
                    type="text"
                    value={foregroundColor}
                    onChange={(e) => handleColorChange(e.target.value, 'foreground')}
                    placeholder="#000000"
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem',
                      fontFamily: 'monospace'
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}>
                  Background Color:
                </label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => handleColorChange(e.target.value, 'background')}
                    style={{
                      width: '60px',
                      height: '60px',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => handleColorChange(e.target.value, 'background')}
                    placeholder="#ffffff"
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem',
                      fontFamily: 'monospace'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sample Color Pairs */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Sample Color Combinations</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              {sampleColorPairs.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => loadSample(sample)}
                  style={{
                    padding: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--bg-primary)'
                    e.target.style.borderColor = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--bg-secondary)'
                    e.target.style.borderColor = 'var(--border)'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: sample.fg,
                      borderRadius: '0.25rem',
                      border: '1px solid var(--border)'
                    }}></div>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: sample.bg,
                      borderRadius: '0.25rem',
                      border: '1px solid var(--border)'
                    }}></div>
                  </div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    color: 'var(--text-primary)',
                    fontWeight: '500'
                  }}>
                    {sample.name}
                  </div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: 'var(--text-secondary)',
                    fontFamily: 'monospace'
                  }}>
                    {sample.fg} / {sample.bg}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div style={{ marginBottom: '2rem' }}>
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
              Reset Colors
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

          {contrastResults && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-chart-bar" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Contrast Analysis Results
              </h3>
              
              {/* Live Preview */}
              <div style={{
                padding: '2rem',
                backgroundColor: backgroundColor,
                borderRadius: '0.5rem',
                marginBottom: '1.5rem',
                border: '1px solid var(--border)',
                textAlign: 'center'
              }}>
                <div style={{
                  color: foregroundColor,
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}>
                  Sample Text Preview
                </div>
                <div style={{
                  color: foregroundColor,
                  fontSize: '1rem'
                }}>
                  This is how your text will appear with the selected colors
                </div>
              </div>

              {/* Contrast Ratio Display */}
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
                  color: contrastResults.wcagLevel.color,
                  marginBottom: '0.5rem'
                }}>
                  {contrastResults.contrastRatio}:1
                </div>
                <div style={{
                  fontSize: '1.2rem',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  Contrast Ratio
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: contrastResults.wcagLevel.color,
                  fontWeight: '500'
                }}>
                  WCAG {contrastResults.wcagLevel.level} - {contrastResults.wcagLevel.description}
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
                    Foreground Color
                  </div>
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'monospace',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: contrastResults.foregroundColor,
                      borderRadius: '0.25rem',
                      border: '1px solid var(--border)'
                    }}></div>
                    {contrastResults.foregroundColor} (RGB: {contrastResults.foregroundRgb.r}, {contrastResults.foregroundRgb.g}, {contrastResults.foregroundRgb.b})
                  </div>
                  
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderRight: '1px solid var(--border)'
                  }}>
                    Background Color
                  </div>
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'monospace',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: contrastResults.backgroundColor,
                      borderRadius: '0.25rem',
                      border: '1px solid var(--border)'
                    }}></div>
                    {contrastResults.backgroundColor} (RGB: {contrastResults.backgroundRgb.r}, {contrastResults.backgroundRgb.g}, {contrastResults.backgroundRgb.b})
                  </div>
                  
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderRight: '1px solid var(--border)'
                  }}>
                    WCAG Compliance
                  </div>
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: contrastResults.wcagLevel.color,
                    fontWeight: '500'
                  }}>
                    {contrastResults.wcagLevel.level} - {contrastResults.wcagLevel.description}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-lightbulb" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Accessibility Recommendations
                </h4>
                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  {contrastResults.recommendations.map((recommendation, index) => (
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

          {/* WCAG Standards Reference */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              WCAG Standards Reference
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem' 
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: '#dc2626',
                borderRadius: '0.5rem',
                color: 'white'
              }}>
                <h4 style={{ marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-times-circle" style={{ marginRight: '0.5rem' }} />
                  Fail (&lt; 3:1)
                </h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  Insufficient contrast for any text size. Not accessible.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: '#ef4444',
                borderRadius: '0.5rem',
                color: 'white'
              }}>
                <h4 style={{ marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }} />
                  A (3:1+)
                </h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  Minimum for large text (18pt+) only.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: '#f59e0b',
                borderRadius: '0.5rem',
                color: 'white'
              }}>
                <h4 style={{ marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-check" style={{ marginRight: '0.5rem' }} />
                  AA (4.5:1+)
                </h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  Standard compliance for normal text.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: '#10b981',
                borderRadius: '0.5rem',
                color: 'white'
              }}>
                <h4 style={{ marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-star" style={{ marginRight: '0.5rem' }} />
                  AAA (7:1+)
                </h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  Enhanced accessibility compliance.
                </p>
              </div>
            </div>
          </div>

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
                  Color History
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
                      setForegroundColor(item.foregroundColor)
                      setBackgroundColor(item.backgroundColor)
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center' 
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: item.foregroundColor,
                            borderRadius: '0.25rem',
                            border: '1px solid var(--border)'
                          }}></div>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: item.backgroundColor,
                            borderRadius: '0.25rem',
                            border: '1px solid var(--border)'
                          }}></div>
                        </div>
                        <div>
                          <div style={{ 
                            fontWeight: '600', 
                            color: 'var(--text-primary)',
                            marginBottom: '0.25rem'
                          }}>
                            {item.foregroundColor} / {item.backgroundColor}
                          </div>
                          <div style={{ 
                            fontSize: '0.9rem', 
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                          }}>
                            <span style={{ 
                              color: item.wcagLevel.color,
                              fontWeight: '500'
                            }}>
                              {item.contrastRatio}:1
                            </span>
                            <span>WCAG {item.wcagLevel.level}</span>
                          </div>
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

        <AdSlot slotId="contrast-checker-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Color Contrast & WCAG Accessibility Standards
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What is WCAG and why is color contrast important for accessibility?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                WCAG (Web Content Accessibility Guidelines) is an international standard for web accessibility: <strong>WCAG Levels:</strong> 
                A (minimum), AA (standard), AAA (enhanced) compliance levels. <strong>Color Contrast:</strong> 
                Ensures text is readable for users with visual impairments, color blindness, or low vision. <strong>Legal Compliance:</strong> 
                Many countries require WCAG compliance for public websites. <strong>User Experience:</strong> 
                Better contrast improves readability for all users, not just those with disabilities. <strong>Business Benefits:</strong> 
                Accessible websites reach broader audiences and avoid legal issues. <strong>Technical Implementation:</strong> 
                Proper contrast ratios ensure content is perceivable by assistive technologies.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How are contrast ratios calculated and what do the numbers mean?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Contrast ratio calculation process: <strong>Luminance Calculation:</strong> 
                Uses WCAG 2.1 formula to calculate relative luminance of colors. <strong>Ratio Formula:</strong> 
                (L1 + 0.05) / (L2 + 0.05) where L1 is lighter color, L2 is darker color. <strong>Scale:</strong> 
                1:1 (no contrast) to 21:1 (maximum contrast, black on white). <strong>WCAG Requirements:</strong> 
                4.5:1 for normal text, 3:1 for large text (18pt+), 7:1 for AAA compliance. <strong>Text Size Impact:</strong> 
                Larger text requires lower contrast ratios due to increased readability. <strong>Color Independence:</strong> 
                Contrast ratios work regardless of color perception differences.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the different WCAG compliance levels and their requirements?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                WCAG compliance levels include: <strong>Level A (Minimum):</strong> 
                Basic accessibility requirements, 3:1 contrast for large text. <strong>Level AA (Standard):</strong> 
                Most common compliance target, 4.5:1 for normal text, 3:1 for large text. <strong>Level AAA (Enhanced):</strong> 
                Highest accessibility level, 7:1 for normal text, 4.5:1 for large text. <strong>Large Text Definition:</strong> 
                18pt+ or 14pt+ bold text qualifies as large text. <strong>Legal Requirements:</strong> 
                Many jurisdictions require AA compliance for public sector websites. <strong>Industry Standards:</strong> 
                Most organizations target AA compliance as the standard.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I improve color contrast in my designs?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Contrast improvement strategies: <strong>Color Adjustment:</strong> 
                Darken light colors or lighten dark colors to increase contrast difference. <strong>Background Alternatives:</strong> 
                Use solid backgrounds instead of gradients or images for better text readability. <strong>Text Effects:</strong> 
                Add text shadows or outlines to improve contrast against complex backgrounds. <strong>Color Testing:</strong> 
                Test color combinations with multiple users and accessibility tools. <strong>Alternative Designs:</strong> 
                Provide high-contrast themes or dark mode options for users. <strong>Design Tools:</strong> 
                Use contrast checking tools throughout the design process, not just at the end.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common color contrast mistakes and how to avoid them?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common mistakes include: <strong>Insufficient Testing:</strong> 
                Not testing with real users or accessibility tools during development. <strong>Color-Only Information:</strong> 
                Relying solely on color to convey important information without other indicators. <strong>Complex Backgrounds:</strong> 
                Using busy backgrounds that reduce text readability regardless of color choice. <strong>Small Text Issues:</strong> 
                Using low contrast colors for small text that's harder to read. <strong>Hover States:</strong> 
                Forgetting to check contrast ratios for interactive states like hover and focus. <strong>Brand Colors:</strong> 
                Prioritizing brand colors over accessibility requirements without finding accessible alternatives.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How does color contrast affect users with different types of visual impairments?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Impact on different user groups: <strong>Low Vision Users:</strong> 
                Higher contrast ratios make text more readable and reduce eye strain. <strong>Color Blind Users:</strong> 
                Good contrast ensures readability regardless of color perception differences. <strong>Elderly Users:</strong> 
                Age-related vision changes make higher contrast essential for comfortable reading. <strong>Users with Dyslexia:</strong> 
                Better contrast reduces visual stress and improves reading comprehension. <strong>Mobile Users:</strong> 
                Outdoor viewing conditions require higher contrast for readability in bright sunlight. <strong>Users with Cognitive Disabilities:</strong> 
                Clear visual distinction helps with focus and reduces cognitive load.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContrastChecker
