import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const timeline = [
  { stamp: '2014', event: 'Built first automation bot at 14 — a script that organised homework submissions by class period.' },
  { stamp: '2018', event: 'BS Computer Science, distributed systems focus. Thesis on event-driven workflow orchestration.' },
  { stamp: '2020', event: 'Led ML infrastructure at a Series-B startup. Shipped a real-time inference pipeline handling 2M+ requests daily.' },
  { stamp: '2023', event: 'Founded Synapse with a single conviction — businesses shouldn\'t be bottlenecked by manual workflows.' },
  { stamp: '2024', event: '40+ enterprise agents deployed. 500k daily automated executions. Zero critical incidents.' },
  { stamp: '2025', event: 'Opened London and Singapore offices. Scaled the team to 28 across three continents.' },
  { stamp: 'NOW', event: 'Architecting the next generation of autonomous agent systems. Building the default operating layer for modern business.' },
];

const signals = [
  { label: 'First Principles', desc: 'Every system built from the ground up, never from a template. No starter kits, no boilerplate.' },
  { label: 'Signal Over Noise', desc: 'Focus ruthlessly on what moves the needle. The best systems do one thing exceptionally well.' },
  { label: 'Human Augmentation', desc: 'Agents should amplify human judgment, not replace it. The machine handles the repetitive 80%.' },
  { label: 'Long-Term Architecture', desc: 'Design for five years from now. Short-term velocity never justifies long-term fragility.' },
  { label: 'Radical Simplicity', desc: 'The most powerful systems feel simple. Complexity is a liability, not a feature.' },
];

const stack = [
  { layer: 'FOUNDATION', items: 'Distributed systems, event-driven architecture, ML infrastructure' },
  { layer: 'MIDDLEWARE', items: 'Workflow orchestration, API design, data pipelines' },
  { layer: 'APPLICATION', items: 'Production agent systems, RAG, real-time inference' },
  { layer: 'INTERFACE', items: 'Team leadership, client strategy, system design consulting' },
  { layer: 'PHILOSOPHY', items: 'First-principles thinking, human-augmenting AI, durable systems' },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function Founder() {
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
        <div className="absolute top-[5%] right-[-8%] w-[500px] h-[500px] rounded-full bg-brand-yellow/5 blur-[90px] pointer-events-none" />

        <div className="w-full max-w-[1100px] mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Founder</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-[clamp(2.8rem,8vw,6rem)] font-heading font-bold text-brand-dark leading-[0.9] tracking-[-0.04em] mb-3 select-none">
                Alex<br />Venter
              </h1>

              <div className="h-px w-full max-w-[300px] bg-brand-border mb-4" />

              <p className="text-sm md:text-base font-medium text-brand-text-muted tracking-wide uppercase mb-6">
                Founder &amp; Principal Architect
              </p>

              <motion.p
                className="text-lg md:text-xl text-brand-text-muted leading-relaxed max-w-2xl border-l-4 border-brand-yellow pl-5"
                {...fadeUp}
              >
                A system architect who builds systems that build systems. Every line of code, every architecture decision, every engagement — driven by the belief that the best automation is invisible.
              </motion.p>
            </div>

            <div className="w-full aspect-[3/4] max-h-[500px] border border-brand-border bg-brand-bg-light overflow-hidden">
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
        <div className="w-full max-w-[1100px] mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Core Architecture</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <motion.div className="relative" {...fadeUp}>
              <div className="sticky top-32">
                <div className="flex flex-col items-start gap-6">
                  <div className="w-full aspect-square max-w-[200px] border border-brand-border bg-brand-bg-light flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full border-2 border-brand-yellow flex items-center justify-center">
                        <span className="font-heading font-bold text-brand-dark text-xl">AV</span>
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
                      <span className="text-brand-yellow">●</span> uptime: 6yr
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
                Before founding Synapse, Alex built automation systems at the intersection of distributed computing and human workflow design. He started coding at fourteen — not to build apps, but to automate his own chores. That impulse — <em>why do this manually?</em> — never left.
              </p>
              <p className="text-brand-text-main">
                He cut his teeth at a Series-B startup where he led ML infrastructure and shipped systems that processed millions of events daily. But he kept noticing the same pattern: teams spending 70% of their time on work that software could handle.
              </p>
              <p className="text-brand-text-main">
                Synapse was founded to close that gap. Not with chatbots or dashboards, but with deeply integrated agent systems that become part of how a company operates. Alex has architected solutions for logistics, fintech, healthcare, and SaaS — each one built from first principles, never from a template.
              </p>
              <div className="border-l-4 border-brand-yellow pl-5 py-2 mt-2">
                <p className="text-brand-text-muted italic">
                  "The best automation is invisible. It doesn't announce itself. It just makes the hard things easy."
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
        <div className="w-full max-w-[1100px] mx-auto px-6">
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
                <span className="font-mono text-xs font-semibold text-brand-yellow min-w-[56px] shrink-0 pt-0.5 select-none tracking-wider">
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
            <span className="text-white/30 text-xs font-mono">log_end · 7 entries</span>
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
        <div className="w-full max-w-[1100px] mx-auto px-6 relative z-10">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-yellow" />
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Neural Map</span>
            </div>
            <p className="text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight mb-2 max-w-2xl">
              The signals that guide every system.
            </p>
            <p className="text-brand-text-muted text-base max-w-xl mb-14">
              Five principles that define how Alex architects agents, builds teams, and chooses what to build next.
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

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 relative z-10">
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
                  <p className="text-xs text-brand-text-muted leading-relaxed max-w-[220px]">{s.desc}</p>
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
        <div className="w-full max-w-[1100px] mx-auto px-6">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-yellow" />
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">The Stack</span>
            </div>
            <p className="text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight mb-2 max-w-2xl">
              What drives the architecture.
            </p>
            <p className="text-brand-text-muted text-base max-w-xl mb-14">
              Every layer of the stack informs how Alex approaches a new system — from infrastructure decisions to team dynamics.
            </p>
          </motion.div>

          <div className="flex flex-col items-center">
            {stack.map((s, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  className={`w-full max-w-[${isEven ? '700' : '600'}px] flex flex-col sm:flex-row items-stretch border border-brand-border ${idx === 0 ? '' : 'border-t-0'}`}
                  style={{ maxWidth: isEven ? '700px' : '600px' }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className={`w-full sm:w-[140px] shrink-0 flex items-center justify-center px-4 py-3 sm:py-4 ${isEven ? 'bg-brand-yellow/10' : 'bg-transparent'}`}
                  >
                    <span className={`font-heading font-bold text-xs tracking-[0.2em] ${isEven ? 'text-brand-yellow' : 'text-brand-text-muted'}`}>
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
              // 5 layers · 15+ years of compound building
            </span>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────── */}
      {/* CTA */}
      {/* ──────────────────────────────────────── */}
      <section className="py-20 border-t border-brand-border text-center">
        <div className="w-full max-w-[1100px] mx-auto px-6">
          <motion.div {...fadeUp}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted mb-6">Work with the founder</h4>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-tight mb-6 max-w-2xl mx-auto">
              Let's build something <span className="text-brand-yellow">architected to last.</span>
            </h2>
            <p className="text-brand-text-muted text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10">
              Every engagement starts with a conversation. Tell us about the system you want to build — Alex personally reviews every new project.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 no-underline bg-brand-dark text-white font-semibold text-sm py-3.5 px-8 rounded-full transition-all duration-300 hover:bg-brand-dark-hover hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] group"
            >
              Start a Conversation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
