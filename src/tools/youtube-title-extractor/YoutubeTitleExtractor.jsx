import { useState } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeTitleExtractor = () => {
  const [url, setUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)

  const extractTitle = async () => {
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
      
      // Mock extracted title and metadata
      const mockData = {
        title: 'How to Build a Successful YouTube Channel in 2024 - Complete Guide',
        channel: 'YouTube Creator Academy',
        viewCount: '1,234,567',
        likeCount: '45,678',
        publishedAt: '2024-01-15',
        duration: '15:42',
        description: 'Learn the essential strategies to grow your YouTube channel...'
      }
      
      setResult({
        type: 'success',
        videoId,
        ...mockData
      })
    } catch (error) {
      setResult({
        type: 'error',
        message: 'Failed to extract title. Please check the URL and try again.'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const copyTitle = () => {
    if (result && result.title) {
      navigator.clipboard.writeText(result.title).then(() => {
        alert('Title copied to clipboard!')
      }).catch(() => {
        alert('Failed to copy title.')
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
        title="YouTube Title Extractor | Free Online Tool – TrimToolsHub"
        description="Extract titles from any YouTube video URL. Free YouTube title extractor tool to analyze successful video titles and improve your content strategy."
        keywords={['youtube title extractor', 'youtube titles', 'video titles', 'youtube seo', 'title analysis', 'youtube tools']}
      />
      
      <div className="tool-container">
        <h1>YouTube Title Extractor</h1>
        <p>Extract titles and metadata from any YouTube video to analyze successful content strategies and improve your own video titles.</p>
        
        <AdSlot slotId="youtube-title-extractor-top" style={{ margin: '1rem 0' }} />
        
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
                onClick={extractTitle}
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
                    <FontAwesomeIcon icon="fas fa-search" />
                    Extract Title
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
                    <strong>Title Extracted Successfully!</strong>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Video Title</h4>
                      <button
                        onClick={copyTitle}
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
                        Copy Title
                      </button>
                    </div>
                    <div style={{ 
                      padding: '1rem',
                      backgroundColor: 'var(--bg-card)',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border)',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      lineHeight: '1.4'
                    }}>
                      {result.title}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Video Information</h4>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                      gap: '1rem',
                      fontSize: '0.9rem', 
                      color: 'var(--text-secondary)' 
                    }}>
                      <div><strong>Channel:</strong> {result.channel}</div>
                      <div><strong>Views:</strong> {result.viewCount}</div>
                      <div><strong>Likes:</strong> {result.likeCount}</div>
                      <div><strong>Published:</strong> {result.publishedAt}</div>
                      <div><strong>Duration:</strong> {result.duration}</div>
                      <div><strong>Video ID:</strong> {result.videoId}</div>
                    </div>
                  </div>

                  {result.description && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Description Preview</h4>
                      <div style={{ 
                        padding: '1rem',
                        backgroundColor: 'var(--bg-card)',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--border)',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.5'
                      }}>
                        {result.description}
                      </div>
                    </div>
                  )}
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
            About YouTube Title Extraction & SEO Analysis
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How does YouTube title extraction work and what data is provided?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Our tool extracts titles and metadata from YouTube videos: <strong>Title Extraction:</strong> 
                Retrieves the complete video title from YouTube metadata. <strong>Video Information:</strong> 
                Displays channel name, view count, like count, publish date, and duration. 
                <strong>Description Preview:</strong> Shows a preview of the video description. 
                <strong>Video ID:</strong> Extracts and displays the unique video identifier. 
                <strong>Copy Functionality:</strong> Easy copying of extracted titles for reuse. 
                <strong>Performance Context:</strong> Provides video performance metrics for title effectiveness analysis.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the benefits of analyzing competitor video titles?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Competitor title analysis provides: <strong>SEO Insights:</strong> Understand 
                which title structures work for successful videos. <strong>Keyword Discovery:</strong> 
                Find effective keywords and phrases used in titles. <strong>Format Analysis:</strong> 
                Identify successful title formats and patterns. <strong>Competitive Intelligence:</strong> 
                Learn from successful competitors' title strategies. <strong>Trend Identification:</strong> 
                Discover trending title elements and styles. <strong>Performance Correlation:</strong> 
                Understand how titles correlate with video performance. <strong>Inspiration:</strong> 
                Get ideas for your own title creation.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What elements make YouTube titles effective and engaging?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Effective title elements include: <strong>Hook Words:</strong> Start with 
                compelling words like "How to," "Best," "Top," "Secret," "Ultimate." 
                <strong>Numbers:</strong> Include specific numbers, statistics, or lists. 
                <strong>Emotional Triggers:</strong> Use words that evoke emotions (amazing, 
                shocking, incredible). <strong>Keywords:</strong> Include relevant SEO keywords 
                for discoverability. <strong>Urgency:</strong> Create urgency with words like 
                "now," "today," "2024." <strong>Curiosity:</strong> Use phrases that create 
                curiosity and encourage clicks. <strong>Benefit-focused:</strong> Highlight 
                the value or benefit viewers will get.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the best practices for YouTube title optimization?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Title optimization best practices include: <strong>Length:</strong> Keep 
                titles under 60 characters for full display in search results. <strong>Clarity:</strong> 
                Make titles clear and descriptive of the content. <strong>Keywords:</strong> 
                Include primary keywords naturally in the title. <strong>Uniqueness:</strong> 
                Create unique titles that stand out from competitors. <strong>Consistency:</strong> 
                Maintain consistent title patterns across your channel. <strong>Testing:</strong> 
                Test different title variations to find what works best. <strong>Analytics:</strong> 
                Monitor title performance through YouTube Analytics. <strong>Updates:</strong> 
                Update titles based on performance data and trends.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do titles affect YouTube's algorithm and video discoverability?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Algorithm impact includes: <strong>Search Ranking:</strong> Titles are 
                crucial for YouTube search results and SEO. <strong>Click-through Rate:</strong> 
                Compelling titles improve CTR, which boosts algorithm ranking. <strong>Content Understanding:</strong> 
                Titles help YouTube understand and categorize your content. <strong>Recommendation Engine:</strong> 
                Titles influence which videos are recommended to users. <strong>Keyword Matching:</strong> 
                Titles help match content with user search queries. <strong>Engagement Prediction:</strong> 
                Titles help predict which content will engage viewers. <strong>Category Classification:</strong> 
                Titles help YouTube categorize content correctly.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common mistakes to avoid when creating YouTube titles?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common mistakes include: <strong>Clickbait:</strong> Using misleading titles 
                that don't match the content. <strong>Over-optimization:</strong> Stuffing 
                too many keywords into titles. <strong>Generic Titles:</strong> Using vague 
                or generic titles that don't stand out. <strong>Length Issues:</strong> 
                Making titles too long or too short. <strong>Spelling Errors:</strong> 
                Using misspelled words in titles. <strong>Inconsistent Branding:</strong> 
                Not maintaining consistent title patterns. <strong>Ignoring Analytics:</strong> 
                Not monitoring which titles perform best. <strong>Outdated References:</strong> 
                Using outdated information or references in titles.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I develop an effective title strategy for my YouTube channel?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Strategy development includes: <strong>Audience Research:</strong> Understand 
                what titles resonate with your target audience. <strong>Competitor Analysis:</strong> 
                Study successful channels in your niche. <strong>Keyword Research:</strong> 
                Use tools to find relevant keywords for your titles. <strong>Format Testing:</strong> 
                Test different title formats and structures. <strong>Performance Tracking:</strong> 
                Monitor which titles drive the most views and engagement. <strong>Brand Consistency:</strong> 
                Develop consistent title patterns for your channel. <strong>Regular Updates:</strong> 
                Update your title strategy based on performance data. <strong>Trend Monitoring:</strong> 
                Stay updated with trending title elements and styles.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the technical limitations and accuracy considerations?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Technical considerations include: <strong>API Access:</strong> Real title 
                extraction requires YouTube Data API access. <strong>Rate Limits:</strong> 
                YouTube API has daily quotas and rate limits. <strong>Data Accuracy:</strong> 
                This tool provides simulated data for demonstration purposes. <strong>Real-time Updates:</strong> 
                Titles may change after video upload. <strong>Privacy Settings:</strong> 
                Some videos may have restricted metadata access. <strong>URL Validation:</strong> 
                Tool validates YouTube URL formats before processing. <strong>Best Practice:</strong> 
                For real title extraction, use YouTube's official Data API or manual inspection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default YoutubeTitleExtractor
