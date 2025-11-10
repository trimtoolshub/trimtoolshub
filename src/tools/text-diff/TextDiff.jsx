import { useState } from 'react'

const TextDiff = () => {
  const [leftText, setLeftText] = useState('')
  const [rightText, setRightText] = useState('')
  const [diffResult, setDiffResult] = useState('')
  const [mergedText, setMergedText] = useState('')

  const createDiff = () => {
    if (!leftText.trim() && !rightText.trim()) {
      setDiffResult('')
      setMergedText('')
      return
    }

    const leftLines = leftText.split('\n')
    const rightLines = rightText.split('\n')
    
    let diff = ''
    let merged = ''
    
    const maxLines = Math.max(leftLines.length, rightLines.length)
    
    for (let i = 0; i < maxLines; i++) {
      const leftLine = leftLines[i] || ''
      const rightLine = rightLines[i] || ''
      
      if (leftLine === rightLine) {
        // Lines are identical
        diff += `<div class="diff-line diff-same">${escapeHtml(leftLine)}</div>`
        merged += leftLine + '\n'
      } else if (leftLine && !rightLine) {
        // Line only in left
        diff += `<div class="diff-line diff-left">- ${escapeHtml(leftLine)}</div>`
        merged += leftLine + '\n'
      } else if (!leftLine && rightLine) {
        // Line only in right
        diff += `<div class="diff-line diff-right">+ ${escapeHtml(rightLine)}</div>`
        merged += rightLine + '\n'
      } else {
        // Lines are different
        diff += `<div class="diff-line diff-left">- ${escapeHtml(leftLine)}</div>`
        diff += `<div class="diff-line diff-right">+ ${escapeHtml(rightLine)}</div>`
        merged += rightLine + '\n'
      }
    }
    
    setDiffResult(diff)
    setMergedText(merged.trim())
  }

  const escapeHtml = (text) => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const clearAll = () => {
    setLeftText('')
    setRightText('')
    setDiffResult('')
    setMergedText('')
  }

  return (
    <div>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Text Diff & Merge
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
            Left Text:
          </label>
          <textarea
            value={leftText}
            onChange={(e) => setLeftText(e.target.value)}
            placeholder="Enter text to compare..."
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              color: 'var(--text-primary)',
              resize: 'vertical',
              fontFamily: 'monospace'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
            Right Text:
          </label>
          <textarea
            value={rightText}
            onChange={(e) => setRightText(e.target.value)}
            placeholder="Enter text to compare..."
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              color: 'var(--text-primary)',
              resize: 'vertical',
              fontFamily: 'monospace'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={createDiff}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Show Diff
        </button>
        <button
          onClick={clearAll}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Clear All
        </button>
      </div>

      {diffResult && (
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '1rem' }}>
            Diff Result:
          </h4>
          <div 
            style={{
              padding: '0.75rem',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              maxHeight: '300px',
              overflow: 'auto'
            }}
            dangerouslySetInnerHTML={{ __html: diffResult }}
          />
        </div>
      )}

      {mergedText && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: 0 }}>
              Merged Text:
            </h4>
            <button
              onClick={() => copyToClipboard(mergedText)}
              style={{
                padding: '0.25rem 0.5rem',
                backgroundColor: 'transparent',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Copy Merged
            </button>
          </div>
          <textarea
            value={mergedText}
            readOnly
            style={{
              width: '100%',
              minHeight: '150px',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              color: 'var(--text-primary)',
              resize: 'vertical',
              fontFamily: 'monospace'
            }}
          />
        </div>
      )}

      <style jsx>{`
        .diff-line {
          padding: 0.25rem 0.5rem;
          margin: 0.125rem 0;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.875rem;
        }
        
        .diff-same {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
        }
        
        .diff-left {
          background-color: rgba(220, 38, 38, 0.2);
          color: #fca5a5;
          border-left: 3px solid #dc2626;
        }
        
        .diff-right {
          background-color: rgba(34, 197, 94, 0.2);
          color: #86efac;
          border-left: 3px solid #22c55e;
        }
      `}</style>
    </div>
  )
}

export default TextDiff

