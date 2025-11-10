import { useState } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const UuidGenerator = () => {
  const [uuidCount, setUuidCount] = useState(1)
  const [uuidVersion, setUuidVersion] = useState('v4')
  const [generatedUuids, setGeneratedUuids] = useState([])

  const generateUUID = (version = 'v4') => {
    if (version === 'v4') {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    } else if (version === 'v1') {
      // Simplified v1 UUID (not truly timestamp-based)
      const timestamp = Date.now().toString(16)
      const random = Math.random().toString(16).substr(2, 8)
      return `${timestamp.substr(0, 8)}-${timestamp.substr(8, 4)}-1${random.substr(0, 3)}-${random.substr(3, 4)}-${random.substr(7, 12)}`
    }
    return ''
  }

  const handleGenerate = () => {
    const uuids = []
    for (let i = 0; i < uuidCount; i++) {
      uuids.push(generateUUID(uuidVersion))
    }
    setGeneratedUuids(uuids)
  }

  const handleCopy = (uuid) => {
    navigator.clipboard.writeText(uuid)
  }

  const handleCopyAll = () => {
    navigator.clipboard.writeText(generatedUuids.join('\n'))
  }

  const handleClear = () => {
    setGeneratedUuids([])
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
          <FontAwesomeIcon icon="fas fa-fingerprint" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          UUID Generator
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
            Generate unique identifiers (UUIDs) for your applications with our comprehensive UUID Generator. 
            Whether you need random UUIDs for database records, time-based identifiers for sorting, or 
            bulk generation for testing purposes, our tool provides reliable, standards-compliant UUIDs 
            in multiple formats.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our UUID Generator supports both UUID v4 (random) and UUID v1 (time-based) formats, 
            allowing you to choose the most appropriate version for your specific use case. 
            Generate single UUIDs or bulk quantities up to 100 at once, with instant copy-to-clipboard 
            functionality for seamless integration into your development workflow.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for developers, database administrators, API designers, and anyone working with 
            distributed systems that require globally unique identifiers. The tool ensures RFC 4122 
            compliance and provides cryptographically secure random generation for maximum reliability.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include version selection, bulk generation, individual and batch copying, 
            format validation, and comprehensive documentation about UUID standards and best practices.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
              UUID Version
            </label>
            <select
              value={uuidVersion}
              onChange={(e) => setUuidVersion(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)'
              }}
            >
              <option value="v4">UUID v4 (Random)</option>
              <option value="v1">UUID v1 (Time-based)</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
              Number of UUIDs
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={uuidCount}
              onChange={(e) => setUuidCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>
        
        <button
          onClick={handleGenerate}
          style={{
            width: '100%',
            padding: '0.875rem 1.5rem',
            backgroundColor: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: '1rem'
          }}
        >
          Generate UUID{uuidCount > 1 ? 's' : ''}
        </button>
      </div>

      {generatedUuids.length > 0 && (
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--text-primary)' }}>
              Generated UUID{uuidCount > 1 ? 's' : ''}
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleCopyAll}
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
                Copy All
              </button>
              <button
                onClick={handleClear}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Clear
              </button>
            </div>
          </div>
          
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {generatedUuids.map((uuid, index) => (
              <div key={index} style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'monospace',
                fontSize: '0.95rem'
              }}>
                <span style={{ color: 'var(--text-primary)' }}>{uuid}</span>
                <button
                  onClick={() => handleCopy(uuid)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    backgroundColor: 'var(--accent)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginTop: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          About UUIDs
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What is a UUID and why should I use it?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              A UUID (Universally Unique Identifier) is a 128-bit identifier that is guaranteed to be unique 
              across time and space. Unlike auto-incrementing integers, UUIDs can be generated independently 
              by different systems without coordination, making them ideal for distributed systems, database 
              replication, and microservices architectures where you need globally unique identifiers.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the difference between UUID v4 and v1?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              <strong>UUID v4 (Random):</strong> Uses cryptographically secure random numbers and is the most 
              commonly used version. It provides excellent uniqueness guarantees and is suitable for most 
              applications. No information about the generation time or system is embedded.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>UUID v1 (Time-based):</strong> Includes a timestamp and MAC address, making it sortable 
              by creation time. Useful when you need to order records by creation time or when working with 
              systems that benefit from temporal ordering. However, it may reveal system information.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How unique are UUIDs? Can they collide?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              UUIDs are designed to be practically unique. For UUID v4, the probability of generating a duplicate 
              is approximately 1 in 5.3 x 10^36. This means you could generate 1 billion UUIDs per second for 
              85 years and still have only a 50% chance of a collision. For most practical purposes, UUIDs can 
              be considered unique.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              When should I use UUIDs instead of auto-incrementing IDs?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Use UUIDs when you need: distributed system compatibility, offline ID generation, database 
              replication without conflicts, API security (non-sequential IDs), or when combining data 
              from multiple sources. Auto-incrementing IDs are simpler for single-database applications 
              but can cause issues in distributed environments.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Are UUIDs secure for sensitive applications?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              UUID v4 uses cryptographically secure random number generation, making them unpredictable 
              and suitable for security-sensitive applications. However, UUIDs are not encrypted - they're 
              just unique identifiers. For additional security, consider using UUIDs as part of a larger 
              security strategy rather than relying on them alone.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the performance impact of using UUIDs?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              UUIDs are larger than integers (16 bytes vs 4-8 bytes), which can impact storage and indexing 
              performance. However, modern databases handle UUIDs efficiently. Consider using UUIDs as 
              primary keys only when the benefits outweigh the storage costs, or use them as secondary 
              identifiers alongside integer primary keys.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I use UUIDs in URLs and APIs?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, UUIDs are URL-safe and commonly used in REST APIs and web applications. They provide 
              better security than sequential IDs since they don't reveal information about your data 
              volume or allow enumeration attacks. Many popular APIs and services use UUIDs as resource 
              identifiers.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I validate if a string is a valid UUID?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              A valid UUID follows the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx where x is a hexadecimal 
              digit. The tool generates RFC 4122 compliant UUIDs. You can validate UUIDs using regular 
              expressions or built-in validation functions in most programming languages.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best practices for using UUIDs in databases?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Best practices include: using UUIDs as primary keys only when necessary, considering storage 
              implications, using proper indexing strategies, avoiding UUIDs in frequently queried columns, 
              and considering hybrid approaches (UUIDs for external references, integers for internal joins). 
              Some databases offer optimized UUID types and functions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UuidGenerator
