import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Headphones, Sparkles } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useCalBooking } from '../components/CalBookingModal';
import QualificationLiveDemo from '../components/QualificationLiveDemo';
import DemoRecordings from '../components/DemoRecordings';

export default function Demo() {
  const { openCalBooking } = useCalBooking();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="w-full bg-white relative overflow-hidden min-h-screen">
      <SEOHead
        title="AI Calling Agent Demo"
        description="Listen to real calls handled by the GoRan AI calling agent, then test the agent yourself on your own phone or right in your browser."
        canonicalPath="/demo"
        noIndex
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-border h-16 flex items-center justify-between px-6 shadow-sm">
        <div className="w-full max-w-[1140px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center no-underline">
            <img src="/Logo.png" alt="GoRan AI Logo" className="h-10 w-auto block rounded-xl" />
          </Link>
          <button
            onClick={openCalBooking}
            className="inline-flex items-center gap-1 bg-brand-dark text-white font-semibold text-xs py-2 px-4 rounded-full shadow-sm hover:bg-brand-dark-hover border-none cursor-pointer"
          >
            Book a Call
          </button>
        </div>
      </header>

      <div className="grid-bg-overlay" />
      <div className="absolute top-[3%] right-[-10%] w-140 h-140 rounded-full bg-brand-yellow/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-[-15%] w-120 h-120 rounded-full bg-brand-yellow/5 blur-[100px] pointer-events-none" />

      {/* ── Hero ── */}
      <section className="relative z-10 pt-32 pb-14 md:pt-40 md:pb-16 px-6">
        <div className="max-w-[900px] mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-xs font-bold text-brand-dark uppercase tracking-wider mb-6 animate-fadeIn">
            <Sparkles size={12} className="text-brand-yellow fill-brand-yellow" /> AI Calling Agent · Demo
          </div>

          <h1 className="font-heading font-black text-brand-dark text-[2.2rem] sm:text-[3.2rem] md:text-[4.5rem] leading-[1.05] tracking-tight mb-6 animate-fadeIn">
            Hear the AI calling agent <span className="text-brand-yellow">in action</span>
          </h1>

          <p className="text-brand-text-muted text-base sm:text-lg md:text-xl max-w-[720px] leading-relaxed mb-10 animate-fadeIn" style={{ animationDelay: '0.15s' }}>
            Listen to real calls first. Then test the agent yourself: it can call your phone, or you can talk to it right here in your browser.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => scrollTo('recordings')}
              className="w-full sm:w-auto bg-brand-dark hover:bg-brand-dark-hover text-white font-bold text-base py-4 px-8 rounded-full shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer flex items-center justify-center gap-2"
            >
              <Headphones size={16} />
              <span>Listen to the Demos</span>
            </button>
            <button
              onClick={() => scrollTo('try-live')}
              className="w-full sm:w-auto bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-bold text-base py-4 px-8 rounded-full shadow-lg shadow-brand-yellow/10 transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Test the Agent Live</span>
              <ArrowDown size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Demo recordings ── */}
      <section id="recordings" className="relative z-10 pb-20 md:pb-24 px-6 scroll-mt-20">
        <div className="max-w-[820px] mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase text-brand-text-muted tracking-wider">Demo Recordings</span>
            <h2 className="text-3xl md:text-[2.4rem] font-heading font-bold text-brand-dark leading-tight mt-2 text-balance">
              Real calls, played back
            </h2>
            <p className="text-brand-text-muted text-sm md:text-base mt-4 leading-relaxed">
              Press play on any recording. Headphones give the clearest sound.
            </p>
          </div>

          <DemoRecordings />
        </div>
      </section>

      {/* ── Test the agent: phone call + browser call ── */}
      <QualificationLiveDemo />

      {/* ── Closing CTA ── */}
      <section className="relative z-10 py-20 md:py-24 px-6">
        <div className="max-w-[1140px] mx-auto bg-brand-dark rounded-3xl px-6 py-14 md:py-20 text-center relative overflow-hidden">
          <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-140 h-80 rounded-full bg-brand-yellow/15 blur-[100px] pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight tracking-tight max-w-[760px] mx-auto text-balance">
              Want a calling agent for <span className="text-brand-yellow">your business?</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-[560px] mx-auto mt-5 mb-9">
              Book a call and we will set up an agent with your questions, your script and your brand's name.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={openCalBooking}
                className="w-full sm:w-auto bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-bold text-base py-4 px-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer inline-flex items-center justify-center gap-2 shadow-lg shadow-brand-yellow/10"
              >
                <span>Book a Call</span>
                <ArrowRight size={16} />
              </button>
              <Link
                to="/qualification"
                className="w-full sm:w-auto text-white/80 hover:text-white font-semibold text-base py-4 px-8 rounded-full border border-white/20 no-underline inline-flex items-center justify-center transition-all"
              >
                See the lead qualification funnel
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full bg-brand-bg-light border-t border-brand-border py-8 px-6 relative z-10">
        <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-text-muted">
          <span>© 2026 GoRan AI. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-brand-dark hover:underline no-underline">Privacy Policy</a>
            <a href="/terms" className="hover:text-brand-dark hover:underline no-underline">Terms of Service</a>
            <Link to="/" className="hover:text-brand-dark hover:underline no-underline">Main Website</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
