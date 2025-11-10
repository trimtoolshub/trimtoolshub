import DxfParser from 'dxf-parser';
import * as THREE from 'three';
import type { CadFileFormat, CadLayer, CadMeasurement } from '../types';

/**
 * Parse DXF file and extract entities
 */
export async function parseDxfFile(file: File): Promise<{
  entities: Array<{
    type: string;
    layer: string;
    vertices?: Array<{ x: number; y: number }>;
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    center?: { x: number; y: number };
    radius?: number;
    [key: string]: unknown;
  }>;
  layers: CadLayer[];
  bounds: { minX: number; minY: number; maxX: number; maxY: number };
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const dxfText = reader.result as string;
        const parser = new DxfParser();
        const dxf = parser.parseSync(dxfText);

        const entities: Array<{
          type: string;
          layer: string;
          vertices?: Array<{ x: number; y: number }>;
          start?: { x: number; y: number };
          end?: { x: number; y: number };
          center?: { x: number; y: number };
          radius?: number;
          [key: string]: unknown;
        }> = [];

        const layerMap = new Map<string, boolean>();
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        // Extract entities
        if (dxf.entities) {
          for (const entity of dxf.entities) {
            const layer = entity.layer || '0';
            layerMap.set(layer, true);

            let entityBounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };

            if (entity.type === 'LINE') {
              const start = { x: entity.start.x, y: entity.start.y };
              const end = { x: entity.end.x, y: entity.end.y };
              entityBounds = {
                minX: Math.min(start.x, end.x),
                minY: Math.min(start.y, end.y),
                maxX: Math.max(start.x, end.x),
                maxY: Math.max(start.y, end.y),
              };
              entities.push({
                type: 'LINE',
                layer,
                start,
                end,
              });
            } else if (entity.type === 'POLYLINE' || entity.type === 'LWPOLYLINE') {
              const vertices: Array<{ x: number; y: number }> = [];
              if (entity.vertices) {
                for (const vertex of entity.vertices) {
                  vertices.push({ x: vertex.x, y: vertex.y });
                  entityBounds.minX = Math.min(entityBounds.minX, vertex.x);
                  entityBounds.minY = Math.min(entityBounds.minY, vertex.y);
                  entityBounds.maxX = Math.max(entityBounds.maxX, vertex.x);
                  entityBounds.maxY = Math.max(entityBounds.maxY, vertex.y);
                }
              }
              entities.push({
                type: entity.type,
                layer,
                vertices,
              });
            } else if (entity.type === 'CIRCLE' || entity.type === 'ARC') {
              const center = { x: entity.center.x, y: entity.center.y };
              const radius = entity.radius || 0;
              entityBounds = {
                minX: center.x - radius,
                minY: center.y - radius,
                maxX: center.x + radius,
                maxY: center.y + radius,
              };
              entities.push({
                type: entity.type,
                layer,
                center,
                radius,
                startAngle: entity.startAngle,
                endAngle: entity.endAngle,
                closed: entity.closed,
              });
            } else if (entity.type === 'SPLINE') {
              const controlPoints: Array<{ x: number; y: number }> = [];
              if (entity.controlPoints) {
                for (const point of entity.controlPoints) {
                  controlPoints.push({ x: point.x, y: point.y });
                  entityBounds.minX = Math.min(entityBounds.minX, point.x);
                  entityBounds.minY = Math.min(entityBounds.minY, point.y);
                  entityBounds.maxX = Math.max(entityBounds.maxX, point.x);
                  entityBounds.maxY = Math.max(entityBounds.maxY, point.y);
                }
              }
              entities.push({
                type: 'SPLINE',
                layer,
                controlPoints,
              });
            } else if (entity.type === 'TEXT' || entity.type === 'MTEXT') {
              const position = entity.position || entity.insertionPoint || { x: 0, y: 0 };
              entityBounds = {
                minX: position.x,
                minY: position.y,
                maxX: position.x,
                maxY: position.y,
              };
              entities.push({
                type: 'TEXT',
                layer,
                position,
                text: entity.text || '',
                height: entity.height || 10,
              });
            }

            // Update global bounds
            if (entityBounds.minX !== Infinity) {
              minX = Math.min(minX, entityBounds.minX);
              minY = Math.min(minY, entityBounds.minY);
              maxX = Math.max(maxX, entityBounds.maxX);
              maxY = Math.max(maxY, entityBounds.maxY);
            }
          }
        }

        // Create layers
        const layers: CadLayer[] = Array.from(layerMap.keys()).map((name, index) => ({
          name,
          visible: true,
          color: `hsl(${(index * 137.5) % 360}, 70%, 50%)`, // Generate distinct colors
        }));

        // Default bounds if no entities
        if (minX === Infinity) {
          minX = -100;
          minY = -100;
          maxX = 100;
          maxY = 100;
        }

        resolve({
          entities,
          layers,
          bounds: { minX, minY, maxX, maxY },
        });
      } catch (error) {
        reject(new Error(`Failed to parse DXF file: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

/**
 * Render DXF entities to canvas
 */
export function renderDxfToCanvas(
  canvas: HTMLCanvasElement,
  entities: Array<{
    type: string;
    layer: string;
    vertices?: Array<{ x: number; y: number }>;
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    center?: { x: number; y: number };
    radius?: number;
  }>,
  layers: CadLayer[],
  bounds: { minX: number; minY: number; maxX: number; maxY: number },
  options: {
    backgroundColor?: string;
    lineColor?: string;
    zoom?: number;
    offsetX?: number;
    offsetY?: number;
    showGrid?: boolean;
  } = {},
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { backgroundColor = '#070b1a', lineColor = '#22d3ee', zoom = 1, offsetX = 0, offsetY = 0, showGrid = false } = options;

  // Clear canvas
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Calculate scale to fit bounds
  const width = bounds.maxX - bounds.minX;
  const height = bounds.maxY - bounds.minY;
  const scaleX = (canvas.width * 0.9) / Math.max(width, 1);
  const scaleY = (canvas.height * 0.9) / Math.max(height, 1);
  const scale = Math.min(scaleX, scaleY) * zoom;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const centerDxfX = (bounds.minX + bounds.maxX) / 2;
  const centerDxfY = (bounds.minY + bounds.maxY) / 2;

  const transformX = (x: number) => centerX + (x - centerDxfX) * scale + offsetX;
  const transformY = (y: number) => centerY - (y - centerDxfY) * scale + offsetY; // Flip Y axis

  // Create layer visibility map
  const layerVisibility = new Map<string, boolean>();
  for (const layer of layers) {
    layerVisibility.set(layer.name, layer.visible);
  }

  // Draw grid if enabled
  if (showGrid) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    const gridSize = 50 * scale;
    const startX = Math.floor((bounds.minX - centerDxfX) * scale + centerX + offsetX);
    const startY = Math.floor((bounds.minY - centerDxfY) * scale + centerY + offsetY);
    const endX = Math.ceil((bounds.maxX - centerDxfX) * scale + centerX + offsetX);
    const endY = Math.ceil((bounds.maxY - centerDxfY) * scale + centerY + offsetY);

    for (let x = startX; x <= endX; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = startY; y <= endY; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  // Enable anti-aliasing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Render entities
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1.5;

  for (const entity of entities) {
    if (!layerVisibility.get(entity.layer)) continue;

    const layer = layers.find((l) => l.name === entity.layer);
    ctx.strokeStyle = layer?.color || lineColor;

    if (entity.type === 'LINE' && entity.start && entity.end) {
      ctx.beginPath();
      ctx.moveTo(transformX(entity.start.x), transformY(entity.start.y));
      ctx.lineTo(transformX(entity.end.x), transformY(entity.end.y));
      ctx.stroke();
    } else if ((entity.type === 'POLYLINE' || entity.type === 'LWPOLYLINE') && entity.vertices) {
      if (entity.vertices.length > 0) {
        ctx.beginPath();
        ctx.moveTo(transformX(entity.vertices[0].x), transformY(entity.vertices[0].y));
        for (let i = 1; i < entity.vertices.length; i++) {
          ctx.lineTo(transformX(entity.vertices[i].x), transformY(entity.vertices[i].y));
        }
        // Close polyline if closed
        if (entity.closed === true) {
          ctx.closePath();
        }
        ctx.stroke();
      }
    } else if (entity.type === 'CIRCLE' && entity.center && entity.radius) {
      ctx.beginPath();
      ctx.arc(transformX(entity.center.x), transformY(entity.center.y), entity.radius * scale, 0, Math.PI * 2);
      ctx.stroke();
    } else if (entity.type === 'ARC' && entity.center && entity.radius) {
      // Proper arc rendering with start and end angles
      const startAngle = ((entity.startAngle as number) || 0) * (Math.PI / 180);
      const endAngle = ((entity.endAngle as number) || 360) * (Math.PI / 180);
      ctx.beginPath();
      ctx.arc(transformX(entity.center.x), transformY(entity.center.y), entity.radius * scale, startAngle, endAngle);
      ctx.stroke();
    } else if (entity.type === 'SPLINE' && entity.controlPoints) {
      // Basic spline rendering
      if (entity.controlPoints.length > 0) {
        ctx.beginPath();
        ctx.moveTo(transformX(entity.controlPoints[0].x), transformY(entity.controlPoints[0].y));
        for (let i = 1; i < entity.controlPoints.length; i++) {
          ctx.lineTo(transformX(entity.controlPoints[i].x), transformY(entity.controlPoints[i].y));
        }
        ctx.stroke();
      }
    } else if (entity.type === 'TEXT' && entity.position) {
      // Text rendering
      ctx.fillStyle = layer?.color || lineColor;
      ctx.font = `${((entity.height as number) || 10) * scale}px sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(
        (entity.text as string) || '',
        transformX(entity.position.x),
        transformY(entity.position.y),
      );
    }
  }
}

