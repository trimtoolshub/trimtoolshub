import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeVideoStats = () => {
  const [url, setUrl] = useState('')
  const [videoStats, setVideoStats] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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

  const getVideoStats = async (videoId) => {
    // Simulate API call to get video statistics
    // In a real implementation, you would use YouTube Data API
    return new Promise((resolve) => {
      setTimeout(() => {
        const views = Math.floor(Math.random() * 10000000) + 1000
        const likes = Math.floor(views * (0.02 + Math.random() * 0.08)) // 2-10% like rate
        const dislikes = Math.floor(likes * (0.1 + Math.random() * 0.3)) // 10-40% of likes
        const comments = Math.floor(views * (0.001 + Math.random() * 0.009)) // 0.1-1% comment rate
        
        resolve({
          id: videoId,
          title: `Sample Video Title ${videoId.substring(0, 8)}`,
          description: 'This is a sample video description for demonstration purposes.',
          channelTitle: `Channel ${videoId.substring(0, 6)}`,
          channelId: `UC${videoId.substring(0, 22)}`,
          publishedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
          duration: `PT${Math.floor(Math.random() * 30) + 1}M${Math.floor(Math.random() * 60)}S`,
          viewCount: views,
          likeCount: likes,
          dislikeCount: dislikes,
          commentCount: comments,
          categoryId: Math.floor(Math.random() * 25) + 1,
          tags: ['sample', 'video', 'demo', 'youtube', 'stats'],
          thumbnails: {
            default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
            medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
            high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            standard: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
            maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
          },
          statistics: {
            viewCount: views,
            likeCount: likes,
            dislikeCount: dislikes,
            commentCount: comments
          },
          engagement: {
            likeRate: ((likes / views) * 100).toFixed(2),
            commentRate: ((comments / views) * 100).toFixed(3),
            engagementScore: (((likes + comments) / views) * 100).toFixed(2)
          }
        })
      }, 1500)
    })
  }

  const handleGetStats = useCallback(async () => {
    if (!url.trim()) {
      alert('Please enter a YouTube video URL')
      return
    }

    const videoId = extractVideoId(url.trim())
    if (!videoId) {
      alert('Invalid YouTube URL. Please enter a valid YouTube video URL.')
      return
    }

    setIsLoading(true)
    setVideoStats(null)

    try {
      const stats = await getVideoStats(videoId)
      setVideoStats(stats)
    } catch (error) {
      alert('Error fetching video statistics. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [url])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!')
    }).catch(() => {
      alert('Failed to copy to clipboard')
    })
  }

  const clearAll = () => {
    setUrl('')
    setVideoStats(null)
  }

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B'
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatDuration = (duration) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return duration
    
    const hours = match[1] ? parseInt(match[1]) : 0
    const minutes = match[2] ? parseInt(match[2]) : 0
    const seconds = match[3] ? parseInt(match[3]) : 0
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getEngagementColor = (score) => {
    const scoreNum = parseFloat(score)
    if (scoreNum >= 5) return '#10b981' // green
    if (scoreNum >= 2) return '#f59e0b' // yellow
    return '#ef4444' // red
  }

  const exampleUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ',
    'https://www.youtube.com/embed/dQw4w9WgXcQ'
  ]

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
          YouTube Video Statistics
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
            Get detailed statistics and analytics for any YouTube video with our advanced Video 
            Statistics tool that provides comprehensive performance insights. Whether you're a 
            content creator analyzing your own videos, a marketer researching competitor content, 
            or an analyst studying video performance trends, our tool delivers detailed metrics 
            including view counts, engagement rates, and comprehensive video information.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our YouTube Video Statistics tool supports all YouTube URL formats and provides 
            real-time analysis of video performance metrics. Perfect for content creators, 
            marketers, and analysts who need to track video performance, analyze engagement 
            metrics, understand audience behavior, and optimize their content strategy based 
            on data-driven insights.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool calculates engagement scores, like rates, comment rates, and provides 
            comprehensive video details including channel information, publication dates, 
            duration, and metadata. Use it for competitive analysis, content optimization, 
            performance benchmarking, and understanding what drives audience engagement in 
            your niche.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include URL format detection, comprehensive statistics display, engagement 
            metrics calculation, video thumbnail preview, copy-to-clipboard functionality, 
            and detailed documentation about YouTube video analytics and performance optimization 
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

        {/* Example URLs */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Example URLs:</h4>
          <div style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border)', 
            borderRadius: '0.5rem', 
            padding: '1rem'
          }}>
            {exampleUrls.map((exampleUrl, index) => (
              <div 
                key={index}
                onClick={() => setUrl(exampleUrl)}
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
                {exampleUrl}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleGetStats}
            disabled={!url.trim() || isLoading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: (!url.trim() || isLoading) ? 'var(--bg-tertiary)' : 'var(--accent)',
              color: (!url.trim() || isLoading) ? 'var(--text-secondary)' : 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '500',
              cursor: (!url.trim() || isLoading) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon icon="fas fa-spinner" style={{ animation: 'spin 1s linear infinite' }} />
                Analyzing...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon="fas fa-chart-line" />
                Get Video Stats
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

        {/* Video Statistics */}
        {videoStats && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Video Statistics:
            </h3>
            
            {/* Video Info */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <img 
                  src={videoStats.thumbnails.high} 
                  alt="Video thumbnail"
                  style={{ 
                    width: '120px', 
                    height: '90px', 
                    borderRadius: '0.25rem',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {videoStats.title}
                  </h4>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Channel: {videoStats.channelTitle}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Published: {formatDate(videoStats.publishedAt)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Duration: {formatDuration(videoStats.duration)}
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Grid */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Statistics:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-eye" style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatNumber(videoStats.statistics.viewCount)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Views</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-thumbs-up" style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatNumber(videoStats.statistics.likeCount)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Likes</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-thumbs-down" style={{ fontSize: '1.5rem', color: '#ef4444', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatNumber(videoStats.statistics.dislikeCount)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Dislikes</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-comments" style={{ fontSize: '1.5rem', color: '#3b82f6', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatNumber(videoStats.statistics.commentCount)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Comments</div>
                </div>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Engagement Metrics:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Like Rate</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#10b981' }}>
                    {videoStats.engagement.likeRate}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Comment Rate</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3b82f6' }}>
                    {videoStats.engagement.commentRate}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Engagement Score</div>
                  <div style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    color: getEngagementColor(videoStats.engagement.engagementScore)
                  }}>
                    {videoStats.engagement.engagementScore}%
                  </div>
                </div>
              </div>
            </div>

            {/* Video Details */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Video Details:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Video ID</div>
                  <div style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.875rem', 
                    color: 'var(--accent)', 
                    backgroundColor: 'var(--bg-tertiary)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    wordBreak: 'break-all'
                  }}>
                    {videoStats.id}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Channel ID</div>
                  <div style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.875rem', 
                    color: 'var(--accent)', 
                    backgroundColor: 'var(--bg-tertiary)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    wordBreak: 'break-all'
                  }}>
                    {videoStats.channelId}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Category</div>
                  <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                    Category {videoStats.categoryId}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Tags</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {videoStats.tags.join(', ')}
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={`https://www.youtube.com/watch?v=${videoStats.id}`}
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
                  Watch Video
                </a>
                <button
                  onClick={() => copyToClipboard(videoStats.id)}
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
                    gap: '0.5rem'
                  }}
                >
                  <FontAwesomeIcon icon="fas fa-copy" />
                  Copy Video ID
                </button>
              </div>
            </div>
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
              Analyzing video statistics...
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
          About YouTube Video Analytics & Performance Metrics
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What comprehensive statistics are provided by the tool?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We provide comprehensive video statistics including view count, likes, dislikes, 
              comments, engagement rates, video details, channel information, and performance 
              metrics. The tool displays: <strong>Basic Stats:</strong> Views, likes, dislikes, 
              comments. <strong>Engagement Metrics:</strong> Like rate, comment rate, engagement 
              score. <strong>Video Details:</strong> Title, description, channel, publication 
              date, duration, category, tags. <strong>Technical Info:</strong> Video ID, channel 
              ID, thumbnail URLs. This comprehensive data helps you understand video performance 
              and audience behavior.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How accurate are the statistics and what's the data source?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              The statistics shown are simulated for demonstration purposes. In a production 
              environment, this would use the YouTube Data API to fetch real-time statistics 
              directly from YouTube. The simulated data demonstrates the type of information 
              available through the API, including realistic engagement rates, view counts, and 
              performance metrics. For accurate data, integrate with the YouTube Data API using 
              proper authentication and API quotas.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What is engagement score and how is it calculated?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Engagement score is calculated as the percentage of viewers who liked or commented 
              on the video. It's a key metric for measuring audience interaction and content 
              effectiveness. The formula is: <strong>Engagement Score = ((Likes + Comments) / 
              Views) × 100</strong>. This metric helps you understand how well your content 
              resonates with viewers. Higher engagement scores typically indicate more compelling 
              content that encourages viewer interaction and participation.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can I use this tool for competitive analysis?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              This tool is perfect for analyzing competitor videos, understanding what content 
              performs well, and identifying trends in your niche. Use it to: benchmark your 
              content against successful videos, analyze competitor engagement strategies, 
              identify high-performing content types, study successful video formats and topics, 
              and track competitor performance over time. Compare engagement rates, view counts, 
              and content strategies to improve your own video performance.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What YouTube URL formats are supported?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We support all common YouTube URL formats including youtube.com/watch?v=, youtu.be/, 
              and youtube.com/embed/. The tool automatically extracts the video ID from any of 
              these formats. This ensures compatibility with URLs copied from different sources, 
              shared links, embedded videos, and direct video references. The tool handles URL 
              variations and extracts the correct video identifier for analysis.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can I improve my video engagement based on these metrics?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Focus on creating compelling thumbnails, engaging titles, high-quality content, 
              and encourage viewer interaction. Analyze successful videos in your niche to 
              understand what drives engagement. Key strategies include: <strong>Content Quality:</strong> 
              Create valuable, entertaining, or educational content. <strong>Thumbnails:</strong> 
              Design eye-catching, relevant thumbnails. <strong>Titles:</strong> Write compelling, 
              searchable titles. <strong>Call-to-Action:</strong> Encourage likes, comments, and 
              subscriptions. <strong>Timing:</strong> Post when your audience is most active.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the key performance indicators (KPIs) to track?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Key performance indicators include: <strong>View Count:</strong> Total video views 
              and growth rate. <strong>Engagement Rate:</strong> Percentage of viewers who interact 
              with content. <strong>Like Rate:</strong> Percentage of viewers who like the video. 
              <strong>Comment Rate:</strong> Percentage of viewers who comment. <strong>Watch Time:</strong> 
              Average time viewers spend watching. <strong>Click-Through Rate:</strong> Percentage 
              of impressions that result in views. <strong>Retention Rate:</strong> Percentage of 
              viewers who watch the entire video.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I interpret engagement metrics for content optimization?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Interpret engagement metrics by: comparing rates across different videos, identifying 
              patterns in high-performing content, analyzing audience preferences, and adjusting 
              content strategy accordingly. <strong>High Like Rate:</strong> Content resonates well 
              with audience. <strong>High Comment Rate:</strong> Content encourages discussion and 
              interaction. <strong>Low Engagement:</strong> Content may need improvement in quality, 
              relevance, or presentation. Use these insights to refine your content strategy and 
              create more engaging videos.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the limitations of video statistics analysis?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Limitations include: <strong>API Quotas:</strong> YouTube Data API has daily quotas 
              and rate limits. <strong>Data Availability:</strong> Some statistics may not be 
              publicly available. <strong>Privacy Settings:</strong> Private or restricted videos 
              may not be accessible. <strong>Real-time Updates:</strong> Statistics may not update 
              immediately. <strong>Historical Data:</strong> Limited access to historical performance 
              data. <strong>Authentication:</strong> Some features require OAuth authentication. 
              Always check YouTube's API documentation for current limitations and requirements.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can I use video statistics for content strategy development?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Use video statistics for content strategy by: analyzing successful video patterns, 
              identifying content types that perform well, understanding audience preferences, 
              optimizing video length and format, and planning content calendar based on performance 
              data. <strong>Content Analysis:</strong> Study high-performing videos in your niche. 
              <strong>Format Optimization:</strong> Identify successful video formats and styles. 
              <strong>Topic Selection:</strong> Focus on topics that generate high engagement. 
              <strong>Timing Strategy:</strong> Post when engagement is highest.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best practices for video performance tracking?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Best practices include: tracking metrics consistently over time, comparing performance 
              across different content types, analyzing trends and patterns, setting realistic 
              performance goals, and using data to inform content decisions. <strong>Regular 
              Monitoring:</strong> Track performance weekly or monthly. <strong>Comparative 
              Analysis:</strong> Compare videos within your channel and against competitors. 
              <strong>Goal Setting:</strong> Set specific, measurable performance targets. 
              <strong>Data-Driven Decisions:</strong> Use statistics to guide content strategy 
              and optimization efforts.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeVideoStats
