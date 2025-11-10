import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ConsentStatus = 'unknown' | 'accepted' | 'declined';

interface ConsentContextValue {
  status: ConsentStatus;
  accept: () => void;
  decline: () => void;
}

const STORAGE_KEY = 'tth-consent-choice';

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>('unknown');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'accepted' || stored === 'declined') {
      setStatus(stored);
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((value: ConsentStatus) => {
    if (typeof window === 'undefined') {
      return;
    }
    if (value === 'accepted' || value === 'declined') {
      window.localStorage.setItem(STORAGE_KEY, value);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const accept = useCallback(() => {
    setStatus('accepted');
    if (typeof window !== 'undefined') {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (w.gtag) {
        w.gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          analytics_storage: 'granted',
        });
      }
    }
    persist('accepted');
  }, [persist]);

  const decline = useCallback(() => {
    setStatus('declined');
    if (typeof window !== 'undefined') {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (w.gtag) {
        w.gtag('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
        });
      }
    }
    persist('declined');
  }, [persist]);

  const value = useMemo<ConsentContextValue>(
    () => ({
      status: hydrated ? status : 'unknown',
      accept,
      decline,
    }),
    [accept, decline, hydrated, status],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}

