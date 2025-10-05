import { useState, useCallback } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const EquationFormatter = () => {
  const [inputEquation, setInputEquation] = useState('')
  const [formattedEquation, setFormattedEquation] = useState('')
  const [formatType, setFormatType] = useState('latex')
  const [isFormatting, setIsFormatting] = useState(false)
  const [error, setError] = useState('')
  const [previewMode, setPreviewMode] = useState('text')

  const formatTypes = [
    { value: 'latex', label: 'LaTeX', description: 'Mathematical notation for LaTeX documents' },
    { value: 'mathml', label: 'MathML', description: 'Mathematical Markup Language for web' },
    { value: 'ascii', label: 'ASCII Math', description: 'Plain text mathematical notation' },
    { value: 'unicode', label: 'Unicode Math', description: 'Unicode mathematical symbols' },
    { value: 'html', label: 'HTML Entities', description: 'HTML entity codes for math symbols' },
    { value: 'markdown', label: 'Markdown', description: 'Markdown mathematical notation' }
  ]

  const previewModes = [
    { value: 'text', label: 'Text Preview', description: 'Plain text representation' },
    { value: 'formatted', label: 'Formatted Preview', description: 'Styled mathematical notation' },
    { value: 'code', label: 'Code Block', description: 'Code block with syntax highlighting' }
  ]

  const formatEquation = useCallback(async () => {
    setIsFormatting(true)
    setError('')
    setFormattedEquation('')

    try {
      if (!inputEquation.trim()) {
        throw new Error('Please enter an equation to format')
      }

      let formatted = ''

      switch (formatType) {
        case 'latex':
          formatted = formatToLatex(inputEquation)
          break
        case 'mathml':
          formatted = formatToMathML(inputEquation)
          break
        case 'ascii':
          formatted = formatToASCII(inputEquation)
          break
        case 'unicode':
          formatted = formatToUnicode(inputEquation)
          break
        case 'html':
          formatted = formatToHTML(inputEquation)
          break
        case 'markdown':
          formatted = formatToMarkdown(inputEquation)
          break
        default:
          throw new Error('Invalid format type')
      }

      setFormattedEquation(formatted)
    } catch (err) {
      setError('Error formatting equation: ' + err.message)
    } finally {
      setIsFormatting(false)
    }
  }, [inputEquation, formatType])

  // Formatting functions
  const formatToLatex = (equation) => {
    let formatted = equation
      // Basic replacements
      .replace(/\^(\w+)/g, '^{$1}')  // Superscripts
      .replace(/\^(\d+)/g, '^{$1}')   // Superscripts with numbers
      .replace(/_(\w+)/g, '_{$1}')    // Subscripts
      .replace(/_(\d+)/g, '_{$1}')    // Subscripts with numbers
      .replace(/\*/g, '\\cdot')       // Multiplication
      .replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}')  // Square root
      .replace(/frac\(([^,)]+),([^)]+)\)/g, '\\frac{$1}{$2}')  // Fractions
      .replace(/pi/g, '\\pi')         // Pi
      .replace(/alpha/g, '\\alpha')   // Alpha
      .replace(/beta/g, '\\beta')     // Beta
      .replace(/gamma/g, '\\gamma')   // Gamma
      .replace(/delta/g, '\\delta')   // Delta
      .replace(/theta/g, '\\theta')  // Theta
      .replace(/lambda/g, '\\lambda') // Lambda
      .replace(/mu/g, '\\mu')        // Mu
      .replace(/sigma/g, '\\sigma')  // Sigma
      .replace(/phi/g, '\\phi')      // Phi
      .replace(/omega/g, '\\omega')  // Omega
      .replace(/infty/g, '\\infty')  // Infinity
      .replace(/sum/g, '\\sum')      // Sum
      .replace(/int/g, '\\int')      // Integral
      .replace(/lim/g, '\\lim')      // Limit
      .replace(/sin/g, '\\sin')      // Sine
      .replace(/cos/g, '\\cos')      // Cosine
      .replace(/tan/g, '\\tan')      // Tangent
      .replace(/log/g, '\\log')      // Logarithm
      .replace(/ln/g, '\\ln')        // Natural log
      .replace(/exp/g, '\\exp')      // Exponential
      .replace(/max/g, '\\max')      // Maximum
      .replace(/min/g, '\\min')      // Minimum

    return `$$${formatted}$$`
  }

  const formatToMathML = (equation) => {
    let formatted = equation
      .replace(/\^(\w+)/g, '<msup><mi>$1</mi></msup>')
      .replace(/\^(\d+)/g, '<msup><mn>$1</mn></msup>')
      .replace(/_(\w+)/g, '<msub><mi>$1</mi></msub>')
      .replace(/_(\d+)/g, '<msub><mn>$1</mn></msub>')
      .replace(/\*/g, '<mo>&#x22C5;</mo>')
      .replace(/sqrt\(([^)]+)\)/g, '<msqrt><mi>$1</mi></msqrt>')
      .replace(/frac\(([^,)]+),([^)]+)\)/g, '<mfrac><mi>$1</mi><mi>$2</mi></mfrac>')
      .replace(/pi/g, '<mi>&#x03C0;</mi>')
      .replace(/alpha/g, '<mi>&#x03B1;</mi>')
      .replace(/beta/g, '<mi>&#x03B2;</mi>')
      .replace(/gamma/g, '<mi>&#x03B3;</mi>')
      .replace(/delta/g, '<mi>&#x03B4;</mi>')
      .replace(/theta/g, '<mi>&#x03B8;</mi>')
      .replace(/lambda/g, '<mi>&#x03BB;</mi>')
      .replace(/mu/g, '<mi>&#x03BC;</mi>')
      .replace(/sigma/g, '<mi>&#x03C3;</mi>')
      .replace(/phi/g, '<mi>&#x03C6;</mi>')
      .replace(/omega/g, '<mi>&#x03C9;</mi>')
      .replace(/infty/g, '<mi>&#x221E;</mi>')
      .replace(/sum/g, '<mo>&#x2211;</mo>')
      .replace(/int/g, '<mo>&#x222B;</mo>')
      .replace(/lim/g, '<mo>lim</mo>')
      .replace(/sin/g, '<mi>sin</mi>')
      .replace(/cos/g, '<mi>cos</mi>')
      .replace(/tan/g, '<mi>tan</mi>')
      .replace(/log/g, '<mi>log</mi>')
      .replace(/ln/g, '<mi>ln</mi>')
      .replace(/exp/g, '<mi>exp</mi>')
      .replace(/max/g, '<mi>max</mi>')
      .replace(/min/g, '<mi>min</mi>')

    return `<math xmlns="http://www.w3.org/1998/Math/MathML">${formatted}</math>`
  }

  const formatToASCII = (equation) => {
    let formatted = equation
      .replace(/\^(\w+)/g, '^($1)')
      .replace(/\^(\d+)/g, '^($1)')
      .replace(/_(\w+)/g, '_($1)')
      .replace(/_(\d+)/g, '_($1)')
      .replace(/\*/g, ' * ')
      .replace(/sqrt\(([^)]+)\)/g, 'sqrt($1)')
      .replace(/frac\(([^,)]+),([^)]+)\)/g, '($1)/($2)')
      .replace(/pi/g, 'pi')
      .replace(/alpha/g, 'alpha')
      .replace(/beta/g, 'beta')
      .replace(/gamma/g, 'gamma')
      .replace(/delta/g, 'delta')
      .replace(/theta/g, 'theta')
      .replace(/lambda/g, 'lambda')
      .replace(/mu/g, 'mu')
      .replace(/sigma/g, 'sigma')
      .replace(/phi/g, 'phi')
      .replace(/omega/g, 'omega')
      .replace(/infty/g, 'infinity')
      .replace(/sum/g, 'SUM')
      .replace(/int/g, 'INT')
      .replace(/lim/g, 'lim')
      .replace(/sin/g, 'sin')
      .replace(/cos/g, 'cos')
      .replace(/tan/g, 'tan')
      .replace(/log/g, 'log')
      .replace(/ln/g, 'ln')
      .replace(/exp/g, 'exp')
      .replace(/max/g, 'max')
      .replace(/min/g, 'min')

    return formatted
  }

  const formatToUnicode = (equation) => {
    let formatted = equation
      .replace(/\^(\w+)/g, '^$1')
      .replace(/\^(\d+)/g, '^$1')
      .replace(/_(\w+)/g, '_$1')
      .replace(/_(\d+)/g, '_$1')
      .replace(/\*/g, ' × ')
      .replace(/sqrt\(([^)]+)\)/g, '√($1)')
      .replace(/frac\(([^,)]+),([^)]+)\)/g, '$1/$2')
      .replace(/pi/g, 'π')
      .replace(/alpha/g, 'α')
      .replace(/beta/g, 'β')
      .replace(/gamma/g, 'γ')
      .replace(/delta/g, 'δ')
      .replace(/theta/g, 'θ')
      .replace(/lambda/g, 'λ')
      .replace(/mu/g, 'μ')
      .replace(/sigma/g, 'σ')
      .replace(/phi/g, 'φ')
      .replace(/omega/g, 'ω')
      .replace(/infty/g, '∞')
      .replace(/sum/g, '∑')
      .replace(/int/g, '∫')
      .replace(/lim/g, 'lim')
      .replace(/sin/g, 'sin')
      .replace(/cos/g, 'cos')
      .replace(/tan/g, 'tan')
      .replace(/log/g, 'log')
      .replace(/ln/g, 'ln')
      .replace(/exp/g, 'exp')
      .replace(/max/g, 'max')
      .replace(/min/g, 'min')

    return formatted
  }

  const formatToHTML = (equation) => {
    let formatted = equation
      .replace(/\^(\w+)/g, '<sup>$1</sup>')
      .replace(/\^(\d+)/g, '<sup>$1</sup>')
      .replace(/_(\w+)/g, '<sub>$1</sub>')
      .replace(/_(\d+)/g, '<sub>$1</sub>')
      .replace(/\*/g, ' &times; ')
      .replace(/sqrt\(([^)]+)\)/g, '&radic;($1)')
      .replace(/frac\(([^,)]+),([^)]+)\)/g, '<sup>$1</sup>&frasl;<sub>$2</sub>')
      .replace(/pi/g, '&pi;')
      .replace(/alpha/g, '&alpha;')
      .replace(/beta/g, '&beta;')
      .replace(/gamma/g, '&gamma;')
      .replace(/delta/g, '&delta;')
      .replace(/theta/g, '&theta;')
      .replace(/lambda/g, '&lambda;')
      .replace(/mu/g, '&mu;')
      .replace(/sigma/g, '&sigma;')
      .replace(/phi/g, '&phi;')
      .replace(/omega/g, '&omega;')
      .replace(/infty/g, '&infin;')
      .replace(/sum/g, '&sum;')
      .replace(/int/g, '&int;')
      .replace(/lim/g, 'lim')
      .replace(/sin/g, 'sin')
      .replace(/cos/g, 'cos')
      .replace(/tan/g, 'tan')
      .replace(/log/g, 'log')
      .replace(/ln/g, 'ln')
      .replace(/exp/g, 'exp')
      .replace(/max/g, 'max')
      .replace(/min/g, 'min')

    return formatted
  }

  const formatToMarkdown = (equation) => {
    let formatted = equation
      .replace(/\^(\w+)/g, '^$1^')
      .replace(/\^(\d+)/g, '^$1^')
      .replace(/_(\w+)/g, '~$1~')
      .replace(/_(\d+)/g, '~$1~')
      .replace(/\*/g, ' * ')
      .replace(/sqrt\(([^)]+)\)/g, '√($1)')
      .replace(/frac\(([^,)]+),([^)]+)\)/g, '$1/$2')
      .replace(/pi/g, 'π')
      .replace(/alpha/g, 'α')
      .replace(/beta/g, 'β')
      .replace(/gamma/g, 'γ')
      .replace(/delta/g, 'δ')
      .replace(/theta/g, 'θ')
      .replace(/lambda/g, 'λ')
      .replace(/mu/g, 'μ')
      .replace(/sigma/g, 'σ')
      .replace(/phi/g, 'φ')
      .replace(/omega/g, 'ω')
      .replace(/infty/g, '∞')
      .replace(/sum/g, '∑')
      .replace(/int/g, '∫')
      .replace(/lim/g, 'lim')
      .replace(/sin/g, 'sin')
      .replace(/cos/g, 'cos')
      .replace(/tan/g, 'tan')
      .replace(/log/g, 'log')
      .replace(/ln/g, 'ln')
      .replace(/exp/g, 'exp')
      .replace(/max/g, 'max')
      .replace(/min/g, 'min')

    return `$$${formatted}$$`
  }

  const handleInputChange = (value) => {
    setInputEquation(value)
    setError('')
    setFormattedEquation('')
  }

  const handleFormatTypeChange = (type) => {
    setFormatType(type)
    setError('')
    setFormattedEquation('')
  }

  const clearInputs = () => {
    setInputEquation('')
    setFormattedEquation('')
    setError('')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const loadSample = () => {
    setInputEquation('x^2 + y^2 = r^2')
    setError('')
    setFormattedEquation('')
  }

  const loadAdvancedSample = () => {
    setInputEquation('frac(1,2) * sqrt(pi) * exp(-x^2/2)')
    setError('')
    setFormattedEquation('')
  }

  return (
    <>
      <SEOHead
        title="Equation Formatter - Mathematical Notation Converter"
        description="Convert mathematical equations to LaTeX, MathML, HTML, Unicode, and other formats. Format equations for documents, web pages, and academic papers."
        canonical="/tools/equation-formatter"
        keywords={['equation', 'formatter', 'latex', 'mathml', 'mathematical notation', 'math symbols', 'academic writing']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'Equation Formatter',
          description: 'Convert mathematical equations to various formats',
          url: 'https://www.trimtoolshub.com/tools/equation-formatter',
          applicationCategory: 'MathApplication',
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
          <FontAwesomeIcon icon="fas fa-calculator" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Equation Formatter
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
            Convert mathematical equations to various formats with our Equation Formatter. Whether you're writing 
            academic papers, creating web content, developing educational materials, or working with mathematical 
            notation, our tool provides accurate conversion to multiple output formats.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Equation Formatter supports professional mathematical notation conversion including LaTeX, MathML, 
            HTML entities, Unicode symbols, ASCII math, and Markdown formats. Perfect for students, researchers, 
            educators, web developers, and anyone working with mathematical content.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive formatting including: <strong>Multiple Output Formats:</strong> 
            LaTeX, MathML, HTML, Unicode, ASCII, and Markdown. <strong>Mathematical Symbols:</strong> 
            Support for Greek letters, operators, functions, and special symbols. <strong>Superscripts & Subscripts:</strong> 
            Automatic conversion of power and index notation. <strong>Fractions & Roots:</strong> 
            Proper formatting of fractions and square roots. <strong>Live Preview:</strong> 
            See formatted output in real-time. <strong>Copy & Export:</strong> 
            Easy copying and export of formatted equations.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include multiple output formats, mathematical symbols support, superscripts & subscripts, 
            fractions & roots, live preview, copy & export, and comprehensive documentation about mathematical 
            notation and formatting standards.
          </p>
        </div>
        
        <AdSlot slotId="equation-formatter-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          {/* Input Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Enter Mathematical Equation</h3>
            <textarea
              value={inputEquation}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter your equation here, e.g.: x^2 + y^2 = r^2 or frac(1,2) * sqrt(pi)"
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '1rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                fontFamily: 'monospace',
                resize: 'vertical'
              }}
            />
            
            <div style={{ 
              marginTop: '1rem',
              display: 'flex', 
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={loadSample}
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
                onClick={loadAdvancedSample}
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
                <FontAwesomeIcon icon="fas fa-cogs" />
                Advanced Sample
              </button>
            </div>
          </div>

          {/* Format Type Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Output Format</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              {formatTypes.map((format) => (
                <button
                  key={format.value}
                  onClick={() => handleFormatTypeChange(format.value)}
                  style={{
                    padding: '1rem',
                    backgroundColor: formatType === format.value ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: formatType === format.value ? 'white' : 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ 
                    fontWeight: '600', 
                    marginBottom: '0.25rem',
                    fontSize: '1rem'
                  }}>
                    {format.label}
                  </div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    opacity: 0.8
                  }}>
                    {format.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Format Button */}
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={formatEquation}
              disabled={isFormatting || !inputEquation.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: isFormatting || !inputEquation.trim() ? 'var(--bg-tertiary)' : '#10b981',
                color: isFormatting || !inputEquation.trim() ? 'var(--text-secondary)' : 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: isFormatting || !inputEquation.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem'
              }}
            >
              <FontAwesomeIcon icon={isFormatting ? "fas fa-spinner fa-spin" : "fas fa-magic"} />
              {isFormatting ? 'Formatting...' : 'Format Equation'}
            </button>
            
            <button
              onClick={clearInputs}
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
                marginLeft: '1rem'
              }}
            >
              <FontAwesomeIcon icon="fas fa-trash" />
              Clear
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

          {/* Formatted Output */}
          {formattedEquation && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-code" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Formatted Output ({formatTypes.find(f => f.value === formatType)?.label})
                </h3>
                <button
                  onClick={() => copyToClipboard(formattedEquation)}
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
                fontSize: '1rem',
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                minHeight: '100px',
                overflow: 'auto'
              }}>
                {formattedEquation}
              </div>
            </div>
          )}

          {/* Preview Mode Selection */}
          {formattedEquation && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Preview Mode</h3>
              <div style={{ 
                display: 'flex', 
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                {previewModes.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => setPreviewMode(mode.value)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: previewMode === mode.value ? 'var(--accent)' : 'var(--bg-secondary)',
                      color: previewMode === mode.value ? 'white' : 'var(--text-primary)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mathematical Notation Guide */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-book" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              Mathematical Notation Guide
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
                  <FontAwesomeIcon icon="fas fa-superscript" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Superscripts
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use ^ for powers: x^2, y^3, e^x
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-subscript" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Subscripts
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use _ for indices: x_1, y_2, a_n
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-divide" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Fractions
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use frac(a,b): frac(1,2), frac(x,y)
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-square-root-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Roots
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use sqrt(): sqrt(x), sqrt(2), sqrt(a+b)
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-greek" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Greek Letters
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use names: pi, alpha, beta, gamma, delta
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-function" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Functions
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use names: sin, cos, tan, log, ln, exp
                </p>
              </div>
            </div>
          </div>
        </div>

        <AdSlot slotId="equation-formatter-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Mathematical Notation & Equation Formatting
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What is LaTeX and why is it important for mathematical notation?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                LaTeX is a document preparation system widely used in academia: <strong>Professional Typesetting:</strong> 
                Produces high-quality mathematical notation and scientific documents. <strong>Standard Format:</strong> 
                Widely accepted standard for academic papers and mathematical publications. <strong>Precision:</strong> 
                Allows precise control over mathematical symbols and formatting. <strong>Compatibility:</strong> 
                Works with most academic journals and publishing platforms. <strong>Extensibility:</strong> 
                Supports complex mathematical structures and custom symbols. <strong>Community:</strong> 
                Large community and extensive documentation available.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What is MathML and how is it used on the web?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                MathML (Mathematical Markup Language) is the standard for web math: <strong>Web Standard:</strong> 
                W3C standard for displaying mathematical notation on web pages. <strong>Accessibility:</strong> 
                Provides semantic structure for screen readers and assistive technologies. <strong>Browser Support:</strong> 
                Supported by modern browsers for rendering mathematical content. <strong>Integration:</strong> 
                Works with HTML and CSS for styled mathematical content. <strong>SEO Benefits:</strong> 
                Search engines can understand and index mathematical content. <strong>Future-Proof:</strong> 
                Ensures mathematical content remains accessible as web standards evolve.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I choose the right format for my mathematical content?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Format selection depends on your use case: <strong>Academic Papers:</strong> 
                Use LaTeX for professional typesetting and journal submissions. <strong>Web Content:</strong> 
                Use MathML for accessible web display or HTML entities for simple symbols. <strong>Documents:</strong> 
                Use Unicode symbols for Word documents and general text editors. <strong>Code Documentation:</strong> 
                Use ASCII math for plain text and code comments. <strong>Markdown:</strong> 
                Use Markdown format for GitHub, Jupyter notebooks, and documentation. <strong>Email/Text:</strong> 
                Use Unicode symbols for readable mathematical notation in plain text.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the best practices for mathematical notation?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Best practices for mathematical notation include: <strong>Consistency:</strong> 
                Use consistent notation throughout your document or project. <strong>Clarity:</strong> 
                Choose notation that clearly communicates mathematical concepts. <strong>Standards:</strong> 
                Follow established mathematical conventions and standards. <strong>Accessibility:</strong> 
                Ensure notation is accessible to readers with different abilities. <strong>Context:</strong> 
                Consider your audience and the context of use. <strong>Testing:</strong> 
                Test notation across different platforms and devices for compatibility.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I ensure my mathematical notation is accessible?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Accessibility considerations for mathematical notation: <strong>Semantic Markup:</strong> 
                Use MathML or proper HTML structure for screen readers. <strong>Alt Text:</strong> 
                Provide alternative text descriptions for complex equations. <strong>Font Support:</strong> 
                Ensure mathematical symbols render correctly across devices. <strong>Color Contrast:</strong> 
                Maintain sufficient contrast for mathematical symbols and text. <strong>Font Size:</strong> 
                Use appropriate font sizes for readability on different devices. <strong>Testing:</strong> 
                Test with assistive technologies and different user needs.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common mathematical notation errors to avoid?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common notation errors to avoid: <strong>Inconsistent Symbols:</strong> 
                Using different symbols for the same mathematical concept. <strong>Ambiguous Notation:</strong> 
                Using notation that could be interpreted multiple ways. <strong>Missing Context:</strong> 
                Not providing sufficient context for mathematical symbols. <strong>Format Inconsistency:</strong> 
                Mixing different formatting styles within the same document. <strong>Accessibility Issues:</strong> 
                Not considering how notation appears to users with different abilities. <strong>Platform Compatibility:</strong> 
                Not testing notation across different platforms and devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EquationFormatter
