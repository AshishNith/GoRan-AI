import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-screen bg-white relative overflow-hidden flex items-center justify-center pt-24 pb-24">
      <SEOHead
        title="Page Not Found"
        description="This page doesn't exist on GoRan AI."
        noIndex
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(229, 231, 235, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 231, 235, 0.25) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-brand-yellow/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-5%] w-[350px] h-[350px] rounded-full bg-purple-500/[0.04] blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[600px] mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <div className="font-heading text-[8rem] md:text-[10rem] font-bold leading-none text-brand-border select-none">
          404
        </div>

        <div className="w-12 h-1 rounded-full bg-brand-yellow mb-6" />

        <h1 className="text-2xl md:text-3xl font-heading font-bold text-brand-dark leading-tight mb-4">
          Page not found
        </h1>

        <p className="text-brand-text-muted text-base leading-relaxed max-w-sm mb-10">
          This route doesn't exist in our system architecture. The page may have been moved, deleted, or the URL may be incorrect.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 no-underline bg-brand-dark text-white font-semibold text-sm py-3.5 px-8 rounded-full transition-all duration-300 hover:bg-brand-dark-hover hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] group mt-6"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Return to Home
        </Link>
      </div>
    </main>
  );
}
