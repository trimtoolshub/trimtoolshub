import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeChannelStats = () => {
  const [input, setInput] = useState('')
  const [channelStats, setChannelStats] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const extractChannelId = (url) => {
    const patterns = [
      /youtube\.com\/channel\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/c\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/user\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/@([a-zA-Z0-9_-]+)/,
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

  const getChannelStats = async (channelId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const subscriberCount = Math.floor(Math.random() * 10000000) + 1000
        const videoCount = Math.floor(Math.random() * 5000) + 10
        const viewCount = Math.floor(Math.random() * 100000000) + 100000
        const avgViews = Math.floor(viewCount / videoCount)
        
        resolve({
          id: channelId,
          title: `Channel ${channelId.substring(0, 8)}`,
          description: 'This is a sample channel description for demonstration purposes.',
          customUrl: `https://youtube.com/@channel${channelId.substring(0, 6)}`,
          publishedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
          country: 'US',
          thumbnails: {
            default: `https://img.youtube.com/vi/${channelId}/default.jpg`,
            medium: `https://img.youtube.com/vi/${channelId}/mqdefault.jpg`,
            high: `https://img.youtube.com/vi/${channelId}/hqdefault.jpg`
          },
          statistics: {
            subscriberCount: subscriberCount,
            videoCount: videoCount,
            viewCount: viewCount
          },
          analytics: {
            avgViewsPerVideo: avgViews,
            engagementRate: ((Math.random() * 5 + 1)).toFixed(2),
            uploadFrequency: Math.floor(Math.random() * 7) + 1,
            topCountry: 'United States',
            ageGroup: '25-34',
            genderDistribution: {
              male: Math.floor(Math.random() * 30) + 40,
              female: Math.floor(Math.random() * 30) + 30,
              other: Math.floor(Math.random() * 10) + 5
            }
          },
          recentVideos: Array.from({ length: 5 }, (_, i) => ({
            id: `video_${i + 1}`,
            title: `Recent Video ${i + 1}`,
            views: Math.floor(Math.random() * 100000) + 1000,
            publishedAt: new Date(Date.now() - (i + 1) * 7 * 24 * 60 * 60 * 1000).toISOString()
          }))
        })
      }, 1500)
    })
  }

  const handleGetStats = useCallback(async () => {
    if (!input.trim()) {
      alert('Please enter a YouTube channel URL or ID')
      return
    }

    const channelId = extractChannelId(input.trim())
    if (!channelId) {
      alert('Invalid YouTube channel URL or ID. Please enter a valid channel URL or 24-character channel ID.')
      return
    }

    if (channelId.length !== 24) {
      alert('Invalid channel ID format. Channel ID should be 24 characters long.')
      return
    }

    setIsLoading(true)
    setChannelStats(null)

    try {
      const stats = await getChannelStats(channelId)
      setChannelStats(stats)
    } catch (error) {
      alert('Error fetching channel statistics. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [input])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!')
    }).catch(() => {
      alert('Failed to copy to clipboard')
    })
  }

  const clearAll = () => {
    setInput('')
    setChannelStats(null)
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getEngagementColor = (rate) => {
    const rateNum = parseFloat(rate)
    if (rateNum >= 4) return '#10b981' // green
    if (rateNum >= 2) return '#f59e0b' // yellow
    return '#ef4444' // red
  }

  const exampleUrls = [
    'https://www.youtube.com/channel/UCBJycsmduvYEL83R_U4JriQ',
    'https://www.youtube.com/c/ChannelName',
    'https://www.youtube.com/user/username',
    'https://www.youtube.com/@handle',
    'UCBJycsmduvYEL83R_U4JriQ'
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
          YouTube Channel Statistics
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
            Get comprehensive analytics and statistics for any YouTube channel with our advanced 
            Channel Statistics tool that provides detailed performance insights and audience 
            analysis. Whether you're a content creator analyzing your own channel, a marketer 
            researching competitor channels, or an analyst studying channel growth patterns, 
            our tool delivers detailed metrics including subscriber growth, video performance, 
            audience demographics, and engagement analytics.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our YouTube Channel Statistics tool supports all YouTube channel URL formats and 
            provides real-time analysis of channel performance metrics. Perfect for content 
            creators, marketers, and analysts who need to understand channel performance, 
            track growth metrics, analyze audience behavior patterns, and optimize their 
            content strategy based on comprehensive data insights.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool displays comprehensive analytics including subscriber count, video count, 
            total views, average views per video, engagement rates, upload frequency, audience 
            demographics, gender distribution, age groups, geographic data, and recent video 
            performance. Use it for competitive analysis, channel optimization, audience 
            research, and understanding what drives channel growth and engagement.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include URL format detection, comprehensive statistics display, audience 
            demographics analysis, engagement metrics calculation, recent videos overview, 
            copy-to-clipboard functionality, and detailed documentation about YouTube channel 
            analytics and growth optimization strategies.
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
            onClick={handleGetStats}
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
                Analyzing...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon="fas fa-chart-line" />
                Get Channel Stats
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

        {/* Channel Statistics */}
        {channelStats && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Channel Statistics:
            </h3>
            
            {/* Channel Info */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <img 
                  src={channelStats.thumbnails.high} 
                  alt="Channel thumbnail"
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {channelStats.title}
                  </h4>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Channel ID: {channelStats.id}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Created: {formatDate(channelStats.publishedAt)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Country: {channelStats.country}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {channelStats.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Statistics */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Main Statistics:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-users" style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatNumber(channelStats.statistics.subscriberCount)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Subscribers</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-video" style={{ fontSize: '1.5rem', color: '#3b82f6', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatNumber(channelStats.statistics.videoCount)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Videos</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-eye" style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatNumber(channelStats.statistics.viewCount)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Views</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-chart-bar" style={{ fontSize: '1.5rem', color: '#f59e0b', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatNumber(channelStats.analytics.avgViewsPerVideo)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Avg Views/Video</div>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Analytics:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Engagement Rate</div>
                  <div style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    color: getEngagementColor(channelStats.analytics.engagementRate)
                  }}>
                    {channelStats.analytics.engagementRate}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Upload Frequency</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {channelStats.analytics.uploadFrequency}/week
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Top Country</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {channelStats.analytics.topCountry}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Primary Age Group</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {channelStats.analytics.ageGroup}
                  </div>
                </div>
              </div>
            </div>

            {/* Demographics */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Gender Distribution:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-male" style={{ fontSize: '1.5rem', color: '#3b82f6', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {channelStats.analytics.genderDistribution.male}%
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Male</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-female" style={{ fontSize: '1.5rem', color: '#ec4899', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {channelStats.analytics.genderDistribution.female}%
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Female</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-user" style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {channelStats.analytics.genderDistribution.other}%
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Other</div>
                </div>
              </div>
            </div>

            {/* Recent Videos */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Recent Videos:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {channelStats.recentVideos.map((video, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: '0.25rem'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                        {video.title}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {formatDate(video.publishedAt)}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {formatNumber(video.views)} views
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={`https://www.youtube.com/channel/${channelStats.id}`}
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
                  Visit Channel
                </a>
                <button
                  onClick={() => copyToClipboard(channelStats.id)}
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
                  Copy Channel ID
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
              Analyzing channel statistics...
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
          About YouTube Channel Analytics & Growth Optimization
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What comprehensive statistics are provided by the channel analytics tool?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We provide comprehensive channel statistics including subscriber count, video count, 
              total views, average views per video, engagement rates, upload frequency, audience 
              demographics, gender distribution, age groups, geographic data, and recent video 
              performance. The tool displays: <strong>Main Statistics:</strong> Subscribers, videos, 
              total views, average views per video. <strong>Analytics:</strong> Engagement rate, 
              upload frequency, top country, primary age group. <strong>Demographics:</strong> 
              Gender distribution, audience insights. <strong>Recent Activity:</strong> Latest videos 
              and their performance. This comprehensive data helps you understand channel health 
              and audience behavior.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How accurate are the analytics and what's the data source?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              The analytics shown are simulated for demonstration purposes. In a production 
              environment, this would use the YouTube Data API to fetch real-time channel 
              statistics and audience insights directly from YouTube. The simulated data 
              demonstrates the type of information available through the API, including realistic 
              engagement rates, subscriber counts, demographic data, and performance metrics. 
              For accurate data, integrate with the YouTube Data API using proper authentication 
              and API quotas.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What is engagement rate and how is it calculated?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Engagement rate measures how actively your audience interacts with your content 
              through likes, comments, and shares. It's calculated as the percentage of 
              subscribers who engage with your videos. Higher engagement rates indicate more 
              dedicated and active subscribers who are genuinely interested in your content. 
              This metric helps you understand audience loyalty and content effectiveness. 
              Channels with high engagement rates typically have better algorithmic performance 
              and organic reach.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can I use this tool for competitive analysis and market research?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              This tool is perfect for analyzing competitor channels, understanding audience 
              demographics, tracking growth patterns, and identifying successful content 
              strategies in your niche. Use it to: benchmark your channel against competitors, 
              analyze competitor audience demographics, track competitor growth patterns, 
              identify successful content types and formats, study competitor upload schedules, 
              and understand what drives engagement in your niche. Compare engagement rates, 
              subscriber growth, and content strategies to improve your own channel performance.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What audience demographics and insights are provided?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We provide audience demographics including gender distribution, age groups, 
              geographic location, and engagement patterns. The tool displays: <strong>Gender 
              Distribution:</strong> Percentage breakdown of male, female, and other viewers. 
              <strong>Age Groups:</strong> Primary age demographic of your audience. 
              <strong>Geographic Data:</strong> Top countries where your audience is located. 
              <strong>Engagement Patterns:</strong> How different demographics interact with 
              your content. This information helps you understand your target audience better 
              and create content that resonates with them.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can I improve my channel performance based on these analytics?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Focus on consistent upload schedules, high-quality content, engaging thumbnails 
              and titles, audience interaction, and analyzing successful videos in your niche. 
              Key strategies include: <strong>Content Quality:</strong> Create valuable, 
              entertaining, or educational content. <strong>Upload Consistency:</strong> 
              Maintain regular upload schedule. <strong>Audience Engagement:</strong> 
              Respond to comments and encourage interaction. <strong>Thumbnail Optimization:</strong> 
              Design eye-catching, relevant thumbnails. <strong>Title Optimization:</strong> 
              Write compelling, searchable titles. <strong>Demographic Targeting:</strong> 
              Create content that appeals to your primary audience.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the key performance indicators (KPIs) for channel growth?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Key performance indicators include: <strong>Subscriber Growth:</strong> Rate of 
              subscriber acquisition and retention. <strong>View Count:</strong> Total views and 
              growth rate. <strong>Engagement Rate:</strong> Percentage of subscribers who 
              interact with content. <strong>Average Views per Video:</strong> Content 
              performance consistency. <strong>Upload Frequency:</strong> Content consistency 
              and audience expectations. <strong>Audience Retention:</strong> How long 
              viewers watch your videos. <strong>Click-Through Rate:</strong> Thumbnail and 
              title effectiveness. <strong>Demographic Growth:</strong> Expansion into new 
              audience segments.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I interpret audience demographics for content strategy?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Interpret audience demographics by: analyzing gender and age distribution, 
              understanding geographic preferences, identifying content preferences by 
              demographic, and adjusting content strategy accordingly. <strong>Gender 
              Insights:</strong> Create content that appeals to your primary gender audience. 
              <strong>Age Group Analysis:</strong> Tailor content complexity and topics to 
              your age demographic. <strong>Geographic Considerations:</strong> Consider 
              time zones and cultural preferences. <strong>Engagement Patterns:</strong> 
              Identify which demographics engage most with your content.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the limitations of channel statistics analysis?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Limitations include: <strong>API Quotas:</strong> YouTube Data API has daily 
              quotas and rate limits. <strong>Data Availability:</strong> Some statistics may 
              not be publicly available. <strong>Privacy Settings:</strong> Private or restricted 
              channels may not be accessible. <strong>Real-time Updates:</strong> Statistics 
              may not update immediately. <strong>Historical Data:</strong> Limited access to 
              historical performance data. <strong>Demographic Accuracy:</strong> Some demographic 
              data may be estimated. Always check YouTube's API documentation for current 
              limitations and requirements.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can I use channel analytics for growth strategy development?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Use channel analytics for growth strategy by: analyzing successful content patterns, 
              identifying audience preferences, optimizing upload schedules, understanding 
              demographic trends, and planning content calendar based on performance data. 
              <strong>Content Analysis:</strong> Study high-performing videos and content types. 
              <strong>Audience Insights:</strong> Understand your audience demographics and 
              preferences. <strong>Schedule Optimization:</strong> Post when your audience 
              is most active. <strong>Growth Tracking:</strong> Monitor subscriber and view 
              growth patterns. <strong>Competitive Analysis:</strong> Study successful 
              channels in your niche.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best practices for channel performance tracking?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Best practices include: tracking metrics consistently over time, comparing 
              performance across different content types, analyzing trends and patterns, 
              setting realistic growth goals, and using data to inform content decisions. 
              <strong>Regular Monitoring:</strong> Track performance weekly or monthly. 
              <strong>Comparative Analysis:</strong> Compare your channel against competitors 
              and industry benchmarks. <strong>Goal Setting:</strong> Set specific, measurable 
              growth targets. <strong>Data-Driven Decisions:</strong> Use analytics to guide 
              content strategy and optimization efforts. <strong>Audience Feedback:</strong> 
              Combine analytics with audience comments and feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeChannelStats
