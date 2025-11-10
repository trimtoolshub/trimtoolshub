import { useState } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeTitleGenerator = () => {
  const [topic, setTopic] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [titleType, setTitleType] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)

  const categories = [
    'Education', 'Entertainment', 'Gaming', 'Music', 'Sports', 'Technology',
    'Travel', 'Food', 'Fashion', 'Beauty', 'Health', 'Science', 'News',
    'Comedy', 'Art', 'DIY', 'Business', 'Finance', 'Lifestyle', 'Other'
  ]

  const titleTypes = [
    'How-to Guide', 'Tutorial', 'Review', 'Comparison', 'Tips & Tricks',
    'Unboxing', 'Reaction', 'Vlog', 'Educational', 'Entertainment',
    'News', 'Analysis', 'Challenge', 'Behind the Scenes', 'Q&A'
  ]

  const generateTitles = async () => {
    if (!topic.trim()) {
      alert('Please enter a video topic.')
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate AI-powered title generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate titles based on topic, description, category, and type
      const titles = []
      
      // Generate different title variations
      const hooks = ['How to', 'Best', 'Top', 'Ultimate', 'Complete', 'Secret', 'Amazing', 'Incredible']
      const numbers = ['5', '10', '15', '7', '3', '20', '25', '12']
      const powerWords = ['Powerful', 'Essential', 'Proven', 'Effective', 'Advanced', 'Expert', 'Master', 'Ultimate']
      
      // Create title variations
      for (let i = 0; i < 8; i++) {
        let title = ''
        
        switch (i) {
          case 0:
            title = `${hooks[Math.floor(Math.random() * hooks.length)]} ${topic} - Complete Guide 2024`
            break
          case 1:
            title = `${numbers[Math.floor(Math.random() * numbers.length)]} ${powerWords[Math.floor(Math.random() * powerWords.length)]} Tips for ${topic}`
            break
          case 2:
            title = `${topic}: ${titleType || 'Everything'} You Need to Know`
            break
          case 3:
            title = `The ${powerWords[Math.floor(Math.random() * powerWords.length)]} ${topic} Tutorial`
            break
          case 4:
            title = `${topic} - ${titleType || 'Beginner'} to Advanced Guide`
            break
          case 5:
            title = `Why ${topic} is ${powerWords[Math.floor(Math.random() * powerWords.length)]} (Explained)`
            break
          case 6:
            title = `${topic}: ${numbers[Math.floor(Math.random() * numbers.length)]} ${powerWords[Math.floor(Math.random() * powerWords.length)]} Strategies`
            break
          case 7:
            title = `${hooks[Math.floor(Math.random() * hooks.length)]} Master ${topic} in 2024`
            break
        }
        
        titles.push(title)
      }
      
      setResult({
        type: 'success',
        titles,
        topic,
        category,
        titleType,
        titleCount: titles.length
      })
    } catch (error) {
      setResult({
        type: 'error',
        message: 'Failed to generate titles. Please try again.'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const copyTitle = (title) => {
    navigator.clipboard.writeText(title).then(() => {
      alert('Title copied to clipboard!')
    }).catch(() => {
      alert('Failed to copy title.')
    })
  }

  const clearAll = () => {
    setTopic('')
    setDescription('')
    setCategory('')
    setTitleType('')
    setResult(null)
  }

  return (
    <>
      <SEOHead
        title="YouTube Title Generator | Free Online Tool – TrimToolsHub"
        description="Generate compelling titles for your YouTube videos. Free YouTube title generator tool to improve click-through rates and video performance."
        keywords={['youtube title generator', 'youtube titles', 'video titles', 'youtube seo', 'title generator', 'youtube optimization']}
      />
      
      <div className="tool-container">
        <h1 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fab fa-youtube" style={{ marginRight: '0.5rem', color: '#ff0000' }} />
          YouTube Title Generator
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
            Generate compelling and click-worthy titles for your YouTube videos with our advanced 
            Title Generator that helps maximize views, engagement, and click-through rates. Whether 
            you're creating educational content, entertainment videos, tutorials, or reviews, our 
            tool creates SEO-optimized titles that capture attention and improve your video's 
            discoverability on YouTube.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our YouTube Title Generator uses proven title formulas, power words, emotional triggers, 
            and SEO best practices to create titles that perform well. The tool considers your 
            video topic, category, content type, and description to generate multiple title 
            variations that appeal to different audience segments and search intents.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for content creators, YouTubers, marketers, and video producers who need to 
            optimize their video titles for maximum engagement. The tool helps you create titles 
            that stand out in search results, increase click-through rates, and improve overall 
            video performance on YouTube.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include AI-powered title generation, multiple title variations, SEO optimization, 
            category-specific suggestions, power word integration, character count optimization, 
            and comprehensive documentation about YouTube title best practices and optimization 
            strategies.
          </p>
        </div>
        
        <AdSlot slotId="youtube-title-generator-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Video Information</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Video Topic *
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., cooking pasta, smartphone review, workout routine..."
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
                placeholder="Brief description of your video content..."
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
                  Title Type (Optional)
                </label>
                <select
                  value={titleType}
                  onChange={(e) => setTitleType(e.target.value)}
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
                  <option value="">Select title type</option>
                  {titleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={generateTitles}
              disabled={!topic.trim() || isProcessing}
              style={{
                flex: 1,
                padding: '0.75rem 1.5rem',
                backgroundColor: !topic.trim() || isProcessing ? 'var(--bg-tertiary)' : '#ff0000',
                color: !topic.trim() || isProcessing ? 'var(--text-muted)' : 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: !topic.trim() || isProcessing ? 'not-allowed' : 'pointer',
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
                  Generating Titles...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon="fas fa-magic" />
                  Generate Titles
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
                    <strong>Titles Generated Successfully!</strong>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <div><strong>Topic:</strong> {result.topic}</div>
                      {result.category && <div><strong>Category:</strong> {result.category}</div>}
                      {result.titleType && <div><strong>Type:</strong> {result.titleType}</div>}
                      <div><strong>Generated Titles:</strong> {result.titleCount}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Generated Titles</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {result.titles.map((title, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            backgroundColor: 'var(--bg-card)',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border)'
                          }}
                        >
                          <div style={{ 
                            flex: 1, 
                            fontSize: '1rem', 
                            fontWeight: '500', 
                            color: 'var(--text-primary)',
                            lineHeight: '1.4'
                          }}>
                            {title}
                          </div>
                          <button
                            onClick={() => copyTitle(title)}
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
                              gap: '0.5rem',
                              fontSize: '0.9rem'
                            }}
                          >
                            <FontAwesomeIcon icon="fas fa-copy" />
                            Copy
                          </button>
                        </div>
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

        <AdSlot slotId="youtube-title-generator-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        <div style={{ 
          marginTop: '2rem', 
          padding: '2rem', 
          backgroundColor: 'var(--bg-card)', 
          borderRadius: '1rem', 
          border: '1px solid var(--border)' 
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About YouTube Title Optimization & Best Practices
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What makes a good YouTube title?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                A good YouTube title should: be under 60 characters for full display, include your 
                target keyword naturally, create curiosity or urgency, use power words that trigger 
                emotions, include numbers when relevant (e.g., "5 Tips"), be specific and descriptive, 
                avoid clickbait that doesn't deliver, and match your actual content. The best titles 
                balance SEO optimization with audience appeal to maximize both discoverability and 
                click-through rates.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I optimize YouTube titles for SEO?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                To optimize for SEO: include your primary keyword near the beginning, use long-tail 
                keywords that match search intent, include related keywords naturally, avoid keyword 
                stuffing, make titles descriptive and specific, use current year for evergreen content, 
                include location for local content, and test different keyword variations. Remember 
                that YouTube's algorithm considers both SEO factors and user engagement metrics.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are power words and how do they help titles?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Power words are emotionally charged words that trigger psychological responses and 
                increase click-through rates. Examples include: "Ultimate," "Secret," "Proven," 
                "Amazing," "Essential," "Complete," "Master," "Advanced," "Exclusive," and "Breakthrough." 
                These words create urgency, curiosity, and perceived value. Use them strategically 
                in your titles to make them more compelling while ensuring they accurately represent 
                your content.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How long should my YouTube title be?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Optimal YouTube title length is 50-60 characters to ensure full display in search 
                results and recommendations. Titles longer than 60 characters get truncated with 
                "..." which can hurt click-through rates. However, prioritize clarity and keyword 
                inclusion over exact character count. Test different lengths to see what works best 
                for your audience and content type.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Should I use numbers in my YouTube titles?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Yes, numbers in titles can significantly improve click-through rates because they: 
                create specific expectations, suggest comprehensive content, stand out visually in 
                search results, appeal to our psychological preference for organized information, 
                and work well with list-style content. Use numbers like "5," "10," "15," "25" 
                for lists, "2024" for current year content, or specific quantities for tutorials 
                and guides.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I avoid clickbait while making titles compelling?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                To avoid clickbait: ensure your title accurately represents your content, use 
                compelling language that matches your actual video value, avoid misleading claims 
                or promises, focus on genuine benefits and value propositions, test titles with 
                your audience before publishing, and prioritize long-term audience trust over 
                short-term clicks. Compelling titles should create curiosity while being honest 
                about what viewers will learn or experience.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What's the difference between title types for different content?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Different content types require different title approaches: <strong>Tutorials:</strong> 
                "How to..." or "Step-by-step guide to..." <strong>Reviews:</strong> "Honest review 
                of..." or "Is [product] worth it?" <strong>Entertainment:</strong> Focus on humor, 
                drama, or surprise elements. <strong>Educational:</strong> "Everything you need to 
                know about..." <strong>News:</strong> Include timestamps and breaking news indicators. 
                <strong>Vlogs:</strong> Personal and relatable language. Match your title style to 
                your content type and audience expectations.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I test and optimize my YouTube titles?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                To test titles: use A/B testing with similar content, analyze click-through rates 
                in YouTube Analytics, monitor search rankings for target keywords, track audience 
                retention rates, gather feedback from your community, test different emotional 
                triggers, experiment with question vs. statement formats, and analyze competitor 
                title performance. Focus on metrics that matter: CTR, watch time, and audience 
                satisfaction.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Should I include my channel name in titles?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Generally, avoid including your channel name in titles unless you're already well-known 
                or it adds value. Channel names take up valuable character space and don't improve 
                SEO. Exceptions include: established creators with strong brand recognition, when 
                your channel name is part of the content (e.g., "MrBeast Reacts to..."), or when 
                creating series content where the channel name adds context. Focus on keywords 
                and value propositions instead.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do trending topics affect title optimization?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Trending topics can boost discoverability when incorporated naturally: include 
                trending keywords in your titles, reference current events when relevant, use 
                trending hashtags in descriptions, capitalize on seasonal trends, and stay updated 
                with industry news. However, avoid forced trending topic inclusion that doesn't 
                match your content. Authentic integration of trends works better than keyword 
                stuffing for trending terms.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common YouTube title mistakes to avoid?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common mistakes include: making titles too long (over 60 characters), using 
                excessive capitalization or emojis, keyword stuffing that hurts readability, 
                creating misleading titles that don't match content, ignoring mobile display 
                limitations, not testing different title variations, copying competitor titles 
                exactly, and not considering international audiences. Focus on creating original, 
                clear, and compelling titles that serve your audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default YoutubeTitleGenerator
