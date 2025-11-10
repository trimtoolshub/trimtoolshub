import { useEffect } from 'react';
import { useConsent } from '../../context/ConsentContext';
import { disableTelemetry, initializeTelemetry } from '../../lib/telemetry';
import { loadAdsense } from '../../lib/loadAdsense';

export function TelemetryManager() {
  const { status } = useConsent();
  const ADS_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT;

  useEffect(() => {
    if (status === 'accepted') {
      initializeTelemetry();
      if (ADS_CLIENT) {
        loadAdsense(ADS_CLIENT);
      }
    }

    if (status === 'declined') {
      disableTelemetry();
    }
  }, [status, ADS_CLIENT]);

  return null;
}

