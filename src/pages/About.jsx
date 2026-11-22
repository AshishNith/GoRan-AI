import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCalBooking } from '../components/CalBookingModal';
import SEOHead from '../components/SEOHead';
import { buildBreadcrumbSchema } from '../seo/schemas';

const principles = [
  {
    title: 'Tailored, not templated',
    body: 'Every system is designed around how your business works, never copied from a template.',
  },
  {
    title: 'Security is non-negotiable',
    body: 'Your data is encrypted in transit and at rest, access is limited to the people who need it, and every agent action is logged.',
  },
  {
    title: 'End-to-end ownership',
    body: 'We design, build, launch and support it ourselves. One team from the first call to long after go-live.',
  },
  {
    title: 'Human-centred automation',
    body: 'We automate the tedious work, not the meaningful work. Your team gets more time for what matters.',
  },
];

// Kept in step with the timeline on the Founder page
const milestones = [
  { year: '2020', label: 'The first script', detail: 'Ashish writes a small automation for local businesses that were typing website leads into spreadsheets by hand. Four hours of work becomes four seconds.' },
  { year: '2024', label: 'Voice and chat agents', detail: 'Years of backend and AI work turn into low-latency calling agents and message routing that hold up in real operations.' },
  { year: '2025', label: 'GoRan AI is founded', detail: 'The agency starts in Delhi with one goal: put practical AI to work inside everyday businesses.' },
  { year: 'Now', label: 'In production', detail: 'Calling agents, WhatsApp agents, AI CRMs and websites running for clients in agriculture, e-commerce, field services and robotics.' },
];

