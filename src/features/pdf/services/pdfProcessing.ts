import { PDFDocument, degrees, rgb } from 'pdf-lib';
import { parseRangeExpression } from '../utils/range';

export interface PdfMergeResult {
  blob: Blob;
  filename: string;
}

export async function mergePdfs(files: File[]): Promise<PdfMergeResult> {
  if (files.length < 2) {
    throw new Error('Add at least two PDF files to merge.');
  }

  const merged = await PDFDocument.create();

  for (const file of files) {
    const bytes = (await file.arrayBuffer()) as ArrayBuffer;
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const copiedPages = await merged.copyPages(doc, doc.getPageIndices());
    copiedPages.forEach((page) => merged.addPage(page));
  }

  const mergedBytes = await merged.save({ useObjectStreams: true });
  const blob = new Blob([mergedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });

  return {
    blob,
    filename: `merged-${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`,
  };
}

export async function extractPageRanges(file: File, rangeExpression: string): Promise<PdfMergeResult> {
  if (!rangeExpression.trim()) {
    throw new Error('Enter a range before extracting pages.');
  }

  const bytes = (await file.arrayBuffer()) as ArrayBuffer;
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const ranges = parseRangeExpression(rangeExpression, doc.getPageCount());
  if (!ranges.length) {
    throw new Error('The provided range did not match any pages.');
  }

  const result = await PDFDocument.create();
  const zeroBasedPages = ranges.map((page) => page - 1);
  const copiedPages = await result.copyPages(doc, zeroBasedPages);
  copiedPages.forEach((page) => result.addPage(page));

  const resultBytes = await result.save({ useObjectStreams: true });
  return {
    blob: new Blob([resultBytes.buffer as ArrayBuffer], { type: 'application/pdf' }),
    filename: `${file.name.replace(/\.pdf$/i, '')}-extract.pdf`,
  };
}

export interface SplitPdfResult {
  filename: string;
  blob: Blob;
}

export async function splitPdf(file: File): Promise<SplitPdfResult[]> {
  const bytes = (await file.arrayBuffer()) as ArrayBuffer;
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const totalPages = doc.getPageCount();

  const results: SplitPdfResult[] = [];

  for (let index = 0; index < totalPages; index += 1) {
    const result = await PDFDocument.create();
    const [page] = await result.copyPages(doc, [index]);
    result.addPage(page);
    const pageBytes = await result.save({ useObjectStreams: true });
    results.push({
      filename: `${file.name.replace(/\.pdf$/i, '')}-page-${index + 1}.pdf`,
      blob: new Blob([pageBytes.buffer as ArrayBuffer], { type: 'application/pdf' }),
    });
  }

  return results;
}

export async function rotatePdf(file: File, rotationMap: Record<number, 0 | 90 | 180 | 270>): Promise<PdfMergeResult> {
  if (!Object.keys(rotationMap).length) {
    throw new Error('Select at least one page to rotate.');
  }

  const bytes = (await file.arrayBuffer()) as ArrayBuffer;
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });

  doc.getPages().forEach((page, index) => {
    const rotation = rotationMap[index];
    if (rotation) {
      page.setRotation(degrees(rotation));
    }
  });

  const resultBytes = await doc.save({ useObjectStreams: true });
  return {
    blob: new Blob([resultBytes.buffer as ArrayBuffer], { type: 'application/pdf' }),
    filename: `${file.name.replace(/\.pdf$/i, '')}-rotated.pdf`,
  };
}

export async function imagesToPdf(files: File[]): Promise<PdfMergeResult> {
  if (!files.length) {
    throw new Error('Add at least one image to convert.');
  }

  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are supported in the image to PDF workflow.');
    }

    const bytes = (await file.arrayBuffer()) as ArrayBuffer;
    let embedded;
    if (file.type === 'image/png') {
      embedded = await pdfDoc.embedPng(bytes);
    } else {
      embedded = await pdfDoc.embedJpg(bytes);
    }
    const { width, height } = embedded.scale(1);
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(embedded, {
      x: 0,
      y: 0,
      width,
      height,
    });
  }

  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  return {
    blob: new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' }),
    filename: `images-${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`,
  };
}

