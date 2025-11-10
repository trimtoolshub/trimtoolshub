export type CadOperationType = 'view' | 'convert';

export type CadFileFormat = 'dxf' | 'dwg' | 'skp';

export interface CadFileEntry {
  id: string;
  file: File;
  name: string;
  size: number;
  format?: CadFileFormat;
}

export interface CadViewOptions {
  showLayers: boolean;
  showGrid: boolean;
  backgroundColor: string;
  lineColor: string;
  zoom: number;
}

export interface CadConvertOptions {
  sourceFormat: CadFileFormat;
  targetFormat: CadFileFormat;
}

export interface CadLayer {
  name: string;
  visible: boolean;
  color: string;
}

export interface CadMeasurement {
  start: { x: number; y: number };
  end: { x: number; y: number };
  distance: number;
}

