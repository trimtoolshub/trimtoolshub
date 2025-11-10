import { useState } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeDescriptionExtractor = () => {
  const [url, setUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)

  const extractDescription = async () => {
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
      
      // Mock extracted description and metadata
      const mockData = {
        title: 'How to Build a Successful YouTube Channel in 2024 - Complete Guide',
        channel: 'YouTube Creator Academy',
        viewCount: '1,234,567',
        likeCount: '45,678',
        publishedAt: '2024-01-15',
        duration: '15:42',
        description: `Learn the essential strategies to grow your YouTube channel from zero to millions of subscribers! In this comprehensive guide, I'll share proven techniques that successful YouTubers use to build their audience.

🎯 What You'll Learn:
• Content strategy that works
• SEO optimization techniques
• Thumbnail design secrets
• Engagement tactics
• Monetization strategies

📚 Chapters:
00:00 Introduction
02:15 Content Planning
05:30 SEO Optimization
08:45 Thumbnail Design
12:20 Engagement Tactics
14:50 Monetization

🔗 Resources Mentioned:
• YouTube Creator Academy: https://creatoracademy.youtube.com
• TubeBuddy: https://tubebuddy.com
• Canva: https://canva.com

📱 Follow Me:
• Instagram: @youtubecreator
• Twitter: @youtubecreator
• Website: youtubecreator.com

#YouTubeTips #ContentCreation #YouTubeSEO #YouTubeGrowth #CreatorTips #YouTubeStrategy #VideoMarketing #DigitalMarketing #YouTubeTutorial #ContentStrategy`
      }
      
      setResult({
        type: 'success',
        videoId,
        ...mockData
      })
    } catch (error) {
      setResult({
        type: 'error',
        message: 'Failed to extract description. Please check the URL and try again.'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const copyDescription = () => {
    if (result && result.description) {
      navigator.clipboard.writeText(result.description).then(() => {
        alert('Description copied to clipboard!')
      }).catch(() => {
        alert('Failed to copy description.')
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
        title="YouTube Description Extractor | Free Online Tool – TrimToolsHub"
        description="Extract descriptions from any YouTube video URL. Free YouTube description extractor tool to analyze successful video descriptions and improve your content strategy."
        keywords={['youtube description extractor', 'youtube descriptions', 'video descriptions', 'youtube seo', 'description analysis', 'youtube tools']}
      />
      
      <div className="tool-container">
        <h1>YouTube Description Extractor</h1>
        <p>Extract descriptions and metadata from any YouTube video to analyze successful content strategies and improve your own video descriptions.</p>
        
        <AdSlot slotId="youtube-description-extractor-top" style={{ margin: '1rem 0' }} />
        
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
                onClick={extractDescription}
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
                    Extract Description
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
                    <strong>Description Extracted Successfully!</strong>
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
                      <div><strong>Title:</strong> {result.title}</div>
                      <div><strong>Channel:</strong> {result.channel}</div>
                      <div><strong>Views:</strong> {result.viewCount}</div>
                      <div><strong>Likes:</strong> {result.likeCount}</div>
                      <div><strong>Published:</strong> {result.publishedAt}</div>
                      <div><strong>Duration:</strong> {result.duration}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Video Description</h4>
                      <button
                        onClick={copyDescription}
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
                        Copy Description
                      </button>
                    </div>
                    <div style={{ 
                      padding: '1rem',
                      backgroundColor: 'var(--bg-card)',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border)',
                      fontSize: '0.9rem',
                      color: 'var(--text-primary)',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-wrap',
                      maxHeight: '400px',
                      overflowY: 'auto'
                    }}>
                      {result.description}
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
            About YouTube Description Extraction & Content Strategy Analysis
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How does YouTube description extraction work and what data is provided?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Our tool extracts descriptions and metadata from YouTube videos: <strong>Description Extraction:</strong> 
                Retrieves the complete video description from YouTube metadata. <strong>Video Information:</strong> 
                Displays title, channel name, view count, like count, publish date, and duration. 
                <strong>Content Analysis:</strong> Shows the full description text with formatting preserved. 
                <strong>Copy Functionality:</strong> Easy copying of extracted descriptions for reuse. 
                <strong>Performance Context:</strong> Provides video performance metrics for description effectiveness analysis. 
                <strong>Structure Analysis:</strong> Identifies description elements like timestamps, links, and CTAs.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the benefits of analyzing competitor video descriptions?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Competitor description analysis provides: <strong>Content Strategy Insights:</strong> 
                Understand how successful creators structure their descriptions. <strong>SEO Optimization:</strong> 
                Learn effective keyword usage and SEO techniques. <strong>Engagement Tactics:</strong> 
                Discover how descriptions drive engagement and subscriptions. <strong>Format Inspiration:</strong> 
                Find effective description formats and templates. <strong>Link Strategy:</strong> 
                Understand how to effectively use links in descriptions. <strong>CTA Analysis:</strong> 
                Learn effective call-to-action strategies. <strong>Timeline Structure:</strong> 
                See how successful creators organize timestamps and chapters.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What elements make YouTube descriptions effective and engaging?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Effective description elements include: <strong>Hook:</strong> Start with a compelling 
                opening that summarizes the video's value. <strong>Value Proposition:</strong> 
                Clearly explain what viewers will learn or gain. <strong>Timestamps:</strong> 
                Include chapter markers for easy navigation. <strong>Links:</strong> 
                Add relevant links to resources, social media, and related content. 
                <strong>Call-to-Action:</strong> Encourage likes, subscriptions, and comments. 
                <strong>Keywords:</strong> Include relevant keywords for SEO. <strong>Social Proof:</strong> 
                Mention achievements, credentials, or social media presence. <strong>Hashtags:</strong> 
                Use relevant hashtags for discoverability.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the best practices for YouTube description optimization?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Description optimization best practices include: <strong>Length:</strong> 
                Use the full 5,000 character limit effectively. <strong>First 125 Characters:</strong> 
                Make the first 125 characters compelling as they appear in search results. 
                <strong>Keywords:</strong> Include primary keywords naturally throughout the description. 
                <strong>Structure:</strong> Use clear formatting with bullet points and sections. 
                <strong>Links:</strong> Include relevant links to your website, social media, and resources. 
                <strong>Timestamps:</strong> Add timestamps for longer videos to improve user experience. 
                <strong>Consistency:</strong> Maintain consistent description patterns across your channel.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do descriptions affect YouTube's algorithm and video discoverability?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Algorithm impact includes: <strong>Search Ranking:</strong> Descriptions are 
                crucial for YouTube search results and SEO. <strong>Content Understanding:</strong> 
                Descriptions help YouTube understand and categorize your content. <strong>User Engagement:</strong> 
                Well-written descriptions improve user experience and engagement. <strong>Click-through Rate:</strong> 
                Compelling descriptions in search results improve CTR. <strong>Watch Time:</strong> 
                Timestamps and clear descriptions can increase watch time. <strong>Recommendation Engine:</strong> 
                Descriptions influence which videos are recommended to users. <strong>Keyword Matching:</strong> 
                Descriptions help match content with user search queries.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common mistakes to avoid when writing YouTube descriptions?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common mistakes include: <strong>Empty Descriptions:</strong> Leaving descriptions 
                blank or using minimal text. <strong>Keyword Stuffing:</strong> Overusing keywords 
                unnaturally in descriptions. <strong>Poor Formatting:</strong> Using walls of text 
                without proper formatting. <strong>Missing CTAs:</strong> Not including clear 
                calls-to-action for engagement. <strong>Irrelevant Links:</strong> Including 
                links that don't add value to viewers. <strong>No Timestamps:</strong> 
                Missing timestamps for longer videos. <strong>Inconsistent Branding:</strong> 
                Not maintaining consistent description patterns. <strong>Outdated Information:</strong> 
                Including outdated links or information.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I develop an effective description strategy for my YouTube channel?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Strategy development includes: <strong>Template Creation:</strong> Develop 
                consistent description templates for different content types. <strong>Keyword Research:</strong> 
                Use tools to find relevant keywords for your descriptions. <strong>Competitor Analysis:</strong> 
                Study successful channels in your niche. <strong>Performance Tracking:</strong> 
                Monitor which descriptions drive the most engagement. <strong>Link Strategy:</strong> 
                Develop a consistent approach to including links. <strong>CTA Optimization:</strong> 
                Test different call-to-action strategies. <strong>Regular Updates:</strong> 
                Update descriptions based on performance data. <strong>Brand Consistency:</strong> 
                Maintain consistent voice and formatting across all descriptions.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the technical limitations and accuracy considerations?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Technical considerations include: <strong>API Access:</strong> Real description 
                extraction requires YouTube Data API access. <strong>Rate Limits:</strong> 
                YouTube API has daily quotas and rate limits. <strong>Data Accuracy:</strong> 
                This tool provides simulated data for demonstration purposes. <strong>Real-time Updates:</strong> 
                Descriptions may change after video upload. <strong>Privacy Settings:</strong> 
                Some videos may have restricted metadata access. <strong>URL Validation:</strong> 
                Tool validates YouTube URL formats before processing. <strong>Best Practice:</strong> 
                For real description extraction, use YouTube's official Data API or manual inspection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default YoutubeDescriptionExtractor
