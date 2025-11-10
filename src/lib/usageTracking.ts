/**
 * Usage tracking for rate limiting
 */

const STORAGE_PREFIX = 'tth-usage-';
const DEFAULT_LIMIT = 10; // Free tier limit per day
const RESET_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export interface UsageData {
  count: number;
  resetTime: number;
  operations: Array<{
    tool: string;
    operation: string;
    timestamp: number;
  }>;
}

/**
 * Get usage data for a specific tool or overall
 */
export function getUsageData(tool?: string): UsageData {
  if (typeof window === 'undefined') {
    return { count: 0, resetTime: Date.now() + RESET_INTERVAL, operations: [] };
  }

  try {
    const key = tool ? `${STORAGE_PREFIX}${tool}` : `${STORAGE_PREFIX}overall`;
    const stored = localStorage.getItem(key);
    
    if (!stored) {
      return {
        count: 0,
        resetTime: Date.now() + RESET_INTERVAL,
        operations: [],
      };
    }

    const data: UsageData = JSON.parse(stored);
    const now = Date.now();

    // Reset if past reset time
    if (now >= data.resetTime) {
      const newData: UsageData = {
        count: 0,
        resetTime: now + RESET_INTERVAL,
        operations: [],
      };
      localStorage.setItem(key, JSON.stringify(newData));
      return newData;
    }

    return data;
  } catch {
    return { count: 0, resetTime: Date.now() + RESET_INTERVAL, operations: [] };
  }
}

/**
 * Track an operation
 */
export function trackOperation(tool: string, operation: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    // Track overall usage
    const overallData = getUsageData();
    if (overallData.count >= DEFAULT_LIMIT) {
      return false; // Limit reached
    }

    // Track tool-specific usage
    const toolData = getUsageData(tool);
    if (toolData.count >= DEFAULT_LIMIT) {
      return false; // Tool limit reached
    }

    const now = Date.now();
    const newOverallData: UsageData = {
      count: overallData.count + 1,
      resetTime: overallData.resetTime,
      operations: [
        ...overallData.operations,
        { tool, operation, timestamp: now },
      ].slice(-DEFAULT_LIMIT), // Keep only last N operations
    };

    const newToolData: UsageData = {
      count: toolData.count + 1,
      resetTime: toolData.resetTime,
      operations: [
        ...toolData.operations,
        { tool, operation, timestamp: now },
      ].slice(-DEFAULT_LIMIT),
    };

    localStorage.setItem(`${STORAGE_PREFIX}overall`, JSON.stringify(newOverallData));
    localStorage.setItem(`${STORAGE_PREFIX}${tool}`, JSON.stringify(newToolData));

    return true;
  } catch {
    return false;
  }
}

/**
 * Check if operation is allowed
 */
export function canPerformOperation(tool: string): boolean {
  const overallData = getUsageData();
  const toolData = getUsageData(tool);
  return overallData.count < DEFAULT_LIMIT && toolData.count < DEFAULT_LIMIT;
}

/**
 * Get remaining operations
 */
export function getRemainingOperations(tool?: string): number {
  const data = getUsageData(tool);
  return Math.max(0, DEFAULT_LIMIT - data.count);
}

/**
 * Get usage percentage
 */
export function getUsagePercentage(tool?: string): number {
  const data = getUsageData(tool);
  return (data.count / DEFAULT_LIMIT) * 100;
}

/**
 * Get time until reset
 */
export function getTimeUntilReset(tool?: string): number {
  const data = getUsageData(tool);
  return Math.max(0, data.resetTime - Date.now());
}

/**
 * Format time until reset
 */
export function formatTimeUntilReset(tool?: string): string {
  const ms = getTimeUntilReset(tool);
  if (ms <= 0) return 'Reset now';
  
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

