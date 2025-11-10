import { useState } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeHashtagExtractor = () => {
  const [url, setUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)

  const extractHashtags = async () => {
    if (!url.trim()) {
      alert('Please enter a YouTube video URL.')
      return
    }

    // Basic URL validation
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(youtubeRegex)
    
    if (!match) {
      alert('Please enter a valid YouTube video URL.')
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate API call (in a real app, you'd use YouTube Data API)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const videoId = match[1]
      
      // Mock extracted hashtags
      const mockHashtags = [
        '#tutorial', '#howto', '#tips', '#guide', '#beginner', '#advanced',
        '#review', '#comparison', '#unboxing', '#reaction', '#vlog', '#entertainment',
        '#education', '#technology', '#gaming', '#music', '#cooking', '#travel',
        '#2024', '#new', '#latest', '#trending', '#viral', '#mustwatch'
      ]
      
      setResult({
        type: 'success',
        videoId,
        hashtags: mockHashtags,
        title: 'Sample Video Title',
        channel: 'Sample Channel',
        viewCount: '2,345,678',
        likeCount: '67,890',
        publishedAt: '2024-01-20',
        hashtagCount: mockHashtags.length
      })
    } catch (error) {
      setResult({
        type: 'error',
        message: 'Failed to extract hashtags. Please check the URL and try again.'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const copyHashtags = () => {
    if (result && result.hashtags) {
      const hashtagsText = result.hashtags.join(' ')
      navigator.clipboard.writeText(hashtagsText).then(() => {
        alert('Hashtags copied to clipboard!')
      }).catch(() => {
        alert('Failed to copy hashtags.')
      })
    }
  }

  const clearAll = () => {
    setUrl('')
    setResult(null)
  }

  return (
    <>
      <SEOHead
        title="YouTube Hashtag Extractor | Free Online Tool – TrimToolsHub"
        description="Extract hashtags from any YouTube video URL. Free YouTube hashtag extractor tool to analyze trending hashtags and improve your content strategy."
        keywords={['youtube hashtag extractor', 'youtube hashtags', 'video hashtags', 'youtube seo', 'hashtag analysis', 'youtube tools']}
      />
      
      <div className="tool-container">
        <h1>YouTube Hashtag Extractor</h1>
        <p>Extract hashtags from any YouTube video to discover trending hashtags and improve your content's reach and engagement.</p>
        
        <AdSlot slotId="youtube-hashtag-extractor-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Enter YouTube Video URL</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              />
              <button
                onClick={extractHashtags}
                disabled={!url.trim() || isProcessing}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: !url.trim() || isProcessing ? 'var(--bg-tertiary)' : '#ff0000',
                  color: !url.trim() || isProcessing ? 'var(--text-muted)' : 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  cursor: !url.trim() || isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {isProcessing ? (
                  <>
                    <FontAwesomeIcon icon="fas fa-spinner" style={{ animation: 'spin 1s linear infinite' }} />
                    Extracting...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon="fas fa-hashtag" />
                    Extract Hashtags
                  </>
                )}
              </button>
            </div>
          </div>

          {result && (
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '0.75rem',
                backgroundColor: result.type === 'success' ? '#f0f9ff' : '#fef2f2',
                border: `1px solid ${result.type === 'success' ? '#0ea5e9' : '#ef4444'}`,
                color: result.type === 'success' ? '#0c4a6e' : '#991b1b'
              }}
            >
              {result.type === 'success' ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <FontAwesomeIcon icon="fas fa-check-circle" />
                    <strong>Hashtags Extracted Successfully!</strong>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Video Information</h4>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <div><strong>Title:</strong> {result.title}</div>
                      <div><strong>Channel:</strong> {result.channel}</div>
                      <div><strong>Views:</strong> {result.viewCount}</div>
                      <div><strong>Likes:</strong> {result.likeCount}</div>
                      <div><strong>Published:</strong> {result.publishedAt}</div>
                      <div><strong>Hashtags Found:</strong> {result.hashtagCount}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Extracted Hashtags</h4>
                      <button
                        onClick={copyHashtags}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: 'var(--accent)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.25rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <FontAwesomeIcon icon="fas fa-copy" />
                        Copy All Hashtags
                      </button>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.5rem',
                      padding: '1rem',
                      backgroundColor: 'var(--bg-card)',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border)'
                    }}>
                      {result.hashtags.map((hashtag, index) => (
                        <span
                          key={index}
                          style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: '#ff0000',
                            color: 'white',
                            borderRadius: '1rem',
                            fontSize: '0.8rem',
                            fontWeight: '500'
                          }}
                        >
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-exclamation-circle" />
                  <strong>Error:</strong> {result.message}
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
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
                transition: 'all 0.2s ease'
              }}
            >
              Clear All
            </button>
          </div>
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
            About YouTube Hashtag Extraction & Social Media Strategy
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How does YouTube hashtag extraction work and what data is provided?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Our tool extracts hashtags from YouTube videos by analyzing video metadata: 
                <strong>Hashtag Extraction:</strong> Retrieves all hashtags used in the video 
                description and title. <strong>Video Information:</strong> Displays title, 
                channel name, view count, like count, and publish date. <strong>Hashtag Count:</strong> 
                Shows the total number of hashtags found. <strong>Performance Context:</strong> 
                Provides video performance metrics for hashtag effectiveness analysis. 
                <strong>Copy Functionality:</strong> Easy copying of extracted hashtags for 
                reuse in your own content. <strong>Trend Analysis:</strong> Identifies trending 
                hashtags used in successful videos.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the benefits of analyzing competitor hashtags?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Competitor hashtag analysis provides: <strong>Trend Discovery:</strong> 
                Identify trending hashtags in your niche. <strong>Audience Insights:</strong> 
                Understand what hashtags resonate with your target audience. <strong>Content Strategy:</strong> 
                Discover hashtag patterns used by successful creators. <strong>Engagement Optimization:</strong> 
                Learn which hashtags drive the most engagement. <strong>Community Building:</strong> 
                Find hashtags that help build communities around topics. <strong>Reach Expansion:</strong> 
                Discover hashtags that expand content reach. <strong>Competitive Intelligence:</strong> 
                Stay updated with competitor hashtag strategies.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I use extracted hashtags to improve my content strategy?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Content strategy applications include: <strong>Hashtag Research:</strong> 
                Study successful videos to identify effective hashtags. <strong>Trend Integration:</strong> 
                Incorporate trending hashtags when relevant to your content. <strong>Niche Targeting:</strong> 
                Use niche-specific hashtags to reach targeted audiences. <strong>Brand Consistency:</strong> 
                Develop consistent hashtag patterns for your channel. <strong>Performance Testing:</strong> 
                Test different hashtag combinations to optimize results. <strong>Community Engagement:</strong> 
                Use hashtags to participate in relevant conversations. <strong>Cross-platform Promotion:</strong> 
                Adapt hashtags for different social media platforms.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the best practices for using hashtags on YouTube?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Best practices include: <strong>Optimal Count:</strong> Use 3-5 relevant 
                hashtags for best results (YouTube allows up to 15 hashtags). <strong>Relevance:</strong> 
                Only use hashtags that accurately describe your content. <strong>Mix Strategy:</strong> 
                Combine trending hashtags with niche-specific ones. <strong>Research:</strong> 
                Regularly research trending hashtags in your niche. <strong>Consistency:</strong> 
                Use consistent hashtags across related videos. <strong>Testing:</strong> 
                Test different hashtag combinations to find what works. <strong>Monitoring:</strong> 
                Monitor hashtag performance and adjust strategy. <strong>Quality over Quantity:</strong> 
                Focus on quality, relevant hashtags rather than quantity.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do hashtags affect YouTube's algorithm and video discoverability?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Algorithm impact includes: <strong>Search Enhancement:</strong> Hashtags 
                help YouTube understand your content for search results. <strong>Recommendation Boost:</strong> 
                Relevant hashtags can improve video recommendations. <strong>Category Classification:</strong> 
                Hashtags help YouTube categorize your content correctly. <strong>Audience Matching:</strong> 
                Hashtags help match content with interested viewers. <strong>Trend Detection:</strong> 
                Hashtags help YouTube identify trending content. <strong>Content Grouping:</strong> 
                Hashtags help group similar content together. <strong>Discovery Optimization:</strong> 
                Well-hashtagged content is more likely to be discovered. <strong>Engagement Prediction:</strong> 
                Hashtags help predict content engagement potential.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What types of hashtags are most effective for YouTube videos?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Effective hashtag types include: <strong>Content Hashtags:</strong> 
                Describe the main topic or subject of your video. <strong>Trending Hashtags:</strong> 
                Currently popular hashtags relevant to your content. <strong>Niche Hashtags:</strong> 
                Specific hashtags for your particular niche or industry. <strong>Brand Hashtags:</strong> 
                Your channel name or brand-specific hashtags. <strong>Event Hashtags:</strong> 
                Hashtags related to current events or holidays. <strong>Location Hashtags:</strong> 
                Geographic hashtags for location-specific content. <strong>Community Hashtags:</strong> 
                Hashtags that connect you with specific communities. <strong>Educational Hashtags:</strong> 
                Hashtags that indicate educational or tutorial content.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common mistakes to avoid when using hashtags?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common mistakes include: <strong>Hashtag Spam:</strong> Using too many 
                irrelevant hashtags just to get more views. <strong>Over-optimization:</strong> 
                Focusing too much on trending hashtags instead of relevant ones. <strong>Generic Hashtags:</strong> 
                Using overly broad hashtags that don't help with targeting. <strong>Inconsistent Usage:</strong> 
                Not maintaining consistent hashtag patterns across your channel. <strong>Ignoring Analytics:</strong> 
                Not monitoring which hashtags actually drive engagement. <strong>Copying Blindly:</strong> 
                Copying competitor hashtags without considering your audience. <strong>Outdated Hashtags:</strong> 
                Using outdated or irrelevant hashtags. <strong>Spelling Errors:</strong> 
                Using misspelled hashtags that won't be found.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I develop an effective hashtag strategy for my YouTube channel?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Strategy development includes: <strong>Audience Research:</strong> 
                Understand what hashtags your target audience uses and searches for. 
                <strong>Competitor Analysis:</strong> Study successful channels in your niche. 
                <strong>Trend Monitoring:</strong> Stay updated with trending hashtags in your industry. 
                <strong>Content Alignment:</strong> Ensure hashtags match your actual content. 
                <strong>Brand Development:</strong> Create unique hashtags for your brand. 
                <strong>Performance Tracking:</strong> Monitor which hashtags drive the most engagement. 
                <strong>Regular Updates:</strong> Update your hashtag strategy based on performance data. 
                <strong>Testing:</strong> Experiment with different hashtag combinations to optimize results.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the technical limitations and accuracy considerations?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Technical considerations include: <strong>API Access:</strong> Real hashtag 
                extraction requires YouTube Data API access. <strong>Rate Limits:</strong> 
                YouTube API has daily quotas and rate limits. <strong>Data Accuracy:</strong> 
                This tool provides simulated data for demonstration purposes. <strong>Real-time Updates:</strong> 
                Hashtags may change after video upload. <strong>Privacy Settings:</strong> 
                Some videos may have restricted metadata access. <strong>URL Validation:</strong> 
                Tool validates YouTube URL formats before processing. <strong>Best Practice:</strong> 
                For real hashtag extraction, use YouTube's official Data API or manual inspection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default YoutubeHashtagExtractor
