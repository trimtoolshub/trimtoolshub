import JSZip from 'jszip';

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export async function downloadBatchAsZip(files: Array<{ blob: Blob; filename: string }>, zipName: string) {
  if (!files.length) {
    return;
  }

  if (files.length === 1) {
    downloadBlob(files[0].blob, files[0].filename);
    return;
  }

  const zip = new JSZip();
  files.forEach(({ blob, filename }) => {
    zip.file(filename, blob);
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  downloadBlob(zipBlob, zipName);
}

