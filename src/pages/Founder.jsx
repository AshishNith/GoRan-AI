import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCalBooking } from '../components/CalBookingModal';

const timeline = [
  { stamp: '2020', event: 'Built first automation system to streamline repetitive desktop workflows.' },
  { stamp: '2021', event: 'Started deep focus on AI, machine learning, and intelligent systems.' },
  { stamp: '2022', event: 'Developed full-stack web and backend systems for business automation.' },
  { stamp: '2023', event: 'Built scalable AI workflows and real-time integrations for operational use cases.' },
  { stamp: '2024', event: 'Led AI infrastructure and automation systems for high-growth startup environments.' },
  { stamp: '2025', event: 'Founded GoRan AI to help businesses implement practical AI systems.' },
  { stamp: '2025', event: 'Delivered AI solutions across CRM, voice AI, automation, and lead generation.' },
  { stamp: 'NOW', event: 'Building AI-native business systems and autonomous operational agents.' },
];

const signals = [
  { label: 'Business Impact First', desc: 'AI is only valuable when it improves operations, revenue, or efficiency.' },
  { label: 'Build for Production', desc: 'Systems should be scalable, reliable, and deployable in real business environments.' },
  { label: 'Automation with Clarity', desc: 'Great AI systems reduce complexity instead of adding more tools.' },
  { label: 'Speed Matters', desc: 'Rapid iteration and deployment create competitive advantage.' },
  { label: 'Human-Centered Systems', desc: 'The best automation empowers teams instead of replacing them blindly.' },
  { label: 'Long-Term Thinking', desc: 'Build infrastructure that grows with the business, not temporary hacks.' },
];

