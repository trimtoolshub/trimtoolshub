/**
 * Share functionality for results
 */

export interface ShareableData {
  type: 'file' | 'text' | 'url';
  data: Blob | string;
  filename?: string;
  title?: string;
  description?: string;
}

/**
 * Create a shareable link (in production, this would upload to server)
 */
export async function createShareableLink(data: ShareableData): Promise<string> {
  // In production, this would:
  // 1. Upload the file/data to a server
  // 2. Get a shareable URL
  // 3. Return the URL
  
  // For now, return a data URL or placeholder
  if (data.type === 'text' || data.type === 'url') {
    return typeof data.data === 'string' ? data.data : '';
  }
  
  // For files, create a temporary object URL
  if (data.data instanceof Blob) {
    return URL.createObjectURL(data.data);
  }
  
  return '';
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Share using Web Share API
 */
export async function shareData(data: ShareableData): Promise<boolean> {
  if (!navigator.share) {
    return false;
  }

  try {
    if (data.type === 'file' && data.data instanceof Blob) {
      const file = new File([data.data], data.filename || 'file', { type: data.data.type });
      await navigator.share({
        title: data.title,
        text: data.description,
        files: [file],
      });
      return true;
    } else if (data.type === 'text' || data.type === 'url') {
      await navigator.share({
        title: data.title,
        text: data.description || (typeof data.data === 'string' ? data.data : ''),
        url: typeof data.data === 'string' ? data.data : undefined,
      });
      return true;
    }
    return false;
  } catch (error) {
    // User cancelled or share failed
    console.log('Share cancelled or failed:', error);
    return false;
  }
}

/**
 * Generate shareable text
 */
export function generateShareText(tool: string, operation: string, result?: string): string {
  const baseText = `Check out this result from ${tool} - ${operation} on TrimToolsHub`;
  if (result) {
    return `${baseText}: ${result}`;
  }
  return baseText;
}

