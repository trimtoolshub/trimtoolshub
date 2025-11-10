import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo.tsx';

export function PrivacyPage() {
  const title = generatePageTitle('Privacy Policy');
  const url = generateCanonicalUrl('/privacy');
  const jsonLd = generateJsonLd({
    name: 'Privacy Policy',
    url: url,
    description: 'Privacy Policy for TrimToolsHub - Learn how we protect your privacy and handle your data.',
  });

  return (
    <>
      <SEOHead
        title={title}
        description="Privacy Policy for TrimToolsHub. Learn how we protect your privacy, handle your data, and respect your consent preferences."
        canonical={url}
        ogImage="/og-default.png"
        keywords={['privacy policy', 'data protection', 'privacy', 'GDPR', 'user privacy']}
        jsonLd={jsonLd}
      />
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10">
          <h1 className="text-4xl font-semibold text-white">Privacy Policy</h1>
          <p className="mt-4 text-slate-300">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </header>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
          <p className="text-slate-300">
            TrimToolsHub ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our free online tools.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">2. Privacy-First Design</h2>
          <p className="text-slate-300">
            All our tools are designed with privacy as a core principle. Your files are processed entirely in your browser—they never leave your device or are uploaded to our servers. This means:
          </p>
          <ul className="ml-6 mt-4 list-disc space-y-2 text-slate-300">
            <li>No file uploads to our servers</li>
            <li>No storage of your files or data</li>
            <li>Complete processing in your browser</li>
            <li>No access to your files by us or third parties</li>
          </ul>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">3. Information We Collect</h2>
          <h3 className="text-xl font-semibold text-white">3.1 Usage Analytics (With Consent)</h3>
          <p className="text-slate-300">
            We use Google Analytics 4 and Meta Pixel to understand how visitors use our website. This information is only collected if you explicitly consent. We collect:
          </p>
          <ul className="ml-6 mt-4 list-disc space-y-2 text-slate-300">
            <li>Page views and navigation patterns</li>
            <li>Device and browser information</li>
            <li>General location (country/region level)</li>
            <li>Referral sources</li>
          </ul>
          <p className="mt-4 text-slate-300">
            You can decline analytics tracking at any time. We use Consent Mode v2 to ensure analytics only run with your explicit consent.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-white">3.2 Advertisements (With Consent)</h3>
          <p className="text-slate-300">
            We use Google AdSense to display advertisements. Advertisements are only shown if you consent to advertising cookies. We do not share your personal information with advertisers.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">4. Cookies and Local Storage</h2>
          <p className="text-slate-300">
            We use cookies and local storage only to:
          </p>
          <ul className="ml-6 mt-4 list-disc space-y-2 text-slate-300">
            <li>Remember your consent preferences</li>
            <li>Store analytics consent status</li>
            <li>Enable advertising (only with consent)</li>
          </ul>
          <p className="mt-4 text-slate-300">
            You can change your consent preferences at any time. Your preferences are stored locally in your browser.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">5. Third-Party Services</h2>
          <p className="text-slate-300">
            We use the following third-party services, all of which respect your privacy:
          </p>
          <ul className="ml-6 mt-4 list-disc space-y-2 text-slate-300">
            <li><strong>Google Analytics 4:</strong> Website analytics (only with consent)</li>
            <li><strong>Meta Pixel:</strong> Analytics and advertising (only with consent)</li>
            <li><strong>Google AdSense:</strong> Advertisement display (only with consent)</li>
          </ul>
          <p className="mt-4 text-slate-300">
            All third-party services are configured to respect your consent preferences and comply with GDPR and other privacy regulations.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">6. Your Rights</h2>
          <p className="text-slate-300">
            You have the following rights regarding your data:
          </p>
          <ul className="ml-6 mt-4 list-disc space-y-2 text-slate-300">
            <li><strong>Right to Access:</strong> You can request information about what data we collect</li>
            <li><strong>Right to Withdraw Consent:</strong> You can change or withdraw your consent at any time</li>
            <li><strong>Right to Deletion:</strong> You can clear your consent preferences from your browser</li>
            <li><strong>Right to Object:</strong> You can opt-out of analytics and advertising</li>
          </ul>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">7. Data Security</h2>
          <p className="text-slate-300">
            Since all file processing happens in your browser, your files never leave your device. We do not store, transmit, or have access to your files. This provides the highest level of security and privacy.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">8. Children's Privacy</h2>
          <p className="text-slate-300">
            Our services are not directed to children under 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">9. Changes to This Policy</h2>
          <p className="text-slate-300">
            We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this page. Your continued use of our services after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">10. Contact Us</h2>
          <p className="text-slate-300">
            If you have questions about this Privacy Policy, please review our Terms of Service or contact us through our website.
          </p>
        </section>
      </div>
    </>
  );
}

