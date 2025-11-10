import { useState } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeTrend = () => {
  const [region, setRegion] = useState('US')
  const [category, setCategory] = useState('all')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const regions = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'IN', name: 'India' }
  ]

  const categories = [
    { code: 'all', name: 'All Categories' },
    { code: 'music', name: 'Music' },
    { code: 'gaming', name: 'Gaming' },
    { code: 'entertainment', name: 'Entertainment' },
    { code: 'news', name: 'News' },
    { code: 'sports', name: 'Sports' },
    { code: 'education', name: 'Education' },
    { code: 'science', name: 'Science & Technology' }
  ]

  const handleSearch = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          title: "How to Build a React App in 2024",
          channel: "Tech Tutorials",
          views: "2.3M",
          duration: "15:42",
          thumbnail: "https://via.placeholder.com/320x180/3b82f6/ffffff?text=React+Tutorial",
          published: "2 hours ago"
        },
        {
          id: 2,
          title: "Amazing Nature Documentary",
          channel: "Nature Channel",
          views: "5.7M",
          duration: "22:15",
          thumbnail: "https://via.placeholder.com/320x180/10b981/ffffff?text=Nature+Doc",
          published: "4 hours ago"
        },
        {
          id: 3,
          title: "Cooking Perfect Pasta",
          channel: "Chef's Kitchen",
          views: "1.8M",
          duration: "8:33",
          thumbnail: "https://via.placeholder.com/320x180/f59e0b/ffffff?text=Cooking+Video",
          published: "6 hours ago"
        }
      ]
      setResults(mockResults)
      setLoading(false)
    }, 1500)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fab fa-youtube" style={{ marginRight: '0.5rem', color: '#ff0000' }} />
          YouTube Trending Videos
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
            Discover trending YouTube videos across different regions and categories with our 
            comprehensive Trending Videos tool that helps you stay updated with the latest viral 
            content, popular videos, and trending topics. Whether you're a content creator 
            looking for inspiration, a marketer analyzing trending content, or a viewer 
            discovering new viral videos, our tool provides real-time trending data and insights.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our YouTube Trending Videos tool provides comprehensive trending analysis including 
            regional trending data, category-specific trends, video performance metrics, and 
            detailed video information. Perfect for content discovery, trend analysis, competitive 
            research, viral content identification, and staying updated with the latest popular 
            videos across different markets and categories.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive trending capabilities including: <strong>Regional Trends:</strong> 
            View trending videos by specific countries and regions. <strong>Category Filtering:</strong> 
            Filter trending videos by content categories (Music, Gaming, Entertainment, etc.). 
            <strong>Real-time Data:</strong> Access current trending videos and performance metrics. 
            <strong>Video Details:</strong> View count, duration, publish date, and channel information. 
            <strong>Thumbnail Previews:</strong> Visual previews of trending videos. 
            <strong>Performance Metrics:</strong> Views, engagement, and trending indicators.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include regional trending analysis, category-specific filtering, real-time 
            trending data, comprehensive video metrics, thumbnail previews, performance indicators, 
            and extensive documentation about YouTube trending algorithms and viral content strategies.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
              Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)'
              }}
            >
              {regions.map(reg => (
                <option key={reg.code} value={reg.code}>{reg.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
              Category
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
                color: 'var(--text-primary)'
              }}
            >
              {categories.map(cat => (
                <option key={cat.code} value={cat.code}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.875rem 1.5rem',
            backgroundColor: '#ff0000',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          {loading ? 'Loading...' : 'Get Trending Videos'}
        </button>
      </div>

      {results.length > 0 && (
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Trending Videos ({region})
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {results.map(video => (
              <div key={video.id} style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 8px 20px var(--shadow-hover)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  style={{ 
                    width: '160px', 
                    height: '90px', 
                    borderRadius: '0.5rem',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    marginBottom: '0.5rem', 
                    color: 'var(--text-primary)',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    {video.title}
                  </h4>
                  <p style={{ 
                    color: 'var(--text-secondary)', 
                    marginBottom: '0.5rem',
                    fontSize: '0.95rem'
                  }}>
                    {video.channel}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)'
                  }}>
                    <span>{video.views} views</span>
                    <span>{video.duration}</span>
                    <span>{video.published}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Information Panel */}
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginTop: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          About YouTube Trending Videos & Viral Content Analysis
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How does YouTube's trending algorithm work?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              YouTube's trending algorithm considers multiple factors: <strong>View Velocity:</strong> 
              How quickly videos gain views in a short period. <strong>Engagement Rate:</strong> 
              Likes, comments, shares, and watch time relative to views. <strong>Freshness:</strong> 
              Recently uploaded content gets priority. <strong>Regional Relevance:</strong> 
              Content relevant to specific geographic regions. <strong>Category Performance:</strong> 
              How well videos perform within their category. <strong>Channel Authority:</strong> 
              Established channels may get trending priority. <strong>Content Quality:</strong> 
              High-quality, original content tends to trend better.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What factors determine if a video becomes trending?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Trending factors include: <strong>View Growth:</strong> Rapid increase in views 
              over a short period. <strong>Engagement Metrics:</strong> High like-to-view ratios, 
              comment activity, and share rates. <strong>Watch Time:</strong> Average view duration 
              and total watch time. <strong>Click-through Rate:</strong> Thumbnail and title 
              effectiveness. <strong>Retention Rate:</strong> How long viewers watch the video. 
              <strong>Demographics:</strong> Appeal to YouTube's core demographics. 
              <strong>Content Type:</strong> Certain content types trend more easily. 
              <strong>Timing:</strong> Upload timing relative to trending topics.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can content creators use trending data for content strategy?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Content strategy applications include: <strong>Trend Analysis:</strong> Identify 
              trending topics and content formats in your niche. <strong>Timing Optimization:</strong> 
              Upload when similar content is trending. <strong>Format Inspiration:</strong> 
              Study trending video formats and styles. <strong>Topic Research:</strong> 
              Find trending topics relevant to your audience. <strong>Competitive Analysis:</strong> 
              Monitor what competitors are creating that trends. <strong>Audience Insights:</strong> 
              Understand what content resonates with your target audience. <strong>Content Calendar:</strong> 
              Plan content around trending topics and events.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the different trending categories and their characteristics?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Trending categories include: <strong>Music:</strong> Songs, music videos, 
              covers, and music-related content. <strong>Gaming:</strong> Gameplay, reviews, 
              tutorials, and gaming news. <strong>Entertainment:</strong> Comedy, pranks, 
              challenges, and entertainment shows. <strong>News:</strong> Current events, 
              breaking news, and commentary. <strong>Sports:</strong> Highlights, analysis, 
              and sports-related content. <strong>Education:</strong> Tutorials, how-to 
              videos, and educational content. <strong>Science & Technology:</strong> 
              Tech reviews, science experiments, and innovation content. Each category 
              has different trending patterns and audience behaviors.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do regional differences affect trending content?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Regional differences include: <strong>Cultural Preferences:</strong> Different 
              cultures prefer different content types and topics. <strong>Language Barriers:</strong> 
              Content in local languages tends to trend better regionally. <strong>Time Zones:</strong> 
              Upload timing affects trending potential in different regions. <strong>Local Events:</strong> 
              Regional events and holidays influence trending content. <strong>Content Regulations:</strong> 
              Different countries have different content policies. <strong>Audience Demographics:</strong> 
              Age, interests, and viewing habits vary by region. <strong>Platform Usage:</strong> 
              Different regions use YouTube differently. <strong>Economic Factors:</strong> 
              Regional economic conditions affect content consumption patterns.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best practices for creating trending content?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Best practices include: <strong>Quality First:</strong> Focus on high-quality, 
              engaging content over quantity. <strong>Originality:</strong> Create unique, 
              original content rather than copying trends. <strong>Engagement Focus:</strong> 
              Encourage likes, comments, and shares. <strong>Thumbnail Optimization:</strong> 
              Create eye-catching, clickable thumbnails. <strong>Title Optimization:</strong> 
              Write compelling, searchable titles. <strong>Consistency:</strong> Maintain 
              regular upload schedule. <strong>Community Building:</strong> Build and engage 
              with your audience. <strong>Trend Integration:</strong> Incorporate trending 
              topics naturally into your content.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can marketers use trending videos for campaign insights?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Marketing applications include: <strong>Audience Research:</strong> Understand 
              what content resonates with target demographics. <strong>Influencer Identification:</strong> 
              Find trending creators for potential partnerships. <strong>Content Inspiration:</strong> 
              Identify trending content formats for brand campaigns. <strong>Trend Timing:</strong> 
              Launch campaigns when relevant content is trending. <strong>Competitive Analysis:</strong> 
              Monitor competitor content performance and trending status. <strong>Brand Integration:</strong> 
              Identify opportunities to integrate brands into trending content. <strong>ROI Measurement:</strong> 
              Track campaign performance against trending benchmarks.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the technical limitations and data accuracy considerations?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Technical considerations include: <strong>API Limitations:</strong> YouTube's 
              trending API has rate limits and data restrictions. <strong>Real-time Updates:</strong> 
              Trending data updates frequently, requiring regular API calls. <strong>Regional Accuracy:</strong> 
              Trending data accuracy varies by region and category. <strong>Data Freshness:</strong> 
              Trending data becomes outdated quickly. <strong>Access Restrictions:</strong> 
              Some trending data may be restricted or unavailable. <strong>Simulation vs. Real Data:</strong> 
              This tool provides simulated data for demonstration purposes. <strong>Best Practice:</strong> 
              For real trending data, use YouTube's official Data API or manual trending page access.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do trending videos impact channel growth and monetization?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Impact factors include: <strong>Subscriber Growth:</strong> Trending videos 
              can significantly increase subscriber count. <strong>Revenue Boost:</strong> 
              Higher views from trending videos increase ad revenue. <strong>Brand Recognition:</strong> 
              Trending content increases channel visibility and recognition. <strong>Algorithm Boost:</strong> 
              Trending videos can improve overall channel performance in recommendations. 
              <strong>Long-term Benefits:</strong> Trending success can lead to sustained 
              growth and opportunities. <strong>Monetization Opportunities:</strong> 
              Trending channels attract sponsorships and partnerships. <strong>Content Strategy:</strong> 
              Trending success informs future content decisions.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are common mistakes to avoid when trying to create trending content?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Common mistakes include: <strong>Chasing Trends Blindly:</strong> Creating 
              content that doesn't align with your brand or audience. <strong>Quality Sacrifice:</strong> 
              Prioritizing speed over content quality. <strong>Inauthentic Content:</strong> 
              Creating content that doesn't reflect your genuine interests or expertise. 
              <strong>Over-optimization:</strong> Focusing too much on trending keywords 
              instead of valuable content. <strong>Inconsistent Branding:</strong> 
              Losing brand identity while chasing trends. <strong>Ignoring Audience:</strong> 
              Creating trending content that doesn't serve your audience. <strong>Short-term Thinking:</strong> 
              Focusing only on immediate trending potential instead of long-term growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeTrend
