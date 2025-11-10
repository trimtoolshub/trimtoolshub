import { useEffect, useState } from 'react'

const AdSlot = ({ slotId, size = 'auto', style = {}, className = '' }) => {
  const enableAds = import.meta.env.VITE_ENABLE_ADS === 'true'
  const adsenseClient = import.meta.env.VITE_ADSENSE_CLIENT
  const [adBlocked, setAdBlocked] = useState(false)
  const [adLoaded, setAdLoaded] = useState(false)

  // Predefined ad sizes
  const adSizes = {
    'banner': { width: 728, height: 90 },
    'skyscraper': { width: 160, height: 600 },
    'rectangle': { width: 300, height: 250 },
    'square': { width: 250, height: 250 },
    'mobile-banner': { width: 320, height: 50 },
    'auto': { width: 'auto', height: 'auto' }
  }

  const currentSize = adSizes[size] || adSizes['auto']

  useEffect(() => {
    if (enableAds && adsenseClient) {
      // Load AdSense script if not already loaded
      if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
        const script = document.createElement('script')
        script.async = true
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`
        script.crossOrigin = 'anonymous'
        document.head.appendChild(script)
      }

      // AdBlock detection
      const detectAdBlock = () => {
        const testAd = document.createElement('div')
        testAd.innerHTML = '&nbsp;'
        testAd.className = 'adsbox'
        testAd.style.cssText = 'position:absolute;left:-10000px;top:-1000px;'
        document.body.appendChild(testAd)

        setTimeout(() => {
          if (testAd.offsetHeight === 0) {
            setAdBlocked(true)
          } else {
            setAdBlocked(false)
          }
          document.body.removeChild(testAd)
        }, 100)
      }

      detectAdBlock()
    }
  }, [enableAds, adsenseClient])

  useEffect(() => {
    if (enableAds && adsenseClient && !adBlocked) {
      try {
        // Initialize AdSense
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({})
          setAdLoaded(true)
        }
      } catch (error) {
        console.log('AdSense initialization failed:', error)
        setAdBlocked(true)
      }
    }
  }, [enableAds, adsenseClient, adBlocked])

  // Don't render if ads are disabled
  if (!enableAds || !adsenseClient) {
    return (
      <div 
        className={`ad-placeholder ${className}`} 
        style={{
          ...style,
          backgroundColor: 'var(--bg-tertiary)',
          border: '2px dashed var(--border)',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
          fontWeight: '500',
          minHeight: size === 'skyscraper' ? '600px' : size === 'banner' ? '90px' : '120px',
          width: typeof currentSize.width === 'number' ? `${currentSize.width}px` : '100%',
          maxWidth: '100%'
        }}
      >
        <span>Ad Space</span>
      </div>
    )
  }

  // Show fallback if adblock detected
  if (adBlocked) {
    return (
      <div 
        className={`ad-placeholder adblock-detected ${className}`} 
        style={{
          ...style,
          backgroundColor: 'var(--bg-tertiary)',
          border: '2px dashed var(--border)',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
          fontWeight: '500',
          minHeight: size === 'skyscraper' ? '600px' : size === 'banner' ? '90px' : '120px',
          width: typeof currentSize.width === 'number' ? `${currentSize.width}px` : '100%',
          maxWidth: '100%',
          flexDirection: 'column',
          gap: '0.5rem',
          padding: '1rem',
          textAlign: 'center'
        }}
      >
        <span>Ad Blocked</span>
        <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
          Consider whitelisting us 💙
        </span>
      </div>
    )
  }

  return (
    <div 
      className={`ad-slot ${className}`} 
      style={{
        ...style,
        minHeight: size === 'skyscraper' ? '600px' : size === 'banner' ? '90px' : '120px',
        width: typeof currentSize.width === 'number' ? `${currentSize.width}px` : '100%',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block',
          width: typeof currentSize.width === 'number' ? `${currentSize.width}px` : '100%',
          height: typeof currentSize.height === 'number' ? `${currentSize.height}px` : 'auto'
        }}
        data-ad-client={adsenseClient}
        data-ad-slot={slotId}
        data-ad-format={size === 'auto' ? 'auto' : 'rectangle'}
        data-full-width-responsive={size === 'auto' ? 'true' : 'false'}
      />
    </div>
  )
}

export default AdSlot

