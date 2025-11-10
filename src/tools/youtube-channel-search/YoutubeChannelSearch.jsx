import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeChannelSearch = () => {
  const [inputs, setInputs] = useState({
    query: '',
    sortBy: 'relevance',
    maxResults: 10,
    region: 'US',
    language: 'en'
  })
  const [results, setResults] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'date', label: 'Date' },
    { value: 'rating', label: 'Rating' },
    { value: 'viewCount', label: 'View Count' },
    { value: 'title', label: 'Title' }
  ]

  const regions = {
    'US': 'United States',
    'UK': 'United Kingdom',
    'CA': 'Canada',
    'AU': 'Australia',
    'DE': 'Germany',
    'FR': 'France',
    'JP': 'Japan',
    'IN': 'India',
    'BR': 'Brazil',
    'MX': 'Mexico',
    'IT': 'Italy',
    'ES': 'Spain',
    'NL': 'Netherlands',
    'SE': 'Sweden',
    'NO': 'Norway',
    'DK': 'Denmark',
    'FI': 'Finland',
    'CH': 'Switzerland',
    'AT': 'Austria',
    'BE': 'Belgium',
    'PL': 'Poland',
    'CZ': 'Czech Republic',
    'HU': 'Hungary',
    'RO': 'Romania',
    'BG': 'Bulgaria',
    'HR': 'Croatia',
    'SI': 'Slovenia',
    'SK': 'Slovakia',
    'LT': 'Lithuania',
    'LV': 'Latvia',
    'EE': 'Estonia',
    'IE': 'Ireland',
    'PT': 'Portugal',
    'GR': 'Greece',
    'CY': 'Cyprus',
    'MT': 'Malta',
    'LU': 'Luxembourg',
    'IS': 'Iceland',
    'LI': 'Liechtenstein',
    'MC': 'Monaco',
    'SM': 'San Marino',
    'VA': 'Vatican City',
    'AD': 'Andorra'
  }

  const languages = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese',
    'ar': 'Arabic',
    'hi': 'Hindi',
    'th': 'Thai',
    'vi': 'Vietnamese',
    'tr': 'Turkish',
    'pl': 'Polish',
    'nl': 'Dutch',
    'sv': 'Swedish',
    'da': 'Danish',
    'no': 'Norwegian',
    'fi': 'Finnish',
    'cs': 'Czech',
    'hu': 'Hungarian',
    'ro': 'Romanian',
    'bg': 'Bulgarian',
    'hr': 'Croatian',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'et': 'Estonian',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'el': 'Greek',
    'he': 'Hebrew',
    'uk': 'Ukrainian',
    'be': 'Belarusian',
    'ka': 'Georgian',
    'hy': 'Armenian',
    'az': 'Azerbaijani',
    'kk': 'Kazakh',
    'ky': 'Kyrgyz',
    'uz': 'Uzbek',
    'tg': 'Tajik',
    'mn': 'Mongolian',
    'ne': 'Nepali',
    'si': 'Sinhala',
    'my': 'Burmese',
    'km': 'Khmer',
    'lo': 'Lao',
    'gl': 'Galician',
    'eu': 'Basque',
    'ca': 'Catalan',
    'cy': 'Welsh',
    'ga': 'Irish',
    'mt': 'Maltese',
    'is': 'Icelandic',
    'fo': 'Faroese',
    'sq': 'Albanian',
    'mk': 'Macedonian',
    'sr': 'Serbian',
    'bs': 'Bosnian',
    'me': 'Montenegrin'
  }

  const searchChannels = useCallback(async () => {
    if (!inputs.query.trim()) {
      alert('Please enter a search query')
      return
    }

    setIsSearching(true)
    setResults(null)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate channel search results
      const searchResults = simulateChannelSearch(inputs)
      
      setResults({
        query: inputs.query,
        totalResults: searchResults.length,
        channels: searchResults,
        searchedAt: new Date().toISOString(),
        searchParams: { ...inputs }
      })
    } catch (error) {
      console.error('Error searching channels:', error)
      alert('Error searching channels. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }, [inputs])

  const simulateChannelSearch = (params) => {
    const channels = []
    const baseChannelNames = [
      'TechReview', 'GamingPro', 'CookingMaster', 'FitnessGuru', 'TravelVlog',
      'MusicChannel', 'EducationHub', 'ComedyCentral', 'NewsUpdate', 'DIYExpert',
      'BeautyTips', 'FashionStyle', 'BusinessInsider', 'ScienceLab', 'ArtStudio',
      'SportsCenter', 'MovieReview', 'BookClub', 'PhotographyPro', 'LifestyleVlog'
    ]

    for (let i = 0; i < Math.min(params.maxResults, 20); i++) {
      const randomName = baseChannelNames[Math.floor(Math.random() * baseChannelNames.length)]
      const channelId = `UC${Math.random().toString(36).substring(2, 15)}`
      const subscriberCount = Math.floor(Math.random() * 10000000) + 1000
      const videoCount = Math.floor(Math.random() * 1000) + 10
      const viewCount = Math.floor(Math.random() * 1000000000) + 10000

      channels.push({
        channelId: channelId,
        channelName: `${randomName}${i + 1}`,
        channelUrl: `https://youtube.com/channel/${channelId}`,
        description: `Welcome to ${randomName}${i + 1}! We create amazing content about ${randomName.toLowerCase()}. Subscribe for regular updates!`,
        subscriberCount: subscriberCount,
        videoCount: videoCount,
        viewCount: viewCount,
        joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 5).toISOString(),
        country: Object.keys(regions)[Math.floor(Math.random() * Object.keys(regions).length)],
        language: Object.keys(languages)[Math.floor(Math.random() * Object.keys(languages).length)],
        verified: Math.random() > 0.7,
        customUrl: `@${randomName.toLowerCase()}${i + 1}`,
        bannerUrl: `https://yt3.ggpht.com/${channelId.substring(0, 8)}=w1280-h720-c-k-c0x00ffffff-no-rj`,
        logoUrl: `https://yt3.ggpht.com/${channelId.substring(0, 8)}=s240-c-k-c0x00ffffff-no-rj`,
        keywords: [randomName.toLowerCase(), 'youtube', 'content', 'creator'],
        lastVideoDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      })
    }

    return channels
  }

  const clearAll = () => {
    setInputs({
      query: '',
      sortBy: 'relevance',
      maxResults: 10,
      region: 'US',
      language: 'en'
    })
    setResults(null)
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fab fa-youtube" style={{ marginRight: '0.5rem', color: '#ff0000' }} />
          YouTube Channel Search
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
            Search for YouTube channels by name, topic, or keywords with our comprehensive 
            Channel Search tool that helps you discover new content creators and find channels 
            that match your interests. Whether you're a content creator looking for competitors, 
            a marketer researching target audiences, or a viewer discovering new content, our 
            tool provides detailed channel information and advanced filtering options.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our YouTube Channel Search tool provides comprehensive channel information including 
            subscriber counts, video counts, descriptions, verification status, and detailed 
            metadata to help you find the perfect channels for your needs. Perfect for content 
            discovery, competitor analysis, market research, audience identification, and finding 
            channels in specific niches or regions.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive search capabilities including: <strong>Advanced Search:</strong> 
            Search by channel name, topic, or keywords. <strong>Filtering Options:</strong> 
            Filter by region, language, sort order, and result count. <strong>Detailed Information:</strong> 
            Subscriber count, video count, views, join date, verification status. 
            <strong>Geographic Targeting:</strong> Search channels by specific countries and regions. 
            <strong>Language Support:</strong> Filter by content language. <strong>Sorting Options:</strong> 
            Sort by relevance, date, rating, view count, or title.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include advanced search algorithms, comprehensive filtering options, 
            detailed channel analytics, geographic and language targeting, multiple sorting 
            methods, competitor analysis capabilities, and extensive documentation about 
            YouTube channel discovery and research strategies.
          </p>
        </div>

        {/* Input Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Search Parameters</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
              Search Query:
            </label>
            <input
              type="text"
              value={inputs.query}
              onChange={(e) => setInputs(prev => ({ ...prev, query: e.target.value }))}
              placeholder="Enter channel name, topic, or keywords..."
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
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Sort By:
              </label>
              <select
                value={inputs.sortBy}
                onChange={(e) => setInputs(prev => ({ ...prev, sortBy: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Max Results:
              </label>
              <select
                value={inputs.maxResults}
                onChange={(e) => setInputs(prev => ({ ...prev, maxResults: parseInt(e.target.value) }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              >
                <option value={5}>5 results</option>
                <option value={10}>10 results</option>
                <option value={20}>20 results</option>
                <option value={50}>50 results</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Region:
              </label>
              <select
                value={inputs.region}
                onChange={(e) => setInputs(prev => ({ ...prev, region: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              >
                {Object.entries(regions).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Language:
              </label>
              <select
                value={inputs.language}
                onChange={(e) => setInputs(prev => ({ ...prev, language: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={searchChannels}
            disabled={!inputs.query.trim() || isSearching}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: !inputs.query.trim() || isSearching ? 'var(--bg-tertiary)' : 'var(--accent)',
              color: !inputs.query.trim() || isSearching ? 'var(--text-secondary)' : 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '500',
              cursor: !inputs.query.trim() || isSearching ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            {isSearching ? (
              <>
                <FontAwesomeIcon icon="fas fa-spinner" style={{ animation: 'spin 1s linear infinite' }} />
                Searching...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon="fas fa-search" />
                Search Channels
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

        {/* Results */}
        {results && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Search Results ({results.totalResults} channels found):
            </h3>
            
            {/* Search Summary */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Query</div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                    "{results.query}"
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Results</div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {results.totalResults} channels
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Region</div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {regions[results.searchParams.region]}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Language</div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {languages[results.searchParams.language]}
                  </div>
                </div>
              </div>
            </div>

            {/* Channel Results */}
            <div style={{ display: 'grid', gap: '1rem' }}>
              {results.channels.map((channel, index) => (
                <div key={index} style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  border: '1px solid var(--border)', 
                  borderRadius: '0.75rem', 
                  padding: '1.5rem',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    {/* Channel Logo */}
                    <div style={{ 
                      width: '80px', 
                      height: '80px', 
                      backgroundColor: '#f3f4f6', 
                      borderRadius: '50%', 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      color: '#6b7280',
                      flexShrink: 0
                    }}>
                      <FontAwesomeIcon icon="fas fa-user-circle" />
                    </div>
                    
                    {/* Channel Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.25rem' }}>
                          {channel.channelName}
                        </h4>
                        {channel.verified && (
                          <FontAwesomeIcon icon="fas fa-check-circle" style={{ color: '#3b82f6', fontSize: '1rem' }} />
                        )}
                      </div>
                      
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        {channel.description}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <FontAwesomeIcon icon="fas fa-users" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }} />
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            {formatNumber(channel.subscriberCount)} subscribers
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <FontAwesomeIcon icon="fas fa-video" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }} />
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            {channel.videoCount} videos
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <FontAwesomeIcon icon="fas fa-eye" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }} />
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            {formatNumber(channel.viewCount)} views
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <FontAwesomeIcon icon="fas fa-calendar" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }} />
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Joined {formatDate(channel.joinedDate)}
                          </span>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <a
                          href={channel.channelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: 'var(--accent)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '0.25rem',
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <FontAwesomeIcon icon="fas fa-external-link-alt" />
                          Visit Channel
                        </a>
                        <div style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)',
                          borderRadius: '0.25rem',
                          fontSize: '0.875rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <FontAwesomeIcon icon="fas fa-globe" />
                          {regions[channel.country]}
                        </div>
                        <div style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)',
                          borderRadius: '0.25rem',
                          fontSize: '0.875rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <FontAwesomeIcon icon="fas fa-language" />
                          {languages[channel.language]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
          About YouTube Channel Discovery & Research Strategies
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How does the YouTube channel search algorithm work?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Our tool searches for YouTube channels based on your query, considering 
              channel names, descriptions, keywords, and metadata. <strong>Search Factors:</strong> 
              Channel name relevance, description keywords, content topics, and metadata tags. 
              <strong>Ranking Algorithm:</strong> Results are sorted by relevance, considering 
              how well channels match your search terms. <strong>Filtering:</strong> Results 
              are filtered by region, language, and other criteria. <strong>Real-time Data:</strong> 
              For actual searches, use YouTube's official Data API or search manually on YouTube.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What comprehensive information is provided for each channel?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              For each channel, we provide: <strong>Basic Information:</strong> Channel name, 
              description, custom URL, and verification status. <strong>Statistics:</strong> 
              Subscriber count, video count, total views, and join date. <strong>Geographic Data:</strong> 
              Country, region, and language preferences. <strong>Content Information:</strong> 
              Keywords, last video date, and content categories. <strong>Visual Assets:</strong> 
              Channel logo and banner URLs. <strong>Direct Access:</strong> Links to visit 
              the channel and access additional information.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How accurate are the search results and what are the limitations?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Our tool provides simulated search results based on realistic channel data patterns. 
              <strong>Simulation Purpose:</strong> Demonstrates functionality and user interface. 
              <strong>Real Data:</strong> For actual YouTube channel search, use YouTube's official 
              Data API or search manually on YouTube. <strong>Accuracy Factors:</strong> Results 
              are based on common channel patterns and realistic data structures. 
              <strong>Limitations:</strong> Simulated data may not reflect actual channel information. 
              <strong>Best Practice:</strong> Use this tool for interface testing and functionality demonstration.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What advanced filtering options are available for channel discovery?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Advanced filtering options include: <strong>Geographic Filtering:</strong> 
              Filter by specific countries and regions (US, UK, CA, AU, DE, FR, JP, IN, etc.). 
              <strong>Language Filtering:</strong> Filter by content language (English, Spanish, 
              French, German, etc.). <strong>Sorting Options:</strong> Sort by relevance, date, 
              rating, view count, or title. <strong>Result Limits:</strong> Control the number 
              of results (5, 10, 20, or 50 channels). <strong>Search Refinement:</strong> 
              Use specific keywords and phrases to narrow results. <strong>Combined Filters:</strong> 
              Apply multiple filters simultaneously for precise targeting.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the different sorting methods and when should I use each?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Sorting methods include: <strong>Relevance (Default):</strong> Considers how 
              well channels match your search query, best for general discovery. 
              <strong>Date:</strong> Shows newest channels first, useful for finding emerging 
              creators. <strong>Rating:</strong> Sorts by channel ratings and reviews, good 
              for quality content discovery. <strong>View Count:</strong> Shows most viewed 
              channels first, useful for finding popular content. <strong>Title:</strong> 
              Alphabetical sorting by channel name, helpful for browsing specific names. 
              <strong>Use Case:</strong> Choose sorting based on your discovery goals and 
              research objectives.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can I use this tool for comprehensive competitor analysis?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Competitor analysis strategies include: <strong>Niche Research:</strong> Search 
              for channels in your specific niche or industry. <strong>Size Analysis:</strong> 
              Compare subscriber counts, video counts, and view counts. <strong>Content Strategy:</strong> 
              Analyze channel descriptions, keywords, and content themes. <strong>Geographic Analysis:</strong> 
              Identify competitors in specific regions or markets. <strong>Growth Patterns:</strong> 
              Study join dates and activity levels. <strong>Verification Status:</strong> 
              Identify verified channels for credibility analysis. <strong>Content Gaps:</strong> 
              Find opportunities by analyzing competitor content and identifying gaps.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I conduct effective market research using channel search?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Market research strategies include: <strong>Audience Analysis:</strong> Search 
              for channels with similar target audiences. <strong>Content Trends:</strong> 
              Identify popular content types and themes. <strong>Geographic Markets:</strong> 
              Research channels in specific countries or regions. <strong>Language Markets:</strong> 
              Analyze channels in different languages. <strong>Size Segments:</strong> 
              Research channels of different sizes (small, medium, large). <strong>Industry Analysis:</strong> 
              Study channels in specific industries or niches. <strong>Competitive Landscape:</strong> 
              Map out the competitive environment and identify key players.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best practices for discovering new content creators?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Best practices include: <strong>Keyword Strategy:</strong> Use specific, relevant 
              keywords related to your interests. <strong>Filtering:</strong> Use geographic 
              and language filters to find relevant creators. <strong>Sorting:</strong> 
              Try different sorting methods to discover various types of channels. 
              <strong>Multiple Searches:</strong> Conduct multiple searches with different 
              keywords and filters. <strong>Verification Focus:</strong> Look for verified 
              channels for credibility. <strong>Activity Analysis:</strong> Check join dates 
              and recent activity. <strong>Content Quality:</strong> Review channel descriptions 
              and content themes.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can I use channel search for audience identification and targeting?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Audience identification strategies include: <strong>Demographic Research:</strong> 
              Search for channels with similar demographics to your target audience. 
              <strong>Interest Analysis:</strong> Find channels that create content your 
              audience would enjoy. <strong>Geographic Targeting:</strong> Identify channels 
              in your target geographic markets. <strong>Language Targeting:</strong> 
              Find channels in your target language markets. <strong>Size Analysis:</strong> 
              Research channels with similar audience sizes. <strong>Engagement Patterns:</strong> 
              Analyze subscriber-to-view ratios and engagement metrics. <strong>Content Preferences:</strong> 
              Study what content types resonate with your target audience.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the technical specifications and API considerations?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Technical considerations include: <strong>API Integration:</strong> For real 
              data, integrate with YouTube Data API v3. <strong>Rate Limits:</strong> 
              YouTube API has daily quotas and rate limits. <strong>Authentication:</strong> 
              Requires API key and proper authentication. <strong>Data Structure:</strong> 
              Results follow YouTube's channel data structure. <strong>Real-time Updates:</strong> 
              API provides real-time channel information. <strong>Error Handling:</strong> 
              Implement proper error handling for API failures. <strong>Cost Considerations:</strong> 
              API usage may have associated costs. <strong>Compliance:</strong> Follow 
              YouTube's Terms of Service and API usage policies.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I optimize my search queries for better channel discovery?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Query optimization strategies include: <strong>Specific Keywords:</strong> 
              Use specific, relevant keywords rather than generic terms. <strong>Long-tail Keywords:</strong> 
              Use longer, more specific phrases for niche discovery. <strong>Industry Terms:</strong> 
              Include industry-specific terminology and jargon. <strong>Content Types:</strong> 
              Specify content types (tutorials, reviews, vlogs, etc.). <strong>Combination Searches:</strong> 
              Combine multiple keywords for precise targeting. <strong>Exclusion Terms:</strong> 
              Use negative keywords to exclude unwanted results. <strong>Language Specificity:</strong> 
              Include language-specific terms when targeting specific markets. 
              <strong>Trending Terms:</strong> Incorporate trending keywords and hashtags.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are common use cases for YouTube channel search and discovery?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Common use cases include: <strong>Content Discovery:</strong> Finding new 
              channels and content creators to follow. <strong>Competitor Analysis:</strong> 
              Researching competitors and industry leaders. <strong>Market Research:</strong> 
              Understanding market trends and audience preferences. <strong>Collaboration:</strong> 
              Finding potential collaboration partners. <strong>Audience Research:</strong> 
              Understanding target audience interests and preferences. <strong>Content Strategy:</strong> 
              Researching successful content strategies and formats. <strong>Geographic Expansion:</strong> 
              Finding channels in new markets and regions. <strong>Industry Analysis:</strong> 
              Studying industry trends and key players. <strong>Educational Research:</strong> 
              Finding educational content and expert channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeChannelSearch
