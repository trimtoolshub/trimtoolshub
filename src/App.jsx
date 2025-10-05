import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AllTools from './pages/AllTools'
import ToolPage from './pages/ToolPage'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Docs from './pages/Docs'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import CookieConsent from './components/CookieConsent'
import AdBlockDetector from './components/AdBlockDetector'
import VercelAnalytics from './components/analytics/VercelAnalytics'
import { useEffect } from 'react'

function App() {
  // Initialize Google Analytics
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID
    if (gaId) {
      // Load Google Analytics script
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      document.head.appendChild(script)

      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag = gtag
      gtag('js', new Date())
      gtag('config', gaId)
    }
  }, [])

  // Initialize Google AdSense
  useEffect(() => {
    const adsenseClient = import.meta.env.VITE_ADSENSE_CLIENT
    const enableAds = import.meta.env.VITE_ENABLE_ADS === 'true'
    
    if (adsenseClient && enableAds) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
    }
  }, [])

  return (
    <HelmetProvider>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<AllTools />} />
            <Route path="/tools/:slug" element={<ToolPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Cookie Consent, AdBlock Detection, and Analytics */}
        <CookieConsent />
        <AdBlockDetector />
        <VercelAnalytics />
      </div>
    </HelmetProvider>
  )
}

export default App
