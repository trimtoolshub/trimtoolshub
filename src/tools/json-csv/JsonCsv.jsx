import { useState } from 'react'
import Papa from 'papaparse'

const JsonCsv = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('json-to-csv')
  const [delimiter, setDelimiter] = useState(',')
  const [hasHeader, setHasHeader] = useState(true)
  const [error, setError] = useState('')

  const convertData = () => {
    try {
      if (!input.trim()) {
        setError('Please enter data to convert')
        return
      }

      let result = ''
      
      if (mode === 'json-to-csv') {
        const jsonData = JSON.parse(input)
        if (!Array.isArray(jsonData)) {
          setError('JSON must be an array of objects')
          return
        }
        
        result = Papa.unparse(jsonData, {
          delimiter: delimiter,
          header: hasHeader
        })
      } else {
        const csvData = Papa.parse(input, {
          header: hasHeader,
          delimiter: delimiter,
          skipEmptyLines: true
        })
        
        if (csvData.errors.length > 0) {
          setError('CSV parsing errors: ' + csvData.errors.map(e => e.message).join(', '))
          return
        }
        
        result = JSON.stringify(csvData.data, null, 2)
      }
      
      setOutput(result)
      setError('')
    } catch (err) {
      setError(`Conversion error: ${err.message}`)
      setOutput('')
    }
  }

  const downloadFile = () => {
    if (!output) return
    
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = mode === 'json-to-csv' ? 'data.csv' : 'data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (event) => {
      setInput(event.target.result)
    }
    reader.readAsText(file)
  }

  return (
    <div>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
        JSON ↔ CSV Converter
      </h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          Conversion Mode:
        </label>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <input
              type="radio"
              name="mode"
              value="json-to-csv"
              checked={mode === 'json-to-csv'}
              onChange={(e) => setMode(e.target.value)}
            />
            JSON → CSV
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <input
              type="radio"
              name="mode"
              value="csv-to-json"
              checked={mode === 'csv-to-json'}
              onChange={(e) => setMode(e.target.value)}
            />
            CSV → JSON
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          Delimiter:
        </label>
        <select
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            borderRadius: '0.25rem',
            color: 'var(--text-primary)'
          }}
        >
          <option value=",">Comma (,)</option>
          <option value=";">Semicolon (;)</option>
          <option value="\t">Tab</option>
          <option value="|">Pipe (|)</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
          <input
            type="checkbox"
            checked={hasHeader}
            onChange={(e) => setHasHeader(e.target.checked)}
          />
          Include header row
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          Upload File:
        </label>
        <input
          type="file"
          accept={mode === 'json-to-csv' ? '.json' : '.csv'}
          onChange={handleFileUpload}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            borderRadius: '0.25rem',
            color: 'var(--text-primary)'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          {mode === 'json-to-csv' ? 'JSON Input:' : 'CSV Input:'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'json-to-csv' ? '[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]' : 'name,age,city\nJohn,30,New York\nJane,25,Los Angeles'}
          style={{
            width: '100%',
            minHeight: '150px',
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

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={convertData}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Convert
        </button>
        <button
          onClick={downloadFile}
          disabled={!output}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: output ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
            color: output ? 'var(--text-primary)' : 'var(--text-muted)',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem',
            cursor: output ? 'pointer' : 'not-allowed',
            fontWeight: '500'
          }}
        >
          Download
        </button>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#dc2626',
          color: 'white',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}

      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--text-secondary)' }}>
              {mode === 'json-to-csv' ? 'CSV Output:' : 'JSON Output:'}
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
              minHeight: '150px',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              color: 'var(--text-primary)',
              resize: 'vertical',
              fontFamily: 'monospace'
            }}
          />
        </div>
      )}
    </div>
  )
}

export default JsonCsv

