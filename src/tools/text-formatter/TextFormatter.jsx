import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const TextFormatter = () => {
  const [inputText, setInputText] = useState('')
  const [formattedText, setFormattedText] = useState('')
  const [selectedFormat, setSelectedFormat] = useState('clean')
  const [formatHistory, setFormatHistory] = useState([])

  const formatTypes = [
    { 
      id: 'clean', 
      name: 'Clean Text', 
      description: 'Remove extra spaces and normalize formatting', 
      icon: 'fas fa-broom' 
    },
    { 
      id: 'paragraphs', 
      name: 'Paragraph Format', 
      description: 'Format text into proper paragraphs', 
      icon: 'fas fa-paragraph' 
    },
    { 
      id: 'bullets', 
      name: 'Bullet Points', 
      description: 'Convert lines to bullet point format', 
      icon: 'fas fa-list-ul' 
    },
    { 
      id: 'numbered', 
      name: 'Numbered List', 
      description: 'Convert lines to numbered list format', 
      icon: 'fas fa-list-ol' 
    },
    { 
      id: 'quotes', 
      name: 'Quote Format', 
      description: 'Add quotation marks to each line', 
      icon: 'fas fa-quote-left' 
    },
    { 
      id: 'code', 
      name: 'Code Block', 
      description: 'Format as code block with proper indentation', 
      icon: 'fas fa-code' 
    },
    { 
      id: 'html', 
      name: 'HTML Format', 
      description: 'Convert to HTML formatted text', 
      icon: 'fab fa-html5' 
    },
    { 
      id: 'markdown', 
      name: 'Markdown Format', 
      description: 'Convert to Markdown formatted text', 
      icon: 'fab fa-markdown' 
    },
    { 
      id: 'json', 
      name: 'JSON Format', 
      description: 'Format as JSON structure', 
      icon: 'fas fa-brackets-curly' 
    },
    { 
      id: 'csv', 
      name: 'CSV Format', 
      description: 'Convert to CSV format', 
      icon: 'fas fa-file-csv' 
    },
    { 
      id: 'reverse', 
      name: 'Reverse Lines', 
      description: 'Reverse the order of lines', 
      icon: 'fas fa-sort-amount-down' 
    },
    { 
      id: 'sort', 
      name: 'Sort Lines', 
      description: 'Sort lines alphabetically', 
      icon: 'fas fa-sort-alpha-down' 
    }
  ]

  const formatText = useCallback((text, formatType) => {
    if (!text.trim()) return ''

    const lines = text.split('\n').filter(line => line.trim() !== '')
    
    switch (formatType) {
      case 'clean':
        return text
          .replace(/\s+/g, ' ')
          .replace(/\n\s*\n/g, '\n\n')
          .trim()
      
      case 'paragraphs':
        return lines
          .join(' ')
          .split('. ')
          .map(sentence => sentence.trim())
          .filter(sentence => sentence)
          .map(sentence => sentence.endsWith('.') ? sentence : sentence + '.')
          .join('\n\n')
      
      case 'bullets':
        return lines.map(line => `• ${line.trim()}`).join('\n')
      
      case 'numbered':
        return lines.map((line, index) => `${index + 1}. ${line.trim()}`).join('\n')
      
      case 'quotes':
        return lines.map(line => `"${line.trim()}"`).join('\n')
      
      case 'code':
        return lines.map(line => `    ${line.trim()}`).join('\n')
      
      case 'html':
        return lines.map(line => `<p>${line.trim()}</p>`).join('\n')
      
      case 'markdown':
        return lines.map(line => `- ${line.trim()}`).join('\n')
      
      case 'json':
        try {
          const jsonData = lines.map(line => ({ text: line.trim() }))
          return JSON.stringify(jsonData, null, 2)
        } catch {
          return lines.map(line => `"${line.trim()}"`).join(',\n')
        }
      
      case 'csv':
        return lines.map(line => `"${line.trim()}"`).join('\n')
      
      case 'reverse':
        return lines.reverse().join('\n')
      
      case 'sort':
        return lines.sort().join('\n')
      
      default:
        return text
    }
  }, [])

  const handleFormat = useCallback(() => {
    if (!inputText.trim()) {
      alert('Please enter some text to format')
      return
    }

    const formatted = formatText(inputText, selectedFormat)
    setFormattedText(formatted)

    // Add to history
    const historyItem = {
      original: inputText,
      formatted: formatted,
      formatType: selectedFormat,
      timestamp: new Date().toISOString()
    }
    setFormatHistory(prev => [historyItem, ...prev.slice(0, 9)])
  }, [inputText, selectedFormat, formatText])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const clearAll = () => {
    setInputText('')
    setFormattedText('')
  }

  const clearHistory = () => {
    setFormatHistory([])
  }

  const loadFromHistory = (historyItem) => {
    setInputText(historyItem.original)
    setFormattedText(historyItem.formatted)
    setSelectedFormat(historyItem.formatType)
  }

  const removeFromHistory = (index) => {
    setFormatHistory(prev => prev.filter((_, i) => i !== index))
  }

  const swapText = () => {
    setInputText(formattedText)
    setFormattedText(inputText)
  }

  const getTextStats = (text) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const lines = text.split('\n').length
    const chars = text.length
    const charsNoSpaces = text.replace(/\s/g, '').length
    
    return { words, lines, chars, charsNoSpaces }
  }

  const inputStats = getTextStats(inputText)
  const outputStats = getTextStats(formattedText)

  return (
    <div className="tool-container">
      {/* Main Tool Interface */}
      <div className="tool-card">
        <div className="tool-header">
          <div className="tool-icon">
            <FontAwesomeIcon icon="fas fa-align-left" />
          </div>
          <div className="tool-title-section">
            <h2 className="tool-title">Text Formatter</h2>
            <p className="tool-subtitle">Format and structure your text with professional formatting options 📝</p>
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
            placeholder="Enter the text you want to format..."
            className="input-textarea"
            rows={6}
          />
          <div className="input-stats">
            <span className="stat-item">
              <FontAwesomeIcon icon="fas fa-font" />
              Words: {inputStats.words}
            </span>
            <span className="stat-item">
              <FontAwesomeIcon icon="fas fa-list" />
              Lines: {inputStats.lines}
            </span>
            <span className="stat-item">
              <FontAwesomeIcon icon="fas fa-text-width" />
              Characters: {inputStats.chars}
            </span>
            <span className="stat-item">
              <FontAwesomeIcon icon="fas fa-text-height" />
              No Spaces: {inputStats.charsNoSpaces}
            </span>
          </div>
        </div>

        {/* Format Type Selection */}
        <div className="format-section">
          <h3 className="format-title">
            <FontAwesomeIcon icon="fas fa-list" className="title-icon" />
            Select Format Type
          </h3>
          <div className="format-grid">
            {formatTypes.map((formatType) => (
              <div key={formatType.id} className="format-item">
                <label className="format-label">
                  <input
                    type="radio"
                    name="formatType"
                    value={formatType.id}
                    checked={selectedFormat === formatType.id}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="format-radio"
                  />
                  <div className="format-info">
                    <div className="format-name">
                      <FontAwesomeIcon icon={formatType.icon} className="format-icon" />
                      {formatType.name}
                    </div>
                    <div className="format-description">{formatType.description}</div>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <button onClick={handleFormat} className="format-btn">
            <FontAwesomeIcon icon="fas fa-magic" />
            Format Text
          </button>
        </div>

        {/* Output Section */}
        {formattedText && (
          <div className="output-section">
            <div className="output-header">
              <h3 className="output-title">
                <FontAwesomeIcon icon="fas fa-check-circle" className="title-icon" />
                Formatted Text
              </h3>
              <div className="output-actions">
                <button onClick={() => copyToClipboard(formattedText)} className="btn-secondary">
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
                value={formattedText}
                readOnly
                className="output-textarea"
                rows={6}
              />
            </div>
            <div className="output-stats">
              <span className="stat-item">
                <FontAwesomeIcon icon="fas fa-font" />
                Words: {outputStats.words}
              </span>
              <span className="stat-item">
                <FontAwesomeIcon icon="fas fa-list" />
                Lines: {outputStats.lines}
              </span>
              <span className="stat-item">
                <FontAwesomeIcon icon="fas fa-text-width" />
                Characters: {outputStats.chars}
              </span>
              <span className="stat-item">
                <FontAwesomeIcon icon="fas fa-text-height" />
                No Spaces: {outputStats.charsNoSpaces}
              </span>
            </div>
          </div>
        )}

        {/* Format History */}
        {formatHistory.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <h3 className="history-title">
                <FontAwesomeIcon icon="fas fa-history" className="title-icon" />
                Format History
              </h3>
              <button onClick={clearHistory} className="clear-history-btn">
                <FontAwesomeIcon icon="fas fa-trash" />
                Clear History
              </button>
            </div>
            <div className="history-list">
              {formatHistory.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-content" onClick={() => loadFromHistory(item)}>
                    <div className="history-original">
                      {item.original.length > 50 
                        ? `${item.original.substring(0, 50)}...` 
                        : item.original
                      }
                    </div>
                    <div className="history-formatted">
                      {item.formatted.length > 50 
                        ? `${item.formatted.substring(0, 50)}...` 
                        : item.formatted
                      }
                    </div>
                    <div className="history-meta">
                      <span className="history-format">
                        {formatTypes.find(f => f.id === item.formatType)?.name}
                      </span>
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
          About Text Formatter
        </h3>
        <div className="info-content">
          <p>
            Our Text Formatter is a comprehensive text processing tool that helps you transform 
            and structure your text in various professional formats. Whether you're writing 
            content, preparing data, or formatting code, this tool provides 12 different 
            formatting options to meet your specific needs.
          </p>
          <p>
            Perfect for content creators who need to format text for different platforms, 
            developers working with structured data formats, or anyone who needs to quickly 
            transform text formatting. All formatting happens instantly in your browser 
            with no data sent to external servers.
          </p>
          <p>
            The tool includes detailed text statistics, format history to track your recent 
            transformations, and the ability to swap text between input and output fields 
            for quick editing and refinement.
          </p>
        </div>
      </div>

      {/* How to Use */}
      <div className="how-to-card">
        <h3 className="how-to-title">
          <FontAwesomeIcon icon="fas fa-play-circle" className="title-icon" />
          How to Use Text Formatter
        </h3>
        <div className="steps-list">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Enter Your Text</h4>
              <p>Type or paste the text you want to format into the input field.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Select Format Type</h4>
              <p>Choose from 12 different formatting options including paragraphs, lists, code blocks, and more.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Format & Use</h4>
              <p>Click "Format Text" to transform your text. Copy the result or swap it back to the input field.</p>
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
            <FontAwesomeIcon icon="fas fa-list" className="feature-icon" />
            <h4>12 Format Types</h4>
            <p>Clean text, paragraphs, bullets, numbered lists, quotes, code blocks, and more</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-chart-bar" className="feature-icon" />
            <h4>Text Statistics</h4>
            <p>Real-time word count, line count, character count, and character count without spaces</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-history" className="feature-icon" />
            <h4>Format History</h4>
            <p>Keep track of your recent formatting operations for easy reuse</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-exchange-alt" className="feature-icon" />
            <h4>Text Swapping</h4>
            <p>Quickly swap text between input and output fields for iterative editing</p>
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
            <FontAwesomeIcon icon="fas fa-file-alt" className="use-case-icon" />
            <h4>Content Writing</h4>
            <p>Format articles, blog posts, and documents with proper paragraph structure</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-code" className="use-case-icon" />
            <h4>Code Formatting</h4>
            <p>Format code snippets, JSON data, and structured text for development</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-list" className="use-case-icon" />
            <h4>List Creation</h4>
            <p>Convert text into bullet points, numbered lists, or structured formats</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-database" className="use-case-icon" />
            <h4>Data Processing</h4>
            <p>Transform text data into CSV, JSON, or other structured formats</p>
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

        .input-section, .format-section, .output-section, .history-section {
          position: relative;
          z-index: 1;
          margin-bottom: 2rem;
        }

        .input-title, .format-title, .output-title, .history-title {
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
          min-height: 120px;
        }

        .input-textarea::placeholder, .output-textarea::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .input-textarea:focus, .output-textarea:focus {
          outline: none;
          border-color: rgba(255,255,255,0.5);
        }

        .input-stats, .output-stats {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          opacity: 0.8;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .format-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .format-item {
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 1rem;
          backdrop-filter: blur(10px);
        }

        .format-label {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
        }

        .format-radio {
          width: 18px;
          height: 18px;
          accent-color: #10b981;
          margin-top: 0.1rem;
        }

        .format-info {
          flex: 1;
        }

        .format-name {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .format-icon {
          opacity: 0.8;
        }

        .format-description {
          font-size: 0.9rem;
          opacity: 0.8;
          line-height: 1.4;
        }

        .format-btn {
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

        .format-btn:hover {
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

        .history-formatted {
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

        .history-format {
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
          
          .format-grid {
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
          
          .input-stats, .output-stats {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default TextFormatter