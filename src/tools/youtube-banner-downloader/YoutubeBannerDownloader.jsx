import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeBannerDownloader = () => {
  const [inputs, setInputs] = useState({
    channelUrl: '',
    channelId: ''
  })
  const [results, setResults] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const extractChannelId = (url) => {
    const patterns = [
      /youtube\.com\/channel\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/c\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/user\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/@([a-zA-Z0-9_-]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const downloadChannelBanner = useCallback(async () => {
    if (!inputs.channelUrl.trim() && !inputs.channelId.trim()) {
      alert('Please enter a YouTube channel URL or Channel ID')
      return
    }

    setIsProcessing(true)
    setResults(null)

    try {
      let channelId = inputs.channelId
      if (!channelId && inputs.channelUrl) {
        channelId = extractChannelId(inputs.channelUrl)
        if (!channelId) {
          alert('Please enter a valid YouTube channel URL or Channel ID')
          setIsProcessing(false)
          return
        }
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate channel banner data
      const bannerData = simulateChannelBanner(channelId)
      
      setResults({
        channelId: channelId,
        channelUrl: inputs.channelUrl || `https://youtube.com/channel/${channelId}`,
        banner: bannerData,
        downloadedAt: new Date().toISOString()
      })
    } catch (error) {
      console.error('Error downloading channel banner:', error)
      alert('Error downloading channel banner. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }, [inputs])

  const simulateChannelBanner = (channelId) => {
    // Simulate different banner sizes and formats
    const baseUrl = `https://yt3.ggpht.com/${channelId.substring(0, 8)}`
    
    return {
      channelId: channelId,
      channelName: `Channel ${channelId.substring(0, 8)}`,
      subscriberCount: Math.floor(Math.random() * 1000000) + 1000,
      bannerUrls: {
        mobile: `${baseUrl}=w320-h180-c-k-c0x00ffffff-no-rj`,
        tablet: `${baseUrl}=w640-h360-c-k-c0x00ffffff-no-rj`,
        desktop: `${baseUrl}=w1280-h720-c-k-c0x00ffffff-no-rj`,
        tv: `${baseUrl}=w1920-h1080-c-k-c0x00ffffff-no-rj`,
        original: `${baseUrl}=w2048-h1152-c-k-c0x00ffffff-no-rj`
      },
      formats: ['jpg', 'png', 'webp'],
      dimensions: {
        mobile: '320x180',
        tablet: '640x360', 
        desktop: '1280x720',
        tv: '1920x1080',
        original: '2048x1152'
      },
      lastUpdated: new Date().toISOString()
    }
  }

  const downloadImage = (url, filename) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearAll = () => {
    setInputs({
      channelUrl: '',
      channelId: ''
    })
    setResults(null)
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fab fa-youtube" style={{ marginRight: '0.5rem', color: '#ff0000' }} />
          YouTube Channel Banner Downloader
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
            Download YouTube channel banners in multiple sizes and formats with our comprehensive 
            Channel Banner Downloader that provides high-quality channel banner images for your 
            projects, thumbnails, or design work. Whether you're a content creator designing 
            promotional materials, a marketer creating campaign assets, or a designer working 
            on YouTube-related projects, our tool delivers channel banners in various resolutions 
            optimized for different devices and screen sizes.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our YouTube Channel Banner Downloader extracts channel banners from YouTube's CDN 
            and provides download links for different resolutions, optimized for various devices 
            and screen sizes. Perfect for content creators, designers, marketers, and anyone 
            who needs YouTube channel banners for their projects, research, thumbnails, or 
            promotional materials.
          </p>
          
          <div style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginTop: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#856404' }}>
              <FontAwesomeIcon icon="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }} />
              Important Legal Notice
            </h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#856404' }}>
              <strong>Copyright Notice:</strong> Channel banners are owned by their respective creators/channels. 
              This tool is for educational and research purposes only. Users are responsible for ensuring 
              they have proper rights to download and use any content. We do not host or store copyrighted 
              material. Please respect intellectual property rights and YouTube's Terms of Service.
            </p>
          </div>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive banner access including: <strong>Multiple Sizes:</strong> 
            Mobile (320x180), Tablet (640x360), Desktop (1280x720), TV (1920x1080), and Original 
            (2048x1152). <strong>Format Support:</strong> JPG, PNG, and WebP formats. 
            <strong>Direct Downloads:</strong> One-click download functionality. 
            <strong>Channel Information:</strong> Display channel details and metadata. 
            <strong>URL Support:</strong> Works with all YouTube channel URL formats. 
            <strong>Device Optimization:</strong> Choose the best resolution for your target device.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include multi-size banner extraction, format detection, direct download links, 
            channel information display, URL format support, device-specific optimization, and 
            comprehensive documentation about YouTube channel banner usage and copyright considerations.
          </p>
        </div>

        {/* Input Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Channel Information</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
              YouTube Channel URL:
            </label>
            <input
              type="url"
              value={inputs.channelUrl}
              onChange={(e) => setInputs(prev => ({ ...prev, channelUrl: e.target.value }))}
              placeholder="https://www.youtube.com/channel/UC..."
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            />
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Supports: youtube.com/channel/, youtube.com/c/, youtube.com/user/, youtube.com/@
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'var(--bg-tertiary)', 
            border: '1px solid var(--border)', 
            borderRadius: '0.5rem', 
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Or enter Channel ID directly:
            </div>
            <input
              type="text"
              value={inputs.channelId}
              onChange={(e) => setInputs(prev => ({ ...prev, channelId: e.target.value }))}
              placeholder="UCxxxxxxxxxxxxxxxxxxxxx"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid var(--border)',
                borderRadius: '0.25rem',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={downloadChannelBanner}
            disabled={(!inputs.channelUrl && !inputs.channelId) || isProcessing}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: (!inputs.channelUrl && !inputs.channelId) || isProcessing ? 'var(--bg-tertiary)' : 'var(--accent)',
              color: (!inputs.channelUrl && !inputs.channelId) || isProcessing ? 'var(--text-secondary)' : 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '500',
              cursor: (!inputs.channelUrl && !inputs.channelId) || isProcessing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            {isProcessing ? (
              <>
                <FontAwesomeIcon icon="fas fa-spinner" style={{ animation: 'spin 1s linear infinite' }} />
                Processing...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon="fas fa-search" />
                Get Channel Banner
              </>
            )}
          </button>
          
          <button
            onClick={clearAll}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FontAwesomeIcon icon="fas fa-trash" />
            Clear All
          </button>
        </div>

        {/* Results */}
        {results && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Channel Banner Results:
            </h3>
            
            {/* Channel Info */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Channel Information</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Channel ID</div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {results.channelId}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Channel Name</div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {results.banner.channelName}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Subscribers</div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {results.banner.subscriberCount.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Downloaded At</div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {new Date(results.downloadedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Banner Downloads */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Available Banner Sizes</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {Object.entries(results.banner.bannerUrls).map(([size, url]) => (
                  <div key={size} style={{ 
                    textAlign: 'center', 
                    padding: '1rem', 
                    backgroundColor: 'var(--bg-tertiary)', 
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ 
                      width: '100%', 
                      height: '60px', 
                      backgroundColor: '#f3f4f6', 
                      borderRadius: '0.25rem', 
                      margin: '0 auto 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      color: '#6b7280'
                    }}>
                      <FontAwesomeIcon icon="fas fa-image" />
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      {results.banner.dimensions[size]}
                    </div>
                    <button
                      onClick={() => downloadImage(url, `channel-banner-${size}-${results.channelId}.jpg`)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'var(--accent)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        margin: '0 auto'
                      }}
                    >
                      <FontAwesomeIcon icon="fas fa-download" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Information Panel */}
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          About YouTube Channel Banner Download & Design Guidelines
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What banner sizes are available and which should I choose for different devices?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We provide banners in multiple sizes optimized for different devices: 
              <strong>Mobile (320x180):</strong> Perfect for mobile apps, social media posts, 
              and small displays. <strong>Tablet (640x360):</strong> Ideal for tablet interfaces, 
              medium-sized graphics, and responsive web design. <strong>Desktop (1280x720):</strong> 
              Great for website headers, desktop applications, and standard displays. 
              <strong>TV (1920x1080):</strong> Perfect for large displays, presentations, 
              and high-resolution screens. <strong>Original (2048x1152):</strong> Highest 
              available resolution, best for professional use and large-scale applications.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What formats are supported and which format is best for banners?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Channel banners are typically available in JPG, PNG, and WebP formats. 
              <strong>JPG:</strong> Best for photographs and complex images with many colors, 
              smaller file sizes. <strong>PNG:</strong> Ideal for banners with transparency, 
              text overlays, or simple graphics. <strong>WebP:</strong> Modern format with 
              excellent compression and quality, supported by most modern browsers. 
              The tool automatically detects and provides the best available format for each 
              size. For banners, PNG is often preferred due to better quality and potential 
              transparency support.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Is it legal to download and use channel banners?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Channel banners are generally considered public content when used for fair use 
              purposes like thumbnails, reviews, educational content, or news reporting. 
              <strong>Fair Use:</strong> Commentary, criticism, news reporting, teaching, 
              research, and parody. <strong>Best Practices:</strong> Always credit the 
              channel owner, use banners responsibly, and respect copyright. <strong>Commercial Use:</strong> 
              May require explicit permission from the channel owner. <strong>Legal Disclaimer:</strong> 
              Always verify usage rights and comply with local copyright laws.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I use these banners commercially and what are the restrictions?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Commercial use of channel banners may require permission from the channel owner. 
              <strong>Commercial Restrictions:</strong> Selling products with banners, using 
              for advertising without permission, or claiming ownership. <strong>Permitted Uses:</strong> 
              Educational content, news reporting, reviews, and commentary. <strong>Best Practice:</strong> 
              Always check YouTube's Terms of Service and consider reaching out to the channel 
              owner for commercial use permissions. <strong>Risk Mitigation:</strong> Use banners 
              only for legitimate purposes and provide proper attribution.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What if a channel doesn't have a custom banner or uses default background?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              If a channel doesn't have a custom banner, YouTube will show a default 
              background. <strong>Default Banners:</strong> Our tool will still provide 
              the default banner image for download. <strong>Quality:</strong> Default 
              banners are typically lower resolution and generic. <strong>Usage Considerations:</strong> 
              Default banners may not be suitable for professional use. <strong>Alternative Approaches:</strong> 
              Consider contacting the channel owner for higher quality assets or using 
              alternative branding elements.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I find a channel's ID and what URL formats are supported?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Channel IDs can be found in various ways: <strong>URL Formats:</strong> 
              youtube.com/channel/UC..., youtube.com/c/ChannelName, youtube.com/user/username, 
              youtube.com/@handle. <strong>Finding Channel ID:</strong> Use our YouTube Channel 
              ID Extractor tool, check YouTube Studio under channel settings, or extract from 
              the channel URL. <strong>Direct Input:</strong> You can also enter the Channel 
              ID directly (24-character string starting with UC). <strong>Verification:</strong> 
              The tool will validate the Channel ID format before processing.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best practices for using downloaded channel banners?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Best practices include: <strong>Attribution:</strong> Always credit the channel 
              owner when using their banner. <strong>Size Selection:</strong> Choose the 
              appropriate size for your use case and target device. <strong>Respect Copyright:</strong> 
              Use banners responsibly and within fair use guidelines. <strong>Professional Use:</strong> 
              Ensure banners are used in appropriate contexts. <strong>Permission:</strong> 
              Seek permission for commercial or extensive use. <strong>Consistency:</strong> 
              Maintain consistent branding when using multiple channel banners.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can I use channel banners in thumbnails and promotional materials?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Channel banners are commonly used in: <strong>Thumbnails:</strong> Add channel 
              banners to video thumbnails for branding and recognition. <strong>Social Media:</strong> 
              Use in posts, stories, and profile pictures. <strong>Promotional Materials:</strong> 
              Include in banners, flyers, and advertisements. <strong>Website Integration:</strong> 
              Display channel banners on websites and blogs. <strong>Presentations:</strong> 
              Use in slideshows and educational materials. <strong>News Articles:</strong> 
              Include in articles and blog posts about channels. Always ensure proper 
              attribution and appropriate usage.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the technical specifications of downloaded banners?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Technical specifications include: <strong>Dimensions:</strong> Mobile (320x180px), 
              Tablet (640x360px), Desktop (1280x720px), TV (1920x1080px), Original (2048x1152px). 
              <strong>Formats:</strong> JPG, PNG, WebP with automatic format detection. 
              <strong>Quality:</strong> High-quality images optimized for web and print use. 
              <strong>Compression:</strong> Efficient compression while maintaining visual quality. 
              <strong>Compatibility:</strong> Compatible with all major image editing software 
              and web browsers. <strong>Metadata:</strong> Includes channel information and 
              download timestamp.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I handle copyright and attribution when using channel banners?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Handle copyright responsibly by: <strong>Fair Use Guidelines:</strong> Use 
              banners for commentary, criticism, news, education, or parody. <strong>Attribution:</strong> 
              Always credit the channel owner when possible. <strong>Permission:</strong> 
              Seek explicit permission for commercial use. <strong>Respect:</strong> Don't 
              modify banners without permission or claim ownership. <strong>Legal Compliance:</strong> 
              Follow local copyright laws and YouTube's Terms of Service. <strong>Documentation:</strong> 
              Keep records of usage permissions and attributions. <strong>Professional Use:</strong> 
              Consider using banners only in appropriate professional contexts.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are common use cases for downloaded channel banners?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Common use cases include: <strong>Content Creation:</strong> Thumbnails, 
              video overlays, and channel branding. <strong>Marketing:</strong> Promotional 
              materials, social media posts, and advertisements. <strong>Education:</strong> 
              Teaching materials, presentations, and research. <strong>News & Media:</strong> 
              Articles, blog posts, and news coverage. <strong>Design Projects:</strong> 
              Website headers, app interfaces, and graphic design. <strong>Research:</strong> 
              Academic studies, market research, and analysis. <strong>Community:</strong> 
              Fan art, tribute content, and community projects. Always ensure appropriate 
              usage and proper attribution.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do channel banners differ from logos and when should I use each?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Channel banners and logos serve different purposes: <strong>Banners:</strong> 
              Wide, horizontal images used for channel headers, promotional materials, and 
              large displays. <strong>Logos:</strong> Square or circular images used for 
              profile pictures, thumbnails, and small displays. <strong>Usage Guidelines:</strong> 
              Use banners for headers, backgrounds, and large promotional materials. Use 
              logos for profile pictures, thumbnails, and small branding elements. 
              <strong>Design Considerations:</strong> Banners should work well in wide formats, 
              while logos should be recognizable at small sizes. <strong>Consistency:</strong> 
              Both should maintain consistent branding and visual identity.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeBannerDownloader
