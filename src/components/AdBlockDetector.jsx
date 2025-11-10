import { useState, useEffect } from 'react'

const AdBlockDetector = () => {
  const [adBlockDetected, setAdBlockDetected] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const enableAds = import.meta.env.VITE_ENABLE_ADS === 'true'

  useEffect(() => {
    if (!enableAds) return

    const detectAdBlock = () => {
      // Create a test ad element
      const testAd = document.createElement('div')
      testAd.innerHTML = '&nbsp;'
      testAd.className = 'adsbox'
      testAd.style.cssText = `
        position: absolute;
        left: -10000px;
        top: -1000px;
        width: 1px;
        height: 1px;
        visibility: hidden;
      `
      
      // Add common ad-blocker selectors
      testAd.id = 'google_ads_iframe'
      testAd.setAttribute('data-ad-client', 'ca-pub-test')
      testAd.setAttribute('data-ad-slot', 'test')
      
      document.body.appendChild(testAd)

      // Check if the ad was blocked
      setTimeout(() => {
        const isBlocked = testAd.offsetHeight === 0 || 
                         testAd.offsetWidth === 0 || 
                         testAd.style.display === 'none' ||
                         window.getComputedStyle(testAd).display === 'none'

        if (isBlocked) {
          setAdBlockDetected(true)
          // Show banner after a delay to avoid being too aggressive
          setTimeout(() => {
            setShowBanner(true)
          }, 2000)
        } else {
          setAdBlockDetected(false)
        }

        // Clean up
        if (document.body.contains(testAd)) {
          document.body.removeChild(testAd)
        }
      }, 100)
    }

    // Run detection after page load
    const timer = setTimeout(detectAdBlock, 1000)
    
    return () => clearTimeout(timer)
  }, [enableAds])

  const handleDismiss = () => {
    setShowBanner(false)
    // Don't show again for this session
    sessionStorage.setItem('adblock-banner-dismissed', 'true')
  }

  const handleWhitelist = () => {
    setShowBanner(false)
    // Open instructions in new tab
    window.open('https://help.getadblock.com/support/solutions/articles/6000042059-how-to-whitelist-a-website', '_blank')
  }

  // Don't show if dismissed in this session
  useEffect(() => {
    if (sessionStorage.getItem('adblock-banner-dismissed')) {
      setShowBanner(false)
    }
  }, [])

  if (!enableAds || !adBlockDetected || !showBanner) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      maxWidth: '400px',
      zIndex: 1000,
      boxShadow: '0 8px 24px var(--shadow-hover)',
      backdropFilter: 'blur(10px)',
      animation: 'slideInRight 0.3s ease-out'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ 
          fontSize: '1.5rem',
          flexShrink: 0,
          marginTop: '0.25rem'
        }}>
          💙
        </div>
        
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            color: 'var(--text-primary)', 
            margin: '0 0 0.5rem 0',
            fontSize: '1rem',
            fontWeight: '600'
          }}>
            Ad Blocker Detected
          </h3>
          
          <p style={{ 
            color: 'var(--text-secondary)', 
            margin: '0 0 1rem 0',
            fontSize: '0.875rem',
            lineHeight: '1.4'
          }}>
            Looks like you're using an ad blocker. Ads keep TrimToolsHub free — consider whitelisting us to support our free tools.
          </p>
          
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleWhitelist}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--accent-hover)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--accent)'
              }}
            >
              Whitelist Us
            </button>
            
            <button
              onClick={handleDismiss}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.375rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--bg-tertiary)'
                e.target.style.color = 'var(--text-primary)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = 'var(--text-secondary)'
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
        
        <button
          onClick={handleDismiss}
          style={{
            padding: '0.25rem',
            backgroundColor: 'transparent',
            color: 'var(--text-muted)',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '1.2rem',
            lineHeight: 1,
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--bg-tertiary)'
            e.target.style.color = 'var(--text-primary)'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent'
            e.target.style.color = 'var(--text-muted)'
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default AdBlockDetector
