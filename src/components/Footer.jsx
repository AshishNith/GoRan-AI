import React from 'react';
import { Link } from 'react-router-dom';
import { useCalBooking } from './CalBookingModal';

const socialLinks = [
  { label: 'X', href: 'https://x.com/synapseai' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/synapseai' },
  { label: 'GitHub', href: 'https://github.com/synapseai' },
  { label: 'Instagram', href: 'https://instagram.com/synapseai' },
  { label: 'Facebook', href: 'https://facebook.com/synapseai' },
  { label: 'YouTube', href: 'https://youtube.com/@synapseai' },
];

const socialIcons = {
  X: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" /></svg>,
  LinkedIn: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  GitHub: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
  Instagram: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  Facebook: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  YouTube: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>,
};

const pageLinks = [
  { label: 'About', to: '/about' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Blog', to: '/blog' },
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
              <div className="flex items-center gap-2 mt-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-200"
                    title={s.label}
                  >
                    {socialIcons[s.label]}
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
