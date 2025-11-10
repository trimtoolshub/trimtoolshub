import { useState } from 'react';
import { AdSlot } from '../components/ads/AdSlot';
import { QrWorkspace } from '../features/qr/components/QrWorkspace';
import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo.tsx';

const qrHighlights = [
  {
    title: 'Custom QR Codes with Logo',
    description: 'Create branded QR codes with your logo, custom colors, and gradients. Adjust error correction levels and ensure accessible contrast for better scanning.',
  },
  {
    title: 'vCard QR Code Generator',
    description: 'Generate vCard QR codes for easy contact sharing. Add name, phone, email, website, and more. Perfect for business cards and networking events.',
  },
  {
    title: 'Batch QR Code Generation',
    description: 'Upload a CSV file to generate multiple QR codes at once. Perfect for events, marketing campaigns, and product labeling. Export as PNG, SVG, or PDF.',
  },
];

export function QrPage() {
  const title = generatePageTitle('Free QR Code Generator - Create Custom QR Codes');
  const url = generateCanonicalUrl('/qr');
  const jsonLd = generateJsonLd({
    name: 'QR Code Generator',
    url: url,
    description: 'Free online QR code generator to create custom QR codes with your logo, colors, and branding. Generate vCard QR codes for contact sharing. Batch generate QR codes from CSV files.',
  });

  // FAQPage structured data for SEO
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I create a QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Creating a QR code is simple with our free online QR code generator. First, select the type of QR code you want to create (text, URL, vCard, Wi-Fi, or geo location). Enter your content in the input field, customize the appearance with colors and optional logo, then click "Generate QR Code". Your QR code will appear instantly, and you can download it as PNG or SVG format.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I generate a QR code with my logo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To add your logo to a QR code, first generate your QR code with the desired content. Then, in the options section, click "Choose File" under the Logo option and upload your logo image (PNG or JPG format recommended). The logo will be automatically centered in the QR code. Make sure your logo is clear and doesn\'t cover too much of the QR code pattern to ensure it remains scannable.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I create a vCard QR code for business cards?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select "vCard" as your QR code type. Fill in your contact information including first name, last name, organization, title, phone number, email address, website URL, and address details. Once you generate the QR code, anyone who scans it with their smartphone will be able to save your contact information directly to their phone\'s address book. This is perfect for business cards, networking events, and marketing materials.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I create a Wi-Fi QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Choose "Wi-Fi" as your QR code type. Enter your network name (SSID), password, and select the security type (WPA/WPA2, WEP, or No Password). Optionally, check "Hidden Network" if your Wi-Fi network is not visible. When guests scan this QR code with their phone, they\'ll automatically connect to your Wi-Fi network without manually entering the password.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I generate multiple QR codes at once?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use our batch QR code generation feature. Enable "Batch Mode (CSV)" and upload a CSV file containing your data. For text or URL QR codes, include a "content" column. For vCard QR codes, include columns like "First Name", "Last Name", "Email", "Phone", etc. The system will generate all QR codes automatically and provide them as a ZIP file download if you have more than 5 codes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is error correction level in QR codes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Error correction level determines how much of the QR code can be damaged or obscured while still remaining scannable. We offer four levels: L (Low ~7%), M (Medium ~15%), Q (Quartile ~25%), and H (High ~30%). Higher error correction levels create denser QR codes but allow for more damage. Use higher levels (Q or H) when adding logos or when the QR code might be printed on materials that could get damaged.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I customize QR code colors?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our QR code generator allows full color customization. You can choose any foreground color (the dark squares) and background color (the light areas). However, ensure there\'s sufficient contrast between the foreground and background colors for the QR code to be scannable. Black on white is the most reliable, but you can use brand colors as long as the contrast is high enough.',
        },
      },
      {
        '@type': 'Question',
        name: 'What file formats can I download QR codes in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can download your QR codes in two formats: PNG (raster image) and SVG (vector image). PNG format is perfect for digital use, websites, and social media. SVG format is ideal for print materials as it scales without losing quality. Both formats maintain the quality of your QR code and can be used in any design software or printed materials.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I scan a QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most modern smartphones have built-in QR code scanners. On iPhone, open the Camera app and point it at the QR code. On Android, use the Camera app or Google Lens. The phone will automatically detect and process the QR code, opening the URL, saving contact information, connecting to Wi-Fi, or performing the action encoded in the QR code.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my data private when generating QR codes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All QR code generation happens entirely in your web browser. Your data never leaves your device and is never uploaded to our servers. This ensures complete privacy and security. The QR code is generated locally using JavaScript, so you can use our tool for sensitive information like Wi-Fi passwords or personal contact details without any privacy concerns.',
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={title}
        description="Free online QR code generator to create custom QR codes with your logo, colors, and branding. Generate vCard QR codes for contact sharing. Batch generate QR codes from CSV files. Download as PNG, SVG, or PDF."
        canonical={url}
        ogImage="/og-default.png"
        keywords={['QR code generator', 'QR code creator', 'custom QR code', 'vCard QR code', 'QR code with logo', 'batch QR code', 'free QR code generator', 'online QR code', 'how to create QR code', 'QR code maker', 'QR code scanner', 'business card QR code', 'WiFi QR code']}
        jsonLd={jsonLd}
      />
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <div className="space-y-12">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-black/30">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-accent">QR Code Generator</span>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Free QR Code Generator - Create Custom QR Codes</h1>
          <p className="max-w-3xl text-base text-slate-300">
            Create custom QR codes with your logo, colors, and branding. Generate vCard QR codes for contact sharing. 
            Batch generate QR codes from CSV files for events and marketing campaigns. Download as PNG, SVG, or PDF. 
            All QR code generation happens in your browser—completely free and private.
          </p>
        </div>
        <AdSlot
          slotId={import.meta.env.VITE_ADSENSE_SLOT_QR_TOP}
          className="mt-6 min-h-[90px] rounded-2xl bg-slate-950/70 p-4"
          format="auto"
        />
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {qrHighlights.map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-black/30">
        <QrWorkspace />
      </section>

      <FaqSection />

      <HowToSection />
    </div>
    </>
  );
}

