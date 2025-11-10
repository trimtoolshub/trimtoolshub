import { Route, Routes } from 'react-router-dom';
import { ShellLayout } from './components/layout/ShellLayout';
import { ConsentBanner } from './components/consent/ConsentBanner';
import { TelemetryManager } from './components/telemetry/TelemetryManager';
import { HomePage } from './pages/HomePage';
import { PdfPage } from './pages/PdfPage';
import { CadPage } from './pages/CadPage';
import { QrPage } from './pages/QrPage';
import { BarcodesPage } from './pages/BarcodesPage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<ShellLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pdf" element={<PdfPage />} />
          <Route path="/cad" element={<CadPage />} />
          <Route path="/qr" element={<QrPage />} />
          <Route path="/barcodes" element={<BarcodesPage />} />
        </Route>
      </Routes>
      <ConsentBanner />
      <TelemetryManager />
    </>
  );
}

export default App;
