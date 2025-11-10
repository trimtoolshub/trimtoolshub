import { useCallback, useMemo, useReducer } from 'react';
import type { PdfOperationType } from '../types';
import { createPdfEntry, initialPdfState, pdfWorkspaceReducer } from '../state/pdfWorkspaceReducer';
import type { PdfFileEntry } from '../types';

export function usePdfWorkspace() {
  const [state, dispatch] = useReducer(pdfWorkspaceReducer, initialPdfState);

  const addFiles = useCallback((files: FileList | File[]) => {
    const incoming = Array.from(files).map(createPdfEntry);
    dispatch({ type: 'ADD_FILES', files: incoming });
  }, []);

  const removeFile = useCallback((fileId: string) => dispatch({ type: 'REMOVE_FILE', fileId }), []);

  const setOperation = useCallback(
    (operation: PdfOperationType) => dispatch({ type: 'SET_OPERATION', operation }),
    [],
  );

  const reorderFiles = useCallback((files: PdfFileEntry[]) => dispatch({ type: 'REORDER_FILES', files }), []);

  const updateFileMeta = useCallback(
    (fileId: string, pageCount: number) => dispatch({ type: 'UPDATE_FILE_META', fileId, pageCount }),
    [],
  );

  const setRange = useCallback((range: string) => dispatch({ type: 'SET_RANGE', range }), []);

  const setCompressPreset = useCallback(
    (preset: 'high' | 'medium' | 'low') => dispatch({ type: 'SET_COMPRESS', preset }),
    [],
  );

  const setRotation = useCallback(
    (fileId: string, pageIndex: number, rotation: 0 | 90 | 180 | 270) =>
      dispatch({ type: 'SET_ROTATION', fileId, pageIndex, rotation }),
    [],
  );

  const clearRotations = useCallback((fileId: string) => dispatch({ type: 'CLEAR_ROTATIONS', fileId }), []);

  const startProcessing = useCallback(() => dispatch({ type: 'START_PROCESSING' }), []);
  const finishProcessing = useCallback((successMessage?: string) => dispatch({ type: 'FINISH_PROCESSING', successMessage }), []);
  const setError = useCallback((error?: string) => dispatch({ type: 'SET_ERROR', error }), []);
  const clearFeedback = useCallback(() => dispatch({ type: 'CLEAR_FEEDBACK' }), []);

  const helpers = useMemo(
    () => ({
      addFiles,
      removeFile,
      setOperation,
      reorderFiles,
      setRange,
      setCompressPreset,
      updateFileMeta,
      setRotation,
      clearRotations,
      startProcessing,
      finishProcessing,
      setError,
      clearFeedback,
    }),
    [
      addFiles,
      removeFile,
      reorderFiles,
      setOperation,
      setRange,
      setCompressPreset,
      updateFileMeta,
      setRotation,
      clearRotations,
      startProcessing,
      finishProcessing,
      setError,
      clearFeedback,
    ],
  );

  return { state, helpers };
}

