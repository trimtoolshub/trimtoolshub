import { useEffect } from 'react';
import { useConsent } from '../../context/ConsentContext';

export interface AdSlotProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

function renderFallback(message: string, className?: string) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-6 text-center text-sm text-slate-400 ${
        className ?? ''
      }`}
    >
      {message}
    </div>
  );
}

export function AdSlot({ slotId, format = 'auto', className }: AdSlotProps) {
  const { status } = useConsent();
  const client = import.meta.env.VITE_ADSENSE_CLIENT;

  useEffect(() => {
    if (typeof window === 'undefined' || status !== 'accepted' || !client) {
      return;
    }

    const w = window as unknown as {
      adsbygoogle?: Array<Record<string, unknown>>;
    };

    if (!w.adsbygoogle) {
      w.adsbygoogle = [];
    }

    try {
      w.adsbygoogle.push({});
    } catch (error) {
      console.warn('AdSense push failed', error);
    }
  }, [client, status]);

  if (!client) {
    return renderFallback('Configure AdSense (VITE_ADSENSE_CLIENT) to monetize this placement.', className);
  }

  if (status !== 'accepted') {
    return renderFallback('Ads hidden until you allow analytics & monetization.', className);
  }

  if (!slotId) {
    return renderFallback('Provide a data-ad-slot id to load ads.', className);
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