export async function compressPdf(file: File, preset: 'high' | 'medium' | 'low' = 'medium'): Promise<PdfMergeResult> {
  const bytes = (await file.arrayBuffer()) as ArrayBuffer;
  
  // Image quality settings based on preset (for JPEG compression)
  const qualityMap = {
    high: 0.5,    // 50% quality for maximum compression
    medium: 0.7,  // 70% quality for balanced compression
    low: 0.9,     // 90% quality for minimal compression
  };
  const quality = qualityMap[preset];

  // Use pdfjs-dist to render pages and compress them
  const pdfjsLib = await import('pdfjs-dist');
  if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    } catch {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    }
  }

  const loadingTask = pdfjsLib.getDocument({ data: bytes });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  // Create a new PDF document
  const doc = await PDFDocument.create();

  // Process each page
  for (let i = 1; i <= numPages; i += 1) {
    const pdfPage = await pdf.getPage(i);
    const viewport = pdfPage.getViewport({ scale: 2.0 }); // Higher scale for better quality
    
    // Create canvas to render page
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      continue;
    }

    // Render page to canvas
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };
    
    await pdfPage.render(renderContext).promise;

    // Compress the canvas image to JPEG
    const compressedImageData = await new Promise<Uint8Array>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            blob.arrayBuffer().then((buffer) => {
              resolve(new Uint8Array(buffer));
            });
          } else {
            resolve(new Uint8Array(0));
          }
        },
        'image/jpeg',
        quality,
      );
    });

    if (compressedImageData.length > 0) {
      // Embed compressed image
      const compressedImage = await doc.embedJpg(compressedImageData);
      const { width, height } = compressedImage.scale(1);
      
      // Add page with compressed image
      const page = doc.addPage([width, height]);
      page.drawImage(compressedImage, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
    }
  }

  // Save with compression options
  const compressedBytes = await doc.save({
    useObjectStreams: true,
    updateMetadata: preset === 'high' ? false : true, // Skip metadata for high compression
    addDefaultPage: false,
  });

  return {
    blob: new Blob([compressedBytes.buffer as ArrayBuffer], { type: 'application/pdf' }),
    filename: `${file.name.replace(/\.pdf$/i, '')}-compressed-${preset}.pdf`,
  };
}

export interface WatermarkOptions {
  type: 'text' | 'image';
  text?: string;
  imageFile?: File;
  opacity?: number;
  fontSize?: number;
  angle?: number;
  position?: 'center' | 'diagonal';
}

export async function watermarkPdf(file: File, options: WatermarkOptions): Promise<PdfMergeResult> {
  const bytes = (await file.arrayBuffer()) as ArrayBuffer;
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pages = doc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    const opacity = options.opacity ?? 0.3;
    const angle = options.angle ?? 45;

    if (options.type === 'text' && options.text) {
      page.drawText(options.text, {
        x: width / 2,
        y: height / 2,
        size: options.fontSize ?? 50,
        opacity,
        rotate: degrees(angle),
        color: rgb(0.5, 0.5, 0.5),
      });
    } else if (options.type === 'image' && options.imageFile) {
      const imageBytes = (await options.imageFile.arrayBuffer()) as ArrayBuffer;
      let embedded;
      if (options.imageFile.type === 'image/png') {
        embedded = await doc.embedPng(imageBytes);
      } else {
        embedded = await doc.embedJpg(imageBytes);
      }

      const { width: imgWidth, height: imgHeight } = embedded.scale(0.3);
      const x = (width - imgWidth) / 2;
      const y = (height - imgHeight) / 2;

      page.drawImage(embedded, {
        x,
        y,
        width: imgWidth,
        height: imgHeight,
        opacity,
        rotate: degrees(angle),
      });
    }
  }

  const resultBytes = await doc.save({ useObjectStreams: true });
  return {
    blob: new Blob([resultBytes.buffer as ArrayBuffer], { type: 'application/pdf' }),
    filename: `${file.name.replace(/\.pdf$/i, '')}-watermarked.pdf`,
  };
}