/**
 * Calculate distance between two points
 */
export function calculateDistance(
  start: { x: number; y: number },
  end: { x: number; y: number },
  bounds: { minX: number; minY: number; maxX: number; maxY: number },
  scale: number,
): number {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const pixelDistance = Math.sqrt(dx * dx + dy * dy);
  return pixelDistance / scale;
}

/**
 * Parse DWG file (attempts to read as DXF if ASCII, otherwise shows error)
 */
export async function parseDwgFile(file: File): Promise<{
  entities: Array<{
    type: string;
    layer: string;
    vertices?: Array<{ x: number; y: number }>;
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    center?: { x: number; y: number };
    radius?: number;
    [key: string]: unknown;
  }>;
  layers: CadLayer[];
  bounds: { minX: number; minY: number; maxX: number; maxY: number };
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        // Try to read as text (ASCII DWG/DXF)
        const content = reader.result as string;
        
        // Check if it's binary DWG (starts with AC or other binary markers)
        if (content.charCodeAt(0) < 32 && content.charCodeAt(0) !== 9 && content.charCodeAt(0) !== 10 && content.charCodeAt(0) !== 13) {
          reject(new Error('Binary DWG files are not supported. Please convert to DXF format first using AutoCAD or another CAD application.'));
          return;
        }

        // Try to parse as DXF (some DWG files can be read as DXF)
        const parser = new DxfParser();
        const dxf = parser.parseSync(content);

        // Use same parsing logic as DXF
        const entities: Array<{
          type: string;
          layer: string;
          vertices?: Array<{ x: number; y: number }>;
          start?: { x: number; y: number };
          end?: { x: number; y: number };
          center?: { x: number; y: number };
          radius?: number;
          [key: string]: unknown;
        }> = [];

        const layerMap = new Map<string, boolean>();
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        if (dxf.entities) {
          for (const entity of dxf.entities) {
            const layer = entity.layer || '0';
            layerMap.set(layer, true);

            let entityBounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };

            if (entity.type === 'LINE') {
              const start = { x: entity.start.x, y: entity.start.y };
              const end = { x: entity.end.x, y: entity.end.y };
              entityBounds = {
                minX: Math.min(start.x, end.x),
                minY: Math.min(start.y, end.y),
                maxX: Math.max(start.x, end.x),
                maxY: Math.max(start.y, end.y),
              };
              entities.push({
                type: 'LINE',
                layer,
                start,
                end,
              });
            } else if (entity.type === 'POLYLINE' || entity.type === 'LWPOLYLINE') {
              const vertices: Array<{ x: number; y: number }> = [];
              if (entity.vertices) {
                for (const vertex of entity.vertices) {
                  vertices.push({ x: vertex.x, y: vertex.y });
                  entityBounds.minX = Math.min(entityBounds.minX, vertex.x);
                  entityBounds.minY = Math.min(entityBounds.minY, vertex.y);
                  entityBounds.maxX = Math.max(entityBounds.maxX, vertex.x);
                  entityBounds.maxY = Math.max(entityBounds.maxY, vertex.y);
                }
              }
              entities.push({
                type: entity.type,
                layer,
                vertices,
              });
            } else if (entity.type === 'CIRCLE' || entity.type === 'ARC') {
              const center = { x: entity.center.x, y: entity.center.y };
              const radius = entity.radius || 0;
              entityBounds = {
                minX: center.x - radius,
                minY: center.y - radius,
                maxX: center.x + radius,
                maxY: center.y + radius,
              };
              entities.push({
                type: entity.type,
                layer,
                center,
                radius,
                startAngle: entity.startAngle,
                endAngle: entity.endAngle,
                closed: entity.closed,
              });
            } else if (entity.type === 'SPLINE') {
              const controlPoints: Array<{ x: number; y: number }> = [];
              if (entity.controlPoints) {
                for (const point of entity.controlPoints) {
                  controlPoints.push({ x: point.x, y: point.y });
                  entityBounds.minX = Math.min(entityBounds.minX, point.x);
                  entityBounds.minY = Math.min(entityBounds.minY, point.y);
                  entityBounds.maxX = Math.max(entityBounds.maxX, point.x);
                  entityBounds.maxY = Math.max(entityBounds.maxY, point.y);
                }
              }
              entities.push({
                type: 'SPLINE',
                layer,
                controlPoints,
              });
            } else if (entity.type === 'TEXT' || entity.type === 'MTEXT') {
              const position = entity.position || entity.insertionPoint || { x: 0, y: 0 };
              entityBounds = {
                minX: position.x,
                minY: position.y,
                maxX: position.x,
                maxY: position.y,
              };
              entities.push({
                type: 'TEXT',
                layer,
                position,
                text: entity.text || '',
                height: entity.height || 10,
              });
            }

            if (entityBounds.minX !== Infinity) {
              minX = Math.min(minX, entityBounds.minX);
              minY = Math.min(minY, entityBounds.minY);
              maxX = Math.max(maxX, entityBounds.maxX);
              maxY = Math.max(maxY, entityBounds.maxY);
            }
          }
        }

        const layers: CadLayer[] = Array.from(layerMap.keys()).map((name, index) => ({
          name,
          visible: true,
          color: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
        }));

        if (minX === Infinity) {
          minX = -100;
          minY = -100;
          maxX = 100;
          maxY = 100;
        }

        resolve({
          entities,
          layers,
          bounds: { minX, minY, maxX, maxY },
        });
      } catch (error) {
        reject(new Error(`Failed to parse DWG file. Binary DWG files are not supported. Please convert to DXF format first: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

/**
 * Parse SketchUp SKP file (not supported - SKP is proprietary binary format)
 * This function is kept for future server-side conversion support
 */
export async function parseSkpFile(file: File): Promise<{
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  bounds: { minX: number; minY: number; maxX: number; maxY: number; minZ: number; maxZ: number };
}> {
  return new Promise((resolve, reject) => {
    // SKP files are binary and proprietary format
    // They require server-side conversion or SketchUp SDK
    // For now, we reject with a helpful error message
    reject(
      new Error(
        'SKP (SketchUp) files are proprietary binary format and cannot be parsed directly in the browser. ' +
          'Please convert SKP files to DXF or DWG format using SketchUp, AutoCAD, or another CAD application before viewing.',
      ),
    );
  });
}

/**
 * Convert CAD file format (placeholder - requires server-side processing for DWG/SKP)
 */
export async function convertCadFormat(
  file: File,
  sourceFormat: CadFileFormat,
  targetFormat: CadFileFormat,
): Promise<Blob> {
  // For now, only DXF to DXF is supported client-side
  // DWG and SKP conversion requires server-side processing
  if (sourceFormat === 'dxf' && targetFormat === 'dxf') {
    return file;
  }

  throw new Error(
    `Conversion from ${sourceFormat.toUpperCase()} to ${targetFormat.toUpperCase()} requires server-side processing. Please use a desktop CAD application for this conversion.`,
  );
}

