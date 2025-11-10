import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.tsx';
import { ConsentProvider } from './context/ConsentContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ConsentProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConsentProvider>
    </HelmetProvider>
  </StrictMode>,
);
