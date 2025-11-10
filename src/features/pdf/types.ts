export type PdfOperationType =
  | 'merge'
  | 'split'
  | 'extract'
  | 'compress'
  | 'watermark'
  | 'ocr'
  | 'pdf2word'
  | 'extractImages'
  | 'pdf2csv';

export interface PdfFileEntry {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount?: number;
}

export interface PdfWorkspaceState {
  files: PdfFileEntry[];
  activeOperation: PdfOperationType;
  rangeExpression: string;
  compressPreset: 'high' | 'medium' | 'low';
  isProcessing: boolean;
  error?: string;
  successMessage?: string;
}

export type PdfWorkspaceAction =
  | { type: 'ADD_FILES'; files: PdfFileEntry[] }
  | { type: 'REMOVE_FILE'; fileId: string }
  | { type: 'REORDER_FILES'; files: PdfFileEntry[] }
  | { type: 'UPDATE_FILE_META'; fileId: string; pageCount: number }
  | { type: 'SET_OPERATION'; operation: PdfOperationType }
  | { type: 'SET_RANGE'; range: string }
  | { type: 'SET_COMPRESS'; preset: 'high' | 'medium' | 'low' }
  | { type: 'START_PROCESSING' }
  | { type: 'FINISH_PROCESSING'; successMessage?: string }
  | { type: 'SET_ERROR'; error?: string }
  | { type: 'CLEAR_FEEDBACK' };

