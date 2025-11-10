import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const CaseConverter = () => {
  const [inputText, setInputText] = useState('')
  const [convertedText, setConvertedText] = useState('')
  const [selectedCase, setSelectedCase] = useState('uppercase')
  const [conversionHistory, setConversionHistory] = useState([])

  const caseTypes = [
    { id: 'uppercase', name: 'UPPERCASE', description: 'ALL LETTERS IN CAPITALS', icon: 'fas fa-text-height' },
    { id: 'lowercase', name: 'lowercase', description: 'all letters in small case', icon: 'fas fa-text-width' },
    { id: 'titlecase', name: 'Title Case', description: 'First Letter Of Each Word', icon: 'fas fa-text-size' },
    { id: 'camelcase', name: 'camelCase', description: 'firstWordLowercaseThenCamel', icon: 'fas fa-code' },
    { id: 'pascalcase', name: 'PascalCase', description: 'FirstWordUppercaseThenCamel', icon: 'fas fa-code' },
    { id: 'snakecase', name: 'snake_case', description: 'words_separated_by_underscores', icon: 'fas fa-minus' },
    { id: 'kebabcase', name: 'kebab-case', description: 'words-separated-by-hyphens', icon: 'fas fa-minus' },
    { id: 'constantcase', name: 'CONSTANT_CASE', description: 'ALL_WORDS_UPPERCASE_WITH_UNDERSCORES', icon: 'fas fa-exclamation' },
    { id: 'sentencecase', name: 'Sentence case', description: 'First letter uppercase, rest lowercase', icon: 'fas fa-paragraph' },
    { id: 'alternatingcase', name: 'aLtErNaTiNg CaSe', description: 'aLtErNaTiNg UpPeR aNd LoWeR cAsE', icon: 'fas fa-random' },
    { id: 'inversecase', name: 'iNVERSE cASE', description: 'iNVERSE tHE cASE oF eACH lETTER', icon: 'fas fa-exchange-alt' },
    { id: 'dotcase', name: 'dot.case', description: 'words.separated.by.dots', icon: 'fas fa-circle' }
  ]

  const convertToCase = useCallback((text, caseType) => {
    if (!text.trim()) return ''

    switch (caseType) {
      case 'uppercase':
        return text.toUpperCase()
      
      case 'lowercase':
        return text.toLowerCase()
      
      case 'titlecase':
        return text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        )
      
      case 'camelcase':
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
      
      case 'pascalcase':
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
          .replace(/^[a-z]/, (chr) => chr.toUpperCase())
      
      case 'snakecase':
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '_')
          .replace(/^_+|_+$/g, '')
      
      case 'kebabcase':
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      
      case 'constantcase':
        return text
          .toUpperCase()
          .replace(/[^A-Z0-9]+/g, '_')
          .replace(/^_+|_+$/g, '')
      
      case 'sentencecase':
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
      
      case 'alternatingcase':
        return text
          .split('')
          .map((char, index) => 
            index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
          )
          .join('')
      
      case 'inversecase':
        return text
          .split('')
          .map(char => 
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
          )
          .join('')
      
      case 'dotcase':
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '.')
          .replace(/^\.+|\.+$/g, '')
      
      default:
        return text
    }
  }, [])

  const handleConvert = useCallback(() => {
    if (!inputText.trim()) {
      alert('Please enter some text to convert')
      return
    }

    const converted = convertToCase(inputText, selectedCase)
    setConvertedText(converted)

    // Add to history
    const historyItem = {
      original: inputText,
      converted: converted,
      caseType: selectedCase,
      timestamp: new Date().toISOString()
    }
    setConversionHistory(prev => [historyItem, ...prev.slice(0, 9)])
  }, [inputText, selectedCase, convertToCase])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const clearAll = () => {
    setInputText('')
    setConvertedText('')
  }

  const clearHistory = () => {
    setConversionHistory([])
  }

  const loadFromHistory = (historyItem) => {
    setInputText(historyItem.original)
    setConvertedText(historyItem.converted)
    setSelectedCase(historyItem.caseType)
  }

  const removeFromHistory = (index) => {
    setConversionHistory(prev => prev.filter((_, i) => i !== index))
  }

  const swapText = () => {
    setInputText(convertedText)
    setConvertedText(inputText)
  }

  return (
    <div className="tool-container">
      {/* Main Tool Interface */}
      <div className="tool-card">
        <div className="tool-header">
          <div className="tool-icon">
            <FontAwesomeIcon icon="fas fa-exchange-alt" />
          </div>
          <div className="tool-title-section">
            <h2 className="tool-title">Case Converter</h2>
            <p className="tool-subtitle">Convert text between different case formats instantly 🔄</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="input-section">
          <h3 className="input-title">
            <FontAwesomeIcon icon="fas fa-keyboard" className="title-icon" />
            Input Text
          </h3>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter the text you want to convert..."
            className="input-textarea"
            rows={4}
          />
          <div className="input-stats">
            <span className="char-count">Characters: {inputText.length}</span>
            <span className="word-count">Words: {inputText.trim() ? inputText.trim().split(/\s+/).length : 0}</span>
          </div>
        </div>

        {/* Case Type Selection */}
        <div className="case-section">
          <h3 className="case-title">
            <FontAwesomeIcon icon="fas fa-list" className="title-icon" />
            Select Case Type
          </h3>
          <div className="case-grid">
            {caseTypes.map((caseType) => (
              <div key={caseType.id} className="case-item">
                <label className="case-label">
                  <input
                    type="radio"
                    name="caseType"
                    value={caseType.id}
                    checked={selectedCase === caseType.id}
                    onChange={(e) => setSelectedCase(e.target.value)}
                    className="case-radio"
                  />
                  <div className="case-info">
                    <div className="case-name">
                      <FontAwesomeIcon icon={caseType.icon} className="case-icon" />
                      {caseType.name}
                    </div>
                    <div className="case-description">{caseType.description}</div>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <button onClick={handleConvert} className="convert-btn">
            <FontAwesomeIcon icon="fas fa-magic" />
            Convert Text
          </button>
        </div>

        {/* Output Section */}
        {convertedText && (
          <div className="output-section">
            <div className="output-header">
              <h3 className="output-title">
                <FontAwesomeIcon icon="fas fa-check-circle" className="title-icon" />
                Converted Text
              </h3>
              <div className="output-actions">
                <button onClick={() => copyToClipboard(convertedText)} className="btn-secondary">
                  <FontAwesomeIcon icon="fas fa-copy" />
                  Copy Result
                </button>
                <button onClick={swapText} className="btn-secondary">
                  <FontAwesomeIcon icon="fas fa-exchange-alt" />
                  Swap Text
                </button>
              </div>
            </div>
            <div className="output-display">
              <textarea
                value={convertedText}
                readOnly
                className="output-textarea"
                rows={4}
              />
            </div>
          </div>
        )}

        {/* Conversion History */}
        {conversionHistory.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <h3 className="history-title">
                <FontAwesomeIcon icon="fas fa-history" className="title-icon" />
                Conversion History
              </h3>
              <button onClick={clearHistory} className="clear-history-btn">
                <FontAwesomeIcon icon="fas fa-trash" />
                Clear History
              </button>
            </div>
            <div className="history-list">
              {conversionHistory.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-content" onClick={() => loadFromHistory(item)}>
                    <div className="history-original">
                      {item.original.length > 50 
                        ? `${item.original.substring(0, 50)}...` 
                        : item.original
                      }
                    </div>
                    <div className="history-converted">
                      {item.converted.length > 50 
                        ? `${item.converted.substring(0, 50)}...` 
                        : item.converted
                      }
                    </div>
                    <div className="history-meta">
                      <span className="history-case">{caseTypes.find(c => c.id === item.caseType)?.name}</span>
                      <span className="history-time">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromHistory(index)}
                    className="remove-history-btn"
                  >
                    <FontAwesomeIcon icon="fas fa-times" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={clearAll} className="btn-secondary">
            <FontAwesomeIcon icon="fas fa-trash" />
            Clear All
          </button>
        </div>
      </div>

      {/* Tool Information */}
      <div className="info-card">
        <h3 className="info-title">
          <FontAwesomeIcon icon="fas fa-info-circle" className="title-icon" />
          About Case Converter
        </h3>
        <div className="info-content">
          <p>
            Our Case Converter is a powerful text transformation tool that converts text between 
            various case formats instantly. Whether you're working with code, writing content, 
            or formatting data, this tool provides 12 different case conversion options to meet 
            your specific needs.
          </p>
          <p>
            Perfect for developers working with different naming conventions (camelCase, snake_case, 
            kebab-case), content creators formatting titles and headings, or anyone who needs to 
            quickly transform text formatting. All conversions happen instantly in your browser 
            with no data sent to external servers.
          </p>
          <p>
            The tool includes a conversion history feature to help you keep track of your recent 
            transformations and easily reuse previous conversions. You can also swap text between 
            input and output fields for quick editing.
          </p>
        </div>
      </div>

      {/* How to Use */}
      <div className="how-to-card">
        <h3 className="how-to-title">
          <FontAwesomeIcon icon="fas fa-play-circle" className="title-icon" />
          How to Use Case Converter
        </h3>
        <div className="steps-list">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Enter Your Text</h4>
              <p>Type or paste the text you want to convert into the input field.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Select Case Type</h4>
              <p>Choose from 12 different case formats including camelCase, snake_case, Title Case, and more.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Convert & Use</h4>
              <p>Click "Convert Text" to transform your text. Copy the result or swap it back to the input field.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="features-card">
        <h3 className="features-title">
          <FontAwesomeIcon icon="fas fa-star" className="title-icon" />
          Key Features
        </h3>
        <div className="features-grid">
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-code" className="feature-icon" />
            <h4>12 Case Types</h4>
            <p>UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-bolt" className="feature-icon" />
            <h4>Instant Conversion</h4>
            <p>Real-time text transformation with immediate results</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-history" className="feature-icon" />
            <h4>Conversion History</h4>
            <p>Keep track of your recent conversions for easy reuse</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-exchange-alt" className="feature-icon" />
            <h4>Text Swapping</h4>
            <p>Quickly swap text between input and output fields</p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="use-cases-card">
        <h3 className="use-cases-title">
          <FontAwesomeIcon icon="fas fa-lightbulb" className="title-icon" />
          Popular Use Cases
        </h3>
        <div className="use-cases-grid">
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-code" className="use-case-icon" />
            <h4>Programming</h4>
            <p>Convert variable names between camelCase, snake_case, and PascalCase</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-file-alt" className="use-case-icon" />
            <h4>Content Writing</h4>
            <p>Format titles, headings, and text for different platforms</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-database" className="use-case-icon" />
            <h4>Data Processing</h4>
            <p>Standardize text formatting in datasets and spreadsheets</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-globe" className="use-case-icon" />
            <h4>SEO & URLs</h4>
            <p>Convert text to URL-friendly formats like kebab-case</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tool-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .tool-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 24px;
          padding: 2rem;
          color: white;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }

        .tool-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .tool-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .tool-icon {
          font-size: 2.5rem;
          opacity: 0.9;
        }

        .tool-title-section {
          flex: 1;
        }

        .tool-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .tool-subtitle {
          font-size: 1.1rem;
          margin: 0.5rem 0 0 0;
          opacity: 0.9;
          font-weight: 300;
        }

        .input-section, .case-section, .output-section, .history-section {
          position: relative;
          z-index: 1;
          margin-bottom: 2rem;
        }

        .input-title, .case-title, .output-title, .history-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .title-icon {
          opacity: 0.8;
        }

        .input-textarea, .output-textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          min-height: 100px;
        }

        .input-textarea::placeholder, .output-textarea::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .input-textarea:focus, .output-textarea:focus {
          outline: none;
          border-color: rgba(255,255,255,0.5);
        }

        .input-stats {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .case-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .case-item {
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 1rem;
          backdrop-filter: blur(10px);
        }

        .case-label {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
        }

        .case-radio {
          width: 18px;
          height: 18px;
          accent-color: #10b981;
          margin-top: 0.1rem;
        }

        .case-info {
          flex: 1;
        }

        .case-name {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .case-icon {
          opacity: 0.8;
        }

        .case-description {
          font-size: 0.9rem;
          opacity: 0.8;
          line-height: 1.4;
        }

        .convert-btn {
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          border: none;
          border-radius: 12px;
          padding: 1rem 2rem;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255,107,107,0.4);
        }

        .convert-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255,107,107,0.6);
        }

        .output-header, .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .output-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-secondary {
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.3);
          border-color: rgba(255,255,255,0.5);
        }

        .output-display {
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1rem;
          backdrop-filter: blur(10px);
        }

        .clear-history-btn {
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          padding: 0.5rem 1rem;
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .clear-history-btn:hover {
          background: rgba(255,255,255,0.3);
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 1rem;
          backdrop-filter: blur(10px);
        }

        .history-content {
          flex: 1;
          cursor: pointer;
        }

        .history-original {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .history-converted {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 0.25rem;
        }

        .history-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .history-case {
          font-weight: 600;
        }

        .remove-history-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          background: #ef4444;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .remove-history-btn:hover {
          transform: scale(1.1);
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .info-card, .how-to-card, .features-card, .use-cases-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .info-title, .how-to-title, .features-title, .use-cases-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
          font-size: 1.25rem;
          font-weight: 600;
        }

        .title-icon {
          color: var(--accent);
        }

        .info-content {
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .info-content p {
          margin-bottom: 1rem;
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .step {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .step-number {
          background: linear-gradient(45deg, var(--accent), #667eea);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .step-content h4 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .step-content p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .features-grid, .use-cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .feature, .use-case {
          text-align: center;
          padding: 1.5rem;
          border-radius: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }

        .feature:hover, .use-case:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .feature-icon, .use-case-icon {
          font-size: 2rem;
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .feature h4, .use-case h4 {
          margin: 0 0 0.75rem 0;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .feature p, .use-case p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .tool-container {
            padding: 1rem;
          }
          
          .case-grid {
            grid-template-columns: 1fr;
          }
          
          .output-header, .history-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .output-actions {
            flex-wrap: wrap;
          }
          
          .history-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .remove-history-btn {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  )
}

export default CaseConverter