const stack = [
  { layer: 'INFRASTRUCTURE', items: 'AWS, Docker, VPS, Cloud Deployments, CI/CD' },
  { layer: 'BACKEND SYSTEMS', items: 'Node.js, FastAPI, Express.js, Redis, PostgreSQL, MongoDB' },
  { layer: 'AI MODELS', items: 'GPT-4o, Gemini, Claude, Vision Models, Realtime AI APIs' },
  { layer: 'AGENT ARCHITECTURE', items: 'LangGraph, CrewAI, Multi-Agent Systems, Custom Orchestrators' },
  { layer: 'BUSINESS AUTOMATION', items: 'CRM Systems, WhatsApp Automation, Lead Pipelines, AI Dashboards' },
  { layer: 'INTERFACES', items: 'React.js, Next.js, Tailwind, Mobile Apps, Voice Interfaces, APIs' },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function Founder() {
  const { openCalBooking } = useCalBooking();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white relative overflow-hidden">

      {/* ──────────────────────────────────────── */}
      {/* HERO — System Identity */}
      {/* ──────────────────────────────────────── */}
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
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 no-underline text-brand-text-muted text-sm font-medium mb-10 group transition-colors hover:text-brand-dark"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Founder</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-[clamp(2.8rem,8vw,6rem)] font-heading font-bold text-brand-dark leading-[0.9] tracking-[-0.04em] mb-3 select-none">
                Ashish<br />Ranjan
              </h1>

              <div className="h-px w-full max-w-75 bg-brand-border mb-4" />

              <p className="text-sm md:text-base font-medium text-brand-text-muted tracking-wide uppercase mb-6">
                Founder &amp; AI Systems Architect
              </p>

              <motion.p
                className="text-lg md:text-xl text-brand-text-muted leading-relaxed max-w-2xl border-l-4 border-brand-yellow pl-5"
                {...fadeUp}
              >
                Ashish Ranjan founded GoRan AI with a simple belief — AI should not just look impressive, it should solve real operational problems.
              </motion.p>
            </div>

            <div className="w-full aspect-3/4 max-h-125 border border-brand-border bg-brand-bg-light overflow-hidden">
              <img
                src="/hero_bg.png"
                alt="Founder portrait placeholder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────── */}
      {/* CORE ARCHITECTURE — Biography */}
      {/* ──────────────────────────────────────── */}
      <section className="py-24 border-t border-brand-border relative">
        <div className="w-full max-w-275 mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Core Architecture</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <motion.div className="relative" {...fadeUp}>
              <div className="sticky top-32">
                <div className="flex flex-col items-start gap-6">
                  <div className="w-full aspect-square max-w-50 border border-brand-border bg-brand-bg-light flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full border-2 border-brand-yellow flex items-center justify-center">
                        <span className="font-heading font-bold text-brand-dark text-xl">AR</span>
                      </div>
                      <div className="w-16 h-px bg-brand-border" />
                      <div className="w-8 h-2 bg-brand-yellow/30" />
                      <div className="w-12 h-px bg-brand-border" />
                      <div className="w-4 h-4 rounded-full border border-brand-yellow/50" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-brand-text-muted">
                      <span className="text-green-600">●</span> system_active
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-brand-text-muted">
                      <span className="text-brand-yellow">●</span> uptime: since 2025
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-brand-text-muted">
                      <span className="text-blue-500">●</span> throughput: high
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="flex flex-col gap-6 text-base md:text-lg leading-relaxed" {...fadeUp}>
              <p className="text-brand-text-main">
                Ashish Ranjan founded GoRan AI with a simple belief — AI should not just look impressive, it should solve real operational problems. What started as experiments in workflow automation evolved into building production-grade AI systems for businesses across healthcare, agriculture, education, logistics, consulting, and customer operations.
              </p>
              <p className="text-brand-text-main">
                Today, he focuses on designing AI infrastructure that helps companies automate workflows, improve decision-making, and scale operations intelligently.
              </p>
              <div className="border-l-4 border-brand-yellow pl-5 py-2 mt-2">
                <p className="text-brand-text-muted italic">
                  "GoRan AI exists at the intersection of engineering and business operations — building systems that don't just demonstrate AI capability, but create measurable business outcomes in the real world."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────── */}
      {/* EXECUTION LOG — Timeline (terminal style) */}
      {/* ──────────────────────────────────────── */}
      <section className="py-24 border-t border-brand-border" style={{ background: '#0E0E0E' }}>
        <div className="w-full max-w-275 mx-auto px-6">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-yellow" />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/50">Execution Log</span>
            </div>

            <p className="text-white/30 text-xs font-mono mb-8 select-none">
              $ cat /var/log/founder/timeline.log
            </p>
          </motion.div>

          <div className="flex flex-col gap-0">
            {timeline.map((entry, idx) => (
              <motion.div
                key={idx}
                className="group flex items-start gap-5 py-5 border-t border-white/10 first:border-t-0"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-xs font-semibold text-brand-yellow min-w-14 shrink-0 pt-0.5 select-none tracking-wider">
                  [{entry.stamp}]
                </span>
                <span className="w-px h-auto bg-white/10 self-stretch shrink-0" />
                <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                  {entry.event}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-8 flex items-center gap-2" {...fadeUp}>
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/30 text-xs font-mono">log_end · {timeline.length} entries</span>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────── */}
      {/* NEURAL MAP — Values as connected nodes */}
      {/* ──────────────────────────────────────── */}
      <section className="py-24 border-t border-brand-border relative">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 50%, #F6C744 0%, transparent 50%), radial-gradient(circle at 75% 50%, #F6C744 0%, transparent 50%)',
          }}
        />
        <div className="w-full max-w-275 mx-auto px-6 relative z-10">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-yellow" />
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Neural Map</span>
            </div>
            <p className="text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight mb-2 max-w-2xl">
              The signals that guide every system.
            </p>
            <p className="text-brand-text-muted text-base max-w-xl mb-14">
              Six principles that define how Ashish architects agents, builds teams, and chooses what to build next.
            </p>
          </motion.div>

          <div className="relative">
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block" viewBox="0 0 1100 600" preserveAspectRatio="none">
              <line x1="110" y1="50" x2="275" y2="50" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="275" y1="50" x2="440" y2="50" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="440" y1="50" x2="605" y2="50" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="605" y1="50" x2="770" y2="50" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="770" y1="50" x2="935" y2="50" stroke="#E5E7EB" strokeWidth="1" />
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 relative z-10">
              {signals.map((s, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col items-center text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="w-14 h-14 rounded-full border-2 border-brand-border flex items-center justify-center mb-4 transition-colors duration-300 group-hover:border-brand-yellow">
                    <span className="font-heading font-bold text-sm text-brand-dark">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-brand-dark text-sm mb-2">{s.label}</h3>
                  <p className="text-xs text-brand-text-muted leading-relaxed max-w-55">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────── */}
      {/* THE STACK — Vertical stack diagram */}
      {/* ──────────────────────────────────────── */}
      <section className="py-24 border-t border-brand-border bg-brand-bg-light">
        <div className="w-full max-w-275 mx-auto px-6">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-yellow" />
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">The Stack</span>
            </div>
            <p className="text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight mb-2 max-w-2xl">
              What drives the architecture.
            </p>
            <p className="text-brand-text-muted text-base max-w-xl mb-14">
              Every layer of the stack informs how Ashish approaches a new system — from infrastructure decisions to interface engineering.
            </p>
          </motion.div>

          <div className="flex flex-col items-center">
            {stack.map((s, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  className="w-full flex flex-col sm:flex-row items-stretch border border-brand-border"
                  style={{ maxWidth: isEven ? '700px' : '600px', borderTop: idx === 0 ? '1px solid var(--brand-border)' : 'none' }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className={`w-full sm:w-40 shrink-0 flex items-center justify-center px-4 py-3 sm:py-4 ${isEven ? 'bg-brand-yellow/10' : 'bg-transparent'}`}
                  >
                    <span className={`font-heading font-bold text-xs tracking-[0.2em] text-center ${isEven ? 'text-brand-yellow' : 'text-brand-text-muted'}`}>
                      {s.layer}
                    </span>
                  </div>
                  <div className="flex-1 flex items-center px-4 py-3 sm:py-4 border-t sm:border-t-0 sm:border-l border-brand-border">
                    <p className="text-sm text-brand-text-muted leading-relaxed">{s.items}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div className="mt-8 text-center" {...fadeUp}>
            <span className="text-xs font-mono text-brand-text-muted">
              // {stack.length} layers · Architecting custom AI systems
            </span>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────── */}
      {/* CTA */}
      {/* ──────────────────────────────────────── */}
      <section className="py-20 border-t border-brand-border text-center">
        <div className="w-full max-w-275 mx-auto px-6">
          <motion.div {...fadeUp}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted mb-6">Work with the founder</h4>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-tight mb-6 max-w-2xl mx-auto">
              Let's build something <span className="text-brand-yellow">architected to last.</span>
            </h2>
            <p className="text-brand-text-muted text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10">
              Every engagement starts with a conversation. Tell us about the system you want to build — Ashish personally reviews every new project.
            </p>
            <button
              onClick={openCalBooking}
              className="inline-flex items-center gap-2 bg-brand-dark text-white font-semibold text-sm py-3.5 px-8 rounded-full transition-all duration-300 hover:bg-brand-dark-hover hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border-none cursor-pointer group"
            >
              Start a Conversation
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