// Collapsible FAQ Component
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I create a QR code?',
      answer: 'Creating a QR code is simple with our free online QR code generator. First, select the type of QR code you want to create (text, URL, vCard, Wi-Fi, or geo location). Enter your content in the input field, customize the appearance with colors and optional logo, then click "Generate QR Code". Your QR code will appear instantly, and you can download it as PNG or SVG format.',
    },
    {
      question: 'How do I generate a QR code with my logo?',
      answer: 'To add your logo to a QR code, first generate your QR code with the desired content. Then, in the options section, click "Choose File" under the Logo option and upload your logo image (PNG or JPG format recommended). The logo will be automatically centered in the QR code. Make sure your logo is clear and doesn\'t cover too much of the QR code pattern to ensure it remains scannable. We recommend using error correction level Q or H when adding logos.',
    },
    {
      question: 'How do I create a vCard QR code for business cards?',
      answer: 'Select "vCard" as your QR code type. Fill in your contact information including first name, last name, organization, title, phone number, email address, website URL, and address details. Once you generate the QR code, anyone who scans it with their smartphone will be able to save your contact information directly to their phone\'s address book. This is perfect for business cards, networking events, and marketing materials. The vCard format follows the vCard 3.0 standard, ensuring compatibility with all modern smartphones.',
    },
    {
      question: 'How do I create a Wi-Fi QR code?',
      answer: 'Choose "Wi-Fi" as your QR code type. Enter your network name (SSID), password, and select the security type (WPA/WPA2, WEP, or No Password). Optionally, check "Hidden Network" if your Wi-Fi network is not visible. When guests scan this QR code with their phone, they\'ll automatically connect to your Wi-Fi network without manually entering the password. This is especially useful for cafes, hotels, offices, and events where you want to provide easy Wi-Fi access.',
    },
    {
      question: 'How do I generate multiple QR codes at once?',
      answer: 'Use our batch QR code generation feature. Enable "Batch Mode (CSV)" and upload a CSV file containing your data. For text or URL QR codes, include a "content" column. For vCard QR codes, include columns like "First Name", "Last Name", "Email", "Phone", etc. The system will generate all QR codes automatically and provide them as a ZIP file download if you have more than 5 codes. This feature is perfect for creating QR codes for multiple products, employees, or marketing campaigns at once.',
    },
    {
      question: 'What is error correction level in QR codes?',
      answer: 'Error correction level determines how much of the QR code can be damaged or obscured while still remaining scannable. We offer four levels: L (Low ~7%), M (Medium ~15%), Q (Quartile ~25%), and H (High ~30%). Higher error correction levels create denser QR codes but allow for more damage. Use higher levels (Q or H) when adding logos or when the QR code might be printed on materials that could get damaged. For standard use without logos, M level is usually sufficient.',
    },
    {
      question: 'Can I customize QR code colors?',
      answer: 'Yes! Our QR code generator allows full color customization. You can choose any foreground color (the dark squares) and background color (the light areas). However, ensure there\'s sufficient contrast between the foreground and background colors for the QR code to be scannable. Black on white is the most reliable, but you can use brand colors as long as the contrast is high enough. We recommend testing your colored QR code after generation to ensure it scans properly.',
    },
    {
      question: 'What file formats can I download QR codes in?',
      answer: 'You can download your QR codes in two formats: PNG (raster image) and SVG (vector image). PNG format is perfect for digital use, websites, and social media. SVG format is ideal for print materials as it scales without losing quality. Both formats maintain the quality of your QR code and can be used in any design software or printed materials. SVG is recommended for professional printing, while PNG is better for quick digital sharing.',
    },
    {
      question: 'How do I scan a QR code?',
      answer: 'Most modern smartphones have built-in QR code scanners. On iPhone (iOS 11+), open the Camera app and point it at the QR code - no additional app needed. On Android, use the Camera app or Google Lens. The phone will automatically detect and process the QR code, opening the URL, saving contact information, connecting to Wi-Fi, or performing the action encoded in the QR code. Make sure your phone\'s camera has permission to access QR codes in your device settings.',
    },
    {
      question: 'Is my data private when generating QR codes?',
      answer: 'Yes! All QR code generation happens entirely in your web browser. Your data never leaves your device and is never uploaded to our servers. This ensures complete privacy and security. The QR code is generated locally using JavaScript, so you can use our tool for sensitive information like Wi-Fi passwords or personal contact details without any privacy concerns. We don\'t track, store, or transmit any of your data.',
    },
    {
      question: 'Can I use QR codes for marketing campaigns?',
      answer: 'Absolutely! QR codes are excellent for marketing campaigns. You can create QR codes that link to your website, landing pages, social media profiles, special offers, or product information. Use our batch generation feature to create multiple QR codes for different products or campaigns. Add your logo and brand colors to make them more recognizable and professional. QR codes can be printed on flyers, posters, product packaging, business cards, and even displayed on digital screens.',
    },
    {
      question: 'What size should my QR code be for printing?',
      answer: 'For printing, we recommend generating QR codes at least 300x300 pixels or larger. The minimum size depends on the scanning distance - larger QR codes can be scanned from farther away. For business cards, 1 inch (25mm) is usually sufficient. For posters or billboards, use larger sizes. Download as SVG for best print quality as it scales without pixelation. As a general rule, the QR code should be at least 10% of the total print size, and maintain a 4:1 ratio (4 units of quiet zone for every 1 unit of QR code).',
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
      <h2 className="mb-6 text-2xl font-semibold text-white">How to Use Our QR Code Generator</h2>
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">1. Create Custom QR Codes</h3>
          <p className="leading-relaxed text-slate-200">
            Start by selecting the type of QR code you want to create from the five available options: Text, URL, vCard, Wi-Fi, or Geo Location. Enter your content in the corresponding input field. For text QR codes, you can enter any plain text up to several hundred characters. For URL QR codes, make sure to include the full URL with "https://" or "http://" prefix. Once you've entered your content, you can customize the appearance by adjusting the size (100-1000 pixels), margin (0-10), error correction level, and colors. Click "Generate QR Code" to create your QR code instantly.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">2. Generate vCard QR Codes for Business Cards</h3>
          <p className="leading-relaxed text-slate-200">
            Select "vCard" as your QR code type to create a contact card QR code. Fill in all relevant contact information including first name, last name, organization, job title, phone number, email address, website URL, and complete address details (street, city, state, ZIP, and country). When someone scans this QR code with their smartphone, they'll be prompted to save your contact information directly to their phone's address book. This eliminates the need for manual data entry and ensures accuracy. Perfect for business cards, networking events, trade shows, and marketing materials.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">3. Add Your Logo to QR Codes</h3>
          <p className="leading-relaxed text-slate-200">
            After generating your QR code, you can add your logo to make it more branded and professional. In the options section, click "Choose File" under the Logo option and upload your logo image (PNG or JPG format recommended, ideally with transparent background). The logo will be automatically centered in the QR code. To ensure your QR code remains scannable, we recommend using error correction level Q (Quartile) or H (High) when adding logos. Keep your logo size reasonable - it should cover no more than 30% of the QR code area. Test your QR code after adding the logo to ensure it scans properly.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">4. Batch Generate QR Codes from CSV</h3>
          <p className="leading-relaxed text-slate-200">
            For creating multiple QR codes at once, enable "Batch Mode (CSV)" and upload a CSV file containing your data. For text or URL QR codes, your CSV should include a "content" column with the text or URLs. For vCard QR codes, include columns like "First Name", "Last Name", "Email", "Phone", "Organization", "Title", "URL", "Street", "City", "State", "ZIP", and "Country". The system will automatically generate all QR codes and provide them as individual downloads if you have 5 or fewer codes, or as a ZIP file if you have more than 5 codes. This feature is perfect for creating QR codes for multiple products, employees, events, or marketing campaigns efficiently.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">5. Download in Multiple Formats</h3>
          <p className="leading-relaxed text-slate-200">
            After generating your QR code, you can download it in two formats: PNG (raster image) and SVG (vector image). PNG format is perfect for digital use, websites, social media posts, and email signatures. SVG format is ideal for print materials, business cards, posters, and professional documents as it scales infinitely without losing quality. Both formats maintain the full quality of your QR code and can be used in any design software like Adobe Illustrator, Photoshop, Canva, or printed materials. Choose PNG for quick digital sharing or SVG for professional printing and scalable designs.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">6. Customize Colors and Appearance</h3>
          <p className="leading-relaxed text-slate-200">
            Our QR code generator offers full color customization to match your brand. You can choose any foreground color (the dark squares that form the QR code pattern) and background color (the light areas). Use the color pickers to select your brand colors. However, it's crucial to ensure there's sufficient contrast between the foreground and background colors for the QR code to be scannable. Black on white provides the highest contrast and is the most reliable. If using brand colors, test your QR code after generation to ensure it scans properly. You can also adjust the size (100-1000 pixels) and margin (0-10) to fit your design needs.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">7. Create Wi-Fi QR Codes for Easy Access</h3>
          <p className="leading-relaxed text-slate-200">
            Select "Wi-Fi" as your QR code type to create a QR code that automatically connects devices to your Wi-Fi network. Enter your network name (SSID), password, and select the security type (WPA/WPA2 for modern routers, WEP for older routers, or No Password for open networks). If your Wi-Fi network is hidden (not broadcasting its name), check the "Hidden Network" option. When guests scan this QR code with their phone, they'll automatically connect to your Wi-Fi network without manually entering the password. This is especially useful for cafes, hotels, offices, events, and home use. Print the QR code and place it in a visible location for easy access.
          </p>
        </div>
      </div>
    </section>
  );
}

