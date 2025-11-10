import { useState } from 'react';
import { AdSlot } from '../components/ads/AdSlot';
import { RelatedTools } from '../components/related/RelatedTools';
import { ImageWorkspace } from '../features/images/components/ImageWorkspace';
import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo';

export function ImagesPage() {
  const title = generatePageTitle('Free Image Converter - Convert, Compress & Remove Background');
  const url = generateCanonicalUrl('/images');
  const jsonLd = generateJsonLd({
    name: 'Image Converter',
    url: url,
    description: 'Free online image converter to convert between JPG, PNG, WEBP, SVG, and more. Compress images, remove backgrounds, and convert to vector format. All processing happens in your browser.',
  });

  // FAQPage structured data for SEO
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I convert an image to a different format?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Converting images is simple with our free online image converter. Upload your image file, select the "Convert" operation, choose your target format (JPG, PNG, WEBP, SVG, BMP, or GIF), and click "Process Images". The converted image will be downloaded automatically. You can convert multiple images at once by uploading multiple files - they will all be converted to your selected format.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I compress an image to reduce file size?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To compress an image, select the "Compress" operation, choose your output format (JPG, WebP, or PNG), and adjust the quality slider (10-100%). Lower quality values result in smaller file sizes but may reduce image quality. For web use, we recommend quality settings between 70-85% for a good balance between file size and visual quality. The compressed image will maintain its original dimensions while reducing file size.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the background remover work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our background remover uses advanced algorithms including edge detection and flood fill to automatically identify and remove backgrounds. Select "Remove BG" operation, choose your image, adjust the tolerance level (0-100%) to control color sensitivity, select a sampling method (corners, edges, or smart), and enable edge refinement for better results. The tool works best with images that have solid or uniform backgrounds. The result is a PNG image with a transparent background.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert an image to SVG format?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To convert an image to SVG, select the "To SVG" operation, choose your image file, and click "Process Images". The tool will embed your image in an SVG format, making it scalable without losing quality. SVG format is perfect for web graphics, logos, and print materials that need to scale to different sizes. Note that this creates an SVG wrapper around your image - for true vectorization, use the "To Vector" option.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is vector conversion and how does it work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vector conversion transforms raster images (like JPG or PNG) into vector format (SVG) with color quantization. Select "To Vector" operation, choose your image, adjust the number of colors (2-256) and smoothness level (0-100%), then process. The tool reduces the color palette and creates a vectorized version suitable for scalable graphics. Higher color counts preserve more detail, while lower counts create a more stylized, simplified look. Perfect for creating scalable logos and graphics.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I process multiple images at once?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! For convert and compress operations, you can upload multiple images at once. Simply select multiple files when uploading, and all images will be processed in batch. If you process more than 5 images, they will be automatically bundled into a ZIP file for easy download. For background removal, SVG conversion, and vector conversion, you need to select one image at a time for processing.',
        },
      },
      {
        '@type': 'Question',
        name: 'What image formats are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support all common image formats including JPG/JPEG, PNG, WebP, BMP, GIF, and SVG. You can convert between any of these formats. For input, we accept JPG, PNG, WebP, BMP, and GIF files. SVG files can be converted to other formats, and any format can be converted to SVG or vector format.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my image data private and secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! All image processing happens entirely in your web browser using JavaScript. Your images never leave your device and are never uploaded to our servers. This ensures complete privacy and security. You can process sensitive images, personal photos, or confidential documents without any privacy concerns. We don\'t track, store, or transmit any of your image data.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best format for web use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For web use, WebP format offers the best compression while maintaining quality. However, if you need broader browser compatibility, JPG is recommended for photographs and PNG for images with transparency. Compress images to 70-85% quality for optimal file size. SVG is ideal for logos, icons, and graphics that need to scale without pixelation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I remove background from product photos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For product photos, select "Remove BG" operation, choose your product image, set tolerance to 20-40% (adjust based on background uniformity), use "smart" sampling method, and enable edge refinement. The tool works best when the product has a clear contrast with the background. For best results, use images with solid or uniform backgrounds. After processing, you\'ll get a PNG with transparent background perfect for e-commerce listings.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use the background remover for portraits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our background remover works well for portraits, especially when the background is relatively uniform. Select "Remove BG", choose your portrait, adjust tolerance (typically 25-35%), use "smart" sampling, and enable edge refinement for better hair and fine detail preservation. The tool uses edge detection to preserve fine details like hair strands. For best results, use portraits with clear contrast between subject and background.',
        },
      },
      {
        '@type': 'Question',
        name: 'What\'s the difference between SVG and vector conversion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SVG conversion embeds your raster image in an SVG wrapper, maintaining the original image quality but making it scalable. Vector conversion actually processes the image, reducing colors and creating a simplified vector representation. Use SVG conversion when you want to preserve full image quality in a scalable format. Use vector conversion when you want a stylized, simplified look with reduced colors, perfect for logos and graphics.',
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={title}
        description="Free online image converter to convert between JPG, PNG, WEBP, SVG, and more. Compress images, remove backgrounds automatically, and convert to vector format. Batch process multiple files. All processing happens in your browser with complete privacy."
        canonical={url}
        ogImage="/og-default.png"
        keywords={['image converter', 'JPG to PNG', 'PNG to WEBP', 'image compressor', 'background remover', 'remove background', 'SVG converter', 'vector converter', 'image optimizer', 'free image converter', 'online image converter', 'batch image converter', 'image to SVG', 'image to vector']}
        jsonLd={jsonLd}
      />
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <div className="space-y-10">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-black/30">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-accent">Image Converter</span>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Free Image Converter - Convert, Compress & Remove Background</h1>
          <p className="max-w-3xl text-base text-slate-300">
            Convert images between popular formats like JPG, PNG, WebP, SVG, and more. Compress images to reduce file size. 
            Remove backgrounds automatically with advanced algorithms. Convert to SVG or vector format for scalable graphics. 
            All image processing happens in your browser—completely free and private.
          </p>
        </div>
        <AdSlot
          slotId={import.meta.env.VITE_ADSENSE_SLOT_IMAGES_TOP}
          className="mt-6 min-h-[90px] rounded-2xl bg-slate-950/70 p-4"
          format="auto"
        />
      </header>

      <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-black/30">
        <ImageWorkspace />
      </section>

      <FaqSection />

      <HowToSection />

      <RelatedTools currentPath="/images" />
    </div>
    </>
  );
}

