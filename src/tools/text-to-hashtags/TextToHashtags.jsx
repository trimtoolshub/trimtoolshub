import { useState, useCallback, useEffect } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const TextToHashtags = () => {
  const [inputText, setInputText] = useState('')
  const [hashtags, setHashtags] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [options, setOptions] = useState({
    includeNumbers: true,
    includeSpecialChars: false,
    maxLength: 30,
    minLength: 2,
    removeCommonWords: true,
    sortByLength: false,
    sortAlphabetically: false,
    capitalizeFirst: true
  })

  const sampleText = "Beautiful sunset over the mountains with amazing colors and peaceful atmosphere"

  const commonWords = [
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his',
    'her', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 'theirs'
  ]

  const generateHashtags = useCallback(async () => {
    if (!inputText.trim()) {
      return
    }

    setIsProcessing(true)

    try {
      // Extract words from text
      const words = inputText
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ') // Remove punctuation
        .split(/\s+/)
        .filter(word => word.length >= options.minLength)

      // Remove common words if option is enabled
      let filteredWords = words
      if (options.removeCommonWords) {
        filteredWords = words.filter(word => !commonWords.includes(word))
      }

      // Generate hashtags
      const generatedHashtags = []
      
      // Single word hashtags
      filteredWords.forEach(word => {
        if (word.length <= options.maxLength) {
          const hashtag = options.capitalizeFirst 
            ? word.charAt(0).toUpperCase() + word.slice(1)
            : word
          generatedHashtags.push(`#${hashtag}`)
        }
      })

      // Two-word combinations
      for (let i = 0; i < filteredWords.length - 1; i++) {
        const combination = `${filteredWords[i]}${filteredWords[i + 1]}`
        if (combination.length <= options.maxLength) {
          const hashtag = options.capitalizeFirst 
            ? combination.charAt(0).toUpperCase() + combination.slice(1)
            : combination
          generatedHashtags.push(`#${hashtag}`)
        }
      }

      // Three-word combinations (if space allows)
      for (let i = 0; i < filteredWords.length - 2; i++) {
        const combination = `${filteredWords[i]}${filteredWords[i + 1]}${filteredWords[i + 2]}`
        if (combination.length <= options.maxLength) {
          const hashtag = options.capitalizeFirst 
            ? combination.charAt(0).toUpperCase() + combination.slice(1)
            : combination
          generatedHashtags.push(`#${hashtag}`)
        }
      }

      // Remove duplicates
      const uniqueHashtags = [...new Set(generatedHashtags)]

      // Sort hashtags
      let sortedHashtags = uniqueHashtags
      if (options.sortAlphabetically) {
        sortedHashtags = uniqueHashtags.sort((a, b) => a.localeCompare(b))
      } else if (options.sortByLength) {
        sortedHashtags = uniqueHashtags.sort((a, b) => a.length - b.length)
      }

      setHashtags(sortedHashtags)
    } catch (error) {
      console.error('Error generating hashtags:', error)
    } finally {
      setIsProcessing(false)
    }
  }, [inputText, options])

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handleOptionChange = (option, value) => {
    setOptions(prev => ({
      ...prev,
      [option]: value
    }))
  }

  const loadSample = () => {
    setInputText(sampleText)
  }

  const clearInput = () => {
    setInputText('')
    setHashtags([])
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const copyAllHashtags = () => {
    const hashtagText = hashtags.join(' ')
    copyToClipboard(hashtagText)
  }

  // Auto-generate when input or options change
  useEffect(() => {
    if (inputText.trim()) {
      generateHashtags()
    }
  }, [inputText, options, generateHashtags])

  return (
    <>
      <SEOHead
        title="Text to Hashtags Generator - Convert Text to Social Media Hashtags"
        description="Convert any text into relevant hashtags for social media platforms. Generate trending hashtags with customizable options for Instagram, Twitter, TikTok, and more."
        canonical="/tools/text-to-hashtags"
        keywords={['hashtags', 'generator', 'social media', 'instagram', 'twitter', 'tiktok', 'trending', 'converter']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'Text to Hashtags Generator',
          description: 'Convert text into relevant hashtags for social media platforms',
          url: 'https://www.trimtoolshub.com/tools/text-to-hashtags',
          applicationCategory: 'SocialMediaApplication',
          operatingSystem: 'Web Browser'
        }}
      />

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-hashtag" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Text to Hashtags Generator
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
            Convert any text into relevant hashtags for social media platforms with our Text to Hashtags Generator. 
            Whether you're creating content for Instagram, Twitter, TikTok, LinkedIn, or other social platforms, 
            our tool analyzes your text and generates trending hashtags to boost your reach and engagement.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Text to Hashtags Generator offers intelligent hashtag creation including single-word hashtags, 
            multi-word combinations, common word filtering, length optimization, and sorting options. Perfect for 
            content creators, social media managers, marketers, and anyone looking to maximize their social media presence.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive hashtag generation including: <strong>Smart Extraction:</strong> 
            Analyze text to identify key terms and concepts. <strong>Multi-word Combinations:</strong> 
            Create hashtags from word combinations and phrases. <strong>Length Optimization:</strong> 
            Generate hashtags within platform-specific character limits. <strong>Common Word Filtering:</strong> 
            Remove generic words to focus on meaningful hashtags. <strong>Sorting Options:</strong> 
            Sort hashtags alphabetically or by length. <strong>Platform Optimization:</strong> 
            Generate hashtags optimized for different social media platforms.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include smart extraction, multi-word combinations, length optimization, common word filtering, 
            sorting options, platform optimization, and comprehensive documentation about hashtag strategy 
            and social media best practices.
          </p>
        </div>
        
        <AdSlot slotId="text-to-hashtags-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Enter Text</h3>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type or paste your text here to generate hashtags..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '1rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={loadSample}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-file-alt" />
                Load Sample
              </button>
              
              <button
                onClick={clearInput}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-trash" />
                Clear
              </button>
            </div>
          </div>

          {/* Options */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Hashtag Options</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem' 
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  cursor: 'pointer',
                  marginBottom: '0.5rem'
                }}>
                  <input
                    type="checkbox"
                    checked={options.removeCommonWords}
                    onChange={(e) => handleOptionChange('removeCommonWords', e.target.checked)}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <span style={{ color: 'var(--text-primary)' }}>
                    <FontAwesomeIcon icon="fas fa-filter" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                    Remove Common Words
                  </span>
                </label>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  cursor: 'pointer',
                  marginBottom: '0.5rem'
                }}>
                  <input
                    type="checkbox"
                    checked={options.capitalizeFirst}
                    onChange={(e) => handleOptionChange('capitalizeFirst', e.target.checked)}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <span style={{ color: 'var(--text-primary)' }}>
                    <FontAwesomeIcon icon="fas fa-text-height" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                    Capitalize First Letter
                  </span>
                </label>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  cursor: 'pointer',
                  marginBottom: '0.5rem'
                }}>
                  <input
                    type="checkbox"
                    checked={options.sortAlphabetically}
                    onChange={(e) => handleOptionChange('sortAlphabetically', e.target.checked)}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <span style={{ color: 'var(--text-primary)' }}>
                    <FontAwesomeIcon icon="fas fa-sort-alpha-down" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                    Sort Alphabetically
                  </span>
                </label>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  cursor: 'pointer',
                  marginBottom: '0.5rem'
                }}>
                  <input
                    type="checkbox"
                    checked={options.sortByLength}
                    onChange={(e) => handleOptionChange('sortByLength', e.target.checked)}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <span style={{ color: 'var(--text-primary)' }}>
                    <FontAwesomeIcon icon="fas fa-sort-amount-down" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                    Sort by Length
                  </span>
                </label>
              </div>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem',
              marginTop: '1rem'
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}>
                  Max Length:
                </label>
                <input
                  type="number"
                  value={options.maxLength}
                  onChange={(e) => handleOptionChange('maxLength', parseInt(e.target.value))}
                  min="5"
                  max="50"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}>
                  Min Length:
                </label>
                <input
                  type="number"
                  value={options.minLength}
                  onChange={(e) => handleOptionChange('minLength', parseInt(e.target.value))}
                  min="1"
                  max="10"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>
          </div>

          {hashtags.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-hashtag" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Generated Hashtags ({hashtags.length})
                </h3>
                <button
                  onClick={copyAllHashtags}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FontAwesomeIcon icon="fas fa-copy" />
                  Copy All
                </button>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                minHeight: '100px',
                alignItems: 'flex-start',
                alignContent: 'flex-start'
              }}>
                {hashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    onClick={() => copyToClipboard(hashtag)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: 'var(--accent)',
                      color: 'white',
                      borderRadius: '0.25rem',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#059669'
                      e.target.style.transform = 'scale(1.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'var(--accent)'
                      e.target.style.transform = 'scale(1)'
                    }}
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Platform Recommendations */}
          {hashtags.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-share-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Platform Recommendations
              </h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1rem' 
              }}>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#E4405F',
                  borderRadius: '0.5rem',
                  color: 'white'
                }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>
                    <FontAwesomeIcon icon="fab fa-instagram" style={{ marginRight: '0.5rem' }} />
                    Instagram
                  </h4>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>
                    Use 5-10 hashtags. Mix popular and niche hashtags for better reach.
                  </p>
                </div>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#1DA1F2',
                  borderRadius: '0.5rem',
                  color: 'white'
                }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>
                    <FontAwesomeIcon icon="fab fa-twitter" style={{ marginRight: '0.5rem' }} />
                    Twitter
                  </h4>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>
                    Use 1-2 hashtags. Keep them relevant and trending.
                  </p>
                </div>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#000000',
                  borderRadius: '0.5rem',
                  color: 'white'
                }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>
                    <FontAwesomeIcon icon="fab fa-tiktok" style={{ marginRight: '0.5rem' }} />
                    TikTok
                  </h4>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>
                    Use 3-5 hashtags. Focus on trending and niche hashtags.
                  </p>
                </div>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#0077B5',
                  borderRadius: '0.5rem',
                  color: 'white'
                }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>
                    <FontAwesomeIcon icon="fab fa-linkedin" style={{ marginRight: '0.5rem' }} />
                    LinkedIn
                  </h4>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>
                    Use 3-5 professional hashtags. Focus on industry-specific terms.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <AdSlot slotId="text-to-hashtags-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Hashtag Strategy & Social Media Optimization
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What makes a good hashtag strategy for social media?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Effective hashtag strategies include: <strong>Relevance:</strong> 
                Use hashtags that directly relate to your content and audience. <strong>Mix of Popularity:</strong> 
                Combine trending hashtags with niche-specific ones. <strong>Platform Optimization:</strong> 
                Adapt hashtag count and style for each platform. <strong>Brand Consistency:</strong> 
                Use consistent branded hashtags across campaigns. <strong>Research-Based:</strong> 
                Analyze competitor hashtags and trending topics. <strong>Performance Tracking:</strong> 
                Monitor hashtag performance and adjust strategy accordingly.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How many hashtags should I use on different platforms?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Platform-specific recommendations: <strong>Instagram:</strong> 
                Use 5-10 hashtags for optimal reach and engagement. <strong>Twitter:</strong> 
                Use 1-2 hashtags to avoid cluttering your tweet. <strong>TikTok:</strong> 
                Use 3-5 hashtags focusing on trending and niche topics. <strong>LinkedIn:</strong> 
                Use 3-5 professional hashtags relevant to your industry. <strong>Facebook:</strong> 
                Use 1-2 hashtags as they're less effective on this platform. <strong>Pinterest:</strong> 
                Use 2-5 hashtags in descriptions for better discoverability.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the different types of hashtags and when to use them?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Hashtag types include: <strong>Branded Hashtags:</strong> 
                Unique to your brand for campaign tracking and community building. <strong>Community Hashtags:</strong> 
                Connect with specific communities and audiences. <strong>Trending Hashtags:</strong> 
                Popular hashtags that can increase visibility but may have high competition. <strong>Niche Hashtags:</strong> 
                Specific to your industry or topic for targeted reach. <strong>Location Hashtags:</strong> 
                Geographic hashtags for local businesses and events. <strong>Event Hashtags:</strong> 
                Specific to conferences, campaigns, or special occasions.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I optimize hashtags for better engagement?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Optimization strategies include: <strong>Research Trending Topics:</strong> 
                Stay updated with trending hashtags in your industry. <strong>Analyze Competitors:</strong> 
                Study successful hashtags used by competitors and industry leaders. <strong>Use Analytics:</strong> 
                Track hashtag performance using platform analytics tools. <strong>Test Different Combinations:</strong> 
                Experiment with different hashtag mixes to find what works. <strong>Engage with Hashtag Communities:</strong> 
                Actively participate in conversations around relevant hashtags. <strong>Create Branded Hashtags:</strong> 
                Develop unique hashtags that represent your brand identity.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common hashtag mistakes to avoid?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common mistakes include: <strong>Overusing Hashtags:</strong> 
                Using too many hashtags can appear spammy and reduce engagement. <strong>Irrelevant Hashtags:</strong> 
                Using hashtags that don't relate to your content confuses your audience. <strong>Ignoring Platform Differences:</strong> 
                Using the same hashtag strategy across all platforms without optimization. <strong>Not Researching:</strong> 
                Using hashtags without understanding their meaning or audience. <strong>Copying Competitors:</strong> 
                Blindly copying hashtags without considering your unique value proposition. <strong>Not Tracking Performance:</strong> 
                Failing to monitor which hashtags drive the most engagement and reach.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I measure hashtag success and ROI?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Measurement strategies include: <strong>Reach Metrics:</strong> 
                Track how many people see your content through hashtags. <strong>Engagement Rates:</strong> 
                Monitor likes, comments, shares, and saves on hashtagged posts. <strong>Follower Growth:</strong> 
                Measure new followers gained through hashtag discovery. <strong>Click-Through Rates:</strong> 
                Track clicks on links shared with hashtags. <strong>Brand Mentions:</strong> 
                Monitor when people use your branded hashtags. <strong>Conversion Tracking:</strong> 
                Measure how hashtags contribute to business goals like sales or sign-ups.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TextToHashtags
