import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { ArrowRight, Check, Loader2, Mail, Search, Globe, PenLine, Send, AlertCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import WhatsappIcon from '../components/ui/WhatsappIcon';
import { useCalBooking } from '../components/CalBookingModal';
import { buildBreadcrumbSchema } from '../seo/schemas';

const WEBHOOK_URL = import.meta.env.VITE_LEAD_AGENT_WEBHOOK_URL || 'https://n8n.goran.in/webhook/goran-lead-agent';
const WHATSAPP_URL = 'https://wa.me/919934225353?text=AGENT%20-%20I%20want%20the%20AI%20lead%20agent%20for%20my%20business.';
const GREEN = '#16A34A';

const rahulDay = [
  'Opens 50 tabs and hunts for companies',
  'Digs for an email on every website',
  'Reads each site, then writes one email at a time',
  '17 minutes per lead. 20 leads and the day is gone.',
];

const agentDay = [
  { icon: Search, label: 'Pulls fresh leads', text: 'Real local businesses in your niche and city.' },
  { icon: Mail, label: 'Finds their emails', text: 'From the directory listing and the website itself.' },
  { icon: Globe, label: 'Checks their website', text: 'Reads what they actually do before writing a word.' },
  { icon: PenLine, label: 'Writes a personal email', text: 'One per lead, built from a real detail on their site.' },
  { icon: Send, label: 'Follows up on WhatsApp', text: 'Automatic nudges until they reply. Live for clients.' },
];

const steps = ['Pulling fresh leads', 'Finding their emails', 'Reading their websites', 'Writing personal emails', 'Packing your report'];

function trackEvent(action) {
  ReactGA.event({ category: 'Lead Agent', action });
}

export default function LeadAgent() {
  const { openCalBooking } = useCalBooking();
  const [form, setForm] = useState({ niche: '', city: '', name: '', email: '', offer: '' });
  const [status, setStatus] = useState('idle'); // idle | running | done | error
  const [stepIdx, setStepIdx] = useState(0);
  const [error, setError] = useState('');
  const timer = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => clearInterval(timer.current);
  }, []);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('running');
    setStepIdx(0);
    trackEvent('run_agent');
    clearInterval(timer.current);
    timer.current = setInterval(() => setStepIdx((i) => Math.min(i + 1, steps.length - 1)), 2600);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, count: 8 }),
      });
      if (!res.ok) throw new Error(`Agent returned ${res.status}`);
      clearInterval(timer.current);
      setStepIdx(steps.length);
      setStatus('done');
    } catch (err) {
      clearInterval(timer.current);
      setError(err.message || 'Could not reach the agent.');
      setStatus('error');
    }
  };

  const inputCls =
    'w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm text-brand-dark outline-none focus:border-brand-dark transition-colors';

  return (
    <main className="w-full bg-white font-body text-brand-text-main">
      <SEOHead
        title="AI Lead Generation Agent: 47 Leads Before Your Chai"
        description="See an AI agent find leads, dig up their emails, read their websites and write a personal email for each one. Run it on your own niche and get the report in your inbox."
        canonicalPath="/lead-agent"
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'AI Lead Agent' },
        ])}
      />

      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 no-underline shrink-0">
            <img src="/Logo.png" alt="GoRan AI" className="h-7 w-auto" />
          </Link>
          <button
            onClick={() => { trackEvent('book_call_topbar'); openCalBooking(); }}
            className="inline-flex items-center gap-1.5 bg-brand-dark text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-full border-0 cursor-pointer hover:bg-brand-dark-hover transition-colors"
          >
            Book a call
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-12">
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">
          AI lead generation agent
        </span>
        <h1 className="font-heading font-bold text-brand-dark text-4xl sm:text-6xl leading-[1] tracking-tight mt-4 max-w-3xl">
          You pay ₹25,000 a month for a job AI does in <span style={{ color: GREEN }}>4 minutes.</span>
        </h1>
        <p className="text-brand-text-muted text-base sm:text-lg leading-relaxed mt-5 max-w-xl">
          Meet Rahul, your lead generation guy. Then meet the agent that does his whole morning before your chai goes cold.
        </p>
        <div className="flex flex-wrap gap-3 mt-7">
          <a
            href="#run"
            onClick={() => trackEvent('hero_run_cta')}
            className="inline-flex items-center gap-2 text-white font-semibold text-sm py-3 px-6 rounded-full no-underline transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: GREEN }}
          >
            Run the agent on your niche
            <ArrowRight size={16} />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('hero_whatsapp')}
            className="inline-flex items-center gap-2 bg-white text-brand-dark border border-brand-border font-semibold text-sm py-3 px-6 rounded-full no-underline hover:border-brand-text-muted transition-colors"
          >
            <WhatsappIcon size={16} />
            Message “AGENT”
          </a>
        </div>
      </section>

      {/* Rahul vs agent */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-14 grid md:grid-cols-2 gap-5">
        <div className="rounded-3xl border border-brand-border p-6 sm:p-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">Rahul · every morning</div>
          <div className="font-heading font-bold text-4xl text-brand-dark mt-3">17 min <span className="text-lg text-brand-text-muted font-semibold">per lead</span></div>
          <ul className="mt-5 space-y-3 list-none p-0 m-0">
            {rahulDay.map((t) => (
              <li key={t} className="flex gap-3 text-sm sm:text-base leading-snug">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-text-muted shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl p-6 sm:p-8" style={{ backgroundColor: '#ECFDF3' }}>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: GREEN }}>The AI agent · 9:00 AM</div>
          <div className="font-heading font-bold text-4xl text-brand-dark mt-3">47 leads <span className="text-lg text-brand-text-muted font-semibold">by chai time</span></div>
          <ul className="mt-5 space-y-3.5 list-none p-0 m-0">
            {agentDay.map(({ icon: Icon, label, text }) => (
              <li key={label} className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0" style={{ color: GREEN }}>
                  <Icon size={15} />
                </span>
                <span className="text-sm sm:text-base leading-snug">
                  <strong className="text-brand-dark">{label}.</strong> {text}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-brand-text-main mt-5 font-semibold">
            Your report: 47 leads found · 32 emails sent · 3 replies. No salary. No sick days.
          </p>
        </div>
      </section>

      {/* Under the hood */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-14">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">Under the hood</span>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-dark leading-tight mt-2">
          The actual n8n workflow
        </h2>
        <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">
          No black box. This is the live workflow behind the demo below: a webhook, a lead search, a website reader, an AI writer and an email report.
        </p>
        <div className="mt-6 rounded-3xl border border-brand-border overflow-hidden bg-[#0f1a14]">
          <img
            src="/lead-agent-workflow.png"
            alt="n8n workflow: webhook, find leads, read each website, extract contacts, Gemini writes a personal email, report emailed"
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
      </section>

      {/* Live demo */}
      <section id="run" className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 scroll-mt-20">
        <div className="rounded-3xl border border-brand-border p-6 sm:p-10 grid md:grid-cols-2 gap-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">Try it live</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-dark leading-tight mt-2">
              Run the real agent on your niche
            </h2>
            <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed mt-3">
              Tell it who you sell to and where. In about a minute it finds real businesses, reads their websites, digs out emails and drafts a personal email for each.
              The report lands in your inbox.
            </p>
            <p className="text-xs text-brand-text-muted leading-relaxed mt-4">
              Drafts only. Nothing is sent to the businesses it finds. Your email is used just to deliver this report.
            </p>
          </div>

          <div>
            {status === 'idle' || status === 'error' ? (
              <form onSubmit={submit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input name="niche" value={form.niche} onChange={update} required placeholder="Who you sell to (e.g. dentist)" className={inputCls} />
                  <input name="city" value={form.city} onChange={update} required placeholder="City (e.g. Jaipur)" className={inputCls} />
                </div>
                <input name="offer" value={form.offer} onChange={update} placeholder="What you offer (optional)" maxLength={200} className={inputCls} />
                <div className="grid grid-cols-2 gap-3">
                  <input name="name" value={form.name} onChange={update} required placeholder="Your name" className={inputCls} />
                  <input name="email" type="email" value={form.email} onChange={update} required placeholder="Email for the report" className={inputCls} />
                </div>
                {status === 'error' && (
                  <div className="flex items-start gap-2 text-sm text-red-600">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{error} Please try again, or message us on WhatsApp.</span>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 text-white font-semibold text-sm py-3.5 rounded-full border-0 cursor-pointer transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: GREEN }}
                >
                  Wake the agent up
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <div aria-live="polite">
                <ul className="space-y-3 list-none p-0 m-0">
                  {steps.map((label, i) => {
                    const done = i < stepIdx || status === 'done';
                    const active = i === stepIdx && status === 'running';
                    return (
                      <li key={label} className="flex items-center gap-3 text-sm sm:text-base" style={{ opacity: done || active ? 1 : 0.4 }}>
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: done ? GREEN : '#F3F4F6', color: done ? '#fff' : '#171717' }}
                        >
                          {done ? <Check size={13} /> : active ? <Loader2 size={13} className="animate-spin" /> : null}
                        </span>
                        {label}
                      </li>
                    );
                  })}
                </ul>
                {status === 'done' && (
                  <div className="mt-6 rounded-2xl p-4" style={{ backgroundColor: '#ECFDF3' }}>
                    <div className="font-bold text-brand-dark">The agent is on it.</div>
                    <p className="text-sm text-brand-text-main mt-1 leading-snug">
                      Your report will arrive at <strong>{form.email}</strong> in about a minute. Check spam if it is shy.
                    </p>
                    <button
                      onClick={() => { setStatus('idle'); setStepIdx(0); }}
                      className="mt-3 text-xs font-semibold text-brand-dark underline bg-transparent border-0 cursor-pointer p-0"
                    >
                      Run it for another niche
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-3xl bg-brand-dark text-white p-8 sm:p-12 text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl leading-tight">Want this for your business?</h2>
          <p className="text-white/70 mt-3 max-w-md mx-auto text-sm sm:text-base">
            We build it around your offer, your leads and your WhatsApp. Comment or message “AGENT” and we will send the details.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('cta_whatsapp')}
              className="inline-flex items-center gap-2 text-white font-semibold text-sm py-3 px-6 rounded-full no-underline"
              style={{ backgroundColor: GREEN }}
            >
              <WhatsappIcon size={16} />
              WhatsApp “AGENT”
            </a>
            <button
              onClick={() => { trackEvent('cta_book_call'); openCalBooking(); }}
              className="inline-flex items-center gap-2 bg-white text-brand-dark font-semibold text-sm py-3 px-6 rounded-full border-0 cursor-pointer"
            >
              Book a call
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
