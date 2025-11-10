export function loadAdsense(client: string) {
  if (typeof document === 'undefined') {
    return;
  }

  if (document.querySelector('script[src*="adsbygoogle.js"]')) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

