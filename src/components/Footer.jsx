import React from 'react';
import { Link } from 'react-router-dom';
import { useCalBooking } from './CalBookingModal';

const socialLinks = [
  { label: 'X / Twitter', href: 'https://x.com/synapseai' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/synapseai' },
  { label: 'GitHub', href: 'https://github.com/synapseai' },
];

const pageLinks = [
  { label: 'About', to: '/about' },
  { label: 'Founder', to: '/founder' },
  { label: 'Our Process', to: '/process' },
  { label: 'Contact', to: '/contact' },
];

const serviceLinks = [
  { label: 'AI Audit', to: '/services/ai-audit' },
  { label: 'Product Development', to: '/services/product-development' },
  { label: 'Product Management', to: '/services/product-management' },
  { label: 'AI Training', to: '/services/ai-training' },
];

export default function Footer() {
  const { openCalBooking } = useCalBooking();
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-white/50 font-body relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-brand-yellow/[0.02] blur-[80px] rounded-full pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">

        {/* ── Upper Section: Brand + Stats ── */}
        <div className="pt-24 pb-16 border-b border-white/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-12 lg:gap-8">
            {/* Column 1: Brand */}
            <div className="flex flex-col gap-5 items-start">
              <Link
                to="/"
                className="flex items-center no-underline bg-white/[0.06] border border-white/[0.08] px-4 py-2 rounded-xl transition-all hover:bg-white/[0.1]"
              >
                <img
                  src="/Logo.png"
                  alt="Synapse Logo"
                  className="h-5 w-auto block brightness-0 invert"
                />
              </Link>

              <p className="text-white/50 leading-relaxed text-sm max-w-[300px]">
                We design, build, and deploy custom AI agent systems that automate workflows, connect your tools, and scale with your business.
              </p>

              {/* Status indicator */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-green-500/8 border border-green-500/15 text-[12px] font-semibold text-[#4ADE80]">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-[#4ADE80] animate-ping opacity-40" />
                  <span className="relative rounded-full w-2 h-2 bg-[#4ADE80]" />
                </span>
                All systems operational
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 mt-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline text-white/40 hover:text-white transition-colors duration-200 text-xs font-medium"
                    title={s.label}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Pages */}
            <div className="flex flex-col gap-5">
              <h4 className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.2em]">Pages</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {pageLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="no-underline text-white/60 hover:text-white transition-colors duration-200 text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="flex flex-col gap-5">
              <h4 className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.2em]">Services</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="no-underline text-white/60 hover:text-white transition-colors duration-200 text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact CTA */}
            <div className="flex flex-col gap-5 items-start">
              <h4 className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.2em]">Get in touch</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                Target response time under 24 hours. Book a scoping session to secure project roadmap priority.
              </p>
              <button
                onClick={openCalBooking}
                className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-semibold text-sm py-3 px-5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-brand-yellow/10 border-none cursor-pointer"
              >
                <span>Start a Project</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <a
                href="mailto:hello@synapse-ai.agency"
                className="text-white/40 hover:text-white transition-colors duration-200 text-xs no-underline mt-1"
              >
                hello@synapse-ai.agency
              </a>
            </div>
          </div>
        </div>

        {/* ── Middle Section: Trust Metrics ── */}
        <div className="py-12 border-b border-white/[0.06]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '99.9%', label: 'System Uptime' },
              { value: '500k+', label: 'Daily Executions' },
              { value: '4.9/5', label: 'Client Rating' },
              { value: '<24h', label: 'Avg. Response Time' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-heading text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-white/40 text-xs font-medium tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-10 gap-6">
          <div className="text-white/30 text-xs text-center sm:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} Synapse AI Agency. All rights reserved.
          </div>

          <div className="flex items-center gap-5 text-xs">
            <Link to="/privacy" className="no-underline text-white/40 hover:text-white transition-colors duration-200">
              Privacy
            </Link>
            <span className="text-white/10">/</span>
            <Link to="/terms" className="no-underline text-white/40 hover:text-white transition-colors duration-200">
              Terms
            </Link>
            <span className="text-white/10">/</span>
            <button
              onClick={handleScrollToTop}
              className="inline-flex items-center gap-1.5 no-underline text-white/40 hover:text-white transition-colors duration-200 cursor-pointer bg-none border-none font-body text-xs"
            >
              Back to top
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
