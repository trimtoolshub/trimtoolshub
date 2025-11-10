import { nanoid } from 'nanoid/non-secure';
import type { PdfFileEntry, PdfWorkspaceAction, PdfWorkspaceState } from '../types';

export function createPdfEntry(file: File): PdfFileEntry {
  return {
    id: nanoid(),
    file,
    name: file.name,
    size: file.size,
    rotationMap: {},
  };
}

export const initialPdfState: PdfWorkspaceState = {
  files: [],
  activeOperation: 'merge',
  rangeExpression: '',
  compressPreset: 'medium',
  isProcessing: false,
  error: undefined,
  successMessage: undefined,
};

export function pdfWorkspaceReducer(state: PdfWorkspaceState, action: PdfWorkspaceAction): PdfWorkspaceState {
  switch (action.type) {
    case 'ADD_FILES': {
      const unique = action.files.filter((incoming) => !state.files.some((existing) => existing.name === incoming.name));
      return {
        ...state,
        files: [...state.files, ...unique],
      };
    }
    case 'REMOVE_FILE':
      return {
        ...state,
        files: state.files.filter((file) => file.id !== action.fileId),
      };
    case 'REORDER_FILES':
      return {
        ...state,
        files: action.files,
      };
    case 'UPDATE_FILE_META':
      return {
        ...state,
        files: state.files.map((file) =>
          file.id === action.fileId
            ? {
                ...file,
                pageCount: action.pageCount,
              }
            : file,
        ),
      };
    case 'SET_OPERATION':
      return {
        ...state,
        activeOperation: action.operation,
      };
    case 'SET_RANGE':
      return {
        ...state,
        rangeExpression: action.range,
      };
    case 'SET_COMPRESS':
      return {
        ...state,
        compressPreset: action.preset,
      };
    case 'SET_ROTATION':
      return {
        ...state,
        files: state.files.map((file) => {
          if (file.id !== action.fileId) {
            return file;
          }
          const rotationMap = { ...file.rotationMap };
          if (action.rotation === 0) {
            delete rotationMap[action.pageIndex];
          } else {
            rotationMap[action.pageIndex] = action.rotation;
          }
          return {
            ...file,
            rotationMap,
          };
        }),
      };
    case 'CLEAR_ROTATIONS':
      return {
        ...state,
        files: state.files.map((file) =>
          file.id === action.fileId
            ? {
                ...file,
                rotationMap: {},
              }
            : file,
        ),
      };
    case 'START_PROCESSING':
      return {
        ...state,
        isProcessing: true,
        error: undefined,
        successMessage: undefined,
      };
    case 'FINISH_PROCESSING':
      return {
        ...state,
        isProcessing: false,
        successMessage: action.successMessage,
      };
    case 'SET_ERROR':
      return {
        ...state,
        isProcessing: false,
        error: action.error,
      };
    case 'CLEAR_FEEDBACK':
      return {
        ...state,
        error: undefined,
        successMessage: undefined,
      };
    default:
      return state;
  }
}

