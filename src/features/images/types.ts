export type ImageOperationType = 'convert' | 'compress' | 'removeBackground' | 'toSvg' | 'toVector';

export type ImageFormat = 'png' | 'jpg' | 'jpeg' | 'webp' | 'bmp' | 'gif' | 'svg';

export interface ImageFileEntry {
  id: string;
  file: File;
  name: string;
  size: number;
  preview?: string;
  width?: number;
  height?: number;
}

export interface CompressOptions {
  quality: number; // 0-100
  format: ImageFormat;
}

export interface BackgroundRemovalOptions {
  tolerance: number; // 0-100, color similarity threshold
  edgeRefinement: boolean; // Use edge detection for better results
  sampleMethod: 'corners' | 'edges' | 'smart'; // Sampling method
}

export interface VectorOptions {
  colors: number; // Number of colors for vectorization (1-256)
  smoothness: number; // Smoothness level (0-100)
}

export interface ImageProcessResult {
  blob: Blob;
  filename: string;
  size: number;
  width?: number;
  height?: number;
}

