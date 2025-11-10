import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeMoneyCalculator = () => {
  const [inputs, setInputs] = useState({
    views: '',
    subscribers: '',
    country: 'US',
    niche: 'general',
    cpm: '',
    rpm: ''
  })
  const [results, setResults] = useState(null)

  const countries = {
    'US': { name: 'United States', cpm: 2.5, rpm: 1.8 },
    'UK': { name: 'United Kingdom', cpm: 2.2, rpm: 1.6 },
    'CA': { name: 'Canada', cpm: 2.0, rpm: 1.4 },
    'AU': { name: 'Australia', cpm: 1.8, rpm: 1.3 },
    'DE': { name: 'Germany', cpm: 1.5, rpm: 1.1 },
    'FR': { name: 'France', cpm: 1.4, rpm: 1.0 },
    'JP': { name: 'Japan', cpm: 1.2, rpm: 0.9 },
    'IN': { name: 'India', cpm: 0.8, rpm: 0.6 },
    'BR': { name: 'Brazil', cpm: 0.7, rpm: 0.5 },
    'MX': { name: 'Mexico', cpm: 0.6, rpm: 0.4 }
  }

  const niches = {
    'general': { name: 'General', multiplier: 1.0 },
    'gaming': { name: 'Gaming', multiplier: 0.8 },
    'tech': { name: 'Technology', multiplier: 1.2 },
    'education': { name: 'Education', multiplier: 1.1 },
    'entertainment': { name: 'Entertainment', multiplier: 1.0 },
    'music': { name: 'Music', multiplier: 0.9 },
    'lifestyle': { name: 'Lifestyle', multiplier: 1.1 },
    'business': { name: 'Business', multiplier: 1.3 },
    'health': { name: 'Health & Fitness', multiplier: 1.2 },
    'food': { name: 'Food & Cooking', multiplier: 1.0 }
  }

  const calculateEarnings = useCallback(() => {
    const views = parseInt(inputs.views) || 0
    const subscribers = parseInt(inputs.subscribers) || 0
    
    if (views === 0) {
      alert('Please enter the number of views')
      return
    }

    const countryData = countries[inputs.country]
    const nicheData = niches[inputs.niche]
    
    // Use custom CPM/RPM if provided, otherwise use defaults
    const cpm = inputs.cpm ? parseFloat(inputs.cpm) : countryData.cpm
    const rpm = inputs.rpm ? parseFloat(inputs.rpm) : countryData.rpm
    
    // Apply niche multiplier
    const adjustedCpm = cpm * nicheData.multiplier
    const adjustedRpm = rpm * nicheData.multiplier
    
    // Calculate earnings
    const monthlyViews = views
    const yearlyViews = monthlyViews * 12
    
    // AdSense revenue (before YouTube's 45% cut)
    const monthlyAdRevenue = (monthlyViews / 1000) * adjustedCpm
    const yearlyAdRevenue = monthlyAdRevenue * 12
    
    // Revenue after YouTube's cut (45%)
    const monthlyEarnings = monthlyAdRevenue * 0.55
    const yearlyEarnings = monthlyEarnings * 12
    
    // RPM calculations
    const monthlyRpmRevenue = (monthlyViews / 1000) * adjustedRpm
    const yearlyRpmRevenue = monthlyRpmRevenue * 12
    
    // Additional revenue streams
    const sponsorships = monthlyEarnings * 0.3 // 30% of ad revenue
    const merchandise = monthlyEarnings * 0.1 // 10% of ad revenue
    const affiliate = monthlyEarnings * 0.15 // 15% of ad revenue
    
    const totalMonthly = monthlyEarnings + sponsorships + merchandise + affiliate
    const totalYearly = totalMonthly * 12
    
    // Engagement metrics
    const engagementRate = subscribers > 0 ? (views / subscribers) * 100 : 0
    const avgViewsPerVideo = Math.floor(views / 10) // Assuming 10 videos per month
    
    setResults({
      monthly: {
        adRevenue: monthlyEarnings,
        sponsorships: sponsorships,
        merchandise: merchandise,
        affiliate: affiliate,
        total: totalMonthly
      },
      yearly: {
        adRevenue: yearlyEarnings,
        sponsorships: sponsorships * 12,
        merchandise: merchandise * 12,
        affiliate: affiliate * 12,
        total: totalYearly
      },
      metrics: {
        views: views,
        subscribers: subscribers,
        engagementRate: engagementRate,
        avgViewsPerVideo: avgViewsPerVideo,
        cpm: adjustedCpm,
        rpm: adjustedRpm
      },
      breakdown: {
        country: countryData.name,
        niche: nicheData.name,
        adRevenuePercentage: (monthlyEarnings / totalMonthly) * 100,
        otherRevenuePercentage: ((sponsorships + merchandise + affiliate) / totalMonthly) * 100
      }
    })
  }, [inputs])

  const clearAll = () => {
    setInputs({
      views: '',
      subscribers: '',
      country: 'US',
      niche: 'general',
      cpm: '',
      rpm: ''
    })
    setResults(null)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fab fa-youtube" style={{ marginRight: '0.5rem', color: '#ff0000' }} />
          YouTube Money Calculator
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
            Calculate potential YouTube earnings with our comprehensive Money Calculator that provides 
            detailed estimates for AdSense revenue, sponsorships, merchandise sales, and affiliate 
            income. Whether you're a content creator planning your monetization strategy, a YouTuber 
            analyzing revenue potential, or a marketer understanding creator economics, our tool 
            delivers accurate earning projections based on views, subscribers, location, and niche.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our YouTube Money Calculator considers YouTube's 45% revenue share, country-specific 
            CPM rates, niche multipliers, and additional revenue streams to provide realistic 
            earning estimates. Perfect for content creators, YouTubers, and marketers who need 
            to understand revenue potential, plan monetization strategies, analyze earning 
            projections, and optimize their content for maximum profitability.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool calculates comprehensive earnings including: <strong>AdSense Revenue:</strong> 
            Based on CPM/RPM rates and YouTube's revenue share. <strong>Sponsorships:</strong> 
            Brand partnership income estimates. <strong>Merchandise Sales:</strong> Product 
            revenue projections. <strong>Affiliate Marketing:</strong> Commission-based earnings. 
            <strong>Country-Specific Rates:</strong> Location-based CPM adjustments. 
            <strong>Niche Multipliers:</strong> Industry-specific earning factors.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include monthly and yearly projections, custom CPM/RPM input, multiple 
            revenue stream calculations, country and niche analysis, engagement metrics, 
            revenue breakdown percentages, and detailed documentation about YouTube monetization 
            strategies and earning optimization techniques.
          </p>
        </div>

        {/* Input Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Channel Information</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Monthly Views:
              </label>
              <input
                type="number"
                value={inputs.views}
                onChange={(e) => setInputs(prev => ({ ...prev, views: e.target.value }))}
                placeholder="100000"
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
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Subscribers:
              </label>
              <input
                type="number"
                value={inputs.subscribers}
                onChange={(e) => setInputs(prev => ({ ...prev, subscribers: e.target.value }))}
                placeholder="10000"
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
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Country:
              </label>
              <select
                value={inputs.country}
                onChange={(e) => setInputs(prev => ({ ...prev, country: e.target.value }))}
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
                {Object.entries(countries).map(([code, data]) => (
                  <option key={code} value={code}>{data.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                Niche:
              </label>
              <select
                value={inputs.niche}
                onChange={(e) => setInputs(prev => ({ ...prev, niche: e.target.value }))}
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
                {Object.entries(niches).map(([code, data]) => (
                  <option key={code} value={code}>{data.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'var(--bg-tertiary)', 
            border: '1px solid var(--border)', 
            borderRadius: '0.5rem', 
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Custom Rates (Optional)</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                  Custom CPM ($):
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.cpm}
                  onChange={(e) => setInputs(prev => ({ ...prev, cpm: e.target.value }))}
                  placeholder={`Default: ${countries[inputs.country].cpm}`}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                  Custom RPM ($):
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.rpm}
                  onChange={(e) => setInputs(prev => ({ ...prev, rpm: e.target.value }))}
                  placeholder={`Default: ${countries[inputs.country].rpm}`}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={calculateEarnings}
            disabled={!inputs.views}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: !inputs.views ? 'var(--bg-tertiary)' : 'var(--accent)',
              color: !inputs.views ? 'var(--text-secondary)' : 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '500',
              cursor: !inputs.views ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            <FontAwesomeIcon icon="fas fa-calculator" />
            Calculate Earnings
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
              Earnings Estimate:
            </h3>
            
            {/* Monthly Earnings */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Monthly Earnings</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-ad" style={{ fontSize: '1.5rem', color: '#3b82f6', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatCurrency(results.monthly.adRevenue)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Ad Revenue</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-handshake" style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatCurrency(results.monthly.sponsorships)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Sponsorships</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-tshirt" style={{ fontSize: '1.5rem', color: '#f59e0b', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatCurrency(results.monthly.merchandise)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Merchandise</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-link" style={{ fontSize: '1.5rem', color: '#8b5cf6', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatCurrency(results.monthly.affiliate)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Affiliate</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--accent)', borderRadius: '0.5rem', gridColumn: '1 / -1' }}>
                  <FontAwesomeIcon icon="fas fa-dollar-sign" style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>
                    {formatCurrency(results.monthly.total)}
                  </div>
                  <div style={{ fontSize: '1rem', color: 'white', opacity: 0.9 }}>Total Monthly</div>
                </div>
              </div>
            </div>

            {/* Yearly Earnings */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Yearly Earnings</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-ad" style={{ fontSize: '1.5rem', color: '#3b82f6', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatCurrency(results.yearly.adRevenue)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Ad Revenue</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-handshake" style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatCurrency(results.yearly.sponsorships)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Sponsorships</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-tshirt" style={{ fontSize: '1.5rem', color: '#f59e0b', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatCurrency(results.yearly.merchandise)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Merchandise</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-link" style={{ fontSize: '1.5rem', color: '#8b5cf6', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatCurrency(results.yearly.affiliate)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Affiliate</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#10b981', borderRadius: '0.5rem', gridColumn: '1 / -1' }}>
                  <FontAwesomeIcon icon="fas fa-calendar-alt" style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>
                    {formatCurrency(results.yearly.total)}
                  </div>
                  <div style={{ fontSize: '1rem', color: 'white', opacity: 0.9 }}>Total Yearly</div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Channel Metrics</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Monthly Views</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatNumber(results.metrics.views)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Subscribers</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatNumber(results.metrics.subscribers)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Engagement Rate</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {results.metrics.engagementRate.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Avg Views/Video</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {formatNumber(results.metrics.avgViewsPerVideo)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>CPM</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    ${results.metrics.cpm.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>RPM</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    ${results.metrics.rpm.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Revenue Breakdown</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Country</div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {results.breakdown.country}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Niche</div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {results.breakdown.niche}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Ad Revenue %</div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: '#3b82f6' }}>
                    {results.breakdown.adRevenuePercentage.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Other Revenue %</div>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: '#10b981' }}>
                    {results.breakdown.otherRevenuePercentage.toFixed(1)}%
                  </div>
                </div>
              </div>
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
          About YouTube Monetization & Revenue Optimization
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How accurate are these earnings estimates and what factors affect accuracy?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              These are estimates based on industry averages and typical CPM/RPM rates. Actual earnings 
              can vary significantly based on content quality, audience engagement, advertiser demand, 
              seasonal factors, video length, ad placement, and audience demographics. The calculator 
              uses: <strong>Industry Averages:</strong> Based on real creator data and market research. 
              <strong>Country-Specific Rates:</strong> CPM varies by geographic location and purchasing 
              power. <strong>Niche Multipliers:</strong> Different content categories have different 
              earning potential. <strong>Revenue Share:</strong> Accounts for YouTube's 45% cut. 
              Use these as a starting point for planning and adjust based on your specific situation.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What is CPM and RPM, and how do they differ?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              CPM (Cost Per Mille) is the amount advertisers pay per 1,000 ad impressions, while RPM 
              (Revenue Per Mille) is the amount you earn per 1,000 views after YouTube's 45% cut. 
              <strong>CPM:</strong> What advertisers pay for 1,000 ad views. <strong>RPM:</strong> 
              What creators earn per 1,000 video views. <strong>Key Difference:</strong> RPM is 
              typically 55% of CPM due to YouTube's revenue share. <strong>Factors Affecting Rates:</strong> 
              Audience demographics, content niche, video length, ad placement, seasonality, and 
              advertiser demand. Higher CPM niches include business, technology, and finance content.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Why do earnings vary significantly by country and location?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Advertisers pay different rates in different countries based on purchasing power, 
              market demand, competition, and economic factors. <strong>High-Earning Countries:</strong> 
              US, UK, Canada, Australia, Germany (CPM: $1.5-$2.5). <strong>Medium-Earning Countries:</strong> 
              France, Japan, Netherlands (CPM: $1.0-$1.5). <strong>Lower-Earning Countries:</strong> 
              India, Brazil, Mexico (CPM: $0.5-$1.0). <strong>Factors:</strong> GDP per capita, 
              advertising market size, competition levels, and advertiser targeting preferences. 
              <strong>Strategy:</strong> Focus on high-value markets or create content that appeals 
              to international audiences.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What additional revenue streams are included in the calculation?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We include multiple revenue streams beyond AdSense: <strong>Sponsorships:</strong> 
              Brand partnerships and product placements (30% of ad revenue). <strong>Merchandise:</strong> 
              Product sales and branded items (10% of ad revenue). <strong>Affiliate Marketing:</strong> 
              Commission-based product recommendations (15% of ad revenue). <strong>Additional Streams:</strong> 
              Channel memberships, Super Chat, YouTube Premium revenue, Patreon, courses, and consulting. 
              <strong>Diversification Benefits:</strong> Reduces dependence on ad revenue, provides 
              stability, and often offers higher profit margins than advertising alone.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can I increase my YouTube earnings and optimize revenue?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Focus on creating high-quality, engaging content, building a loyal audience, 
              optimizing for higher CPM niches, diversifying revenue streams, and maintaining 
              consistent upload schedules. <strong>Content Strategy:</strong> Create valuable, 
              entertaining, or educational content that keeps viewers engaged. <strong>Audience 
              Building:</strong> Focus on subscriber quality over quantity, encourage engagement. 
              <strong>Niche Optimization:</strong> Choose high-CPM niches like business, tech, 
              finance. <strong>Revenue Diversification:</strong> Develop multiple income streams. 
              <strong>Consistency:</strong> Regular upload schedule builds audience expectations.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What factors significantly affect CPM rates and earning potential?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              CPM rates are influenced by multiple factors: <strong>Audience Demographics:</strong> 
              Age, gender, income level, and location of your viewers. <strong>Content Niche:</strong> 
              Business and tech content typically have higher CPMs than entertainment. 
              <strong>Video Length:</strong> Longer videos allow more ad placements. 
              <strong>Ad Placement:</strong> Mid-roll ads often have higher rates than pre-roll. 
              <strong>Seasonality:</strong> Q4 typically has higher rates due to holiday advertising. 
              <strong>Advertiser Demand:</strong> Competition for ad space affects rates. 
              <strong>Content Quality:</strong> Higher engagement leads to better ad performance.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the requirements for YouTube monetization and earning money?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              YouTube Partner Program requirements include: <strong>Subscriber Threshold:</strong> 
              1,000 subscribers minimum. <strong>Watch Time:</strong> 4,000 hours of watch time 
              in the past 12 months. <strong>Content Guidelines:</strong> Advertiser-friendly 
              content that complies with community guidelines. <strong>Channel Standing:</strong> 
              No copyright strikes or policy violations. <strong>Geographic Availability:</strong> 
              Available in your country. <strong>AdSense Account:</strong> Must have a valid 
              AdSense account linked. <strong>Additional Requirements:</strong> Some features 
              require higher thresholds (e.g., Super Chat requires 1,000 subscribers).
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I optimize my content for maximum earning potential?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Optimize content for maximum earnings by: <strong>Audience Targeting:</strong> 
              Create content for high-value demographics. <strong>Engagement Focus:</strong> 
              Encourage likes, comments, and shares. <strong>Retention Optimization:</strong> 
              Keep viewers watching longer with compelling content. <strong>Thumbnail & Title:</strong> 
              Optimize for click-through rates. <strong>SEO Optimization:</strong> Use relevant 
              keywords and tags. <strong>Consistent Uploads:</strong> Regular schedule builds 
              audience loyalty. <strong>Community Building:</strong> Respond to comments and 
              build relationships. <strong>Analytics Monitoring:</strong> Track performance 
              and adjust strategy based on data.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best practices for diversifying YouTube revenue streams?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Diversify revenue streams by: <strong>Sponsorships:</strong> Partner with brands 
              for product placements and reviews. <strong>Affiliate Marketing:</strong> Recommend 
              products and earn commissions. <strong>Merchandise:</strong> Create branded products 
              and merchandise. <strong>Courses & Consulting:</strong> Offer educational content 
              or services. <strong>Channel Memberships:</strong> Offer exclusive content to 
              paying subscribers. <strong>Super Chat:</strong> Enable viewer donations during 
              live streams. <strong>External Platforms:</strong> Use Patreon, OnlyFans, or 
              other platforms. <strong>Speaking & Events:</strong> Leverage your audience 
              for speaking opportunities.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I track and analyze my YouTube earnings performance?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Track earnings performance by: <strong>YouTube Analytics:</strong> Monitor 
              revenue, RPM, and CPM trends. <strong>Revenue Tracking:</strong> Track all 
              income streams separately. <strong>Performance Metrics:</strong> Monitor 
              views, engagement, and subscriber growth. <strong>Comparative Analysis:</strong> 
              Compare performance across different content types. <strong>Goal Setting:</strong> 
              Set realistic revenue targets and track progress. <strong>Seasonal Analysis:</strong> 
              Understand seasonal trends and plan accordingly. <strong>ROI Calculation:</strong> 
              Calculate return on investment for different content types and strategies.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are common mistakes that reduce YouTube earning potential?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Common mistakes that reduce earnings include: <strong>Inconsistent Uploads:</strong> 
              Irregular posting schedule hurts algorithm performance. <strong>Poor Content Quality:</strong> 
              Low-quality content reduces engagement and ad performance. <strong>Ignoring Analytics:</strong> 
              Not using data to optimize content strategy. <strong>Over-Monetization:</strong> 
              Too many ads can hurt viewer experience. <strong>Niche Confusion:</strong> 
              Unclear content focus confuses the algorithm. <strong>Ignoring Community:</strong> 
              Not engaging with audience reduces loyalty. <strong>Copyright Issues:</strong> 
              Violations can demonetize content. <strong>Inconsistent Branding:</strong> 
              Weak brand identity reduces sponsorship opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeMoneyCalculator
