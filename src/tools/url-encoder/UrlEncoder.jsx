import { useState } from 'react'

const UrlEncoder = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')

  const processUrl = () => {
    try {
      if (!input.trim()) {
        setOutput('')
        return
      }

      let result = ''
      if (mode === 'encode') {
        result = encodeURIComponent(input)
      } else {
        result = decodeURIComponent(input)
      }
      
      setOutput(result)
    } catch (err) {
      setOutput(`Error: ${err.message}`)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
        URL Encoder/Decoder
      </h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          Mode:
        </label>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <input
              type="radio"
              name="mode"
              value="encode"
              checked={mode === 'encode'}
              onChange={(e) => setMode(e.target.value)}
            />
            Encode URL
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <input
              type="radio"
              name="mode"
              value="decode"
              checked={mode === 'decode'}
              onChange={(e) => setMode(e.target.value)}
            />
            Decode URL
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          {mode === 'encode' ? 'URL to Encode:' : 'Encoded URL to Decode:'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'https://example.com/page?q=hello world' : 'https%3A//example.com/page%3Fq%3Dhello%20world'}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '0.75rem',
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem',
            color: 'var(--text-primary)',
            resize: 'vertical',
            fontFamily: 'monospace'
          }}
        />
      </div>

      <button
        onClick={processUrl}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: 'var(--accent)',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          marginBottom: '1rem',
          fontWeight: '500'
        }}
      >
        {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
      </button>

      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--text-secondary)' }}>
              {mode === 'encode' ? 'Encoded URL:' : 'Decoded URL:'}
            </label>
            <button
              onClick={copyToClipboard}
              style={{
                padding: '0.25rem 0.5rem',
                backgroundColor: 'transparent',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Copy
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              color: 'var(--text-primary)',
              resize: 'vertical',
              fontFamily: 'monospace',
              wordBreak: 'break-all'
            }}
          />
        </div>
      )}
    </div>
  )
}

export default UrlEncoder
