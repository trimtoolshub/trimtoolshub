import { useState, useCallback, useEffect } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const HtmlEntityEncoder = () => {
  const [inputText, setInputText] = useState('')
  const [encodedText, setEncodedText] = useState('')
  const [decodedText, setDecodedText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [options, setOptions] = useState({
    encodeMode: 'html',
    decodeMode: 'html',
    includeNumeric: true,
    includeNamed: true,
    includeHex: true,
    preserveSpaces: false
  })

  const sampleTexts = [
    'Hello <world> & "quotes"',
    'Special chars: <>&"\'',
    'Math symbols: ∑∏∫∞',
    'Emojis: 😀🎉🚀',
    'Currency: €£¥$'
  ]

  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    ' ': '&nbsp;',
    '©': '&copy;',
    '®': '&reg;',
    '™': '&trade;',
    '€': '&euro;',
    '£': '&pound;',
    '¥': '&yen;',
    '¢': '&cent;',
    '∑': '&sum;',
    '∏': '&prod;',
    '∫': '&int;',
    '∞': '&infin;',
    '±': '&plusmn;',
    '×': '&times;',
    '÷': '&divide;',
    '≠': '&ne;',
    '≤': '&le;',
    '≥': '&ge;',
    'α': '&alpha;',
    'β': '&beta;',
    'γ': '&gamma;',
    'δ': '&delta;',
    'ε': '&epsilon;',
    'ζ': '&zeta;',
    'η': '&eta;',
    'θ': '&theta;',
    'λ': '&lambda;',
    'μ': '&mu;',
    'π': '&pi;',
    'σ': '&sigma;',
    'τ': '&tau;',
    'φ': '&phi;',
    'χ': '&chi;',
    'ψ': '&psi;',
    'ω': '&omega;'
  }

  const encodeText = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter text to encode.')
      return
    }

    setIsProcessing(true)
    setError('')
    setEncodedText('')
    setDecodedText('')

    try {
      let result = ''
      
      if (options.encodeMode === 'html') {
        result = encodeHtmlEntities(inputText, options)
      } else if (options.encodeMode === 'url') {
        result = encodeURIComponent(inputText)
      } else if (options.encodeMode === 'base64') {
        result = btoa(unescape(encodeURIComponent(inputText)))
      } else if (options.encodeMode === 'unicode') {
        result = encodeUnicode(inputText)
      }

      setEncodedText(result)
    } catch (err) {
      setError('Error encoding text: ' + err.message)
    } finally {
      setIsProcessing(false)
    }
  }, [inputText, options])

  const decodeText = useCallback(async () => {
    if (!encodedText.trim()) {
      setError('Please enter encoded text to decode.')
      return
    }

    setIsProcessing(true)
    setError('')
    setDecodedText('')

    try {
      let result = ''
      
      if (options.decodeMode === 'html') {
        result = decodeHtmlEntities(encodedText)
      } else if (options.decodeMode === 'url') {
        result = decodeURIComponent(encodedText)
      } else if (options.decodeMode === 'base64') {
        result = decodeURIComponent(escape(atob(encodedText)))
      } else if (options.decodeMode === 'unicode') {
        result = decodeUnicode(encodedText)
      }

      setDecodedText(result)
    } catch (err) {
      setError('Error decoding text: ' + err.message)
    } finally {
      setIsProcessing(false)
    }
  }, [encodedText, options])

  // HTML Entity encoding/decoding functions
  const encodeHtmlEntities = (text, opts) => {
    let result = text
    
    // Encode basic HTML entities
    if (opts.includeNamed) {
      Object.entries(htmlEntities).forEach(([char, entity]) => {
        if (char === ' ' && !opts.preserveSpaces) return
        result = result.replace(new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), entity)
      })
    }
    
    // Encode numeric entities for remaining characters
    if (opts.includeNumeric) {
      result = result.replace(/[^\x00-\x7F]/g, (char) => {
        return '&#x' + char.charCodeAt(0).toString(16).toUpperCase() + ';'
      })
    }
    
    return result
  }

  const decodeHtmlEntities = (text) => {
    let result = text
    
    // Decode named entities
    Object.entries(htmlEntities).forEach(([char, entity]) => {
      result = result.replace(new RegExp(entity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), char)
    })
    
    // Decode numeric entities
    result = result.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(parseInt(dec, 10))
    })
    
    // Decode hexadecimal entities
    result = result.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16))
    })
    
    return result
  }

  const encodeUnicode = (text) => {
    return text.split('').map(char => {
      const code = char.charCodeAt(0)
      return '\\u' + code.toString(16).padStart(4, '0').toUpperCase()
    }).join('')
  }

  const decodeUnicode = (text) => {
    return text.replace(/\\u([0-9A-Fa-f]{4})/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16))
    })
  }

  const handleInputChange = (e) => {
    setInputText(e.target.value)
    setError('')
    setEncodedText('')
    setDecodedText('')
  }

  const handleEncodedChange = (e) => {
    setEncodedText(e.target.value)
    setError('')
    setDecodedText('')
  }

  const handleOptionChange = (option, value) => {
    setOptions(prev => ({
      ...prev,
      [option]: value
    }))
  }

  const loadSample = (sampleText) => {
    setInputText(sampleText)
    setError('')
    setEncodedText('')
    setDecodedText('')
  }

  const clearInput = () => {
    setInputText('')
    setEncodedText('')
    setDecodedText('')
    setError('')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  // Auto-encode when input changes
  useEffect(() => {
    if (inputText.trim()) {
      encodeText()
    }
  }, [inputText, options, encodeText])

  return (
    <>
      <SEOHead
        title="HTML Entity Encoder/Decoder - Convert Special Characters Online"
        description="Encode and decode HTML entities, URL encoding, Base64, and Unicode. Convert special characters safely for web development and data processing."
        canonical="/tools/html-entity-encoder"
        keywords={['html', 'entity', 'encoder', 'decoder', 'special', 'characters', 'unicode', 'base64', 'url']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'HTML Entity Encoder/Decoder',
          description: 'Encode and decode HTML entities and special characters',
          url: 'https://www.trimtoolshub.com/tools/html-entity-encoder',
          applicationCategory: 'WebDevelopmentApplication',
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
          <FontAwesomeIcon icon="fas fa-code" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          HTML Entity Encoder/Decoder
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
            Encode and decode HTML entities, URL encoding, Base64, and Unicode with our comprehensive HTML Entity Encoder/Decoder. 
            Whether you're developing web applications, processing data, handling special characters, or ensuring data security, 
            our tool provides reliable encoding and decoding for multiple formats.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our HTML Entity Encoder/Decoder offers professional-grade text processing including HTML entity conversion, URL encoding/decoding, 
            Base64 encoding/decoding, Unicode handling, and special character management. Perfect for web developers, 
            data analysts, system administrators, and anyone working with text encoding and character conversion.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive encoding/decoding including: <strong>HTML Entities:</strong> 
            Convert special characters to HTML entities and vice versa. <strong>URL Encoding:</strong> 
            Encode/decode URLs and form data for safe transmission. <strong>Base64 Encoding:</strong> 
            Convert text to Base64 format for data transmission and storage. <strong>Unicode Handling:</strong> 
            Process Unicode characters and escape sequences. <strong>Special Characters:</strong> 
            Handle mathematical symbols, currency symbols, and international characters. <strong>Real-time Processing:</strong> 
            Get instant encoding/decoding results with immediate feedback.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include HTML entity conversion, URL encoding/decoding, Base64 encoding/decoding, Unicode handling, 
            special character management, real-time processing, and comprehensive documentation about text encoding 
            and character conversion best practices.
          </p>
        </div>
        
        <AdSlot slotId="html-entity-encoder-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          {/* Encoding Options */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Encoding Options</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}>
                  Encode Mode:
                </label>
                <select
                  value={options.encodeMode}
                  onChange={(e) => handleOptionChange('encodeMode', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="html">HTML Entities</option>
                  <option value="url">URL Encoding</option>
                  <option value="base64">Base64</option>
                  <option value="unicode">Unicode</option>
                </select>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}>
                  Decode Mode:
                </label>
                <select
                  value={options.decodeMode}
                  onChange={(e) => handleOptionChange('decodeMode', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="html">HTML Entities</option>
                  <option value="url">URL Encoding</option>
                  <option value="base64">Base64</option>
                  <option value="unicode">Unicode</option>
                </select>
              </div>
            </div>
          </div>

          {/* HTML Entity Options */}
          {options.encodeMode === 'html' && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>HTML Entity Options</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
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
                    checked={options.includeNamed}
                    onChange={(e) => handleOptionChange('includeNamed', e.target.checked)}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <span style={{ color: 'var(--text-primary)' }}>
                    <FontAwesomeIcon icon="fas fa-tag" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                    Named Entities
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
                    checked={options.includeNumeric}
                    onChange={(e) => handleOptionChange('includeNumeric', e.target.checked)}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <span style={{ color: 'var(--text-primary)' }}>
                    <FontAwesomeIcon icon="fas fa-hashtag" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                    Numeric Entities
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
                    checked={options.includeHex}
                    onChange={(e) => handleOptionChange('includeHex', e.target.checked)}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <span style={{ color: 'var(--text-primary)' }}>
                    <FontAwesomeIcon icon="fas fa-code" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                    Hex Entities
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
                    checked={options.preserveSpaces}
                    onChange={(e) => handleOptionChange('preserveSpaces', e.target.checked)}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <span style={{ color: 'var(--text-primary)' }}>
                    <FontAwesomeIcon icon="fas fa-space" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                    Preserve Spaces
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Input Text</h3>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter text to encode..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '1rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                resize: 'vertical',
                fontFamily: 'monospace'
              }}
            />
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => loadSample(sampleTexts[0])}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-file-alt" />
                Load Sample
              </button>
              
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
          </div>

          {/* Sample Texts */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Sample Texts</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              {sampleTexts.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => loadSample(sample)}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    fontSize: '0.9rem'
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
                  {sample}
                </button>
              ))}
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

          {/* Encoded Result */}
          {encodedText && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-lock" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Encoded Result ({options.encodeMode.toUpperCase()})
                </h3>
                <button
                  onClick={() => copyToClipboard(encodedText)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FontAwesomeIcon icon="fas fa-copy" />
                  Copy
                </button>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                minHeight: '100px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflow: 'auto',
                maxHeight: '200px'
              }}>
                {encodedText}
              </div>
            </div>
          )}

          {/* Decode Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Decode Encoded Text</h3>
            <textarea
              value={encodedText}
              onChange={handleEncodedChange}
              placeholder="Enter encoded text to decode..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '1rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                resize: 'vertical',
                fontFamily: 'monospace',
                marginBottom: '1rem'
              }}
            />
            
            <button
              onClick={decodeText}
              disabled={isProcessing || !encodedText.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: isProcessing || !encodedText.trim() ? 'var(--bg-tertiary)' : '#10b981',
                color: isProcessing || !encodedText.trim() ? 'var(--text-secondary)' : 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: isProcessing || !encodedText.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500'
              }}
            >
              <FontAwesomeIcon icon={isProcessing ? "fas fa-spinner fa-spin" : "fas fa-unlock"} />
              {isProcessing ? 'Decoding...' : 'Decode'}
            </button>
          </div>

          {/* Decoded Result */}
          {decodedText && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-unlock" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Decoded Result ({options.decodeMode.toUpperCase()})
                </h3>
                <button
                  onClick={() => copyToClipboard(decodedText)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FontAwesomeIcon icon="fas fa-copy" />
                  Copy
                </button>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                minHeight: '100px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflow: 'auto',
                maxHeight: '200px'
              }}>
                {decodedText}
              </div>
            </div>
          )}

          {/* Format Information */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              Encoding Format Information
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
                  <FontAwesomeIcon icon="fas fa-code" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  HTML Entities
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Convert special characters to HTML entities (&lt;, &gt;, &amp;) for safe web display.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-link" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  URL Encoding
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Encode special characters for URLs and form data (%20, %3C, %3E).
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-shield-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Base64
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Convert text to Base64 format for data transmission and storage.
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
                  Unicode
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Convert characters to Unicode escape sequences (\u0041, \u0042).
                </p>
              </div>
            </div>
          </div>
        </div>

        <AdSlot slotId="html-entity-encoder-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Text Encoding & Character Conversion
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are HTML entities and why are they important for web development?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                HTML entities are special codes used to represent characters: <strong>Character Safety:</strong> 
                Prevent HTML injection attacks by encoding special characters. <strong>Display Control:</strong> 
                Ensure characters display correctly across different browsers and systems. <strong>Reserved Characters:</strong> 
                Handle HTML reserved characters (&lt;, &gt;, &amp;, &quot;) safely. <strong>International Characters:</strong> 
                Display characters not available in standard ASCII encoding. <strong>Mathematical Symbols:</strong> 
                Represent mathematical and scientific symbols (∑, ∏, ∫, ∞). <strong>Currency Symbols:</strong> 
                Display international currency symbols (€, £, ¥, ¢).
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the different types of HTML entities and when to use them?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                HTML entity types include: <strong>Named Entities:</strong> 
                Human-readable names like &amp;lt; for &lt; and &amp;gt; for &gt;. <strong>Numeric Entities:</strong> 
                Decimal codes like &#60; for &lt; and &#62; for &gt;. <strong>Hexadecimal Entities:</strong> 
                Hex codes like &#x3C; for &lt; and &#x3E; for &gt;. <strong>Use Cases:</strong> 
                Named entities for readability, numeric for compatibility, hex for compactness. <strong>Browser Support:</strong> 
                All modern browsers support all entity types. <strong>Performance:</strong> 
                Named entities are slightly larger but more readable.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How does URL encoding work and when should I use it?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                URL encoding (percent encoding) process: <strong>Character Conversion:</strong> 
                Convert special characters to %XX format where XX is hexadecimal. <strong>Reserved Characters:</strong> 
                Encode characters with special meaning in URLs (space, &, =, ?, #). <strong>Form Data:</strong> 
                Essential for transmitting form data via GET or POST requests. <strong>International URLs:</strong> 
                Handle non-ASCII characters in URLs and domain names. <strong>API Requests:</strong> 
                Properly encode parameters in API calls and web services. <strong>Security:</strong> 
                Prevent URL injection attacks and ensure data integrity.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What is Base64 encoding and what are its applications?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Base64 encoding applications include: <strong>Data Transmission:</strong> 
                Encode binary data for safe transmission over text-based protocols. <strong>Email Attachments:</strong> 
                Encode file attachments in email systems. <strong>Web APIs:</strong> 
                Transmit binary data in JSON or XML formats. <strong>Data Storage:</strong> 
                Store binary data in text-based storage systems. <strong>Image Embedding:</strong> 
                Embed images directly in HTML/CSS using data URLs. <strong>Security:</strong> 
                Basic obfuscation for sensitive data (not encryption). <strong>File Formats:</strong> 
                Encode files for inclusion in configuration files or databases.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I handle Unicode characters and international text?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Unicode handling strategies: <strong>UTF-8 Encoding:</strong> 
                Use UTF-8 encoding for web content to support international characters. <strong>Unicode Escapes:</strong> 
                Use \uXXXX format for JavaScript and other programming languages. <strong>Character Normalization:</strong> 
                Normalize Unicode characters to prevent duplicate representations. <strong>Font Support:</strong> 
                Ensure fonts support the Unicode characters you're using. <strong>Database Storage:</strong> 
                Use Unicode-compatible database collations and character sets. <strong>API Handling:</strong> 
                Properly handle Unicode in API requests and responses. <strong>Testing:</strong> 
                Test with various international characters and languages.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common encoding/decoding mistakes and how to avoid them?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common mistakes include: <strong>Double Encoding:</strong> 
                Encoding already encoded text, resulting in garbled output. <strong>Wrong Format:</strong> 
                Using HTML entities for URL encoding or vice versa. <strong>Character Set Issues:</strong> 
                Not specifying proper character encoding in HTML/CSS. <strong>Incomplete Decoding:</strong> 
                Not decoding all entity types (named, numeric, hex). <strong>Security Oversights:</strong> 
                Not encoding user input before displaying in HTML. <strong>Performance Issues:</strong> 
                Encoding large amounts of data unnecessarily. <strong>Browser Compatibility:</strong> 
                Not testing encoding/decoding across different browsers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HtmlEntityEncoder
