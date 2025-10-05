import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeEmbedGenerator = () => {
  const [url, setUrl] = useState('')
  const [embedCode, setEmbedCode] = useState('')
  const [embedOptions, setEmbedOptions] = useState({
    width: 560,
    height: 315,
    autoplay: false,
    loop: false,
    mute: false,
    controls: true,
    showInfo: true,
    rel: false,
    modestbranding: false,
    startTime: 0,
    endTime: 0
  })

  const extractVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) {
        return match[1]
      }
    }
    return null
  }

  const generateEmbedCode = useCallback(() => {
    if (!url.trim()) {
      alert('Please enter a YouTube URL')
      return
    }

    const videoId = extractVideoId(url)
    if (!videoId) {
      alert('Invalid YouTube URL. Please enter a valid YouTube video URL.')
      return
    }

    const params = new URLSearchParams()
    
    if (embedOptions.autoplay) params.append('autoplay', '1')
    if (embedOptions.loop) params.append('loop', '1')
    if (embedOptions.mute) params.append('mute', '1')
    if (!embedOptions.controls) params.append('controls', '0')
    if (!embedOptions.showInfo) params.append('showinfo', '0')
    if (!embedOptions.rel) params.append('rel', '0')
    if (embedOptions.modestbranding) params.append('modestbranding', '1')
    if (embedOptions.startTime > 0) params.append('start', embedOptions.startTime)
    if (embedOptions.endTime > 0) params.append('end', embedOptions.endTime)

    const paramString = params.toString()
    const embedUrl = `https://www.youtube.com/embed/${videoId}${paramString ? '?' + paramString : ''}`

    const code = `<iframe 
  width="${embedOptions.width}" 
  height="${embedOptions.height}" 
  src="${embedUrl}" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowfullscreen>
</iframe>`

    setEmbedCode(code)
  }, [url, embedOptions])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Embed code copied to clipboard!')
    }).catch(() => {
      alert('Failed to copy to clipboard')
    })
  }

  const clearAll = () => {
    setUrl('')
    setEmbedCode('')
    setEmbedOptions({
      width: 560,
      height: 315,
      autoplay: false,
      loop: false,
      mute: false,
      controls: true,
      showInfo: true,
      rel: false,
      modestbranding: false,
      startTime: 0,
      endTime: 0
    })
  }

  const presetSizes = [
    { name: 'Standard', width: 560, height: 315 },
    { name: 'Large', width: 640, height: 360 },
    { name: 'HD', width: 1280, height: 720 },
    { name: 'Square', width: 400, height: 400 },
    { name: 'Wide', width: 800, height: 450 },
    { name: 'Mobile', width: 320, height: 180 }
  ]

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fab fa-youtube" style={{ marginRight: '0.5rem', color: '#ff0000' }} />
          YouTube Embed Code Generator
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
            Generate responsive YouTube embed codes for your website or blog with our advanced 
            Embed Code Generator that provides comprehensive customization options. Whether 
            you're building a website, creating blog content, or developing web applications, 
            our tool creates professional embed codes that seamlessly integrate YouTube videos 
            into your projects with custom settings and responsive design.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our YouTube Embed Code Generator supports all YouTube URL formats including youtube.com/watch, 
            youtu.be, and embed URLs. Configure autoplay, loop, controls, start/end times, dimensions, 
            and more with our comprehensive options. The tool ensures your embedded videos work perfectly 
            across all devices and browsers with proper responsive design and accessibility features.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for bloggers, developers, content creators, web designers, and anyone who needs 
            to embed YouTube videos with custom settings and responsive design. The tool helps you 
            create professional embed codes that enhance user experience, improve page performance, 
            and maintain consistent branding across your digital properties.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include URL format detection, size presets, custom dimensions, player options 
            configuration, time settings, live preview, copy-to-clipboard functionality, and 
            comprehensive documentation about YouTube embedding best practices and web development 
            strategies.
          </p>
        </div>

        {/* URL Input */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
            YouTube Video URL:
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID"
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
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Supported formats: youtube.com/watch?v=, youtu.be/, youtube.com/embed/
          </p>
        </div>

        {/* Embed Options */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Embed Options</h3>
          
          {/* Size Presets */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
              Size Presets:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
              {presetSizes.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => setEmbedOptions(prev => ({ ...prev, width: preset.width, height: preset.height }))}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: (embedOptions.width === preset.width && embedOptions.height === preset.height) ? 'var(--accent)' : 'var(--bg-tertiary)',
                    color: (embedOptions.width === preset.width && embedOptions.height === preset.height) ? 'white' : 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  {preset.name}
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    {preset.width}×{preset.height}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Dimensions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Width: {embedOptions.width}px
              </label>
              <input
                type="range"
                min="200"
                max="1920"
                step="10"
                value={embedOptions.width}
                onChange={(e) => setEmbedOptions(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Height: {embedOptions.height}px
              </label>
              <input
                type="range"
                min="150"
                max="1080"
                step="10"
                value={embedOptions.height}
                onChange={(e) => setEmbedOptions(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Player Options */}
          <div style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border)', 
            borderRadius: '0.5rem', 
            padding: '1rem'
          }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Player Options</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={embedOptions.autoplay}
                  onChange={(e) => setEmbedOptions(prev => ({ ...prev, autoplay: e.target.checked }))}
                />
                <span style={{ color: 'var(--text-primary)' }}>Autoplay</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={embedOptions.loop}
                  onChange={(e) => setEmbedOptions(prev => ({ ...prev, loop: e.target.checked }))}
                />
                <span style={{ color: 'var(--text-primary)' }}>Loop</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={embedOptions.mute}
                  onChange={(e) => setEmbedOptions(prev => ({ ...prev, mute: e.target.checked }))}
                />
                <span style={{ color: 'var(--text-primary)' }}>Mute</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={embedOptions.controls}
                  onChange={(e) => setEmbedOptions(prev => ({ ...prev, controls: e.target.checked }))}
                />
                <span style={{ color: 'var(--text-primary)' }}>Show Controls</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={embedOptions.showInfo}
                  onChange={(e) => setEmbedOptions(prev => ({ ...prev, showInfo: e.target.checked }))}
                />
                <span style={{ color: 'var(--text-primary)' }}>Show Info</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={embedOptions.rel}
                  onChange={(e) => setEmbedOptions(prev => ({ ...prev, rel: e.target.checked }))}
                />
                <span style={{ color: 'var(--text-primary)' }}>Show Related Videos</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={embedOptions.modestbranding}
                  onChange={(e) => setEmbedOptions(prev => ({ ...prev, modestbranding: e.target.checked }))}
                />
                <span style={{ color: 'var(--text-primary)' }}>Modest Branding</span>
              </label>
            </div>
          </div>

          {/* Time Settings */}
          <div style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border)', 
            borderRadius: '0.5rem', 
            padding: '1rem',
            marginTop: '1rem'
          }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Time Settings</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                  Start Time: {embedOptions.startTime}s
                </label>
                <input
                  type="range"
                  min="0"
                  max="3600"
                  step="1"
                  value={embedOptions.startTime}
                  onChange={(e) => setEmbedOptions(prev => ({ ...prev, startTime: parseInt(e.target.value) }))}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                  End Time: {embedOptions.endTime}s
                </label>
                <input
                  type="range"
                  min="0"
                  max="3600"
                  step="1"
                  value={embedOptions.endTime}
                  onChange={(e) => setEmbedOptions(prev => ({ ...prev, endTime: parseInt(e.target.value) }))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={generateEmbedCode}
            disabled={!url.trim()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: !url.trim() ? 'var(--bg-tertiary)' : 'var(--accent)',
              color: !url.trim() ? 'var(--text-secondary)' : 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '500',
              cursor: !url.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            <FontAwesomeIcon icon="fas fa-code" />
            Generate Embed Code
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

        {/* Generated Embed Code */}
        {embedCode && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--text-primary)' }}>Generated Embed Code:</h3>
              <button
                onClick={() => copyToClipboard(embedCode)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-copy" />
                Copy Code
              </button>
            </div>
            
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1rem',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              overflow: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {embedCode}
            </div>
          </div>
        )}

        {/* Preview */}
        {embedCode && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Preview:</h3>
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div dangerouslySetInnerHTML={{ __html: embedCode }} />
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
          About YouTube Embed Code Generation & Web Development
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What YouTube URL formats are supported by the embed generator?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We support all common YouTube URL formats including youtube.com/watch?v=, youtu.be/, 
              youtube.com/embed/, and youtube.com/v/. The tool automatically extracts the video ID 
              from any of these formats and generates the appropriate embed code. This ensures 
              compatibility with URLs copied from different sources and makes the tool user-friendly 
              for all types of YouTube content sharing scenarios.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What embed options and customizations are available?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              You can customize autoplay, loop, mute, controls visibility, related videos, 
              start/end times, dimensions, and branding. Each option is clearly explained and 
              can be toggled on/off as needed. Additional features include: size presets for 
              common use cases, custom dimension sliders, time range selection, and live preview 
              functionality. These options help you create embed codes that perfectly match your 
              website's design and user experience requirements.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I use the generated embed code in my website?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Simply copy the generated HTML code and paste it into your website, blog, or 
              content management system. The code is ready to use and includes all necessary 
              attributes for proper embedding. For responsive design, wrap the iframe in a 
              container with CSS that maintains aspect ratio. The generated code includes 
              proper iframe attributes, accessibility features, and security permissions 
              required for modern web browsers.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the size presets and when should I use them?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Size presets provide common dimensions for different use cases: Standard (560×315) 
              for general embedding, Large (640×360) for prominent displays, HD (1280×720) for 
              high-quality display, Square (400×400) for social media layouts, Wide (800×450) 
              for widescreen formats, and Mobile (320×180) for mobile-optimized layouts. Choose 
              presets based on your content layout, target audience, and device compatibility 
              requirements. Custom dimensions can be set using the sliders for specific needs.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I preview the embed before using it on my website?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes! The tool includes a live preview that shows exactly how your embedded video 
              will look and behave with your chosen settings. This helps you verify everything 
              works as expected before copying the code. The preview updates in real-time as 
              you adjust settings, allowing you to fine-tune the appearance and behavior until 
              it matches your requirements perfectly.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best practices for embedding YouTube videos?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Use appropriate dimensions for your layout, enable controls for better user experience, 
              consider autoplay carefully (it can be annoying and affect page load times), use 
              start/end times to highlight specific content, test on different devices to ensure 
              responsiveness, and consider using lazy loading for better performance. Always 
              respect YouTube's terms of service and ensure your embedded content complies with 
              copyright and content policies.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I make embedded videos responsive on mobile devices?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              For responsive design, wrap the iframe in a container with CSS that maintains aspect 
              ratio. Use CSS techniques like aspect-ratio property or padding-bottom percentage 
              method. The tool generates standard iframe code that can be made responsive with 
              additional CSS. Consider using the Mobile preset (320×180) for mobile-optimized layouts 
              or implement CSS media queries to adjust dimensions based on screen size.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the performance considerations for embedded videos?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Embedded videos can impact page load times and performance. Consider: using lazy 
              loading to defer video loading until needed, limiting the number of embedded videos 
              per page, using appropriate dimensions to avoid oversized embeds, enabling autoplay 
              only when necessary, and implementing proper caching strategies. Monitor your 
              website's performance metrics to ensure embedded videos don't negatively affect 
              user experience or SEO rankings.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I handle video privacy and restricted content?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Respect video privacy settings and content restrictions. Some videos may not be 
              embeddable due to privacy settings, geographic restrictions, or content policies. 
              Always test your embed codes to ensure they work properly. If a video cannot be 
              embedded, consider using alternative methods like linking to the video or using 
              YouTube's official sharing options. Be aware of copyright issues and ensure you 
              have permission to embed the content.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the accessibility considerations for embedded videos?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Ensure embedded videos are accessible by: providing descriptive titles, enabling 
              captions when available, using proper iframe attributes, ensuring keyboard navigation 
              works, and providing alternative content for users who cannot access videos. The 
              generated embed code includes proper iframe attributes for accessibility, but you 
              should also consider adding captions, transcripts, or alternative content to make 
              your embedded videos fully accessible to all users.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I optimize embedded videos for SEO?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Optimize embedded videos for SEO by: using descriptive titles and alt text, 
              providing relevant context around the video, ensuring fast loading times, using 
              proper schema markup, and creating engaging thumbnails. While embedded videos 
              don't directly impact SEO rankings, they can improve user engagement and time 
              on page, which are positive ranking factors. Focus on creating valuable content 
              that complements your embedded videos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeEmbedGenerator
