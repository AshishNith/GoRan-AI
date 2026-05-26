import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white relative overflow-hidden pt-36 pb-24">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(229, 231, 235, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 231, 235, 0.25) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-[5%] left-[-8%] w-[400px] h-[400px] rounded-full bg-brand-yellow/5 blur-[90px] pointer-events-none" />

      <div className="w-full max-w-[800px] mx-auto px-6 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 no-underline text-brand-text-muted text-sm font-medium mb-10 group transition-colors hover:text-brand-dark"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="inline-flex items-center gap-2 mb-5">
          <span className="w-2 h-2 rounded-full bg-brand-yellow" />
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Legal</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark leading-[1.05] tracking-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-brand-text-muted text-sm mb-12">
          Last updated: May 24, 2026
        </p>

        <div className="flex flex-col gap-8 text-[0.95rem] leading-relaxed text-brand-text-main">
          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">1. Introduction</h2>
            <p className="text-brand-text-muted mb-3">
              GoRan AI Agency ("GoRan AI," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p className="text-brand-text-muted">
              By accessing our website or engaging our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">2. Information We Collect</h2>
            <h3 className="font-heading font-semibold text-brand-dark text-sm mb-2">Personal Data</h3>
            <p className="text-brand-text-muted mb-3">
              We may collect personally identifiable information such as your name, email address, company name, phone number, and project details when you fill out our contact form, request a scoping call, or communicate with us directly.
            </p>
            <h3 className="font-heading font-semibold text-brand-dark text-sm mb-2">Usage Data</h3>
            <p className="text-brand-text-muted mb-3">
              We may automatically collect information about how you access and interact with our website, including your IP address, browser type, pages visited, time spent, and referring URLs.
            </p>
            <h3 className="font-heading font-semibold text-brand-dark text-sm mb-2">Chatbot & Voice Agent Data</h3>
            <p className="text-brand-text-muted">
              Conversations with our website chatbot and voice agent are processed in real-time and are not stored beyond the session unless explicitly required for service delivery. No personal data is retained from these interactions by default.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">3. How We Use Your Information</h2>
            <p className="text-brand-text-muted mb-3">We use the collected information for the following purposes:</p>
            <ul className="flex flex-col gap-2 text-brand-text-muted pl-5">
              <li className="list-disc">To respond to your inquiries and provide project scoping and quotations</li>
              <li className="list-disc">To deliver and improve our AI agency services</li>
              <li className="list-disc">To communicate with you about project updates, technical documentation, and support</li>
              <li className="list-disc">To analyse website usage and improve user experience</li>
              <li className="list-disc">To comply with legal obligations and enforce our terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">4. Data Sharing & Disclosure</h2>
            <p className="text-brand-text-muted mb-3">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="flex flex-col gap-2 text-brand-text-muted pl-5">
              <li className="list-disc">Service providers who assist in our operations (cloud hosting, communication tools) under strict confidentiality agreements</li>
              <li className="list-disc">Legal authorities if required by law or to protect our rights</li>
              <li className="list-disc">Your authorised representatives or team members as part of project delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">5. Data Security</h2>
            <p className="text-brand-text-muted mb-3">
              We implement industry-standard security measures including encrypted data transmission (TLS), access controls, and regular security audits. All client data processed through our agent systems is handled in isolated environments with zero data retention by default.
            </p>
            <p className="text-brand-text-muted">
              While we strive to protect your data, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">6. Data Retention</h2>
            <p className="text-brand-text-muted mb-3">
              We retain personal data only as long as necessary to fulfil the purposes for which it was collected, or as required by law. Chatbot and voice agent session data is ephemeral and not retained after the session ends.
            </p>
            <p className="text-brand-text-muted">
              Client project data is retained for the duration of the engagement plus 90 days, after which it is securely deleted unless otherwise agreed in writing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">7. Your Rights</h2>
            <p className="text-brand-text-muted mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="flex flex-col gap-2 text-brand-text-muted pl-5">
              <li className="list-disc">Access the personal data we hold about you</li>
              <li className="list-disc">Request correction or deletion of your data</li>
              <li className="list-disc">Object to or restrict processing of your data</li>
              <li className="list-disc">Data portability</li>
              <li className="list-disc">Withdraw consent at any time</li>
            </ul>
            <p className="text-brand-text-muted mt-3">
              To exercise these rights, contact us at goran.dotin@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">8. Third-Party Links</h2>
            <p className="text-brand-text-muted">
              Our website may contain links to third-party sites. We are not responsible for the privacy practices of these external services. We encourage you to review their privacy policies before submitting personal information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">9. Changes to This Policy</h2>
            <p className="text-brand-text-muted">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Material changes will be communicated directly to active clients.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">10. Contact</h2>
            <p className="text-brand-text-muted">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:goran.dotin@gmail.com" className="text-brand-yellow hover:text-brand-yellow-hover transition-colors no-underline">goran.dotin@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