// Collapsible FAQ Component
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I convert an image to a different format?',
      answer: 'Converting images is simple with our free online image converter. Upload your image file, select the "Convert" operation, choose your target format (JPG, PNG, WEBP, SVG, BMP, or GIF), and click "Process Images". The converted image will be downloaded automatically. You can convert multiple images at once by uploading multiple files - they will all be converted to your selected format.',
    },
    {
      question: 'How do I compress an image to reduce file size?',
      answer: 'To compress an image, select the "Compress" operation, choose your output format (JPG, WebP, or PNG), and adjust the quality slider (10-100%). Lower quality values result in smaller file sizes but may reduce image quality. For web use, we recommend quality settings between 70-85% for a good balance between file size and visual quality. The compressed image will maintain its original dimensions while reducing file size.',
    },
    {
      question: 'How does the background remover work?',
      answer: 'Our background remover uses advanced algorithms including edge detection and flood fill to automatically identify and remove backgrounds. Select "Remove BG" operation, choose your image, adjust the tolerance level (0-100%) to control color sensitivity, select a sampling method (corners, edges, or smart), and enable edge refinement for better results. The tool works best with images that have solid or uniform backgrounds. The result is a PNG image with a transparent background.',
    },
    {
      question: 'How do I convert an image to SVG format?',
      answer: 'To convert an image to SVG, select the "To SVG" operation, choose your image file, and click "Process Images". The tool will embed your image in an SVG format, making it scalable without losing quality. SVG format is perfect for web graphics, logos, and print materials that need to scale to different sizes. Note that this creates an SVG wrapper around your image - for true vectorization, use the "To Vector" option.',
    },
    {
      question: 'What is vector conversion and how does it work?',
      answer: 'Vector conversion transforms raster images (like JPG or PNG) into vector format (SVG) with color quantization. Select "To Vector" operation, choose your image, adjust the number of colors (2-256) and smoothness level (0-100%), then process. The tool reduces the color palette and creates a vectorized version suitable for scalable graphics. Higher color counts preserve more detail, while lower counts create a more stylized, simplified look. Perfect for creating scalable logos and graphics.',
    },
    {
      question: 'Can I process multiple images at once?',
      answer: 'Yes! For convert and compress operations, you can upload multiple images at once. Simply select multiple files when uploading, and all images will be processed in batch. If you process more than 5 images, they will be automatically bundled into a ZIP file for easy download. For background removal, SVG conversion, and vector conversion, you need to select one image at a time for processing.',
    },
    {
      question: 'What image formats are supported?',
      answer: 'We support all common image formats including JPG/JPEG, PNG, WebP, BMP, GIF, and SVG. You can convert between any of these formats. For input, we accept JPG, PNG, WebP, BMP, and GIF files. SVG files can be converted to other formats, and any format can be converted to SVG or vector format.',
    },
    {
      question: 'Is my image data private and secure?',
      answer: 'Absolutely! All image processing happens entirely in your web browser using JavaScript. Your images never leave your device and are never uploaded to our servers. This ensures complete privacy and security. You can process sensitive images, personal photos, or confidential documents without any privacy concerns. We don\'t track, store, or transmit any of your image data.',
    },
    {
      question: 'What is the best format for web use?',
      answer: 'For web use, WebP format offers the best compression while maintaining quality. However, if you need broader browser compatibility, JPG is recommended for photographs and PNG for images with transparency. Compress images to 70-85% quality for optimal file size. SVG is ideal for logos, icons, and graphics that need to scale without pixelation.',
    },
    {
      question: 'How do I remove background from product photos?',
      answer: 'For product photos, select "Remove BG" operation, choose your product image, set tolerance to 20-40% (adjust based on background uniformity), use "smart" sampling method, and enable edge refinement. The tool works best when the product has a clear contrast with the background. For best results, use images with solid or uniform backgrounds. After processing, you\'ll get a PNG with transparent background perfect for e-commerce listings.',
    },
    {
      question: 'Can I use the background remover for portraits?',
      answer: 'Yes! Our background remover works well for portraits, especially when the background is relatively uniform. Select "Remove BG", choose your portrait, adjust tolerance (typically 25-35%), use "smart" sampling, and enable edge refinement for better hair and fine detail preservation. The tool uses edge detection to preserve fine details like hair strands. For best results, use portraits with clear contrast between subject and background.',
    },
    {
      question: 'What\'s the difference between SVG and vector conversion?',
      answer: 'SVG conversion embeds your raster image in an SVG wrapper, maintaining the original image quality but making it scalable. Vector conversion actually processes the image, reducing colors and creating a simplified vector representation. Use SVG conversion when you want to preserve full image quality in a scalable format. Use vector conversion when you want a stylized, simplified look with reduced colors, perfect for logos and graphics.',
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
      <h2 className="mb-6 text-2xl font-semibold text-white">How to Use Our Image Converter</h2>
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">1. Convert Images Between Formats</h3>
          <p className="leading-relaxed text-slate-200">
            Start by uploading your image files using the drag-and-drop area or file picker. Select the "Convert" operation from the operation buttons. Choose your target format from the dropdown menu - options include JPG, PNG, WebP, SVG, BMP, and GIF. Click "Process Images" to convert your files. You can upload multiple images at once for batch conversion. The converted images will download automatically, or if you have more than 5 files, they'll be bundled in a ZIP file. This is perfect for preparing images for different platforms or converting legacy formats to modern ones.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">2. Compress Images for Web Optimization</h3>
          <p className="leading-relaxed text-slate-200">
            To reduce image file sizes for faster website loading, select the "Compress" operation. Choose your output format (JPG for photos, WebP for best compression, or PNG for transparency). Adjust the quality slider - we recommend 70-85% for web use, which provides excellent quality with significant file size reduction. Lower values (50-70%) create smaller files but may show compression artifacts. Higher values (85-100%) maintain near-original quality but with less size reduction. The compressed images maintain their original dimensions, so they'll look the same size but load faster on your website.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">3. Remove Backgrounds Like a Pro</h3>
          <p className="leading-relaxed text-slate-200">
            Our advanced background remover uses edge detection and flood fill algorithms for professional results. Select "Remove BG" operation and choose your image from the dropdown (single image processing). Adjust the tolerance slider (0-100%) - lower values (20-30%) work for uniform backgrounds, while higher values (40-60%) handle varied backgrounds. Choose your sampling method: "corners" for simple backgrounds, "edges" for edge-based detection, or "smart" for automatic best results. Enable "Edge Refinement" to preserve fine details like hair strands and product edges. The result is a PNG with transparent background, perfect for e-commerce product photos, portraits, or graphic design projects. Works best with images that have clear contrast between subject and background.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">4. Convert Images to SVG Format</h3>
          <p className="leading-relaxed text-slate-200">
            SVG (Scalable Vector Graphics) format allows images to scale infinitely without losing quality. Select "To SVG" operation, choose your image file, and click "Process Images". The tool embeds your raster image in an SVG wrapper, making it scalable while preserving the original image quality. This is perfect for logos, icons, and graphics that need to work at various sizes - from small favicons to large banners. SVG files are also text-based, making them easy to edit and optimize. Use this when you need a scalable version of your image without changing its appearance.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">5. Create Vectorized Graphics</h3>
          <p className="leading-relaxed text-slate-200">
            Vector conversion creates a stylized, simplified version of your image with reduced colors. Select "To Vector" operation, choose your image, and adjust the settings. Set the number of colors (2-256) - lower values (8-32) create a more stylized, posterized look perfect for logos and graphics, while higher values (64-256) preserve more detail. Adjust smoothness (0-100%) to control how much the algorithm smooths edges and simplifies shapes. Higher smoothness creates cleaner, more simplified vectors, while lower values preserve more detail. The result is a true vector SVG file that can be edited in design software like Adobe Illustrator. Perfect for creating scalable logos, icons, and stylized graphics from photographs.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">6. Batch Process Multiple Images</h3>
          <p className="leading-relaxed text-slate-200">
            For convert and compress operations, you can process multiple images simultaneously. Simply select multiple files when uploading (hold Ctrl/Cmd while clicking, or drag multiple files). All uploaded images will be processed in batch with the same settings. If you process more than 5 images, they'll be automatically bundled into a ZIP file for convenient download. This is perfect for bulk operations like converting an entire photo album, optimizing a website's image assets, or preparing product images for an e-commerce store. The batch processing maintains the original file names with appropriate extensions for the output format.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">7. Optimize Images for Different Use Cases</h3>
          <p className="leading-relaxed text-slate-200">
            Different use cases require different image formats and settings. For web use, convert to WebP or JPG and compress to 70-80% quality. For print, use PNG or TIFF with minimal compression. For logos and icons, convert to SVG or vector format for scalability. For e-commerce product photos, remove backgrounds and save as PNG with transparency. For social media, compress to 80-85% quality to balance file size and visual quality. For email signatures, use PNG with transparency or compressed JPG. Our tool handles all these scenarios - just select the appropriate operation and adjust settings based on your needs. All processing happens in your browser, ensuring your images remain private and secure.
          </p>
        </div>
      </div>
    </section>
  );
}

