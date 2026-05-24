import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ClientMarquee from '../components/ClientMarquee';
import StepsShowcase from '../components/StepsShowcase';
import ScrollStack, { ScrollStackItem } from '../components/ui/ScrollStack';
import ScrollAdventure from '../components/ui/animated-scroll';
import VoiceAgent from '../components/VoiceAgent';
import { LampContainer } from '../components/ui/lamp';

const compilerSuggestions = [
  {
    trigger: "email",
    nodes: [
      { text: "Trigger: Inbound email received via SMTP listener", icon: "📬", bg: "rgba(59, 130, 246, 0.1)", color: "#3B82F6" },
      { text: "Parsing: LLM extracts Metadata & Sentiments", icon: "🧠", bg: "rgba(192, 132, 252, 0.1)", color: "#C084FC" },
      { text: "Storage: Append parsed payload to Google Sheets rows", icon: "📈", bg: "rgba(74, 222, 128, 0.1)", color: "#4ADE80" },
      { text: "Alert: Dispatch Slack notification to channel #ops", icon: "💬", bg: "rgba(245, 166, 35, 0.1)", color: "#F5A623" }
    ]
  },
  {
    trigger: "default",
    nodes: [
      { text: "Trigger: API Webhook Received", icon: "⚡", bg: "rgba(59, 130, 246, 0.1)", color: "#3B82F6" },
      { text: "Knowledge search: Vector database similarity query (RAG)", icon: "🔍", bg: "rgba(192, 132, 252, 0.1)", color: "#C084FC" },
      { text: "Synthesizing: GPT-4o crafts structured JSON answer", icon: "⚙️", bg: "rgba(74, 222, 128, 0.1)", color: "#4ADE80" },
      { text: "Response dispatched safely with verification checks", icon: "🔒", bg: "rgba(245, 166, 35, 0.1)", color: "#F5A623" }
    ]
  }
];