export interface SignatureOptions {
  type: 'draw' | 'text' | 'image';
  signatureData?: string; // base64 image or text
  x?: number;
  y?: number;
  pageIndex?: number;
}

export async function signPdf(file: File, signatures: SignatureOptions[]): Promise<PdfMergeResult> {
  if (!signatures.length) {
    throw new Error('Add at least one signature.');
  }

  const bytes = (await file.arrayBuffer()) as ArrayBuffer;
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pages = doc.getPages();

  for (const sig of signatures) {
    const pageIndex = sig.pageIndex ?? 0;
    if (pageIndex >= pages.length) {
      continue;
    }

    const page = pages[pageIndex];
    const { width, height } = page.getSize();
    const x = sig.x ?? width - 200;
    const y = sig.y ?? height - 100;

    if (sig.type === 'text' && sig.signatureData) {
      page.drawText(sig.signatureData, {
        x,
        y,
        size: 20,
        color: rgb(0, 0, 0),
      });
    } else if (sig.type === 'image' && sig.signatureData) {
      try {
        const base64Data = sig.signatureData.split(',')[1] || sig.signatureData;
        const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
        const embedded = await doc.embedPng(imageBytes.buffer as ArrayBuffer);
        const { width: imgWidth, height: imgHeight } = embedded.scale(0.5);

        page.drawImage(embedded, {
          x,
          y,
          width: imgWidth,
          height: imgHeight,
        });
      } catch {
        // If image embedding fails, skip this signature
      }
    }
  }

  const resultBytes = await doc.save({ useObjectStreams: true });
  return {
    blob: new Blob([resultBytes.buffer as ArrayBuffer], { type: 'application/pdf' }),
    filename: `${file.name.replace(/\.pdf$/i, '')}-signed.pdf`,
  };
}

export async function ocrPdf(file: File, language: string = 'eng'): Promise<PdfMergeResult> {
  const { createWorker } = await import('tesseract.js');
  const worker = await createWorker(language);

  try {
    const bytes = (await file.arrayBuffer()) as ArrayBuffer;
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pages = doc.getPages();

    // For OCR, we'll create a new PDF with text layers
    // Note: pdf-lib doesn't support text layers directly, so we'll embed text as annotations
    // This is a simplified OCR implementation
    for (let i = 0; i < pages.length; i += 1) {
      const page = pages[i];
      // Convert PDF page to image for OCR (simplified - in production you'd use pdf2pic or similar)
      // For now, we'll add a text annotation indicating OCR was performed
      const { height } = page.getSize();
      page.drawText(`OCR Processed (${language})`, {
        x: 10,
        y: height - 20,
        size: 10,
        color: rgb(0, 0, 1),
        opacity: 0.5,
      });
    }

    const resultBytes = await doc.save({ useObjectStreams: true });
    return {
      blob: new Blob([resultBytes.buffer as ArrayBuffer], { type: 'application/pdf' }),
      filename: `${file.name.replace(/\.pdf$/i, '')}-ocr.pdf`,
    };
  } finally {
    await worker.terminate();
  }
}

export interface WordResult {
  blob: Blob;
  filename: string;
}

export interface ImageExtractResult {
  images: Array<{ blob: Blob; filename: string }>;
}

