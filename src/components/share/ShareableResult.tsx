import { useState } from 'react';
import { downloadBlob } from '../../lib/download';
import { copyToClipboard, shareData } from '../../lib/share';

interface ShareableResultProps {
  result: {
    blob?: Blob;
    dataUrl?: string;
    filename: string;
    type: 'file' | 'text' | 'url';
  };
  tool: string;
  operation: string;
}

export function ShareableResult({ result, tool, operation }: ShareableResultProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const handleCopyLink = async () => {
    try {
      // For now, create a data URL or use a shareable format
      // In production, this would upload to a server and return a shareable URL
      let textToCopy = '';
      
      if (result.type === 'text' && result.dataUrl) {
        textToCopy = result.dataUrl;
      } else if (result.type === 'url' && result.dataUrl) {
        textToCopy = result.dataUrl;
      } else if (result.blob) {
        // For files, create a data URL
        const reader = new FileReader();
        reader.onload = async () => {
          const dataUrl = reader.result as string;
          await copyToClipboard(dataUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        };
        reader.readAsDataURL(result.blob);
        return;
      }
      
      if (textToCopy) {
        await copyToClipboard(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleDownload = () => {
    if (result.blob) {
      downloadBlob(result.blob, result.filename);
    } else if (result.dataUrl) {
      // Convert data URL to blob
      fetch(result.dataUrl)
        .then((res) => res.blob())
        .then((blob) => downloadBlob(blob, result.filename));
    }
  };

  const handleShare = async () => {
    if (result.blob) {
      const success = await shareData({
        type: 'file',
        data: result.blob,
        filename: result.filename,
        title: `${tool} - ${operation}`,
        description: `Check out this result from ${tool}`,
      });
      
      if (!success) {
        // Fallback to copy link
        handleCopyLink();
      }
    } else if (result.dataUrl) {
      const success = await shareData({
        type: result.type === 'url' ? 'url' : 'text',
        data: result.dataUrl,
        title: `${tool} - ${operation}`,
        description: `Check out this result from ${tool}`,
      });
      
      if (!success) {
        // Fallback to copy link
        handleCopyLink();
      }
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-brand-accent/30 bg-brand-accent/10 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-white">Result Ready</h4>
        <span className="text-xs text-slate-400">{result.filename}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleDownload}
          className="flex-1 rounded-lg border border-brand-accent bg-brand-accent/10 px-4 py-2 text-sm font-semibold text-brand-accent transition hover:bg-brand-accent/20"
        >
          Download
        </button>
        <button
          onClick={handleCopyLink}
          className="flex-1 rounded-lg border border-white/20 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900/80"
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
        {navigator.share && (
          <button
            onClick={handleShare}
            className="rounded-lg border border-white/20 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900/80"
          >
            Share
          </button>
        )}
      </div>
    </div>
  );
}

