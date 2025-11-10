import { useState, useCallback } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const SchemaMarkupGenerator = () => {
  const [schemaData, setSchemaData] = useState({
    type: 'Organization',
    name: '',
    url: '',
    description: '',
    logo: '',
    address: '',
    phone: '',
    email: '',
    socialMedia: []
  })
  const [generatedSchema, setGeneratedSchema] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')

  const schemaTypes = [
    { value: 'Organization', label: 'Organization', description: 'Company or business information' },
    { value: 'Person', label: 'Person', description: 'Individual person information' },
    { value: 'Article', label: 'Article', description: 'News article or blog post' },
    { value: 'Product', label: 'Product', description: 'Product information and reviews' },
    { value: 'Event', label: 'Event', description: 'Event details and scheduling' },
    { value: 'LocalBusiness', label: 'Local Business', description: 'Local business information' },
    { value: 'WebSite', label: 'Website', description: 'Website search functionality' },
    { value: 'FAQ', label: 'FAQ', description: 'Frequently asked questions' }
  ]

  const generateSchema = useCallback(async () => {
    if (!schemaData.name.trim()) {
      setError('Please enter a name.')
      return
    }

    setIsGenerating(true)
    setError('')
    setGeneratedSchema('')

    try {
      let schema = {
        '@context': 'https://schema.org',
        '@type': schemaData.type
      }

      // Add common properties
      if (schemaData.name) schema.name = schemaData.name
      if (schemaData.url) schema.url = schemaData.url
      if (schemaData.description) schema.description = schemaData.description
      if (schemaData.logo) schema.logo = schemaData.logo

      // Add type-specific properties
      if (schemaData.type === 'Organization' || schemaData.type === 'LocalBusiness') {
        if (schemaData.address) {
          schema.address = {
            '@type': 'PostalAddress',
            streetAddress: schemaData.address
          }
        }
        if (schemaData.phone) schema.telephone = schemaData.phone
        if (schemaData.email) schema.email = schemaData.email
      }

      if (schemaData.type === 'Person') {
        if (schemaData.email) schema.email = schemaData.email
        if (schemaData.phone) schema.telephone = schemaData.phone
      }

      if (schemaData.type === 'Article') {
        schema.headline = schemaData.name
        schema.datePublished = new Date().toISOString()
        schema.author = {
          '@type': 'Person',
          name: 'Author Name'
        }
      }

      if (schemaData.type === 'Product') {
        schema.name = schemaData.name
        schema.description = schemaData.description
        schema.brand = {
          '@type': 'Brand',
          name: 'Brand Name'
        }
      }

      if (schemaData.type === 'Event') {
        schema.name = schemaData.name
        schema.description = schemaData.description
        schema.startDate = new Date().toISOString()
        schema.location = {
          '@type': 'Place',
          name: 'Event Location'
        }
      }

      if (schemaData.type === 'WebSite') {
        schema.name = schemaData.name
        schema.url = schemaData.url
        schema.potentialAction = {
          '@type': 'SearchAction',
          target: schemaData.url + '/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      }

      if (schemaData.type === 'FAQ') {
        schema.mainEntity = [
          {
            '@type': 'Question',
            name: 'Sample Question?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sample answer to the question.'
            }
          }
        ]
      }

      setGeneratedSchema(JSON.stringify(schema, null, 2))
    } catch (err) {
      setError('Error generating schema: ' + err.message)
    } finally {
      setIsGenerating(false)
    }
  }, [schemaData])

  const handleInputChange = (field, value) => {
    setSchemaData(prev => ({
      ...prev,
      [field]: value
    }))
    setError('')
    setGeneratedSchema('')
  }

  const clearInput = () => {
    setSchemaData({
      type: 'Organization',
      name: '',
      url: '',
      description: '',
      logo: '',
      address: '',
      phone: '',
      email: '',
      socialMedia: []
    })
    setError('')
    setGeneratedSchema('')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <SEOHead
        title="Schema Markup Generator - Create JSON-LD Structured Data"
        description="Generate JSON-LD schema markup for SEO. Create structured data for organizations, articles, products, events, and more. Improve search engine visibility."
        canonical="/tools/schema-markup-generator"
        keywords={['schema', 'markup', 'generator', 'json-ld', 'structured', 'data', 'seo', 'search']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'Schema Markup Generator',
          description: 'Generate JSON-LD schema markup for SEO',
          url: 'https://www.trimtoolshub.com/tools/schema-markup-generator',
          applicationCategory: 'SEOApplication',
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
          <FontAwesomeIcon icon="fas fa-code" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Schema Markup Generator
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
            Generate JSON-LD schema markup for SEO with our Schema Markup Generator. 
            Whether you're optimizing your website for search engines, improving rich snippets, 
            or enhancing local SEO, our tool creates structured data markup for better search visibility.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Schema Markup Generator supports multiple schema types including Organization, Person, Article, 
            Product, Event, Local Business, Website, and FAQ schemas. Perfect for SEO specialists, 
            web developers, and content creators looking to improve search engine performance.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include multiple schema types, JSON-LD format, SEO optimization, rich snippets support, 
            and comprehensive documentation about structured data and search engine optimization.
          </p>
        </div>
        
        <AdSlot slotId="schema-markup-generator-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          {/* Schema Type Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Schema Type</h3>
            <select
              value={schemaData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            >
              {schemaTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label} - {type.description}
                </option>
              ))}
            </select>
          </div>

          {/* Basic Information */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Basic Information</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '1rem' 
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}>
                  Name *
                </label>
                <input
                  type="text"
                  value={schemaData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter name or title"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
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
                  URL
                </label>
                <input
                  type="url"
                  value={schemaData.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  placeholder="https://example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
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
                  Description
                </label>
                <textarea
                  value={schemaData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter description"
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    resize: 'vertical'
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
                  Logo URL
                </label>
                <input
                  type="url"
                  value={schemaData.logo}
                  onChange={(e) => handleInputChange('logo', e.target.value)}
                  placeholder="https://example.com/logo.png"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          {(schemaData.type === 'Organization' || schemaData.type === 'LocalBusiness' || schemaData.type === 'Person') && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Contact Information</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '1rem' 
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    color: 'var(--text-primary)',
                    fontWeight: '500'
                  }}>
                    Address
                  </label>
                  <input
                    type="text"
                    value={schemaData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Main St, City, State"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
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
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={schemaData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1-555-123-4567"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
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
                    Email
                  </label>
                  <input
                    type="email"
                    value={schemaData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="contact@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={generateSchema}
              disabled={isGenerating || !schemaData.name.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: isGenerating || !schemaData.name.trim() ? 'var(--bg-tertiary)' : '#10b981',
                color: isGenerating || !schemaData.name.trim() ? 'var(--text-secondary)' : 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: isGenerating || !schemaData.name.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem'
              }}
            >
              <FontAwesomeIcon icon={isGenerating ? "fas fa-spinner fa-spin" : "fas fa-code"} />
              {isGenerating ? 'Generating...' : 'Generate Schema'}
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

          {/* Generated Schema */}
          {generatedSchema && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-code" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Generated JSON-LD Schema
                </h3>
                <button
                  onClick={() => copyToClipboard(generatedSchema)}
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
                  Copy
                </button>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                minHeight: '200px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflow: 'auto',
                maxHeight: '400px'
              }}>
                {generatedSchema}
              </div>
            </div>
          )}

          {/* Implementation Instructions */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              Implementation Instructions
            </h3>
            
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              padding: '1rem'
            }}>
              <ol style={{ color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Copy the generated JSON-LD schema markup</li>
                <li style={{ marginBottom: '0.5rem' }}>Add it to the &lt;head&gt; section of your HTML page</li>
                <li style={{ marginBottom: '0.5rem' }}>Wrap it in a &lt;script type="application/ld+json"&gt; tag</li>
                <li style={{ marginBottom: '0.5rem' }}>Test your markup using Google's Rich Results Test</li>
                <li style={{ marginBottom: '0.5rem' }}>Monitor your search console for structured data errors</li>
                <li>Update the schema when your content changes</li>
              </ol>
            </div>
          </div>
        </div>

        <AdSlot slotId="schema-markup-generator-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Schema Markup & Structured Data
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What is schema markup and why is it important for SEO?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Schema markup is structured data that helps search engines understand your content: <strong>Rich Snippets:</strong> 
                Enhanced search results with additional information like ratings, prices, dates. <strong>Better Understanding:</strong> 
                Search engines can better categorize and index your content. <strong>Competitive Advantage:</strong> 
                Stand out in search results with enhanced listings. <strong>Voice Search:</strong> 
                Improve performance in voice search queries. <strong>Local SEO:</strong> 
                Better local business visibility and map listings. <strong>Knowledge Graph:</strong> 
                Chance to appear in Google's Knowledge Graph.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the different types of schema markup and when to use them?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common schema types include: <strong>Organization:</strong> 
                Company information, contact details, social media profiles. <strong>Article:</strong> 
                Blog posts, news articles with author, date, and content information. <strong>Product:</strong> 
                E-commerce products with prices, reviews, and availability. <strong>Event:</strong> 
                Events with dates, locations, and ticket information. <strong>LocalBusiness:</strong> 
                Local businesses with address, hours, and contact information. <strong>FAQ:</strong> 
                Frequently asked questions for better search visibility.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I implement schema markup on my website?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Implementation steps: <strong>Choose Format:</strong> 
                JSON-LD is recommended by Google and easiest to implement. <strong>Add to HTML:</strong> 
                Place schema markup in the &lt;head&gt; section of your pages. <strong>Test Implementation:</strong> 
                Use Google's Rich Results Test to validate your markup. <strong>Monitor Performance:</strong> 
                Check Google Search Console for structured data errors. <strong>Update Regularly:</strong> 
                Keep schema markup current with your content changes. <strong>Follow Guidelines:</strong> 
                Ensure compliance with Google's structured data guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SchemaMarkupGenerator
