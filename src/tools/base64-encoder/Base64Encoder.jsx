import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const Base64Encoder = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode') // 'encode' or 'decode'
  const [error, setError] = useState('')

  const handleEncode = useCallback(() => {
    try {
      setError('')
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
    } catch (err) {
      setError('Error encoding: Invalid input')
      setOutput('')
    }
  }, [input])

  const handleDecode = useCallback(() => {
    try {
      setError('')
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
    } catch (err) {
      setError('Error decoding: Invalid Base64 input')
      setOutput('')
    }
  }, [input])

  const handleProcess = () => {
    if (!input.trim()) {
      setError('Please enter some text to process')
      return
    }
    
    if (mode === 'encode') {
      handleEncode()
    } else {
      handleDecode()
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const downloadOutput = () => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `base64-${mode === 'encode' ? 'encoded' : 'decoded'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-exchange-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Base64 Encoder / Decoder
        </h2>
        
        {/* Mode Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
            Operation Mode:
          </label>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <input
                type="radio"
                name="mode"
                value="encode"
                checked={mode === 'encode'}
                onChange={(e) => setMode(e.target.value)}
              />
              Encode to Base64
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <input
                type="radio"
                name="mode"
                value="decode"
                checked={mode === 'decode'}
                onChange={(e) => setMode(e.target.value)}
              />
              Decode from Base64
            </label>
          </div>
        </div>

        {/* Input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
            {mode === 'encode' ? 'Text to Encode:' : 'Base64 to Decode:'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode to Base64...' : 'Enter Base64 string to decode...'}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleProcess}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FontAwesomeIcon icon={mode === 'encode' ? 'fas fa-arrow-down' : 'fas fa-arrow-up'} />
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </button>
          
          <button
            onClick={clearAll}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FontAwesomeIcon icon="fas fa-trash" />
            Clear All
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{ 
            padding: '0.75rem', 
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

        {/* Output */}
        {output && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
              {mode === 'encode' ? 'Base64 Encoded Result:' : 'Decoded Text:'}
            </label>
            <div style={{ position: 'relative' }}>
              <textarea
                value={output}
                readOnly
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  resize: 'vertical'
                }}
              />
              <button
                onClick={copyToClipboard}
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  padding: '0.5rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer'
                }}
                title="Copy to clipboard"
              >
                <FontAwesomeIcon icon="fas fa-copy" />
              </button>
            </div>
            
            <button
              onClick={downloadOutput}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FontAwesomeIcon icon="fas fa-download" />
              Download Result
            </button>
          </div>
        )}
      </div>

      {/* Information Panel */}
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          About Base64 Encoding
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '1rem' }}>
            Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. 
            It's commonly used for encoding data that needs to be stored or transferred over media designed to deal with text.
          </p>
          
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Common Uses:</h4>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
            <li>Email attachments (MIME)</li>
            <li>Data URLs in web pages</li>
            <li>API authentication tokens</li>
            <li>Storing binary data in JSON</li>
            <li>URL-safe data transmission</li>
          </ul>
          
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Features:</h4>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Supports Unicode characters</li>
            <li>URL-safe encoding/decoding</li>
            <li>Real-time processing</li>
            <li>Copy to clipboard functionality</li>
            <li>Download results as text file</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Base64Encoder