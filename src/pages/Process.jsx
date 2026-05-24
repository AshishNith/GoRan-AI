import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    title: 'Discovery & Audit',
    subtitle: 'Understanding your operational reality',
    body: 'We embed with your team to map every workflow, data source, and bottleneck. Through stakeholder interviews, stack analysis, and process shadowing, we build a complete picture of where AI can have the highest impact — and where it shouldn\'t be applied at all.',
    deliverables: ['Current-state workflow maps', 'Bottleneck analysis & ROI scoring', 'Data source inventory', 'Stakeholder alignment document'],
    duration: '1–2 weeks',
    color: '#F6C744',
  },
  {
    number: '02',
    title: 'Architecture & Design',
    subtitle: 'Blueprinting the agent system',
    body: 'We translate your operational goals into a formal system architecture. This includes agent topology, data flow diagrams, vector storage schemas, API contracts, security boundaries, and failover strategies — every technical decision documented before a single line of code is written.',
    deliverables: ['System architecture document', 'Agent interaction diagrams', 'API & integration specifications', 'Security & compliance review'],
    duration: '1–2 weeks',
    color: '#A855F7',
  },
  {
    number: '03',
    title: 'Build & Development',
    subtitle: 'Constructing your production agents',
    body: 'Our engineers build the agent system using modular, auditable components. We develop LLM pipelines, RAG engines, tool integrations, and orchestration layers — with daily progress updates and incremental demos so you never wonder where things stand.',
    deliverables: ['Working agent system', 'Integration with your stack', 'Internal testing environment', 'Daily build logs & demos'],
    duration: '3–6 weeks',
    color: '#3B82F6',
  },
  {
    number: '04',
    title: 'Testing & Security',
    subtitle: 'Hardening before deployment',
    body: 'Every agent undergoes rigorous testing: unit tests on individual tools, integration tests on multi-step workflows, adversarial prompts to probe safety boundaries, and load testing at 2x your expected traffic. We also run a full security audit — data isolation, encryption, access controls — before anything reaches production.',
    deliverables: ['Test coverage report', 'Security audit findings', 'Load test results', 'Safety loop verification'],
    duration: '1–2 weeks',
    color: '#4ADE80',
  },
  {
    number: '05',
    title: 'Deployment & Launch',
    subtitle: 'Going live with zero disruption',
    body: 'We deploy your agent system into production using gradual rollouts with automated rollback capabilities. Your team gets hands-on training, runbooks, and a dedicated launch support window. We monitor every metric closely for the first 72 hours to ensure stability.',
    deliverables: ['Production deployment', 'Team training & runbooks', 'Monitoring dashboards', 'Launch support window'],
    duration: '1 week',
    color: '#F59E0B',
  },
  {
    number: '06',
    title: 'Support & Iteration',
    subtitle: 'Continuous improvement',
    body: 'Post-launch, we provide ongoing monitoring, performance optimisation, and iterative enhancements. Agents learn from real usage patterns, and we proactively suggest improvements as your business evolves. You get a partner, not just a deliverable.',
    deliverables: ['Ongoing performance monitoring', 'Quarterly optimisation reviews', 'Priority support channel', 'Continuous improvement roadmap'],
    duration: 'Ongoing',
    color: '#EC4899',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function Process() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white relative overflow-hidden">

      {/* ── Hero ── */}
      <section className="pt-36 pb-20 relative">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(229, 231, 235, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 231, 235, 0.25) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-[5%] right-[-8%] w-[500px] h-[500px] rounded-full bg-brand-yellow/5 blur-[90px] pointer-events-none" />

        <div className="w-full max-w-[1100px] mx-auto px-6 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 no-underline text-brand-text-muted text-sm font-medium mb-10 group transition-colors hover:text-brand-dark"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Our Process</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-dark leading-[1.05] tracking-tight mb-6 max-w-3xl">
            From discovery to{' '}
            <span className="text-brand-yellow">deployed agents.</span>
          </h1>

          <p className="text-brand-text-muted text-lg md:text-xl leading-relaxed max-w-2xl mb-12">
            A proven, linear process that takes your automation vision from initial audit to production deployment — with clear deliverables and no surprises at every stage.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted">Phases</span>
              <span className="text-sm font-semibold text-brand-dark">6</span>
            </div>
            <div className="w-px h-8 bg-brand-border hidden sm:block" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted">Average Timeline</span>
              <span className="text-sm font-semibold text-brand-dark">8–14 Weeks</span>
            </div>
            <div className="w-px h-8 bg-brand-border hidden sm:block" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted">Delivery</span>
              <span className="text-sm font-semibold text-brand-dark">Production-Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process Steps ── */}
      <section className="py-20 border-t border-brand-border relative">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 20%, #F6C744 0%, transparent 50%), radial-gradient(circle at 70% 80%, #F6C744 0%, transparent 50%)',
          }}
        />
        <div className="w-full max-w-[1100px] mx-auto px-6 relative z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-8 md:gap-16 py-14 border-b border-brand-border last:border-b-0 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Step Number */}
              <span
                className="font-heading text-[4rem] md:text-[6rem] font-bold leading-none select-none transition-colors duration-300"
                style={{ color: step.color }}
              >
                {step.number}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-4 pt-2 flex-1 min-w-0">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted">
                    {step.duration}
                  </span>
                  <h2 className="text-xl md:text-3xl font-heading font-bold text-brand-dark tracking-tight">
                    {step.title}
                  </h2>
                  <p className="text-sm font-medium text-brand-text-muted">
                    {step.subtitle}
                  </p>
                </div>
                <p className="text-[0.92rem] text-brand-text-muted leading-relaxed max-w-[640px]">
                  {step.body}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {step.deliverables.map((d, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-[11px] font-semibold border transition-all duration-200"
                      style={{
                        background: `${step.color}0d`,
                        borderColor: `${step.color}20`,
                        color: step.color,
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Methodology Section ── */}
      <section className="py-24 border-t border-brand-border relative" style={{ background: '#0E0E0E' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        <div className="w-full max-w-[1100px] mx-auto px-6 relative z-10">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-yellow" />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/50">Methodology</span>
            </div>
            <p className="text-2xl md:text-4xl font-heading font-bold text-white leading-tight mb-6 max-w-3xl">
              Every engagement follows the same principles — regardless of scope, industry, or complexity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {[
              {
                title: 'Linear by design',
                body: 'Each phase has clear entry and exit criteria. No skipping ahead, no scope creep. You always know exactly where we are and what comes next.',
              },
              {
                title: 'Documented throughout',
                body: 'Every decision, architecture choice, and configuration is recorded. You own the documentation — not as an afterthought, but as a deliverable.',
              },
              {
                title: 'Built to evolve',
                body: 'Systems are designed with future iterations in mind. Adding new agents, data sources, or capabilities later doesn\'t require starting from scratch.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-heading text-lg font-bold text-brand-yellow mb-3 block">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="font-heading font-semibold text-white text-base mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-8 flex items-center gap-2" {...fadeUp}>
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/30 text-xs font-mono">principles_active · 3 nodes</span>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ / Common Questions ── */}
      <section className="py-20 border-t border-brand-border relative">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(229, 231, 235, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 231, 235, 0.25) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="w-full max-w-[1100px] mx-auto px-6 relative z-10">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-yellow" />
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Common Questions</span>
            </div>
            <p className="text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight mb-12 max-w-2xl">
              Everything you need to know about how we work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              {
                q: 'How long does a typical engagement take?',
                a: 'Most projects run 8–14 weeks from kickoff to production deployment. The timeline depends on complexity, number of integrations, and security requirements. We\'ll give you a firm estimate during the scoping phase.',
              },
              {
                q: 'Do I need a technical team to work with you?',
                a: 'Not at all. We handle the entire technical implementation. You just need someone who understands your current workflows and can make decisions about what to automate. We guide the rest.',
              },
              {
                q: 'What happens after the agent is deployed?',
                a: 'We provide ongoing monitoring, performance optimisation, and priority support. Agents are living systems — they improve over time as we analyse usage patterns and your business evolves.',
              },
              {
                q: 'Can you work with our existing tools?',
                a: 'Yes. We integrate with any system that has an API — CRMs, ERPs, communication platforms, databases, and custom internal tools. During the audit phase, we catalogue your entire stack.',
              },
              {
                q: 'How do you handle data security?',
                a: 'Security is built into every layer of our process. We use encrypted pipelines, private LLM instances, zero data retention by default, and follow SOC 2-compliant methodologies. Every deployment includes a full security audit.',
              },
              {
                q: 'What if we need to change scope mid-project?',
                a: 'Our linear process includes built-in review gates at the end of each phase. If priorities shift, we assess the impact and adjust the plan transparently — no surprises, no hidden costs.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="font-heading font-semibold text-brand-dark text-sm">{item.q}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-brand-border text-center">
        <div className="w-full max-w-[1100px] mx-auto px-6">
          <motion.div {...fadeUp}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted mb-6">Ready to start?</h4>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-tight mb-6 max-w-2xl mx-auto">
              Let's build something{' '}
              <span className="text-brand-yellow">autonomous.</span>
            </h2>
            <p className="text-brand-text-muted text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10">
              Tell us about the workflows you want to automate. We'll map the architecture, build the agents, and deploy them into your stack.
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
