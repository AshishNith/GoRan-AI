import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCalBooking } from '../components/CalBookingModal';
import SEOHead from '../components/SEOHead';
import { coFounderSchema, buildBreadcrumbSchema } from '../seo/schemas';

const salesMilestones = [
  { stamp: '2022', event: 'Led enterprise sales & B2B growth pipelines, focusing on high-ticket client acquisition.' },
  { stamp: '2023', event: 'Pioneered early AI automation adoption for enterprise sales ops, reducing sales cycle times by 40%.' },
  { stamp: '2024', event: 'Built high-converting B2B outreach and lead qualification frameworks powered by voice and AI agents.' },
  { stamp: '2025', event: 'Joined GoRan AI as Sales & Marketing Head, taking advanced AI automation solutions to enterprise clients worldwide.' },
  { stamp: 'NOW', event: 'Scaling client operations, enterprise accounts, and strategic AI deployment partnerships globally.' },
];

const salesPillars = [
  { label: 'Client-Centric ROI', desc: 'Focus strictly on automations that deliver measurable revenue increases and cost reductions.' },
  { label: 'Enterprise Acceleration', desc: 'Streamline procurement, compliance, and onboarding so clients launch in weeks, not months.' },
  { label: 'Bespoke Deal Framing', desc: 'Tailor every engagement to match the exact operational realities of the client.' },
  { label: 'High-Touch Partnership', desc: 'Every client receives direct executive-level commitment from initial demo to production launch.' },
];

