import { useState } from 'react';
import { AdSlot } from '../components/ads/AdSlot';
import { RelatedTools } from '../components/related/RelatedTools';
import { PdfWorkspace } from '../features/pdf/components/PdfWorkspace';
import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo';

export function PdfPage() {
  const title = generatePageTitle('Free PDF Tools - Merge, Split, Compress & More');
  const url = generateCanonicalUrl('/pdf');
  const jsonLd = generateJsonLd({
    name: 'PDF Tools',
    url: url,
    description: 'Free online PDF tools to merge, split, compress, watermark, OCR, and convert PDFs. All processing happens in your browser.',
  });

  // FAQPage structured data for SEO
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I merge multiple PDF files?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To merge PDF files, upload two or more PDF files using the drag-and-drop area or file picker. Select the "Merge" operation from the sidebar. The PDFs will be combined in the order they were uploaded. Click "Process PDF" to merge all files into a single PDF document. The merged PDF will download automatically. You can merge as many PDFs as needed - all processing happens in your browser for complete privacy.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I split a PDF into separate pages?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To split a PDF, upload your PDF file and select the "Split" operation. The tool will automatically split your PDF into individual pages, creating one PDF file per page. If you have more than 5 pages, the split PDFs will be bundled into a ZIP file for easy download. If you have 5 or fewer pages, each page will download separately. This is perfect for extracting individual pages from large documents.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I extract specific pages from a PDF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select the "Extract" operation and upload your PDF. Enter a page range expression in the format "1-5" (pages 1 through 5), "1,3,5" (pages 1, 3, and 5), or "1-3,7-9" (pages 1-3 and 7-9). You can also specify single pages like "1,5,10". Click "Process PDF" to extract the specified pages into a new PDF file. The extracted pages will download automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I compress a PDF to reduce file size?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To compress a PDF, upload your PDF file and select the "Compress" operation. Choose a compression preset: "Low" for minimal compression and best quality, "Medium" for balanced compression, or "High" for maximum file size reduction. The tool uses image compression techniques to reduce file size while maintaining readability. After processing, you\'ll see the size reduction percentage. The compressed PDF will download automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I add a watermark to a PDF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select the "Watermark" operation and upload your PDF. Choose between text or image watermark. For text watermarks, enter your text, adjust font size, opacity (0-100%), and angle (0-360°). For image watermarks, upload an image file and adjust opacity and angle. The watermark will be applied to all pages of the PDF. Click "Process PDF" to apply the watermark. The watermarked PDF will download automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does PDF OCR work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'OCR (Optical Character Recognition) makes scanned PDFs searchable by extracting text from images. Select the "OCR" operation, upload your scanned PDF, and choose the language (default is English). The tool uses Tesseract.js (WASM) to analyze each page and extract text. The processed PDF will be searchable - you can use Ctrl+F to search for text within the document. OCR processing may take longer for large documents as it processes each page individually.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert PDF to Word format?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To convert PDF to Word, select the "PDF → Word" operation and upload your PDF file. The tool extracts text from the PDF and creates an editable Word document (.docx). The conversion preserves text formatting and structure as much as possible. Complex layouts, images, and tables may require manual adjustment in Word. The converted Word document will download automatically. This is perfect for editing PDF content in Microsoft Word or Google Docs.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I extract images from a PDF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select the "Extract Images" operation and upload your PDF file. The tool will scan all pages and extract embedded images. If the PDF contains more than 5 images, they will be bundled into a ZIP file. If there are 5 or fewer images, each image will download separately. Extracted images maintain their original quality and format. This is useful for extracting photos, diagrams, or graphics from PDF documents.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert PDF to CSV format?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select the "PDF → CSV" operation and upload your PDF file. The tool extracts text from the PDF and attempts to structure it into CSV format. This works best with PDFs that contain tabular data or structured text. The tool analyzes the text layout and creates comma-separated values. You may need to adjust the CSV file in Excel or Google Sheets after conversion. The CSV file will download automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my PDF data private and secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! All PDF processing happens entirely in your web browser using JavaScript. Your PDF files never leave your device and are never uploaded to our servers. This ensures complete privacy and security. You can process sensitive documents, confidential files, or personal PDFs without any privacy concerns. We don\'t track, store, or transmit any of your PDF data.',
        },
      },
      {
        '@type': 'Question',
        name: 'What file size limits are there for PDF processing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There are no strict file size limits, but processing very large PDFs (over 100MB) may take longer and use more browser memory. For best performance, we recommend PDFs under 50MB. If you encounter memory issues with large files, try splitting the PDF first or compressing it before processing. All processing happens in your browser, so performance depends on your device\'s capabilities.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I process password-protected PDFs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our tools can process password-protected PDFs if you provide the password. However, some operations may have limitations with encrypted PDFs. For best results, remove password protection from your PDF before processing, or use a PDF tool that supports password removal. Most standard PDF operations work with password-protected files once the password is entered.',
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={title}
        description="Free online PDF tools to merge multiple PDFs, split PDF pages, compress file size, add watermarks, extract text with OCR, extract images, and convert PDF to Word or CSV. All processing happens in your browser for complete privacy."
        canonical={url}
        ogImage="/og-default.png"
        keywords={['PDF merger', 'PDF splitter', 'PDF compressor', 'PDF watermark', 'PDF OCR', 'PDF to Word', 'PDF to CSV', 'extract images from PDF', 'free PDF tools', 'online PDF editor', 'merge PDF', 'split PDF', 'compress PDF']}
        jsonLd={jsonLd}
      />
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <div className="space-y-10">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-black/30">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-accent">PDF Tools</span>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Free PDF Tools - Merge, Split, Compress & More
          </h1>
          <p className="max-w-3xl text-base text-slate-300">
            Use our free online PDF tools to merge multiple PDFs into one, split PDF pages, compress file size, add watermarks, 
            extract text with OCR, extract images, and convert PDF to Word or CSV format. All processing happens entirely in your 
            browser—your files never leave your device, ensuring complete privacy and security.
          </p>
        </div>
        <AdSlot
          slotId={import.meta.env.VITE_ADSENSE_SLOT_PDF_TOP}
          className="mt-6 min-h-[90px] rounded-2xl bg-slate-950/70 p-4"
          format="auto"
        />
      </header>

      <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-black/30">
        <PdfWorkspace />
      </section>

      <FaqSection />

      <HowToSection />

      <RelatedTools currentPath="/pdf" />
    </div>
    </>
  );
}

