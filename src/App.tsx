import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { ShellLayout } from './components/layout/ShellLayout';
import { ConsentBanner } from './components/consent/ConsentBanner';
import { TelemetryManager } from './components/telemetry/TelemetryManager';
import { HomePage } from './pages/HomePage';
import { PdfPage } from './pages/PdfPage';
import { CadPage } from './pages/CadPage';
import { QrPage } from './pages/QrPage';
import { BarcodesPage } from './pages/BarcodesPage';
import { ImagesPage } from './pages/ImagesPage';
import { DateToolsPage } from './pages/DateToolsPage';
import { BlogPage } from './pages/BlogPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<ShellLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pdf" element={<PdfPage />} />
          <Route path="/cad" element={<CadPage />} />
          <Route path="/qr" element={<QrPage />} />
          <Route path="/barcodes" element={<BarcodesPage />} />
          <Route path="/images" element={<ImagesPage />} />
          <Route path="/dates" element={<DateToolsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>
      </Routes>
      <ConsentBanner />
      <TelemetryManager />
    </ErrorBoundary>
  );
}

export default App;
