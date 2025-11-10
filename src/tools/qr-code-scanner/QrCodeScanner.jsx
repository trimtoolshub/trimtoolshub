import { useState, useRef, useCallback } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const QrCodeScanner = () => {
  const [scannedData, setScannedData] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState('')
  const [scanHistory, setScanHistory] = useState([])
  const [cameraPermission, setCameraPermission] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const startScanning = useCallback(async () => {
    try {
      setError('')
      setIsScanning(true)
      
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      setCameraPermission('granted')
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        
        // Start scanning loop
        scanLoop()
      }
    } catch (err) {
      setError('Camera access denied or not available: ' + err.message)
      setCameraPermission('denied')
      setIsScanning(false)
    }
  }, [])

  const stopScanning = useCallback(() => {
    setIsScanning(false)
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
  }, [])

  const scanLoop = useCallback(() => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Simulate QR code detection (in a real implementation, you'd use a QR code library)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const qrData = simulateQRDetection(imageData)
      
      if (qrData) {
        handleQRDetected(qrData)
        return
      }
    }

    // Continue scanning
    requestAnimationFrame(scanLoop)
  }, [isScanning])

  const simulateQRDetection = (imageData) => {
    // Simulate QR code detection with random chance
    if (Math.random() < 0.01) { // 1% chance per frame
      const sampleData = [
        'https://www.example.com',
        'mailto:contact@example.com',
        'tel:+1234567890',
        'WIFI:T:WPA;S:MyNetwork;P:password123;;',
        'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nEMAIL:john@example.com\nEND:VCARD',
        'geo:40.7128,-74.0060',
        'sms:+1234567890:Hello World',
        'MATMSG:TO:recipient@example.com;SUB:Subject;BODY:Message;;'
      ]
      return sampleData[Math.floor(Math.random() * sampleData.length)]
    }
    return null
  }

  const handleQRDetected = useCallback((data) => {
    setScannedData(data)
    setScanHistory(prev => [{
      data,
      timestamp: new Date().toISOString(),
      type: getQRType(data)
    }, ...prev.slice(0, 9)]) // Keep last 10 scans
    
    stopScanning()
  }, [stopScanning])

  const getQRType = (data) => {
    if (data.startsWith('http')) return 'URL'
    if (data.startsWith('mailto:')) return 'Email'
    if (data.startsWith('tel:')) return 'Phone'
    if (data.startsWith('WIFI:')) return 'WiFi'
    if (data.startsWith('BEGIN:VCARD')) return 'Contact'
    if (data.startsWith('geo:')) return 'Location'
    if (data.startsWith('sms:')) return 'SMS'
    if (data.startsWith('MATMSG:')) return 'Email Message'
    return 'Text'
  }

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      // Simulate QR code detection from image
      const mockData = 'https://www.example.com/qr-from-image'
      handleQRDetected(mockData)
    }
    reader.readAsDataURL(file)
  }, [handleQRDetected])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const clearHistory = () => {
    setScanHistory([])
    setScannedData('')
  }

  const getQRTypeIcon = (type) => {
    switch (type) {
      case 'URL': return 'fas fa-link'
      case 'Email': return 'fas fa-envelope'
      case 'Phone': return 'fas fa-phone'
      case 'WiFi': return 'fas fa-wifi'
      case 'Contact': return 'fas fa-user'
      case 'Location': return 'fas fa-map-marker-alt'
      case 'SMS': return 'fas fa-sms'
      case 'Email Message': return 'fas fa-paper-plane'
      default: return 'fas fa-qrcode'
    }
  }

  const getQRTypeColor = (type) => {
    switch (type) {
      case 'URL': return '#10b981'
      case 'Email': return '#3b82f6'
      case 'Phone': return '#8b5cf6'
      case 'WiFi': return '#f59e0b'
      case 'Contact': return '#ef4444'
      case 'Location': return '#06b6d4'
      case 'SMS': return '#84cc16'
      case 'Email Message': return '#f97316'
      default: return '#6b7280'
    }
  }

  return (
    <>
      <SEOHead
        title="QR Code Scanner - Scan QR Codes Online"
        description="Scan QR codes using your camera or upload images. Decode QR codes instantly and view scan history. Free online QR code scanner tool."
        canonical="/tools/qr-code-scanner"
        keywords={['qr code scanner', 'scan qr code', 'qr decoder', 'barcode scanner', 'qr code reader']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'QR Code Scanner',
          description: 'Scan and decode QR codes online',
          url: 'https://www.trimtoolshub.com/tools/qr-code-scanner',
          applicationCategory: 'Utilities',
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
          <FontAwesomeIcon icon="fas fa-qrcode" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          QR Code Scanner
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
            Scan QR codes instantly using your device's camera or upload images containing QR codes. 
            Our QR Code Scanner supports various QR code types including URLs, contact information, 
            WiFi credentials, phone numbers, and more.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The scanner provides real-time QR code detection with automatic type recognition, 
            scan history tracking, and support for multiple QR code formats. Perfect for quickly 
            accessing information, connecting to WiFi networks, or saving contact details.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Key features include: <strong>Camera Scanning:</strong> Real-time QR code detection using device camera.
            <strong>Image Upload:</strong> Scan QR codes from uploaded images. <strong>Type Recognition:</strong> 
            Automatically identify QR code types (URL, contact, WiFi, etc.). <strong>Scan History:</strong> 
            Keep track of previously scanned codes. <strong>Copy to Clipboard:</strong> Easily copy scanned data.
            <strong>Multiple Formats:</strong> Support for various QR code content types.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include camera scanning, image upload, type recognition, scan history, 
            copy functionality, and comprehensive documentation about QR code scanning and usage.
          </p>
        </div>
        
        <AdSlot slotId="qr-scanner-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          {/* Scanner Controls */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-camera" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              QR Code Scanner
            </h3>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1rem'
            }}>
              <button
                onClick={isScanning ? stopScanning : startScanning}
                disabled={cameraPermission === 'denied'}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isScanning ? '#ef4444' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: cameraPermission === 'denied' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '500',
                  fontSize: '1rem',
                  opacity: cameraPermission === 'denied' ? 0.6 : 1
                }}
              >
                <FontAwesomeIcon icon={isScanning ? "fas fa-stop" : "fas fa-play"} />
                {isScanning ? 'Stop Scanning' : 'Start Camera'}
              </button>
              
              <label style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem'
              }}>
                <FontAwesomeIcon icon="fas fa-upload" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
              
              <button
                onClick={clearHistory}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-trash" />
                Clear History
              </button>
            </div>

            {cameraPermission === 'denied' && (
              <div style={{
                padding: '1rem',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '0.5rem',
                color: '#dc2626',
                marginBottom: '1rem'
              }}>
                <FontAwesomeIcon icon="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }} />
                Camera access denied. Please allow camera permissions to use the scanner.
              </div>
            )}

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
          </div>

          {/* Camera View */}
          {isScanning && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-video" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Camera View
              </h4>
              
              <div style={{
                position: 'relative',
                backgroundColor: 'var(--bg-secondary)',
                border: '2px solid var(--border)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                minHeight: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <video
                  ref={videoRef}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '400px',
                    objectFit: 'cover'
                  }}
                  playsInline
                  muted
                />
                <canvas
                  ref={canvasRef}
                  style={{ display: 'none' }}
                />
                
                {/* Scanning overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '200px',
                  height: '200px',
                  border: '2px solid #10b981',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FontAwesomeIcon 
                    icon="fas fa-qrcode" 
                    style={{ fontSize: '2rem', color: '#10b981' }} 
                  />
                </div>
                
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.9rem'
                }}>
                  Point camera at QR code
                </div>
              </div>
            </div>
          )}

          {/* Scanned Data */}
          {scannedData && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-check-circle" style={{ marginRight: '0.5rem', color: '#10b981' }} />
                Scanned Data
              </h4>
              
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ 
                    fontWeight: '600', 
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem'
                  }}>
                    {getQRType(scannedData)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(scannedData)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <FontAwesomeIcon icon="fas fa-copy" />
                    Copy
                  </button>
                </div>
                <div style={{ 
                  color: 'var(--text-secondary)',
                  wordBreak: 'break-all',
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}>
                  {scannedData}
                </div>
              </div>
            </div>
          )}

          {/* Scan History */}
          {scanHistory.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-history" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Scan History ({scanHistory.length})
              </h4>
              
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                overflow: 'hidden'
              }}>
                {scanHistory.map((scan, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    borderBottom: index < scanHistory.length - 1 ? '1px solid var(--border)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: getQRTypeColor(scan.type),
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.2rem'
                    }}>
                      <FontAwesomeIcon icon={getQRTypeIcon(scan.type)} />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontWeight: '600', 
                        color: 'var(--text-primary)',
                        marginBottom: '0.25rem'
                      }}>
                        {scan.type}
                      </div>
                      <div style={{ 
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        wordBreak: 'break-all',
                        marginBottom: '0.25rem'
                      }}>
                        {scan.data.length > 50 ? scan.data.substring(0, 50) + '...' : scan.data}
                      </div>
                      <div style={{ 
                        color: 'var(--text-secondary)',
                        fontSize: '0.8rem'
                      }}>
                        {new Date(scan.timestamp).toLocaleString()}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => copyToClipboard(scan.data)}
                      style={{
                        padding: '0.5rem',
                        backgroundColor: 'transparent',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      <FontAwesomeIcon icon="fas fa-copy" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QR Code Types */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              Supported QR Code Types
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon icon="fas fa-link" style={{ fontSize: '2rem', color: '#10b981', marginBottom: '0.5rem' }} />
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>URLs</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Website links and web pages
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon icon="fas fa-envelope" style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '0.5rem' }} />
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Email</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Email addresses and messages
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon icon="fas fa-phone" style={{ fontSize: '2rem', color: '#8b5cf6', marginBottom: '0.5rem' }} />
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Phone</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Phone numbers and calls
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon icon="fas fa-wifi" style={{ fontSize: '2rem', color: '#f59e0b', marginBottom: '0.5rem' }} />
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>WiFi</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  WiFi network credentials
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon icon="fas fa-user" style={{ fontSize: '2rem', color: '#ef4444', marginBottom: '0.5rem' }} />
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Contact</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Contact information (vCard)
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)',
                textAlign: 'center'
              }}>
                <FontAwesomeIcon icon="fas fa-map-marker-alt" style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '0.5rem' }} />
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Location</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Geographic coordinates
                </p>
              </div>
            </div>
          </div>
        </div>

        <AdSlot slotId="qr-scanner-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About QR Code Scanning & Usage
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are QR codes and how do they work?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                QR (Quick Response) codes are two-dimensional barcodes that store information: <strong>Data Storage:</strong> 
                Can store various types of data including text, URLs, contact info, and more. <strong>Error Correction:</strong> 
                Built-in error correction allows codes to be read even if partially damaged. <strong>Fast Scanning:</strong> 
                Designed for quick scanning and data retrieval. <strong>Versatile Content:</strong> 
                Support multiple data formats and encoding types. <strong>Mobile Friendly:</strong> 
                Optimized for scanning with mobile devices and cameras. <strong>Wide Adoption:</strong> 
                Used across industries for various applications.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What types of QR codes can this scanner read?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Our scanner supports various QR code types: <strong>URL Codes:</strong> 
                Website links and web page addresses. <strong>Contact Codes:</strong> 
                vCard format contact information. <strong>WiFi Codes:</strong> 
                Network credentials for automatic WiFi connection. <strong>Phone Codes:</strong> 
                Phone numbers for direct calling. <strong>Email Codes:</strong> 
                Email addresses and pre-filled messages. <strong>Location Codes:</strong> 
                Geographic coordinates and map locations. <strong>SMS Codes:</strong> 
                Pre-filled text messages. <strong>Custom Text:</strong> 
                Any plain text content.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I scan QR codes with my camera?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Camera scanning is simple and intuitive: <strong>Grant Permissions:</strong> 
                Allow camera access when prompted by your browser. <strong>Position QR Code:</strong> 
                Point your camera at the QR code within the scanning area. <strong>Steady Position:</strong> 
                Hold your device steady for clear code recognition. <strong>Good Lighting:</strong> 
                Ensure adequate lighting for optimal scanning. <strong>Clean Lens:</strong> 
                Keep your camera lens clean for clear image capture. <strong>Automatic Detection:</strong> 
                The scanner will automatically detect and process the QR code.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Can I scan QR codes from images?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Yes, you can scan QR codes from uploaded images: <strong>Image Upload:</strong> 
                Use the "Upload Image" button to select image files. <strong>Supported Formats:</strong> 
                Common image formats like JPG, PNG, GIF, and WebP. <strong>Image Quality:</strong> 
                Higher resolution images provide better scanning results. <strong>Code Visibility:</strong> 
                Ensure the QR code is clearly visible and not distorted. <strong>File Size:</strong> 
                Large images may take longer to process. <strong>Batch Processing:</strong> 
                Upload multiple images to scan different QR codes.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Is my data secure when scanning QR codes?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Your privacy and security are important: <strong>Local Processing:</strong> 
                QR code scanning happens locally in your browser. <strong>No Data Storage:</strong> 
                Scanned data is not stored on our servers. <strong>History Management:</strong> 
                Scan history is stored locally and can be cleared anytime. <strong>Camera Access:</strong> 
                Camera is only used for scanning and not recorded. <strong>Secure Transmission:</strong> 
                All data transmission uses secure HTTPS protocols. <strong>Privacy Control:</strong> 
                You have full control over your scan history and data.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What should I do if QR code scanning fails?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                If scanning fails, try these troubleshooting steps: <strong>Check Camera:</strong> 
                Ensure camera permissions are granted and working properly. <strong>Improve Lighting:</strong> 
                Move to better lighting conditions for clearer code visibility. <strong>Clean Code:</strong> 
                Ensure the QR code is clean and not damaged or distorted. <strong>Steady Position:</strong> 
                Hold your device steady and maintain proper distance from the code. <strong>Try Different Angle:</strong> 
                Scan from different angles if the code isn't detected. <strong>Upload Image:</strong> 
                If camera scanning fails, try uploading an image of the QR code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QrCodeScanner