// Collapsible FAQ Component
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I merge multiple PDF files?',
      answer: 'To merge PDF files, upload two or more PDF files using the drag-and-drop area or file picker. Select the "Merge" operation from the sidebar. The PDFs will be combined in the order they were uploaded. Click "Process PDF" to merge all files into a single PDF document. The merged PDF will download automatically. You can merge as many PDFs as needed - all processing happens in your browser for complete privacy.',
    },
    {
      question: 'How do I split a PDF into separate pages?',
      answer: 'To split a PDF, upload your PDF file and select the "Split" operation. The tool will automatically split your PDF into individual pages, creating one PDF file per page. If you have more than 5 pages, the split PDFs will be bundled into a ZIP file for easy download. If you have 5 or fewer pages, each page will download separately. This is perfect for extracting individual pages from large documents.',
    },
    {
      question: 'How do I extract specific pages from a PDF?',
      answer: 'Select the "Extract" operation and upload your PDF. Enter a page range expression in the format "1-5" (pages 1 through 5), "1,3,5" (pages 1, 3, and 5), or "1-3,7-9" (pages 1-3 and 7-9). You can also specify single pages like "1,5,10". Click "Process PDF" to extract the specified pages into a new PDF file. The extracted pages will download automatically.',
    },
    {
      question: 'How do I compress a PDF to reduce file size?',
      answer: 'To compress a PDF, upload your PDF file and select the "Compress" operation. Choose a compression preset: "Low" for minimal compression and best quality, "Medium" for balanced compression, or "High" for maximum file size reduction. The tool uses image compression techniques to reduce file size while maintaining readability. After processing, you\'ll see the size reduction percentage. The compressed PDF will download automatically.',
    },
    {
      question: 'How do I add a watermark to a PDF?',
      answer: 'Select the "Watermark" operation and upload your PDF. Choose between text or image watermark. For text watermarks, enter your text, adjust font size, opacity (0-100%), and angle (0-360°). For image watermarks, upload an image file and adjust opacity and angle. The watermark will be applied to all pages of the PDF. Click "Process PDF" to apply the watermark. The watermarked PDF will download automatically.',
    },
    {
      question: 'How does PDF OCR work?',
      answer: 'OCR (Optical Character Recognition) makes scanned PDFs searchable by extracting text from images. Select the "OCR" operation, upload your scanned PDF, and choose the language (default is English). The tool uses Tesseract.js (WASM) to analyze each page and extract text. The processed PDF will be searchable - you can use Ctrl+F to search for text within the document. OCR processing may take longer for large documents as it processes each page individually.',
    },
    {
      question: 'How do I convert PDF to Word format?',
      answer: 'To convert PDF to Word, select the "PDF → Word" operation and upload your PDF file. The tool extracts text from the PDF and creates an editable Word document (.docx). The conversion preserves text formatting and structure as much as possible. Complex layouts, images, and tables may require manual adjustment in Word. The converted Word document will download automatically. This is perfect for editing PDF content in Microsoft Word or Google Docs.',
    },
    {
      question: 'How do I extract images from a PDF?',
      answer: 'Select the "Extract Images" operation and upload your PDF file. The tool will scan all pages and extract embedded images. If the PDF contains more than 5 images, they will be bundled into a ZIP file. If there are 5 or fewer images, each image will download separately. Extracted images maintain their original quality and format. This is useful for extracting photos, diagrams, or graphics from PDF documents.',
    },
    {
      question: 'How do I convert PDF to CSV format?',
      answer: 'Select the "PDF → CSV" operation and upload your PDF file. The tool extracts text from the PDF and attempts to structure it into CSV format. This works best with PDFs that contain tabular data or structured text. The tool analyzes the text layout and creates comma-separated values. You may need to adjust the CSV file in Excel or Google Sheets after conversion. The CSV file will download automatically.',
    },
    {
      question: 'Is my PDF data private and secure?',
      answer: 'Absolutely! All PDF processing happens entirely in your web browser using JavaScript. Your PDF files never leave your device and are never uploaded to our servers. This ensures complete privacy and security. You can process sensitive documents, confidential files, or personal PDFs without any privacy concerns. We don\'t track, store, or transmit any of your PDF data.',
    },
    {
      question: 'What file size limits are there for PDF processing?',
      answer: 'There are no strict file size limits, but processing very large PDFs (over 100MB) may take longer and use more browser memory. For best performance, we recommend PDFs under 50MB. If you encounter memory issues with large files, try splitting the PDF first or compressing it before processing. All processing happens in your browser, so performance depends on your device\'s capabilities.',
    },
    {
      question: 'Can I process password-protected PDFs?',
      answer: 'Our tools can process password-protected PDFs if you provide the password. However, some operations may have limitations with encrypted PDFs. For best results, remove password protection from your PDF before processing, or use a PDF tool that supports password removal. Most standard PDF operations work with password-protected files once the password is entered.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-black/30">
      <h2 className="mb-6 text-2xl font-semibold text-white">Frequently Asked Questions (FAQs)</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <article key={index} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 transition-all">
            <button
              type="button"
              onClick={() => toggleFaq(index)}
              className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-slate-900/50"
            >
              <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
              <svg
                className={`h-5 w-5 flex-shrink-0 text-brand-accent transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5">
                <p className="text-sm leading-relaxed text-slate-300">{faq.answer}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

// Enhanced How To Section
function HowToSection() {
  return (
    <section className="rounded-3xl border border-brand-accent/30 bg-brand-accent/10 p-8 text-sm text-slate-200">
      <h2 className="mb-6 text-2xl font-semibold text-white">How to Use Our PDF Tools</h2>
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">1. Merge Multiple PDF Files</h3>
          <p className="leading-relaxed text-slate-200">
            To combine multiple PDF files into one, upload two or more PDF files using the drag-and-drop area or file picker. Select the "Merge" operation from the sidebar. The PDFs will be combined in the order they were uploaded - you can see the file list and reorder if needed. Click "Process PDF" to merge all files into a single PDF document. The merged PDF will download automatically. This is perfect for combining reports, invoices, or documents into a single file. All processing happens in your browser for complete privacy.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">2. Split PDF into Individual Pages</h3>
          <p className="leading-relaxed text-slate-200">
            To split a PDF into separate pages, upload your PDF file and select the "Split" operation. The tool will automatically split your PDF into individual pages, creating one PDF file per page. If you have more than 5 pages, the split PDFs will be bundled into a ZIP file for convenient download. If you have 5 or fewer pages, each page will download separately. This is perfect for extracting individual pages from large documents, creating page-specific files, or organizing document sections.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">3. Extract Specific Pages from PDF</h3>
          <p className="leading-relaxed text-slate-200">
            To extract specific pages, select the "Extract" operation and upload your PDF. Enter a page range expression in the input field. Use formats like "1-5" (pages 1 through 5), "1,3,5" (pages 1, 3, and 5), or "1-3,7-9" (pages 1-3 and 7-9). You can also specify single pages like "1,5,10" or combine ranges and single pages. Click "Process PDF" to extract the specified pages into a new PDF file. The extracted pages will download automatically. This is useful for creating custom PDFs from larger documents.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">4. Compress PDF to Reduce File Size</h3>
          <p className="leading-relaxed text-slate-200">
            To reduce PDF file size, upload your PDF and select the "Compress" operation. Choose a compression preset from the dropdown: "Low" for minimal compression and best quality (recommended for documents with important images), "Medium" for balanced compression (good for most documents), or "High" for maximum file size reduction (best for documents where file size is critical). The tool uses image compression techniques to reduce file size while maintaining readability. After processing, you'll see the size reduction percentage. The compressed PDF will download automatically.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">5. Add Watermarks to PDF Documents</h3>
          <p className="leading-relaxed text-slate-200">
            To add a watermark, select the "Watermark" operation and upload your PDF. Choose between text or image watermark using the toggle. For text watermarks, enter your watermark text (e.g., "DRAFT", "CONFIDENTIAL"), adjust font size (10-200px), opacity (0-100% - lower values make the watermark more subtle), and angle (0-360° - 45° is common for diagonal watermarks). For image watermarks, upload an image file (PNG or JPG) and adjust opacity and angle. The watermark will be applied to all pages of the PDF. Click "Process PDF" to apply the watermark. The watermarked PDF will download automatically.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">6. Make Scanned PDFs Searchable with OCR</h3>
          <p className="leading-relaxed text-slate-200">
            OCR (Optical Character Recognition) makes scanned PDFs searchable by extracting text from images. Select the "OCR" operation, upload your scanned PDF, and choose the language from the dropdown (default is English, but many languages are supported). The tool uses Tesseract.js (WASM) to analyze each page and extract text. The processed PDF will be searchable - you can use Ctrl+F (or Cmd+F on Mac) to search for text within the document. OCR processing may take longer for large documents as it processes each page individually. This is perfect for making old scanned documents searchable and editable.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">7. Convert PDF to Word Format</h3>
          <p className="leading-relaxed text-slate-200">
            To convert PDF to Word, select the "PDF → Word" operation and upload your PDF file. The tool extracts text from the PDF and creates an editable Word document (.docx). The conversion preserves text formatting and structure as much as possible. Complex layouts, images, and tables may require manual adjustment in Word. The converted Word document will download automatically. This is perfect for editing PDF content in Microsoft Word or Google Docs. Note that the conversion works best with text-based PDFs rather than scanned images.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">8. Extract Images from PDF Documents</h3>
          <p className="leading-relaxed text-slate-200">
            To extract images, select the "Extract Images" operation and upload your PDF file. The tool will scan all pages and extract embedded images. If the PDF contains more than 5 images, they will be bundled into a ZIP file for convenient download. If there are 5 or fewer images, each image will download separately. Extracted images maintain their original quality and format. This is useful for extracting photos, diagrams, charts, or graphics from PDF documents for use in other applications or presentations.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">9. Convert PDF Tables to CSV Format</h3>
          <p className="leading-relaxed text-slate-200">
            To convert PDF to CSV, select the "PDF → CSV" operation and upload your PDF file. The tool extracts text from the PDF and attempts to structure it into CSV format. This works best with PDFs that contain tabular data or structured text. The tool analyzes the text layout and creates comma-separated values. You may need to adjust the CSV file in Excel or Google Sheets after conversion to ensure proper column alignment. The CSV file will download automatically. This is perfect for extracting data from PDF reports or tables for analysis in spreadsheet applications.
          </p>
        </div>
      </div>
    </section>
  );
}

