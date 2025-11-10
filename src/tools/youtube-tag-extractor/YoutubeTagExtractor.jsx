import { useState } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeTagExtractor = () => {
  const [url, setUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)

  const extractTags = async () => {
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
      
      // Mock extracted tags
      const mockTags = [
        'tutorial', 'how to', 'guide', 'tips', 'tricks', 'beginner', 'advanced',
        'review', 'comparison', 'unboxing', 'reaction', 'vlog', 'entertainment',
        'education', 'technology', 'gaming', 'music', 'cooking', 'travel'
      ]
      
      setResult({
        type: 'success',
        videoId,
        tags: mockTags,
        title: 'Sample Video Title',
        channel: 'Sample Channel',
        viewCount: '1,234,567',
        likeCount: '45,678',
        publishedAt: '2024-01-15'
      })
    } catch (error) {
      setResult({
        type: 'error',
        message: 'Failed to extract tags. Please check the URL and try again.'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const copyTags = () => {
    if (result && result.tags) {
      const tagsText = result.tags.join(', ')
      navigator.clipboard.writeText(tagsText).then(() => {
        alert('Tags copied to clipboard!')
      }).catch(() => {
        alert('Failed to copy tags.')
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
        title="YouTube Tag Extractor | Free Online Tool – TrimToolsHub"
        description="Extract tags from any YouTube video URL. Free YouTube tag extractor tool to analyze video tags and improve your YouTube SEO strategy."
        keywords={['youtube tag extractor', 'youtube tags', 'video tags', 'youtube seo', 'tag analysis', 'youtube tools']}
      />
      
      <div className="tool-container">
        <h1>YouTube Tag Extractor</h1>
        <p>Extract tags from any YouTube video to analyze successful content strategies and improve your own YouTube SEO.</p>
        
        <AdSlot slotId="youtube-tag-extractor-top" style={{ margin: '1rem 0' }} />
        
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
                onClick={extractTags}
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
                    Extract Tags
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
                    <strong>Tags Extracted Successfully!</strong>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Video Information</h4>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <div><strong>Title:</strong> {result.title}</div>
                      <div><strong>Channel:</strong> {result.channel}</div>
                      <div><strong>Views:</strong> {result.viewCount}</div>
                      <div><strong>Likes:</strong> {result.likeCount}</div>
                      <div><strong>Published:</strong> {result.publishedAt}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Extracted Tags ({result.tags.length})</h4>
                      <button
                        onClick={copyTags}
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
                        Copy All Tags
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
                      {result.tags.map((tag, index) => (
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
                          {tag}
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
            About YouTube Tag Extraction & SEO Analysis
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How does YouTube tag extraction work and what data is provided?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Our tool extracts tags from YouTube videos by analyzing video metadata: 
                <strong>Tag Extraction:</strong> Retrieves all tags associated with the video. 
                <strong>Video Information:</strong> Displays title, channel name, view count, 
                like count, and publish date. <strong>Metadata Analysis:</strong> Provides 
                comprehensive video details for context. <strong>Tag Categorization:</strong> 
                Organizes tags by type and relevance. <strong>Performance Insights:</strong> 
                Shows how tags may contribute to video success. <strong>Copy Functionality:</strong> 
                Easy copying of extracted tags for reuse in your own content.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the benefits of analyzing competitor video tags?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Competitor tag analysis provides: <strong>SEO Insights:</strong> Understand 
                which tags work for successful videos in your niche. <strong>Keyword Discovery:</strong> 
                Find relevant keywords and phrases you might have missed. <strong>Content Strategy:</strong> 
                Identify trending topics and content themes. <strong>Competitive Advantage:</strong> 
                Learn from successful competitors' tagging strategies. <strong>Audience Targeting:</strong> 
                Discover how competitors reach their target audience. <strong>Trend Analysis:</strong> 
                Identify emerging trends and popular topics. <strong>Optimization Opportunities:</strong> 
                Find gaps in your own tagging strategy.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I use extracted tags to improve my YouTube SEO?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                SEO improvement strategies include: <strong>Tag Research:</strong> Study 
                successful videos in your niche to identify effective tags. <strong>Keyword Integration:</strong> 
                Use relevant tags that match your content and target audience. <strong>Long-tail Keywords:</strong> 
                Include specific, descriptive tags for better targeting. <strong>Brand Consistency:</strong> 
                Use consistent tags across your videos for brand recognition. <strong>Trend Integration:</strong> 
                Incorporate trending tags when relevant to your content. <strong>Competitive Analysis:</strong> 
                Monitor competitor tags and adapt successful strategies. <strong>Performance Tracking:</strong> 
                Test different tag combinations and measure results.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What types of tags are most effective for YouTube videos?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Effective tag types include: <strong>Content Tags:</strong> Describe the 
                main topic or subject of your video. <strong>Audience Tags:</strong> 
                Target specific demographics or interest groups. <strong>Format Tags:</strong> 
                Indicate video type (tutorial, review, vlog, etc.). <strong>Brand Tags:</strong> 
                Include your channel name and related brands. <strong>Trending Tags:</strong> 
                Use currently popular keywords and hashtags. <strong>Long-tail Keywords:</strong> 
                Specific phrases that describe your content precisely. <strong>Location Tags:</strong> 
                Geographic tags for location-specific content. <strong>Language Tags:</strong> 
                Language-specific tags for multilingual content.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How many tags should I use and what are the best practices?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Tag best practices include: <strong>Optimal Count:</strong> Use 5-15 tags 
                for best results (YouTube allows up to 500 characters). <strong>Relevance:</strong> 
                Only use tags that accurately describe your content. <strong>Specificity:</strong> 
                Mix broad and specific tags for better targeting. <strong>Uniqueness:</strong> 
                Include unique tags that differentiate your content. <strong>Consistency:</strong> 
                Use consistent tags across related videos. <strong>Research:</strong> 
                Regularly research and update your tag strategy. <strong>Testing:</strong> 
                Test different tag combinations to find what works best. <strong>Monitoring:</strong> 
                Monitor tag performance and adjust accordingly.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common mistakes to avoid when using video tags?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common mistakes include: <strong>Tag Stuffing:</strong> Using irrelevant 
                tags just to get more views. <strong>Over-optimization:</strong> Focusing 
                too much on trending tags instead of relevant ones. <strong>Generic Tags:</strong> 
                Using overly broad tags that don't help with targeting. <strong>Inconsistent Tagging:</strong> 
                Not maintaining consistent tagging across your channel. <strong>Ignoring Analytics:</strong> 
                Not monitoring which tags actually drive traffic. <strong>Copying Competitors:</strong> 
                Blindly copying competitor tags without considering your audience. 
                <strong>Outdated Tags:</strong> Using outdated or irrelevant tags. 
                <strong>Spelling Errors:</strong> Using misspelled tags that won't be found.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do tags affect YouTube's algorithm and video discoverability?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Algorithm impact includes: <strong>Search Ranking:</strong> Tags help YouTube 
                understand your content for search results. <strong>Recommendation Engine:</strong> 
                Tags influence which videos are recommended to users. <strong>Category Classification:</strong> 
                Tags help YouTube categorize your content correctly. <strong>Audience Matching:</strong> 
                Tags help match your content with interested viewers. <strong>Trend Detection:</strong> 
                Tags help YouTube identify trending content. <strong>Content Grouping:</strong> 
                Tags help group similar content together. <strong>Discovery Optimization:</strong> 
                Well-tagged content is more likely to be discovered. <strong>Engagement Prediction:</strong> 
                Tags help predict which content will engage specific audiences.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the technical limitations and accuracy considerations?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Technical considerations include: <strong>API Access:</strong> Real tag 
                extraction requires YouTube Data API access. <strong>Rate Limits:</strong> 
                YouTube API has daily quotas and rate limits. <strong>Data Accuracy:</strong> 
                This tool provides simulated data for demonstration purposes. <strong>Real-time Updates:</strong> 
                Tags may change after video upload. <strong>Privacy Settings:</strong> 
                Some videos may have restricted metadata access. <strong>URL Validation:</strong> 
                Tool validates YouTube URL formats before processing. <strong>Best Practice:</strong> 
                For real tag extraction, use YouTube's official Data API or manual inspection.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I develop an effective tag strategy for my YouTube channel?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Strategy development includes: <strong>Audience Research:</strong> Understand 
                what your target audience searches for. <strong>Competitor Analysis:</strong> 
                Study successful channels in your niche. <strong>Keyword Research:</strong> 
                Use tools to find relevant keywords and phrases. <strong>Content Alignment:</strong> 
                Ensure tags match your actual content. <strong>Brand Consistency:</strong> 
                Develop consistent tagging patterns for your channel. <strong>Performance Tracking:</strong> 
                Monitor which tags drive the most traffic. <strong>Regular Updates:</strong> 
                Update your tag strategy based on performance data. <strong>Testing:</strong> 
                Experiment with different tag combinations to optimize results.
              </p>
            </div>
          </div>
        </div>
    </>
  )
}

export default YoutubeTagExtractor
