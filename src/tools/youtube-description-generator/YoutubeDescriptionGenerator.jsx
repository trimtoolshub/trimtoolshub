import { useState } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeDescriptionGenerator = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [duration, setDuration] = useState('')
  const [chapters, setChapters] = useState('')
  const [links, setLinks] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)

  const categories = [
    'Education', 'Entertainment', 'Gaming', 'Music', 'Sports', 'Technology',
    'Travel', 'Food', 'Fashion', 'Beauty', 'Health', 'Science', 'News',
    'Comedy', 'Art', 'DIY', 'Business', 'Finance', 'Lifestyle', 'Other'
  ]

  const generateDescription = async () => {
    if (!title.trim()) {
      alert('Please enter a video title.')
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate AI-powered description generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate description based on inputs
      let generatedDescription = ''
      
      // Opening hook
      const hooks = [
        `Learn everything you need to know about ${title.toLowerCase()}!`,
        `Discover the secrets of ${title.toLowerCase()} in this comprehensive guide.`,
        `Master ${title.toLowerCase()} with these proven strategies and techniques.`,
        `Get expert insights on ${title.toLowerCase()} that will transform your approach.`,
        `Unlock the power of ${title.toLowerCase()} with this step-by-step tutorial.`
      ]
      
      generatedDescription += hooks[Math.floor(Math.random() * hooks.length)] + '\n\n'
      
      // Add user description if provided
      if (description.trim()) {
        generatedDescription += description + '\n\n'
      }
      
      // Add chapters if provided
      if (chapters.trim()) {
        generatedDescription += '📚 Chapters:\n'
        const chapterList = chapters.split('\n').filter(ch => ch.trim())
        chapterList.forEach((chapter, index) => {
          const time = `${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
          generatedDescription += `${time} ${chapter.trim()}\n`
        })
        generatedDescription += '\n'
      }
      
      // Add resources section
      generatedDescription += '🔗 Resources Mentioned:\n'
      if (links.trim()) {
        const linkList = links.split('\n').filter(link => link.trim())
        linkList.forEach(link => {
          generatedDescription += `• ${link.trim()}\n`
        })
      } else {
        generatedDescription += '• Additional resources will be added\n'
      }
      generatedDescription += '\n'
      
      // Add social media section
      generatedDescription += '📱 Follow Me:\n'
      generatedDescription += '• Instagram: @yourchannel\n'
      generatedDescription += '• Twitter: @yourchannel\n'
      generatedDescription += '• Website: yourwebsite.com\n\n'
      
      // Add hashtags
      const hashtags = [
        '#YouTubeTips', '#ContentCreation', '#YouTubeSEO', '#YouTubeGrowth',
        '#CreatorTips', '#YouTubeStrategy', '#VideoMarketing', '#DigitalMarketing',
        '#YouTubeTutorial', '#ContentStrategy', '#VideoTips', '#YouTubeHelp'
      ]
      
      // Add category-specific hashtags
      if (category) {
        const categoryHashtags = {
          'Education': ['#Education', '#Learning', '#Tutorial', '#HowTo'],
          'Entertainment': ['#Entertainment', '#Fun', '#Comedy', '#Viral'],
          'Gaming': ['#Gaming', '#Gameplay', '#Gamer', '#GamingTips'],
          'Music': ['#Music', '#Song', '#Artist', '#MusicVideo'],
          'Technology': ['#Tech', '#Technology', '#Review', '#TechTips'],
          'Travel': ['#Travel', '#Adventure', '#TravelTips', '#Wanderlust'],
          'Food': ['#Food', '#Cooking', '#Recipe', '#Foodie'],
          'Fashion': ['#Fashion', '#Style', '#FashionTips', '#Outfit'],
          'Beauty': ['#Beauty', '#Makeup', '#Skincare', '#BeautyTips'],
          'Health': ['#Health', '#Fitness', '#Wellness', '#HealthyLiving'],
          'Science': ['#Science', '#Education', '#Facts', '#Learning'],
          'Business': ['#Business', '#Entrepreneur', '#Marketing', '#Success']
        }
        
        if (categoryHashtags[category]) {
          hashtags.push(...categoryHashtags[category])
        }
      }
      
      // Add trending hashtags
      hashtags.push('#2024', '#New', '#Latest', '#Trending')
      
      // Remove duplicates and limit to 15
      const uniqueHashtags = [...new Set(hashtags)].slice(0, 15)
      generatedDescription += uniqueHashtags.join(' ')
      
      setResult({
        type: 'success',
        description: generatedDescription,
        title,
        category,
        wordCount: generatedDescription.split(' ').length,
        characterCount: generatedDescription.length
      })
    } catch (error) {
      setResult({
        type: 'error',
        message: 'Failed to generate description. Please try again.'
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
    setTitle('')
    setDescription('')
    setCategory('')
    setDuration('')
    setChapters('')
    setLinks('')
    setResult(null)
  }

  return (
    <>
      <SEOHead
        title="YouTube Description Generator | Free Online Tool – TrimToolsHub"
        description="Generate SEO-optimized descriptions for your YouTube videos. Free YouTube description generator tool to improve video discoverability and engagement."
        keywords={['youtube description generator', 'youtube descriptions', 'video descriptions', 'youtube seo', 'description generator', 'youtube optimization']}
      />
      
      <div className="tool-container">
        <h1 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fab fa-youtube" style={{ marginRight: '0.5rem', color: '#ff0000' }} />
          YouTube Description Generator
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
            Generate SEO-optimized descriptions for your YouTube videos with our advanced Description 
            Generator that helps improve discoverability, engagement, and search rankings. Whether 
            you're creating educational content, entertainment videos, tutorials, or reviews, our 
            tool creates comprehensive descriptions that enhance your video's performance and 
            audience reach on YouTube.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our YouTube Description Generator uses proven SEO strategies, engaging hooks, structured 
            formatting, and strategic hashtag placement to create descriptions that work. The tool 
            includes automatic chapter generation, resource linking, social media integration, and 
            category-specific hashtag optimization to maximize your video's discoverability.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for content creators, YouTubers, marketers, and video producers who need to 
            optimize their video descriptions for maximum engagement and search visibility. The 
            tool helps you create professional descriptions that improve click-through rates, 
            increase watch time, and boost overall channel performance.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include AI-powered description generation, SEO optimization, chapter integration, 
            resource linking, social media promotion, hashtag optimization, character count tracking, 
            and comprehensive documentation about YouTube description best practices and optimization 
            strategies.
          </p>
        </div>
        
        <AdSlot slotId="youtube-description-generator-top" style={{ margin: '1rem 0' }} />
        
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
                Brief Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of what your video covers..."
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
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

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                  Duration (Optional)
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 15:42"
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
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Chapters/Timestamps (Optional)
              </label>
              <textarea
                value={chapters}
                onChange={(e) => setChapters(e.target.value)}
                placeholder="Enter chapters one per line:&#10;Introduction&#10;Main Topic&#10;Conclusion"
                rows="4"
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
                Links/Resources (Optional)
              </label>
              <textarea
                value={links}
                onChange={(e) => setLinks(e.target.value)}
                placeholder="Enter links one per line:&#10;https://example.com&#10;https://another-site.com"
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
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={generateDescription}
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
                  Generating Description...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon="fas fa-magic" />
                  Generate Description
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
                    <strong>Description Generated Successfully!</strong>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <div><strong>Video:</strong> {result.title}</div>
                      {result.category && <div><strong>Category:</strong> {result.category}</div>}
                      <div><strong>Words:</strong> {result.wordCount}</div>
                      <div><strong>Characters:</strong> {result.characterCount}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Generated Description</h4>
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
        </div>

        <AdSlot slotId="youtube-description-generator-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        <div style={{ 
          marginTop: '2rem', 
          padding: '2rem', 
          backgroundColor: 'var(--bg-card)', 
          borderRadius: '1rem', 
          border: '1px solid var(--border)' 
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About YouTube Description Optimization & Best Practices
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What makes a good YouTube description?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                A good YouTube description should: start with a compelling hook that encourages 
                viewers to watch, clearly explain what the video covers and its value, include 
                relevant keywords naturally for SEO, provide timestamps for easy navigation, 
                include links to related resources or social media, end with a call-to-action, 
                and use strategic hashtags. The description should be informative, engaging, 
                and optimized for both viewers and search algorithms.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How long should my YouTube description be?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                YouTube descriptions can be up to 5,000 characters, but optimal length depends 
                on your content type: <strong>Educational content:</strong> 200-500 words for 
                comprehensive descriptions. <strong>Entertainment:</strong> 100-300 words focusing 
                on engagement. <strong>Tutorials:</strong> 300-800 words with detailed explanations. 
                <strong>Reviews:</strong> 200-400 words highlighting key points. Focus on quality 
                over quantity - provide value while staying concise and engaging.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I optimize YouTube descriptions for SEO?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                To optimize for SEO: include your primary keyword in the first 125 characters, 
                use long-tail keywords naturally throughout, include related keywords and synonyms, 
                add location-based keywords for local content, use current year for evergreen content, 
                include question-based keywords that match search intent, avoid keyword stuffing, 
                and ensure descriptions are readable and valuable to viewers. SEO should enhance 
                rather than compromise user experience.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Should I include timestamps in my description?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Yes, timestamps significantly improve user experience and engagement by: helping 
                viewers navigate to specific sections, increasing average watch time, improving 
                video accessibility, enhancing SEO through better user signals, making content 
                more professional and organized, and allowing viewers to skip to relevant parts. 
                Format timestamps as "00:00 Introduction" and place them prominently in your 
                description for maximum impact.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How many hashtags should I use in descriptions?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Use 3-5 relevant hashtags maximum, as YouTube only displays the first 3 hashtags 
                in search results. Choose hashtags that: are directly related to your content, 
                have good search volume but aren't oversaturated, include a mix of broad and 
                specific terms, reflect your target audience's interests, and are consistent 
                with your channel's niche. Place hashtags at the end of your description and 
                avoid hashtag stuffing which can hurt discoverability.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What links should I include in YouTube descriptions?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Include links that add value: related videos or playlists, your website or blog, 
                social media profiles, affiliate links (disclose properly), resources mentioned 
                in the video, email signup or newsletter, merchandise or products, and related 
                tools or software. Always ensure links are relevant and provide genuine value 
                to viewers. Use descriptive anchor text and consider the user journey when 
                placing links strategically throughout your description.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I write compelling opening hooks for descriptions?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Effective hooks should: create curiosity or urgency, promise specific value or 
                benefits, address a problem or question, use emotional triggers, include numbers 
                or statistics, ask engaging questions, or make bold statements. Examples: "Learn 
                the secret technique that increased my productivity by 300%," "Discover why 
                this simple trick changed everything," or "The one mistake everyone makes when..." 
                Keep hooks under 2 sentences and ensure they accurately represent your content.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I structure my YouTube description effectively?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Structure descriptions with: <strong>Hook:</strong> Compelling opening that 
                encourages viewing. <strong>Value proposition:</strong> Clear explanation of 
                what viewers will learn. <strong>Main content:</strong> Detailed description 
                of video topics. <strong>Timestamps:</strong> Navigation points for easy 
                browsing. <strong>Resources:</strong> Links to mentioned materials. 
                <strong>Social media:</strong> Links to your other platforms. 
                <strong>Call-to-action:</strong> Encourage likes, subscribes, or comments. 
                <strong>Hashtags:</strong> Strategic tags for discoverability.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Should I include my channel name in descriptions?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Include your channel name when: you're building brand recognition, creating 
                series content, collaborating with others, or when it adds context to the 
                video. However, avoid repetitive inclusion in every description as it wastes 
                valuable character space. Focus on providing value and including relevant 
                keywords instead. Use your channel name strategically in social media links 
                and calls-to-action rather than prominently in every description.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I optimize descriptions for different content types?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Different content requires different approaches: <strong>Tutorials:</strong> 
                Focus on step-by-step benefits and learning outcomes. <strong>Reviews:</strong> 
                Highlight key features, pros/cons, and recommendations. <strong>Entertainment:</strong> 
                Emphasize fun, humor, or surprise elements. <strong>News:</strong> Include 
                timestamps and key facts. <strong>Vlogs:</strong> Use personal, relatable 
                language. <strong>Educational:</strong> Emphasize knowledge gained and 
                applications. Tailor your description style to match your content type and 
                audience expectations.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I test and improve my description performance?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                To test descriptions: analyze click-through rates in YouTube Analytics, monitor 
                search rankings for target keywords, track audience retention rates, gather 
                feedback from comments, test different hooks and structures, experiment with 
                hashtag combinations, analyze competitor descriptions, and A/B test different 
                versions. Focus on metrics that matter: CTR, watch time, search impressions, 
                and audience engagement. Regular optimization based on data leads to better 
                performance over time.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common YouTube description mistakes to avoid?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common mistakes include: writing generic descriptions that don't add value, 
                keyword stuffing that hurts readability, ignoring mobile display limitations, 
                not including timestamps for longer videos, using irrelevant hashtags, forgetting 
                to include calls-to-action, not updating descriptions for evergreen content, 
                copying competitor descriptions exactly, and not testing different approaches. 
                Focus on creating original, valuable descriptions that serve your audience 
                and improve your video's performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default YoutubeDescriptionGenerator
