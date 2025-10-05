import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { toolsRegistry, searchTools, toolCategories, getToolsByCategoryWithMeta } from '../tools/registryData.js'
import SEO from '../components/SEO'
import AdSlot from '../components/AdSlot'
import FontAwesomeIcon from '../components/FontAwesomeIcon'
import '../styles/alltools-modern.css'

const AllTools = () => {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [filteredTools, setFilteredTools] = useState(toolsRegistry)
  const [toolsByCategory, setToolsByCategory] = useState({})

  useEffect(() => {
    let tools = toolsRegistry

    // Filter by category if selected
    if (selectedCategory) {
      tools = getToolsByCategoryWithMeta(selectedCategory).tools
    }

    // Filter by search query
    if (searchQuery) {
      tools = searchTools(searchQuery).filter(tool => 
        !selectedCategory || tool.category === selectedCategory
      )
    }

    setFilteredTools(tools)

    // Group tools by category
    const grouped = tools.reduce((acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = []
      }
      acc[tool.category].push(tool)
      return acc
    }, {})

    setToolsByCategory(grouped)
  }, [searchQuery, selectedCategory])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All Tools - TrimToolsHub",
    "description": "Browse all free online tools for developers, designers, and content creators",
    "url": "https://www.trimtoolshub.com/tools",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredTools.length,
      "itemListElement": filteredTools.slice(0, 10).map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": tool.name,
          "description": tool.shortDescription,
          "url": `https://www.trimtoolshub.com/tools/${tool.slug}`
        }
      }))
    }
  }

  return (
    <>
      <SEO 
        title="All Tools - Free Online Tools | TrimToolsHub"
        description="Browse all free online tools for developers, designers, and content creators. Text processing, data conversion, and utility tools."
        canonical="/tools"
        structuredData={structuredData}
      />
      
              <div className="tools-page-modern">
                <div className="container">
                  <div className="tools-layout">
                    <div className="tools-main">
                      <div className="tools-header">
                        <div className="breadcrumb-section">
                          {selectedCategory && (
                            <Link 
                              to="/tools"
                              className="breadcrumb-link"
                            >
                              <FontAwesomeIcon icon="fas fa-arrow-left" />
                              Back to All Tools
                            </Link>
                          )}
                          <h1 className="page-title">
                            {selectedCategory ? `${toolCategories.find(cat => cat.id === selectedCategory)?.name}` : 'All Tools'}
                          </h1>
                        </div>
                        
                        <div className="filters-section">
                          <div className="search-container">
                            <div className="search-input-wrapper">
                              <FontAwesomeIcon icon="fas fa-search" className="search-icon" />
                              <input
                                type="text"
                                className="search-input-modern"
                                placeholder="Search tools..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                              />
                            </div>
                          </div>
                          
                          <div className="filter-container">
                            <select
                              value={selectedCategory}
                              onChange={handleCategoryChange}
                              className="category-select-modern"
                            >
                              <option value="">All Categories</option>
                              {toolCategories.map(category => (
                                <option key={category.id} value={category.id}>
                                  {category.icon} {category.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          {(searchQuery || selectedCategory) && (
                            <button
                              onClick={clearFilters}
                              className="clear-filters-btn"
                            >
                              <FontAwesomeIcon icon="fas fa-times" />
                              Clear Filters
                            </button>
                          )}
                        </div>
                        
                        {selectedCategory && (
                          <div className="category-info-card">
                            <div className="category-info-content">
                              <FontAwesomeIcon 
                                icon={toolCategories.find(cat => cat.id === selectedCategory)?.icon || 'fas fa-tools'} 
                                className="category-info-icon"
                              />
                              <p className="category-info-text">
                                {toolCategories.find(cat => cat.id === selectedCategory)?.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {Object.keys(toolsByCategory).length > 0 ? (
                        <div className="tools-content">
                          {Object.entries(toolsByCategory).map(([categoryId, tools]) => {
                            const category = toolCategories.find(cat => cat.id === categoryId)
                            if (!category) return null
                            
                            return (
                              <div key={categoryId} className="category-section">
                                <div className="category-header-modern">
                                  <div className="category-icon-modern">
                                    <FontAwesomeIcon icon={category.icon} />
                                  </div>
                                  <div className="category-info">
                                    <h2 className="category-title">{category.name}</h2>
                                    <p className="category-subtitle">
                                      {category.description} • {tools.length} tool{tools.length !== 1 ? 's' : ''}
                                    </p>
                                  </div>
                                </div>

                                <div className="tools-grid-modern">
                                  {tools.map((tool) => (
                                    <Link key={tool.id} to={`/tools/${tool.slug}`} className="tool-card-modern">
                                      <div className="tool-card-header">
                                        <div className="tool-icon-modern">
                                          <FontAwesomeIcon icon={category.icon} />
                                        </div>
                                        <div className="tool-badge">
                                          {tool.featured && (
                                            <FontAwesomeIcon icon="fas fa-star" />
                                          )}
                                        </div>
                                      </div>
                                      <div className="tool-card-content">
                                        <h3 className="tool-title-modern">{tool.name}</h3>
                                        <p className="tool-description-modern">{tool.shortDescription}</p>
                                        <div className="tool-tags">
                                          <span className="tool-tag" style={{ backgroundColor: category.color }}>
                                            {category.name}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="tool-card-footer">
                                        <FontAwesomeIcon icon="fas fa-arrow-right" className="tool-arrow" />
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="no-results">
                          <div className="no-results-icon">
                            <FontAwesomeIcon icon="fas fa-search" />
                          </div>
                          <h3 className="no-results-title">No tools found</h3>
                          <p className="no-results-text">
                            No tools found matching "{searchQuery}"
                          </p>
                          <button
                            onClick={() => setSearchQuery('')}
                            className="clear-search-btn"
                          >
                            <FontAwesomeIcon icon="fas fa-refresh" />
                            Clear Search
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="tools-sidebar">
                      <div className="sidebar-ad-container">
                        <AdSlot 
                          slotId="sidebar-skyscraper" 
                          size="skyscraper" 
                          style={{ margin: '0 auto' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
}

export default AllTools