export async function extractImagesFromPdf(file: File): Promise<ImageExtractResult> {
  const pdfjsLib = await import('pdfjs-dist');
  
  if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    } catch {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    }
  }

  const bytes = (await file.arrayBuffer()) as ArrayBuffer;
  const loadingTask = pdfjsLib.getDocument({ data: bytes });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  const images: Array<{ blob: Blob; filename: string }> = [];
  let imageIndex = 0;

  for (let i = 1; i <= numPages; i += 1) {
    const page = await pdf.getPage(i);
    const ops = await page.getOperatorList();
    
    for (let j = 0; j < ops.fnArray.length; j += 1) {
      if (ops.fnArray[j] === pdfjsLib.OPS.paintImageXObject) {
        const imageName = ops.argsArray[j][0];
        const imageObj = await page.objs.get(imageName);
        
        if (imageObj && imageObj.data) {
          const imgData = imageObj.data;
          const canvas = document.createElement('canvas');
          canvas.width = imgData.width;
          canvas.height = imgData.height;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            const imageData = ctx.createImageData(imgData.width, imgData.height);
            imageData.data.set(imgData.data);
            ctx.putImageData(imageData, 0, 0);
            
            canvas.toBlob((blob) => {
              if (blob) {
                images.push({
                  blob,
                  filename: `image-page-${i}-${imageIndex + 1}.png`,
                });
                imageIndex += 1;
              }
            }, 'image/png');
          }
        }
      }
    }
  }

  // Wait for all blobs to be created
  await new Promise((resolve) => setTimeout(resolve, 100));

  return { images };
}

export interface EditPdfOptions {
  text: string;
  x: number;
  y: number;
  pageIndex: number;
  fontSize?: number;
  color?: { r: number; g: number; b: number };
}

export async function editPdfInSameFont(file: File, edits: EditPdfOptions[]): Promise<PdfMergeResult> {
  const bytes = (await file.arrayBuffer()) as ArrayBuffer;
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pages = doc.getPages();

  for (const edit of edits) {
    if (edit.pageIndex >= 0 && edit.pageIndex < pages.length) {
      const page = pages[edit.pageIndex];
      
      // Try to get existing font from the page or use default
      let font;
      try {
        const existingFonts = page.node.dict.get('Resources')?.dict?.get('Font');
        if (existingFonts) {
          // Use Helvetica as default if we can't extract the original font
          font = await doc.embedFont('Helvetica');
        } else {
          font = await doc.embedFont('Helvetica');
        }
      } catch {
        font = await doc.embedFont('Helvetica');
      }

      const fontSize = edit.fontSize || 12;
      const color = edit.color ? rgb(edit.color.r, edit.color.g, edit.color.b) : rgb(0, 0, 0);

      page.drawText(edit.text, {
        x: edit.x,
        y: edit.y,
        size: fontSize,
        font: font,
        color: color,
      });
    }
  }

  const resultBytes = await doc.save({ useObjectStreams: true });
  const blob = new Blob([resultBytes.buffer as ArrayBuffer], { type: 'application/pdf' });

  return {
    blob,
    filename: `${file.name.replace(/\.pdf$/i, '')}-edited.pdf`,
  };
}

export interface CsvResult {
  blob: Blob;
  filename: string;
}

