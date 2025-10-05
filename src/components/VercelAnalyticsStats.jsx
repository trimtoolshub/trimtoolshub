import { useState, useEffect } from 'react'
import FontAwesomeIcon from './FontAwesomeIcon'

const VercelAnalyticsStats = () => {
  const [visitors, setVisitors] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading analytics data
    // In a real implementation, you would fetch from Vercel Analytics API
    const loadStats = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data - replace with actual Vercel Analytics API call
        setVisitors(1247)
        setLoading(false)
      } catch (error) {
        console.error('Failed to load analytics:', error)
        setVisitors(0)
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="analytics-stat">
        <div className="stat-icon">
          <FontAwesomeIcon icon="fas fa-spinner fa-spin" />
        </div>
        <div className="stat-content">
          <span className="stat-number">Loading...</span>
          <span className="stat-label">Visitors</span>
        </div>
      </div>
    )
  }

  return (
    <div className="analytics-stat">
      <div className="stat-icon">
        <FontAwesomeIcon icon="fas fa-users" />
      </div>
      <div className="stat-content">
        <span className="stat-number">{visitors.toLocaleString()}</span>
        <span className="stat-label">Visitors</span>
      </div>
    </div>
  )
}

export default VercelAnalyticsStats
