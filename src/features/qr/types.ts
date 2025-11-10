export type QrCodeType = 'text' | 'url' | 'wifi' | 'vcard' | 'geo';

export interface QrCodeOptions {
  size: number;
  margin: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  colorDark: string;
  colorLight: string;
  logo?: File;
  logoSize?: number;
}

export interface VCardData {
  firstName?: string;
  lastName?: string;
  organization?: string;
  title?: string;
  phone?: string;
  email?: string;
  url?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}

export interface WifiData {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}

export interface GeoData {
  latitude: number;
  longitude: number;
}

export interface QrCodeResult {
  dataUrl: string;
  svg: string;
  filename: string;
}

