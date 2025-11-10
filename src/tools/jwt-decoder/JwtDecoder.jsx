import { useState } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const JwtDecoder = () => {
  const [jwt, setJwt] = useState('')
  const [decodedData, setDecodedData] = useState(null)
  const [error, setError] = useState('')

  const decodeJWT = (token) => {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Must have 3 parts separated by dots.')
      }

      const [header, payload, signature] = parts
      
      const decodedHeader = JSON.parse(atob(header.replace(/-/g, '+').replace(/_/g, '/')))
      const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
      
      return {
        header: decodedHeader,
        payload: decodedPayload,
        signature: signature,
        raw: { header, payload, signature }
      }
    } catch (err) {
      throw new Error(`Failed to decode JWT: ${err.message}`)
    }
  }

  const handleDecode = () => {
    if (!jwt.trim()) {
      setError('Please enter a JWT token')
      return
    }

    try {
      const decoded = decodeJWT(jwt.trim())
      setDecodedData(decoded)
      setError('')
    } catch (err) {
      setError(err.message)
      setDecodedData(null)
    }
  }

  const handleClear = () => {
    setJwt('')
    setDecodedData(null)
    setError('')
  }

  const formatJSON = (obj) => {
    return JSON.stringify(obj, null, 2)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const isValidJWT = (token) => {
    const parts = token.split('.')
    return parts.length === 3 && parts.every(part => part.length > 0)
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
          <FontAwesomeIcon icon="fas fa-key" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          JWT Decoder
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
            Decode and analyze JSON Web Tokens (JWTs) with our comprehensive JWT Decoder. 
            Whether you're debugging authentication issues, verifying token contents, or 
            learning about JWT structure, our tool provides instant, secure decoding 
            with detailed analysis of header, payload, and signature components.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our JWT Decoder safely decodes tokens without sending them to external servers, 
            ensuring your sensitive authentication data remains private. The tool automatically 
            validates JWT format, provides formatted JSON output for easy reading, and includes 
            copy-to-clipboard functionality for seamless integration with your development workflow.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for developers, security professionals, API testers, and anyone working 
            with JWT-based authentication systems. The tool helps you understand token structure, 
            verify claims, debug authentication flows, and ensure proper token implementation 
            in your applications.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include secure client-side decoding, format validation, structured display 
            of header and payload data, signature verification information, and comprehensive 
            documentation about JWT standards and security best practices.
          </p>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
            JWT Token
          </label>
          <textarea
            value={jwt}
            onChange={(e) => setJwt(e.target.value)}
            placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
            style={{
              width: '100%',
              height: '120px',
              padding: '1rem',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              color: 'var(--text-primary)',
              resize: 'vertical',
              fontFamily: 'monospace',
              fontSize: '0.9rem'
            }}
          />
          {jwt && !isValidJWT(jwt) && (
            <p style={{ color: 'var(--warning)', marginTop: '0.5rem', fontSize: '0.875rem' }}>
              ⚠️ This doesn't look like a valid JWT format
            </p>
          )}
        </div>
        
        {error && (
          <div style={{ 
            backgroundColor: 'var(--error)', 
            color: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleDecode}
            disabled={!jwt.trim()}
            style={{
              padding: '0.875rem 2rem',
              backgroundColor: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: jwt.trim() ? 'pointer' : 'not-allowed',
              opacity: jwt.trim() ? 1 : 0.7,
              transition: 'all 0.2s ease'
            }}
          >
            Decode JWT
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

      {decodedData && (
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Decoded JWT
          </h3>
          
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Header */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Header</h4>
                <button
                  onClick={() => copyToClipboard(formatJSON(decodedData.header))}
                  style={{
                    padding: '0.375rem 0.75rem',
                    backgroundColor: 'var(--success)',
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
              <pre style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                fontFamily: 'monospace'
              }}>
                {formatJSON(decodedData.header)}
              </pre>
            </div>

            {/* Payload */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Payload</h4>
                <button
                  onClick={() => copyToClipboard(formatJSON(decodedData.payload))}
                  style={{
                    padding: '0.375rem 0.75rem',
                    backgroundColor: 'var(--success)',
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
              <pre style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                fontFamily: 'monospace'
              }}>
                {formatJSON(decodedData.payload)}
              </pre>
            </div>

            {/* Signature */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Signature</h4>
                <button
                  onClick={() => copyToClipboard(decodedData.signature)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    backgroundColor: 'var(--success)',
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
              <div style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                fontFamily: 'monospace',
                wordBreak: 'break-all'
              }}>
                {decodedData.signature}
              </div>
            </div>
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
          About JWT Tokens
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What is a JWT and how does it work?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              A JWT (JSON Web Token) is a compact, URL-safe token format used for securely transmitting 
              information between parties. It consists of three parts separated by dots: Header (algorithm 
              and token type), Payload (claims/data), and Signature (verification). JWTs are commonly used 
              for authentication and information exchange in web applications and APIs.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Is it safe to decode JWTs with this tool?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, our JWT Decoder operates entirely in your browser without sending tokens to external 
              servers. The decoding happens client-side using JavaScript, ensuring your sensitive authentication 
              data never leaves your device. However, be cautious about sharing decoded tokens as they may 
              contain sensitive information.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What information is typically stored in JWT payloads?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              JWT payloads commonly contain user identification (sub, user_id), expiration time (exp), 
              issued at time (iat), issuer (iss), audience (aud), and custom claims like roles, permissions, 
              or user preferences. The exact contents depend on your application's authentication system 
              and security requirements.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I verify if a JWT signature is valid?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              This tool only decodes JWTs - it doesn't verify signatures. Signature verification requires 
              the secret key or public key used to sign the token. To verify signatures, you need access 
              to the signing key and use JWT libraries in your programming language. Never trust decoded 
              tokens without proper signature verification.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the common JWT algorithms and their security implications?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Common algorithms include HMAC (HS256) using shared secrets, RSA (RS256) using public/private 
              key pairs, and ECDSA (ES256) using elliptic curve cryptography. HMAC is simpler but requires 
              secure secret sharing. RSA and ECDSA provide better security for distributed systems but are 
              more complex to implement correctly.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How long should JWT tokens be valid?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              JWT expiration times depend on your security requirements. Access tokens are typically short-lived 
              (15 minutes to 1 hour), while refresh tokens can be longer (days to weeks). Shorter expiration 
              times improve security but require more frequent token refresh. Consider your application's 
              security needs and user experience when setting expiration times.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the security risks associated with JWTs?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Common JWT security risks include: token theft through XSS attacks, insecure storage, weak 
              signing keys, algorithm confusion attacks, and token replay attacks. Mitigate these risks by 
              using HTTPS, secure storage practices, strong signing keys, proper algorithm validation, and 
              implementing token revocation mechanisms.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can JWTs be revoked or invalidated?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              JWTs are stateless by design, making revocation challenging. Common approaches include: 
              using short expiration times, maintaining a blacklist of revoked tokens, implementing 
              refresh token rotation, or using stateful session management alongside JWTs. Choose the 
              approach that best fits your security requirements and system architecture.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the difference between JWT and session-based authentication?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              JWTs are stateless tokens containing user information, while sessions store user state on 
              the server. JWTs work well for distributed systems and APIs but are harder to revoke. 
              Sessions provide better security control but require server-side storage. Many applications 
              use hybrid approaches combining both methods for optimal security and performance.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I implement JWT authentication in my application?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Implementation involves: choosing a signing algorithm and key, generating tokens upon login, 
              including tokens in API requests, validating tokens on the server, handling token expiration, 
              and implementing refresh mechanisms. Use established JWT libraries for your programming language 
              and follow security best practices for key management and token handling.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JwtDecoder
