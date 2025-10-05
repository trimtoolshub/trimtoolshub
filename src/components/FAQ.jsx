import { useState } from 'react'
import FontAwesomeIcon from './FontAwesomeIcon'

const FAQ = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(null)

  if (!faqs.length) return null

  return (
    <div style={{ 
      backgroundColor: 'var(--bg-card)', 
      border: '1px solid var(--border)', 
      borderRadius: '1rem', 
      padding: '2rem',
      marginTop: '2rem'
    }}>
      <h3 style={{ 
        marginBottom: '1.5rem', 
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <FontAwesomeIcon icon="fas fa-question-circle" style={{ color: 'var(--accent)' }} />
        Frequently Asked Questions
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: '0.75rem 0',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                fontWeight: '500',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '1rem'
              }}
            >
              <span>{faq.question}</span>
              <FontAwesomeIcon 
                icon={openIndex === index ? "fas fa-chevron-up" : "fas fa-chevron-down"} 
                style={{ color: 'var(--accent)' }}
              />
            </button>
            
            {openIndex === index && (
              <div style={{ 
                padding: '0.75rem 0',
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
