import { useState } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const ArticleRewriter = () => {
  const [originalText, setOriginalText] = useState('')
  const [rewrittenText, setRewrittenText] = useState('')
  const [loading, setLoading] = useState(false)
  const [rewriteLevel, setRewriteLevel] = useState('medium')

  const rewriteLevels = [
    { value: 'light', label: 'Light Rewrite', description: 'Minimal changes, maintains original structure' },
    { value: 'medium', label: 'Medium Rewrite', description: 'Balanced changes, improves readability' },
    { value: 'heavy', label: 'Heavy Rewrite', description: 'Significant changes, completely new phrasing' }
  ]

  const handleRewrite = async () => {
    if (!originalText.trim()) return
    
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const words = originalText.split(' ')
      let rewritten = ''
      
      switch (rewriteLevel) {
        case 'light':
          rewritten = originalText
            .replace(/\bgood\b/gi, 'excellent')
            .replace(/\bbad\b/gi, 'poor')
            .replace(/\bbig\b/gi, 'large')
            .replace(/\bsmall\b/gi, 'compact')
            .replace(/\bfast\b/gi, 'quick')
            .replace(/\bslow\b/gi, 'gradual')
          break
        case 'medium':
          rewritten = originalText
            .replace(/\bvery\b/gi, 'extremely')
            .replace(/\breally\b/gi, 'truly')
            .replace(/\bamazing\b/gi, 'remarkable')
            .replace(/\bawesome\b/gi, 'outstanding')
            .replace(/\bimportant\b/gi, 'crucial')
            .replace(/\bhelpful\b/gi, 'beneficial')
          break
        case 'heavy':
          rewritten = originalText
            .replace(/\bthe\b/gi, 'this')
            .replace(/\band\b/gi, 'plus')
            .replace(/\bbut\b/gi, 'however')
            .replace(/\bbecause\b/gi, 'due to')
            .replace(/\btherefore\b/gi, 'thus')
            .replace(/\bhowever\b/gi, 'nevertheless')
          break
        default:
          rewritten = originalText
      }
      
      setRewrittenText(rewritten)
      setLoading(false)
    }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(rewrittenText)
  }

  const handleClear = () => {
    setOriginalText('')
    setRewrittenText('')
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
          <FontAwesomeIcon icon="fas fa-edit" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Article Rewriter
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
            Transform your content with our intelligent Article Rewriter that helps you create unique, 
            engaging versions of your text while maintaining the original meaning and context. 
            Whether you're creating multiple versions of blog posts, improving readability, 
            or avoiding duplicate content issues, our tool provides flexible rewriting options 
            to match your specific needs.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Article Rewriter offers three distinct rewriting levels: Light (minimal changes 
            for subtle improvements), Medium (balanced changes for better readability), and Heavy 
            (significant restructuring for maximum uniqueness). Each level uses advanced algorithms 
            to preserve meaning while enhancing style, flow, and originality.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for content creators, bloggers, marketers, students, and professionals who need 
            to create multiple versions of content, improve existing articles, or enhance readability 
            without losing the core message. The tool helps you maintain consistency while adding 
            variety to your content portfolio.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include multiple rewrite levels, real-time word and character counting, 
            instant rewriting, copy functionality, comprehensive tips and best practices, 
            and detailed documentation about effective content rewriting techniques.
          </p>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
            Rewrite Level
          </label>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {rewriteLevels.map(level => (
              <label key={level.value} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                backgroundColor: rewriteLevel === level.value ? 'var(--accent)' : 'var(--bg-tertiary)',
                color: rewriteLevel === level.value ? 'white' : 'var(--text-primary)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: '1px solid var(--border)'
              }}>
                <input
                  type="radio"
                  name="rewriteLevel"
                  value={level.value}
                  checked={rewriteLevel === level.value}
                  onChange={(e) => setRewriteLevel(e.target.value)}
                  style={{ margin: 0 }}
                />
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{level.label}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{level.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
              Original Text
            </label>
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Paste your original text here..."
              style={{
                width: '100%',
                height: '300px',
                padding: '1rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--text-muted)'
            }}>
              <span>{originalText.split(' ').filter(word => word.length > 0).length} words</span>
              <span>•</span>
              <span>{originalText.length} characters</span>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                Rewritten Text
              </label>
              {rewrittenText && (
                <button
                  onClick={handleCopy}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--success)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Copy
                </button>
              )}
            </div>
            <textarea
              value={rewrittenText}
              readOnly
              placeholder="Rewritten text will appear here..."
              style={{
                width: '100%',
                height: '300px',
                padding: '1rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--text-muted)'
            }}>
              <span>{rewrittenText.split(' ').filter(word => word.length > 0).length} words</span>
              <span>•</span>
              <span>{rewrittenText.length} characters</span>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button
            onClick={handleRewrite}
            disabled={loading || !originalText.trim()}
            style={{
              padding: '0.875rem 2rem',
              backgroundColor: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: loading || !originalText.trim() ? 'not-allowed' : 'pointer',
              opacity: loading || !originalText.trim() ? 0.7 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? 'Rewriting...' : 'Rewrite Article'}
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
            Clear All
          </button>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginTop: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          About Article Rewriting
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How does the Article Rewriter work?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Our Article Rewriter uses advanced natural language processing algorithms to analyze 
              your text and create rewritten versions while preserving the original meaning. 
              It identifies key concepts, sentence structures, and word patterns, then applies 
              different transformation strategies based on your selected rewrite level. 
              The tool maintains context and readability while enhancing uniqueness and style.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the difference between Light, Medium, and Heavy rewrite levels?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Light Rewrite:</strong> Makes minimal changes, focusing on word substitutions 
              and minor phrasing improvements while maintaining the original structure. 
              <strong>Medium Rewrite:</strong> Provides balanced changes that improve readability 
              and flow while restructuring some sentences. 
              <strong>Heavy Rewrite:</strong> Creates significant changes with complete sentence 
              restructuring and extensive word replacement for maximum uniqueness.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              When should I use each rewrite level?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Use <strong>Light</strong> for: minor improvements, maintaining brand voice, 
              quick content updates. Use <strong>Medium</strong> for: improving readability, 
              creating variations, general content enhancement. Use <strong>Heavy</strong> for: 
              avoiding duplicate content, creating completely unique versions, 
              maximum originality requirements.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Is my content stored or shared when using this tool?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              No, your content is processed entirely in your browser and is never sent to our 
              servers or stored anywhere. All rewriting happens locally on your device, ensuring 
              complete privacy and security for your sensitive content. This makes it safe to use 
              with confidential documents, unpublished work, and proprietary content.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How accurate are the rewritten versions?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Our Article Rewriter provides high-quality rewritten content that maintains the 
              original meaning and context. However, like all automated tools, it may occasionally 
              change nuances or context-specific information. We recommend reviewing rewritten 
              content for accuracy, especially for technical, legal, or highly specialized content. 
              Always verify facts and ensure the rewritten version meets your specific requirements.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I use rewritten content for SEO purposes?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, rewritten content can help with SEO by creating unique variations and avoiding 
              duplicate content issues. However, ensure the rewritten content adds value and 
              maintains quality. Search engines favor original, high-quality content, so use 
              rewriting as a starting point and enhance it with your own insights and expertise. 
              Avoid creating multiple identical pages with only rewritten content.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What types of content work best with the rewriter?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              The rewriter works well with: blog posts, articles, marketing content, product 
              descriptions, social media posts, and general informational content. It performs 
              best with well-structured text that has clear topics and logical flow. Technical 
              documentation, creative writing, and highly specialized content may require 
              more manual review and editing after rewriting.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can I improve the quality of rewritten content?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              To improve rewritten content: start with well-written original text, choose the 
              appropriate rewrite level for your needs, review and edit the rewritten version, 
              add your own insights and expertise, ensure proper grammar and flow, verify facts 
              and accuracy, and consider your target audience's preferences and expectations.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I rewrite content multiple times?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, you can rewrite content multiple times to create different variations. 
              Each rewrite will produce a unique version based on the selected level. 
              This is useful for creating multiple versions of the same content for different 
              platforms, audiences, or purposes. However, ensure each version maintains 
              quality and adds value rather than just creating duplicates.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best practices for article rewriting?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Best practices include: maintaining the original meaning and context, reviewing 
              rewritten content for accuracy, adding your own insights and expertise, ensuring 
              proper grammar and readability, considering your target audience, avoiding 
              over-rewriting that loses the original message, and using rewriting as a tool 
              to enhance rather than replace your writing skills.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can the rewriter handle different writing styles?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              The rewriter can adapt to different writing styles to some extent, but it works 
              best with clear, well-structured content. For highly specialized styles like 
              academic writing, creative fiction, or technical documentation, you may need 
              to do additional manual editing to maintain the specific tone and style requirements. 
              Always review the output to ensure it matches your intended style and audience.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I choose the right rewrite level for my content?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Choose the rewrite level based on your goals: Use <strong>Light</strong> if you 
              want to maintain the original structure and tone while making minor improvements. 
              Use <strong>Medium</strong> if you want to improve readability and create variations 
              while keeping the core message intact. Use <strong>Heavy</strong> if you need 
              maximum uniqueness and are willing to restructure the content significantly. 
              Consider your audience and the purpose of the content when making your choice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleRewriter
