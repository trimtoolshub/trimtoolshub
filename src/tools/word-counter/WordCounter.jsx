import { useState, useEffect } from 'react'

const WordCounter = () => {
  const [text, setText] = useState('')
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  })

  useEffect(() => {
    calculateStats(text)
  }, [text])

  const calculateStats = (inputText) => {
    if (!inputText.trim()) {
      setStats({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0
      })
      return
    }

    const characters = inputText.length
    const charactersNoSpaces = inputText.replace(/\s/g, '').length
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0).length
    const sentences = inputText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length
    const paragraphs = inputText.split(/\n\s*\n/).filter(para => para.trim().length > 0).length
    const readingTime = Math.ceil(words / 200) // Average reading speed: 200 words per minute

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime
    })
  }

  const copyStats = () => {
    const statsText = `Text Statistics:
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Words: ${stats.words}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Reading time: ${stats.readingTime} minute${stats.readingTime !== 1 ? 's' : ''}`
    
    navigator.clipboard.writeText(statsText)
  }

  const clearText = () => {
    setText('')
  }

  return (
    <div>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Word Counter & Reading Time
      </h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          Text Input:
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here to analyze word count, character count, and reading time..."
          style={{
            width: '100%',
            minHeight: '200px',
            padding: '0.75rem',
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem',
            color: 'var(--text-primary)',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={copyStats}
          disabled={!text.trim()}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: text.trim() ? 'var(--accent)' : 'var(--bg-secondary)',
            color: text.trim() ? 'white' : 'var(--text-muted)',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: text.trim() ? 'pointer' : 'not-allowed',
            fontWeight: '500'
          }}
        >
          Copy Statistics
        </button>
        <button
          onClick={clearText}
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
          Clear
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
            {stats.characters.toLocaleString()}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Characters
          </div>
        </div>

        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
            {stats.charactersNoSpaces.toLocaleString()}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Characters (no spaces)
          </div>
        </div>

        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
            {stats.words.toLocaleString()}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Words
          </div>
        </div>

        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
            {stats.sentences.toLocaleString()}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Sentences
          </div>
        </div>

        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
            {stats.paragraphs.toLocaleString()}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Paragraphs
          </div>
        </div>

        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.5rem' }}>
            {stats.readingTime}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Reading Time (min)
          </div>
        </div>
      </div>

      <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
        <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '0.875rem' }}>
          Reading Time Calculation:
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          Reading time is calculated based on an average reading speed of 200 words per minute. 
          This is a general estimate and may vary depending on content complexity and reader proficiency.
        </p>
      </div>
    </div>
  )
}

export default WordCounter

