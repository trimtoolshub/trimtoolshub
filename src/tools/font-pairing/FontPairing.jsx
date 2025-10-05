import { useState, useCallback } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const FontPairing = () => {
  const [selectedCategory, setSelectedCategory] = useState('modern')
  const [selectedPairing, setSelectedPairing] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog')

  const categories = [
    { value: 'modern', label: 'Modern', description: 'Clean, contemporary font combinations' },
    { value: 'classic', label: 'Classic', description: 'Traditional, timeless font pairings' },
    { value: 'creative', label: 'Creative', description: 'Bold, artistic font combinations' },
    { value: 'minimalist', label: 'Minimalist', description: 'Simple, clean font pairings' },
    { value: 'elegant', label: 'Elegant', description: 'Sophisticated, refined combinations' },
    { value: 'tech', label: 'Tech', description: 'Modern, tech-focused font pairings' }
  ]

  const fontPairings = {
    modern: [
      {
        heading: 'Inter',
        body: 'Source Sans Pro',
        description: 'Clean, readable combination perfect for modern websites',
        useCase: 'Web design, SaaS, tech companies',
        weights: { heading: '600', body: '400' }
      },
      {
        heading: 'Poppins',
        body: 'Open Sans',
        description: 'Friendly, approachable fonts for user-friendly interfaces',
        useCase: 'Mobile apps, e-commerce, blogs',
        weights: { heading: '600', body: '400' }
      },
      {
        heading: 'Montserrat',
        body: 'Lato',
        description: 'Versatile combination suitable for various design styles',
        useCase: 'Corporate websites, portfolios, landing pages',
        weights: { heading: '700', body: '400' }
      }
    ],
    classic: [
      {
        heading: 'Playfair Display',
        body: 'Source Sans Pro',
        description: 'Elegant serif heading with clean sans-serif body',
        useCase: 'Editorial, magazines, luxury brands',
        weights: { heading: '400', body: '400' }
      },
      {
        heading: 'Merriweather',
        body: 'Open Sans',
        description: 'Traditional serif with modern sans-serif combination',
        useCase: 'Blogs, news sites, academic content',
        weights: { heading: '700', body: '400' }
      },
      {
        heading: 'Crimson Text',
        body: 'Lato',
        description: 'Classic serif with contemporary sans-serif',
        useCase: 'Books, publications, literary content',
        weights: { heading: '600', body: '400' }
      }
    ],
    creative: [
      {
        heading: 'Oswald',
        body: 'Roboto',
        description: 'Bold, condensed heading with clean body text',
        useCase: 'Portfolios, creative agencies, art galleries',
        weights: { heading: '600', body: '400' }
      },
      {
        heading: 'Bebas Neue',
        body: 'Source Sans Pro',
        description: 'Strong, impactful heading with readable body',
        useCase: 'Sports, entertainment, bold brands',
        weights: { heading: '400', body: '400' }
      },
      {
        heading: 'Raleway',
        body: 'Lato',
        description: 'Elegant, thin heading with warm body text',
        useCase: 'Fashion, lifestyle, luxury brands',
        weights: { heading: '300', body: '400' }
      }
    ],
    minimalist: [
      {
        heading: 'Helvetica Neue',
        body: 'Helvetica',
        description: 'Ultra-clean, minimal combination',
        useCase: 'Corporate, professional, clean design',
        weights: { heading: '600', body: '400' }
      },
      {
        heading: 'Avenir',
        body: 'Avenir',
        description: 'Consistent, minimal font family',
        useCase: 'Apple-style design, clean interfaces',
        weights: { heading: '600', body: '400' }
      },
      {
        heading: 'Futura',
        body: 'Futura',
        description: 'Geometric, minimal design',
        useCase: 'Modern, architectural, clean brands',
        weights: { heading: '700', body: '400' }
      }
    ],
    elegant: [
      {
        heading: 'Cormorant Garamond',
        body: 'Source Sans Pro',
        description: 'Sophisticated serif with clean sans-serif',
        useCase: 'Luxury brands, high-end fashion, fine dining',
        weights: { heading: '600', body: '400' }
      },
      {
        heading: 'Libre Baskerville',
        body: 'Open Sans',
        description: 'Classic serif with modern readability',
        useCase: 'Editorial, publishing, academic',
        weights: { heading: '700', body: '400' }
      },
      {
        heading: 'Crimson Text',
        body: 'Lato',
        description: 'Traditional elegance with contemporary clarity',
        useCase: 'Books, magazines, literary content',
        weights: { heading: '600', body: '400' }
      }
    ],
    tech: [
      {
        heading: 'Roboto',
        body: 'Roboto',
        description: 'Google\'s modern, tech-focused font',
        useCase: 'Android apps, Google products, tech startups',
        weights: { heading: '500', body: '400' }
      },
      {
        heading: 'Fira Sans',
        body: 'Fira Sans',
        description: 'Mozilla\'s open-source tech font',
        useCase: 'Open source, developer tools, tech blogs',
        weights: { heading: '600', body: '400' }
      },
      {
        heading: 'Source Code Pro',
        body: 'Source Sans Pro',
        description: 'Monospace heading with clean sans-serif',
        useCase: 'Developer portfolios, coding tutorials, tech docs',
        weights: { heading: '600', body: '400' }
      }
    ]
  }

  const generatePairing = useCallback(async () => {
    setIsGenerating(true)
    setError('')
    setSelectedPairing(null)

    try {
      const pairings = fontPairings[selectedCategory]
      if (!pairings || pairings.length === 0) {
        throw new Error('No pairings available for selected category')
      }

      // Randomly select a pairing
      const randomIndex = Math.floor(Math.random() * pairings.length)
      const pairing = pairings[randomIndex]
      
      setSelectedPairing(pairing)
    } catch (err) {
      setError('Error generating font pairing: ' + err.message)
    } finally {
      setIsGenerating(false)
    }
  }, [selectedCategory])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSelectedPairing(null)
    setError('')
  }

  const handlePreviewTextChange = (text) => {
    setPreviewText(text)
  }

  const clearSelection = () => {
    setSelectedPairing(null)
    setError('')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const getGoogleFontsUrl = (pairing) => {
    const fonts = [pairing.heading, pairing.body].map(font => 
      font.replace(/\s+/g, '+')
    ).join('&family=')
    return `https://fonts.googleapis.com/css2?family=${fonts}&display=swap`
  }

  const getCSS = (pairing) => {
    return `/* Font Pairing CSS */
.heading-font {
  font-family: '${pairing.heading}', sans-serif;
  font-weight: ${pairing.weights.heading};
}

.body-font {
  font-family: '${pairing.body}', sans-serif;
  font-weight: ${pairing.weights.body};
}

/* Google Fonts Import */
@import url('${getGoogleFontsUrl(pairing)}');`
  }

  return (
    <>
      <SEOHead
        title="Font Pairing Recommender - Typography Combinations for Design"
        description="Discover perfect font combinations for your designs. Get recommendations for modern, classic, creative, and elegant typography pairings with CSS code."
        canonical="/tools/font-pairing"
        keywords={['font', 'pairing', 'typography', 'design', 'combinations', 'css', 'google fonts', 'web design']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'Font Pairing Recommender',
          description: 'Discover perfect font combinations for design projects',
          url: 'https://www.trimtoolshub.com/tools/font-pairing',
          applicationCategory: 'DesignApplication',
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
          <FontAwesomeIcon icon="fas fa-font" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Font Pairing Recommender
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
            Discover perfect font combinations for your design projects with our Font Pairing Recommender. 
            Whether you're designing websites, creating marketing materials, building mobile apps, 
            or working on any visual project, our tool provides expertly curated typography combinations.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Font Pairing Recommender offers professional-grade typography guidance including modern, classic, 
            creative, minimalist, elegant, and tech-focused font combinations. Perfect for designers, developers, 
            marketers, and anyone looking to create visually appealing and readable content.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive font pairing including: <strong>Category-Based Recommendations:</strong> 
            Organized by design style and use case. <strong>Live Preview:</strong> 
            See how fonts look together with your own text. <strong>CSS Code Generation:</strong> 
            Get ready-to-use CSS code for implementation. <strong>Google Fonts Integration:</strong> 
            All recommended fonts are available on Google Fonts. <strong>Use Case Guidance:</strong> 
            Learn when and where to use each pairing. <strong>Professional Curation:</strong> 
            Expert-selected combinations for optimal readability and aesthetics.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include category-based recommendations, live preview, CSS code generation, Google Fonts integration, 
            use case guidance, professional curation, and comprehensive documentation about typography 
            and font pairing best practices.
          </p>
        </div>
        
        <AdSlot slotId="font-pairing-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          {/* Category Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Design Style</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  style={{
                    padding: '1rem',
                    backgroundColor: selectedCategory === category.value ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: selectedCategory === category.value ? 'white' : 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ 
                    fontWeight: '600', 
                    marginBottom: '0.25rem',
                    fontSize: '1rem'
                  }}>
                    {category.label}
                  </div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    opacity: 0.8
                  }}>
                    {category.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Preview Text Input */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Preview Text</h3>
            <textarea
              value={previewText}
              onChange={(e) => handlePreviewTextChange(e.target.value)}
              placeholder="Enter text to preview with different font combinations..."
              style={{
                width: '100%',
                minHeight: '80px',
                padding: '1rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Generate Button */}
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={generatePairing}
              disabled={isGenerating}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: isGenerating ? 'var(--bg-tertiary)' : '#10b981',
                color: isGenerating ? 'var(--text-secondary)' : 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem'
              }}
            >
              <FontAwesomeIcon icon={isGenerating ? "fas fa-spinner fa-spin" : "fas fa-magic"} />
              {isGenerating ? 'Generating...' : 'Get Font Pairing'}
            </button>
            
            <button
              onClick={clearSelection}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginLeft: '1rem'
              }}
            >
              <FontAwesomeIcon icon="fas fa-trash" />
              Clear
            </button>
          </div>

          {error && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.5rem',
              color: '#dc2626',
              marginBottom: '1rem'
            }}>
              <FontAwesomeIcon icon="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }} />
              {error}
            </div>
          )}

          {/* Font Pairing Result */}
          {selectedPairing && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-palette" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Recommended Font Pairing
              </h3>
              
              {/* Pairing Details */}
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      <FontAwesomeIcon icon="fas fa-heading" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                      Heading Font
                    </h4>
                    <div style={{ 
                      fontFamily: `'${selectedPairing.heading}', sans-serif`,
                      fontWeight: selectedPairing.weights.heading,
                      fontSize: '1.5rem',
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem'
                    }}>
                      {selectedPairing.heading}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Weight: {selectedPairing.weights.heading}
                    </div>
                  </div>
                  
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      <FontAwesomeIcon icon="fas fa-paragraph" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                      Body Font
                    </h4>
                    <div style={{ 
                      fontFamily: `'${selectedPairing.body}', sans-serif`,
                      fontWeight: selectedPairing.weights.body,
                      fontSize: '1rem',
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem'
                    }}>
                      {selectedPairing.body}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Weight: {selectedPairing.weights.body}
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                    Description
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                    {selectedPairing.description}
                  </p>
                </div>
                
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    <FontAwesomeIcon icon="fas fa-bullseye" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                    Best For
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                    {selectedPairing.useCase}
                  </p>
                </div>
              </div>

              {/* Live Preview */}
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '2rem',
                marginBottom: '1.5rem'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
                  <FontAwesomeIcon icon="fas fa-eye" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Live Preview
                </h4>
                
                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{ 
                    fontFamily: `'${selectedPairing.heading}', sans-serif`,
                    fontWeight: selectedPairing.weights.heading,
                    fontSize: '2rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}>
                    Sample Heading Text
                  </h5>
                  <p style={{ 
                    fontFamily: `'${selectedPairing.body}', sans-serif`,
                    fontWeight: selectedPairing.weights.body,
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {previewText}
                  </p>
                </div>
              </div>

              {/* CSS Code */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ color: 'var(--text-primary)' }}>
                    <FontAwesomeIcon icon="fas fa-code" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                    CSS Code
                  </h4>
                  <button
                    onClick={() => copyToClipboard(getCSS(selectedPairing))}
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
                    Copy CSS
                  </button>
                </div>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  whiteSpace: 'pre-wrap',
                  overflow: 'auto',
                  maxHeight: '200px'
                }}>
                  {getCSS(selectedPairing)}
                </div>
              </div>

              {/* Google Fonts Link */}
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fab fa-google" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Google Fonts Link
                </h4>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Add this link to your HTML &lt;head&gt; section:
                </p>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.25rem',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  wordBreak: 'break-all',
                  marginBottom: '0.5rem'
                }}>
                  {getGoogleFontsUrl(selectedPairing)}
                </div>
                <button
                  onClick={() => copyToClipboard(getGoogleFontsUrl(selectedPairing))}
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
                  <FontAwesomeIcon icon="fas fa-copy" />
                  Copy Link
                </button>
              </div>
            </div>
          )}

          {/* Typography Tips */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-lightbulb" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              Typography Tips
            </h3>
            
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
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-balance-scale" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Contrast
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Ensure sufficient contrast between heading and body fonts for readability.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-ruler" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Hierarchy
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use different font weights and sizes to create clear visual hierarchy.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-mobile-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Responsive
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Test font combinations on different screen sizes and devices.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-globe" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Web Safe
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use web-safe fonts or provide fallbacks for better compatibility.
                </p>
              </div>
            </div>
          </div>
        </div>

        <AdSlot slotId="font-pairing-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Font Pairing & Typography Design
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What makes a good font pairing?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Good font pairings share these characteristics: <strong>Contrast:</strong> 
                Different enough to create visual hierarchy but harmonious together. <strong>Complementary Styles:</strong> 
                Serif with sans-serif, or different weights of the same family. <strong>Readability:</strong> 
                Both fonts should be highly readable at their intended sizes. <strong>Consistency:</strong> 
                Similar x-height and character width for visual harmony. <strong>Purpose Alignment:</strong> 
                Fonts should match the tone and purpose of your content. <strong>Brand Consistency:</strong> 
                Align with your brand personality and target audience.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I choose fonts for different design styles?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Style-specific font selection: <strong>Modern:</strong> 
                Clean, geometric sans-serif fonts like Inter, Roboto, or Helvetica Neue. <strong>Classic:</strong> 
                Traditional serif fonts like Times New Roman, Georgia, or Merriweather. <strong>Creative:</strong> 
                Unique, expressive fonts that stand out and convey personality. <strong>Minimalist:</strong> 
                Simple, clean fonts with minimal ornamentation. <strong>Elegant:</strong> 
                Sophisticated serif fonts with refined details. <strong>Tech:</strong> 
                Modern, technical fonts designed for digital interfaces.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the best practices for web typography?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Web typography best practices include: <strong>Font Loading:</strong> 
                Use font-display: swap for better performance and user experience. <strong>Fallback Fonts:</strong> 
                Always provide fallback fonts for better compatibility. <strong>Responsive Typography:</strong> 
                Use relative units (rem, em) and fluid typography techniques. <strong>Line Height:</strong> 
                Maintain 1.4-1.6 line height for optimal readability. <strong>Font Weights:</strong> 
                Use 2-3 font weights maximum to avoid visual clutter. <strong>Performance:</strong> 
                Limit the number of font files and use font subsetting when possible.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I implement Google Fonts in my project?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Google Fonts implementation steps: <strong>Select Fonts:</strong> 
                Choose fonts from Google Fonts library that match your design. <strong>Generate Link:</strong> 
                Use Google Fonts URL generator to create the import link. <strong>Add to HTML:</strong> 
                Include the link in your HTML &lt;head&gt; section. <strong>CSS Implementation:</strong> 
                Use font-family property in your CSS with proper fallbacks. <strong>Optimize Loading:</strong> 
                Use font-display: swap and preload critical fonts. <strong>Test Performance:</strong> 
                Monitor font loading performance and user experience.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common typography mistakes to avoid?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common typography mistakes include: <strong>Too Many Fonts:</strong> 
                Using more than 2-3 fonts creates visual chaos and inconsistency. <strong>Poor Contrast:</strong> 
                Insufficient contrast between fonts or text and background. <strong>Inconsistent Hierarchy:</strong> 
                Not establishing clear visual hierarchy with font sizes and weights. <strong>Readability Issues:</strong> 
                Choosing fonts that are hard to read at intended sizes. <strong>Loading Performance:</strong> 
                Not optimizing font loading for web performance. <strong>Mobile Optimization:</strong> 
                Not testing typography on mobile devices and small screens.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I test font combinations effectively?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Effective font testing strategies: <strong>Real Content:</strong> 
                Test with actual content rather than placeholder text. <strong>Multiple Devices:</strong> 
                Check appearance on desktop, tablet, and mobile devices. <strong>Different Browsers:</strong> 
                Test across different browsers and operating systems. <strong>Accessibility:</strong> 
                Ensure fonts meet accessibility standards and readability requirements. <strong>User Testing:</strong> 
                Get feedback from actual users about readability and visual appeal. <strong>Performance Testing:</strong> 
                Monitor font loading times and impact on page speed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FontPairing
