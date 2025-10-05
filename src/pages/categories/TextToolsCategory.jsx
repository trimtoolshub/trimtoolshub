import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import AdSlot from '../../components/AdSlot'

const TextToolsCategory = () => {
  const textTools = [
    {
      slug: 'text-summarizer',
      name: 'Text Summarizer',
      description: 'Summarize long texts into concise summaries',
      icon: 'fas fa-compress-alt'
    },
    {
      slug: 'grammar-checker',
      name: 'Grammar Checker',
      description: 'Check and correct grammar errors in your text',
      icon: 'fas fa-spell-check'
    },
    {
      slug: 'plagiarism-checker',
      name: 'Plagiarism Checker',
      description: 'Detect plagiarism in your content',
      icon: 'fas fa-search'
    },
    {
      slug: 'article-rewriter',
      name: 'Article Rewriter',
      description: 'Rewrite articles while maintaining meaning',
      icon: 'fas fa-edit'
    },
    {
      slug: 'word-counter',
      name: 'Word Counter',
      description: 'Count words, characters, and paragraphs',
      icon: 'fas fa-calculator'
    },
    {
      slug: 'text-formatter',
      name: 'Text Formatter',
      description: 'Format and style your text content',
      icon: 'fas fa-align-left'
    },
    {
      slug: 'case-converter',
      name: 'Case Converter',
      description: 'Convert text between different cases',
      icon: 'fas fa-text-height'
    },
    {
      slug: 'backwards-text-generator',
      name: 'Backwards Text Generator',
      description: 'Generate backwards and reversed text',
      icon: 'fas fa-text-width'
    },
    {
      slug: 'text-to-hashtags',
      name: 'Text to Hashtags',
      description: 'Convert text into hashtags for social media',
      icon: 'fas fa-hashtag'
    }
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Text Tools - Free Online Text Processing Tools",
    "description": "Comprehensive collection of free online text processing tools including summarizers, grammar checkers, plagiarism detectors, and more.",
    "url": "https://www.trimtoolshub.com/tools/text",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": textTools.map((tool, index) => ({
        "@type": "SoftwareApplication",
        "position": index + 1,
        "name": tool.name,
        "description": tool.description,
        "url": `https://www.trimtoolshub.com/tools/${tool.slug}`
      }))
    }
  }

  return (
    <>
      <SEO
        title="Text Tools - Free Online Text Processing & Analysis Tools"
        description="Professional text processing tools for writers, students, and content creators. Summarize, check grammar, detect plagiarism, count words, and format text online for free."
        canonical="/tools/text"
        keywords={['text tools', 'text processing', 'grammar checker', 'text summarizer', 'plagiarism checker', 'word counter', 'text formatter']}
        structuredData={structuredData}
      />

      <div className="container" style={{ padding: '2rem 0' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '800', 
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            <FontAwesomeIcon icon="fas fa-font" style={{ marginRight: '1rem', color: 'var(--accent)' }} />
            Text Tools
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Professional-grade text processing tools for writers, students, and content creators. 
            From grammar checking to plagiarism detection, our comprehensive suite helps you 
            create, edit, and optimize text content with ease.
          </p>
        </div>

        <AdSlot slotId="text-tools-top" style={{ margin: '2rem auto', maxWidth: '728px' }} />

        {/* Tools Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {textTools.map((tool) => (
            <Link
              key={tool.slug}
              to={`/tools/${tool.slug}`}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '2rem',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-sm)',
                display: 'block'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '1rem' 
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'var(--accent)',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  color: 'white',
                  fontSize: '1.5rem'
                }}>
                  <FontAwesomeIcon icon={tool.icon} />
                </div>
                <h3 style={{ 
                  margin: 0, 
                  color: 'var(--text-primary)',
                  fontSize: '1.25rem',
                  fontWeight: '600'
                }}>
                  {tool.name}
                </h3>
              </div>
              <p style={{ 
                color: 'var(--text-secondary)', 
                margin: 0,
                lineHeight: '1.5'
              }}>
                {tool.description}
              </p>
            </Link>
          ))}
        </div>

        <AdSlot slotId="text-tools-bottom" style={{ margin: '2rem auto', maxWidth: '728px' }} />

        {/* Information Section */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            marginBottom: '1rem', 
            color: 'var(--text-primary)',
            fontSize: '1.5rem'
          }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Text Processing Tools
          </h2>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '1rem' }}>
              Our text processing tools are designed to help writers, students, and content creators 
              work more efficiently with text content. Whether you need to summarize long documents, 
              check grammar and spelling, detect plagiarism, or format text for different purposes, 
              our comprehensive suite has you covered.
            </p>
            
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Key Features:</h3>
            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
              <li><strong>Grammar & Spell Checking:</strong> Advanced algorithms to detect and correct errors</li>
              <li><strong>Content Analysis:</strong> Plagiarism detection and originality checking</li>
              <li><strong>Text Summarization:</strong> AI-powered summarization for long documents</li>
              <li><strong>Formatting Tools:</strong> Case conversion, text formatting, and styling</li>
              <li><strong>Word Counting:</strong> Detailed statistics for characters, words, and paragraphs</li>
              <li><strong>Social Media Integration:</strong> Hashtag generation and social media optimization</li>
            </ul>
            
            <p style={{ margin: 0 }}>
              All tools are free to use, require no registration, and process your content securely 
              in your browser. Perfect for academic writing, content creation, social media management, 
              and professional communication.
            </p>
          </div>
        </div>

        {/* Related Categories */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
          padding: '2rem'
        }}>
          <h2 style={{ 
            marginBottom: '1rem', 
            color: 'var(--text-primary)',
            fontSize: '1.5rem'
          }}>
            <FontAwesomeIcon icon="fas fa-th-large" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            Related Tool Categories
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <Link
              to="/tools/file"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease'
              }}
            >
              <FontAwesomeIcon icon="fas fa-file" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              File Tools
            </Link>
            
            <Link
              to="/tools/seo"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease'
              }}
            >
              <FontAwesomeIcon icon="fas fa-search" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              SEO Tools
            </Link>
            
            <Link
              to="/tools/developer"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease'
              }}
            >
              <FontAwesomeIcon icon="fas fa-code" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              Developer Tools
            </Link>
            
            <Link
              to="/tools"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease'
              }}
            >
              <FontAwesomeIcon icon="fas fa-th" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              All Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default TextToolsCategory
