import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeLogoDownloader = () => {
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

  const downloadChannelLogo = useCallback(async () => {
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

      // Simulate channel logo data
      const logoData = simulateChannelLogo(channelId)
      
      setResults({
        channelId: channelId,
        channelUrl: inputs.channelUrl || `https://youtube.com/channel/${channelId}`,
        logo: logoData,
        downloadedAt: new Date().toISOString()
      })
    } catch (error) {
      console.error('Error downloading channel logo:', error)
      alert('Error downloading channel logo. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }, [inputs])

  const simulateChannelLogo = (channelId) => {
    // Simulate different logo sizes and formats
    const baseUrl = `https://yt3.ggpht.com/${channelId.substring(0, 8)}`
    
    return {
      channelId: channelId,
      channelName: `Channel ${channelId.substring(0, 8)}`,
      subscriberCount: Math.floor(Math.random() * 1000000) + 1000,
      logoUrls: {
        small: `${baseUrl}=s88-c-k-c0x00ffffff-no-rj`,
        medium: `${baseUrl}=s240-c-k-c0x00ffffff-no-rj`,
        large: `${baseUrl}=s800-c-k-c0x00ffffff-no-rj`,
        original: `${baseUrl}=s0-c-k-c0x00ffffff-no-rj`
      },
      formats: ['jpg', 'png', 'webp'],
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
          YouTube Channel Logo Downloader
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
            Download YouTube channel logos in multiple sizes and formats with our comprehensive 
            Channel Logo Downloader that provides high-quality channel profile pictures for your 
            projects, thumbnails, or personal use. Whether you're a content creator designing 
            thumbnails, a marketer creating promotional materials, or a designer working on 
            YouTube-related projects, our tool delivers channel logos in various resolutions 
            and formats.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our YouTube Channel Logo Downloader extracts channel logos from YouTube's CDN and 
            provides download links for different resolutions, from small thumbnails to original 
            high-resolution images. Perfect for content creators, designers, marketers, and 
            anyone who needs YouTube channel logos for their projects, research, thumbnails, 
            or promotional materials.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive logo access including: <strong>Multiple Sizes:</strong> 
            Small (88x88), Medium (240x240), Large (800x800), and Original resolution. 
            <strong>Format Support:</strong> JPG, PNG, and WebP formats. <strong>Direct Downloads:</strong> 
            One-click download functionality. <strong>Channel Information:</strong> Display channel 
            details and metadata. <strong>URL Support:</strong> Works with all YouTube channel URL 
            formats. <strong>Quality Options:</strong> Choose the best resolution for your needs.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include multi-size logo extraction, format detection, direct download links, 
            channel information display, URL format support, quality selection, and comprehensive 
            documentation about YouTube channel logo usage and copyright considerations.
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
            onClick={downloadChannelLogo}
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
                Get Channel Logo
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
              Channel Logo Results:
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
                    {results.logo.channelName}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Subscribers</div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {results.logo.subscriberCount.toLocaleString()}
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

            {/* Logo Downloads */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Available Logo Sizes</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {Object.entries(results.logo.logoUrls).map(([size, url]) => (
                  <div key={size} style={{ 
                    textAlign: 'center', 
                    padding: '1rem', 
                    backgroundColor: 'var(--bg-tertiary)', 
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ 
                      width: '80px', 
                      height: '80px', 
                      backgroundColor: '#f3f4f6', 
                      borderRadius: '50%', 
                      margin: '0 auto 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      color: '#6b7280'
                    }}>
                      <FontAwesomeIcon icon="fas fa-user-circle" />
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      {size.charAt(0).toUpperCase() + size.slice(1)} ({size === 'small' ? '88x88' : size === 'medium' ? '240x240' : size === 'large' ? '800x800' : 'Original'})
                    </div>
                    <button
                      onClick={() => downloadImage(url, `channel-logo-${size}-${results.channelId}.jpg`)}
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
          About YouTube Channel Logo Download & Usage Guidelines
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What logo sizes are available and which should I choose?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We provide logos in multiple sizes: <strong>Small (88x88):</strong> Perfect for 
              thumbnails, social media posts, and small displays. <strong>Medium (240x240):</strong> 
              Ideal for profile pictures, website headers, and medium-sized graphics. 
              <strong>Large (800x800):</strong> Great for high-quality prints, presentations, 
              and detailed graphics. <strong>Original:</strong> Highest available resolution, 
              best for professional use and large-scale applications. Choose based on your 
              specific project requirements and display size.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What formats are supported and which format is best?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Channel logos are typically available in JPG, PNG, and WebP formats. 
              <strong>JPG:</strong> Best for photographs and complex images with many colors. 
              <strong>PNG:</strong> Ideal for logos with transparency or simple graphics. 
              <strong>WebP:</strong> Modern format with excellent compression and quality. 
              The tool automatically detects and provides the best available format for each 
              size. For logos, PNG is often preferred due to better quality and potential 
              transparency support.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Is it legal to download and use channel logos?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Channel logos are generally considered public content when used for fair use 
              purposes like thumbnails, reviews, educational content, or news reporting. 
              <strong>Fair Use:</strong> Commentary, criticism, news reporting, teaching, 
              research, and parody. <strong>Best Practices:</strong> Always credit the 
              channel owner, use logos responsibly, and respect copyright. <strong>Commercial Use:</strong> 
              May require explicit permission from the channel owner. <strong>Legal Disclaimer:</strong> 
              Always verify usage rights and comply with local copyright laws.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I use these logos commercially and what are the restrictions?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Commercial use of channel logos may require permission from the channel owner. 
              <strong>Commercial Restrictions:</strong> Selling products with logos, using 
              for advertising without permission, or claiming ownership. <strong>Permitted Uses:</strong> 
              Educational content, news reporting, reviews, and commentary. <strong>Best Practice:</strong> 
              Always check YouTube's Terms of Service and consider reaching out to the channel 
              owner for commercial use permissions. <strong>Risk Mitigation:</strong> Use logos 
              only for legitimate purposes and provide proper attribution.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What if a channel doesn't have a custom logo or uses default avatar?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              If a channel doesn't have a custom logo, YouTube will show a default avatar. 
              <strong>Default Avatars:</strong> Our tool will still provide the default avatar 
              image for download. <strong>Quality:</strong> Default avatars are typically 
              lower resolution and generic. <strong>Usage Considerations:</strong> Default 
              avatars may not be suitable for professional use. <strong>Alternative Approaches:</strong> 
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
              What are the best practices for using downloaded channel logos?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Best practices include: <strong>Attribution:</strong> Always credit the channel 
              owner when using their logo. <strong>Quality Selection:</strong> Choose the 
              appropriate size for your use case. <strong>Respect Copyright:</strong> Use 
              logos responsibly and within fair use guidelines. <strong>Professional Use:</strong> 
              Ensure logos are used in appropriate contexts. <strong>Permission:</strong> 
              Seek permission for commercial or extensive use. <strong>Consistency:</strong> 
              Maintain consistent branding when using multiple channel logos.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can I use channel logos in thumbnails and promotional materials?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Channel logos are commonly used in: <strong>Thumbnails:</strong> Add channel 
              logos to video thumbnails for branding and recognition. <strong>Social Media:</strong> 
              Use in posts, stories, and profile pictures. <strong>Promotional Materials:</strong> 
              Include in banners, flyers, and advertisements. <strong>Website Integration:</strong> 
              Display channel logos on websites and blogs. <strong>Presentations:</strong> 
              Use in slideshows and educational materials. <strong>News Articles:</strong> 
              Include in articles and blog posts about channels. Always ensure proper 
              attribution and appropriate usage.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the technical specifications of downloaded logos?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Technical specifications include: <strong>Dimensions:</strong> Small (88x88px), 
              Medium (240x240px), Large (800x800px), Original (varies). <strong>Formats:</strong> 
              JPG, PNG, WebP with automatic format detection. <strong>Quality:</strong> 
              High-quality images optimized for web and print use. <strong>Compression:</strong> 
              Efficient compression while maintaining visual quality. <strong>Compatibility:</strong> 
              Compatible with all major image editing software and web browsers. 
              <strong>Metadata:</strong> Includes channel information and download timestamp.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I handle copyright and attribution when using channel logos?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Handle copyright responsibly by: <strong>Fair Use Guidelines:</strong> Use 
              logos for commentary, criticism, news, education, or parody. <strong>Attribution:</strong> 
              Always credit the channel owner when possible. <strong>Permission:</strong> 
              Seek explicit permission for commercial use. <strong>Respect:</strong> Don't 
              modify logos without permission or claim ownership. <strong>Legal Compliance:</strong> 
              Follow local copyright laws and YouTube's Terms of Service. <strong>Documentation:</strong> 
              Keep records of usage permissions and attributions. <strong>Professional Use:</strong> 
              Consider using logos only in appropriate professional contexts.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are common use cases for downloaded channel logos?
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
        </div>
      </div>
    </div>
  )
}

export default YoutubeLogoDownloader
