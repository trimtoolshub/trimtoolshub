type TelemetryState = 'idle' | 'initialized' | 'disabled';

type FbqFunction = ((...args: unknown[]) => void) & {
  push?: (...args: unknown[]) => void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
};

interface GlobalWindow extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  adsbygoogle?: Array<Record<string, unknown>>;
  fbq?: FbqFunction;
  _fbq?: FbqFunction;
}

let state: TelemetryState = 'idle';
const loadedScripts = new Set<string>();

interface ScriptOptions {
  id: string;
  src: string;
  async?: boolean;
  defer?: boolean;
  crossOrigin?: string;
}

function appendScript(options: ScriptOptions) {
  if (typeof document === 'undefined') {
    return;
  }

  const { id, src, async, defer, crossOrigin } = options;

  if (loadedScripts.has(id) || document.getElementById(id)) {
    return;
  }

  const script = document.createElement('script');
  script.id = id;
  script.src = src;

  if (async) {
    script.async = true;
  }

  if (defer) {
    script.defer = true;
  }

  if (crossOrigin) {
    script.crossOrigin = crossOrigin;
  }

  document.head.appendChild(script);
  loadedScripts.add(id);
}

function setupGoogleAnalytics(measurementId: string) {
  const w = window as GlobalWindow;

  // Initialize dataLayer and gtag before loading script
  w.dataLayer = w.dataLayer || [];
  w.gtag =
    w.gtag ||
    function gtag(...args: unknown[]) {
      w.dataLayer?.push(args);
    };

  // Set Consent Mode v2 default to denied
  w.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });

  appendScript({
    id: 'tth-gtag',
    src: `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
    async: true,
  });

  w.gtag('js', new Date());
  w.gtag('config', measurementId, { anonymize_ip: true });
}

function setupMetaPixel(pixelId: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const w = window as GlobalWindow;

  if (w.fbq) {
    return;
  }

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...(args as unknown[]));
    } else {
      fbq.queue?.push(args);
    }
  }) as FbqFunction;

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];

  w._fbq = w.fbq = fbq;

  appendScript({
    id: 'tth-meta-pixel',
    src: 'https://connect.facebook.net/en_US/fbevents.js',
    defer: true,
  });

  w.fbq?.('init', pixelId);
  w.fbq?.('track', 'PageView');
}

// AdSense loading is now handled by loadAdsense.ts and only called after consent
// This function is removed as it's no longer needed

export function initializeTelemetry() {
  if (typeof window === 'undefined' || state !== 'idle') {
    return;
  }

  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID;
  const adClient = import.meta.env.VITE_ADSENSE_CLIENT;

  if (!gaId && !metaPixelId && !adClient) {
    state = 'initialized';
    return;
  }

  if (gaId) {
    setupGoogleAnalytics(gaId);
  }

  if (metaPixelId) {
    setupMetaPixel(metaPixelId);
  }

  // AdSense is now loaded separately after consent via TelemetryManager
  // Do not call setupAdSense here

  state = 'initialized';
}

export function disableTelemetry() {
  if (state === 'disabled') {
    return;
  }

  state = 'disabled';
}

