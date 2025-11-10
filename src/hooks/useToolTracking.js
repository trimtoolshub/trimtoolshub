import { useEffect } from 'react'
import { autoTrackToolUsage } from '../lib/analytics'

// Hook to automatically track tool usage when a tool component mounts
export const useToolTracking = (toolSlug, toolName) => {
  useEffect(() => {
    if (toolSlug && toolName) {
      autoTrackToolUsage(toolSlug, toolName)
    }
  }, [toolSlug, toolName])
}

export default useToolTracking
