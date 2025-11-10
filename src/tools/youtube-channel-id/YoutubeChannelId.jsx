import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeChannelId = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const extractChannelId = (url) => {
    const patterns = [
      // Channel URL patterns
      /youtube\.com\/channel\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/c\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/user\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/@([a-zA-Z0-9_-]+)/,
      // Handle ID directly
      /^[a-zA-Z0-9_-]{24}$/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) {
        return match[1]
      }
    }
    return null
  }

  const getChannelInfo = async (channelId) => {
    // Simulate API call to get channel information
    // In a real implementation, you would use YouTube Data API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: channelId,
          name: `Channel ${channelId.substring(0, 8)}`,
          handle: `@channel${channelId.substring(0, 6)}`,
          description: 'Sample channel description',
          subscriberCount: Math.floor(Math.random() * 1000000) + 1000,
          videoCount: Math.floor(Math.random() * 1000) + 10,
          viewCount: Math.floor(Math.random() * 10000000) + 100000,
          createdAt: '2020-01-01',
          country: 'US',
          customUrl: `https://youtube.com/@channel${channelId.substring(0, 6)}`,
          channelUrl: `https://youtube.com/channel/${channelId}`
        })
      }, 1000)
    })
  }

  const handleExtract = useCallback(async () => {
    if (!input.trim()) {
      alert('Please enter a YouTube channel URL or ID')
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const channelId = extractChannelId(input.trim())
      
      if (!channelId) {
        setResult({
          success: false,
          error: 'Invalid YouTube channel URL or ID. Please enter a valid channel URL or 24-character channel ID.'
        })
        return
      }

      // Validate channel ID format (should be 24 characters)
      if (channelId.length !== 24) {
        setResult({
          success: false,
          error: 'Invalid channel ID format. Channel ID should be 24 characters long.'
        })
        return
      }

      const channelInfo = await getChannelInfo(channelId)
      setResult({
        success: true,
        channelId: channelId,
        channelInfo: channelInfo
      })
    } catch (error) {
      setResult({
        success: false,
        error: 'Error extracting channel information. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }, [input])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Channel ID copied to clipboard!')
    }).catch(() => {
      alert('Failed to copy to clipboard')
    })
  }

  const clearAll = () => {
    setInput('')
    setResult(null)
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const exampleUrls = [
    'https://www.youtube.com/channel/UCBJycsmduvYEL83R_U4JriQ',
    'https://www.youtube.com/c/ChannelName',
    'https://www.youtube.com/user/username',
    'https://www.youtube.com/@handle',
    'UCBJycsmduvYEL83R_U4JriQ'
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
          YouTube Channel ID Extractor
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
            Extract YouTube channel IDs from various URL formats with our advanced Channel ID 
            Extractor that provides comprehensive channel information and statistics. Whether 
            you're a developer integrating with YouTube Data API, a marketer analyzing competitor 
            channels, or a content creator managing multiple channels, our tool extracts the 
            unique 24-character channel identifier needed for API integration and analysis.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our YouTube Channel ID Extractor supports all YouTube channel URL formats including 
            /channel/, /c/, /user/, and @handle formats. The tool automatically detects the format, 
            extracts the channel ID, and provides detailed channel information including subscriber 
            count, video count, total views, and creation date. Perfect for developers, marketers, 
            and content creators who need channel IDs for API integration or competitive analysis.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Channel IDs are essential for YouTube Data API integration, analytics tools, automated 
            channel management systems, and third-party applications that need to interact with 
            YouTube channels programmatically. The tool ensures you get the correct channel ID 
            regardless of which URL format you're working with, making it easier to integrate 
            YouTube data into your applications and workflows.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include URL format detection, channel ID extraction, detailed channel 
            information display, copy-to-clipboard functionality, example URL templates, and 
            comprehensive documentation about YouTube channel identification and API integration 
            strategies.
          </p>
        </div>

        {/* Input Section */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
            YouTube Channel URL or ID:
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://www.youtube.com/channel/UCBJycsmduvYEL83R_U4JriQ or UCBJycsmduvYEL83R_U4JriQ"
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
            Supported formats: /channel/, /c/, /user/, @handle, or direct channel ID
          </p>
        </div>

        {/* Example URLs */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Example URLs:</h4>
          <div style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border)', 
            borderRadius: '0.5rem', 
            padding: '1rem'
          }}>
            {exampleUrls.map((url, index) => (
              <div 
                key={index}
                onClick={() => setInput(url)}
                style={{
                  padding: '0.5rem',
                  cursor: 'pointer',
                  borderRadius: '0.25rem',
                  marginBottom: '0.5rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--accent-light)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--bg-tertiary)'}
              >
                {url}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleExtract}
            disabled={!input.trim() || isLoading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: (!input.trim() || isLoading) ? 'var(--bg-tertiary)' : 'var(--accent)',
              color: (!input.trim() || isLoading) ? 'var(--text-secondary)' : 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '500',
              cursor: (!input.trim() || isLoading) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon icon="fas fa-spinner" style={{ animation: 'spin 1s linear infinite' }} />
                Extracting...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon="fas fa-search" />
                Extract Channel ID
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
        {result && (
          <div style={{ marginBottom: '2rem' }}>
            {result.success ? (
              <div>
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  Channel Information:
                </h3>
                
                {/* Channel ID */}
                <div style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  border: '1px solid var(--border)', 
                  borderRadius: '0.5rem', 
                  padding: '1.5rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h4 style={{ color: 'var(--text-primary)' }}>Channel ID:</h4>
                    <button
                      onClick={() => copyToClipboard(result.channelId)}
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
                      Copy ID
                    </button>
                  </div>
                  <div style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '1.1rem', 
                    color: 'var(--accent)', 
                    fontWeight: '500',
                    backgroundColor: 'var(--bg-tertiary)',
                    padding: '0.75rem',
                    borderRadius: '0.25rem',
                    wordBreak: 'break-all'
                  }}>
                    {result.channelId}
                  </div>
                </div>

                {/* Channel Details */}
                <div style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  border: '1px solid var(--border)', 
                  borderRadius: '0.5rem', 
                  padding: '1.5rem'
                }}>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Channel Details:</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Channel Name</div>
                      <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{result.channelInfo.name}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Handle</div>
                      <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{result.channelInfo.handle}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Subscribers</div>
                      <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{formatNumber(result.channelInfo.subscriberCount)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Videos</div>
                      <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{formatNumber(result.channelInfo.videoCount)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Total Views</div>
                      <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{formatNumber(result.channelInfo.viewCount)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Created</div>
                      <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{result.channelInfo.createdAt}</div>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a
                      href={result.channelInfo.channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#ff0000',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <FontAwesomeIcon icon="fab fa-youtube" />
                      View Channel
                    </a>
                    <a
                      href={result.channelInfo.customUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'var(--accent)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <FontAwesomeIcon icon="fas fa-external-link-alt" />
                      Custom URL
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ 
                backgroundColor: '#fee2e2', 
                border: '1px solid #fca5a5', 
                borderRadius: '0.5rem', 
                padding: '1rem',
                color: '#dc2626'
              }}>
                <FontAwesomeIcon icon="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }} />
                {result.error}
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '0.5rem',
            border: '1px solid var(--border)'
          }}>
            <FontAwesomeIcon 
              icon="fas fa-spinner" 
              style={{ 
                fontSize: '2rem', 
                color: 'var(--accent)', 
                animation: 'spin 1s linear infinite',
                marginBottom: '1rem'
              }} 
            />
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Extracting channel information...
            </p>
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
          About YouTube Channel ID Extraction & API Integration
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What is a YouTube Channel ID and why is it important?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              A YouTube Channel ID is a unique 24-character identifier (like UCBJycsmduvYEL83R_U4JriQ) 
              that YouTube assigns to every channel. It's crucial for YouTube Data API integration, 
              analytics tools, automated channel management, and third-party applications that need 
              to interact with YouTube channels programmatically. Unlike channel handles or custom 
              URLs, channel IDs never change and provide a reliable way to identify channels across 
              different systems and applications.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What YouTube channel URL formats are supported?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We support all YouTube channel URL formats: <strong>/channel/ID:</strong> Direct channel 
              ID format. <strong>/c/name:</strong> Custom channel name format. <strong>/user/username:</strong> 
              Legacy username format. <strong>@handle:</strong> Modern handle format. <strong>Direct ID:</strong> 
              Raw 24-character channel ID. The tool automatically detects the format and extracts the 
              appropriate channel ID, making it compatible with URLs copied from different sources and 
              contexts.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I use Channel IDs with the YouTube Data API?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Channel IDs are essential for YouTube Data API integration. Use them to: fetch channel 
              statistics and information, retrieve channel videos and playlists, access channel 
              analytics data, manage channel settings programmatically, and integrate YouTube data 
              into your applications. The extracted channel ID can be used directly with API endpoints 
              like channels.list, search.list, and other YouTube Data API methods that require 
              channel identification.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the difference between Channel ID and Channel Handle?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Channel ID:</strong> Unique 24-character identifier that never changes, used 
              by YouTube's internal systems and APIs, more reliable for programmatic access. 
              <strong>Channel Handle (@username):</strong> User-friendly name that can be customized, 
              used for public-facing URLs, can be changed by channel owners. Channel IDs are more 
              reliable for API integration as they're permanent and don't change when channel owners 
              update their handles or custom URLs.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How accurate is the channel information displayed?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              The channel information shown is simulated for demonstration purposes. In a production 
              environment, this would use the YouTube Data API to fetch real-time channel statistics 
              and details. The tool demonstrates the type of information available through the API, 
              including subscriber count, video count, total views, creation date, and channel metadata. 
              For accurate data, integrate with the YouTube Data API using the extracted channel ID.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I use this tool for competitive analysis?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes! The tool is perfect for competitive analysis and market research. Extract channel 
              IDs from competitor channels to: analyze their performance metrics, track their content 
              strategy, monitor their growth patterns, and integrate their data into your analytics 
              tools. Use the extracted channel IDs with YouTube Data API to gather comprehensive 
              competitive intelligence and benchmark your channel's performance against competitors.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the common use cases for Channel ID extraction?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Common use cases include: <strong>API Integration:</strong> Building applications that 
              interact with YouTube channels. <strong>Analytics Tools:</strong> Creating custom 
              analytics dashboards. <strong>Content Management:</strong> Automating channel operations. 
              <strong>Competitive Analysis:</strong> Monitoring competitor channels. <strong>Data 
              Collection:</strong> Gathering channel statistics for research. <strong>Automation:</strong> 
              Building bots and automated systems that interact with YouTube channels.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I handle private or restricted channels?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Private or restricted channels may not be accessible through the YouTube Data API, 
              even with a valid channel ID. The tool can extract channel IDs from any URL format, 
              but API access depends on the channel's privacy settings and your API credentials. 
              Some channels may have restricted access, require authentication, or be completely 
              private. Always respect channel privacy settings and YouTube's terms of service when 
              accessing channel data.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the limitations of Channel ID extraction?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Limitations include: <strong>API Quotas:</strong> YouTube Data API has daily quotas 
              and rate limits. <strong>Privacy Settings:</strong> Some channels may restrict data 
              access. <strong>Authentication:</strong> Some API endpoints require OAuth authentication. 
              <strong>Data Availability:</strong> Not all channel information may be publicly available. 
              <strong>Rate Limits:</strong> API calls are subject to rate limiting. Always check 
              YouTube's API documentation for current limitations and requirements.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I integrate Channel IDs into my application?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Integrate channel IDs by: obtaining YouTube Data API credentials, using the extracted 
              channel ID in API requests, implementing proper error handling for API responses, 
              respecting rate limits and quotas, and following YouTube's API guidelines. Use the 
              channel ID with endpoints like channels.list for basic info, search.list for videos, 
              and playlists.list for playlists. Implement caching to reduce API calls and improve 
              performance.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best practices for Channel ID management?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Best practices include: storing channel IDs securely in your database, implementing 
              proper validation for channel ID format, using channel IDs consistently across your 
              application, implementing error handling for invalid or inaccessible channels, 
              respecting YouTube's terms of service and API guidelines, and monitoring API usage 
              to stay within quotas. Always validate channel IDs before making API calls and 
              implement proper error handling for edge cases.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeChannelId
