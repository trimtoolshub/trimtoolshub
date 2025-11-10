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
  appendScript({
    id: 'tth-gtag',
    src: `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
    async: true,
  });

  const w = window as GlobalWindow;

  w.dataLayer = w.dataLayer || [];
  w.gtag =
    w.gtag ||
    function gtag(...args: unknown[]) {
      w.dataLayer?.push(args);
    };

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

function setupAdSense(clientId: string) {
  appendScript({
    id: 'tth-adsense',
    src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`,
    async: true,
    crossOrigin: 'anonymous',
  });
}

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

  if (adClient) {
    setupAdSense(adClient);
  }

  state = 'initialized';
}

export function disableTelemetry() {
  if (state === 'disabled') {
    return;
  }

  state = 'disabled';
}

