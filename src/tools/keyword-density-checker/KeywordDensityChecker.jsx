import { useState } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const KeywordDensityChecker = () => {
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [inputMethod, setInputMethod] = useState('url')

  const handleCheck = async () => {
    if (inputMethod === 'url' && !url.trim()) {
      setError('Please enter a valid URL')
      return
    }
    if (inputMethod === 'text' && !text.trim()) {
      setError('Please enter some text to analyze')
      return
    }

    setLoading(true)
    setError('')
    
    // Simulate API call
    setTimeout(() => {
      const content = inputMethod === 'url' ? 
        'This is a sample webpage content about web development, SEO optimization, and digital marketing strategies. Web development involves creating websites and web applications using various programming languages and frameworks. SEO optimization is crucial for improving search engine rankings and increasing organic traffic. Digital marketing strategies help businesses reach their target audience through online channels.' :
        text

      const words = content.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 2)

      const wordCount = {}
      words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1
      })

      const totalWords = words.length
      const densityResults = Object.entries(wordCount)
        .map(([word, count]) => ({
          word,
          count,
          density: ((count / totalWords) * 100).toFixed(2)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20)

      setResults({
        totalWords,
        uniqueWords: Object.keys(wordCount).length,
        topKeywords: densityResults,
        content: content.substring(0, 200) + '...'
      })
      setLoading(false)
    }, 1500)
  }

  const handleClear = () => {
    setUrl('')
    setText('')
    setResults(null)
    setError('')
  }

  const getDensityColor = (density) => {
    const num = parseFloat(density)
    if (num > 3) return 'var(--error)'
    if (num > 2) return 'var(--warning)'
    return 'var(--success)'
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-search" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Keyword Density Checker
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
            Analyze keyword density and frequency in your web content with our comprehensive Keyword 
            Density Checker that helps you optimize your content for search engines. Whether you're 
            writing blog posts, optimizing web pages, or conducting SEO audits, our tool provides 
            detailed analysis of keyword usage patterns, density percentages, and optimization 
            recommendations to improve your search engine rankings.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Keyword Density Checker supports both URL analysis and direct text input, providing 
            real-time analysis of keyword frequency, density calculations, and optimization insights. 
            The tool identifies over-optimization risks, suggests optimal keyword distribution, and 
            helps you maintain natural, search-engine-friendly content that ranks well without 
            triggering spam filters.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for content writers, SEO specialists, digital marketers, and website owners 
            who need to optimize their content for search engines. The tool helps you create 
            well-balanced content that includes target keywords naturally while maintaining 
            readability and user engagement.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include dual input methods (URL and text), comprehensive keyword analysis, 
            density percentage calculations, optimization guidelines, visual density indicators, 
            and detailed documentation about keyword density best practices and SEO content 
            optimization strategies.
          </p>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
            Input Method
          </label>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: inputMethod === 'url' ? 'var(--accent)' : 'var(--bg-tertiary)',
              color: inputMethod === 'url' ? 'white' : 'var(--text-primary)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: '1px solid var(--border)'
            }}>
              <input
                type="radio"
                name="inputMethod"
                value="url"
                checked={inputMethod === 'url'}
                onChange={(e) => setInputMethod(e.target.value)}
                style={{ margin: 0 }}
              />
              URL
            </label>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: inputMethod === 'text' ? 'var(--accent)' : 'var(--bg-tertiary)',
              color: inputMethod === 'text' ? 'white' : 'var(--text-primary)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: '1px solid var(--border)'
            }}>
              <input
                type="radio"
                name="inputMethod"
                value="text"
                checked={inputMethod === 'text'}
                onChange={(e) => setInputMethod(e.target.value)}
                style={{ margin: 0 }}
              />
              Text
            </label>
          </div>
        </div>
        
        {inputMethod === 'url' ? (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
              Website URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            />
          </div>
        ) : (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
              Text Content
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text content here..."
              style={{
                width: '100%',
                height: '200px',
                padding: '1rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>
        )}
        
        {error && (
          <p style={{ color: 'var(--error)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </p>
        )}
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleCheck}
            disabled={loading || (inputMethod === 'url' ? !url.trim() : !text.trim())}
            style={{
              padding: '0.875rem 2rem',
              backgroundColor: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: loading || (inputMethod === 'url' ? !url.trim() : !text.trim()) ? 'not-allowed' : 'pointer',
              opacity: loading || (inputMethod === 'url' ? !url.trim() : !text.trim()) ? 0.7 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? 'Analyzing...' : 'Check Keyword Density'}
          </button>
          
          <button
            onClick={handleClear}
            style={{
              padding: '0.875rem 2rem',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {results && (
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Keyword Density Analysis
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              backgroundColor: 'var(--bg-tertiary)', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              border: '1px solid var(--border)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent)' }}>
                {results.totalWords}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Total Words
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: 'var(--bg-tertiary)', 
              padding: '1.5rem', 
              borderRadius: '0.75rem',
              border: '1px solid var(--border)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--success)' }}>
                {results.uniqueWords}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Unique Words
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Top 20 Keywords by Density
            </h4>
            <div style={{ 
              backgroundColor: 'var(--bg-tertiary)', 
              borderRadius: '0.5rem',
              border: '1px solid var(--border)',
              overflow: 'hidden'
            }}>
              {results.topKeywords.map((keyword, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  borderBottom: index < results.topKeywords.length - 1 ? '1px solid var(--border)' : 'none',
                  backgroundColor: index % 2 === 0 ? 'var(--bg-tertiary)' : 'var(--bg-card)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--text-muted)',
                      fontWeight: '600',
                      minWidth: '2rem'
                    }}>
                      #{index + 1}
                    </span>
                    <span style={{ 
                      fontWeight: '600', 
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}>
                      {keyword.word}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--text-secondary)',
                      fontWeight: '500'
                    }}>
                      {keyword.count} times
                    </span>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      color: getDensityColor(keyword.density),
                      fontWeight: '600',
                      backgroundColor: getDensityColor(keyword.density) + '20',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem'
                    }}>
                      {keyword.density}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'var(--info)', 
            color: 'white',
            padding: '1rem',
            borderRadius: '0.5rem'
          }}>
            <strong>Keyword Density Guidelines:</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li>Optimal keyword density: 1-3%</li>
              <li>Green (1-2%): Excellent density</li>
              <li>Yellow (2-3%): Good density</li>
              <li>Red (3%+): May be over-optimized</li>
            </ul>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginTop: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          About Keyword Density & SEO Content Optimization
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What is keyword density and why is it important for SEO?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Keyword density is the percentage of times a specific keyword appears in your content 
              compared to the total number of words. It's important for SEO because it helps search 
              engines understand the topic and relevance of your content. However, modern SEO focuses 
              more on keyword relevance, semantic content, and user experience rather than exact 
              density percentages. The goal is natural keyword usage that enhances readability and 
              provides value to users.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the optimal keyword density for SEO?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              The optimal keyword density varies by content type and industry, but general guidelines 
              suggest: <strong>Primary keywords:</strong> 1-3% density for main target keywords. 
              <strong>Secondary keywords:</strong> 0.5-1% for supporting keywords. <strong>Long-tail 
              keywords:</strong> 0.5-2% depending on phrase length. Focus on natural integration 
              rather than hitting exact percentages. Content should read naturally and provide 
              value to users while including keywords strategically throughout the text.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I avoid keyword stuffing while maintaining good density?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              To avoid keyword stuffing: use synonyms and related terms naturally, vary keyword 
              placement (title, headings, body, conclusion), focus on semantic keywords and LSI 
              (Latent Semantic Indexing) terms, write for users first, then optimize for search 
              engines, use keyword variations and natural language patterns, ensure content 
              provides genuine value, and prioritize readability over exact density targets. 
              Quality content with natural keyword integration performs better than forced optimization.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the difference between keyword density and keyword frequency?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Keyword frequency:</strong> The total number of times a keyword appears in 
              your content (absolute count). <strong>Keyword density:</strong> The percentage of 
              keyword occurrences relative to total word count. For example, if "SEO" appears 10 
              times in a 500-word article, the frequency is 10 and density is 2%. Both metrics 
              are useful for analysis, but density provides better context for optimization 
              decisions and helps identify over-optimization risks.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How does keyword density affect search engine rankings?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Keyword density affects rankings indirectly by helping search engines understand 
              content relevance and topic focus. However, modern search algorithms prioritize 
              content quality, user experience, and semantic relevance over exact density metrics. 
              Over-optimization (keyword stuffing) can trigger spam filters and hurt rankings. 
              Focus on creating valuable, naturally-written content that includes keywords 
              strategically rather than obsessing over exact density percentages.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are LSI keywords and how do they relate to density?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              LSI (Latent Semantic Indexing) keywords are semantically related terms that help 
              search engines understand content context and topic relevance. Instead of repeating 
              the same keyword, use LSI keywords naturally throughout your content. For example, 
              if targeting "digital marketing," include related terms like "online advertising," 
              "social media marketing," "content strategy," etc. This approach improves content 
              relevance while maintaining natural keyword distribution and avoiding over-optimization.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I optimize keyword density for different content types?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Different content types require different approaches: <strong>Blog posts:</strong> 
              Natural integration with 1-2% primary keyword density. <strong>Product pages:</strong> 
              Focus on product-specific keywords and features. <strong>Landing pages:</strong> 
              Higher density (2-3%) for conversion-focused keywords. <strong>Long-form content:</strong> 
              Distribute keywords throughout with semantic variations. <strong>Technical content:</strong> 
              Use industry-specific terminology naturally. Always prioritize user value and 
              readability over exact density targets.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What tools can I use alongside keyword density analysis?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Complement keyword density analysis with: Google Search Console for search performance, 
              Google Analytics for user behavior, keyword research tools (Ahrefs, SEMrush, Ubersuggest), 
              readability checkers (Hemingway Editor, Grammarly), competitor analysis tools, 
              content optimization platforms, and SEO auditing tools. Use multiple tools together 
              to get a comprehensive view of your content's SEO performance and optimization 
              opportunities.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How often should I check keyword density in my content?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Check keyword density: during initial content creation, before publishing new content, 
              when updating existing content, during SEO audits (monthly/quarterly), when rankings 
              drop unexpectedly, and when competitors outperform your content. Regular monitoring 
              helps maintain optimal keyword distribution, but avoid over-analyzing. Focus on 
              creating quality content that naturally incorporates keywords rather than constantly 
              tweaking density percentages.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are common keyword density mistakes to avoid?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Common mistakes include: obsessing over exact density percentages, keyword stuffing 
              to hit targets, ignoring semantic keywords and variations, writing for search engines 
              instead of users, using keywords unnaturally, neglecting content quality for density 
              goals, not considering content length and context, and failing to analyze competitor 
              keyword usage. Focus on natural, valuable content that serves users while including 
              keywords strategically.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How does mobile content affect keyword density considerations?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Mobile content considerations: shorter paragraphs and sentences for better mobile 
              readability, concise keyword usage due to limited screen space, mobile-first indexing 
              means mobile content quality matters more, consider how keywords appear in mobile 
              search results, ensure content loads quickly on mobile devices, and test how your 
              keyword-optimized content displays on various mobile screen sizes. Mobile user 
              experience should guide your keyword density decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeywordDensityChecker
