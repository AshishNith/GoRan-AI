import React from 'react';
import { Link } from 'react-router-dom';
import ClientMarquee from '../components/ClientMarquee';
import HeroPortal from '../components/HeroPortal';
import StepsShowcase from '../components/StepsShowcase';
import ProcessHero from '../components/ProcessHero';
import ScrollStack, { ScrollStackItem } from '../components/ui/ScrollStack';
import CaseStudiesSection from '../components/CaseStudiesSection';
import VoiceAgent from '../components/VoiceAgent';
import { useCalBooking } from '../components/CalBookingModal';
import SEOHead from '../components/SEOHead';
import { organizationSchema, localBusinessSchema, buildFAQSchema } from '../seo/schemas';
import TestimonialsSection from '../components/TestimonialsSection';
import FaqSection from '../components/ui/faq-loop';
import InstagramReels from '../components/InstagramReels';

export default function Home() {
  const { openCalBooking } = useCalBooking();



  // FAQ data for schema
  const homeFaqs = [
    { question: 'What exactly is an AI Agent, and how is it different from a chatbot?', answer: 'An AI Agent is an autonomous system that perceives its environment, makes decisions, and takes actions to achieve specific goals. Unlike chatbots that only respond to prompts, agents execute multi-step workflows — they can query databases, send emails, update CRMs, escalate issues, and learn from outcomes without human intervention.' },
    { question: 'How long does a typical AI Agent implementation take?', answer: 'Most implementations take 8-14 weeks from kickoff to production. The timeline depends on complexity, number of integrations, and data readiness.' },
    { question: 'Do I need a technical team to maintain the agent after deployment?', answer: 'No — we design agents to be self-maintaining with clear dashboards, automatic error handling, and alerting.' },
    { question: 'What systems can your agents integrate with?', answer: 'Our agents integrate with virtually any system that has an API — CRMs (Salesforce, HubSpot), communication tools (Slack, Teams, Gmail), databases (PostgreSQL, Airtable, MongoDB), and custom internal tools.' },
    { question: 'How do you handle data security and privacy?', answer: 'Security is built into every layer of our deployments. All data is encrypted in transit and at rest. We follow SOC2-aligned practices, provide audit logs, and sign NDAs and DPAs.' },
    { question: 'What happens if the agent makes a mistake?', answer: 'Every agent includes human-in-the-loop checks for high-stakes decisions, confidence thresholds that flag uncertainty, and detailed audit trails for every action.' },
  ];

  return (
    <main className="w-full bg-white">
      <SEOHead
        title="GoRan AI — #1 AI Agency in India | AI Agents, Voice Agents & Automation"
        description="GoRan AI is India's leading AI automation agency. We build custom AI calling agents, voice agents, WhatsApp agents, AI-powered CRMs, and autonomous business workflows. Founded by Ashish Ranjan."
        canonicalPath="/"
        noSuffix
        schema={[organizationSchema, localBusinessSchema, buildFAQSchema(homeFaqs)]}
      />
      {/* Hero Section */}
      {/* Client Showcase Section sits behind the hero and is revealed as it clears */}
      <HeroPortal onBook={openCalBooking} after={<ClientMarquee />} />




      {/* Delivery Process Section */}
      <section className="py-12 md:py-16 bg-white" id="steps">
        <div className="w-full max-w-[95vw] mx-auto">
          <StepsShowcase />
        </div>
      </section>

      {/* Automation Showcase Section */}
      <section className="pt-12 md:pt-16 bg-white" id="automation">
        <div className="w-full max-w-[1640px] mx-auto px-3 md:px-6">
          <ProcessHero />
        </div>
      </section>

      {/* Case Studies Section */}
      <CaseStudiesSection />

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
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 md:gap-12">
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
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 md:gap-12">
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
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 md:gap-12">
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
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 md:gap-12">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-250 mx-auto max-sm:grid-cols-1 max-sm:gap-8">
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
            <div className="flex flex-col gap-2">
              <div className="font-heading text-4xl md:text-5xl font-bold text-brand-dark leading-none">&lt;5hrs</div>
              <div className="text-sm text-brand-text-muted font-medium">Avg. Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Founders Section */}
      <section className="py-20 md:py-28 bg-white border-t border-brand-border relative overflow-hidden" id="leadership">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #111 0.5px, transparent 0.5px)', backgroundSize: '40px 40px', opacity: 0.03 }} />
        <div className="absolute top-1/2 left-[-5%] w-96 h-96 rounded-full bg-brand-yellow/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-[-5%] w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-300 mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow" />
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Leadership & Vision</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-tight tracking-tight">
              Meet the Minds Behind GoRan AI
            </h2>
            <p className="text-brand-text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-4">
              Engineered by architects obsessed with operational scale, low-latency agentic workflows, and automated leverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-250 mx-auto">
            {/* Ashish Ranjan - Founder */}
            <div className="rounded-3xl border border-brand-border bg-gradient-to-b from-white to-brand-bg-light/60 p-6 md:p-8 flex flex-col justify-between hover:border-brand-yellow/50 transition-all duration-300 group hover:shadow-xl hover:shadow-black/5">
              <div>
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 border border-brand-border bg-brand-bg-light">
                  <img
                    src="/Ashish.webp"
                    alt="Ashish Ranjan — Founder & AI Systems Architect"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10">
                    Founder
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-brand-dark">Ashish Ranjan</h3>
                  <a
                    href="https://www.linkedin.com/in/ashish-ranjan-goran"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-yellow hover:border-brand-yellow transition-colors duration-200"
                    title="Ashish Ranjan LinkedIn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-yellow mb-4">Founder & AI Systems Architect</p>
                <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
                  Architects high-concurrency multi-agent swarms, custom LLM backends, and low-latency voice pipelines for enterprise workflows.
                </p>
              </div>
              <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                <Link
                  to="/founder"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-dark hover:text-brand-yellow transition-colors uppercase tracking-wider"
                >
                  View Founder Profile
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Piyush Rana - Sales & Marketing Head */}
            <div className="rounded-3xl border border-brand-border bg-gradient-to-b from-white to-brand-bg-light/60 p-6 md:p-8 flex flex-col justify-between hover:border-brand-yellow/50 transition-all duration-300 group hover:shadow-xl hover:shadow-black/5">
              <div>
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 border border-brand-border bg-brand-bg-light">
                  <img
                    src="/Piyush.jpg"
                    alt="Piyush Rana — Sales & Marketing Head"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10">
                    Sales &amp; Marketing Head
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-brand-dark">Piyush Rana</h3>
                  <a
                    href="https://www.linkedin.com/company/goran-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-yellow hover:border-brand-yellow transition-colors duration-200"
                    title="Piyush Rana LinkedIn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-yellow mb-4">Sales &amp; Marketing Head</p>
                <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
                  Leads overall sales strategy, client acquisition, and enterprise partnerships — driving growth by onboarding key business accounts onto GoRan AI's automation platform.
                </p>
              </div>
              <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                <Link
                  to="/co-founder"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-dark hover:text-brand-yellow transition-colors uppercase tracking-wider"
                >
                  View Full Profile
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection limit={3} />

      {/* Instagram Reels Preview Section */}
      <InstagramReels />

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden" id="faq">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-[-10%] w-150 h-150 rounded-full bg-brand-yellow/3 blur-[120px]" />
          <div className="absolute bottom-0 right-[-10%] w-125 h-125 rounded-full bg-purple-500/3 blur-[100px]" />
        </div>
        <FaqSection data={faqLoopData} />
      </section>

      {/* Interactive Voice Agent Showcase */}
      <VoiceAgent />
    </main>
  );
}

