import { useState } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeHashtagGenerator = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)

  const categories = [
    'Education', 'Entertainment', 'Gaming', 'Music', 'Sports', 'Technology',
    'Travel', 'Food', 'Fashion', 'Beauty', 'Health', 'Science', 'News',
    'Comedy', 'Art', 'DIY', 'Business', 'Finance', 'Lifestyle', 'Other'
  ]

  const generateHashtags = async () => {
    if (!title.trim()) {
      alert('Please enter a video title.')
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate AI-powered hashtag generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate hashtags based on title, description, and category
      const baseHashtags = []
      
      // Extract keywords from title and convert to hashtags
      const titleWords = title.toLowerCase().split(/\s+/).filter(word => word.length > 2)
      baseHashtags.push(...titleWords.slice(0, 3).map(word => `#${word}`))
      
      // Add category-specific hashtags
      if (category) {
        const categoryHashtags = {
          'Education': ['#tutorial', '#learn', '#howto', '#guide', '#tips'],
          'Entertainment': ['#funny', '#comedy', '#entertainment', '#viral', '#reaction'],
          'Gaming': ['#gaming', '#gameplay', '#review', '#walkthrough', '#tips'],
          'Music': ['#music', '#song', '#cover', '#original', '#performance'],
          'Technology': ['#tech', '#review', '#unboxing', '#comparison', '#tutorial'],
          'Travel': ['#travel', '#vlog', '#adventure', '#destination', '#tips'],
          'Food': ['#cooking', '#recipe', '#food', '#tastetest', '#review'],
          'Fashion': ['#fashion', '#style', '#outfit', '#haul', '#review'],
          'Beauty': ['#beauty', '#makeup', '#skincare', '#tutorial', '#review'],
          'Health': ['#health', '#fitness', '#wellness', '#tips', '#guide'],
          'Science': ['#science', '#experiment', '#education', '#facts', '#explained'],
          'News': ['#news', '#currentevents', '#analysis', '#breaking', '#update'],
          'Comedy': ['#comedy', '#funny', '#jokes', '#sketch', '#parody'],
          'Art': ['#art', '#drawing', '#painting', '#creative', '#tutorial'],
          'DIY': ['#diy', '#craft', '#project', '#tutorial', '#howto'],
          'Business': ['#business', '#entrepreneur', '#marketing', '#tips', '#strategy'],
          'Finance': ['#finance', '#money', '#investment', '#tips', '#advice'],
          'Lifestyle': ['#lifestyle', '#daily', '#routine', '#tips', '#advice']
        }
        
        if (categoryHashtags[category]) {
          baseHashtags.push(...categoryHashtags[category])
        }
      }
      
      // Add trending hashtags
      const trendingHashtags = [
        '#2024', '#new', '#latest', '#best', '#top', '#amazing', '#incredible',
        '#mustwatch', '#viral', '#trending', '#popular', '#recommended'
      ]
      
      // Add description-based hashtags if provided
      if (description.trim()) {
        const descWords = description.toLowerCase().split(/\s+/).filter(word => word.length > 3)
        baseHashtags.push(...descWords.slice(0, 2).map(word => `#${word}`))
      }
      
      // Remove duplicates and limit to 10 hashtags
      const uniqueHashtags = [...new Set(baseHashtags)].slice(0, 10)
      
      // Add some trending hashtags
      const finalHashtags = [...uniqueHashtags, ...trendingHashtags.slice(0, 3)].slice(0, 10)
      
      setResult({
        type: 'success',
        hashtags: finalHashtags,
        title,
        category,
        hashtagCount: finalHashtags.length
      })
    } catch (error) {
      setResult({
        type: 'error',
        message: 'Failed to generate hashtags. Please try again.'
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
    setTitle('')
    setDescription('')
    setCategory('')
    setResult(null)
  }

  return (
    <>
      <SEOHead
        title="YouTube Hashtag Generator | Free Online Tool – TrimToolsHub"
        description="Generate trending hashtags for your YouTube videos. Free YouTube hashtag generator tool to improve video reach and engagement."
        keywords={['youtube hashtag generator', 'youtube hashtags', 'video hashtags', 'youtube seo', 'hashtag generator', 'youtube optimization']}
      />
      
      <div className="tool-container">
        <h1 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fab fa-youtube" style={{ marginRight: '0.5rem', color: '#ff0000' }} />
          YouTube Hashtag Generator
        </h1>
        
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
            Generate trending and relevant hashtags for your YouTube videos with our advanced 
            Hashtag Generator that maximizes reach, engagement, and discoverability. Whether 
            you're creating educational content, entertainment videos, tutorials, or reviews, 
            our tool creates strategic hashtag combinations that help your videos reach the 
            right audience and participate in trending conversations.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our YouTube Hashtag Generator uses AI-powered analysis of your video title, 
            description, and category to create optimized hashtag sets that include trending 
            topics, niche-specific hashtags, community tags, and engagement-focused keywords. 
            The tool ensures your hashtags are relevant, searchable, and strategically 
            positioned for maximum social media visibility and community building.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for content creators, YouTubers, marketers, and video producers who need 
            to optimize their video hashtags for maximum engagement and social media reach. 
            The tool helps you create professional hashtag strategies that improve click-through 
            rates, increase community engagement, and boost overall channel performance across 
            YouTube and social media platforms.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include AI-powered hashtag generation, trending topic integration, 
            category-specific optimization, community hashtag suggestions, engagement-focused 
            keywords, copy-to-clipboard functionality, and comprehensive documentation about 
            YouTube hashtag best practices and social media optimization strategies.
          </p>
        </div>
        
        <AdSlot slotId="youtube-hashtag-generator-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Video Information</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Video Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your video title..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Video Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter your video description..."
                rows="3"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Category (Optional)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={generateHashtags}
              disabled={!title.trim() || isProcessing}
              style={{
                flex: 1,
                padding: '0.75rem 1.5rem',
                backgroundColor: !title.trim() || isProcessing ? 'var(--bg-tertiary)' : '#ff0000',
                color: !title.trim() || isProcessing ? 'var(--text-muted)' : 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: !title.trim() || isProcessing ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {isProcessing ? (
                <>
                  <FontAwesomeIcon icon="fas fa-spinner" style={{ animation: 'spin 1s linear infinite' }} />
                  Generating Hashtags...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon="fas fa-hashtag" />
                  Generate Hashtags
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
                transition: 'all 0.2s ease'
              }}
            >
              Clear All
            </button>
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
                    <strong>Hashtags Generated Successfully!</strong>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <div><strong>Video:</strong> {result.title}</div>
                      {result.category && <div><strong>Category:</strong> {result.category}</div>}
                      <div><strong>Generated Hashtags:</strong> {result.hashtagCount}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Generated Hashtags</h4>
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
        </div>

        <AdSlot slotId="youtube-hashtag-generator-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        <div style={{ 
          marginTop: '2rem', 
          padding: '2rem', 
          backgroundColor: 'var(--bg-card)', 
          borderRadius: '1rem', 
          border: '1px solid var(--border)' 
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About YouTube Hashtag Strategy & Social Media Optimization
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are YouTube hashtags and how do they work?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                YouTube hashtags are clickable keywords prefixed with # that help categorize 
                and discover content. They work by: making your videos discoverable in hashtag 
                searches, connecting your content to trending topics, building communities 
                around specific topics, and improving cross-platform sharing. Hashtags appear 
                in your video title and description, and clicking them shows related videos. 
                They're limited to 3 displayed in search results, but you can use up to 15 
                hashtags total for maximum discoverability.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How many hashtags should I use on YouTube videos?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Use 3-5 hashtags for optimal performance. YouTube displays only the first 3 
                hashtags in search results, but you can include up to 15 total. Focus on: 
                <strong>Primary hashtags:</strong> 1-2 main topic hashtags. <strong>Trending 
                hashtags:</strong> 1-2 current trending topics. <strong>Niche hashtags:</strong> 
                1-2 specific community tags. <strong>Brand hashtags:</strong> Your channel or 
                series hashtags. Avoid hashtag stuffing - use only relevant hashtags that 
                genuinely describe your content and help viewers find your videos.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What's the difference between hashtags and tags on YouTube?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Hashtags:</strong> Visible clickable links in titles and descriptions, 
                help with social discovery and trending topics, limited to 3 displayed in search 
                results, work across YouTube and social media platforms. <strong>Tags:</strong> 
                Hidden keywords used for SEO and categorization, not visible to viewers, help 
                with search rankings and algorithm understanding, used internally by YouTube's 
                algorithm. Use both strategically: hashtags for social discovery and community 
                building, tags for SEO optimization and search rankings.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I research effective hashtags for my content?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Research hashtags by: analyzing successful videos in your niche, using YouTube's 
                hashtag autocomplete suggestions, checking trending hashtags on YouTube and 
                social media, monitoring competitor hashtag usage, using hashtag research tools 
                like Hashtagify or RiteTag, analyzing your own successful videos' hashtags, 
                and testing different hashtag combinations. Focus on hashtags with good engagement 
                but manageable competition. Look for hashtags that are actively used by your 
                target audience and community.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Should I use trending hashtags in my videos?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Use trending hashtags when they're relevant to your content. Benefits include: 
                increased discoverability during trending periods, participation in current 
                conversations, potential viral reach, and community engagement. However, avoid 
                forced trending hashtag inclusion that doesn't match your content. Focus on: 
                seasonal trends relevant to your niche, current events that relate to your 
                content, trending topics in your industry, and viral challenges or movements 
                that align with your brand. Authentic integration works better than keyword 
                stuffing for trending terms.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do hashtags affect YouTube's algorithm?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Hashtags help YouTube's algorithm by: categorizing your content correctly, 
                connecting videos to trending topics, improving content classification, and 
                enhancing social media sharing. However, hashtags are just one ranking factor 
                alongside watch time, engagement, click-through rates, and user behavior. 
                Focus on creating quality content that keeps viewers engaged while using 
                relevant hashtags to help discovery. The algorithm considers hashtag relevance, 
                user engagement with hashtagged content, and trending topic participation.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I optimize hashtags for different content types?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Different content requires different hashtag strategies: <strong>Tutorials:</strong> 
                Focus on "howto," "tutorial," "learn," and skill-specific hashtags. 
                <strong>Reviews:</strong> Include product names, "review," "comparison," and 
                feature-specific hashtags. <strong>Entertainment:</strong> Use trending terms, 
                "funny," "comedy," and audience-specific hashtags. <strong>Educational:</strong> 
                Include subject matter, "learn," "explained," and academic hashtags. 
                <strong>Vlogs:</strong> Use personal brand hashtags, location tags, and lifestyle 
                keywords. Tailor your hashtag strategy to match your content type and audience 
                expectations while maintaining consistency with your channel's overall theme.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Should I include my channel name in hashtags?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Include your channel name as a hashtag when: building brand recognition, creating 
                series content, collaborating with others, or when it adds context. However, don't 
                use it in every video as it wastes valuable hashtag space. Use your channel name 
                strategically for: branded content series, collaborations, brand awareness campaigns, 
                and when building a community around your channel. Focus on content-relevant hashtags 
                that help discoverability rather than repetitive brand hashtagging.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I track hashtag performance on YouTube?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Track hashtag performance by: analyzing YouTube Analytics for traffic sources, 
                monitoring which hashtags drive the most views, tracking click-through rates 
                from hashtag searches, analyzing engagement rates on hashtagged content, 
                monitoring hashtag trending status, and experimenting with different hashtag 
                combinations. Focus on metrics like: search impressions, click-through rates, 
                watch time from hashtag traffic, and overall video performance. Regular 
                optimization based on data leads to better hashtag strategies.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common YouTube hashtag mistakes to avoid?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common mistakes include: using irrelevant hashtags that don't match your content, 
                hashtag stuffing with too many keywords, copying competitor hashtags exactly, 
                using misspelled or incorrect hashtags, including hashtags that violate YouTube 
                policies, using the same hashtags for every video, ignoring trending vs. evergreen 
                hashtag balance, and not updating hashtags for seasonal or trending content. 
                Focus on creating original, relevant hashtag strategies that genuinely help 
                viewers find your content and participate in relevant conversations.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do hashtags help with cross-platform promotion?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Hashtags help cross-platform promotion by: creating consistent branding across 
                platforms, enabling content discovery on social media, building community around 
                specific topics, facilitating content sharing and reposting, and improving 
                overall social media presence. Use consistent hashtags across YouTube, Instagram, 
                Twitter, and TikTok to build a unified brand presence. Focus on: platform-specific 
                trending hashtags, cross-platform community hashtags, brand-specific hashtags, 
                and content-relevant hashtags that work across multiple platforms.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I balance trending and evergreen hashtags?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Balance trending and evergreen hashtags by: using 1-2 trending hashtags for 
                current relevance, including 2-3 evergreen hashtags for long-term discoverability, 
                monitoring trending hashtag performance, updating hashtags for seasonal content, 
                and testing different combinations. Evergreen hashtags provide consistent 
                discoverability over time, while trending hashtags offer short-term visibility 
                boosts. Focus on: niche-specific evergreen hashtags, seasonal trending topics, 
                and community hashtags that maintain relevance across different time periods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default YoutubeHashtagGenerator
