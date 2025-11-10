import { useState } from 'react'
import { marked } from 'marked'

const MdHtml = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('md-to-html')
  const [error, setError] = useState('')

  const convertText = () => {
    try {
      if (!input.trim()) {
        setError('Please enter text to convert')
        return
      }

      let result = ''
      
      if (mode === 'md-to-html') {
        // Configure marked options
        marked.setOptions({
          breaks: true,
          gfm: true
        })
        
        result = marked.parse(input)
      } else {
        // HTML to Markdown (basic conversion)
        result = htmlToMarkdown(input)
      }
      
      setOutput(result)
      setError('')
    } catch (err) {
      setError(`Conversion error: ${err.message}`)
      setOutput('')
    }
  }

  const htmlToMarkdown = (html) => {
    // Basic HTML to Markdown conversion
    let md = html
      // Headers
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n')
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n')
      .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n')
      .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n')
      // Bold and italic
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
      // Links
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      // Images
      .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)')
      .replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*>/gi, '![$1]($2)')
      // Code blocks
      .replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '```\n$1\n```')
      .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
      // Lists
      .replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, content) => {
        return content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
      })
      .replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, content) => {
        let counter = 1
        return content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${counter++}. $1\n`)
      })
      // Line breaks
      .replace(/<br[^>]*>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      // Remove remaining HTML tags
      .replace(/<[^>]*>/g, '')
      // Decode HTML entities
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      // Clean up extra whitespace
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim()

    return md
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  const previewHtml = () => {
    if (mode === 'md-to-html' && output) {
      const newWindow = window.open('', '_blank')
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>HTML Preview</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; }
            pre { background: #f5f5f5; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; }
            code { background: #f5f5f5; padding: 0.2rem 0.4rem; border-radius: 0.25rem; }
            blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 1rem; color: #666; }
          </style>
        </head>
        <body>
          ${output}
        </body>
        </html>
      `)
      newWindow.document.close()
    }
  }

  return (
    <div>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Markdown ↔ HTML Converter
      </h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          Conversion Mode:
        </label>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <input
              type="radio"
              name="mode"
              value="md-to-html"
              checked={mode === 'md-to-html'}
              onChange={(e) => setMode(e.target.value)}
            />
            Markdown → HTML
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <input
              type="radio"
              name="mode"
              value="html-to-md"
              checked={mode === 'html-to-md'}
              onChange={(e) => setMode(e.target.value)}
            />
            HTML → Markdown
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          {mode === 'md-to-html' ? 'Markdown Input:' : 'HTML Input:'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'md-to-html' ? '# Heading\n\n**Bold text** and *italic text*\n\n- List item 1\n- List item 2' : '<h1>Heading</h1>\n<p><strong>Bold text</strong> and <em>italic text</em></p>\n<ul>\n<li>List item 1</li>\n<li>List item 2</li>\n</ul>'}
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

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={convertText}
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
          Convert
        </button>
        {mode === 'md-to-html' && output && (
          <button
            onClick={previewHtml}
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
            Preview HTML
          </button>
        )}
      </div>

      {error && (
        <div style={{
          backgroundColor: '#dc2626',
          color: 'white',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}

      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--text-secondary)' }}>
              {mode === 'md-to-html' ? 'HTML Output:' : 'Markdown Output:'}
            </label>
            <button
              onClick={copyToClipboard}
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
              Copy
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            style={{
              width: '100%',
              minHeight: '200px',
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

      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
        <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '0.875rem' }}>
          Markdown Support:
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          Supports headers, bold/italic text, links, images, code blocks, lists, and more. 
          HTML to Markdown conversion provides basic functionality for common elements.
        </p>
      </div>
    </div>
  )
}

export default MdHtml

