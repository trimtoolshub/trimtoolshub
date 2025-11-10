import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsageData, getRemainingOperations, getUsagePercentage, formatTimeUntilReset } from '../../lib/usageTracking';

interface RateLimitBannerProps {
  tool?: string;
  limit?: number;
}

const DEFAULT_LIMIT = 10; // Free tier limit

export function RateLimitBanner({ tool, limit = DEFAULT_LIMIT }: RateLimitBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [usageData, setUsageData] = useState(() => getUsageData(tool));

  useEffect(() => {
    // Check if user has dismissed this banner
    const dismissedKey = `tth-rate-limit-dismissed-${tool || 'overall'}-${limit}`;
    const isDismissed = localStorage.getItem(dismissedKey) === 'true';
    setDismissed(isDismissed);

    // Update usage data periodically
    const interval = setInterval(() => {
      setUsageData(getUsageData(tool));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [tool, limit]);

  // Only show if approaching limit (80% of limit)
  const threshold = Math.floor(limit * 0.8);
  if (dismissed || usageData.count < threshold) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    const dismissedKey = `tth-rate-limit-dismissed-${tool || 'overall'}-${limit}`;
    localStorage.setItem(dismissedKey, 'true');
  };

  const remaining = getRemainingOperations(tool);
  const percentage = getUsagePercentage(tool);
  const timeUntilReset = formatTimeUntilReset(tool);

  return (
    <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <svg
              className="h-5 w-5 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-sm font-semibold text-yellow-400">
              {remaining === 0 ? 'Limit Reached' : 'Approaching Free Tier Limit'}
            </h3>
          </div>
          <p className="mb-3 text-sm text-slate-300">
            {remaining === 0
              ? `You've used all ${limit} free operations. Upgrade to continue processing.`
              : `You've used ${usageData.count} of ${limit} free operations. ${remaining} remaining.`}
          </p>
          <div className="mb-3">
            <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
              <span>Usage</span>
              <span>{usageData.count} / {limit}</span>
            </div>
            {remaining > 0 && (
              <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                <span>Resets in</span>
                <span>{timeUntilReset}</span>
              </div>
            )}
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-lg bg-brand-accent px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-accent/80"
            >
              Get Credits
            </Link>
            <button
              onClick={handleDismiss}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-white/40 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-slate-400 transition hover:text-slate-300"
          aria-label="Dismiss"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

