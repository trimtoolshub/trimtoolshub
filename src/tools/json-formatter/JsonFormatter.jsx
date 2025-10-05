import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const JsonFormatter = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState('format') // 'format' or 'minify'

  const handleFormat = useCallback(() => {
    try {
      setError('')
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
    } catch (err) {
      setError(`JSON Error: ${err.message}`)
      setOutput('')
    }
  }, [input])

  const handleMinify = useCallback(() => {
    try {
      setError('')
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
    } catch (err) {
      setError(`JSON Error: ${err.message}`)
      setOutput('')
    }
  }, [input])

  const handleValidate = useCallback(() => {
    try {
      setError('')
      JSON.parse(input)
      setOutput('✅ Valid JSON')
    } catch (err) {
      setError(`❌ Invalid JSON: ${err.message}`)
      setOutput('')
    }
  }, [input])

  const handleProcess = () => {
    if (!input.trim()) {
      setError('Please enter JSON data to process')
      return
    }
    
    if (mode === 'format') {
      handleFormat()
    } else if (mode === 'minify') {
      handleMinify()
    } else {
      handleValidate()
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
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `formatted-${mode === 'format' ? 'pretty' : 'minified'}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const loadSample = () => {
    const sample = {
      "name": "John Doe",
      "age": 30,
      "email": "john@example.com",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipCode": "10001"
      },
      "hobbies": ["reading", "swimming", "coding"],
      "isActive": true
    }
    setInput(JSON.stringify(sample, null, 2))
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
          <FontAwesomeIcon icon="fas fa-code" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          JSON Formatter & Validator
        </h2>
        
        {/* Mode Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
            Operation Mode:
          </label>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <input
                type="radio"
                name="mode"
                value="format"
                checked={mode === 'format'}
                onChange={(e) => setMode(e.target.value)}
              />
              Format (Pretty Print)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <input
                type="radio"
                name="mode"
                value="minify"
                checked={mode === 'minify'}
                onChange={(e) => setMode(e.target.value)}
              />
              Minify (Compact)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <input
                type="radio"
                name="mode"
                value="validate"
                checked={mode === 'validate'}
                onChange={(e) => setMode(e.target.value)}
              />
              Validate Only
            </label>
          </div>
        </div>

        {/* Input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
              JSON Input:
            </label>
            <button
              onClick={loadSample}
              style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Load Sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter JSON data here..."
            style={{
              width: '100%',
              minHeight: '200px',
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
            <FontAwesomeIcon icon={mode === 'validate' ? 'fas fa-check' : 'fas fa-magic'} />
            {mode === 'format' ? 'Format JSON' : mode === 'minify' ? 'Minify JSON' : 'Validate JSON'}
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
              {mode === 'validate' ? 'Validation Result:' : 'Formatted JSON:'}
            </label>
            <div style={{ position: 'relative' }}>
              <textarea
                value={output}
                readOnly
                style={{
                  width: '100%',
                  minHeight: '200px',
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
              {mode !== 'validate' && (
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
              )}
            </div>
            
            {mode !== 'validate' && (
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
                Download JSON
              </button>
            )}
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
          About JSON Formatting
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '1rem' }}>
            JSON (JavaScript Object Notation) is a lightweight data interchange format. 
            Our formatter helps you validate, format, and minify JSON data for better readability and efficiency.
          </p>
          
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Features:</h4>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
            <li>Pretty print with proper indentation</li>
            <li>Minify JSON to reduce file size</li>
            <li>Validate JSON syntax</li>
            <li>Syntax error detection and reporting</li>
            <li>Copy to clipboard functionality</li>
            <li>Download formatted JSON files</li>
          </ul>
          
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Common Uses:</h4>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>API response formatting</li>
            <li>Configuration file editing</li>
            <li>Data analysis and debugging</li>
            <li>Code documentation</li>
            <li>Web development</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default JsonFormatter