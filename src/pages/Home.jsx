import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClientMarquee from '../components/ClientMarquee';
import StepsShowcase from '../components/StepsShowcase';
import ScrollStack, { ScrollStackItem } from '../components/ui/ScrollStack';
import ScrollAdventure from '../components/ui/animated-scroll';
import VoiceAgent from '../components/VoiceAgent';
import { useCalBooking } from '../components/CalBookingModal';
import TestimonialsSection from '../components/TestimonialsSection';

export default function Home() {
  const { openCalBooking } = useCalBooking();



  return (
    <main className="w-full bg-white">
      {/* Hero Section */}
      <section className="pt-40 pb-20 text-center relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-white to-brand-bg-light overflow-hidden" id="hero">
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%%25\' height=\'100%%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '256px 256px' }} />

        {/* Decorative gradient orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[70%] h-[70%] rounded-full bg-brand-yellow/[0.03] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-purple-500/[0.03] blur-[120px] pointer-events-none" />

        {/* Subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #111 0.5px, transparent 0.5px)', backgroundSize: '40px 40px', opacity: 0.04 }} />

        <div className="w-full max-w-[1000px] mx-auto px-6 relative z-10 flex flex-col items-center">
          
          {/* Headline and Image wrapper */}
          <div className="relative mb-6 flex justify-center items-center w-full animate-fadeIn">
            {/* Image Behind Text */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 opacity-70 md:opacity-100">
               <img src="/man.png" alt="" className="h-[150%] md:h-[180%] object-contain -translate-y-10" aria-hidden="true" />
            </div>

            {/* Headline */}
            <h1 
              className="font-heading font-black text-[#111] leading-[0.85] text-[clamp(4.5rem,11.5vw,9rem)] tracking-tighter z-10 relative uppercase text-center w-full select-none"
              style={{ WebkitTextStroke: '2px #111', color: 'transparent', textShadow: '0 0 0 #111' }}
            >
              RUN ON<br />AUTOPILOT
            </h1>
          </div>

          {/* Subtext */}
          <p className="text-brand-text-muted text-lg md:text-xl max-w-[600px] leading-relaxed mt-6 mb-10 z-10 relative animate-fadeIn" style={{ animationDelay: '0.15s' }}>
            AI agents that run your business while you sleep
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full z-10 relative animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={openCalBooking}
              className="group relative overflow-hidden bg-brand-dark text-white font-medium text-[15px] py-2.5 px-7 rounded-md flex items-center justify-center transition-all hover:bg-[#2a2a2a] min-w-[160px] sm:min-w-0 border-none cursor-pointer"
            >
              <span className="relative z-10 group-hover:-translate-y-6 transition-transform duration-300 block">Book a Call</span>
              <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-6 group-hover:translate-y-0 transition-transform duration-300 text-white">Book a Call</span>
              <span className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button>
            <Link
              to="/case-studies"
              className="group relative overflow-hidden bg-white text-brand-dark border border-brand-border font-medium text-[15px] py-2.5 px-7 rounded-md flex items-center justify-center transition-all hover:border-brand-dark min-w-[160px] sm:min-w-0"
            >
              <span className="relative z-10 group-hover:-translate-y-6 transition-transform duration-300 block">See Our Work</span>
              <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-6 group-hover:translate-y-0 transition-transform duration-300 text-brand-dark">See Our Work</span>
              <span className="absolute inset-0 bg-brand-yellow/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
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

      {/* Testimonials Section */}
      <TestimonialsSection limit={3} />

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
