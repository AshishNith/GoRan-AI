import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-white/50 text-sm border-t border-white/5 pt-20 pb-12 relative overflow-hidden font-body">
      {/* Subtle bottom grid overlay for high-tech premium feel */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12 md:gap-8 pb-16 border-b border-white/5">
          
          {/* Column 1: Brand & Status */}
          <div className="flex flex-col gap-5 items-start">
            <Link to="/" className="flex items-center no-underline bg-[#2A2A2A] border border-white/10 px-4 py-2 rounded-xl transition-all hover:bg-[#333333]">
              <img
                src="https://www.goran.in/Assets/LOGO.png"
                alt="Synapse Logo"
                className="h-4.5 w-auto block filter invert"
              />
            </Link>
            <p className="text-white/60 leading-relaxed max-w-[280px] text-xs">
              Architecting secure, autonomous multi-agent networks that execute, refine, and optimize operational workflows 24/7.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-[11px] font-semibold text-[#4ADE80]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse"></span>
              Core System: Operational
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Explore</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li>
                <a href="/#sandbox" className="no-underline text-white/50 hover:text-white transition-colors duration-200 text-xs">
                  Agent Sandbox
                </a>
              </li>
              <li>
                <a href="/#steps" className="no-underline text-white/50 hover:text-white transition-colors duration-200 text-xs">
                  Intake Process
                </a>
              </li>
              <li>
                <a href="/#services" className="no-underline text-white/50 hover:text-white transition-colors duration-200 text-xs">
                  Services Stack
                </a>
              </li>
              <li>
                <a href="/#trust" className="no-underline text-white/50 hover:text-white transition-colors duration-200 text-xs">
                  System Trust
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Services</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li>
                <Link to="/services/ai-audit" className="no-underline text-white/50 hover:text-white transition-colors duration-200 text-xs">
                  AI Workflow Audit
                </Link>
              </li>
              <li>
                <Link to="/services/product-development" className="no-underline text-white/50 hover:text-white transition-colors duration-200 text-xs">
                  Product Development
                </Link>
              </li>
              <li>
                <Link to="/services/product-management" className="no-underline text-white/50 hover:text-white transition-colors duration-200 text-xs">
                  Product Management
                </Link>
              </li>
              <li>
                <Link to="/services/ai-training" className="no-underline text-white/50 hover:text-white transition-colors duration-200 text-xs">
                  Enablement Labs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Intake Scoping */}
          <div className="flex flex-col gap-4 items-start">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Intake Scoping</h4>
            <p className="text-white/60 leading-relaxed text-xs max-w-[240px]">
              Targeting response times under 24 hours. Book a scoping session directly to secure project roadmap priority.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 no-underline bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-semibold text-xs py-2.5 px-4 rounded-xl transition-all duration-200 mt-2 hover:-translate-y-0.5 shadow-md"
            >
              <span>Request Scoping Blueprint</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-10 gap-6 flex-wrap">
          <div className="text-white/40 text-xs text-center sm:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} Synapse AI Agency. All rights reserved. 
            <span className="block mt-1 sm:inline sm:mt-0 sm:ml-1 text-white/25">Built following Zite design guidelines and Morningside AI / Monk Group models.</span>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={handleScrollToTop}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer shadow-sm group active:scale-95"
            title="Back to top"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:-translate-y-0.5"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
}
