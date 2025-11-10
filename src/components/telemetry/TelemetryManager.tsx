import { useEffect } from 'react';
import { useConsent } from '../../context/ConsentContext';
import { disableTelemetry, initializeTelemetry } from '../../lib/telemetry';

export function TelemetryManager() {
  const { status } = useConsent();

  useEffect(() => {
    if (status === 'accepted') {
      initializeTelemetry();
    }

    if (status === 'declined') {
      disableTelemetry();
    }
  }, [status]);

  return null;
}

