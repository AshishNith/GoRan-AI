import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClientMarquee from '../components/ClientMarquee';
import StepsShowcase from '../components/StepsShowcase';
import ScrollStack, { ScrollStackItem } from '../components/ui/ScrollStack';
import ScrollAdventure from '../components/ui/animated-scroll';
import VoiceAgent from '../components/VoiceAgent';
import { LampContainer } from '../components/ui/lamp';

export default function Home() {



  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="section-hero pt-36 pb-24 text-center relative min-h-screen flex items-center overflow-hidden" id="sandbox">
        {/* Subtle lamp glow behind headline */}
        <LampContainer className="absolute inset-0" />

        {/* Decorative background elements */}
        <div className="absolute top-[10%] left-[-5%] w-100 h-100 rounded-full bg-brand-yellow/4 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[15%] right-[-5%] w-87.5 h-87.5 rounded-full bg-purple-500/4 blur-[100px] pointer-events-none" />

        <div className="w-full max-w-300 mx-auto px-6 relative z-10 flex flex-col items-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-text-muted">
              Trusted AI Agency
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-bold text-brand-dark leading-none text-[clamp(2.5rem,7vw,5rem)] tracking-tight max-w-225">
            The AI agency that{' '}
            <span className="relative inline-block">
              <span className="text-brand-yellow">builds for you.</span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.75 bg-brand-yellow/30 rounded-full hidden md:block" />
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-brand-text-muted text-base md:text-lg max-w-135 leading-relaxed mt-5 mb-8">
            Describe the workflow you need automated. We construct, test, and deploy production-grade agents connected to your tools — in days, not months.
          </p>

          {/* Capability badges */}
          <div className="inline-flex flex-wrap justify-center gap-2 mb-8">
            {[
              { label: 'Custom Agents', color: '#E28C00', bg: 'rgba(245,166,35,0.1)' },
              { label: 'Workflows', color: '#A855F7', bg: 'rgba(192,132,252,0.1)' },
              { label: 'Databases', color: '#16A34A', bg: 'rgba(74,222,128,0.1)' },
              { label: 'APIs', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
              { label: 'Slack', color: '#B45309', bg: 'rgba(180,83,9,0.1)' },
            ].map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold border border-transparent transition-all duration-200 hover:scale-105 cursor-default select-none"
                style={{ background: badge.bg, color: badge.color }}
              >
                {badge.label}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-yellow text-brand-text-main font-semibold text-sm py-3 px-7 rounded-xl transition-all duration-300 hover:bg-brand-yellow-hover hover:-translate-y-0.5 active:translate-y-0"
            >
              Start a Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 border-2 border-brand-dark text-brand-dark font-semibold text-sm py-3 px-7 rounded-xl transition-all duration-300 hover:bg-brand-dark hover:text-white hover:-translate-y-0.5 active:translate-y-0"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>



      {/* Client Showcase Section */}
      <ClientMarquee />

      {/* Delivery Process Section */}
      <section className="py-24 bg-white" id="steps">
        <div className="w-full max-w-300 mx-auto px-6">
          <StepsShowcase />
        </div>
      </section>

      {/* Case Studies Section */}
      <ScrollAdventure />

      {/* Services Section */}
      <section className="py-24 bg-white border-t border-brand-border" id="services">
        <div className="w-full max-w-300 mx-auto px-6 flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          <div className="md:w-[35%] md:sticky md:top-32 flex flex-col gap-5 z-10">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-tight">What we do for you</h2>
            <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">From strategy to execution — we embed AI into your business across every stage.</p>
          </div>
          <div className="md:w-[65%] w-full">
            <ScrollStack className="w-full">
              <ScrollStackItem itemClassName="group">
                <Link to="/services/ai-audit" className="no-underline text-inherit block w-full h-full">
                  <div className="flex items-start gap-8 md:gap-12">
                    <span className="font-heading text-[4rem] md:text-[5.5rem] font-bold leading-none text-brand-border select-none transition-colors duration-300 group-hover:text-brand-yellow">01</span>
                    <div className="flex flex-col gap-3 pt-3 flex-1">
                      <h3 className="text-xl md:text-2xl font-heading font-semibold text-brand-dark tracking-tight">AI Audit</h3>
                      <p className="text-[0.9rem] text-brand-text-muted leading-relaxed max-w-130">We analyse your existing stack, workflows, and data pipelines to identify exactly where AI can cut costs, reduce manual effort, and unlock untapped leverage — with a clear implementation roadmap.</p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-text-muted mt-2 transition-colors duration-200 group-hover:text-brand-dark">
                        Explore
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollStackItem>

              <ScrollStackItem itemClassName="group">
                <Link to="/services/product-development" className="no-underline text-inherit block w-full h-full">
                  <div className="flex items-start gap-8 md:gap-12">
                    <span className="font-heading text-[4rem] md:text-[5.5rem] font-bold leading-none text-brand-border select-none transition-colors duration-300 group-hover:text-brand-yellow">02</span>
                    <div className="flex flex-col gap-3 pt-3 flex-1">
                      <h3 className="text-xl md:text-2xl font-heading font-semibold text-brand-dark tracking-tight">Product Development</h3>
                      <p className="text-[0.9rem] text-brand-text-muted leading-relaxed max-w-130">We design and build AI-powered products end-to-end — from LLM integration and agentic backends to polished user interfaces — so you go from idea to production without growing an in-house team.</p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-text-muted mt-2 transition-colors duration-200 group-hover:text-brand-dark">
                        Explore
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollStackItem>

              <ScrollStackItem itemClassName="group">
                <Link to="/services/product-management" className="no-underline text-inherit block w-full h-full">
                  <div className="flex items-start gap-8 md:gap-12">
                    <span className="font-heading text-[4rem] md:text-[5.5rem] font-bold leading-none text-brand-border select-none transition-colors duration-300 group-hover:text-brand-yellow">03</span>
                    <div className="flex flex-col gap-3 pt-3 flex-1">
                      <h3 className="text-xl md:text-2xl font-heading font-semibold text-brand-dark tracking-tight">Product Management</h3>
                      <p className="text-[0.9rem] text-brand-text-muted leading-relaxed max-w-130">Embed an experienced AI product manager into your team. We own the roadmap, prioritise features, manage delivery, and ensure every sprint moves your product closer to measurable business outcomes.</p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-text-muted mt-2 transition-colors duration-200 group-hover:text-brand-dark">
                        Explore
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollStackItem>

              <ScrollStackItem itemClassName="group">
                <Link to="/services/ai-training" className="no-underline text-inherit block w-full h-full">
                  <div className="flex items-start gap-8 md:gap-12">
                    <span className="font-heading text-[4rem] md:text-[5.5rem] font-bold leading-none text-brand-border select-none transition-colors duration-300 group-hover:text-brand-yellow">04</span>
                    <div className="flex flex-col gap-3 pt-3 flex-1">
                      <h3 className="text-xl md:text-2xl font-heading font-semibold text-brand-dark tracking-tight">AI Training & Enablement</h3>
                      <p className="text-[0.9rem] text-brand-text-muted leading-relaxed max-w-130">Upskill your team with hands-on workshops, live walkthroughs, and custom learning programmes — from prompt engineering fundamentals to building internal AI tools your staff will actually use.</p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-text-muted mt-2 transition-colors duration-200 group-hover:text-brand-dark">
                        Explore
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollStackItem>
            </ScrollStack>
          </div>
        </div>
      </section>

      {/* Trust Ratings Section */}
      <section className="py-20 border-t border-brand-border bg-white text-center" id="trust">
        <div className="w-full max-w-300 mx-auto px-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted mb-10">Engineered to industry leading standards</h4>
          <div className="grid grid-cols-3 gap-6 max-w-200 mx-auto max-sm:grid-cols-1 max-sm:gap-8">
            <div className="flex flex-col gap-2">
              <div className="font-heading text-4xl md:text-5xl font-bold text-brand-dark leading-none">99.9%</div>
              <div className="text-sm text-brand-text-muted font-medium">System Uptime</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-heading text-4xl md:text-5xl font-bold text-brand-dark leading-none">500k+</div>
              <div className="text-sm text-brand-text-muted font-medium">Agent Executions Daily</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-heading text-4xl md:text-5xl font-bold text-brand-dark leading-none">4.9/5</div>
              <div className="text-sm text-brand-text-muted font-medium">Client Satisfaction Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden" id="faq">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-[-10%] w-150 h-150 rounded-full bg-brand-yellow/3 blur-[120px]" />
          <div className="absolute bottom-0 right-[-10%] w-125 h-125 rounded-full bg-purple-500/3 blur-[100px]" />
        </div>
        <div className="w-full max-w-225 mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight">
              Answers to common questions
            </h2>
          </div>
          <FaqChatList />
        </div>
      </section>

      {/* Interactive Voice Agent Showcase */}
      <VoiceAgent />
    </main>
  );
}

function FaqChatList() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  const faqs = [
    {
      q: "What exactly is an AI Agent, and how is it different from a chatbot?",
      a: "An AI Agent is an autonomous system that perceives its environment, makes decisions, and takes actions to achieve specific goals. Unlike chatbots that only respond to prompts, agents execute multi-step workflows — they can query databases, send emails, update CRMs, escalate issues, and learn from outcomes without human intervention."
    },
    {
      q: "How long does a typical AI Agent implementation take?",
      a: "Most projects run 4–8 weeks from discovery to deployment. A standard AI Audit takes 5 days. Custom agent builds typically land at 6 weeks. We use pre-built connectors and modular architectures to ship fast without cutting corners on safety or reliability."
    },
    {
      q: "Do I need a technical team to maintain the agent after deployment?",
      a: "Not at all. We design every agent with self-healing fallbacks, monitoring dashboards, and human-in-the-loop escalation paths. Your ops team manages outcomes, not code. We also provide a 30-day post-launch support window for tuning and optimization."
    },
    {
      q: "What systems can your agents integrate with?",
      a: "We integrate with virtually any API — CRMs (Salesforce, HubSpot), communication tools (Slack, Teams, email), databases (Postgres, BigQuery), ERPs, and custom internal tools. If it has an API, we can connect it. For proprietary systems, we build custom connectors."
    },
    {
      q: "How do you handle data security and privacy?",
      a: "Security is baked into every layer. All data is encrypted at rest and in transit. Agents operate in isolated containers with role-based access controls. We never train on client data. Every action is logged to an immutable audit trail. SOC 2 compliance is in progress."
    },
    {
      q: "What happens if the agent makes a mistake?",
      a: "Every agent includes configurable guardrails, confidence thresholds, and human approval gates for high-stakes actions. If a decision falls below the confidence threshold, the agent escalates to a human operator. You maintain full control over what the agent can and cannot do autonomously."
    },
  ];

  const colors = ['#3B82F6', '#C084FC', '#4ADE80', '#F5A623', '#F472B6', '#60A5FA'];

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        const color = colors[i % colors.length];

        return (
          <div
            key={i}
            className={`rounded-2xl border transition-all duration-300 cursor-pointer ${
              isOpen
                ? 'border-transparent shadow-xl shadow-black/4'
                : 'border-brand-border hover:border-brand-text-muted/30'
            }`}
            style={{ background: isOpen ? '#0E0E0E' : '#FAFAFA' }}
            onClick={() => toggle(i)}
          >
            {/* Question row */}
            <div className="flex items-center gap-4 px-6 py-5">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold font-heading transition-colors duration-300"
                style={{
                  background: isOpen ? `${color}20` : `${color}10`,
                  color: isOpen ? color : '#171717',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`flex-1 text-sm font-semibold leading-snug transition-colors duration-300 ${
                  isOpen ? 'text-white' : 'text-brand-dark'
                }`}
              >
                {faq.q}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isOpen ? '#F6C744' : '#737373'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>

            {/* Answer — collapsible */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6 pt-0">
                <div className="w-full h-px bg-white/8 mb-5" />
                <p className="text-sm leading-relaxed text-white/70">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
