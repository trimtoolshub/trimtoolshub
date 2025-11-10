import QRCode from 'qrcode';
import type { QrCodeOptions, QrCodeType, VCardData, WifiData, GeoData, QrCodeResult } from '../types';

/**
 * Builds a vCard 3.0 string from contact data
 */
export function buildVCard(data: VCardData): string {
  const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0'];

  // Full name
  if (data.firstName || data.lastName) {
    const fn = [data.firstName, data.lastName].filter(Boolean).join(' ');
    lines.push(`FN:${fn}`);
    lines.push(`N:${data.lastName || ''};${data.firstName || ''};;;`);
  }

  // Organization
  if (data.organization) {
    lines.push(`ORG:${data.organization}`);
  }

  // Title
  if (data.title) {
    lines.push(`TITLE:${data.title}`);
  }

  // Phone
  if (data.phone) {
    lines.push(`TEL:${data.phone}`);
  }

  // Email
  if (data.email) {
    lines.push(`EMAIL:${data.email}`);
  }

  // URL
  if (data.url) {
    lines.push(`URL:${data.url}`);
  }

  // Address
  if (data.address) {
    const addr = data.address;
    const addrParts = [
      addr.street || '',
      addr.city || '',
      addr.state || '',
      addr.zip || '',
      addr.country || '',
    ];
    lines.push(`ADR:;;${addrParts.join(';')}`);
  }

  lines.push('END:VCARD');
  return lines.join('\n');
}

/**
 * Builds a Wi-Fi connection string
 */
export function buildWifiString(data: WifiData): string {
  const parts: string[] = [`WIFI:T:${data.security}`];
  parts.push(`S:${data.ssid}`);
  if (data.password) {
    parts.push(`P:${data.password}`);
  }
  if (data.hidden) {
    parts.push('H:true');
  }
  parts.push(';;');
  return parts.join(';');
}

/**
 * Builds a geo location string
 */
export function buildGeoString(data: GeoData): string {
  return `geo:${data.latitude},${data.longitude}`;
}

/**
 * Builds the QR code data string based on type
 */
export function buildQrData(
  type: QrCodeType,
  content: string | VCardData | WifiData | GeoData,
): string {
  switch (type) {
    case 'text':
    case 'url':
      return content as string;
    case 'vcard':
      return buildVCard(content as VCardData);
    case 'wifi':
      return buildWifiString(content as WifiData);
    case 'geo':
      return buildGeoString(content as GeoData);
    default:
      throw new Error(`Unsupported QR code type: ${type}`);
  }
}

/**
 * Generates a QR code as data URL (PNG)
 */
export async function generateQrCodePng(
  data: string,
  options: QrCodeOptions,
): Promise<string> {
  // Automatically use high error correction when logo is present
  const errorCorrectionLevel = options.logo 
    ? (options.errorCorrectionLevel === 'H' ? 'H' : 'Q') 
    : options.errorCorrectionLevel;

  const qrOptions: QRCode.QRCodeToDataURLOptions = {
    width: options.size,
    margin: options.margin,
    errorCorrectionLevel: errorCorrectionLevel,
    color: {
      dark: options.colorDark,
      light: options.colorLight,
    },
  };

  let dataUrl = await QRCode.toDataURL(data, qrOptions);

  // Add logo if provided - limit to max 25% of QR code size
  if (options.logo) {
    const maxLogoSize = options.size * 0.25; // Max 25% of QR code size
    const logoSize = Math.min(options.logoSize || options.size * 0.15, maxLogoSize);
    dataUrl = await addLogoToQrCode(dataUrl, options.logo, logoSize);
  }

  return dataUrl;
}

/**
 * Generates a QR code as SVG string
 */
export async function generateQrCodeSvg(
  data: string,
  options: QrCodeOptions,
): Promise<string> {
  // Automatically use high error correction when logo is present
  const errorCorrectionLevel = options.logo 
    ? (options.errorCorrectionLevel === 'H' ? 'H' : 'Q') 
    : options.errorCorrectionLevel;

  const qrOptions: QRCode.QRCodeToStringOptions = {
    type: 'svg',
    width: options.size,
    margin: options.margin,
    errorCorrectionLevel: errorCorrectionLevel,
    color: {
      dark: options.colorDark,
      light: options.colorLight,
    },
  };

  let svg = await QRCode.toString(data, qrOptions);

  // Add logo if provided - limit to max 25% of QR code size
  if (options.logo) {
    const maxLogoSize = options.size * 0.25; // Max 25% of QR code size
    const logoSize = Math.min(options.logoSize || options.size * 0.15, maxLogoSize);
    svg = await addLogoToSvg(svg, options.logo, logoSize);
  }

  return svg;
}

