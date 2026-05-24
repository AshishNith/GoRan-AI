import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {
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
      <div className="absolute top-[5%] right-[-8%] w-[400px] h-[400px] rounded-full bg-brand-yellow/5 blur-[90px] pointer-events-none" />

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
          Terms of Service
        </h1>
        <p className="text-brand-text-muted text-sm mb-12">
          Last updated: May 24, 2026
        </p>

        <div className="flex flex-col gap-8 text-[0.95rem] leading-relaxed text-brand-text-main">
          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">1. Acceptance of Terms</h2>
            <p className="text-brand-text-muted mb-3">
              By accessing the Synapse AI Agency website or engaging our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use our website or services.
            </p>
            <p className="text-brand-text-muted">
              These terms apply to all visitors, users, and clients of Synapse AI Agency ("Synapse," "we," "us," or "our").
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">2. Services Description</h2>
            <p className="text-brand-text-muted mb-3">
              Synapse provides AI agent development, workflow automation, AI audit, product development, product management, and AI training services. Each engagement is governed by a separate Statement of Work (SOW) that defines specific deliverables, timelines, and pricing.
            </p>
            <p className="text-brand-text-muted">
              The scope, fees, and timeline for each project will be documented in a signed SOW. In the event of any conflict between these Terms and a SOW, the SOW will prevail.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">3. Intellectual Property</h2>
            <h3 className="font-heading font-semibold text-brand-dark text-sm mb-2">Our Intellectual Property</h3>
            <p className="text-brand-text-muted mb-3">
              All materials, methodologies, frameworks, and proprietary tools developed by Synapse (including pre-existing intellectual property) remain our exclusive property. This includes our agent architecture patterns, safety loop designs, and internal tooling.
            </p>
            <h3 className="font-heading font-semibold text-brand-dark text-sm mb-2">Client Deliverables</h3>
            <p className="text-brand-text-muted mb-3">
              Upon full payment, clients receive full ownership of the custom-built agent systems, codebases, and documentation specifically developed for their project under the SOW, unless otherwise agreed in writing.
            </p>
            <h3 className="font-heading font-semibold text-brand-dark text-sm mb-2">Third-Party Components</h3>
            <p className="text-brand-text-muted">
              Our solutions may incorporate open-source or third-party components. These remain subject to their original licenses, which we will disclose to the client.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">4. Client Responsibilities</h2>
            <p className="text-brand-text-muted mb-3">You agree to:</p>
            <ul className="flex flex-col gap-2 text-brand-text-muted pl-5">
              <li className="list-disc">Provide accurate, complete information about your workflows, systems, and requirements</li>
              <li className="list-disc">Grant necessary access to systems, APIs, and data required for project delivery</li>
              <li className="list-disc">Make timely decisions and provide feedback to keep the project on schedule</li>
              <li className="list-disc">Comply with all applicable laws regarding data you share with us for processing</li>
              <li className="list-disc">Not use our services for any illegal or unauthorised purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">5. Fees & Payment</h2>
            <p className="text-brand-text-muted mb-3">
              Fees are specified in each SOW. Payment terms are net-15 unless otherwise agreed. Late payments may result in project suspension. All fees are exclusive of applicable taxes, which are the client's responsibility.
            </p>
            <p className="text-brand-text-muted">
              Projects are billed on a milestone or fixed-fee basis as defined in the SOW. Ongoing support and maintenance are billed separately on a monthly retainer basis.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">6. Confidentiality</h2>
            <p className="text-brand-text-muted mb-3">
              Both parties agree to maintain confidentiality of all proprietary information shared during the engagement. This obligation survives the termination of our agreement for a period of three years.
            </p>
            <p className="text-brand-text-muted">
              Synapse will not disclose client data, trade secrets, or business processes to any third party without written consent, except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">7. Limitation of Liability</h2>
            <p className="text-brand-text-muted mb-3">
              To the maximum extent permitted by law, Synapse's liability for any claim arising from our services is limited to the total fees paid by the client for the specific project giving rise to the claim.
            </p>
            <p className="text-brand-text-muted">
              We are not liable for indirect, incidental, or consequential damages, including lost profits, data loss, or business interruption, even if advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">8. Warranties & Disclaimer</h2>
            <p className="text-brand-text-muted mb-3">
              We warrant that our services will be performed in a professional manner consistent with industry standards. However, AI systems involve inherent uncertainty, and we cannot guarantee specific outcomes or results from any agent system deployed.
            </p>
            <p className="text-brand-text-muted">
              Our services are provided "as is" without warranties of merchantability or fitness for a particular purpose, except as expressly stated in the SOW.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">9. Termination</h2>
            <p className="text-brand-text-muted mb-3">
              Either party may terminate a project with 30 days written notice. In the event of termination, the client pays for all work completed and deliverables produced up to the termination date. Synapse will deliver all work product produced up to that point.
            </p>
            <p className="text-brand-text-muted">
              Either party may terminate immediately if the other party breaches a material term and fails to remedy it within 15 days of written notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">10. Governing Law</h2>
            <p className="text-brand-text-muted">
              These terms are governed by the laws of England and Wales. Any disputes arising from these terms or our services shall be resolved through binding arbitration in London, UK.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">11. Changes to Terms</h2>
            <p className="text-brand-text-muted">
              We reserve the right to modify these terms at any time. Changes are effective immediately upon posting. Continued use of our website or services after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-bold text-brand-dark mb-3">12. Contact</h2>
            <p className="text-brand-text-muted">
              For questions about these Terms of Service, contact us at{' '}
              <a href="mailto:legal@synapse-ai.agency" className="text-brand-yellow hover:text-brand-yellow-hover transition-colors no-underline">legal@synapse-ai.agency</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