export default function Home() {
  // Hero Sandbox States
  const [promptText, setPromptText] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledNodes, setCompiledNodes] = useState([]);
  const [showOutput, setShowOutput] = useState(false);
  const outputRef = useRef(null);

  // Compile prompt logic
  const handleCompile = () => {
    if (!promptText.trim()) return;

    setShowOutput(true);
    setIsCompiling(true);
    setCompiledNodes([]);

    // Scroll compiler into view
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);

    const query = promptText.trim().toLowerCase();
    const selection = (query.includes("email") || query.includes("gmail") || query.includes("sheet") || query.includes("slack"))
      ? compilerSuggestions[0]
      : compilerSuggestions[1];

    // Load nodes step-by-step
    setTimeout(() => {
      setIsCompiling(false);
      selection.nodes.forEach((node, idx) => {
        setTimeout(() => {
          setCompiledNodes(prev => [...prev, node]);
        }, idx * 700);
      });
    }, 1000);
  };



  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="section-hero pt-36 pb-24 text-center relative min-h-screen flex items-center overflow-hidden" id="sandbox">
        {/* Subtle lamp glow behind headline */}
        <LampContainer className="absolute inset-0" />

        {/* Decorative background elements */}
        <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-brand-yellow/[0.04] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[15%] right-[-5%] w-[350px] h-[350px] rounded-full bg-purple-500/[0.04] blur-[100px] pointer-events-none" />

        <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-text-muted">
              Trusted AI Agency
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-bold text-brand-dark leading-[1.0] text-[clamp(2.5rem,7vw,5rem)] tracking-tight max-w-[900px]">
            The AI agency that{' '}
            <span className="relative inline-block">
              <span className="text-brand-yellow">builds for you.</span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-brand-yellow/30 rounded-full hidden md:block" />
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-brand-text-muted text-base md:text-lg max-w-[540px] leading-relaxed mt-5 mb-8">
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

          {/* Sandbox Interactive Box */}
          <div className="w-full max-w-[680px] rounded-2xl border border-brand-border bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 focus-within:shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus-within:border-brand-yellow/40">
            <div className="p-5 flex flex-col gap-4">
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Describe what you want to automate... (e.g. Build an AI agent that monitors incoming emails, extracts contract metadata, saves it to Google Sheets, and alerts Slack)"
                className="w-full border-none outline-none resize-none font-body text-base text-brand-text-main min-h-[80px] leading-relaxed placeholder:text-brand-text-muted/60"
              />
              <div className="flex items-center justify-between border-t border-brand-border pt-4 flex-wrap gap-3">
                <div className="flex items-center gap-1.5">
                  {[
                    { label: 'S', title: 'Slack' },
                    { label: 'G', title: 'Google Sheets' },
                    { label: 'A', title: 'Airtable' },
                    { label: 'Sf', title: 'Salesforce' },
                    { label: 'M', title: 'Gmail' },
                  ].map((tool) => (
                    <span
                      key={tool.label}
                      className="w-7 h-7 rounded-lg border border-brand-border bg-white flex items-center justify-center text-[10px] font-bold text-brand-text-muted transition-all duration-200 hover:border-brand-text-muted hover:text-brand-dark cursor-default select-none"
                      title={tool.title}
                    >
                      {tool.label}
                    </span>
                  ))}
                  <span className="text-[11px] text-brand-text-muted/50 ml-1 font-medium select-none">+ Integrations</span>
                </div>
                <button
                  className="bg-brand-yellow text-brand-text-main border-none font-body font-semibold text-sm py-2.5 px-5 rounded-xl cursor-pointer transition-all duration-300 hover:bg-brand-yellow-hover hover:-translate-y-0.5 active:bg-brand-yellow-focus active:translate-y-0 inline-flex items-center gap-2"
                  onClick={handleCompile}
                >
                  <span>Compile Architecture</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Compiler Output Console */}
          {showOutput && (
            <div className="w-full max-w-[680px] mt-4 overflow-hidden text-left animate-fadeIn" ref={outputRef}>
              <div className="bg-[#0E0E0E] rounded-t-xl px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="font-body text-[11px] font-medium text-white/40 tracking-wide">SYNAPSE COMPILER v1.2</div>
                <div />
              </div>
              <div className="p-5 font-mono text-sm text-white/80 bg-[#0E0E0E] max-h-[280px] overflow-y-auto space-y-2.5">
                {isCompiling && (
                  <div className="flex items-center gap-2.5 text-white/40 text-xs">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
                    Scoping architecture... compiling nodes...
                  </div>
                )}
                {compiledNodes.map((node, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-lg p-3.5 flex items-center gap-3 output-node-anim"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0"
                      style={{ background: node.bg, color: node.color }}
                    >
                      {node.icon}
                    </div>
                    <div>
                      <strong className="text-white/50 text-[9px] uppercase tracking-[0.15em] block">
                        Step {index + 1}
                      </strong>
                      <div className="text-sm mt-0.5 text-white/80 leading-relaxed">
                        {node.text}
                      </div>
                    </div>
                  </div>
                ))}
                {compiledNodes.length > 0 && (
                  <div className="flex items-center gap-2 pt-2 text-white/30 text-[10px]">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                    Architecture compiled successfully · 4 nodes deployed
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>



      {/* Client Showcase Section */}
      <ClientMarquee />

      {/* Delivery Process Section */}
      <section className="py-24 bg-white" id="steps">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <StepsShowcase />
        </div>
      </section>

      {/* Case Studies Section */}
      <ScrollAdventure />

      {/* Services Section */}
      <section className="py-24 bg-white border-t border-brand-border" id="services">
        <div className="w-full max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row gap-12 md:gap-20 items-start">
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
                      <p className="text-[0.9rem] text-brand-text-muted leading-relaxed max-w-[520px]">We analyse your existing stack, workflows, and data pipelines to identify exactly where AI can cut costs, reduce manual effort, and unlock untapped leverage — with a clear implementation roadmap.</p>
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
                      <p className="text-[0.9rem] text-brand-text-muted leading-relaxed max-w-[520px]">We design and build AI-powered products end-to-end — from LLM integration and agentic backends to polished user interfaces — so you go from idea to production without growing an in-house team.</p>
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
                      <p className="text-[0.9rem] text-brand-text-muted leading-relaxed max-w-[520px]">Embed an experienced AI product manager into your team. We own the roadmap, prioritise features, manage delivery, and ensure every sprint moves your product closer to measurable business outcomes.</p>
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
                      <p className="text-[0.9rem] text-brand-text-muted leading-relaxed max-w-[520px]">Upskill your team with hands-on workshops, live walkthroughs, and custom learning programmes — from prompt engineering fundamentals to building internal AI tools your staff will actually use.</p>
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
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted mb-10">Engineered to industry leading standards</h4>
          <div className="grid grid-cols-3 gap-6 max-w-[800px] mx-auto max-sm:grid-cols-1 max-sm:gap-8">
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
          <div className="absolute top-1/2 left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-yellow/[0.03] blur-[120px]" />
          <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/[0.03] blur-[100px]" />
        </div>
        <div className="w-full max-w-[900px] mx-auto px-6 relative z-10">
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
                ? 'border-transparent shadow-xl shadow-black/[0.04]'
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
                <div className="w-full h-px bg-white/[0.08] mb-5" />
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