// The home FAQ with its full answers
const faqItems = [
  {
    q: "What exactly is an AI Agent, and how is it different from a chatbot?",
    a: "An AI Agent is an autonomous system that perceives its environment, makes decisions, and takes actions to achieve specific goals. Unlike chatbots that only respond to prompts, agents execute multi-step workflows — they can query databases, send emails, update CRMs, escalate issues, and learn from outcomes without human intervention."
  },
  {
    q: "How long does a typical AI Agent implementation take?",
    a: "Most implementations take 8-14 weeks from kickoff to production. The timeline depends on complexity, number of integrations, and data readiness. We start with a discovery phase to scope accurately and identify quick wins that can be delivered sooner."
  },
  {
    q: "Do I need a technical team to maintain the agent after deployment?",
    a: "No — we design agents to be self-maintaining with clear dashboards, automatic error handling, and alerting. We provide a full handover session and documentation, and offer ongoing support packages if you'd like us to manage updates and improvements."
  },
  {
    q: "What systems can your agents integrate with?",
    a: "Our agents integrate with virtually any system that has an API — CRMs (Salesforce, HubSpot), communication tools (Slack, Teams, Gmail), databases (PostgreSQL, Airtable, MongoDB), and custom internal tools. We also handle legacy systems without APIs through middleware adapters."
  },
  {
    q: "How do you handle data security and privacy?",
    a: "Security is built into every layer of our deployments. All data is encrypted in transit and at rest. We follow SOC2-aligned practices, provide audit logs, and sign NDAs and DPAs. Agents process data within your environment — we never store or retain sensitive information on our servers."
  },
  {
    q: "What happens if the agent makes a mistake?",
    a: "Every agent includes human-in-the-loop checks for high-stakes decisions, confidence thresholds that flag uncertainty, and detailed audit trails for every action. If an error occurs, the agent logs it, alerts your team, and can roll back the action automatically. We also provide monitoring dashboards for full visibility."
  },
];

const faqLoopData = {
  mainTitle: 'Answers to common questions',
  mainSubtitle: 'Still have a question? Book a call and ask us directly.',
  rows: [
    { id: 'row1', speed: '70s', direction: 'left', faqItems: faqItems.slice(0, 3).map((f, i) => ({ id: `q${i + 1}`, question: f.q, answer: f.a })) },
    { id: 'row2', speed: '60s', direction: 'right', faqItems: faqItems.slice(3, 6).map((f, i) => ({ id: `q${i + 4}`, question: f.q, answer: f.a })) },
  ],
};
