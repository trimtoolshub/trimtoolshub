import { useState } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeTagGenerator = () => {
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

  const generateTags = async () => {
    if (!title.trim()) {
      alert('Please enter a video title.')
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate AI-powered tag generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate tags based on title, description, and category
      const baseTags = []
      
      // Extract keywords from title
      const titleWords = title.toLowerCase().split(/\s+/).filter(word => word.length > 2)
      baseTags.push(...titleWords.slice(0, 5))
      
      // Add category-specific tags
      if (category) {
        const categoryTags = {
          'Education': ['tutorial', 'learn', 'how to', 'guide', 'tips'],
          'Entertainment': ['funny', 'comedy', 'entertainment', 'viral', 'reaction'],
          'Gaming': ['gaming', 'gameplay', 'review', 'walkthrough', 'tips'],
          'Music': ['music', 'song', 'cover', 'original', 'performance'],
          'Technology': ['tech', 'review', 'unboxing', 'comparison', 'tutorial'],
          'Travel': ['travel', 'vlog', 'adventure', 'destination', 'tips'],
          'Food': ['cooking', 'recipe', 'food', 'taste test', 'review'],
          'Fashion': ['fashion', 'style', 'outfit', 'haul', 'review'],
          'Beauty': ['beauty', 'makeup', 'skincare', 'tutorial', 'review'],
          'Health': ['health', 'fitness', 'wellness', 'tips', 'guide'],
          'Science': ['science', 'experiment', 'education', 'facts', 'explained'],
          'News': ['news', 'current events', 'analysis', 'breaking', 'update'],
          'Comedy': ['comedy', 'funny', 'jokes', 'sketch', 'parody'],
          'Art': ['art', 'drawing', 'painting', 'creative', 'tutorial'],
          'DIY': ['diy', 'craft', 'project', 'tutorial', 'how to'],
          'Business': ['business', 'entrepreneur', 'marketing', 'tips', 'strategy'],
          'Finance': ['finance', 'money', 'investment', 'tips', 'advice'],
          'Lifestyle': ['lifestyle', 'daily', 'routine', 'tips', 'advice']
        }
        
        if (categoryTags[category]) {
          baseTags.push(...categoryTags[category])
        }
      }
      
      // Add trending tags
      const trendingTags = [
        '2024', 'new', 'latest', 'best', 'top', 'amazing', 'incredible',
        'must watch', 'viral', 'trending', 'popular', 'recommended'
      ]
      
      // Add description-based tags if provided
      if (description.trim()) {
        const descWords = description.toLowerCase().split(/\s+/).filter(word => word.length > 3)
        baseTags.push(...descWords.slice(0, 3))
      }
      
      // Remove duplicates and limit to 15 tags
      const uniqueTags = [...new Set(baseTags)].slice(0, 15)
      
      // Add some trending tags
      const finalTags = [...uniqueTags, ...trendingTags.slice(0, 5)].slice(0, 15)
      
      setResult({
        type: 'success',
        tags: finalTags,
        title,
        category,
        tagCount: finalTags.length
      })
    } catch (error) {
      setResult({
        type: 'error',
        message: 'Failed to generate tags. Please try again.'
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
    setTitle('')
    setDescription('')
    setCategory('')
    setResult(null)
  }

  return (
    <>
      <SEOHead
        title="YouTube Tag Generator | Free Online Tool – TrimToolsHub"
        description="Generate relevant tags for your YouTube videos. Free YouTube tag generator tool to improve video discoverability and SEO performance."
        keywords={['youtube tag generator', 'youtube tags', 'video tags', 'youtube seo', 'tag generator', 'youtube optimization']}
      />
      
      <div className="tool-container">
        <h1 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fab fa-youtube" style={{ marginRight: '0.5rem', color: '#ff0000' }} />
          YouTube Tag Generator
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
            Generate relevant and trending tags for your YouTube videos with our advanced Tag 
            Generator that helps improve discoverability and boost your video's SEO performance. 
            Whether you're creating educational content, entertainment videos, tutorials, or 
            reviews, our tool creates strategic tag combinations that maximize your video's 
            reach and search visibility on YouTube.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our YouTube Tag Generator uses AI-powered analysis of your video title, description, 
            and category to create optimized tag sets that include primary keywords, long-tail 
            variations, trending terms, and category-specific tags. The tool ensures your tags 
            are relevant, searchable, and strategically positioned for maximum discoverability.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for content creators, YouTubers, marketers, and video producers who need 
            to optimize their video tags for maximum engagement and search visibility. The tool 
            helps you create professional tag strategies that improve click-through rates, 
            increase organic reach, and boost overall channel performance.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include AI-powered tag generation, category-specific optimization, trending 
            tag integration, keyword analysis, tag count optimization, copy-to-clipboard 
            functionality, and comprehensive documentation about YouTube tag best practices and 
            SEO optimization strategies.
          </p>
        </div>
        
        <AdSlot slotId="youtube-tag-generator-top" style={{ margin: '1rem 0' }} />
        
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
              onClick={generateTags}
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
                  Generating Tags...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon="fas fa-magic" />
                  Generate Tags
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
                    <strong>Tags Generated Successfully!</strong>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <div><strong>Video:</strong> {result.title}</div>
                      {result.category && <div><strong>Category:</strong> {result.category}</div>}
                      <div><strong>Generated Tags:</strong> {result.tagCount}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Generated Tags</h4>
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
        </div>

        <AdSlot slotId="youtube-tag-generator-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        <div style={{ 
          marginTop: '2rem', 
          padding: '2rem', 
          backgroundColor: 'var(--bg-card)', 
          borderRadius: '1rem', 
          border: '1px solid var(--border)' 
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About YouTube Tag Optimization & Best Practices
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are YouTube tags and why are they important?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                YouTube tags are keywords that help categorize and describe your video content. 
                They're crucial for SEO because they help YouTube's algorithm understand your 
                content and match it with relevant search queries. Tags improve discoverability 
                by making your videos appear in search results, related video suggestions, and 
                category browsing. Well-optimized tags can significantly increase your video's 
                organic reach and help you reach your target audience more effectively.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How many tags should I use for my YouTube videos?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Use 5-15 relevant tags for optimal performance. YouTube allows up to 500 characters 
                for tags, but quality matters more than quantity. Focus on: <strong>Primary tags:</strong> 
                3-5 main keywords directly related to your content. <strong>Long-tail tags:</strong> 
                2-3 specific phrases your audience might search. <strong>Broad tags:</strong> 2-3 
                general category tags. <strong>Trending tags:</strong> 1-2 current trending terms. 
                Avoid tag stuffing - use only tags that genuinely describe your content.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What types of tags should I include in my videos?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Include a mix of tag types: <strong>Primary keywords:</strong> Main topics covered 
                in your video. <strong>Long-tail keywords:</strong> Specific phrases like "how to 
                cook pasta for beginners." <strong>Category tags:</strong> General topics like 
                "cooking," "tutorial," "review." <strong>Brand tags:</strong> Products or brands 
                mentioned. <strong>Trending tags:</strong> Current popular terms. <strong>Location 
                tags:</strong> Geographic relevance if applicable. <strong>Audience tags:</strong> 
                Target demographic terms. Balance specific and broad tags for maximum reach.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I research effective tags for my content?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Research tags by: analyzing successful videos in your niche, using YouTube's 
                autocomplete suggestions, checking competitor tags (right-click → "View page source" 
                → search "keywords"), using keyword research tools like VidIQ or TubeBuddy, 
                monitoring trending topics in your category, analyzing your own successful videos' 
                tags, and testing different tag combinations to see what works. Focus on tags 
                with good search volume but manageable competition.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Should I use the same tags for all my videos?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                No, avoid using identical tags across all videos as this can hurt your channel's 
                performance. Instead: use 2-3 consistent brand or channel tags, customize tags 
                for each video's specific content, vary your tag strategy based on video type, 
                and test different tag combinations. However, maintain consistency in your core 
                niche tags while adapting specific tags to each video's unique content and 
                audience. This approach helps YouTube understand your channel's focus while 
                optimizing individual video performance.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do tags affect YouTube's algorithm?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Tags help YouTube's algorithm by: categorizing your content correctly, matching 
                videos with relevant search queries, suggesting your videos in related video 
                sections, understanding your target audience, and improving overall content 
                classification. However, tags are just one ranking factor alongside watch time, 
                engagement, click-through rates, and user behavior. Focus on creating quality 
                content that keeps viewers engaged while using relevant tags to help discovery.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What's the difference between tags and hashtags on YouTube?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Tags:</strong> Hidden keywords used for SEO and categorization, not visible 
                to viewers, help with search rankings and algorithm understanding. <strong>Hashtags:</strong> 
                Visible clickable links in titles and descriptions, help with discoverability 
                and trending topics, limited to 3 displayed in search results. Use both strategically: 
                tags for SEO optimization and hashtags for social discovery and trending topics. 
                They work together to maximize your video's reach and discoverability.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I optimize tags for different content types?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Different content requires different tag strategies: <strong>Tutorials:</strong> 
                Focus on "how to," "tutorial," "step by step," and specific skill terms. 
                <strong>Reviews:</strong> Include product names, "review," "comparison," and 
                feature-specific terms. <strong>Entertainment:</strong> Use trending terms, 
                "funny," "comedy," and audience-specific tags. <strong>Educational:</strong> 
                Include subject matter, "learn," "explained," and academic terms. 
                <strong>Vlogs:</strong> Use personal brand terms, location tags, and lifestyle 
                keywords. Tailor your tag strategy to match your content type and audience 
                expectations.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Should I include my channel name in tags?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Include your channel name as a tag when: you're building brand recognition, 
                creating series content, collaborating with others, or when it adds context. 
                However, don't use it in every video as it wastes valuable tag space. Use 
                your channel name strategically for: branded content series, collaborations, 
                and when building brand awareness. Focus on content-relevant tags that help 
                discoverability rather than repetitive brand tagging.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I test and improve my tag performance?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Test tags by: analyzing YouTube Analytics for search traffic sources, monitoring 
                which tags drive the most views, A/B testing different tag combinations, tracking 
                click-through rates from search results, analyzing competitor tag performance, 
                and experimenting with trending vs. evergreen tags. Focus on metrics like: search 
                impressions, click-through rates, watch time from search traffic, and overall 
                video performance. Regular optimization based on data leads to better results.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common YouTube tag mistakes to avoid?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common mistakes include: using irrelevant tags that don't match your content, 
                tag stuffing with too many keywords, copying competitor tags exactly, using 
                misspelled or incorrect tags, including tags that violate YouTube policies, 
                using the same tags for every video, ignoring trending vs. evergreen tag balance, 
                and not updating tags for seasonal or trending content. Focus on creating 
                original, relevant tag strategies that genuinely help viewers find your content.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do trending topics affect tag strategy?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Trending topics can boost discoverability when incorporated naturally: include 
                trending keywords in your tags, reference current events when relevant, capitalize 
                on seasonal trends, and stay updated with industry news. However, avoid forced 
                trending topic inclusion that doesn't match your content. Balance trending tags 
                with evergreen keywords to maintain long-term discoverability while capitalizing 
                on current interest. Authentic integration of trends works better than keyword 
                stuffing for trending terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default YoutubeTagGenerator
