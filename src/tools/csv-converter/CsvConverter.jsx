import { useState, useCallback } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const CsvConverter = () => {
  const [inputData, setInputData] = useState('')
  const [outputData, setOutputData] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [options, setOptions] = useState({
    inputFormat: 'csv',
    outputFormat: 'json',
    delimiter: ',',
    hasHeader: true,
    includeHeaders: true,
    escapeQuotes: true,
    trimWhitespace: true
  })

  const sampleCsvData = `Name,Age,City,Email
John Doe,30,New York,john@example.com
Jane Smith,25,Los Angeles,jane@example.com
Bob Johnson,35,Chicago,bob@example.com
Alice Brown,28,San Francisco,alice@example.com`

  const sampleJsonData = `[
  {"name": "John Doe", "age": 30, "city": "New York", "email": "john@example.com"},
  {"name": "Jane Smith", "age": 25, "city": "Los Angeles", "email": "jane@example.com"},
  {"name": "Bob Johnson", "age": 35, "city": "Chicago", "email": "bob@example.com"},
  {"name": "Alice Brown", "age": 28, "city": "San Francisco", "email": "alice@example.com"}
]`

  const convertData = useCallback(async () => {
    if (!inputData.trim()) {
      setError('Please enter data to convert.')
      return
    }

    setIsProcessing(true)
    setError('')
    setOutputData('')

    try {
      let result = ''

      if (options.inputFormat === 'csv' && options.outputFormat === 'json') {
        result = csvToJson(inputData, options)
      } else if (options.inputFormat === 'json' && options.outputFormat === 'csv') {
        result = jsonToCsv(inputData, options)
      } else if (options.inputFormat === 'csv' && options.outputFormat === 'xml') {
        result = csvToXml(inputData, options)
      } else if (options.inputFormat === 'json' && options.outputFormat === 'xml') {
        result = jsonToXml(inputData, options)
      } else if (options.inputFormat === 'xml' && options.outputFormat === 'csv') {
        result = xmlToCsv(inputData, options)
      } else if (options.inputFormat === 'xml' && options.outputFormat === 'json') {
        result = xmlToJson(inputData, options)
      } else {
        throw new Error('Unsupported conversion format')
      }

      setOutputData(result)
    } catch (err) {
      setError('Error converting data: ' + err.message)
    } finally {
      setIsProcessing(false)
    }
  }, [inputData, options])

  // CSV to JSON conversion
  const csvToJson = (csv, opts) => {
    const lines = csv.split('\n').filter(line => line.trim() !== '')
    if (lines.length === 0) throw new Error('No data found')

    const headers = opts.hasHeader ? 
      lines[0].split(opts.delimiter).map(h => opts.trimWhitespace ? h.trim() : h) : 
      Array.from({length: lines[0].split(opts.delimiter).length}, (_, i) => `column${i + 1}`)

    const data = []
    const startIndex = opts.hasHeader ? 1 : 0

    for (let i = startIndex; i < lines.length; i++) {
      const values = parseCsvLine(lines[i], opts.delimiter, opts.escapeQuotes)
      if (values.length !== headers.length) continue

      const row = {}
      headers.forEach((header, index) => {
        let value = opts.trimWhitespace ? values[index].trim() : values[index]
        // Try to parse numbers
        if (!isNaN(value) && value !== '') {
          value = parseFloat(value)
        }
        row[header] = value
      })
      data.push(row)
    }

    return JSON.stringify(data, null, 2)
  }

  // JSON to CSV conversion
  const jsonToCsv = (json, opts) => {
    let data
    try {
      data = JSON.parse(json)
    } catch (e) {
      throw new Error('Invalid JSON format')
    }

    if (!Array.isArray(data)) {
      throw new Error('JSON must be an array of objects')
    }

    if (data.length === 0) {
      throw new Error('No data found')
    }

    const headers = Object.keys(data[0])
    let csv = ''

    if (opts.includeHeaders) {
      csv += headers.join(opts.delimiter) + '\n'
    }
    
    data.forEach(row => {
      const values = headers.map(header => {
        let value = row[header] || ''
        if (typeof value === 'string' && (value.includes(opts.delimiter) || value.includes('"'))) {
          value = `"${value.replace(/"/g, '""')}"`
        }
        return value
      })
      csv += values.join(opts.delimiter) + '\n'
    })

    return csv.trim()
  }

  // CSV to XML conversion
  const csvToXml = (csv, opts) => {
    const lines = csv.split('\n').filter(line => line.trim() !== '')
    if (lines.length === 0) throw new Error('No data found')

    const headers = opts.hasHeader ? 
      lines[0].split(opts.delimiter).map(h => opts.trimWhitespace ? h.trim() : h) : 
      Array.from({length: lines[0].split(opts.delimiter).length}, (_, i) => `column${i + 1}`)

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n'
    const startIndex = opts.hasHeader ? 1 : 0

    for (let i = startIndex; i < lines.length; i++) {
      const values = parseCsvLine(lines[i], opts.delimiter, opts.escapeQuotes)
      if (values.length !== headers.length) continue

      xml += '  <row>\n'
      headers.forEach((header, index) => {
        const value = opts.trimWhitespace ? values[index].trim() : values[index]
        const cleanHeader = header.replace(/[^a-zA-Z0-9_]/g, '_')
        xml += `    <${cleanHeader}>${escapeXml(value)}</${cleanHeader}>\n`
      })
      xml += '  </row>\n'
    }

    xml += '</data>'
    return xml
  }

  // JSON to XML conversion
  const jsonToXml = (json, opts) => {
    let data
    try {
      data = JSON.parse(json)
    } catch (e) {
      throw new Error('Invalid JSON format')
    }

    if (!Array.isArray(data)) {
      throw new Error('JSON must be an array of objects')
    }

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n'

    data.forEach(row => {
      xml += '  <row>\n'
      Object.entries(row).forEach(([key, value]) => {
        const cleanKey = key.replace(/[^a-zA-Z0-9_]/g, '_')
        xml += `    <${cleanKey}>${escapeXml(value)}</${cleanKey}>\n`
      })
      xml += '  </row>\n'
    })

    xml += '</data>'
    return xml
  }

  // XML to CSV conversion
  const xmlToCsv = (xml, opts) => {
    // Simple XML parsing (in a real implementation, you'd use a proper XML parser)
    const rows = xml.match(/<row>[\s\S]*?<\/row>/g) || []
    if (rows.length === 0) throw new Error('No data found')

    const headers = new Set()
    const data = []

    rows.forEach(row => {
      const fields = row.match(/<(\w+)>([^<]*)<\/\1>/g) || []
      const rowData = {}
      
      fields.forEach(field => {
        const match = field.match(/<(\w+)>([^<]*)<\/\1>/)
        if (match) {
          const [, key, value] = match
          headers.add(key)
          rowData[key] = value
        }
      })
      
      if (Object.keys(rowData).length > 0) {
        data.push(rowData)
      }
    })

    const headerArray = Array.from(headers)
    let csv = ''

    if (opts.includeHeaders) {
      csv += headerArray.join(opts.delimiter) + '\n'
    }

    data.forEach(row => {
      const values = headerArray.map(header => {
        let value = row[header] || ''
        if (typeof value === 'string' && (value.includes(opts.delimiter) || value.includes('"'))) {
          value = `"${value.replace(/"/g, '""')}"`
        }
        return value
      })
      csv += values.join(opts.delimiter) + '\n'
    })

    return csv.trim()
  }

  // XML to JSON conversion
  const xmlToJson = (xml, opts) => {
    const rows = xml.match(/<row>[\s\S]*?<\/row>/g) || []
    if (rows.length === 0) throw new Error('No data found')

    const data = []

    rows.forEach(row => {
      const fields = row.match(/<(\w+)>([^<]*)<\/\1>/g) || []
      const rowData = {}
      
      fields.forEach(field => {
        const match = field.match(/<(\w+)>([^<]*)<\/\1>/)
        if (match) {
          const [, key, value] = match
          rowData[key] = value
        }
      })
      
      if (Object.keys(rowData).length > 0) {
        data.push(rowData)
      }
    })

    return JSON.stringify(data, null, 2)
  }

  // Helper functions
  const parseCsvLine = (line, delimiter, escapeQuotes) => {
    const result = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      
      if (char === '"') {
        if (escapeQuotes && line[i + 1] === '"') {
          current += '"'
          i++ // Skip next quote
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === delimiter && !inQuotes) {
        result.push(current)
        current = ''
      } else {
        current += char
      }
    }
    
    result.push(current)
    return result
  }

  const escapeXml = (value) => {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  const handleInputChange = (e) => {
    setInputData(e.target.value)
    setError('')
    setOutputData('')
  }

  const handleOptionChange = (option, value) => {
    setOptions(prev => ({
      ...prev,
      [option]: value
    }))
  }

  const loadSample = (sampleData) => {
    setInputData(sampleData)
    setError('')
    setOutputData('')
  }

  const clearInput = () => {
    setInputData('')
    setError('')
    setOutputData('')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <SEOHead
        title="CSV Converter - Convert CSV, JSON, XML Data Formats Online"
        description="Convert between CSV, JSON, and XML formats online. Parse data with customizable delimiters, headers, and formatting options. Free data conversion tool."
        canonical="/tools/csv-converter"
        keywords={['csv', 'converter', 'json', 'xml', 'data', 'conversion', 'parser', 'formatter']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'CSV Converter',
          description: 'Convert between CSV, JSON, and XML data formats',
          url: 'https://www.trimtoolshub.com/tools/csv-converter',
          applicationCategory: 'DataApplication',
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
          <FontAwesomeIcon icon="fas fa-exchange-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
        CSV Converter
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
            Convert between CSV, JSON, and XML formats with our comprehensive CSV Converter. 
            Whether you're working with data analysis, API integration, database migration, 
            or system integration, our tool provides flexible data format conversion with customizable options.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our CSV Converter offers professional-grade data conversion including CSV to JSON, JSON to CSV, 
            XML conversion, customizable delimiters, header handling, and data validation. Perfect for 
            data analysts, developers, system administrators, and anyone working with different data formats.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive data conversion including: <strong>Multi-Format Support:</strong> 
            Convert between CSV, JSON, and XML formats seamlessly. <strong>Customizable Delimiters:</strong> 
            Use commas, semicolons, tabs, or custom delimiters for CSV parsing. <strong>Header Management:</strong> 
            Handle headers automatically or manually configure header behavior. <strong>Data Validation:</strong> 
            Validate input data and provide error handling for malformed content. <strong>Formatting Options:</strong> 
            Control whitespace trimming, quote escaping, and output formatting. <strong>Real-time Processing:</strong> 
            Get instant conversion results with immediate feedback.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include multi-format support, customizable delimiters, header management, data validation, 
            formatting options, real-time processing, and comprehensive documentation about data conversion 
            and format handling best practices.
          </p>
        </div>
        
        <AdSlot slotId="csv-converter-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          {/* Format Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Conversion Format</h3>
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
                  Input Format:
        </label>
                <select
                  value={options.inputFormat}
                  onChange={(e) => handleOptionChange('inputFormat', e.target.value)}
          style={{
            width: '100%',
                    padding: '0.5rem',
            border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                  <option value="xml">XML</option>
                </select>
      </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}>
          Output Format:
        </label>
        <select
                  value={options.outputFormat}
                  onChange={(e) => handleOptionChange('outputFormat', e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid var(--border)',
            borderRadius: '0.25rem',
                    backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)'
          }}
        >
                  <option value="csv">CSV</option>
          <option value="json">JSON</option>
          <option value="xml">XML</option>
                </select>
              </div>
            </div>
          </div>

          {/* Options */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Conversion Options</h3>
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
                  checked={options.hasHeader}
                  onChange={(e) => handleOptionChange('hasHeader', e.target.checked)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-list" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Has Header Row
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
                  onChange={(e) => handleOptionChange('includeHeaders', e.target.checked)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-heading" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Include Headers in Output
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
                  checked={options.trimWhitespace}
                  onChange={(e) => handleOptionChange('trimWhitespace', e.target.checked)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-cut" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Trim Whitespace
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
                  checked={options.escapeQuotes}
                  onChange={(e) => handleOptionChange('escapeQuotes', e.target.checked)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-quote-right" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Escape Quotes
                </span>
              </label>
            </div>
            
            <div style={{ marginTop: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: 'var(--text-primary)',
                fontWeight: '500'
              }}>
                Delimiter:
              </label>
              <select
                value={options.delimiter}
                onChange={(e) => handleOptionChange('delimiter', e.target.value)}
                style={{
                  width: '200px',
                  padding: '0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.25rem',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="\t">Tab</option>
                <option value="|">Pipe (|)</option>
                <option value=":">Colon (:)</option>
        </select>
            </div>
      </div>

          {/* Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Input Data</h3>
            <textarea
              value={inputData}
              onChange={handleInputChange}
              placeholder={`Enter your ${options.inputFormat.toUpperCase()} data here...`}
        style={{
          width: '100%',
                minHeight: '200px',
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
                onClick={() => loadSample(options.inputFormat === 'csv' ? sampleCsvData : sampleJsonData)}
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

          {/* Convert Button */}
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={convertData}
              disabled={isProcessing || !inputData.trim() || options.inputFormat === options.outputFormat}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: isProcessing || !inputData.trim() || options.inputFormat === options.outputFormat ? 'var(--bg-tertiary)' : '#10b981',
                color: isProcessing || !inputData.trim() || options.inputFormat === options.outputFormat ? 'var(--text-secondary)' : 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: isProcessing || !inputData.trim() || options.inputFormat === options.outputFormat ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem'
              }}
            >
              <FontAwesomeIcon icon={isProcessing ? "fas fa-spinner fa-spin" : "fas fa-exchange-alt"} />
              {isProcessing ? 'Converting...' : 'Convert Data'}
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

          {outputData && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-file-export" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Converted Data ({options.outputFormat.toUpperCase()})
                </h3>
                <button
                  onClick={() => copyToClipboard(outputData)}
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
                minHeight: '200px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflow: 'auto',
                maxHeight: '400px'
              }}>
                {outputData}
              </div>
            </div>
          )}

          {/* Format Information */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              Format Information
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '1rem' 
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-file-csv" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  CSV Format
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Comma-separated values format. Great for spreadsheet applications and data analysis. 
                  Supports custom delimiters and header rows.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-code" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  JSON Format
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  JavaScript Object Notation format. Perfect for APIs and web applications. 
                  Supports nested data structures and arrays.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-file-code" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  XML Format
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Extensible Markup Language format. Ideal for structured data exchange and configuration files. 
                  Supports hierarchical data structures.
                </p>
              </div>
            </div>
          </div>
        </div>

        <AdSlot slotId="csv-converter-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Data Format Conversion & Best Practices
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the differences between CSV, JSON, and XML formats?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Format differences include: <strong>CSV (Comma-Separated Values):</strong> 
                Simple tabular format, easy to read and edit, perfect for spreadsheets. <strong>JSON (JavaScript Object Notation):</strong> 
                Lightweight data interchange format, supports nested structures, ideal for APIs. <strong>XML (Extensible Markup Language):</strong> 
                Structured markup language, supports complex hierarchies, great for configuration files. <strong>Use Cases:</strong> 
                CSV for data analysis, JSON for web APIs, XML for structured documents. <strong>Performance:</strong> 
                JSON is fastest to parse, CSV is most compact, XML is most verbose but most flexible.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I handle special characters and data validation during conversion?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Special character handling includes: <strong>Quote Escaping:</strong> 
                Use double quotes to escape quotes within CSV fields. <strong>Delimiter Handling:</strong> 
                Choose appropriate delimiters to avoid conflicts with data content. <strong>Encoding:</strong> 
                Ensure proper character encoding (UTF-8) for international characters. <strong>Data Validation:</strong> 
                Check for required fields, data types, and format consistency. <strong>Error Handling:</strong> 
                Implement robust error handling for malformed data. <strong>Whitespace:</strong> 
                Decide whether to trim or preserve whitespace based on requirements.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the best practices for data conversion and format selection?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Best practices include: <strong>Format Selection:</strong> 
                Choose format based on use case, performance requirements, and compatibility needs. <strong>Data Structure:</strong> 
                Plan data structure before conversion to ensure consistency. <strong>Header Management:</strong> 
                Always include meaningful headers for better data understanding. <strong>Validation:</strong> 
                Validate data before and after conversion to ensure accuracy. <strong>Documentation:</strong> 
                Document data format specifications and conversion rules. <strong>Testing:</strong> 
                Test conversions with sample data to verify correctness.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I optimize data conversion performance for large datasets?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Performance optimization strategies: <strong>Streaming:</strong> 
                Process data in chunks rather than loading entire dataset into memory. <strong>Lazy Loading:</strong> 
                Load and convert data on-demand rather than all at once. <strong>Compression:</strong> 
                Use compression for large datasets to reduce transfer time. <strong>Caching:</strong> 
                Cache converted data to avoid repeated conversions. <strong>Parallel Processing:</strong> 
                Use multiple threads or workers for large dataset processing. <strong>Memory Management:</strong> 
                Monitor memory usage and implement garbage collection strategies.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common data conversion challenges and how to solve them?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common challenges and solutions: <strong>Data Type Mismatches:</strong> 
                Implement type conversion rules and validation. <strong>Missing Values:</strong> 
                Define default values or null handling strategies. <strong>Encoding Issues:</strong> 
                Ensure consistent character encoding throughout the process. <strong>Nested Data:</strong> 
                Flatten or preserve nested structures based on target format capabilities. <strong>Large Files:</strong> 
                Implement streaming or chunked processing for memory efficiency. <strong>Schema Changes:</strong> 
                Version control data schemas and implement migration strategies.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I ensure data integrity during format conversion?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Data integrity measures include: <strong>Validation Rules:</strong> 
                Implement comprehensive validation before and after conversion. <strong>Checksums:</strong> 
                Use checksums or hashes to verify data integrity. <strong>Audit Trails:</strong> 
                Log all conversion operations for tracking and debugging. <strong>Backup Strategies:</strong> 
                Always backup original data before conversion. <strong>Testing:</strong> 
                Implement automated tests to verify conversion accuracy. <strong>Monitoring:</strong> 
                Monitor conversion processes for errors and performance issues.
              </p>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default CsvConverter