const salesStack = [
  { category: 'CRM & PIPELINE', tools: 'Salesforce, HubSpot, Custom AI CRM Dashboards' },
  { category: 'AI OUTREACH & VOIP', tools: 'Retell AI, Twilio, WhatsApp Business APIs, Automated Outbound Swarms' },
  { category: 'SALES ANALYTICS', tools: 'Custom Conversion Funnels, Call Transcription AI, Revenue Attribution' },
  { category: 'DEAL EXECUTION', tools: 'Enterprise Contracts, SOC2 Compliance Scoping, ROI Calculators' },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function CoFounder() {
  const { openCalBooking } = useCalBooking();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white relative overflow-hidden">
      <SEOHead
        title="Piyush Rana — Sales & Marketing Head | GoRan AI"
        description="Piyush Rana is the Sales & Marketing Head at GoRan AI. He drives enterprise sales, client acquisition, and strategic partnership growth for AI automation solutions."
        canonicalPath="/co-founder"
        schema={[
          coFounderSchema,
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Piyush Rana — Sales & Marketing Head' },
          ]),
        ]}
      />

      {/* HERO — Sales & Marketing Head Identity */}
      <section className="pt-36 pb-24 relative">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(229, 231, 235, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 231, 235, 0.3) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-[5%] right-[-8%] w-125 h-125 rounded-full bg-brand-yellow/5 blur-[90px] pointer-events-none" />

        <div className="w-full max-w-275 mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Executive Leadership</span>
              </div>

              <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-heading font-bold text-brand-dark leading-[0.92] tracking-tight mb-4">
                Piyush<br />Rana
              </h1>

              <div className="h-px w-full max-w-75 bg-brand-border mb-4" />

              <p className="text-sm md:text-base font-semibold text-brand-yellow tracking-widest uppercase mb-6">
                Sales &amp; Marketing Head
              </p>

              <motion.p
                className="text-lg md:text-xl text-brand-text-muted leading-relaxed max-w-2xl border-l-4 border-brand-yellow pl-5 mb-8"
                {...fadeUp}
              >
                "Building cutting-edge AI is only half the equation — connecting businesses with the exact AI automation that solves their core operational bottleneck is where true enterprise value is unlocked."
              </motion.p>

              <div className="flex items-center gap-4">
                <button
                  onClick={openCalBooking}
                  className="inline-flex items-center gap-2 bg-brand-dark text-white font-semibold text-sm py-3.5 px-7 rounded-full transition-all duration-300 hover:bg-brand-dark-hover hover:-translate-y-0.5 border-none cursor-pointer group shadow-md"
                >
                  Schedule Sales Scoping Call
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <a
                  href="https://www.linkedin.com/company/goran-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-yellow hover:border-brand-yellow transition-colors duration-200"
                  title="Piyush Rana LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="w-full aspect-3/4 max-h-125 border border-brand-border bg-brand-bg-light overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/Piyush.jpg"
                alt="Piyush Rana — Sales & Marketing Head at GoRan AI"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SALES FOCUS & RESPONSIBILITIES */}
      <section className="py-24 border-t border-brand-border relative bg-brand-bg-light/30">
        <div className="w-full max-w-275 mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Role & Focus</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <motion.div className="relative" {...fadeUp}>
              <div className="sticky top-32">
                <div className="flex flex-col items-start gap-6">
                  <div className="w-full aspect-square max-w-50 border border-brand-border bg-white rounded-2xl flex items-center justify-center p-6 shadow-sm">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="w-14 h-14 rounded-full border-2 border-brand-yellow bg-brand-yellow/10 flex items-center justify-center">
                        <span className="font-heading font-bold text-brand-dark text-xl">PR</span>
                      </div>
                      <span className="font-heading font-bold text-sm text-brand-dark mt-2">Piyush Rana</span>
                      <span className="text-[11px] text-brand-yellow font-semibold uppercase tracking-wider">Sales &amp; Marketing</span>
                    </div>
                  </div>
                  <p className="text-xs text-brand-text-muted leading-relaxed max-w-50">
                    Directly managing GoRan AI's client acquisition funnel, enterprise partnerships, and revenue expansion.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col gap-10">
              <motion.div {...fadeUp}>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-brand-dark mb-4">
                  Driving Growth Through Client Partnership
                </h3>
                <p className="text-brand-text-muted text-base leading-relaxed mb-6">
                  As Sales & Marketing Head, Piyush Rana leads the growth engine of GoRan AI. He works directly with founders, CEOs, and Operations Directors across industries to identify high-leverage automation opportunities and convert them into tailored AI agent implementations.
                </p>
                <p className="text-brand-text-muted text-base leading-relaxed">
                  From initial discovery calls to contract structuring and post-deployment scaling, Piyush ensures that every client receives a seamless experience with clear, upfront ROI calculations and dedicated executive oversight.
                </p>
              </motion.div>

              {/* Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-brand-border">
                {salesPillars.map((p, idx) => (
                  <motion.div
                    key={idx}
                    className="p-6 rounded-2xl border border-brand-border bg-white"
                    {...fadeUp}
                  >
                    <h4 className="font-heading font-bold text-base text-brand-dark mb-2">{p.label}</h4>
                    <p className="text-xs text-brand-text-muted leading-relaxed">{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SALES JOURNEY & MILESTONES */}
      <section className="py-24 border-t border-brand-border relative">
        <div className="w-full max-w-275 mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-12">
            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Growth Timeline</span>
          </div>

          <div className="max-w-225 mx-auto flex flex-col gap-6">
            {salesMilestones.map((m, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 p-6 rounded-2xl border border-brand-border bg-white hover:border-brand-yellow/50 transition-all duration-300"
                {...fadeUp}
              >
                <span className="font-heading font-bold text-brand-yellow bg-brand-yellow/10 px-4 py-2 rounded-xl text-sm shrink-0">
                  {m.stamp}
                </span>
                <p className="text-sm md:text-base text-brand-dark font-medium leading-relaxed pt-1">
                  {m.event}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SALES ENABLEMENT & TECH STACK */}
      <section className="py-24 border-t border-brand-border relative bg-brand-bg-light/40">
        <div className="w-full max-w-275 mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-12">
            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Sales Infrastructure</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-250 mx-auto">
            {salesStack.map((s, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl border border-brand-border bg-white flex flex-col gap-2"
                {...fadeUp}
              >
                <span className="text-xs font-bold font-heading text-brand-yellow uppercase tracking-widest">{s.category}</span>
                <p className="text-sm font-semibold text-brand-dark leading-relaxed">{s.tools}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 border-t border-brand-border text-center">
        <div className="w-full max-w-275 mx-auto px-6">
          <motion.div {...fadeUp}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted mb-6">Partner with Sales Leadership</h4>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-tight mb-6 max-w-2xl mx-auto">
              Ready to accelerate your <span className="text-brand-yellow">business growth?</span>
            </h2>
            <p className="text-brand-text-muted text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10">
              Schedule a direct scoping call with Piyush Rana to discover how custom AI agents can automate your lead flow and client operations.
            </p>
            <button
              onClick={openCalBooking}
              className="inline-flex items-center gap-2 bg-brand-dark text-white font-semibold text-sm py-3.5 px-8 rounded-full transition-all duration-300 hover:bg-brand-dark-hover hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border-none cursor-pointer group"
            >
              Book Call with Sales & Marketing Head
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
