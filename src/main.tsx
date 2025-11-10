import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.tsx';
import { ConsentProvider } from './context/ConsentContext';
import { ErrorBoundary } from './components/ErrorBoundary';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <ConsentProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConsentProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
);

// Dispatch render event for prerender
if (typeof document !== 'undefined') {
  document.dispatchEvent(new Event('render-event'));
}
