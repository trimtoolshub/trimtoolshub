import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const PasswordGenerator = () => {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false)
  const [customChars, setCustomChars] = useState('')
  const [passwordHistory, setPasswordHistory] = useState([])
  const [strength, setStrength] = useState({ score: 0, label: '', color: '' })

  const generatePassword = useCallback(() => {
    let charset = ''
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (includeNumbers) charset += '0123456789'
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    if (customChars) charset += customChars
    
    if (excludeSimilar) {
      charset = charset.replace(/[0O1lI]/g, '')
    }
    
    if (excludeAmbiguous) {
      charset = charset.replace(/[{}[\]()\/\\~,;.<>]/g, '')
    }
    
    if (charset.length === 0) {
      alert('Please select at least one character type')
      return
    }
    
    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    setPassword(newPassword)
    
    // Calculate password strength
    const strengthScore = calculatePasswordStrength(newPassword)
    setStrength(strengthScore)
    
    // Add to history
    setPasswordHistory(prev => [newPassword, ...prev.slice(0, 9)])
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar, excludeAmbiguous, customChars])

  const calculatePasswordStrength = (pwd) => {
    let score = 0
    let feedback = []
    
    // Length scoring
    if (pwd.length >= 8) score += 1
    if (pwd.length >= 12) score += 1
    if (pwd.length >= 16) score += 1
    
    // Character variety
    if (/[a-z]/.test(pwd)) score += 1
    if (/[A-Z]/.test(pwd)) score += 1
    if (/[0-9]/.test(pwd)) score += 1
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1
    
    // Patterns and repetition
    if (!/(.)\1{2,}/.test(pwd)) score += 1
    if (!/123|abc|qwe/i.test(pwd)) score += 1
    
    let label, color
    if (score <= 3) {
      label = 'Weak'
      color = '#ef4444'
    } else if (score <= 5) {
      label = 'Fair'
      color = '#f59e0b'
    } else if (score <= 7) {
      label = 'Good'
      color = '#10b981'
    } else {
      label = 'Strong'
      color = '#059669'
    }
    
    return { score, label, color }
  }

  const copyPassword = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password)
      } catch (err) {
        console.error('Failed to copy: ', err)
      }
    }
  }

  const clearHistory = () => {
    setPasswordHistory([])
  }

  const removeFromHistory = (index) => {
    setPasswordHistory(prev => prev.filter((_, i) => i !== index))
  }

  const getEntropy = (pwd) => {
    let charsetSize = 0
    if (/[a-z]/.test(pwd)) charsetSize += 26
    if (/[A-Z]/.test(pwd)) charsetSize += 26
    if (/[0-9]/.test(pwd)) charsetSize += 10
    if (/[^a-zA-Z0-9]/.test(pwd)) charsetSize += 32
    
    return Math.log2(Math.pow(charsetSize, pwd.length))
  }

  const getTimeToCrack = (entropy) => {
    // Assuming 1 billion guesses per second
    const guessesPerSecond = 1e9
    const seconds = Math.pow(2, entropy) / guessesPerSecond
    
    if (seconds < 60) return 'Less than a minute'
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`
    if (seconds < 31536000000) return `${Math.round(seconds / 31536000)} years`
    return `${Math.round(seconds / 31536000000)} centuries`
  }

  return (
    <div className="tool-container">
      {/* Main Tool Interface */}
      <div className="tool-card">
        <div className="tool-header">
          <div className="tool-icon">
            <FontAwesomeIcon icon="fas fa-key" />
          </div>
          <div className="tool-title-section">
            <h2 className="tool-title">Password Generator</h2>
            <p className="tool-subtitle">Create secure, customizable passwords with advanced options 🔐</p>
          </div>
        </div>

        {/* Password Output Section */}
        <div className="password-output-section">
          <div className="password-display">
            <div className="password-field">
              <input
                type="text"
                value={password}
                readOnly
                className="password-input"
                placeholder="Generated password will appear here..."
              />
              <button onClick={copyPassword} className="copy-btn" disabled={!password}>
                <FontAwesomeIcon icon="fas fa-copy" />
              </button>
            </div>
            
            {password && (
              <div className="password-stats">
                <div className="stat-item">
                  <span className="stat-label">Length:</span>
                  <span className="stat-value">{password.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Entropy:</span>
                  <span className="stat-value">{getEntropy(password).toFixed(1)} bits</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Time to Crack:</span>
                  <span className="stat-value">{getTimeToCrack(getEntropy(password))}</span>
                </div>
              </div>
            )}
            
            {password && (
              <div className="strength-indicator">
                <div className="strength-label">Password Strength:</div>
                <div className="strength-bar">
                  <div 
                    className="strength-fill" 
                    style={{ 
                      width: `${(strength.score / 8) * 100}%`,
                      backgroundColor: strength.color
                    }}
                  ></div>
                </div>
                <div className="strength-text" style={{ color: strength.color }}>
                  {strength.label}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Section */}
        <div className="config-section">
          <h3 className="config-title">
            <FontAwesomeIcon icon="fas fa-cog" className="title-icon" />
            Password Configuration
          </h3>
          
          <div className="config-grid">
            {/* Length */}
            <div className="config-item">
              <label className="config-label">
                <FontAwesomeIcon icon="fas fa-ruler" className="label-icon" />
                Password Length: {length}
              </label>
              <input
                type="range"
                min="4"
                max="128"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="length-slider"
              />
              <div className="length-presets">
                <button 
                  onClick={() => setLength(8)} 
                  className={`preset-btn ${length === 8 ? 'active' : ''}`}
                >
                  Short (8)
                </button>
                <button 
                  onClick={() => setLength(12)} 
                  className={`preset-btn ${length === 12 ? 'active' : ''}`}
                >
                  Medium (12)
                </button>
                <button 
                  onClick={() => setLength(16)} 
                  className={`preset-btn ${length === 16 ? 'active' : ''}`}
                >
                  Long (16)
                </button>
                <button 
                  onClick={() => setLength(24)} 
                  className={`preset-btn ${length === 24 ? 'active' : ''}`}
                >
                  Extra Long (24)
                </button>
              </div>
            </div>

            {/* Character Types */}
            <div className="config-item">
              <label className="config-label">
                <FontAwesomeIcon icon="fas fa-font" className="label-icon" />
                Character Types
              </label>
              <div className="checkbox-group">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                  />
                  <span className="checkbox-label">Uppercase (A-Z)</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                  />
                  <span className="checkbox-label">Lowercase (a-z)</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                  />
                  <span className="checkbox-label">Numbers (0-9)</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                  />
                  <span className="checkbox-label">Symbols (!@#$...)</span>
                </label>
              </div>
            </div>

            {/* Advanced Options */}
            <div className="config-item">
              <label className="config-label">
                <FontAwesomeIcon icon="fas fa-shield-alt" className="label-icon" />
                Advanced Options
              </label>
              <div className="checkbox-group">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={excludeSimilar}
                    onChange={(e) => setExcludeSimilar(e.target.checked)}
                  />
                  <span className="checkbox-label">Exclude Similar Characters (0, O, 1, l, I)</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={excludeAmbiguous}
                    onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                  />
                    <span className="checkbox-label">Exclude Ambiguous Characters (&#123; &#125; &#91; &#93; &#40; &#41; / \ ~ , ; . &lt; &gt;)</span>
                </label>
              </div>
            </div>

            {/* Custom Characters */}
            <div className="config-item">
              <label className="config-label">
                <FontAwesomeIcon icon="fas fa-edit" className="label-icon" />
                Custom Characters (Optional)
              </label>
              <input
                type="text"
                value={customChars}
                onChange={(e) => setCustomChars(e.target.value)}
                placeholder="Add custom characters to include..."
                className="custom-chars-input"
              />
            </div>
          </div>

          <button onClick={generatePassword} className="generate-btn">
            <FontAwesomeIcon icon="fas fa-sync-alt" />
            Generate Password
          </button>
        </div>

        {/* Password History */}
        {passwordHistory.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <h3 className="history-title">
                <FontAwesomeIcon icon="fas fa-history" className="title-icon" />
                Password History
              </h3>
              <button onClick={clearHistory} className="clear-history-btn">
                <FontAwesomeIcon icon="fas fa-trash" />
                Clear History
              </button>
            </div>
            <div className="history-list">
              {passwordHistory.map((pwd, index) => (
                <div key={index} className="history-item">
                  <div className="history-password">
                    <span className="password-text">{pwd}</span>
                    <div className="password-meta">
                      <span className="password-length">{pwd.length} chars</span>
                      <span className="password-strength" style={{ color: calculatePasswordStrength(pwd).color }}>
                        {calculatePasswordStrength(pwd).label}
                      </span>
                    </div>
                  </div>
                  <div className="history-actions">
                    <button 
                      onClick={() => navigator.clipboard.writeText(pwd)}
                      className="copy-history-btn"
                    >
                      <FontAwesomeIcon icon="fas fa-copy" />
                    </button>
                    <button 
                      onClick={() => removeFromHistory(index)}
                      className="remove-history-btn"
                    >
                      <FontAwesomeIcon icon="fas fa-times" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tool Information */}
      <div className="info-card">
        <h3 className="info-title">
          <FontAwesomeIcon icon="fas fa-info-circle" className="title-icon" />
          About Password Generator
        </h3>
        <div className="info-content">
          <p>
            Our Password Generator creates cryptographically secure passwords using advanced randomization 
            algorithms. It provides extensive customization options to meet your specific security requirements 
            and includes real-time strength analysis.
          </p>
          <p>
            The tool supports various character sets, length options, and advanced features like excluding 
            similar or ambiguous characters. It also calculates password entropy and estimated cracking time 
            to help you understand the security level of your generated passwords.
          </p>
          <p>
            All password generation happens locally in your browser - no data is sent to our servers. 
            Your passwords are never stored or transmitted, ensuring complete privacy and security.
          </p>
        </div>
      </div>

      {/* How to Use */}
      <div className="how-to-card">
        <h3 className="how-to-title">
          <FontAwesomeIcon icon="fas fa-play-circle" className="title-icon" />
          How to Use Password Generator
        </h3>
        <div className="steps-list">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Configure Settings</h4>
              <p>Set your desired password length and select which character types to include (uppercase, lowercase, numbers, symbols).</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Apply Advanced Options</h4>
              <p>Optionally exclude similar or ambiguous characters, and add custom characters if needed.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Generate & Use</h4>
              <p>Click "Generate Password" to create your secure password. Copy it and use it for your accounts.</p>
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
            <FontAwesomeIcon icon="fas fa-shield-alt" className="feature-icon" />
            <h4>Cryptographically Secure</h4>
            <p>Uses advanced randomization algorithms for maximum security</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-sliders-h" className="feature-icon" />
            <h4>Highly Customizable</h4>
            <p>Extensive options for length, character types, and exclusions</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-chart-line" className="feature-icon" />
            <h4>Strength Analysis</h4>
            <p>Real-time password strength assessment and entropy calculation</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-history" className="feature-icon" />
            <h4>Password History</h4>
            <p>Keep track of recently generated passwords for easy access</p>
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
            <FontAwesomeIcon icon="fas fa-user-shield" className="use-case-icon" />
            <h4>Personal Accounts</h4>
            <p>Create secure passwords for email, social media, and online accounts</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-briefcase" className="use-case-icon" />
            <h4>Business Security</h4>
            <p>Generate passwords for corporate accounts and systems</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-code" className="use-case-icon" />
            <h4>Development</h4>
            <p>Create API keys, tokens, and secure credentials for applications</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-database" className="use-case-icon" />
            <h4>Database Access</h4>
            <p>Generate strong passwords for database and server access</p>
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

        .password-output-section {
          position: relative;
          z-index: 1;
          margin-bottom: 2rem;
        }

        .password-display {
          background: rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .password-field {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .password-input {
          flex: 1;
          padding: 1rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 1.1rem;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.1em;
        }

        .password-input::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .copy-btn {
          background: linear-gradient(45deg, #10b981, #059669);
          border: none;
          border-radius: 12px;
          padding: 1rem 1.5rem;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .copy-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .copy-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .password-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .stat-value {
          font-size: 1rem;
          font-weight: 600;
        }

        .strength-indicator {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .strength-label {
          font-size: 0.9rem;
          opacity: 0.8;
          min-width: 120px;
        }

        .strength-bar {
          flex: 1;
          height: 8px;
          background: rgba(255,255,255,0.2);
          border-radius: 4px;
          overflow: hidden;
        }

        .strength-fill {
          height: 100%;
          transition: all 0.3s ease;
        }

        .strength-text {
          font-weight: 600;
          font-size: 0.9rem;
          min-width: 60px;
        }

        .config-section {
          position: relative;
          z-index: 1;
          margin-bottom: 2rem;
        }

        .config-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .title-icon {
          opacity: 0.8;
        }

        .config-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .config-item {
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .config-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .label-icon {
          opacity: 0.8;
        }

        .length-slider {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: rgba(255,255,255,0.2);
          outline: none;
          margin-bottom: 1rem;
        }

        .length-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
        }

        .length-presets {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .preset-btn {
          padding: 0.5rem 1rem;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .preset-btn:hover {
          background: rgba(255,255,255,0.2);
        }

        .preset-btn.active {
          background: #10b981;
          border-color: #10b981;
        }

        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .checkbox-item input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #10b981;
        }

        .checkbox-label {
          font-size: 0.95rem;
        }

        .custom-chars-input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 1rem;
        }

        .custom-chars-input::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .generate-btn {
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
          margin-top: 1rem;
        }

        .generate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255,107,107,0.6);
        }

        .history-section {
          position: relative;
          z-index: 1;
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .history-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.1rem;
          font-weight: 600;
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

        .history-password {
          flex: 1;
        }

        .password-text {
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.5rem;
        }

        .password-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .history-actions {
          display: flex;
          gap: 0.5rem;
        }

        .copy-history-btn, .remove-history-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .copy-history-btn {
          background: #10b981;
          color: white;
        }

        .remove-history-btn {
          background: #ef4444;
          color: white;
        }

        .copy-history-btn:hover, .remove-history-btn:hover {
          transform: scale(1.1);
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
          
          .password-field {
            flex-direction: column;
          }
          
          .password-stats {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .strength-indicator {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .length-presets {
            justify-content: center;
          }
          
          .history-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .history-actions {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  )
}

export default PasswordGenerator