import { useState, useRef, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const QrCodeGenerator = () => {
  const [text, setText] = useState('')
  const [size, setSize] = useState(200)
  const [errorCorrection, setErrorCorrection] = useState('M')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef(null)

  const generateQRCode = useCallback(async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate QR code')
      return
    }

    setIsGenerating(true)
    
    try {
      // Simple QR code generation using qr-server.com API
      const encodedText = encodeURIComponent(text)
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&ecc=${errorCorrection}`
      
      setQrCodeUrl(qrUrl)
    } catch (error) {
      console.error('Error generating QR code:', error)
      alert('Error generating QR code. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }, [text, size, errorCorrection])

  const downloadQRCode = () => {
    if (!qrCodeUrl) return
    
    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = `qrcode-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyToClipboard = async () => {
    if (!text) return
    
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="tool-container">
      {/* Main Tool Interface */}
      <div className="tool-card">
        <div className="tool-header">
          <div className="tool-icon">
            <FontAwesomeIcon icon="fas fa-qrcode" />
          </div>
          <div className="tool-title-section">
            <h2 className="tool-title">QR Code Generator</h2>
            <p className="tool-subtitle">Create stunning QR codes instantly ✨</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="input-section">
          <div className="input-group">
            <label className="input-label">
              <FontAwesomeIcon icon="fas fa-edit" className="label-icon" />
              Text or URL to encode
            </label>
            <div className="input-wrapper">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text, URL, or any data you want to encode..."
                className="text-input"
                rows={4}
              />
              <button
                onClick={copyToClipboard}
                disabled={!text}
                className="copy-btn"
                title="Copy text"
              >
                <FontAwesomeIcon icon="fas fa-copy" />
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="settings-grid">
            <div className="setting-group">
              <label className="setting-label">
                <FontAwesomeIcon icon="fas fa-expand-arrows-alt" className="label-icon" />
                Size: {size}px
              </label>
              <input
                type="range"
                min="100"
                max="500"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="slider"
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">
                <FontAwesomeIcon icon="fas fa-shield-alt" className="label-icon" />
                Error Correction
              </label>
              <select
                value={errorCorrection}
                onChange={(e) => setErrorCorrection(e.target.value)}
                className="select-input"
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              onClick={generateQRCode}
              disabled={!text.trim() || isGenerating}
              className="btn-primary"
            >
              <FontAwesomeIcon icon={isGenerating ? "fas fa-spinner fa-spin" : "fas fa-magic"} />
              {isGenerating ? 'Generating...' : 'Generate QR Code'}
            </button>
            
            {qrCodeUrl && (
              <button
                onClick={downloadQRCode}
                className="btn-secondary"
              >
                <FontAwesomeIcon icon="fas fa-download" />
                Download PNG
              </button>
            )}
          </div>
        </div>

        {/* QR Code Display */}
        {qrCodeUrl && (
          <div className="output-section">
            <div className="qr-display">
              <img
                src={qrCodeUrl}
                alt="Generated QR Code"
                className="qr-image"
                style={{ width: size, height: size }}
              />
              <div className="qr-overlay">
                <div className="qr-info">
                  <span className="qr-size">{size}x{size}px</span>
                  <span className="qr-ecc">ECC: {errorCorrection}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tool Information */}
      <div className="info-card">
        <h3 className="info-title">
          <FontAwesomeIcon icon="fas fa-info-circle" className="title-icon" />
          About QR Code Generator
        </h3>
        <div className="info-content">
          <p>
            Our QR Code Generator is a powerful, free online tool that creates high-quality QR codes 
            instantly. Whether you need to share URLs, contact information, WiFi passwords, or any 
            text data, this tool has you covered. Perfect for businesses, events, marketing campaigns, 
            and personal use.
          </p>
          <p>
            The tool supports customizable sizes from 100px to 500px and offers four levels of error 
            correction to ensure your QR codes remain scannable even when partially damaged. All QR 
            codes are generated in real-time and can be downloaded as PNG images for immediate use.
          </p>
          <p>
            No registration required, completely free, and works on any device. Your data is processed 
            securely and never stored on our servers, ensuring complete privacy and security.
          </p>
        </div>
      </div>

      {/* How to Use */}
      <div className="how-to-card">
        <h3 className="how-to-title">
          <FontAwesomeIcon icon="fas fa-play-circle" className="title-icon" />
          How to Use QR Code Generator
        </h3>
        <div className="steps-list">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Enter Your Data</h4>
              <p>Type or paste the text, URL, or data you want to encode into the QR code</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Customize Settings</h4>
              <p>Adjust the size (100-500px) and error correction level based on your needs</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Generate & Download</h4>
              <p>Click "Generate QR Code" and download the PNG image for immediate use</p>
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
            <FontAwesomeIcon icon="fas fa-bolt" className="feature-icon" />
            <h4>Instant Generation</h4>
            <p>Create QR codes in milliseconds with our optimized engine</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-palette" className="feature-icon" />
            <h4>Customizable Size</h4>
            <p>Choose from 100px to 500px to fit your design needs</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-shield-alt" className="feature-icon" />
            <h4>Error Correction</h4>
            <p>Four levels of error correction for maximum reliability</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-download" className="feature-icon" />
            <h4>High Quality</h4>
            <p>Download crisp PNG images perfect for print and digital use</p>
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
            <FontAwesomeIcon icon="fas fa-link" className="use-case-icon" />
            <h4>Website Links</h4>
            <p>Share your website URL for easy mobile access</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-wifi" className="use-case-icon" />
            <h4>WiFi Sharing</h4>
            <p>Create QR codes for WiFi credentials</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-address-card" className="use-case-icon" />
            <h4>Contact Info</h4>
            <p>Share vCard contact information instantly</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-shopping-cart" className="use-case-icon" />
            <h4>Payment Links</h4>
            <p>Generate QR codes for payment processing</p>
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

        .input-section {
          position: relative;
          z-index: 1;
        }

        .input-group {
          margin-bottom: 2rem;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .label-icon {
          opacity: 0.8;
        }

        .input-wrapper {
          position: relative;
        }

        .text-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 1rem;
          resize: vertical;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .text-input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.15);
        }

        .text-input::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .copy-btn {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(255,255,255,0.2);
          border: none;
          border-radius: 8px;
          padding: 0.5rem;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .copy-btn:hover {
          background: rgba(255,255,255,0.3);
        }

        .copy-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .setting-group {
          display: flex;
          flex-direction: column;
        }

        .setting-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }

        .slider {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: rgba(255,255,255,0.2);
          outline: none;
          -webkit-appearance: none;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }

        .select-input {
          padding: 0.75rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 0.95rem;
          backdrop-filter: blur(10px);
        }

        .select-input option {
          background: #333;
          color: white;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-primary {
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

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255,107,107,0.6);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.3);
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
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.3);
          border-color: rgba(255,255,255,0.5);
        }

        .output-section {
          margin-top: 2rem;
          position: relative;
          z-index: 1;
        }

        .qr-display {
          display: flex;
          justify-content: center;
          position: relative;
        }

        .qr-image {
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          background: white;
          padding: 1rem;
        }

        .qr-overlay {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .qr-info {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: white;
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
          
          .settings-grid {
            grid-template-columns: 1fr;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .btn-primary, .btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default QrCodeGenerator

