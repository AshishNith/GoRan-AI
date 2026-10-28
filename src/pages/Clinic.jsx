import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import {
  ArrowDown, ArrowRight, CalendarCheck, Headphones, Languages, Moon, PhoneCall, PhoneMissed, Sparkles, UserX, Users,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import WhatsappIcon from '../components/ui/WhatsappIcon';
import { useCalBooking } from '../components/CalBookingModal';
import QualificationLiveDemo from '../components/QualificationLiveDemo';
import DemoRecordings from '../components/DemoRecordings';

const WHATSAPP_URL = 'https://wa.me/919934225353?text=DEMO%20-%20Main%20clinic%20ke%20liye%20AI%20calling%20agent%20ke%20baare%20mein%20jaanna%20chahta%20hoon.';

const problems = [
  {
    icon: Users,
    title: 'Receptionist ek, calls anek',
    desc: 'Ek insaan ek time pe ek hi call utha sakta hai. Upar se counter pe bheed alag. Baaki calls ring hoti rehti hain.',
  },
  {
    icon: Moon,
    title: 'Raat 9 ke baad phone band',
    desc: 'Aur Sunday ko bhi band. Lekin patient ko dard ya sawaal time dekh ke nahi aata.',
  },
  {
    icon: UserX,
    title: 'Follow-up koi karta hi nahi',
    desc: 'Reminder nahi gaya, to patient bhool gaya. Review visit nahi hui, to patient kahin aur chala gaya.',
  },
];

const fixes = [
  {
    icon: PhoneCall,
    title: 'Har call uthata hai, pehli ring pe',
    desc: 'Din ho ya raat ke 2 baje, Sunday ho ya tyohaar. AI calling agent har call uthata hai, appointment book karta hai aur sawaalon ka jawab deta hai.',
  },
  {
    icon: Languages,
    title: '30+ calls ek saath, patient ki bhasha mein',
    desc: 'Ek saath 30 se zyada calls sambhal leta hai. Hindi ho ya English, patient jo bhasha bole, usi mein baat karta hai.',
  },
  {
    icon: CalendarCheck,
    title: 'WhatsApp pe sab apne aap',
    desc: 'Appointment confirm, phir visit se pehle reminder, phir follow-up. Sab WhatsApp pe, bina kisi staff ke.',
  },
];

function trackEvent(action) {
  ReactGA.event({ category: 'Clinic Demo', action });
}

function SectionHeading({ eyebrow, title, intro }) {
  return (
    <div className="text-center max-w-[720px] mx-auto mb-12">
      <span className="text-xs font-bold uppercase text-brand-text-muted tracking-wider">{eyebrow}</span>
      <h2 className="text-3xl md:text-[2.6rem] font-heading font-bold text-brand-dark leading-tight mt-2 text-balance">{title}</h2>
      {intro && <p className="text-brand-text-muted text-sm md:text-base mt-4 leading-relaxed">{intro}</p>}
    </div>
  );
}

function PointCard({ icon: Icon, no, title, desc, tone }) {
  const iconTone = tone === 'problem' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-brand-yellow/15 text-brand-dark border-brand-yellow/30';
  return (
    <div className="bg-white border border-brand-border rounded-2xl p-6 md:p-7 hover:shadow-card-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-5">
        <span className={`w-11 h-11 rounded-xl border flex items-center justify-center ${iconTone}`}>
          <Icon size={20} />
        </span>
        <span className="text-xs font-mono font-bold text-brand-text-muted">0{no}</span>
      </div>
      <h3 className="font-heading font-bold text-brand-dark text-lg leading-tight mb-2">{title}</h3>
      <p className="text-brand-text-muted text-sm leading-relaxed m-0">{desc}</p>
    </div>
  );
}

export default function Clinic() {
  const { openCalBooking } = useCalBooking();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const openWhatsApp = (where) => () => trackEvent(`WhatsApp click (${where})`);
  const bookCall = (where) => () => {
    trackEvent(`Book call click (${where})`);
    openCalBooking();
  };

  return (
    <main className="w-full bg-white relative overflow-hidden min-h-screen">
      <SEOHead
        title="AI Calling Agent for Clinics"
        description="Doctor Sahab, ab ek bhi patient call miss nahi hogi. Suniye hamare AI calling agent ki demo calls, phir khud AI se baat kijiye."
        canonicalPath="/clinic"
        noIndex
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-border h-16 flex items-center justify-between px-4 sm:px-6 shadow-sm">
        <div className="w-full max-w-[1140px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center no-underline">
            <img src="/Logo.png" alt="GoRan AI Logo" className="h-10 w-auto block rounded-xl" />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openWhatsApp('header')}
            className="inline-flex items-center gap-1.5 bg-brand-dark text-white font-semibold text-xs py-2 px-4 rounded-full shadow-sm hover:bg-brand-dark-hover no-underline"
          >
            <WhatsappIcon size={14} /> DM on WhatsApp
          </a>
        </div>
      </header>

      <div className="grid-bg-overlay" />
      <div className="absolute top-[3%] right-[-10%] w-140 h-140 rounded-full bg-brand-yellow/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-[-15%] w-120 h-120 rounded-full bg-brand-yellow/5 blur-[100px] pointer-events-none" />

      {/* ── Hero ── */}
      <section className="relative z-10 pt-28 pb-14 md:pt-36 md:pb-16 px-4 sm:px-6">
        <div className="max-w-[900px] mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-xs font-bold text-brand-dark uppercase tracking-wider mb-6 animate-fadeIn">
            <Sparkles size={12} className="text-brand-yellow fill-brand-yellow" /> AI Calling Agent · Clinics
          </div>

          <h1 className="font-heading font-black text-brand-dark text-[2.1rem] sm:text-[3rem] md:text-[4.2rem] leading-[1.05] tracking-tight mb-6 animate-fadeIn text-balance">
            Doctor Sahab, ab ek bhi call <span className="text-brand-yellow">miss nahi hogi</span>
          </h1>

          <p className="text-brand-text-muted text-base sm:text-lg md:text-xl max-w-[680px] leading-relaxed mb-10 animate-fadeIn" style={{ animationDelay: '0.15s' }}>
            Aapne comment mein "DEMO" likha tha. Ye rahi hamare AI calling agent ki demo calls. Pehle suniye, phir khud AI se baat kijiye.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => scrollTo('recordings')}
              className="w-full sm:w-auto bg-brand-dark hover:bg-brand-dark-hover text-white font-bold text-base py-4 px-8 rounded-full shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer flex items-center justify-center gap-2"
            >
              <Headphones size={16} />
              <span>Demo calls suniye</span>
            </button>
            <button
              onClick={() => scrollTo('try-live')}
              className="w-full sm:w-auto bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-bold text-base py-4 px-8 rounded-full shadow-lg shadow-brand-yellow/10 transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Khud AI se baat kijiye</span>
              <ArrowDown size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Demo recordings ── */}
      <section id="recordings" className="relative z-10 pb-20 md:pb-24 px-4 sm:px-6 scroll-mt-20">
        <div className="max-w-[820px] mx-auto">
          <SectionHeading
            eyebrow="Demo Recordings"
            title="AI calling agent ki demo calls"
            intro="Kisi bhi recording pe play dabaiye. Headphones se sabse saaf sunai dega."
          />
          <DemoRecordings />
        </div>
      </section>

      {/* ── The leak ── */}
      <section className="relative z-10 py-20 md:py-24 bg-brand-bg-light border-t border-b border-brand-border px-4 sm:px-6">
        <div className="max-w-[1140px] mx-auto">
          <SectionHeading
            eyebrow="Problem"
            title="Har hafte 18 missed calls. Aur wo patient seedha pados wali clinic mein."
            intro="Clinic pe roz 40-50 calls aati hain, aur unme se aadhi koi uthata hi nahi. Aisa hota kyun hai? Teen wajah hain."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {problems.map((p, i) => <PointCard key={p.title} {...p} no={i + 1} tone="problem" />)}
          </div>
        </div>
      </section>

      {/* ── The fix ── */}
      <section className="relative z-10 py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-[1140px] mx-auto">
          <SectionHeading
            eyebrow="Fix"
            title="Fix bas ek hai: ek AI calling agent"
            intro="Jo aapki receptionist ke saath kaam karta hai, uski jagah nahi. Wo counter sambhale, AI phone sambhale."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {fixes.map((f, i) => <PointCard key={f.title} {...f} no={i + 1} tone="fix" />)}
          </div>

          {/* Result */}
          <div className="mt-10 bg-brand-dark rounded-3xl px-6 py-10 md:px-12 md:py-12 relative overflow-hidden">
            <div className="absolute top-[-40%] right-[-10%] w-120 h-80 rounded-full bg-brand-yellow/15 blur-[100px] pointer-events-none" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                <span className="text-xs font-bold uppercase text-brand-yellow tracking-wider">Result</span>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight mt-2 mb-2">Ek hafte baad, missed calls 18 se seedha zero</h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed m-0 max-w-[460px]">Har call uthi, har patient ko WhatsApp pe confirmation mila, aur koi pados wali clinic nahi gaya.</p>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 shrink-0" aria-label="Missed calls went from 18 to 0">
                <div className="flex flex-col items-center">
                  <span className="flex items-center gap-2 text-white/40 font-heading font-black text-5xl sm:text-6xl tabular-nums line-through decoration-red-500/70">18</span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-white/40 mt-1"><PhoneMissed size={12} /> Before</span>
                </div>
                <ArrowRight size={28} className="text-brand-yellow" />
                <div className="flex flex-col items-center">
                  <span className="text-brand-yellow font-heading font-black text-6xl sm:text-7xl tabular-nums">0</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60 mt-1">After 1 week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Talk to the agent yourself ── */}
      <section className="relative z-10 pb-2 px-4 sm:px-6">
        <p className="max-w-[640px] mx-auto text-center text-brand-text-muted text-base md:text-lg leading-relaxed mb-10">
          Lekin meri baat pe bharosa mat kijiye. <span className="font-semibold text-brand-dark">Pehle khud call karke AI se baat kijiye, phir decide kijiye.</span>
        </p>
      </section>
      <QualificationLiveDemo />

      {/* ── Closing CTA ── */}
      <section className="relative z-10 py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-[1140px] mx-auto bg-brand-bg-light border border-brand-border rounded-3xl px-6 py-14 md:py-20 text-center relative overflow-hidden">
          <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-140 h-80 rounded-full bg-brand-yellow/15 blur-[100px] pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-brand-dark leading-tight tracking-tight max-w-[760px] mx-auto text-balance">
              Apni clinic ke liye <span className="text-brand-yellow">AI agent</span> chahiye?
            </h2>
            <p className="text-brand-text-muted text-sm md:text-base leading-relaxed max-w-[560px] mx-auto mt-5 mb-9">
              WhatsApp pe DM kijiye ya 15 minute ki call book kijiye. Hum agent ko aapki clinic ke naam, timings, doctors aur fees ke saath set karke denge.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openWhatsApp('closing')}
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-base py-4 px-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 no-underline inline-flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
              >
                <WhatsappIcon size={18} />
                <span>DM on WhatsApp</span>
              </a>
              <button
                onClick={bookCall('closing')}
                className="w-full sm:w-auto bg-brand-dark hover:bg-brand-dark-hover text-white font-bold text-base py-4 px-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Book a Call</span>
                <ArrowRight size={16} />
              </button>
            </div>
            <p className="text-xs text-brand-text-muted mt-8 mb-0">GoRan AI · AI calling, WhatsApp, automation</p>
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
