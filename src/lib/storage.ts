/**
 * Storage utilities for user preferences, history, and presets
 */

const STORAGE_PREFIX = 'tth-';

export interface ToolUsage {
  path: string;
  name: string;
  timestamp: number;
  operation?: string;
}

export interface ToolPreset {
  toolPath: string;
  operation: string;
  settings: Record<string, unknown>;
  name?: string;
  timestamp: number;
}

/**
 * Get recently used tools (max 5)
 */
export function getRecentlyUsedTools(): ToolUsage[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}recent-tools`);
    if (!stored) return [];

    const tools: ToolUsage[] = JSON.parse(stored);
    // Sort by timestamp descending and limit to 5
    return tools.sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
  } catch {
    return [];
  }
}

/**
 * Add a tool to recently used
 */
export function addRecentlyUsedTool(tool: Omit<ToolUsage, 'timestamp'>): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = getRecentlyUsedTools();
    // Remove if already exists
    const filtered = existing.filter((t) => t.path !== tool.path);
    // Add new one at the beginning
    const updated: ToolUsage[] = [
      { ...tool, timestamp: Date.now() },
      ...filtered,
    ];
    // Keep only last 10 in storage, but return 5
    const limited = updated.slice(0, 10);
    localStorage.setItem(`${STORAGE_PREFIX}recent-tools`, JSON.stringify(limited));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Get presets for a specific tool and operation
 */
export function getToolPresets(toolPath: string, operation: string): ToolPreset[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}presets-${toolPath}-${operation}`);
    if (!stored) return [];

    const presets: ToolPreset[] = JSON.parse(stored);
    return presets.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

/**
 * Save a preset for a tool and operation
 */
export function saveToolPreset(preset: Omit<ToolPreset, 'timestamp'>): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = getToolPresets(preset.toolPath, preset.operation);
    const updated: ToolPreset[] = [
      { ...preset, timestamp: Date.now() },
      ...existing,
    ];
    // Keep only last 10 presets per tool/operation
    const limited = updated.slice(0, 10);
    localStorage.setItem(
      `${STORAGE_PREFIX}presets-${preset.toolPath}-${preset.operation}`,
      JSON.stringify(limited)
    );
  } catch {
    // Ignore storage errors
  }
}

/**
 * Delete a preset
 */
export function deleteToolPreset(toolPath: string, operation: string, timestamp: number): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = getToolPresets(toolPath, operation);
    const updated = existing.filter((p) => p.timestamp !== timestamp);
    localStorage.setItem(
      `${STORAGE_PREFIX}presets-${toolPath}-${operation}`,
      JSON.stringify(updated)
    );
  } catch {
    // Ignore storage errors
  }
}

/**
 * Get last used settings for a tool and operation
 */
export function getLastSettings(toolPath: string, operation: string): Record<string, unknown> | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}last-${toolPath}-${operation}`);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Save last used settings for a tool and operation
 */
export function saveLastSettings(
  toolPath: string,
  operation: string,
  settings: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}last-${toolPath}-${operation}`,
      JSON.stringify(settings)
    );
  } catch {
    // Ignore storage errors
  }
}

/**
 * Clear all user data
 */
export function clearAllUserData(): void {
  if (typeof window === 'undefined') return;

  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch {
    // Ignore storage errors
  }
}