export default function About() {
  const { openCalBooking } = useCalBooking();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white relative overflow-hidden">
      <SEOHead
        title="About GoRan AI | AI Automation Agency Founded by Ashish Ranjan"
        description="GoRan AI is an AI automation agency based in Delhi, India, building custom AI agents, voice AI systems, WhatsApp bots, and autonomous business workflows. Learn about our mission, team, and approach."
        canonicalPath="/about"
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'About GoRan AI' },
        ])}
      />

      {/* ── Hero ── */}
      <section className="pt-32 md:pt-36 pb-20 relative">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(204, 210, 233, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(204, 210, 233, 0.35) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Soft yellow glow */}
        <div className="absolute top-[5%] right-[-8%] w-125 h-125 rounded-full bg-brand-yellow/5 blur-[90px] pointer-events-none" />

        <div className="w-full max-w-275 mx-auto px-6 relative z-10">
          {/* Back link */}
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">About GoRan AI</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-dark leading-[1.05] tracking-tight mb-6 max-w-3xl">
            We build the agents that{' '}
            <span className="text-brand-yellow">run your business.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-brand-text-muted text-lg md:text-xl leading-relaxed max-w-2xl mb-12">
            GoRan AI started from one belief: no business should be held back by manual work. We build AI agents that fit inside the tools you already use, so your team can spend its time on the work that matters.
          </p>

          {/* Meta stats row — same pattern as ServiceDetail hero */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted">Founded</span>
              <span className="text-sm font-semibold text-brand-dark">2025</span>
            </div>
            <div className="w-px h-8 bg-brand-border hidden sm:block" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted">Agents Deployed</span>
              <span className="text-sm font-semibold text-brand-dark">30+</span>
            </div>
            <div className="w-px h-8 bg-brand-border hidden sm:block" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted">Based in</span>
              <span className="text-sm font-semibold text-brand-dark">Delhi, India</span>
            </div>
            <div className="w-px h-8 bg-brand-border hidden sm:block" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted">System Uptime</span>
              <span className="text-sm font-semibold text-brand-dark">99.9%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision — editorial two-column ── */}
      <section className="py-20 border-t border-brand-border">
        <div className="w-full max-w-275 mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">

          {/* Left: narrative copy */}
          <div className="flex flex-col gap-14">

            {/* Mission */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted mb-4">Our Mission</p>
              <p className="text-brand-text-main text-lg leading-relaxed mb-6">
                To make serious AI available to every business, not only the big ones. We build systems that take over repetitive work, remove day-to-day friction and keep running as you grow, whatever your size, industry or technical setup.
              </p>
              <div className="rounded-xl p-6 border-l-4 bg-brand-yellow/5 border-l-brand-yellow">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-yellow mb-2">In practice</p>
                <p className="text-brand-text-main text-base leading-relaxed">
                  Every project starts with how your business really runs. We look at your enquiries, your follow-ups and the tools your team lives in, then build agents that take the repetitive 80% so your people can own the 20% that needs judgment.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted mb-4">Our Vision</p>
              <p className="text-brand-text-main text-lg leading-relaxed">
                A future where every business works alongside its own AI agents. People bring the judgment and the creativity, agents bring speed and consistency, and AI becomes a normal part of how a company runs, decides and grows.
              </p>
            </div>

            {/* Approach narrative */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted mb-4">How we work</p>
              <p className="text-brand-text-main text-lg leading-relaxed mb-4">
                We don't sell software licences or off-the-shelf chatbots. We work alongside your team, learn how the business really runs, and build the automation around that.
              </p>
              <p className="text-brand-text-muted text-base leading-relaxed">
                Our process runs in a straight line: audit, design, build, launch, support. Each step ends with something you can see and sign off, so you always know where things stand and what comes next.
              </p>
            </div>
          </div>

          {/* Right: sticky sidebar — same pattern as ServiceDetail */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-28 self-start">

            {/* Journey card */}
            <div className="rounded-xl border border-brand-border p-6 bg-white">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted mb-4">Our Journey</p>
              <div className="flex flex-col gap-0">
                {milestones.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-4 py-4 border-b border-brand-border last:border-b-0">
                    <span className="font-heading font-bold text-brand-yellow select-none bg-brand-yellow/10 min-w-12 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm">
                      {m.year}
                    </span>
                    <div>
                      <h4 className="font-heading font-semibold text-brand-dark text-sm">{m.label}</h4>
                      <p className="text-xs text-brand-text-muted leading-relaxed mt-0.5">{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA card — same dark style as ServiceDetail */}
            <div className="rounded-xl p-6 text-white" style={{ background: 'var(--glass-dark)' }}>
              <p className="font-heading font-bold text-lg mb-2 leading-snug">Want to work with us?</p>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Book a free 30-minute call. We'll look at how your business runs and tell you where AI can help.
              </p>
              <button
                onClick={openCalBooking}
                className="block w-full text-center font-semibold text-sm py-3 px-6 rounded-btn bg-brand-yellow text-brand-yellow-ink transition-all hover:opacity-90 hover:-translate-y-0.5 border-none cursor-pointer"
              >
                Book a Call
              </button>
            </div>

            {/* Quick links */}
            <div className="rounded-xl border border-brand-border p-6 bg-white">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted mb-4">Explore</p>
              <div className="flex flex-col gap-1">
                {[
                  { label: 'AI Audit', to: '/services/ai-audit' },
                  { label: 'Product Development', to: '/services/product-development' },
                  { label: 'Product Management', to: '/services/product-management' },
                  { label: 'AI Training', to: '/services/ai-training' },
                  { label: 'Our Process', to: '/process' },
                  { label: 'Meet the Founders', to: '/founder' },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="no-underline flex items-center justify-between py-2.5 border-b border-brand-border last:border-b-0 text-sm font-medium text-brand-text-main hover:text-brand-dark group transition-colors"
                  >
                    {link.label}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-text-muted transition-transform group-hover:translate-x-0.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles — numbered editorial list (same style as Home services) ── */}
      <section className="py-20 border-t border-brand-border">
        <div className="w-full max-w-275 mx-auto px-6 flex flex-col md:flex-row gap-12 md:gap-20 items-start">

          {/* Sticky heading — same pattern as Home "What we do for you" */}
          <div className="md:w-[35%] md:sticky md:top-32 flex flex-col gap-5 z-10">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-tight">
              Why partner with us
            </h2>
            <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
              Four principles behind every project we take on.
            </p>
          </div>

          {/* Right: numbered principles */}
          <div className="md:w-[65%] w-full flex flex-col gap-0">
            {principles.map((p, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 md:gap-12 py-10 border-b border-brand-border last:border-b-0 group">
                <span className="font-heading text-[4rem] md:text-[5.5rem] font-bold leading-none text-brand-border select-none transition-colors duration-300 group-hover:text-brand-yellow">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-3 pt-3 flex-1">
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-brand-dark tracking-tight">{p.title}</h3>
                  <p className="text-[0.9rem] text-brand-text-muted leading-relaxed max-w-130">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA strip ── */}
      <section className="py-20 border-t border-brand-border text-center">
        <div className="w-full max-w-275 mx-auto px-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted mb-6">Ready to automate?</h4>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-tight mb-6 max-w-2xl mx-auto">
            Let's build something <span className="text-brand-yellow">autonomous.</span>
          </h2>
          <p className="text-brand-text-muted text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10">
            Tell us which work you want off your plate. We'll plan it, build the agents, and set them up inside the tools you already use.
          </p>
          <button
            onClick={openCalBooking}
            className="inline-flex items-center gap-2 bg-brand-dark text-white font-semibold text-sm py-3.5 px-8 rounded-btn transition-all duration-300 hover:bg-brand-dark-hover hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border-none cursor-pointer group"
          >
            Book a Call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

    </main>
  );
}
