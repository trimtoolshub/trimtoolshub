import { useState, useCallback, useEffect } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState({
    score: 0,
    level: 'Very Weak',
    color: '#ef4444',
    feedback: []
  })
  const [showPassword, setShowPassword] = useState(false)
  const [checkHistory, setCheckHistory] = useState([])

  const calculatePasswordStrength = useCallback((pwd) => {
    if (!pwd) {
      return {
        score: 0,
        level: 'Very Weak',
        color: '#ef4444',
        feedback: ['Enter a password to check its strength']
      }
    }

    let score = 0
    const feedback = []
    const checks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /\d/.test(pwd),
      symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      commonWords: !['password', '123456', 'qwerty', 'abc123', 'admin', 'letmein'].some(word => 
        pwd.toLowerCase().includes(word)
      ),
      repeatedChars: !/(.)\1{2,}/.test(pwd),
      sequentialChars: !/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789|890)/i.test(pwd)
    }

    // Calculate score based on checks
    Object.values(checks).forEach(check => {
      if (check) score += 1
    })

    // Additional length bonus
    if (pwd.length >= 12) score += 1
    if (pwd.length >= 16) score += 1

    // Generate feedback
    if (!checks.length) feedback.push('Use at least 8 characters')
    if (!checks.uppercase) feedback.push('Add uppercase letters (A-Z)')
    if (!checks.lowercase) feedback.push('Add lowercase letters (a-z)')
    if (!checks.numbers) feedback.push('Add numbers (0-9)')
    if (!checks.symbols) feedback.push('Add special characters (!@#$%^&*)')
    if (!checks.commonWords) feedback.push('Avoid common words')
    if (!checks.repeatedChars) feedback.push('Avoid repeated characters')
    if (!checks.sequentialChars) feedback.push('Avoid sequential characters')

    // Determine strength level
    let level, color
    if (score <= 2) {
      level = 'Very Weak'
      color = '#ef4444'
    } else if (score <= 4) {
      level = 'Weak'
      color = '#f59e0b'
    } else if (score <= 6) {
      level = 'Fair'
      color = '#eab308'
    } else if (score <= 8) {
      level = 'Good'
      color = '#10b981'
    } else {
      level = 'Very Strong'
      color = '#059669'
    }

    return {
      score: Math.min(score, 10),
      level,
      color,
      feedback: feedback.length > 0 ? feedback : ['Excellent password strength!']
    }
  }, [])

  const handlePasswordChange = useCallback((value) => {
    setPassword(value)
    const strengthResult = calculatePasswordStrength(value)
    setStrength(strengthResult)
    
    // Add to history if password is not empty
    if (value.trim()) {
      setCheckHistory(prev => [{
        password: value,
        strength: strengthResult,
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 9)]) // Keep last 10 checks
    }
  }, [calculatePasswordStrength])

  const generateStrongPassword = useCallback(() => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    let generated = ''
    
    // Ensure at least one character from each category
    generated += uppercase[Math.floor(Math.random() * uppercase.length)]
    generated += lowercase[Math.floor(Math.random() * lowercase.length)]
    generated += numbers[Math.floor(Math.random() * numbers.length)]
    generated += symbols[Math.floor(Math.random() * symbols.length)]
    
    // Fill remaining length with random characters
    const allChars = uppercase + lowercase + numbers + symbols
    for (let i = 4; i < 16; i++) {
      generated += allChars[Math.floor(Math.random() * allChars.length)]
    }
    
    // Shuffle the password
    generated = generated.split('').sort(() => Math.random() - 0.5).join('')
    
    handlePasswordChange(generated)
  }, [handlePasswordChange])

  const clearHistory = () => {
    setCheckHistory([])
    setPassword('')
    setStrength({
      score: 0,
      level: 'Very Weak',
      color: '#ef4444',
      feedback: ['Enter a password to check its strength']
    })
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const getStrengthBarWidth = () => {
    return (strength.score / 10) * 100
  }

  const getStrengthIcon = (level) => {
    switch (level) {
      case 'Very Strong': return 'fas fa-shield-alt'
      case 'Good': return 'fas fa-check-circle'
      case 'Fair': return 'fas fa-exclamation-triangle'
      case 'Weak': return 'fas fa-times-circle'
      case 'Very Weak': return 'fas fa-ban'
      default: return 'fas fa-question-circle'
    }
  }

  return (
    <>
      <SEOHead
        title="Password Strength Checker - Test Password Security"
        description="Check your password strength and security. Get detailed analysis, suggestions for improvement, and generate strong passwords. Free password security tool."
        canonical="/tools/password-strength-checker"
        keywords={['password strength checker', 'password security', 'strong password', 'password generator', 'password analysis']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'Password Strength Checker',
          description: 'Check password strength and security',
          url: 'https://www.trimtoolshub.com/tools/password-strength-checker',
          applicationCategory: 'SecurityApplication',
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
          <FontAwesomeIcon icon="fas fa-shield-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Password Strength Checker
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
            Analyze your password strength and security with our comprehensive Password Strength Checker. 
            Get detailed feedback on password vulnerabilities, receive improvement suggestions, and generate 
            strong, secure passwords for better online security.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our password checker evaluates multiple security factors including length, character variety, 
            common patterns, and vulnerability to attacks. Perfect for individuals, businesses, and 
            developers looking to improve password security practices.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive analysis including: <strong>Strength Assessment:</strong> 
            Evaluate password strength on a 10-point scale. <strong>Security Analysis:</strong> 
            Check for common vulnerabilities and weak patterns. <strong>Improvement Suggestions:</strong> 
            Get specific recommendations for stronger passwords. <strong>Password Generation:</strong> 
            Generate secure, random passwords. <strong>History Tracking:</strong> 
            Keep track of checked passwords. <strong>Real-time Feedback:</strong> 
            Instant analysis as you type.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include strength assessment, security analysis, improvement suggestions, password generation, 
            history tracking, real-time feedback, and comprehensive documentation about password security best practices.
          </p>
        </div>
        
        <AdSlot slotId="password-checker-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          {/* Password Input */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-key" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              Check Password Strength
            </h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Enter password to check strength..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 3rem 0.75rem 1rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    fontFamily: 'monospace'
                  }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '0.5rem'
                  }}
                >
                  <FontAwesomeIcon icon={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
                </button>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={generateStrongPassword}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-random" />
                Generate Strong Password
              </button>
              
              <button
                onClick={clearHistory}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-trash" />
                Clear History
              </button>
            </div>
          </div>

          {/* Strength Display */}
          {password && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon={getStrengthIcon(strength.level)} style={{ marginRight: '0.5rem', color: strength.color }} />
                Password Strength Analysis
              </h4>
              
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                marginBottom: '1rem'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold', 
                      color: strength.color,
                      marginBottom: '0.25rem'
                    }}>
                      {strength.level}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Score: {strength.score}/10
                    </div>
                  </div>
                  
                  <div style={{ width: '200px' }}>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: 'var(--bg-tertiary)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${getStrengthBarWidth()}%`,
                        height: '100%',
                        backgroundColor: strength.color,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    Recommendations:
                  </h5>
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: '1.5rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6'
                  }}>
                    {strength.feedback.map((item, index) => (
                      <li key={index} style={{ marginBottom: '0.25rem' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Security Tips */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-lightbulb" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              Password Security Tips
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
                  <FontAwesomeIcon icon="fas fa-ruler" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Length Matters
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use at least 12-16 characters for better security.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-puzzle-piece" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Mix Character Types
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Combine uppercase, lowercase, numbers, and symbols.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-ban" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Avoid Patterns
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Don't use sequential or repeated characters.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-unique" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Unique Passwords
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use different passwords for each account.
                </p>
              </div>
            </div>
          </div>

          {/* Check History */}
          {checkHistory.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-history" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Check History ({checkHistory.length})
              </h4>
              
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                overflow: 'hidden'
              }}>
                {checkHistory.map((check, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    borderBottom: index < checkHistory.length - 1 ? '1px solid var(--border)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: check.strength.color,
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.2rem'
                    }}>
                      <FontAwesomeIcon icon={getStrengthIcon(check.strength.level)} />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontWeight: '600', 
                        color: 'var(--text-primary)',
                        marginBottom: '0.25rem'
                      }}>
                        {check.strength.level} ({check.strength.score}/10)
                      </div>
                      <div style={{ 
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        fontFamily: 'monospace',
                        marginBottom: '0.25rem'
                      }}>
                        {check.password.length > 20 ? check.password.substring(0, 20) + '...' : check.password}
                      </div>
                      <div style={{ 
                        color: 'var(--text-secondary)',
                        fontSize: '0.8rem'
                      }}>
                        {new Date(check.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <AdSlot slotId="password-checker-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Password Security & Best Practices
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What makes a password strong and secure?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                A strong password combines multiple security factors: <strong>Length:</strong> 
                Longer passwords are exponentially harder to crack (12+ characters recommended). <strong>Complexity:</strong> 
                Mix uppercase, lowercase, numbers, and special characters. <strong>Uniqueness:</strong> 
                Avoid common words, patterns, and personal information. <strong>Randomness:</strong> 
                Use unpredictable character combinations. <strong>Variety:</strong> 
                Different passwords for different accounts. <strong>Regular Updates:</strong> 
                Change passwords periodically, especially after security incidents.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do hackers crack passwords?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common password cracking methods include: <strong>Brute Force:</strong> 
                Trying every possible combination systematically. <strong>Dictionary Attacks:</strong> 
                Using common words and phrases from dictionaries. <strong>Social Engineering:</strong> 
                Gathering personal information to guess passwords. <strong>Rainbow Tables:</strong> 
                Pre-computed hash tables for common passwords. <strong>Phishing:</strong> 
                Tricking users into revealing passwords. <strong>Keyloggers:</strong> 
                Malware that records keystrokes. <strong>Data Breaches:</strong> 
                Using passwords from compromised databases.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Should I use a password manager?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Password managers offer significant security benefits: <strong>Strong Passwords:</strong> 
                Generate and store complex, unique passwords for each account. <strong>Convenience:</strong> 
                Auto-fill passwords across devices and browsers. <strong>Security:</strong> 
                Encrypted storage protects your passwords from unauthorized access. <strong>Organization:</strong> 
                Centralized management of all your passwords. <strong>Updates:</strong> 
                Easy to update passwords when needed. <strong>Backup:</strong> 
                Secure backup and recovery options. <strong>Best Practice:</strong> 
                Use a reputable password manager with strong encryption.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common password mistakes to avoid?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common password mistakes include: <strong>Weak Patterns:</strong> 
                Using "123456", "password", or keyboard patterns. <strong>Personal Information:</strong> 
                Using names, birthdays, or other easily guessable data. <strong>Reusing Passwords:</strong> 
                Using the same password across multiple accounts. <strong>Short Length:</strong> 
                Using passwords shorter than 8 characters. <strong>No Variety:</strong> 
                Not mixing different character types. <strong>Common Words:</strong> 
                Using dictionary words without modification. <strong>Predictable Sequences:</strong> 
                Using sequential numbers or letters.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How often should I change my passwords?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Password change frequency depends on several factors: <strong>High-Risk Accounts:</strong> 
                Change banking and financial passwords every 3-6 months. <strong>Regular Accounts:</strong> 
                Change general account passwords every 6-12 months. <strong>After Breaches:</strong> 
                Immediately change passwords if an account is compromised. <strong>Shared Accounts:</strong> 
                Change passwords when access is no longer needed. <strong>Work Accounts:</strong> 
                Follow company policies (often every 90 days). <strong>Strong Passwords:</strong> 
                If using strong, unique passwords, less frequent changes may be acceptable.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Is my password data secure when using this tool?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Your password security is our priority: <strong>Local Processing:</strong> 
                Password analysis happens entirely in your browser. <strong>No Data Storage:</strong> 
                Passwords are not stored on our servers. <strong>No Transmission:</strong> 
                Password data never leaves your device. <strong>History Management:</strong> 
                Check history is stored locally and can be cleared anytime. <strong>Privacy Protection:</strong> 
                No tracking or logging of password data. <strong>Secure Connection:</strong> 
                All connections use HTTPS encryption. <strong>Open Source:</strong> 
                Code is transparent and auditable for security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PasswordStrengthChecker
