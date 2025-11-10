import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo.tsx';

export function TermsPage() {
  const title = generatePageTitle('Terms of Service');
  const url = generateCanonicalUrl('/terms');
  const jsonLd = generateJsonLd({
    name: 'Terms of Service',
    url: url,
    description: 'Terms of Service for TrimToolsHub - Read our terms and conditions for using our free online tools.',
  });

  return (
    <>
      <SEOHead
        title={title}
        description="Terms of Service for TrimToolsHub. Read our terms and conditions for using our free online tools and services."
        canonical={url}
        ogImage="/og-default.png"
        keywords={['terms of service', 'terms and conditions', 'user agreement', 'legal terms']}
        jsonLd={jsonLd}
      />
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10">
          <h1 className="text-4xl font-semibold text-white">Terms of Service</h1>
          <p className="mt-4 text-slate-300">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </header>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
          <p className="text-slate-300">
            By accessing and using TrimToolsHub ("the Service", "we", "our", or "us"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">2. Description of Service</h2>
          <p className="text-slate-300">
            TrimToolsHub provides free online tools for PDF editing, QR code generation, image conversion, and CAD file viewing. All tools operate entirely in your browser—no files are uploaded to our servers.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">3. Use of Service</h2>
          <h3 className="text-xl font-semibold text-white">3.1 Permitted Use</h3>
          <p className="text-slate-300">
            You may use our services for lawful purposes only. You agree to:
          </p>
          <ul className="ml-6 mt-4 list-disc space-y-2 text-slate-300">
            <li>Use the services in compliance with all applicable laws and regulations</li>
            <li>Respect intellectual property rights</li>
            <li>Not use the services for any illegal or unauthorized purpose</li>
            <li>Not attempt to interfere with or disrupt the services</li>
          </ul>

          <h3 className="mt-6 text-xl font-semibold text-white">3.2 Prohibited Use</h3>
          <p className="text-slate-300">
            You agree not to:
          </p>
          <ul className="ml-6 mt-4 list-disc space-y-2 text-slate-300">
            <li>Use the services to process illegal or harmful content</li>
            <li>Attempt to reverse engineer or extract our source code</li>
            <li>Use automated systems to access the services without permission</li>
            <li>Violate any applicable laws or regulations</li>
          </ul>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">4. Privacy and Data Processing</h2>
          <p className="text-slate-300">
            All file processing happens in your browser. We do not store, transmit, or have access to your files. However, we may collect usage analytics and display advertisements with your consent. Please review our Privacy Policy for more information.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">5. Intellectual Property</h2>
          <p className="text-slate-300">
            The Service, including its original content, features, and functionality, is owned by TrimToolsHub and protected by international copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute any part of the Service without our written permission.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">6. Disclaimer of Warranties</h2>
          <p className="text-slate-300">
            The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that:
          </p>
          <ul className="ml-6 mt-4 list-disc space-y-2 text-slate-300">
            <li>The Service will be uninterrupted or error-free</li>
            <li>The Service will meet your specific requirements</li>
            <li>The results obtained from using the Service will be accurate or reliable</li>
            <li>Any errors in the Service will be corrected</li>
          </ul>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">7. Limitation of Liability</h2>
          <p className="text-slate-300">
            To the fullest extent permitted by law, TrimToolsHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Service.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">8. Indemnification</h2>
          <p className="text-slate-300">
            You agree to indemnify and hold harmless TrimToolsHub, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of or relating to your use of the Service or violation of these Terms.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">9. Modifications to Service</h2>
          <p className="text-slate-300">
            We reserve the right to modify, suspend, or discontinue the Service, or any part thereof, at any time with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">10. Changes to Terms</h2>
          <p className="text-slate-300">
            We reserve the right to modify these Terms of Service at any time. We will notify you of any changes by updating the "Last updated" date at the top of this page. Your continued use of the Service after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">11. Governing Law</h2>
          <p className="text-slate-300">
            These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions. Any disputes arising from these terms shall be resolved in the appropriate courts.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">12. Severability</h2>
          <p className="text-slate-300">
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-2xl font-semibold text-white">13. Entire Agreement</h2>
          <p className="text-slate-300">
            These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and TrimToolsHub regarding the use of the Service and supersede all prior agreements and understandings.
          </p>
        </section>
      </div>
    </>
  );
}

