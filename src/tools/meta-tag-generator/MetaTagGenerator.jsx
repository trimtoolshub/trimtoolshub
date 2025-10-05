import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const MetaTagGenerator = () => {
  const [metaData, setMetaData] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    robots: 'index, follow',
    language: 'en',
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1.0',
    themeColor: '#000000',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '',
    twitterCreator: '',
    canonical: '',
    favicon: '/favicon.ico'
  })
  
  const [generatedTags, setGeneratedTags] = useState('')
  const [tagHistory, setTagHistory] = useState([])

  const handleInputChange = (field, value) => {
    setMetaData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateMetaTags = useCallback(() => {
    const tags = []
    
    // Basic meta tags
    tags.push(`<meta charset="${metaData.charset}">`)
    tags.push(`<meta name="viewport" content="${metaData.viewport}">`)
    tags.push(`<title>${metaData.title}</title>`)
    
    if (metaData.description) {
      tags.push(`<meta name="description" content="${metaData.description}">`)
    }
    
    if (metaData.keywords) {
      tags.push(`<meta name="keywords" content="${metaData.keywords}">`)
    }
    
    if (metaData.author) {
      tags.push(`<meta name="author" content="${metaData.author}">`)
    }
    
    tags.push(`<meta name="robots" content="${metaData.robots}">`)
    tags.push(`<meta name="language" content="${metaData.language}">`)
    
    if (metaData.themeColor) {
      tags.push(`<meta name="theme-color" content="${metaData.themeColor}">`)
    }
    
    // Open Graph tags
    if (metaData.ogTitle || metaData.title) {
      tags.push(`<meta property="og:title" content="${metaData.ogTitle || metaData.title}">`)
    }
    
    if (metaData.ogDescription || metaData.description) {
      tags.push(`<meta property="og:description" content="${metaData.ogDescription || metaData.description}">`)
    }
    
    if (metaData.ogImage) {
      tags.push(`<meta property="og:image" content="${metaData.ogImage}">`)
    }
    
    if (metaData.ogUrl) {
      tags.push(`<meta property="og:url" content="${metaData.ogUrl}">`)
    }
    
    tags.push(`<meta property="og:type" content="${metaData.ogType}">`)
    tags.push(`<meta property="og:site_name" content="${metaData.title}">`)
    
    // Twitter Card tags
    tags.push(`<meta name="twitter:card" content="${metaData.twitterCard}">`)
    
    if (metaData.twitterSite) {
      tags.push(`<meta name="twitter:site" content="${metaData.twitterSite}">`)
    }
    
    if (metaData.twitterCreator) {
      tags.push(`<meta name="twitter:creator" content="${metaData.twitterCreator}">`)
    }
    
    if (metaData.ogTitle || metaData.title) {
      tags.push(`<meta name="twitter:title" content="${metaData.ogTitle || metaData.title}">`)
    }
    
    if (metaData.ogDescription || metaData.description) {
      tags.push(`<meta name="twitter:description" content="${metaData.ogDescription || metaData.description}">`)
    }
    
    if (metaData.ogImage) {
      tags.push(`<meta name="twitter:image" content="${metaData.ogImage}">`)
    }
    
    // Additional SEO tags
    if (metaData.canonical) {
      tags.push(`<link rel="canonical" href="${metaData.canonical}">`)
    }
    
    if (metaData.favicon) {
      tags.push(`<link rel="icon" href="${metaData.favicon}">`)
    }
    
    // Additional meta tags
    tags.push(`<meta name="generator" content="TrimToolsHub Meta Tag Generator">`)
    tags.push(`<meta name="format-detection" content="telephone=no">`)
    
    const htmlOutput = tags.join('\n')
    setGeneratedTags(htmlOutput)

    // Add to history
    const historyItem = {
      title: metaData.title,
      description: metaData.description,
      timestamp: new Date().toISOString(),
      preview: htmlOutput.substring(0, 100) + '...'
    }
    setTagHistory(prev => [historyItem, ...prev.slice(0, 9)])
  }, [metaData])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const clearAll = () => {
    setMetaData({
      title: '',
      description: '',
      keywords: '',
      author: '',
      robots: 'index, follow',
      language: 'en',
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0',
      themeColor: '#000000',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      ogUrl: '',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterSite: '',
      twitterCreator: '',
      canonical: '',
      favicon: '/favicon.ico'
    })
    setGeneratedTags('')
  }

  const clearHistory = () => {
    setTagHistory([])
  }

  const loadFromHistory = (historyItem) => {
    setMetaData(prev => ({
      ...prev,
      title: historyItem.title,
      description: historyItem.description
    }))
  }

  const removeFromHistory = (index) => {
    setTagHistory(prev => prev.filter((_, i) => i !== index))
  }

  const downloadTags = () => {
    const blob = new Blob([generatedTags], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `meta-tags-${metaData.title.replace(/[^a-zA-Z0-9]/g, '-') || 'page'}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getCharacterCount = (text) => {
    return text ? text.length : 0
  }

  const getWordCount = (text) => {
    return text ? text.trim().split(/\s+/).length : 0
  }

  return (
    <div className="tool-container">
      {/* Main Tool Interface */}
      <div className="tool-card">
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-code" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Meta Tag Generator
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
            Generate comprehensive HTML meta tags for your website pages with our advanced Meta Tag 
            Generator that creates SEO-optimized tags including Open Graph and Twitter Card tags. 
            Whether you're building new websites, optimizing existing pages, or ensuring proper 
            social media sharing, our tool generates all essential meta tags following current 
            best practices and industry standards.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Meta Tag Generator includes character counters for title and description fields 
            to help you stay within optimal limits for search engines and social media platforms. 
            The tool generates basic SEO tags, technical settings, Open Graph tags for Facebook 
            and LinkedIn, Twitter Card tags, canonical URLs, and mobile optimization tags.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for web developers, SEO specialists, content creators, and digital marketers 
            who need to optimize their web pages for search engines and social media platforms. 
            The tool helps you create professional meta tag structures that improve search engine 
            rankings, enhance social media sharing, and provide better user experiences.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include real-time character counting, comprehensive tag generation, social 
            media optimization, mobile-friendly tags, export capabilities, generation history, 
            and detailed documentation about meta tag best practices and SEO optimization 
            strategies.
          </p>
        </div>

        {/* Basic Information */}
        <div className="input-section">
          <h3 className="input-title">
            <FontAwesomeIcon icon="fas fa-info-circle" className="title-icon" />
            Basic Information
          </h3>
          <div className="input-grid">
            <div className="input-group">
              <label className="input-label">
                <FontAwesomeIcon icon="fas fa-heading" className="label-icon" />
                Page Title *
              </label>
              <input
                type="text"
                value={metaData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter your page title..."
                className="input-field"
                maxLength={60}
              />
              <div className="input-stats">
                {getCharacterCount(metaData.title)}/60 characters
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                <FontAwesomeIcon icon="fas fa-align-left" className="label-icon" />
                Description *
              </label>
              <textarea
                value={metaData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter your page description..."
                className="input-textarea"
                rows={3}
                maxLength={160}
              />
              <div className="input-stats">
                {getCharacterCount(metaData.description)}/160 characters
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                <FontAwesomeIcon icon="fas fa-tags" className="label-icon" />
                Keywords
              </label>
              <input
                type="text"
                value={metaData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                placeholder="keyword1, keyword2, keyword3..."
                className="input-field"
              />
              <div className="input-stats">
                {getWordCount(metaData.keywords)} keywords
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                <FontAwesomeIcon icon="fas fa-user" className="label-icon" />
                Author
              </label>
              <input
                type="text"
                value={metaData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="Enter author name..."
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Technical Settings */}
        <div className="settings-section">
          <h3 className="settings-title">
            <FontAwesomeIcon icon="fas fa-cogs" className="title-icon" />
            Technical Settings
          </h3>
          <div className="settings-grid">
            <div className="setting-group">
              <label className="setting-label">
                <FontAwesomeIcon icon="fas fa-robot" className="label-icon" />
                Robots
              </label>
              <select
                value={metaData.robots}
                onChange={(e) => handleInputChange('robots', e.target.value)}
                className="setting-select"
              >
                <option value="index, follow">Index, Follow</option>
                <option value="noindex, nofollow">No Index, No Follow</option>
                <option value="index, nofollow">Index, No Follow</option>
                <option value="noindex, follow">No Index, Follow</option>
              </select>
            </div>

            <div className="setting-group">
              <label className="setting-label">
                <FontAwesomeIcon icon="fas fa-language" className="label-icon" />
                Language
              </label>
              <select
                value={metaData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="setting-select"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            <div className="setting-group">
              <label className="setting-label">
                <FontAwesomeIcon icon="fas fa-palette" className="label-icon" />
                Theme Color
              </label>
              <div className="color-input-group">
                <input
                  type="color"
                  value={metaData.themeColor}
                  onChange={(e) => handleInputChange('themeColor', e.target.value)}
                  className="color-input"
                />
                <input
                  type="text"
                  value={metaData.themeColor}
                  onChange={(e) => handleInputChange('themeColor', e.target.value)}
                  className="color-text-input"
                />
              </div>
            </div>

            <div className="setting-group">
              <label className="setting-label">
                <FontAwesomeIcon icon="fas fa-link" className="label-icon" />
                Canonical URL
              </label>
              <input
                type="url"
                value={metaData.canonical}
                onChange={(e) => handleInputChange('canonical', e.target.value)}
                placeholder="https://example.com/page"
                className="setting-input"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="social-section">
          <h3 className="social-title">
            <FontAwesomeIcon icon="fas fa-share-alt" className="title-icon" />
            Social Media (Open Graph & Twitter)
          </h3>
          <div className="social-grid">
            <div className="social-group">
              <label className="social-label">
                <FontAwesomeIcon icon="fab fa-facebook" className="label-icon" />
                OG Title
              </label>
              <input
                type="text"
                value={metaData.ogTitle}
                onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                placeholder="Leave empty to use page title"
                className="social-input"
              />
            </div>

            <div className="social-group">
              <label className="social-label">
                <FontAwesomeIcon icon="fab fa-facebook" className="label-icon" />
                OG Description
              </label>
              <textarea
                value={metaData.ogDescription}
                onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                placeholder="Leave empty to use page description"
                className="social-textarea"
                rows={2}
              />
            </div>

            <div className="social-group">
              <label className="social-label">
                <FontAwesomeIcon icon="fas fa-image" className="label-icon" />
                OG Image URL
              </label>
              <input
                type="url"
                value={metaData.ogImage}
                onChange={(e) => handleInputChange('ogImage', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="social-input"
              />
            </div>

            <div className="social-group">
              <label className="social-label">
                <FontAwesomeIcon icon="fas fa-link" className="label-icon" />
                OG URL
              </label>
              <input
                type="url"
                value={metaData.ogUrl}
                onChange={(e) => handleInputChange('ogUrl', e.target.value)}
                placeholder="https://example.com/page"
                className="social-input"
              />
            </div>

            <div className="social-group">
              <label className="social-label">
                <FontAwesomeIcon icon="fab fa-twitter" className="label-icon" />
                Twitter Site
              </label>
              <input
                type="text"
                value={metaData.twitterSite}
                onChange={(e) => handleInputChange('twitterSite', e.target.value)}
                placeholder="@yourusername"
                className="social-input"
              />
            </div>

            <div className="social-group">
              <label className="social-label">
                <FontAwesomeIcon icon="fab fa-twitter" className="label-icon" />
                Twitter Creator
              </label>
              <input
                type="text"
                value={metaData.twitterCreator}
                onChange={(e) => handleInputChange('twitterCreator', e.target.value)}
                placeholder="@authorusername"
                className="social-input"
              />
            </div>
          </div>
        </div>

        <button onClick={generateMetaTags} className="generate-btn">
          <FontAwesomeIcon icon="fas fa-magic" />
          Generate Meta Tags
        </button>

        {/* Output Section */}
        {generatedTags && (
          <div className="output-section">
            <div className="output-header">
              <h3 className="output-title">
                <FontAwesomeIcon icon="fas fa-check-circle" className="title-icon" />
                Generated Meta Tags
              </h3>
              <div className="output-actions">
                <button onClick={() => copyToClipboard(generatedTags)} className="btn-secondary">
                  <FontAwesomeIcon icon="fas fa-copy" />
                  Copy Tags
                </button>
                <button onClick={downloadTags} className="btn-secondary">
                  <FontAwesomeIcon icon="fas fa-download" />
                  Download HTML
                </button>
              </div>
            </div>
            <div className="output-display">
              <pre className="output-text">{generatedTags}</pre>
            </div>
          </div>
        )}

        {/* Tag History */}
        {tagHistory.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <h3 className="history-title">
                <FontAwesomeIcon icon="fas fa-history" className="title-icon" />
                Generation History
              </h3>
              <button onClick={clearHistory} className="clear-history-btn">
                <FontAwesomeIcon icon="fas fa-trash" />
                Clear History
              </button>
            </div>
            <div className="history-list">
              {tagHistory.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-content" onClick={() => loadFromHistory(item)}>
                    <div className="history-title-text">{item.title}</div>
                    <div className="history-description">{item.description}</div>
                    <div className="history-time">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromHistory(index)}
                    className="remove-history-btn"
                  >
                    <FontAwesomeIcon icon="fas fa-times" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={clearAll} className="btn-secondary">
            <FontAwesomeIcon icon="fas fa-trash" />
            Clear All
          </button>
        </div>
      </div>

      {/* Tool Information */}
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginTop: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          About Meta Tags & SEO Optimization
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are meta tags and why are they important for SEO?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Meta tags are HTML elements that provide metadata about a web page to search engines 
              and browsers. They include the page title, description, keywords, and other information 
              that helps search engines understand and index your content. Meta tags are crucial for 
              SEO because they influence how your pages appear in search results, affect click-through 
              rates, and help search engines understand your content's relevance and purpose.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the optimal length for title and description meta tags?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Title tags:</strong> Keep between 50-60 characters to ensure they display 
              completely in search results. <strong>Meta descriptions:</strong> Aim for 150-160 
              characters for optimal display. While Google can handle longer descriptions, shorter 
              ones are more likely to be displayed in full. Our tool includes real-time character 
              counters to help you stay within these optimal ranges for maximum search engine 
              visibility and user engagement.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the difference between Open Graph and Twitter Card tags?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Open Graph tags:</strong> Used by Facebook, LinkedIn, and other social 
              platforms to display rich previews when your content is shared. They include og:title, 
              og:description, og:image, and og:url. <strong>Twitter Card tags:</strong> Specifically 
              for Twitter, providing enhanced previews with twitter:card, twitter:title, twitter:description, 
              and twitter:image. Both improve social media sharing by providing rich, engaging 
              previews that increase click-through rates and engagement.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do robots meta tags affect search engine crawling?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Robots meta tags control how search engines crawl and index your pages: 
              <strong>index, follow:</strong> Allow crawling and following links (default). 
              <strong>noindex, nofollow:</strong> Prevent indexing and link following. 
              <strong>index, nofollow:</strong> Allow indexing but don't follow links. 
              <strong>noindex, follow:</strong> Prevent indexing but allow link following. 
              Use these tags strategically to control which pages appear in search results 
              and how search engines handle your internal linking structure.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are canonical URLs and why are they important?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Canonical URLs tell search engines which version of a page is the "official" or 
              preferred version when you have duplicate or similar content. This prevents 
              duplicate content issues, consolidates link equity, and ensures search engines 
              index the correct page. Use canonical URLs when you have multiple URLs pointing 
              to the same content, URL parameters creating duplicates, or when syndicating 
              content across multiple sites.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I optimize meta tags for mobile devices?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              For mobile optimization: use responsive viewport meta tags (width=device-width, 
              initial-scale=1.0), set appropriate theme colors for mobile browsers, ensure 
              titles and descriptions are concise for smaller screens, use mobile-friendly 
              Open Graph images (1200x630px recommended), test how your meta tags appear on 
              mobile devices, and consider mobile-specific social media sharing patterns. 
              Our tool includes mobile-optimized defaults and recommendations.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best practices for meta tag keywords?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              While meta keywords are largely ignored by modern search engines, best practices 
              include: use 3-5 relevant keywords maximum, separate keywords with commas, avoid 
              keyword stuffing, focus on semantic keywords related to your content, include 
              long-tail keywords, ensure keywords match your actual content, and prioritize 
              user intent over search volume. Remember that content quality and relevance 
              matter more than meta keywords for SEO success.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I test if my meta tags are working correctly?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              To test meta tags: use browser developer tools to inspect the HTML source, 
              check Google Search Console for indexing and display issues, use social media 
              debugging tools (Facebook Debugger, Twitter Card Validator), validate HTML 
              markup for errors, test how tags appear in search results, verify Open Graph 
              and Twitter Card previews, check mobile responsiveness, and monitor click-through 
              rates from search results to identify optimization opportunities.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the difference between meta tags and structured data?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Meta tags:</strong> Provide basic information about a page (title, description, 
              keywords) in a simple format. <strong>Structured data:</strong> Uses JSON-LD, 
              microdata, or RDFa to provide detailed information about content types, entities, 
              and relationships. While meta tags help with basic SEO and social sharing, structured 
              data enables rich snippets, enhanced search results, and better content understanding 
              by search engines. Both work together to optimize your website's search performance.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How often should I update my meta tags?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Update meta tags when: your content significantly changes, you're targeting new 
              keywords, your brand messaging evolves, you're optimizing for new search trends, 
              you're improving social media sharing, or when analytics show poor performance. 
              Regular audits (quarterly) help ensure meta tags remain relevant and effective. 
              However, avoid frequent changes that might confuse search engines or users. 
              Focus on meaningful updates that improve relevance and performance.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are common meta tag mistakes to avoid?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Common mistakes include: using duplicate titles across pages, writing generic 
              descriptions that don't match content, keyword stuffing in titles or descriptions, 
              ignoring character limits for search result display, using the same meta tags 
              for different pages, forgetting to include social media tags, not testing how 
              tags appear in search results, and neglecting mobile optimization. Always ensure 
              meta tags are unique, relevant, and optimized for both search engines and users.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do meta tags affect social media sharing?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Meta tags significantly impact social media sharing: Open Graph tags control how 
              content appears on Facebook and LinkedIn, Twitter Card tags enhance Twitter 
              sharing, proper images improve visual appeal and engagement, compelling titles 
              and descriptions increase click-through rates, and consistent branding across 
              platforms builds recognition. Well-optimized meta tags can increase social 
              media engagement by 20-30% and improve overall content performance across 
              social platforms.
            </p>
          </div>
        </div>
      </div>

      {/* How to Use */}
      <div className="how-to-card">
        <h3 className="how-to-title">
          <FontAwesomeIcon icon="fas fa-play-circle" className="title-icon" />
          How to Use Meta Tag Generator
        </h3>
        <div className="steps-list">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Fill Basic Information</h4>
              <p>Enter your page title, description, keywords, and author information.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Configure Settings</h4>
              <p>Set technical options like robots, language, theme color, and canonical URL.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Add Social Media Info</h4>
              <p>Configure Open Graph and Twitter Card tags for social media sharing.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Generate & Use</h4>
              <p>Click "Generate Meta Tags" and copy or download the HTML code.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="features-card">
        <h3 className="features-title">
          <FontAwesomeIcon icon="fas fa-star" className="title-icon" />
          Key Features
        </h3>
        <div className="features-grid">
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-search" className="feature-icon" />
            <h4>SEO Optimized</h4>
            <p>Generate all essential meta tags for search engine optimization</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-share-alt" className="feature-icon" />
            <h4>Social Media Ready</h4>
            <p>Include Open Graph and Twitter Card tags for social sharing</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-chart-bar" className="feature-icon" />
            <h4>Character Counters</h4>
            <p>Real-time character counting for optimal SEO and social media limits</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-download" className="feature-icon" />
            <h4>Export Options</h4>
            <p>Copy tags to clipboard or download as HTML file</p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="use-cases-card">
        <h3 className="use-cases-title">
          <FontAwesomeIcon icon="fas fa-lightbulb" className="title-icon" />
          Popular Use Cases
        </h3>
        <div className="use-cases-grid">
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-globe" className="use-case-icon" />
            <h4>Website Development</h4>
            <p>Generate meta tags for new web pages and blog posts</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-chart-line" className="use-case-icon" />
            <h4>SEO Optimization</h4>
            <p>Optimize existing pages with proper meta tag structure</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-share" className="use-case-icon" />
            <h4>Social Media</h4>
            <p>Ensure proper social media sharing with Open Graph tags</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-mobile-alt" className="use-case-icon" />
            <h4>Mobile Optimization</h4>
            <p>Include viewport and theme color tags for mobile devices</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tool-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .tool-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 24px;
          padding: 2rem;
          color: white;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }

        .tool-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .tool-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .tool-icon {
          font-size: 2.5rem;
          opacity: 0.9;
        }

        .tool-title-section {
          flex: 1;
        }

        .tool-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .tool-subtitle {
          font-size: 1.1rem;
          margin: 0.5rem 0 0 0;
          opacity: 0.9;
          font-weight: 300;
        }

        .input-section, .settings-section, .social-section, .output-section, .history-section {
          position: relative;
          z-index: 1;
          margin-bottom: 2rem;
        }

        .input-title, .settings-title, .social-title, .output-title, .history-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .title-icon {
          opacity: 0.8;
        }

        .input-grid, .settings-grid, .social-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }

        .input-group, .setting-group, .social-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-label, .setting-label, .social-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .label-icon {
          opacity: 0.8;
        }

        .input-field, .setting-input, .social-input {
          padding: 0.75rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 0.9rem;
          font-family: inherit;
        }

        .input-field::placeholder, .setting-input::placeholder, .social-input::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .input-field:focus, .setting-input:focus, .social-input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.5);
        }

        .input-textarea, .social-textarea {
          padding: 0.75rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 0.9rem;
          font-family: inherit;
          resize: vertical;
        }

        .input-textarea::placeholder, .social-textarea::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .input-textarea:focus, .social-textarea:focus {
          outline: none;
          border-color: rgba(255,255,255,0.5);
        }

        .setting-select {
          padding: 0.75rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 0.9rem;
          font-family: inherit;
        }

        .setting-select:focus {
          outline: none;
          border-color: rgba(255,255,255,0.5);
        }

        .setting-select option {
          background: #333;
          color: white;
        }

        .color-input-group {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .color-input {
          width: 50px;
          height: 40px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .color-text-input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 0.9rem;
          font-family: inherit;
        }

        .color-text-input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.5);
        }

        .input-stats {
          font-size: 0.8rem;
          opacity: 0.7;
          text-align: right;
        }

        .generate-btn {
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          border: none;
          border-radius: 12px;
          padding: 1rem 2rem;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255,107,107,0.4);
          margin-bottom: 2rem;
        }

        .generate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255,107,107,0.6);
        }

        .output-header, .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .output-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-secondary {
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.3);
          border-color: rgba(255,255,255,0.5);
        }

        .output-display {
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1rem;
          backdrop-filter: blur(10px);
          max-height: 400px;
          overflow-y: auto;
        }

        .output-text {
          color: white;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
          white-space: pre-wrap;
        }

        .clear-history-btn {
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          padding: 0.5rem 1rem;
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .clear-history-btn:hover {
          background: rgba(255,255,255,0.3);
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 1rem;
          backdrop-filter: blur(10px);
        }

        .history-content {
          flex: 1;
          cursor: pointer;
        }

        .history-title-text {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .history-description {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 0.25rem;
        }

        .history-time {
          font-size: 0.8rem;
          opacity: 0.6;
        }

        .remove-history-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          background: #ef4444;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .remove-history-btn:hover {
          transform: scale(1.1);
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .info-card, .how-to-card, .features-card, .use-cases-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .info-title, .how-to-title, .features-title, .use-cases-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
          font-size: 1.25rem;
          font-weight: 600;
        }

        .title-icon {
          color: var(--accent);
        }

        .info-content {
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .info-content p {
          margin-bottom: 1rem;
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .step {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .step-number {
          background: linear-gradient(45deg, var(--accent), #667eea);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .step-content h4 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .step-content p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .features-grid, .use-cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .feature, .use-case {
          text-align: center;
          padding: 1.5rem;
          border-radius: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }

        .feature:hover, .use-case:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .feature-icon, .use-case-icon {
          font-size: 2rem;
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .feature h4, .use-case h4 {
          margin: 0 0 0.75rem 0;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .feature p, .use-case p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .tool-container {
            padding: 1rem;
          }
          
          .input-grid, .settings-grid, .social-grid {
            grid-template-columns: 1fr;
          }
          
          .output-header, .history-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .output-actions {
            flex-wrap: wrap;
          }
          
          .history-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .remove-history-btn {
            align-self: flex-end;
          }
          
          .color-input-group {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  )
}

export default MetaTagGenerator