/**
 * Adds a logo to a QR code data URL
 */
async function addLogoToQrCode(
  qrDataUrl: string,
  logoFile: File,
  logoSize: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const qrImg = new Image();
    qrImg.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = qrImg.width;
      canvas.height = qrImg.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Draw QR code
      ctx.drawImage(qrImg, 0, 0);

      // Load and draw logo
      const logoImg = new Image();
      logoImg.onload = () => {
        const logoX = (canvas.width - logoSize) / 2;
        const logoY = (canvas.height - logoSize) / 2;

        // Draw logo with transparent background preserved
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

        resolve(canvas.toDataURL('image/png'));
      };
      logoImg.onerror = reject;
      logoImg.src = URL.createObjectURL(logoFile);
    };
    qrImg.onerror = reject;
    qrImg.src = qrDataUrl;
  });
}

/**
 * Adds a logo to an SVG QR code
 */
async function addLogoToSvg(
  svg: string,
  logoFile: File,
  logoSize: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const logoDataUrl = reader.result as string;
      const size = parseInt(svg.match(/width="(\d+)"/)?.[1] || '200', 10);
      const logoX = (size - logoSize) / 2;
      const logoY = (size - logoSize) / 2;

      // Find the closing </svg> tag and insert logo before it with transparent background
      const logoElement = `
    <image x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" href="${logoDataUrl}" preserveAspectRatio="xMidYMid meet"/>
  `;
      const modifiedSvg = svg.replace('</svg>', `${logoElement}</svg>`);
      resolve(modifiedSvg);
    };
    reader.onerror = reject;
    reader.readAsDataURL(logoFile);
  });
}

/**
 * Generates a QR code with all formats
 */
export async function generateQrCode(
  type: QrCodeType,
  content: string | VCardData | WifiData | GeoData,
  options: QrCodeOptions,
): Promise<QrCodeResult> {
  const data = buildQrData(type, content);
  const [dataUrl, svg] = await Promise.all([
    generateQrCodePng(data, options),
    generateQrCodeSvg(data, options),
  ]);

  const filename = `qrcode-${Date.now()}.png`;

  return {
    dataUrl,
    svg,
    filename,
  };
}

/**
 * Generates multiple QR codes from CSV data
 */
export async function generateBatchQrCodes(
  csvData: Array<Record<string, string>>,
  type: QrCodeType,
  options: QrCodeOptions,
  contentField: string = 'content',
): Promise<QrCodeResult[]> {
  const results: QrCodeResult[] = [];

  for (const row of csvData) {
    const content = row[contentField];
    if (!content) continue;

    let qrContent: string | VCardData | WifiData | GeoData;
    if (type === 'text' || type === 'url') {
      qrContent = content;
    } else if (type === 'vcard') {
      // Parse CSV row as vCard fields
      qrContent = {
        firstName: row.firstName || row['First Name'],
        lastName: row.lastName || row['Last Name'],
        organization: row.organization || row.Organization,
        title: row.title || row.Title,
        phone: row.phone || row.Phone,
        email: row.email || row.Email,
        url: row.url || row.URL,
        address: {
          street: row.street || row.Street,
          city: row.city || row.City,
          state: row.state || row.State,
          zip: row.zip || row.ZIP,
          country: row.country || row.Country,
        },
      };
    } else if (type === 'wifi') {
      qrContent = {
        ssid: row.ssid || row.SSID,
        password: row.password || row.Password,
        security: (row.security || row.Security || 'WPA') as 'WPA' | 'WEP' | 'nopass',
        hidden: row.hidden === 'true' || row.Hidden === 'true',
      };
    } else if (type === 'geo') {
      qrContent = {
        latitude: parseFloat(row.latitude || row.Latitude || '0'),
        longitude: parseFloat(row.longitude || row.Longitude || '0'),
      };
    } else {
      qrContent = content;
    }

    const result = await generateQrCode(type, qrContent, options);
    result.filename = `${row.name || row.Name || `qrcode-${results.length + 1}`}-${Date.now()}.png`;
    results.push(result);
  }

  return results;
}

