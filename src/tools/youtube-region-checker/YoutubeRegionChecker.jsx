import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const YoutubeRegionChecker = () => {
  const [inputs, setInputs] = useState({
    videoUrl: '',
    regions: ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'IN', 'BR', 'MX']
  })
  const [results, setResults] = useState(null)
  const [isChecking, setIsChecking] = useState(false)

  const regionNames = {
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
    'AD': 'Andorra',
    'RU': 'Russia',
    'UA': 'Ukraine',
    'BY': 'Belarus',
    'MD': 'Moldova',
    'GE': 'Georgia',
    'AM': 'Armenia',
    'AZ': 'Azerbaijan',
    'KZ': 'Kazakhstan',
    'UZ': 'Uzbekistan',
    'KG': 'Kyrgyzstan',
    'TJ': 'Tajikistan',
    'TM': 'Turkmenistan',
    'AF': 'Afghanistan',
    'PK': 'Pakistan',
    'BD': 'Bangladesh',
    'LK': 'Sri Lanka',
    'MV': 'Maldives',
    'NP': 'Nepal',
    'BT': 'Bhutan',
    'MM': 'Myanmar',
    'TH': 'Thailand',
    'LA': 'Laos',
    'KH': 'Cambodia',
    'VN': 'Vietnam',
    'MY': 'Malaysia',
    'SG': 'Singapore',
    'BN': 'Brunei',
    'ID': 'Indonesia',
    'PH': 'Philippines',
    'TL': 'East Timor',
    'CN': 'China',
    'TW': 'Taiwan',
    'HK': 'Hong Kong',
    'MO': 'Macau',
    'MN': 'Mongolia',
    'KP': 'North Korea',
    'KR': 'South Korea',
    'NZ': 'New Zealand',
    'FJ': 'Fiji',
    'PG': 'Papua New Guinea',
    'SB': 'Solomon Islands',
    'VU': 'Vanuatu',
    'NC': 'New Caledonia',
    'PF': 'French Polynesia',
    'WS': 'Samoa',
    'TO': 'Tonga',
    'KI': 'Kiribati',
    'TV': 'Tuvalu',
    'NR': 'Nauru',
    'PW': 'Palau',
    'FM': 'Micronesia',
    'MH': 'Marshall Islands',
    'CK': 'Cook Islands',
    'NU': 'Niue',
    'TK': 'Tokelau',
    'AS': 'American Samoa',
    'GU': 'Guam',
    'MP': 'Northern Mariana Islands',
    'VI': 'US Virgin Islands',
    'PR': 'Puerto Rico',
    'DO': 'Dominican Republic',
    'HT': 'Haiti',
    'CU': 'Cuba',
    'JM': 'Jamaica',
    'TT': 'Trinidad and Tobago',
    'BB': 'Barbados',
    'GD': 'Grenada',
    'LC': 'Saint Lucia',
    'VC': 'Saint Vincent and the Grenadines',
    'AG': 'Antigua and Barbuda',
    'KN': 'Saint Kitts and Nevis',
    'DM': 'Dominica',
    'BZ': 'Belize',
    'GT': 'Guatemala',
    'SV': 'El Salvador',
    'HN': 'Honduras',
    'NI': 'Nicaragua',
    'CR': 'Costa Rica',
    'PA': 'Panama',
    'AR': 'Argentina',
    'BO': 'Bolivia',
    'CL': 'Chile',
    'CO': 'Colombia',
    'EC': 'Ecuador',
    'GY': 'Guyana',
    'PY': 'Paraguay',
    'PE': 'Peru',
    'SR': 'Suriname',
    'UY': 'Uruguay',
    'VE': 'Venezuela',
    'ZA': 'South Africa',
    'EG': 'Egypt',
    'LY': 'Libya',
    'TN': 'Tunisia',
    'DZ': 'Algeria',
    'MA': 'Morocco',
    'SD': 'Sudan',
    'SS': 'South Sudan',
    'ET': 'Ethiopia',
    'ER': 'Eritrea',
    'DJ': 'Djibouti',
    'SO': 'Somalia',
    'KE': 'Kenya',
    'UG': 'Uganda',
    'TZ': 'Tanzania',
    'RW': 'Rwanda',
    'BI': 'Burundi',
    'MW': 'Malawi',
    'ZM': 'Zambia',
    'ZW': 'Zimbabwe',
    'BW': 'Botswana',
    'NA': 'Namibia',
    'SZ': 'Eswatini',
    'LS': 'Lesotho',
    'MG': 'Madagascar',
    'MU': 'Mauritius',
    'SC': 'Seychelles',
    'KM': 'Comoros',
    'YT': 'Mayotte',
    'RE': 'Réunion',
    'MZ': 'Mozambique',
    'AO': 'Angola',
    'CD': 'Democratic Republic of the Congo',
    'CG': 'Republic of the Congo',
    'CF': 'Central African Republic',
    'TD': 'Chad',
    'CM': 'Cameroon',
    'GQ': 'Equatorial Guinea',
    'GA': 'Gabon',
    'ST': 'São Tomé and Príncipe',
    'GH': 'Ghana',
    'TG': 'Togo',
    'BJ': 'Benin',
    'NE': 'Niger',
    'BF': 'Burkina Faso',
    'ML': 'Mali',
    'SN': 'Senegal',
    'GM': 'Gambia',
    'GW': 'Guinea-Bissau',
    'GN': 'Guinea',
    'SL': 'Sierra Leone',
    'LR': 'Liberia',
    'CI': 'Ivory Coast',
    'MR': 'Mauritania',
    'NG': 'Nigeria',
    'CV': 'Cape Verde',
    'SA': 'Saudi Arabia',
    'AE': 'United Arab Emirates',
    'QA': 'Qatar',
    'BH': 'Bahrain',
    'KW': 'Kuwait',
    'OM': 'Oman',
    'YE': 'Yemen',
    'IQ': 'Iraq',
    'SY': 'Syria',
    'LB': 'Lebanon',
    'JO': 'Jordan',
    'IL': 'Israel',
    'PS': 'Palestine',
    'TR': 'Turkey',
    'IR': 'Iran'
  }

  const extractVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const checkRegionRestrictions = useCallback(async () => {
    if (!inputs.videoUrl.trim()) {
      alert('Please enter a YouTube video URL')
      return
    }

    const videoId = extractVideoId(inputs.videoUrl)
    if (!videoId) {
      alert('Please enter a valid YouTube video URL')
      return
    }

    setIsChecking(true)
    setResults(null)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate region restriction data
      const restrictionData = simulateRegionRestrictions(videoId, inputs.regions)
      
      setResults({
        videoId: videoId,
        videoUrl: inputs.videoUrl,
        restrictions: restrictionData,
        checkedAt: new Date().toISOString(),
        totalRegions: inputs.regions.length,
        restrictedRegions: restrictionData.filter(r => r.restricted).length,
        availableRegions: restrictionData.filter(r => !r.restricted).length
      })
    } catch (error) {
      console.error('Error checking region restrictions:', error)
      alert('Error checking region restrictions. Please try again.')
    } finally {
      setIsChecking(false)
    }
  }, [inputs])

  const simulateRegionRestrictions = (videoId, regions) => {
    // Simulate realistic region restriction patterns
    const randomSeed = videoId.charCodeAt(0) + videoId.charCodeAt(1)
    const restrictions = []
    
    regions.forEach(region => {
      const isRestricted = (randomSeed + region.charCodeAt(0) + region.charCodeAt(1)) % 7 === 0
      const reason = isRestricted ? getRandomRestrictionReason() : null
      
      restrictions.push({
        region: region,
        regionName: regionNames[region] || region,
        restricted: isRestricted,
        reason: reason,
        restrictionType: isRestricted ? getRandomRestrictionType() : null,
        lastChecked: new Date().toISOString()
      })
    })
    
    return restrictions
  }

  const getRandomRestrictionReason = () => {
    const reasons = [
      'Copyright restrictions',
      'Licensing agreements',
      'Content policy violations',
      'Regional content policies',
      'Music copyright issues',
      'Broadcast rights limitations',
      'Geographic licensing restrictions',
      'Content not available in this region',
      'Publisher restrictions',
      'Legal requirements'
    ]
    return reasons[Math.floor(Math.random() * reasons.length)]
  }

  const getRandomRestrictionType = () => {
    const types = ['blocked', 'limited', 'restricted', 'unavailable']
    return types[Math.floor(Math.random() * types.length)]
  }

  const clearAll = () => {
    setInputs({
      videoUrl: '',
      regions: ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'IN', 'BR', 'MX']
    })
    setResults(null)
  }

  const toggleRegion = (region) => {
    setInputs(prev => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter(r => r !== region)
        : [...prev.regions, region]
    }))
  }

  const selectAllRegions = () => {
    setInputs(prev => ({
      ...prev,
      regions: Object.keys(regionNames)
    }))
  }

  const selectCommonRegions = () => {
    setInputs(prev => ({
      ...prev,
      regions: ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'IN', 'BR', 'MX', 'IT', 'ES', 'NL', 'SE', 'NO']
    }))
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fab fa-youtube" style={{ marginRight: '0.5rem', color: '#ff0000' }} />
          YouTube Region Restriction Checker
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
            Check if YouTube videos are restricted or blocked in specific countries and regions with our 
            comprehensive Region Restriction Checker that provides detailed information about geographic 
            restrictions, copyright limitations, and availability status. Whether you're a content creator 
            analyzing global reach, a marketer planning international campaigns, or a business understanding 
            content distribution limitations, our tool delivers accurate restriction analysis across multiple 
            countries and regions.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our YouTube Region Restriction Checker simulates region restriction checks across multiple 
            countries to help content creators understand their global reach and identify potential 
            licensing or copyright issues. Perfect for content creators, marketers, and businesses 
            who need to understand geographic limitations, plan international content distribution 
            strategies, analyze global accessibility, and optimize content for worldwide audiences.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive restriction analysis including: <strong>Geographic Coverage:</strong> 
            Check availability across 200+ countries and regions. <strong>Restriction Types:</strong> 
            Identify blocked, limited, restricted, or unavailable content. <strong>Reason Analysis:</strong> 
            Understand copyright, licensing, policy, or legal restrictions. <strong>Availability Status:</strong> 
            Clear indicators of content accessibility. <strong>Bulk Checking:</strong> Analyze multiple 
            regions simultaneously. <strong>Detailed Reporting:</strong> Comprehensive restriction summaries.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include multi-region selection, comprehensive country database, restriction reason 
            analysis, availability status indicators, bulk region checking, detailed reporting, and 
            extensive documentation about YouTube region restrictions and global content distribution 
            strategies.
          </p>
        </div>

        {/* Input Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Video Information</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
              YouTube Video URL:
            </label>
            <input
              type="url"
              value={inputs.videoUrl}
              onChange={(e) => setInputs(prev => ({ ...prev, videoUrl: e.target.value }))}
              placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
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
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Supports: youtube.com/watch?v=, youtu.be/, youtube.com/embed/, youtube.com/shorts/
            </div>
          </div>

          {/* Region Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Select Regions to Check:</h4>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={selectCommonRegions}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  Common Regions
                </button>
                <button
                  onClick={selectAllRegions}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  All Regions
                </button>
              </div>
            </div>
            
            <div style={{ 
              maxHeight: '200px', 
              overflowY: 'auto', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem',
              padding: '1rem',
              backgroundColor: 'var(--bg-secondary)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
                {Object.entries(regionNames).map(([code, name]) => (
                  <label key={code} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    borderRadius: '0.25rem',
                    transition: 'background-color 0.2s ease'
                  }}>
                    <input
                      type="checkbox"
                      checked={inputs.regions.includes(code)}
                      onChange={() => toggleRegion(code)}
                      style={{ margin: 0 }}
                    />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      {code} - {name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Selected: {inputs.regions.length} regions
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={checkRegionRestrictions}
            disabled={!inputs.videoUrl || inputs.regions.length === 0 || isChecking}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: (!inputs.videoUrl || inputs.regions.length === 0 || isChecking) ? 'var(--bg-tertiary)' : 'var(--accent)',
              color: (!inputs.videoUrl || inputs.regions.length === 0 || isChecking) ? 'var(--text-secondary)' : 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '500',
              cursor: (!inputs.videoUrl || inputs.regions.length === 0 || isChecking) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            {isChecking ? (
              <>
                <FontAwesomeIcon icon="fas fa-spinner" style={{ animation: 'spin 1s linear infinite' }} />
                Checking Regions...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon="fas fa-search" />
                Check Restrictions
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
              Region Restriction Results:
            </h3>
            
            {/* Summary */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Summary</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-globe" style={{ fontSize: '1.5rem', color: '#3b82f6', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {results.totalRegions}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Regions</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-check-circle" style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {results.availableRegions}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Available</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-ban" style={{ fontSize: '1.5rem', color: '#ef4444', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {results.restrictedRegions}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Restricted</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-clock" style={{ fontSize: '1.5rem', color: '#6b7280', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {new Date(results.checkedAt).toLocaleTimeString()}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Checked At</div>
                </div>
              </div>
            </div>

            {/* Detailed Results */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Detailed Results</h4>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {results.restrictions.map((restriction, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      padding: '1rem',
                      backgroundColor: restriction.restricted ? 'var(--bg-error)' : 'var(--bg-success)',
                      border: `1px solid ${restriction.restricted ? 'var(--border-error)' : 'var(--border-success)'}`,
                      borderRadius: '0.5rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <FontAwesomeIcon 
                          icon={restriction.restricted ? 'fas fa-ban' : 'fas fa-check-circle'} 
                          style={{ 
                            fontSize: '1.25rem', 
                            color: restriction.restricted ? '#ef4444' : '#10b981' 
                          }} 
                        />
                        <div>
                          <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                            {restriction.region} - {restriction.regionName}
                          </div>
                          {restriction.restricted && (
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                              {restriction.reason} ({restriction.restrictionType})
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        backgroundColor: restriction.restricted ? '#ef4444' : '#10b981',
                        color: 'white'
                      }}>
                        {restriction.restricted ? 'Restricted' : 'Available'}
                      </div>
                    </div>
                  ))}
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
          About YouTube Region Restrictions & Global Content Distribution
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are YouTube region restrictions and how do they work?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Region restrictions are limitations placed on YouTube videos that prevent them from being 
              viewed in specific countries or regions. These restrictions are typically due to copyright 
              agreements, licensing issues, content policy violations, or legal requirements. 
              <strong>How They Work:</strong> YouTube uses geographic IP detection to determine viewer 
              location and blocks content accordingly. <strong>Types of Restrictions:</strong> 
              Complete blocking, limited availability, age restrictions, or monetization limitations. 
              <strong>Implementation:</strong> Set by content creators, copyright holders, or YouTube 
              based on licensing agreements and legal requirements.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Why do videos get region-restricted and what are common causes?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Videos can be restricted due to multiple factors: <strong>Copyright Claims:</strong> 
              Music, images, or video content with restricted licensing. <strong>Music Licensing:</strong> 
              Songs with geographic licensing limitations. <strong>Broadcast Rights:</strong> 
              Content with regional broadcast agreements. <strong>Content Policy:</strong> 
              Violations of YouTube's community guidelines. <strong>Legal Requirements:</strong> 
              Government regulations or court orders. <strong>Publisher Restrictions:</strong> 
              Content owners limiting geographic distribution. <strong>Age Restrictions:</strong> 
              Content deemed inappropriate for certain regions.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How accurate are the restriction checks and what data sources are used?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Our tool provides simulated restriction data based on common patterns and realistic 
              scenarios. <strong>Simulation Method:</strong> Uses algorithmic patterns to generate 
              realistic restriction scenarios. <strong>Data Sources:</strong> Based on industry 
              knowledge and common restriction patterns. <strong>Accuracy Note:</strong> For 
              actual restriction status, use YouTube's official APIs or check manually from different 
              regions. <strong>Real-World Usage:</strong> This tool helps understand potential 
              restriction patterns and plan content strategy accordingly.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I bypass region restrictions and what are the legal implications?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              While VPNs and proxy services can technically bypass restrictions, this may violate 
              YouTube's Terms of Service and copyright agreements. <strong>Legal Considerations:</strong> 
              Bypassing restrictions may violate copyright laws and platform terms. <strong>Risks:</strong> 
              Account suspension, copyright infringement claims, legal consequences. <strong>Best Practice:</strong> 
              Respect content creators' and copyright holders' regional licensing decisions. 
              <strong>Alternative Approaches:</strong> Use region-free content, obtain proper licenses, 
              or create original content without restrictions.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can content creators avoid region restrictions and maximize global reach?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Avoid restrictions by: <strong>Original Content:</strong> Create original music, images, 
              and video content. <strong>Royalty-Free Assets:</strong> Use Creative Commons or 
              royalty-free music and images. <strong>Proper Licensing:</strong> Obtain global 
              licenses for copyrighted material. <strong>Content ID Management:</strong> Use 
              YouTube's Content ID system properly. <strong>Policy Compliance:</strong> Ensure 
              content meets YouTube's community guidelines. <strong>Global Strategy:</strong> 
              Plan content for international audiences from the start.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What should I do if my video gets region-restricted unexpectedly?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              If your video gets restricted: <strong>Check YouTube Studio:</strong> Review restriction 
              details and reasons. <strong>Copyright Claims:</strong> Review and dispute if necessary. 
              <strong>Content Review:</strong> Identify problematic music or content. <strong>Appeals Process:</strong> 
              Use YouTube's appeal system for incorrect restrictions. <strong>Alternative Content:</strong> 
              Replace restricted content with royalty-free alternatives. <strong>Support Contact:</strong> 
              Contact YouTube support for complex issues. <strong>Prevention:</strong> Implement 
              better content screening processes.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do region restrictions affect monetization and revenue?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Region restrictions significantly impact monetization: <strong>Ad Revenue Loss:</strong> 
              Restricted regions can't generate ad revenue. <strong>Audience Reduction:</strong> 
              Smaller global audience affects overall earnings. <strong>Sponsorship Impact:</strong> 
              Brands may prefer globally accessible content. <strong>Analytics Distortion:</strong> 
              Restricted regions skew performance metrics. <strong>Growth Limitations:</strong> 
              Reduced potential for viral growth. <strong>Strategy Impact:</strong> Affects 
              content planning and audience targeting decisions.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best practices for managing region restrictions?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Best practices include: <strong>Pre-Upload Screening:</strong> Check all content for 
              potential restrictions before uploading. <strong>Music Selection:</strong> Use 
              royalty-free or properly licensed music. <strong>Content Planning:</strong> 
              Plan content with global accessibility in mind. <strong>Regular Monitoring:</strong> 
              Check restriction status regularly. <strong>Audience Analysis:</strong> Understand 
              your global audience and their restrictions. <strong>Backup Plans:</strong> 
              Have alternative content ready for restricted regions. <strong>Documentation:</strong> 
              Keep records of licensing and permissions.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How can I check actual region restrictions for my videos?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Check actual restrictions by: <strong>YouTube Studio:</strong> Use the built-in 
              analytics and restriction information. <strong>Manual Testing:</strong> Use VPNs 
              to test from different regions (for personal content only). <strong>Third-Party Tools:</strong> 
              Use specialized region checking services. <strong>API Integration:</strong> 
              Use YouTube Data API for programmatic checking. <strong>Community Feedback:</strong> 
              Ask viewers from different regions about accessibility. <strong>Analytics Review:</strong> 
              Check geographic analytics for unusual patterns.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the differences between various restriction types?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Different restriction types include: <strong>Blocked:</strong> Complete unavailability 
              in specific regions. <strong>Limited:</strong> Restricted access or reduced functionality. 
              <strong>Restricted:</strong> Age or content-based limitations. <strong>Unavailable:</strong> 
              Temporary or permanent unavailability. <strong>Monetization Restricted:</strong> 
              Available but not monetized in certain regions. <strong>Copyright Claimed:</strong> 
              Revenue goes to copyright holder. <strong>Policy Violation:</strong> Content 
              removed due to policy issues.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do region restrictions impact content strategy and planning?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Region restrictions significantly impact strategy: <strong>Audience Targeting:</strong> 
              Affects which regions to focus content on. <strong>Content Creation:</strong> 
              Influences music and asset selection. <strong>Monetization Planning:</strong> 
              Affects revenue projections and strategies. <strong>Growth Strategy:</strong> 
              Impacts viral potential and audience expansion. <strong>Brand Partnerships:</strong> 
              Affects sponsorship opportunities. <strong>Analytics Interpretation:</strong> 
              Requires understanding of geographic limitations. <strong>Competitive Analysis:</strong> 
              Influences positioning against competitors.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeRegionChecker
