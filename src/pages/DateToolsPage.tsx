import { useState } from 'react';
import { AdSlot } from '../components/ads/AdSlot';
import { RelatedTools } from '../components/related/RelatedTools';
import { DateWorkspace } from '../features/dates/components/DateWorkspace';
import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo';

export function DateToolsPage() {
  const title = 'Free Date & Time Tools - Calculator, Formatter & Converter';
  const url = generateCanonicalUrl('/dates');
  const jsonLd = generateJsonLd({
    name: 'Date & Time Tools',
    url: url,
    description: 'Free online date and time tools. Calculate date differences, format dates, convert Unix timestamps, convert timezones, calculate age, and create countdown timers.',
  });

  // FAQPage structured data for SEO
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I calculate the difference between two dates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select the "Calculator" operation, enter your start date and end date using the date pickers, then click "Calculate Difference". The tool will show you the difference in days, hours, minutes, and seconds, as well as total days, hours, minutes, and seconds. You can click "Now" buttons to quickly set the current date and time.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I format a date in different formats?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select the "Formatter" operation, enter your date using the date picker, choose a format from the dropdown (ISO 8601, US Date, European Date, Long Date, etc.), then click "Format Date". The formatted date will be displayed below. You can also select "Unix Timestamp" format to convert to timestamp.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert a Unix timestamp to a date?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select the "Timestamp" operation, enter your Unix timestamp in the "Timestamp to Date" section, check or uncheck "Milliseconds" depending on whether your timestamp is in milliseconds or seconds, then click "Convert to Date". The date will be displayed in ISO format. You can also convert dates to timestamps using the "Date to Timestamp" section.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert dates between timezones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select the "Timezone" operation, enter your date and time, select the source timezone (From Timezone) and target timezone (To Timezone) from the dropdowns, then click "Convert Timezone". The converted date and time will be displayed. Common timezones like UTC, Local, EST, PST, GMT, and more are available.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate someone\'s age?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select the "Age" operation, enter the birth date using the date picker, then click "Calculate Age". The tool will show the age in years, months, days, and total days. The calculation is based on the current date and time.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I create a countdown timer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select the "Countdown" operation, enter your target date and time using the date picker, then click "Start Countdown". The countdown will update every second, showing days, hours, minutes, and seconds remaining. Click "Stop Countdown" to pause the timer. The countdown automatically stops when the target time is reached.',
        },
      },
      {
        '@type': 'Question',
        name: 'What date formats are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support many common date formats including ISO 8601, US Date (MM/DD/YYYY), European Date (DD/MM/YYYY), Long Date (Month DD, YYYY), Short Date (Mon DD, YYYY), Date & Time, Time Only, 12 Hour format, Unix Timestamp, and RFC 2822 format. You can also create custom formats using format codes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What timezones are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support common timezones including UTC, Local time, America/New_York (EST), America/Chicago (CST), America/Denver (MST), America/Los_Angeles (PST), Europe/London (GMT), Europe/Paris (CET), Asia/Tokyo (JST), Asia/Shanghai (CST), Asia/Dubai (GST), and Australia/Sydney (AEDT).',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my date data private and secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! All date calculations and conversions happen entirely in your web browser. Your dates and times never leave your device and are never uploaded to our servers. This ensures complete privacy and security. You can calculate dates, convert timezones, and create countdowns without any privacy concerns.',
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={title}
        description="Free online date and time tools. Calculate date differences, format dates in various formats, convert Unix timestamps, convert between timezones, calculate age, and create countdown timers. All processing happens in your browser."
        canonical={url}
        ogImage="/og-default.png"
        keywords={['date calculator', 'date formatter', 'unix timestamp converter', 'timezone converter', 'age calculator', 'countdown timer', 'date difference', 'free date tools', 'online date calculator', 'timestamp converter']}
        jsonLd={jsonLd}
      />
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <div className="space-y-10">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-black/30">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-accent">Date & Time Tools</span>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Free Date & Time Tools - Calculator, Formatter & Converter</h1>
          <p className="max-w-3xl text-base text-slate-300">
            Calculate date differences, format dates in various formats, convert Unix timestamps, convert between timezones, 
            calculate age, and create countdown timers. All date and time processing happens in your browser—completely free and private.
          </p>
        </div>
        <AdSlot
          slotId={import.meta.env.VITE_ADSENSE_SLOT_DATES_TOP}
          className="mt-6 min-h-[90px] rounded-2xl bg-slate-950/70 p-4"
          format="auto"
        />
      </header>

      <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-black/30">
        <DateWorkspace />
      </section>

      <FaqSection />

      <HowToSection />

      <RelatedTools currentPath="/dates" />
    </div>
    </>
  );
}

// Collapsible FAQ Component
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I calculate the difference between two dates?',
      answer: 'Select the "Calculator" operation, enter your start date and end date using the date pickers, then click "Calculate Difference". The tool will show you the difference in days, hours, minutes, and seconds, as well as total days, hours, minutes, and seconds. You can click "Now" buttons to quickly set the current date and time.',
    },
    {
      question: 'How do I format a date in different formats?',
      answer: 'Select the "Formatter" operation, enter your date using the date picker, choose a format from the dropdown (ISO 8601, US Date, European Date, Long Date, etc.), then click "Format Date". The formatted date will be displayed below. You can also select "Unix Timestamp" format to convert to timestamp.',
    },
    {
      question: 'How do I convert a Unix timestamp to a date?',
      answer: 'Select the "Timestamp" operation, enter your Unix timestamp in the "Timestamp to Date" section, check or uncheck "Milliseconds" depending on whether your timestamp is in milliseconds or seconds, then click "Convert to Date". The date will be displayed in ISO format. You can also convert dates to timestamps using the "Date to Timestamp" section.',
    },
    {
      question: 'How do I convert dates between timezones?',
      answer: 'Select the "Timezone" operation, enter your date and time, select the source timezone (From Timezone) and target timezone (To Timezone) from the dropdowns, then click "Convert Timezone". The converted date and time will be displayed. Common timezones like UTC, Local, EST, PST, GMT, and more are available.',
    },
    {
      question: 'How do I calculate someone\'s age?',
      answer: 'Select the "Age" operation, enter the birth date using the date picker, then click "Calculate Age". The tool will show the age in years, months, days, and total days. The calculation is based on the current date and time.',
    },
    {
      question: 'How do I create a countdown timer?',
      answer: 'Select the "Countdown" operation, enter your target date and time using the date picker, then click "Start Countdown". The countdown will update every second, showing days, hours, minutes, and seconds remaining. Click "Stop Countdown" to pause the timer. The countdown automatically stops when the target time is reached.',
    },
    {
      question: 'What date formats are supported?',
      answer: 'We support many common date formats including ISO 8601, US Date (MM/DD/YYYY), European Date (DD/MM/YYYY), Long Date (Month DD, YYYY), Short Date (Mon DD, YYYY), Date & Time, Time Only, 12 Hour format, Unix Timestamp, and RFC 2822 format. You can also create custom formats using format codes.',
    },
    {
      question: 'What timezones are supported?',
      answer: 'We support common timezones including UTC, Local time, America/New_York (EST), America/Chicago (CST), America/Denver (MST), America/Los_Angeles (PST), Europe/London (GMT), Europe/Paris (CET), Asia/Tokyo (JST), Asia/Shanghai (CST), Asia/Dubai (GST), and Australia/Sydney (AEDT).',
    },
    {
      question: 'Is my date data private and secure?',
      answer: 'Absolutely! All date calculations and conversions happen entirely in your web browser. Your dates and times never leave your device and are never uploaded to our servers. This ensures complete privacy and security. You can calculate dates, convert timezones, and create countdowns without any privacy concerns.',
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
      <h2 className="mb-6 text-2xl font-semibold text-white">How to Use Our Date & Time Tools</h2>
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">1. Calculate Date Differences</h3>
          <p className="leading-relaxed text-slate-200">
            Select the "Calculator" operation to calculate the difference between two dates. Enter your start date and end date using the date pickers, or click "Now" to quickly set the current date and time. Click "Calculate Difference" to see the result. The tool displays the difference in days, hours, minutes, and seconds, as well as total days, hours, minutes, and seconds. This is perfect for calculating project durations, event timelines, or time between events.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">2. Format Dates in Various Formats</h3>
          <p className="leading-relaxed text-slate-200">
            Select the "Formatter" operation to format dates in different formats. Enter your date using the date picker or click "Now" to use the current date. Choose a format from the dropdown menu - options include ISO 8601, US Date, European Date, Long Date, Short Date, Date & Time, Time Only, 12 Hour format, Unix Timestamp, and RFC 2822. Click "Format Date" to see the formatted result. This is useful for converting dates to different formats for different applications or regions.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">3. Convert Unix Timestamps</h3>
          <p className="leading-relaxed text-slate-200">
            Select the "Timestamp" operation to convert between Unix timestamps and dates. In the "Timestamp to Date" section, enter your Unix timestamp and check or uncheck "Milliseconds" depending on whether your timestamp is in milliseconds (13 digits) or seconds (10 digits). Click "Convert to Date" to see the human-readable date. In the "Date to Timestamp" section, enter a date and choose whether to output as milliseconds or seconds, then click "Convert to Timestamp". This is essential for developers working with APIs, databases, or Unix-based systems.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">4. Convert Between Timezones</h3>
          <p className="leading-relaxed text-slate-200">
            Select the "Timezone" operation to convert dates and times between different timezones. Enter your date and time using the date picker, select the source timezone (From Timezone) and target timezone (To Timezone) from the dropdown menus. Available timezones include UTC, Local time, EST, CST, MST, PST, GMT, CET, JST, and more. Click "Convert Timezone" to see the converted date and time. This is perfect for scheduling meetings across timezones, converting event times, or working with international dates.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">5. Calculate Age</h3>
          <p className="leading-relaxed text-slate-200">
            Select the "Age" operation to calculate someone\'s age. Enter the birth date using the date picker, or click "Today" to use the current date. Click "Calculate Age" to see the result. The tool displays the age in years, months, days, and total days. The calculation is based on the current date and time, so it will always show the current age. This is useful for age verification, birthday calculations, or demographic analysis.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">6. Create Countdown Timers</h3>
          <p className="leading-relaxed text-slate-200">
            Select the "Countdown" operation to create a live countdown timer. Enter your target date and time using the date picker, then click "Start Countdown". The countdown will update every second, showing days, hours, minutes, and seconds remaining until the target time. Click "Stop Countdown" to pause the timer at any time. The countdown automatically stops when the target time is reached. This is perfect for tracking deadlines, event countdowns, or time-sensitive tasks.
          </p>
        </div>
      </div>
    </section>
  );
}

