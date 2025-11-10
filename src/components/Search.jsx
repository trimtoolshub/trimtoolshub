import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toolsRegistry } from '../tools/registryData.js'

const Search = () => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    
    if (value.length > 0) {
      const filtered = toolsRegistry.filter(tool =>
        tool.name.toLowerCase().includes(value.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(value.toLowerCase()) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(value.toLowerCase()))
      ).slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/tools?search=${encodeURIComponent(query)}`)
      setQuery('')
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (tool) => {
    navigate(`/tools/${tool.slug}`)
    setQuery('')
    setShowSuggestions(false)
  }

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 200)
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search tools..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setShowSuggestions(true)}
          onBlur={handleBlur}
        />
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((tool) => (
            <div
              key={tool.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(tool)}
            >
              <div className="suggestion-name">{tool.name}</div>
              <div className="suggestion-desc">{tool.shortDescription}</div>
            </div>
          ))}
        </div>
      )}
      
      <style jsx>{`
        .suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-top: none;
          border-radius: 0 0 0.5rem 0.5rem;
          box-shadow: 0 4px 6px var(--shadow);
          z-index: 1000;
        }
        
        .suggestion-item {
          padding: 0.75rem 1rem;
          cursor: pointer;
          border-bottom: 1px solid var(--border);
          transition: background-color 0.2s ease;
        }
        
        .suggestion-item:last-child {
          border-bottom: none;
        }
        
        .suggestion-item:hover {
          background-color: var(--bg-tertiary);
        }
        
        .suggestion-name {
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        
        .suggestion-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  )
}

export default Search