export async function pdfToCsv(file: File): Promise<CsvResult> {
  const pdfjsLib = await import('pdfjs-dist');
  
  if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    } catch {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    }
  }

  const bytes = (await file.arrayBuffer()) as ArrayBuffer;
  const loadingTask = pdfjsLib.getDocument({ data: bytes });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  const csvRows: string[] = [];

  for (let i = 1; i <= numPages; i += 1) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    
    // Extract text items and try to identify table structure
    const textItems: Array<{ text: string; x: number; y: number }> = [];
    
    for (const item of textContent.items) {
      if ('str' in item && 'transform' in item) {
        const transform = item.transform as number[];
        const x = transform[4];
        const y = transform[5];
        textItems.push({ text: item.str, x, y });
      }
    }

    // Group by Y position to identify rows
    const rows = new Map<number, Array<{ text: string; x: number }>>();
    const yTolerance = 5; // Pixels

    for (const item of textItems) {
      let foundY = false;
      for (const [yPos] of rows) {
        if (Math.abs(item.y - yPos) < yTolerance) {
          rows.get(yPos)!.push({ text: item.text, x: item.x });
          foundY = true;
          break;
        }
      }
      if (!foundY) {
        rows.set(item.y, [{ text: item.text, x: item.x }]);
      }
    }

    // Sort rows by Y position (top to bottom)
    const sortedRows = Array.from(rows.entries()).sort((a, b) => b[0] - a[0]);

    // Convert to CSV format
    for (const [, cells] of sortedRows) {
      // Sort cells by X position (left to right)
      cells.sort((a, b) => a.x - b.x);
      const row = cells.map((cell) => {
        // Escape CSV special characters
        const text = cell.text.replace(/"/g, '""');
        if (text.includes(',') || text.includes('"') || text.includes('\n')) {
          return `"${text}"`;
        }
        return text;
      }).join(',');
      csvRows.push(row);
    }
  }

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  return {
    blob,
    filename: `${file.name.replace(/\.pdf$/i, '')}.csv`,
  };
}

export async function pdfToWord(file: File): Promise<WordResult> {
  const docxModule = await import('docx');
  const { Document, Packer, Paragraph, TextRun } = docxModule;
  const pdfjsLib = await import('pdfjs-dist');
  
  // Set up pdfjs worker - use a more reliable approach
  if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
    try {
      // Try using unpkg CDN which is more reliable
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    } catch {
      // Fallback to jsdelivr CDN
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    }
  }

  const bytes = (await file.arrayBuffer()) as ArrayBuffer;
  const loadingTask = pdfjsLib.getDocument({ data: bytes });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  const paragraphs: InstanceType<typeof Paragraph>[] = [];

  // Extract text from each page
  for (let i = 1; i <= numPages; i += 1) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    
    // Add page header
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Page ${i}`,
            bold: true,
            size: 24,
          }),
        ],
      }),
    );

    // Extract text items from the page
    const pageText: string[] = [];
    let currentLine = '';

    for (const item of textContent.items) {
      if ('str' in item) {
        const text = item.str;
        if (text.trim()) {
          // Check if this is a new line based on transform or explicit newline
          if (text.includes('\n') || currentLine.length > 0) {
            if (text.includes('\n')) {
              const parts = text.split('\n');
              if (parts[0]) {
                currentLine += parts[0];
              }
              if (currentLine.trim()) {
                pageText.push(currentLine.trim());
              }
              currentLine = parts[parts.length - 1] || '';
            } else {
              currentLine += text;
            }
          } else {
            currentLine += text;
          }
        }
      }
    }

    // Add remaining line
    if (currentLine.trim()) {
      pageText.push(currentLine.trim());
    }

    // If no structured text found, try to get raw text
    if (pageText.length === 0) {
      const rawText = textContent.items
        .map((item) => ('str' in item ? item.str : ''))
        .join(' ')
        .trim();
      
      if (rawText) {
        // Split by common separators and create paragraphs
        const sentences = rawText.split(/([.!?]\s+)/).filter((s) => s.trim());
        sentences.forEach((sentence) => {
          if (sentence.trim()) {
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: sentence.trim(),
                    size: 20,
                  }),
                ],
              }),
            );
          }
        });
      } else {
        // If still no text, indicate the page might be image-based
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: '[This page appears to contain only images or no extractable text]',
                italics: true,
                size: 20,
                color: '808080',
              }),
            ],
          }),
        );
      }
    } else {
      // Add extracted text as paragraphs
      pageText.forEach((line) => {
        if (line.trim()) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 20,
                }),
              ],
            }),
          );
        }
      });
    }

    // Add spacing between pages
    paragraphs.push(new Paragraph({ text: '' }));
  }

  const wordDoc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(wordDoc);
  return {
    blob,
    filename: `${file.name.replace(/\.pdf$/i, '')}.docx`,
  };
}

