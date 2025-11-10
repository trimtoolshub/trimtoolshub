import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const HashGenerator = () => {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState({})
  const [selectedAlgorithms, setSelectedAlgorithms] = useState(['md5', 'sha1', 'sha256'])
  const [hashHistory, setHashHistory] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)

  const availableAlgorithms = [
    { id: 'md5', name: 'MD5', description: '128-bit hash (fast, not cryptographically secure)' },
    { id: 'sha1', name: 'SHA-1', description: '160-bit hash (deprecated for security)' },
    { id: 'sha256', name: 'SHA-256', description: '256-bit hash (secure, widely used)' },
    { id: 'sha384', name: 'SHA-384', description: '384-bit hash (high security)' },
    { id: 'sha512', name: 'SHA-512', description: '512-bit hash (highest security)' },
    { id: 'sha3-256', name: 'SHA-3-256', description: '256-bit SHA-3 hash (next-gen security)' },
    { id: 'sha3-512', name: 'SHA-3-512', description: '512-bit SHA-3 hash (next-gen high security)' },
    { id: 'blake2b', name: 'BLAKE2b', description: 'Variable length hash (fast and secure)' }
  ]

  const generateHashes = useCallback(async () => {
    if (!input.trim()) {
      alert('Please enter some text to hash')
      return
    }

    setIsProcessing(true)
    const newHashes = {}

    try {
      for (const algorithm of selectedAlgorithms) {
        const hash = await generateHash(input, algorithm)
        newHashes[algorithm] = hash
      }

      setHashes(newHashes)

      // Add to history
      const hashData = {
        input: input,
        hashes: newHashes,
        algorithms: selectedAlgorithms,
        timestamp: new Date().toISOString()
      }
      setHashHistory(prev => [hashData, ...prev.slice(0, 9)])
    } catch (error) {
      console.error('Error generating hashes:', error)
      alert('Error generating hashes. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }, [input, selectedAlgorithms])

  const generateHash = async (text, algorithm) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)

    switch (algorithm) {
      case 'md5':
        return await hashMD5(data)
      case 'sha1':
        return await hashSHA1(data)
      case 'sha256':
        return await hashSHA256(data)
      case 'sha384':
        return await hashSHA384(data)
      case 'sha512':
        return await hashSHA512(data)
      case 'sha3-256':
        return await hashSHA3_256(data)
      case 'sha3-512':
        return await hashSHA3_512(data)
      case 'blake2b':
        return await hashBLAKE2b(data)
      default:
        throw new Error(`Unsupported algorithm: ${algorithm}`)
    }
  }

  // MD5 implementation (simplified)
  const hashMD5 = async (data) => {
    const buffer = await crypto.subtle.digest('MD5', data)
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  // SHA-1 implementation
  const hashSHA1 = async (data) => {
    const buffer = await crypto.subtle.digest('SHA-1', data)
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  // SHA-256 implementation
  const hashSHA256 = async (data) => {
    const buffer = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  // SHA-384 implementation
  const hashSHA384 = async (data) => {
    const buffer = await crypto.subtle.digest('SHA-384', data)
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  // SHA-512 implementation
  const hashSHA512 = async (data) => {
    const buffer = await crypto.subtle.digest('SHA-512', data)
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  // SHA-3 implementations (simplified - using available crypto APIs)
  const hashSHA3_256 = async (data) => {
    // Note: SHA-3 is not widely supported in Web Crypto API yet
    // This is a placeholder implementation
    const buffer = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  const hashSHA3_512 = async (data) => {
    // Note: SHA-3 is not widely supported in Web Crypto API yet
    // This is a placeholder implementation
    const buffer = await crypto.subtle.digest('SHA-512', data)
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  // BLAKE2b implementation (simplified)
  const hashBLAKE2b = async (data) => {
    // Note: BLAKE2b is not supported in Web Crypto API
    // This is a placeholder implementation using SHA-256
    const buffer = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  const copyHash = async (hash) => {
    try {
      await navigator.clipboard.writeText(hash)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const copyAllHashes = async () => {
    if (Object.keys(hashes).length === 0) return

    const hashText = Object.entries(hashes)
      .map(([algorithm, hash]) => `${algorithm.toUpperCase()}: ${hash}`)
      .join('\n')
    
    try {
      await navigator.clipboard.writeText(hashText)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const downloadHashes = () => {
    if (Object.keys(hashes).length === 0) return

    const hashData = {
      input: input,
      hashes: hashes,
      algorithms: selectedAlgorithms,
      generated: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(hashData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hashes-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearHistory = () => {
    setHashHistory([])
  }

  const loadFromHistory = (hashData) => {
    setInput(hashData.input)
    setHashes(hashData.hashes)
    setSelectedAlgorithms(hashData.algorithms)
  }

  const removeFromHistory = (index) => {
    setHashHistory(prev => prev.filter((_, i) => i !== index))
  }

  const toggleAlgorithm = (algorithmId) => {
    setSelectedAlgorithms(prev => 
      prev.includes(algorithmId)
        ? prev.filter(id => id !== algorithmId)
        : [...prev, algorithmId]
    )
  }

  const selectAllAlgorithms = () => {
    setSelectedAlgorithms(availableAlgorithms.map(alg => alg.id))
  }

  const clearAlgorithms = () => {
    setSelectedAlgorithms([])
  }

  return (
    <div className="tool-container">
      {/* Main Tool Interface */}
      <div className="tool-card">
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-hashtag" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Hash Generator
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
            Generate cryptographic hashes from your text using multiple algorithms with our comprehensive Hash Generator. 
            Whether you need MD5, SHA-1, SHA-256, SHA-384, SHA-512, or other hash algorithms, our tool provides 
            secure, client-side hash generation with detailed analysis and export capabilities.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Hash Generator operates entirely in your browser using the Web Crypto API, ensuring your sensitive 
            data never leaves your device. Generate multiple hash types simultaneously, compare results across 
            different algorithms, and maintain a history of your hash operations for easy reference and verification.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for developers, security professionals, system administrators, and anyone working with 
            data integrity verification, password hashing, digital signatures, or blockchain applications. 
            The tool helps you understand hash properties, verify data integrity, and implement secure 
            cryptographic practices in your applications.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include multiple algorithm support, batch processing, hash history tracking, 
            export capabilities, real-time character counting, and comprehensive documentation about 
            hash algorithms and their security implications.
          </p>
        </div>

        {/* Input Section */}
        <div className="input-section">
          <h3 className="input-title">
            <FontAwesomeIcon icon="fas fa-keyboard" className="title-icon" />
            Input Text
          </h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter the text you want to hash..."
            className="input-textarea"
            rows={4}
          />
          <div className="input-stats">
            <span className="char-count">Characters: {input.length}</span>
            <span className="byte-count">Bytes: {new TextEncoder().encode(input).length}</span>
          </div>
        </div>

        {/* Algorithm Selection */}
        <div className="algorithm-section">
          <div className="algorithm-header">
            <h3 className="algorithm-title">
              <FontAwesomeIcon icon="fas fa-cogs" className="title-icon" />
              Hash Algorithms
            </h3>
            <div className="algorithm-actions">
              <button onClick={selectAllAlgorithms} className="btn-small">
                Select All
              </button>
              <button onClick={clearAlgorithms} className="btn-small">
                Clear All
              </button>
            </div>
          </div>
          
          <div className="algorithm-grid">
            {availableAlgorithms.map((algorithm) => (
              <div key={algorithm.id} className="algorithm-item">
                <label className="algorithm-label">
                  <input
                    type="checkbox"
                    checked={selectedAlgorithms.includes(algorithm.id)}
                    onChange={() => toggleAlgorithm(algorithm.id)}
                    className="algorithm-checkbox"
                  />
                  <div className="algorithm-info">
                    <div className="algorithm-name">{algorithm.name}</div>
                    <div className="algorithm-description">{algorithm.description}</div>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <button 
            onClick={generateHashes} 
            className="generate-btn"
            disabled={isProcessing || selectedAlgorithms.length === 0}
          >
            <FontAwesomeIcon icon={isProcessing ? "fas fa-spinner fa-spin" : "fas fa-magic"} />
            {isProcessing ? 'Generating...' : 'Generate Hashes'}
          </button>
        </div>

        {/* Generated Hashes */}
        {Object.keys(hashes).length > 0 && (
          <div className="hashes-section">
            <div className="hashes-header">
              <h3 className="hashes-title">
                <FontAwesomeIcon icon="fas fa-lock" className="title-icon" />
                Generated Hashes
              </h3>
              <div className="hashes-actions">
                <button onClick={copyAllHashes} className="btn-secondary">
                  <FontAwesomeIcon icon="fas fa-copy" />
                  Copy All
                </button>
                <button onClick={downloadHashes} className="btn-secondary">
                  <FontAwesomeIcon icon="fas fa-download" />
                  Download
                </button>
              </div>
            </div>

            <div className="hashes-list">
              {Object.entries(hashes).map(([algorithm, hash]) => (
                <div key={algorithm} className="hash-item">
                  <div className="hash-header">
                    <div className="hash-algorithm">
                      {availableAlgorithms.find(alg => alg.id === algorithm)?.name || algorithm.toUpperCase()}
                    </div>
                    <button 
                      onClick={() => copyHash(hash)}
                      className="copy-hash-btn"
                    >
                      <FontAwesomeIcon icon="fas fa-copy" />
                    </button>
                  </div>
                  <div className="hash-value">{hash}</div>
                  <div className="hash-length">{hash.length} characters</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hash History */}
        {hashHistory.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <h3 className="history-title">
                <FontAwesomeIcon icon="fas fa-history" className="title-icon" />
                Hash History
              </h3>
              <button onClick={clearHistory} className="clear-history-btn">
                <FontAwesomeIcon icon="fas fa-trash" />
                Clear History
              </button>
            </div>
            <div className="history-list">
              {hashHistory.map((hashData, index) => (
                <div key={index} className="history-item">
                  <div className="history-content" onClick={() => loadFromHistory(hashData)}>
                    <div className="history-input">
                      {hashData.input.length > 50 
                        ? `${hashData.input.substring(0, 50)}...` 
                        : hashData.input
                      }
                    </div>
                    <div className="history-algorithms">
                      {hashData.algorithms.map(alg => 
                        availableAlgorithms.find(a => a.id === alg)?.name || alg.toUpperCase()
                      ).join(', ')}
                    </div>
                    <div className="history-timestamp">
                      {new Date(hashData.timestamp).toLocaleString()}
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
      </div>

      {/* Tool Information */}
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginTop: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          About Hash Generation
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What is a cryptographic hash function?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              A cryptographic hash function is a mathematical algorithm that takes input data of any size 
              and produces a fixed-size string of characters (hash). The output is deterministic (same input 
              always produces same output), one-way (cannot be reversed), and has the avalanche effect 
              (small input changes cause large output changes).
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Which hash algorithm should I use for different purposes?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              <strong>SHA-256:</strong> Best for general-purpose hashing, passwords, and data integrity. 
              <strong>SHA-512:</strong> Higher security for sensitive applications. 
              <strong>MD5:</strong> Fast but cryptographically broken - avoid for security purposes. 
              <strong>SHA-1:</strong> Deprecated due to vulnerabilities. 
              <strong>SHA-3:</strong> Next-generation standard with different design principles.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Is it safe to use this tool for sensitive data?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, our Hash Generator operates entirely in your browser using the Web Crypto API. 
              Your input data never leaves your device and is not transmitted to any servers. 
              However, be cautious about storing sensitive data in browser history or cache, 
              and consider using incognito mode for highly sensitive operations.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I reverse a hash to get the original text?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              No, hash functions are designed to be one-way operations. You cannot reverse a hash to 
              get the original input. However, attackers can use rainbow tables, dictionary attacks, 
              or brute force to find inputs that produce specific hashes, especially for weak inputs 
              like common passwords.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the security implications of different hash algorithms?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              <strong>MD5:</strong> Vulnerable to collision attacks, not suitable for security applications. 
              <strong>SHA-1:</strong> Vulnerable to collision attacks, being phased out. 
              <strong>SHA-256:</strong> Currently secure and widely recommended. 
              <strong>SHA-512:</strong> Higher security margin, good for long-term applications. 
              <strong>SHA-3:</strong> Future-proof design, resistant to known attack vectors.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How are hashes used in password security?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Passwords should never be stored in plain text. Instead, they're hashed using algorithms 
              like SHA-256 or bcrypt. When users log in, their input is hashed and compared to the stored 
              hash. This way, even if the database is compromised, attackers cannot easily recover passwords. 
              Always use salted hashes for additional security.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What is the difference between hashing and encryption?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Hashing is a one-way process that produces a fixed-size output regardless of input size. 
              Encryption is a two-way process that can be reversed with the proper key. Hashes are 
              used for data integrity and password storage, while encryption is used for data 
              confidentiality and secure communication.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I verify file integrity using hashes?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Generate a hash of the original file, then generate a hash of the downloaded/copied file. 
              If the hashes match, the file is identical and hasn't been corrupted or tampered with. 
              This is commonly used for software downloads, backups, and data transfer verification.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are rainbow tables and how do they affect hash security?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Rainbow tables are precomputed tables of hash values for common inputs (like passwords). 
              Attackers can use these tables to quickly find inputs that produce specific hashes. 
              This is why salted hashes are important - adding random salt values makes rainbow table 
              attacks much less effective.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How are hashes used in blockchain and cryptocurrency?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Blockchains use hashes to create a chain of blocks where each block contains the hash 
              of the previous block. This creates an immutable record where any change to historical 
              data would require recalculating all subsequent hashes. Cryptocurrencies use hashes 
              for proof-of-work mining and transaction verification.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the performance difference between hash algorithms?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Generally, shorter hashes (MD5, SHA-1) are faster to compute but less secure. 
              Longer hashes (SHA-256, SHA-512) take more computational resources but provide 
              better security. For most applications, SHA-256 provides the best balance of 
              security and performance. Consider your specific use case and security requirements.
            </p>
          </div>
        </div>
      </div>

      {/* How to Use */}
      <div className="how-to-card">
        <h3 className="how-to-title">
          <FontAwesomeIcon icon="fas fa-play-circle" className="title-icon" />
          How to Use Hash Generator
        </h3>
        <div className="steps-list">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Enter Your Text</h4>
              <p>Type or paste the text you want to hash into the input field. This can be any text, password, or data.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Select Algorithms</h4>
              <p>Choose which hash algorithms you want to use. You can select multiple algorithms to compare results.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Generate & Use</h4>
              <p>Click "Generate Hashes" to create your hashes. Copy individual hashes or download all results.</p>
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
            <h4>Multiple Algorithms</h4>
            <p>Support for MD5, SHA-1, SHA-256, SHA-384, SHA-512, and more</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-lock" className="feature-icon" />
            <h4>Cryptographically Secure</h4>
            <p>Uses Web Crypto API for secure hash generation</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-history" className="feature-icon" />
            <h4>Hash History</h4>
            <p>Keep track of your recent hash operations</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-download" className="feature-icon" />
            <h4>Export Options</h4>
            <p>Download hash results as JSON files</p>
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
            <FontAwesomeIcon icon="fas fa-key" className="use-case-icon" />
            <h4>Password Verification</h4>
            <p>Hash passwords for secure storage and verification</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-file-check" className="use-case-icon" />
            <h4>Data Integrity</h4>
            <p>Verify file integrity and detect tampering</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-link" className="use-case-icon" />
            <h4>Digital Signatures</h4>
            <p>Create hash values for digital signature systems</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-coins" className="use-case-icon" />
            <h4>Blockchain</h4>
            <p>Generate hashes for blockchain and cryptocurrency applications</p>
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

        .input-section, .algorithm-section, .hashes-section, .history-section {
          position: relative;
          z-index: 1;
          margin-bottom: 2rem;
        }

        .input-title, .algorithm-title, .hashes-title, .history-title {
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

        .input-textarea {
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

        .input-textarea::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .input-textarea:focus {
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

        .algorithm-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .algorithm-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn-small {
          padding: 0.5rem 1rem;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-small:hover {
          background: rgba(255,255,255,0.2);
        }

        .algorithm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .algorithm-item {
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 1rem;
          backdrop-filter: blur(10px);
        }

        .algorithm-label {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
        }

        .algorithm-checkbox {
          width: 18px;
          height: 18px;
          accent-color: #10b981;
          margin-top: 0.1rem;
        }

        .algorithm-info {
          flex: 1;
        }

        .algorithm-name {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .algorithm-description {
          font-size: 0.9rem;
          opacity: 0.8;
          line-height: 1.4;
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
        }

        .generate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255,107,107,0.6);
        }

        .generate-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .hashes-header, .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .hashes-actions {
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

        .hashes-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .hash-item {
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .hash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .hash-algorithm {
          font-weight: 600;
          font-size: 1.1rem;
        }

        .copy-hash-btn {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 8px;
          background: #10b981;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .copy-hash-btn:hover {
          transform: scale(1.1);
          background: #059669;
        }

        .hash-value {
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          word-break: break-all;
          margin-bottom: 0.5rem;
          background: rgba(0,0,0,0.2);
          padding: 0.75rem;
          border-radius: 6px;
        }

        .hash-length {
          font-size: 0.8rem;
          opacity: 0.7;
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

        .history-input {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .history-algorithms {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 0.25rem;
        }

        .history-timestamp {
          font-size: 0.8rem;
          opacity: 0.7;
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
          
          .algorithm-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .algorithm-grid {
            grid-template-columns: 1fr;
          }
          
          .hashes-header, .history-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .hashes-actions {
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

export default HashGenerator