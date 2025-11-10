import { useState, useEffect } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const WhatIsMyBrowser = () => {
  const [browserInfo, setBrowserInfo] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const detectBrowser = () => {
      const userAgent = navigator.userAgent
      const platform = navigator.platform
      const language = navigator.language
      const languages = navigator.languages
      const cookieEnabled = navigator.cookieEnabled
      const onLine = navigator.onLine
      const javaEnabled = navigator.javaEnabled ? navigator.javaEnabled() : false
      
      // Screen information
      const screenWidth = screen.width
      const screenHeight = screen.height
      const screenColorDepth = screen.colorDepth
      const screenPixelDepth = screen.pixelDepth
      const screenAvailWidth = screen.availWidth
      const screenAvailHeight = screen.availHeight
      
      // Window information
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const windowOuterWidth = window.outerWidth
      const windowOuterHeight = window.outerHeight
      const devicePixelRatio = window.devicePixelRatio || 1
      
      // Timezone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const timezoneOffset = new Date().getTimezoneOffset()
      
      // Browser detection
      let browserName = 'Unknown'
      let browserVersion = 'Unknown'
      
      if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) {
        browserName = 'Google Chrome'
        const match = userAgent.match(/Chrome\/(\d+)/)
        browserVersion = match ? match[1] : 'Unknown'
      } else if (userAgent.indexOf('Firefox') > -1) {
        browserName = 'Mozilla Firefox'
        const match = userAgent.match(/Firefox\/(\d+)/)
        browserVersion = match ? match[1] : 'Unknown'
      } else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
        browserName = 'Safari'
        const match = userAgent.match(/Version\/(\d+)/)
        browserVersion = match ? match[1] : 'Unknown'
      } else if (userAgent.indexOf('Edg') > -1) {
        browserName = 'Microsoft Edge'
        const match = userAgent.match(/Edg\/(\d+)/)
        browserVersion = match ? match[1] : 'Unknown'
      } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
        browserName = 'Opera'
        const match = userAgent.match(/(?:Opera|OPR)\/(\d+)/)
        browserVersion = match ? match[1] : 'Unknown'
      } else if (userAgent.indexOf('Trident') > -1) {
        browserName = 'Internet Explorer'
        const match = userAgent.match(/rv:(\d+)/)
        browserVersion = match ? match[1] : 'Unknown'
      }
      
      // Operating System detection
      let osName = 'Unknown'
      let osVersion = 'Unknown'
      
      if (userAgent.indexOf('Windows NT') > -1) {
        osName = 'Windows'
        const match = userAgent.match(/Windows NT (\d+\.\d+)/)
        if (match) {
          const version = parseFloat(match[1])
          if (version === 10.0) osVersion = '10/11'
          else if (version === 6.3) osVersion = '8.1'
          else if (version === 6.2) osVersion = '8'
          else if (version === 6.1) osVersion = '7'
          else if (version === 6.0) osVersion = 'Vista'
          else osVersion = match[1]
        }
      } else if (userAgent.indexOf('Mac OS X') > -1) {
        osName = 'macOS'
        const match = userAgent.match(/Mac OS X (\d+[._]\d+)/)
        osVersion = match ? match[1].replace('_', '.') : 'Unknown'
      } else if (userAgent.indexOf('Linux') > -1) {
        osName = 'Linux'
        if (userAgent.indexOf('Android') > -1) {
          osName = 'Android'
          const match = userAgent.match(/Android (\d+\.\d+)/)
          osVersion = match ? match[1] : 'Unknown'
        } else {
          osVersion = 'Unknown'
        }
      } else if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) {
        osName = 'iOS'
        const match = userAgent.match(/OS (\d+[._]\d+)/)
        osVersion = match ? match[1].replace('_', '.') : 'Unknown'
      }
      
      // Device type
      let deviceType = 'Desktop'
      if (userAgent.indexOf('Mobile') > -1 || userAgent.indexOf('Android') > -1 || userAgent.indexOf('iPhone') > -1) {
        deviceType = 'Mobile'
      } else if (userAgent.indexOf('Tablet') > -1 || userAgent.indexOf('iPad') > -1) {
        deviceType = 'Tablet'
      }
      
      // WebGL support
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      const webglSupported = !!gl
      
      // Local storage support
      const localStorageSupported = (() => {
        try {
          const test = 'test'
          localStorage.setItem(test, test)
          localStorage.removeItem(test)
          return true
        } catch (e) {
          return false
        }
      })()
      
      // Session storage support
      const sessionStorageSupported = (() => {
        try {
          const test = 'test'
          sessionStorage.setItem(test, test)
          sessionStorage.removeItem(test)
          return true
        } catch (e) {
          return false
        }
      })()
      
      // Geolocation support
      const geolocationSupported = 'geolocation' in navigator
      
      // Notification support
      const notificationSupported = 'Notification' in window
      
      // Service worker support
      const serviceWorkerSupported = 'serviceWorker' in navigator
      
      // WebRTC support
      const webRTCSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
      
      // Touch support
      const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      return {
        // Basic Info
        userAgent,
        browserName,
        browserVersion,
        osName,
        osVersion,
        platform,
        deviceType,
        language,
        languages: languages.join(', '),
        
        // Browser Features
        cookieEnabled,
        onLine,
        javaEnabled,
        webglSupported,
        localStorageSupported,
        sessionStorageSupported,
        geolocationSupported,
        notificationSupported,
        serviceWorkerSupported,
        webRTCSupported,
        touchSupported,
        
        // Screen Info
        screenWidth,
        screenHeight,
        screenColorDepth,
        screenPixelDepth,
        screenAvailWidth,
        screenAvailHeight,
        
        // Window Info
        windowWidth,
        windowHeight,
        windowOuterWidth,
        windowOuterHeight,
        devicePixelRatio,
        
        // Timezone
        timezone,
        timezoneOffset: `${timezoneOffset} minutes`,
        
        // Timestamp
        detectedAt: new Date().toISOString()
      }
    }

    const info = detectBrowser()
    setBrowserInfo(info)
    setIsLoading(false)
  }, [])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const downloadReport = () => {
    const report = `Browser Detection Report
Generated: ${new Date().toLocaleString()}

BASIC INFORMATION
=================
Browser: ${browserInfo.browserName} ${browserInfo.browserVersion}
Operating System: ${browserInfo.osName} ${browserInfo.osVersion}
Platform: ${browserInfo.platform}
Device Type: ${browserInfo.deviceType}
Language: ${browserInfo.language}
Languages: ${browserInfo.languages}
User Agent: ${browserInfo.userAgent}

SCREEN INFORMATION
==================
Screen Resolution: ${browserInfo.screenWidth} x ${browserInfo.screenHeight}
Available Screen: ${browserInfo.screenAvailWidth} x ${browserInfo.screenAvailHeight}
Color Depth: ${browserInfo.screenColorDepth} bits
Pixel Depth: ${browserInfo.screenPixelDepth} bits

WINDOW INFORMATION
=================
Window Size: ${browserInfo.windowWidth} x ${browserInfo.windowHeight}
Outer Window: ${browserInfo.windowOuterWidth} x ${browserInfo.windowOuterHeight}
Device Pixel Ratio: ${browserInfo.devicePixelRatio}

BROWSER FEATURES
================
Cookies Enabled: ${browserInfo.cookieEnabled ? 'Yes' : 'No'}
Online Status: ${browserInfo.onLine ? 'Online' : 'Offline'}
Java Enabled: ${browserInfo.javaEnabled ? 'Yes' : 'No'}
WebGL Support: ${browserInfo.webglSupported ? 'Yes' : 'No'}
Local Storage: ${browserInfo.localStorageSupported ? 'Yes' : 'No'}
Session Storage: ${browserInfo.sessionStorageSupported ? 'Yes' : 'No'}
Geolocation: ${browserInfo.geolocationSupported ? 'Yes' : 'No'}
Notifications: ${browserInfo.notificationSupported ? 'Yes' : 'No'}
Service Workers: ${browserInfo.serviceWorkerSupported ? 'Yes' : 'No'}
WebRTC: ${browserInfo.webRTCSupported ? 'Yes' : 'No'}
Touch Support: ${browserInfo.touchSupported ? 'Yes' : 'No'}

TIMEZONE INFORMATION
====================
Timezone: ${browserInfo.timezone}
UTC Offset: ${browserInfo.timezoneOffset}
`

    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `browser-detection-report-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="tool-container">
        <div className="loading-card">
          <div className="loading-spinner">
            <FontAwesomeIcon icon="fas fa-spinner" spin />
          </div>
          <h3>Detecting Browser Information...</h3>
          <p>Please wait while we gather your browser details.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="tool-container">
      {/* Main Tool Interface */}
      <div className="tool-card">
        <div className="tool-header">
          <div className="tool-icon">
            <FontAwesomeIcon icon="fas fa-globe" />
          </div>
          <div className="tool-title-section">
            <h2 className="tool-title">What Is My Browser</h2>
            <p className="tool-subtitle">Detect and analyze your browser information and capabilities 🌐</p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="info-section">
          <h3 className="section-title">
            <FontAwesomeIcon icon="fas fa-info-circle" className="title-icon" />
            Basic Information
          </h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Browser</div>
              <div className="info-value">
                <FontAwesomeIcon icon="fas fa-globe" className="value-icon" />
                {browserInfo.browserName} {browserInfo.browserVersion}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Operating System</div>
              <div className="info-value">
                <FontAwesomeIcon icon="fas fa-desktop" className="value-icon" />
                {browserInfo.osName} {browserInfo.osVersion}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Platform</div>
              <div className="info-value">
                <FontAwesomeIcon icon="fas fa-microchip" className="value-icon" />
                {browserInfo.platform}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Device Type</div>
              <div className="info-value">
                <FontAwesomeIcon icon={browserInfo.deviceType === 'Mobile' ? 'fas fa-mobile-alt' : browserInfo.deviceType === 'Tablet' ? 'fas fa-tablet-alt' : 'fas fa-desktop'} className="value-icon" />
                {browserInfo.deviceType}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Language</div>
              <div className="info-value">
                <FontAwesomeIcon icon="fas fa-language" className="value-icon" />
                {browserInfo.language}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Languages</div>
              <div className="info-value">
                <FontAwesomeIcon icon="fas fa-list" className="value-icon" />
                {browserInfo.languages}
              </div>
            </div>
          </div>
        </div>

        {/* Screen Information */}
        <div className="info-section">
          <h3 className="section-title">
            <FontAwesomeIcon icon="fas fa-tv" className="title-icon" />
            Screen Information
          </h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Screen Resolution</div>
              <div className="info-value">
                <FontAwesomeIcon icon="fas fa-expand" className="value-icon" />
                {browserInfo.screenWidth} × {browserInfo.screenHeight}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Available Screen</div>
              <div className="info-value">
                <FontAwesomeIcon icon="fas fa-desktop" className="value-icon" />
                {browserInfo.screenAvailWidth} × {browserInfo.screenAvailHeight}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Color Depth</div>
              <div className="info-value">
                <FontAwesomeIcon icon="fas fa-palette" className="value-icon" />
                {browserInfo.screenColorDepth} bits
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Pixel Depth</div>
              <div className="info-value">
                <FontAwesomeIcon icon="fas fa-th" className="value-icon" />
                {browserInfo.screenPixelDepth} bits
              </div>
            </div>
          </div>
        </div>

        {/* Window Information */}
        <div className="info-section">
          <h3 className="section-title">
            <FontAwesomeIcon icon="fas fa-window-maximize" className="title-icon" />
            Window Information
          </h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Window Size</div>
              <div className="info-value">
                <FontAwesomeIcon icon="fas fa-expand-arrows-alt" className="value-icon" />
                {browserInfo.windowWidth} × {browserInfo.windowHeight}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Outer Window</div>
              <div className="info-value">
                <FontAwesomeIcon icon="fas fa-square" className="value-icon" />
                {browserInfo.windowOuterWidth} × {browserInfo.windowOuterHeight}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Device Pixel Ratio</div>
              <div className="info-value">
                <FontAwesomeIcon icon="fas fa-search-plus" className="value-icon" />
                {browserInfo.devicePixelRatio}
              </div>
            </div>
          </div>
        </div>

        {/* Browser Features */}
        <div className="info-section">
          <h3 className="section-title">
            <FontAwesomeIcon icon="fas fa-cogs" className="title-icon" />
            Browser Features
          </h3>
          <div className="features-grid">
            <div className={`feature-item ${browserInfo.cookieEnabled ? 'enabled' : 'disabled'}`}>
              <FontAwesomeIcon icon="fas fa-cookie-bite" className="feature-icon" />
              <span className="feature-name">Cookies</span>
              <span className="feature-status">{browserInfo.cookieEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className={`feature-item ${browserInfo.onLine ? 'enabled' : 'disabled'}`}>
              <FontAwesomeIcon icon="fas fa-wifi" className="feature-icon" />
              <span className="feature-name">Online</span>
              <span className="feature-status">{browserInfo.onLine ? 'Online' : 'Offline'}</span>
            </div>
            <div className={`feature-item ${browserInfo.webglSupported ? 'enabled' : 'disabled'}`}>
              <FontAwesomeIcon icon="fas fa-cube" className="feature-icon" />
              <span className="feature-name">WebGL</span>
              <span className="feature-status">{browserInfo.webglSupported ? 'Supported' : 'Not Supported'}</span>
            </div>
            <div className={`feature-item ${browserInfo.localStorageSupported ? 'enabled' : 'disabled'}`}>
              <FontAwesomeIcon icon="fas fa-database" className="feature-icon" />
              <span className="feature-name">Local Storage</span>
              <span className="feature-status">{browserInfo.localStorageSupported ? 'Supported' : 'Not Supported'}</span>
            </div>
            <div className={`feature-item ${browserInfo.sessionStorageSupported ? 'enabled' : 'disabled'}`}>
              <FontAwesomeIcon icon="fas fa-clock" className="feature-icon" />
              <span className="feature-name">Session Storage</span>
              <span className="feature-status">{browserInfo.sessionStorageSupported ? 'Supported' : 'Not Supported'}</span>
            </div>
            <div className={`feature-item ${browserInfo.geolocationSupported ? 'enabled' : 'disabled'}`}>
              <FontAwesomeIcon icon="fas fa-map-marker-alt" className="feature-icon" />
              <span className="feature-name">Geolocation</span>
              <span className="feature-status">{browserInfo.geolocationSupported ? 'Supported' : 'Not Supported'}</span>
            </div>
            <div className={`feature-item ${browserInfo.notificationSupported ? 'enabled' : 'disabled'}`}>
              <FontAwesomeIcon icon="fas fa-bell" className="feature-icon" />
              <span className="feature-name">Notifications</span>
              <span className="feature-status">{browserInfo.notificationSupported ? 'Supported' : 'Not Supported'}</span>
            </div>
            <div className={`feature-item ${browserInfo.serviceWorkerSupported ? 'enabled' : 'disabled'}`}>
              <FontAwesomeIcon icon="fas fa-cogs" className="feature-icon" />
              <span className="feature-name">Service Workers</span>
              <span className="feature-status">{browserInfo.serviceWorkerSupported ? 'Supported' : 'Not Supported'}</span>
            </div>
            <div className={`feature-item ${browserInfo.webRTCSupported ? 'enabled' : 'disabled'}`}>
              <FontAwesomeIcon icon="fas fa-video" className="feature-icon" />
              <span className="feature-name">WebRTC</span>
              <span className="feature-status">{browserInfo.webRTCSupported ? 'Supported' : 'Not Supported'}</span>
            </div>
            <div className={`feature-item ${browserInfo.touchSupported ? 'enabled' : 'disabled'}`}>
              <FontAwesomeIcon icon="fas fa-hand-pointer" className="feature-icon" />
              <span className="feature-name">Touch Support</span>
              <span className="feature-status">{browserInfo.touchSupported ? 'Supported' : 'Not Supported'}</span>
            </div>
          </div>
        </div>

        {/* Timezone Information */}
        <div className="info-section">
          <h3 className="section-title">
            <FontAwesomeIcon icon="fas fa-clock" className="title-icon" />
            Timezone Information
          </h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Timezone</div>
              <div className="info-value">
                <FontAwesomeIcon icon="fas fa-globe-americas" className="value-icon" />
                {browserInfo.timezone}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">UTC Offset</div>
              <div className="info-value">
                <FontAwesomeIcon icon="fas fa-clock" className="value-icon" />
                {browserInfo.timezoneOffset}
              </div>
            </div>
          </div>
        </div>

        {/* User Agent */}
        <div className="info-section">
          <h3 className="section-title">
            <FontAwesomeIcon icon="fas fa-code" className="title-icon" />
            User Agent String
          </h3>
          <div className="user-agent-display">
            <div className="user-agent-text">{browserInfo.userAgent}</div>
            <button onClick={() => copyToClipboard(browserInfo.userAgent)} className="copy-btn">
              <FontAwesomeIcon icon="fas fa-copy" />
              Copy User Agent
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={() => copyToClipboard(JSON.stringify(browserInfo, null, 2))} className="btn-secondary">
            <FontAwesomeIcon icon="fas fa-copy" />
            Copy All Data
          </button>
          <button onClick={downloadReport} className="btn-secondary">
            <FontAwesomeIcon icon="fas fa-download" />
            Download Report
          </button>
        </div>
      </div>

      {/* Tool Information */}
      <div className="info-card">
        <h3 className="info-title">
          <FontAwesomeIcon icon="fas fa-info-circle" className="title-icon" />
          About Browser Detection
        </h3>
        <div className="info-content">
          <p>
            Our Browser Detection tool provides comprehensive information about your current browser, 
            operating system, and device capabilities. This tool helps you understand your browser's 
            features and compatibility with modern web technologies.
          </p>
          <p>
            Perfect for developers who need to test browser compatibility, users who want to 
            understand their browser's capabilities, or anyone troubleshooting web application 
            issues. All detection happens locally in your browser with no external requests.
          </p>
          <p>
            The tool detects browser type and version, operating system details, screen and window 
            dimensions, supported web features, timezone information, and much more. You can copy 
            the information or download a detailed report for your records.
          </p>
        </div>
      </div>

      {/* How to Use */}
      <div className="how-to-card">
        <h3 className="how-to-title">
          <FontAwesomeIcon icon="fas fa-play-circle" className="title-icon" />
          How to Use Browser Detection
        </h3>
        <div className="steps-list">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Automatic Detection</h4>
              <p>The tool automatically detects your browser information when the page loads.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Review Information</h4>
              <p>Browse through the different sections to see your browser, system, and feature details.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Copy or Download</h4>
              <p>Copy specific information or download a complete report for your records.</p>
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
            <FontAwesomeIcon icon="fas fa-globe" className="feature-icon" />
            <h4>Browser Detection</h4>
            <p>Identify browser type, version, and operating system details</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-tv" className="feature-icon" />
            <h4>Screen Analysis</h4>
            <p>Get detailed screen resolution, color depth, and window information</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-cogs" className="feature-icon" />
            <h4>Feature Detection</h4>
            <p>Check support for WebGL, WebRTC, notifications, and other modern features</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-download" className="feature-icon" />
            <h4>Export Options</h4>
            <p>Copy information or download detailed reports in text format</p>
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
            <h4>Web Development</h4>
            <p>Test browser compatibility and feature support for web applications</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-bug" className="use-case-icon" />
            <h4>Debugging</h4>
            <p>Troubleshoot issues by understanding browser capabilities and limitations</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-chart-bar" className="use-case-icon" />
            <h4>Analytics</h4>
            <p>Gather browser statistics and user environment information</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-shield-alt" className="use-case-icon" />
            <h4>Security</h4>
            <p>Verify browser security features and configuration settings</p>
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

        .loading-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 24px;
          padding: 4rem 2rem;
          color: white;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .loading-spinner {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .loading-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .loading-card p {
          opacity: 0.8;
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

        .info-section {
          position: relative;
          z-index: 1;
          margin-bottom: 2rem;
        }

        .section-title {
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

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .info-item {
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 1rem;
          backdrop-filter: blur(10px);
        }

        .info-label {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .info-value {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
        }

        .value-icon {
          opacity: 0.8;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .feature-item {
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 1rem;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
        }

        .feature-item.enabled {
          border-left: 4px solid #10b981;
        }

        .feature-item.disabled {
          border-left: 4px solid #ef4444;
        }

        .feature-icon {
          font-size: 1.2rem;
          opacity: 0.8;
        }

        .feature-name {
          flex: 1;
          font-weight: 600;
        }

        .feature-status {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .user-agent-display {
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 1rem;
          backdrop-filter: blur(10px);
        }

        .user-agent-text {
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1rem;
          word-break: break-all;
        }

        .copy-btn {
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

        .copy-btn:hover {
          background: rgba(255,255,255,0.3);
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
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
          
          .info-grid, .features-grid {
            grid-template-columns: 1fr;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .feature-item {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default WhatIsMyBrowser
