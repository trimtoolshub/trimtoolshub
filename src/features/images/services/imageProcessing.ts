import type {
  ImageFormat,
  CompressOptions,
  BackgroundRemovalOptions,
  VectorOptions,
  ImageProcessResult,
} from '../types';

/**
 * Converts an image to a different format
 */
export async function convertImage(
  file: File,
  targetFormat: ImageFormat,
  quality: number = 0.92,
): Promise<ImageProcessResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);

      const mimeType = getMimeType(targetFormat);
      const outputQuality = targetFormat === 'png' || targetFormat === 'svg' ? undefined : quality;

      if (targetFormat === 'svg') {
        // Convert to SVG by embedding as base64
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to convert image'));
              return;
            }
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = reader.result as string;
              const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${img.width}" height="${img.height}" xmlns="http://www.w3.org/2000/svg">
  <image width="${img.width}" height="${img.height}" href="${base64}"/>
</svg>`;
              const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
              const originalName = file.name.replace(/\.[^/.]+$/, '');
              resolve({
                blob: svgBlob,
                filename: `${originalName}.svg`,
                size: svgBlob.size,
                width: img.width,
                height: img.height,
              });
            };
            reader.readAsDataURL(blob);
          },
          'image/png',
        );
      } else {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to convert image'));
              return;
            }

            const extension = targetFormat === 'jpg' ? 'jpeg' : targetFormat;
            const originalName = file.name.replace(/\.[^/.]+$/, '');
            resolve({
              blob,
              filename: `${originalName}.${extension}`,
              size: blob.size,
              width: img.width,
              height: img.height,
            });
          },
          mimeType,
          outputQuality,
        );
      }
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Compresses an image
 */
export async function compressImage(
  file: File,
  options: CompressOptions,
): Promise<ImageProcessResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);

      const mimeType = getMimeType(options.format);
      const quality = options.quality / 100;

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to compress image'));
            return;
          }

          const extension = options.format === 'jpg' ? 'jpeg' : options.format;
          const originalName = file.name.replace(/\.[^/.]+$/, '');
          resolve({
            blob,
            filename: `${originalName}-compressed.${extension}`,
            size: blob.size,
            width: img.width,
            height: img.height,
          });
        },
        mimeType,
        quality,
      );
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Enhanced background removal using flood fill and edge detection
 */
export async function removeBackground(
  file: File,
  options: BackgroundRemovalOptions,
): Promise<ImageProcessResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Sample background colors based on method
      const backgroundColors: Array<{ r: number; g: number; b: number }> = [];

      if (options.sampleMethod === 'corners' || options.sampleMethod === 'smart') {
        // Sample corner pixels
        const corners = [
          { x: 0, y: 0 },
          { x: canvas.width - 1, y: 0 },
          { x: 0, y: canvas.height - 1 },
          { x: canvas.width - 1, y: canvas.height - 1 },
        ];

        for (const corner of corners) {
          const index = (corner.y * canvas.width + corner.x) * 4;
          backgroundColors.push({
            r: data[index],
            g: data[index + 1],
            b: data[index + 2],
          });
        }
      }

      if (options.sampleMethod === 'edges' || options.sampleMethod === 'smart') {
        // Sample edge pixels more densely
        const sampleCount = 50;
        for (let i = 0; i < sampleCount; i++) {
          // Top edge
          const topX = Math.floor((canvas.width / sampleCount) * i);
          const topIndex = (0 * canvas.width + topX) * 4;
          backgroundColors.push({
            r: data[topIndex],
            g: data[topIndex + 1],
            b: data[topIndex + 2],
          });

          // Bottom edge
          const bottomX = Math.floor((canvas.width / sampleCount) * i);
          const bottomIndex = ((canvas.height - 1) * canvas.width + bottomX) * 4;
          backgroundColors.push({
            r: data[bottomIndex],
            g: data[bottomIndex + 1],
            b: data[bottomIndex + 2],
          });

          // Left edge
          const leftY = Math.floor((canvas.height / sampleCount) * i);
          const leftIndex = (leftY * canvas.width + 0) * 4;
          backgroundColors.push({
            r: data[leftIndex],
            g: data[leftIndex + 1],
            b: data[leftIndex + 2],
          });

          // Right edge
          const rightY = Math.floor((canvas.height / sampleCount) * i);
          const rightIndex = (rightY * canvas.width + (canvas.width - 1)) * 4;
          backgroundColors.push({
            r: data[rightIndex],
            g: data[rightIndex + 1],
            b: data[rightIndex + 2],
          });
        }
      }

      if (backgroundColors.length === 0) {
        reject(new Error('No background colors sampled'));
        return;
      }

      // Calculate average background color with weighted sampling
      const avgBg = {
        r: Math.round(backgroundColors.reduce((sum, c) => sum + c.r, 0) / backgroundColors.length),
        g: Math.round(backgroundColors.reduce((sum, c) => sum + c.g, 0) / backgroundColors.length),
        b: Math.round(backgroundColors.reduce((sum, c) => sum + c.b, 0) / backgroundColors.length),
      };

      // Enhanced color distance calculation (perceptual color distance)
      const colorDistance = (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number => {
        const dr = r1 - r2;
        const dg = g1 - g2;
        const db = b1 - b2;
        // Simple Euclidean distance (normalized to 0-441 range for RGB)
        return Math.sqrt(dr * dr + dg * dg + db * db);
      };

      // Tolerance: 0-100% maps to 0-100 distance (max RGB distance is ~441)
      // Scale tolerance to be more permissive
      const maxDistance = Math.sqrt(255 * 255 * 3); // ~441
      const tolerance = (options.tolerance / 100) * maxDistance;

      // Edge detection for refinement
      let edgeMap: boolean[] = [];
      if (options.edgeRefinement) {
        edgeMap = detectEdges(data, canvas.width, canvas.height);
      }

      // Remove background pixels using flood fill approach
      const visited = new Set<number>();
      const queue: Array<{ x: number; y: number }> = [];

      // Start flood fill from corners and edges
      const startPoints: Array<{ x: number; y: number }> = [
        { x: 0, y: 0 },
        { x: canvas.width - 1, y: 0 },
        { x: 0, y: canvas.height - 1 },
        { x: canvas.width - 1, y: canvas.height - 1 },
      ];

      // Also sample edge pixels more densely
      const edgeSampleCount = 20;
      for (let i = 0; i < edgeSampleCount; i++) {
        // Top edge
        startPoints.push({ x: Math.floor((canvas.width / edgeSampleCount) * i), y: 0 });
        // Bottom edge
        startPoints.push({ x: Math.floor((canvas.width / edgeSampleCount) * i), y: canvas.height - 1 });
        // Left edge
        startPoints.push({ x: 0, y: Math.floor((canvas.height / edgeSampleCount) * i) });
        // Right edge
        startPoints.push({ x: canvas.width - 1, y: Math.floor((canvas.height / edgeSampleCount) * i) });
      }

      for (const point of startPoints) {
        if (point.x < 0 || point.x >= canvas.width || point.y < 0 || point.y >= canvas.height) continue;
        const index = (point.y * canvas.width + point.x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const distance = colorDistance(r, g, b, avgBg.r, avgBg.g, avgBg.b);

        if (distance <= tolerance) {
          const key = point.y * canvas.width + point.x;
          if (!visited.has(key)) {
            queue.push(point);
            visited.add(key);
          }
        }
      }

      // Flood fill algorithm
      while (queue.length > 0) {
        const point = queue.shift()!;
        const key = point.y * canvas.width + point.x;
        if (point.x < 0 || point.x >= canvas.width || point.y < 0 || point.y >= canvas.height) continue;

        const index = (point.y * canvas.width + point.x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const distance = colorDistance(r, g, b, avgBg.r, avgBg.g, avgBg.b);

        if (distance <= tolerance) {
          // Check edge map if refinement is enabled - but don't block if not an edge
          const isEdge = options.edgeRefinement && edgeMap.length > 0 && edgeMap[key];
          if (!isEdge) {
            data[index + 3] = 0; // Make transparent
            visited.add(key);

            // Add neighbors to queue
            const neighbors = [
              { x: point.x + 1, y: point.y },
              { x: point.x - 1, y: point.y },
              { x: point.x, y: point.y + 1 },
              { x: point.x, y: point.y - 1 },
            ];

            for (const neighbor of neighbors) {
              if (neighbor.x >= 0 && neighbor.x < canvas.width && neighbor.y >= 0 && neighbor.y < canvas.height) {
                const neighborKey = neighbor.y * canvas.width + neighbor.x;
                if (!visited.has(neighborKey)) {
                  visited.add(neighborKey);
                  queue.push(neighbor);
                }
              }
            }
          }
        }
      }

      // Additional pass: remove isolated background pixels (more aggressive)
      for (let y = 1; y < canvas.height - 1; y++) {
        for (let x = 1; x < canvas.width - 1; x++) {
          const index = (y * canvas.width + x) * 4;
          if (data[index + 3] === 0) continue; // Already transparent

          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const distance = colorDistance(r, g, b, avgBg.r, avgBg.g, avgBg.b);

          if (distance <= tolerance) {
            // Check if surrounded by transparent pixels (likely background)
            let transparentNeighbors = 0;
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const neighborIndex = ((y + dy) * canvas.width + (x + dx)) * 4;
                if (data[neighborIndex + 3] === 0) transparentNeighbors++;
              }
            }
            // Lower threshold - if 3 or more neighbors are transparent, likely background
            if (transparentNeighbors >= 3) {
              data[index + 3] = 0;
            }
          }
        }
      }

      // Final pass: remove pixels that are very close to background color
      // This catches any remaining background pixels that flood fill might have missed
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 0) continue; // Already transparent
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const distance = colorDistance(r, g, b, avgBg.r, avgBg.g, avgBg.b);
        
        // Use a slightly more permissive tolerance for final pass
        if (distance <= tolerance * 1.2) {
          // Check if this pixel is on the edge or surrounded by transparent pixels
          const x = (i / 4) % canvas.width;
          const y = Math.floor((i / 4) / canvas.width);
          
          // If it's on the border, remove it
          if (x === 0 || x === canvas.width - 1 || y === 0 || y === canvas.height - 1) {
            data[i + 3] = 0;
          } else {
            // Check neighbors
            let transparentNeighbors = 0;
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const neighborIndex = ((y + dy) * canvas.width + (x + dx)) * 4;
                if (data[neighborIndex + 3] === 0) transparentNeighbors++;
              }
            }
            if (transparentNeighbors >= 4) {
              data[i + 3] = 0;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Export as PNG to preserve transparency
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to remove background'));
            return;
          }

          const originalName = file.name.replace(/\.[^/.]+$/, '');
          resolve({
            blob,
            filename: `${originalName}-no-bg.png`,
            size: blob.size,
            width: img.width,
            height: img.height,
          });
        },
        'image/png',
      );
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Edge detection using Sobel operator
 */
function detectEdges(data: Uint8ClampedArray, width: number, height: number): boolean[] {
  const edgeMap: boolean[] = new Array(width * height).fill(false);
  const grayscale: number[] = [];

  // Convert to grayscale
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    grayscale.push(0.299 * r + 0.587 * g + 0.114 * b);
  }

  // Sobel operator
  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let gx = 0;
      let gy = 0;

      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = (y + ky) * width + (x + kx);
          const kernelIdx = (ky + 1) * 3 + (kx + 1);
          gx += grayscale[idx] * sobelX[kernelIdx];
          gy += grayscale[idx] * sobelY[kernelIdx];
        }
      }

      const magnitude = Math.sqrt(gx * gx + gy * gy);
      edgeMap[y * width + x] = magnitude > 50; // Threshold for edge detection
    }
  }

  return edgeMap;
}

/**
 * Converts image to SVG format
 */
export async function convertToSvg(file: File): Promise<ImageProcessResult> {
  return convertImage(file, 'svg');
}

/**
 * Converts image to vector format (SVG with tracing)
 */
export async function convertToVector(
  file: File,
  options: VectorOptions,
): Promise<ImageProcessResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);

      // Reduce colors for vectorization
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const colorCount = Math.max(2, Math.min(256, options.colors));

      // Quantize colors
      const quantized = quantizeColors(data, canvas.width, canvas.height, colorCount);
      ctx.putImageData(quantized, 0, 0);

      // Convert to SVG with embedded image (simplified vectorization)
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to convert to vector'));
            return;
          }

          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result as string;
            // Create SVG with embedded image
            const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${img.width}" height="${img.height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image width="${img.width}" height="${img.height}" href="${base64}" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
            const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
            const originalName = file.name.replace(/\.[^/.]+$/, '');
            resolve({
              blob: svgBlob,
              filename: `${originalName}-vector.svg`,
              size: svgBlob.size,
              width: img.width,
              height: img.height,
            });
          };
          reader.readAsDataURL(blob);
        },
        'image/png',
        0.95,
      );
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Color quantization for vectorization
 */
function quantizeColors(data: Uint8ClampedArray, width: number, height: number, colorCount: number): ImageData {
  // Simple color quantization
  const imageData = new ImageData(new Uint8ClampedArray(data), width, height);

  // Group pixels by color
  const colorMap = new Map<string, number[]>();
  for (let i = 0; i < data.length; i += 4) {
    const r = Math.floor(data[i] / (256 / Math.sqrt(colorCount))) * (256 / Math.sqrt(colorCount));
    const g = Math.floor(data[i + 1] / (256 / Math.sqrt(colorCount))) * (256 / Math.sqrt(colorCount));
    const b = Math.floor(data[i + 2] / (256 / Math.sqrt(colorCount))) * (256 / Math.sqrt(colorCount));
    const key = `${r},${g},${b}`;

    if (!colorMap.has(key)) {
      colorMap.set(key, [r, g, b]);
    }
  }

  // Apply quantized colors
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Find closest quantized color
    let minDist = Infinity;
    let closestColor = [r, g, b];

    for (const color of colorMap.values()) {
      const dist = Math.sqrt(
        Math.pow(r - color[0], 2) + Math.pow(g - color[1], 2) + Math.pow(b - color[2], 2),
      );
      if (dist < minDist) {
        minDist = dist;
        closestColor = color;
      }
    }

    imageData.data[i] = closestColor[0];
    imageData.data[i + 1] = closestColor[1];
    imageData.data[i + 2] = closestColor[2];
  }

  return imageData;
}

/**
 * Gets MIME type from format
 */
function getMimeType(format: ImageFormat): string {
  const mimeTypes: Record<ImageFormat, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    bmp: 'image/bmp',
    gif: 'image/gif',
    svg: 'image/svg+xml',
  };
  return mimeTypes[format];
}

/**
 * Gets file extension from MIME type
 */
function getExtensionFromMime(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/webp': 'webp',
    'image/bmp': 'bmp',
    'image/gif': 'gif',
    'image/svg+xml': 'svg',
  };
  return mimeToExt[mimeType] || 'png';
}
