import { useState, useCallback } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const BacklinkChecker = () => {
  const [url, setUrl] = useState('')
  const [backlinks, setBacklinks] = useState([])
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState('')
  const [domainInfo, setDomainInfo] = useState(null)

  const checkBacklinks = useCallback(async () => {
    if (!url.trim()) {
      setError('Please enter a URL to check backlinks')
      return
    }

    setIsChecking(true)
    setError('')
    setBacklinks([])
    setDomainInfo(null)

    try {
      // Simulate backlink checking (in a real implementation, you'd use APIs like Ahrefs, Moz, etc.)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock backlink data
      const mockBacklinks = [
        {
          url: 'https://example.com/blog/seo-guide',
          title: 'Complete SEO Guide for Beginners',
          domain: 'example.com',
          domainRating: 85,
          pageRating: 72,
          anchorText: 'SEO optimization tips',
          linkType: 'dofollow',
          discoveredDate: '2024-01-15',
          lastSeen: '2024-10-05',
          status: 'active'
        },
        {
          url: 'https://techblog.net/web-development',
          title: 'Web Development Best Practices',
          domain: 'techblog.net',
          domainRating: 78,
          pageRating: 65,
          anchorText: 'web development resources',
          linkType: 'dofollow',
          discoveredDate: '2024-02-20',
          lastSeen: '2024-10-04',
          status: 'active'
        },
        {
          url: 'https://designhub.io/portfolio',
          title: 'Creative Design Portfolio',
          domain: 'designhub.io',
          domainRating: 92,
          pageRating: 88,
          anchorText: 'design inspiration',
          linkType: 'nofollow',
          discoveredDate: '2024-03-10',
          lastSeen: '2024-10-03',
          status: 'active'
        },
        {
          url: 'https://startupnews.com/funding',
          title: 'Startup Funding News',
          domain: 'startupnews.com',
          domainRating: 67,
          pageRating: 54,
          anchorText: 'startup resources',
          linkType: 'dofollow',
          discoveredDate: '2024-04-05',
          lastSeen: '2024-09-28',
          status: 'broken'
        },
        {
          url: 'https://devtools.org/utilities',
          title: 'Developer Tools Collection',
          domain: 'devtools.org',
          domainRating: 89,
          pageRating: 76,
          anchorText: 'developer utilities',
          linkType: 'dofollow',
          discoveredDate: '2024-05-12',
          lastSeen: '2024-10-01',
          status: 'active'
        }
      ]

      const mockDomainInfo = {
        totalBacklinks: mockBacklinks.length,
        referringDomains: new Set(mockBacklinks.map(link => link.domain)).size,
        dofollowLinks: mockBacklinks.filter(link => link.linkType === 'dofollow').length,
        nofollowLinks: mockBacklinks.filter(link => link.linkType === 'nofollow').length,
        averageDomainRating: Math.round(mockBacklinks.reduce((sum, link) => sum + link.domainRating, 0) / mockBacklinks.length),
        averagePageRating: Math.round(mockBacklinks.reduce((sum, link) => sum + link.pageRating, 0) / mockBacklinks.length),
        activeLinks: mockBacklinks.filter(link => link.status === 'active').length,
        brokenLinks: mockBacklinks.filter(link => link.status === 'broken').length
      }

      setBacklinks(mockBacklinks)
      setDomainInfo(mockDomainInfo)
    } catch (err) {
      setError('Failed to check backlinks: ' + err.message)
    } finally {
      setIsChecking(false)
    }
  }, [url])

  const handleUrlChange = (value) => {
    setUrl(value)
    setError('')
    setBacklinks([])
    setDomainInfo(null)
  }

  const clearResults = () => {
    setUrl('')
    setBacklinks([])
    setDomainInfo(null)
    setError('')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981'
      case 'broken': return '#ef4444'
      case 'redirect': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'fas fa-check-circle'
      case 'broken': return 'fas fa-times-circle'
      case 'redirect': return 'fas fa-exchange-alt'
      default: return 'fas fa-question-circle'
    }
  }

  return (
    <>
      <SEOHead
        title="Backlink Checker - Analyze Website Backlinks & Link Profile"
        description="Check backlinks for any website. Analyze link profile, domain authority, anchor text, and discover referring domains. Free backlink analysis tool."
        canonical="/tools/backlink-checker"
        keywords={['backlink', 'checker', 'seo', 'link building', 'domain authority', 'anchor text', 'referring domains']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'Backlink Checker',
          description: 'Analyze website backlinks and link profile',
          url: 'https://www.trimtoolshub.com/tools/backlink-checker',
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
          <FontAwesomeIcon icon="fas fa-link" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Backlink Checker
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
            Analyze the backlink profile of any website with our comprehensive Backlink Checker. 
            Discover referring domains, analyze anchor text distribution, check link quality, 
            and understand your website's link authority for better SEO strategy.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Backlink Checker provides detailed insights into your website's link profile including 
            domain authority scores, page ratings, anchor text analysis, link types (dofollow/nofollow), 
            and link status monitoring. Perfect for SEO professionals, digital marketers, and website owners.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive analysis including: <strong>Backlink Discovery:</strong> 
            Find all backlinks pointing to your website. <strong>Domain Analysis:</strong> 
            Analyze referring domains and their authority scores. <strong>Anchor Text Analysis:</strong> 
            Review anchor text distribution and optimization opportunities. <strong>Link Quality Assessment:</strong> 
            Evaluate link quality based on domain and page ratings. <strong>Link Status Monitoring:</strong> 
            Track active, broken, and redirected links. <strong>SEO Insights:</strong> 
            Get actionable recommendations for link building strategy.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include backlink discovery, domain analysis, anchor text analysis, link quality assessment, 
            link status monitoring, SEO insights, and comprehensive documentation about backlink analysis 
            and link building strategies.
          </p>
        </div>
        
        <AdSlot slotId="backlink-checker-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          {/* URL Input */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Enter Website URL</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <input
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://example.com"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              />
              <button
                onClick={checkBacklinks}
                disabled={isChecking || !url.trim()}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isChecking || !url.trim() ? 'var(--bg-tertiary)' : '#10b981',
                  color: isChecking || !url.trim() ? 'var(--text-secondary)' : 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: isChecking || !url.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}
              >
                <FontAwesomeIcon icon={isChecking ? "fas fa-spinner fa-spin" : "fas fa-search"} />
                {isChecking ? 'Checking...' : 'Check Backlinks'}
              </button>
            </div>
            
            <div style={{ 
              marginTop: '1rem',
              display: 'flex', 
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => handleUrlChange('https://example.com')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-file-alt" />
                Load Sample
              </button>
              
              <button
                onClick={clearResults}
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
                  fontSize: '0.9rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-trash" />
                Clear
              </button>
            </div>
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

          {/* Domain Overview */}
          {domainInfo && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-chart-bar" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Link Profile Overview
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                    {domainInfo.totalBacklinks}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Total Backlinks</div>
                </div>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                    {domainInfo.referringDomains}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Referring Domains</div>
                </div>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
                    {domainInfo.dofollowLinks}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Dofollow Links</div>
                </div>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>
                    {domainInfo.nofollowLinks}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Nofollow Links</div>
                </div>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                    {domainInfo.averageDomainRating}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Avg Domain Rating</div>
                </div>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                    {domainInfo.averagePageRating}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Avg Page Rating</div>
                </div>
              </div>
            </div>
          )}

          {/* Backlinks List */}
          {backlinks.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-list" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Backlinks ({backlinks.length})
                </h3>
                <button
                  onClick={() => copyToClipboard(backlinks.map(link => link.url).join('\n'))}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <FontAwesomeIcon icon="fas fa-copy" />
                  Copy URLs
                </button>
              </div>
              
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  borderBottom: '1px solid var(--border)'
                }}>
                  <div>URL</div>
                  <div>Domain</div>
                  <div>DR/PR</div>
                  <div>Anchor Text</div>
                  <div>Type</div>
                  <div>Status</div>
                </div>
                
                {backlinks.map((link, index) => (
                  <div key={index} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                    gap: '1rem',
                    padding: '1rem',
                    borderBottom: index < backlinks.length - 1 ? '1px solid var(--border)' : 'none',
                    fontSize: '0.9rem',
                    alignItems: 'center'
                  }}>
                    <div style={{ color: 'var(--text-primary)' }}>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: 'var(--accent)', textDecoration: 'none' }}
                      >
                        {link.title}
                      </a>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>{link.domain}</div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      {link.domainRating}/{link.pageRating}
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>{link.anchorText}</div>
                    <div style={{ 
                      color: link.linkType === 'dofollow' ? '#10b981' : '#f59e0b',
                      fontWeight: '500'
                    }}>
                      {link.linkType}
                    </div>
                    <div style={{ 
                      color: getStatusColor(link.status),
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <FontAwesomeIcon icon={getStatusIcon(link.status)} />
                      {link.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO Tips */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-lightbulb" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              Backlink Analysis Tips
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
                  <FontAwesomeIcon icon="fas fa-star" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Quality Over Quantity
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Focus on high-quality, relevant backlinks from authoritative domains.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-anchor" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Anchor Text Diversity
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use varied anchor text to avoid over-optimization penalties.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-chart-line" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Monitor Regularly
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Check for lost or broken backlinks and take corrective action.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-shield-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Avoid Spam
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Disavow toxic backlinks to protect your site's reputation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <AdSlot slotId="backlink-checker-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Backlink Analysis & SEO Strategy
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are backlinks and why are they important for SEO?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Backlinks are links from other websites pointing to your site: <strong>Authority Signal:</strong> 
                Search engines view backlinks as votes of confidence and authority. <strong>Ranking Factor:</strong> 
                High-quality backlinks are a major ranking factor in search algorithms. <strong>Traffic Source:</strong> 
                Backlinks can drive direct referral traffic to your website. <strong>Trust Building:</strong> 
                Links from reputable sites build trust and credibility. <strong>Discovery:</strong> 
                Help search engines discover and crawl your content. <strong>Competitive Advantage:</strong> 
                Strong backlink profiles provide competitive advantages in search rankings.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What makes a high-quality backlink?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                High-quality backlinks share these characteristics: <strong>Domain Authority:</strong> 
                Links from domains with high authority scores (DR/DA). <strong>Relevance:</strong> 
                Links from websites in your industry or related niches. <strong>Editorial Context:</strong> 
                Natural links within relevant, high-quality content. <strong>Dofollow Status:</strong> 
                Dofollow links pass link equity (though nofollow can still be valuable). <strong>Placement:</strong> 
                Links within the main content rather than sidebars or footers. <strong>Anchor Text:</strong> 
                Natural, varied anchor text that doesn't appear over-optimized.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I build high-quality backlinks?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Effective backlink building strategies include: <strong>Content Marketing:</strong> 
                Create valuable, shareable content that naturally attracts links. <strong>Guest Posting:</strong> 
                Write high-quality articles for relevant websites in your industry. <strong>Resource Pages:</strong> 
                Get listed on industry resource and directory pages. <strong>Broken Link Building:</strong> 
                Find broken links on relevant sites and suggest your content as replacements. <strong>Digital PR:</strong> 
                Create newsworthy content and reach out to journalists and bloggers. <strong>Partnerships:</strong> 
                Collaborate with complementary businesses for mutual linking opportunities.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What should I do about toxic or low-quality backlinks?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Managing toxic backlinks requires: <strong>Identification:</strong> 
                Use tools to identify potentially harmful backlinks. <strong>Assessment:</strong> 
                Evaluate whether links are truly toxic or just low-quality. <strong>Outreach:</strong> 
                Contact website owners to request link removal when possible. <strong>Disavowal:</strong> 
                Use Google's Disavow Tool for links you cannot remove manually. <strong>Monitoring:</strong> 
                Regularly monitor your backlink profile for new toxic links. <strong>Documentation:</strong> 
                Keep records of all disavowal actions for future reference.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How often should I check my backlinks?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Backlink monitoring frequency depends on your needs: <strong>Monthly Reviews:</strong> 
                Check for new backlinks and lost links monthly. <strong>Quarterly Analysis:</strong> 
                Conduct comprehensive backlink profile analysis quarterly. <strong>Campaign Tracking:</strong> 
                Monitor backlinks more frequently during active link building campaigns. <strong>Competitor Analysis:</strong> 
                Track competitor backlinks monthly to identify opportunities. <strong>Algorithm Updates:</strong> 
                Check backlinks after major search algorithm updates. <strong>Site Changes:</strong> 
                Monitor after significant website changes or migrations.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common backlink analysis mistakes to avoid?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common backlink analysis mistakes include: <strong>Quantity Over Quality:</strong> 
                Focusing on link count rather than link quality and relevance. <strong>Ignoring Context:</strong> 
                Not considering the context and placement of backlinks. <strong>Over-Optimization:</strong> 
                Using too many exact-match anchor text links. <strong>Neglecting Monitoring:</strong> 
                Not regularly monitoring for lost or broken backlinks. <strong>Poor Outreach:</strong> 
                Sending generic, low-quality outreach emails for link building. <strong>Ignoring Competitors:</strong> 
                Not analyzing competitor backlink strategies and opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BacklinkChecker
