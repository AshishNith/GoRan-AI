import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ClientMarquee from '../components/ClientMarquee';
import StepsShowcase from '../components/StepsShowcase';
import ScrollStack, { ScrollStackItem } from '../components/ui/ScrollStack';
// import { ParallaxComponent } from '../components/ui/parallax-scrolling';
import ScrollAdventure from '../components/ui/animated-scroll';
import VoiceAgent from '../components/VoiceAgent';

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
      <section className="section-hero pt-35 pb-20 text-center relative min-h-screen flex items-center" id="sandbox">
        <div className="w-full max-w-[1200px] mx-auto px-6 relative z-1 flex flex-col items-center gap-6">
          <h1 className="font-heading font-bold text-brand-dark leading-[1.15] text-[2.5rem] sm:text-[3.25rem] md:text-[4.25rem] tracking-tight">
            The AI agency that <br />
            <span className="text-brand-dark opacity-80">builds for you.</span>
          </h1>

          <div className="inline-flex flex-wrap justify-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-sm font-semibold bg-[rgba(245,166,35,0.1)] text-[#E28C00]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 1 7.54 16.59c-.24.25-.56.41-.9.41H5.36c-.34 0-.66-.16-.9-.41A10 10 0 0 1 12 2z" /><path d="M8 10h8M10 14h4" /></svg>
              Custom Agents
            </span>
            <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-sm font-semibold bg-[rgba(192,132,252,0.1)] text-[#A855F7]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              Workflows
            </span>
            <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-sm font-semibold bg-[rgba(74,222,128,0.1)] text-[#16A34A]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" /></svg>
              Databases
            </span>
          </div>

          <p className="text-brand-dark font-medium font-body text-base md:text-xl max-w-[640px] leading-relaxed">
            Describe the automated system or workflow you need. Synapse constructs, tests, and deploys production-grade AI agents connected securely to your tools.
          </p>

          {/* Sandbox Interactive Box */}
          <div className="w-full max-w-[680px] bg-black/5 p-1 rounded-[20px] mt-4 transition-all duration-300 focus-within:bg-black/8">
            <div className="bg-white rounded-2xl p-4 shadow-nav text-left flex flex-col gap-3">
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Describe what you want to automate... (e.g. Build an AI agent that monitors incoming emails, extracts contract metadata, saves it to Google Sheets, and alerts Slack)"
                className="w-full border-none outline-none resize-none font-body text-base text-brand-text-main min-h-[80px] leading-normal placeholder:text-brand-text-muted placeholder:opacity-80"
              />
              <div className="flex items-center justify-between border-t border-brand-border pt-3 flex-wrap gap-3">
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 rounded-md border border-brand-border bg-white flex items-center justify-center text-[11px] font-bold shadow-card text-brand-text-muted hover:text-brand-dark transition-all cursor-default" title="Slack">S</span>
                  <span className="w-6 h-6 rounded-md border border-brand-border bg-white flex items-center justify-center text-[11px] font-bold shadow-card text-brand-text-muted hover:text-brand-dark transition-all cursor-default" title="Google Sheets">G</span>
                  <span className="w-6 h-6 rounded-md border border-brand-border bg-white flex items-center justify-center text-[11px] font-bold shadow-card text-brand-text-muted hover:text-brand-dark transition-all cursor-default" title="Airtable">A</span>
                  <span className="w-6 h-6 rounded-md border border-brand-border bg-white flex items-center justify-center text-[11px] font-bold shadow-card text-brand-text-muted hover:text-brand-dark transition-all cursor-default" title="Salesforce">Sf</span>
                  <span className="w-6 h-6 rounded-md border border-brand-border bg-white flex items-center justify-center text-[11px] font-bold shadow-card text-brand-text-muted hover:text-brand-dark transition-all cursor-default" title="Gmail">M</span>
                </div>
                <button className="bg-brand-yellow text-brand-text-main border-none font-body font-semibold text-sm py-2.5 px-5 rounded-lg cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.1),0_2px_8px_rgba(246,199,68,0.3)] transition-all duration-300 hover:bg-brand-yellow-hover hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),0_4px_12px_rgba(246,199,68,0.4)] active:bg-brand-yellow-focus inline-flex items-center gap-1.5" onClick={handleCompile}>
                  <span>Compile Architecture</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Compiler Output Console */}
          {showOutput && (
            <div className="w-full max-w-[680px] bg-white border border-brand-border rounded-2xl mt-4 shadow-card-hover overflow-hidden text-left" ref={outputRef}>
              <div className="bg-brand-bg-light px-4 py-2.5 border-b border-brand-border flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="font-body text-[11px] font-medium text-brand-text-muted">SYNAPSE COMPILER v1.2</div>
                <div></div>
              </div>
              <div className="p-5 font-mono text-sm text-brand-text-main bg-brand-bg-light max-h-[250px] overflow-y-auto">
                {isCompiling && (
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                    Scoping architecture... compiling nodes...
                  </div>
                )}
                {compiledNodes.map((node, index) => (
                  <div className="bg-white border border-brand-border rounded-lg p-3 mb-3 flex items-center gap-3 shadow-card output-node-anim" key={index}>
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs" style={{ background: node.bg, color: node.color }}>
                      {node.icon}
                    </div>
                    <div>
                      <strong className="text-brand-dark text-[10px] uppercase tracking-wider block">
                        Step {index + 1}
                      </strong>
                      <div className="text-sm mt-0.5 text-brand-text-main">
                        {node.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>



      {/* Client Showcase Section */}
      <ClientMarquee />

      {/* Delivery Process Section */}
      <section className="py-24 bg-white border-t border-brand-border border-b" id="steps">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <StepsShowcase />
        </div>
      </section>

      {/* Case Studies Section */}
      <ScrollAdventure />

      {/* Services Section */}
      <section className="py-24 bg-white" id="services">
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

      {/* Interactive Voice Agent Showcase */}
      <VoiceAgent />

      {/* AI Parallax Closer with Integrated CTA Form */}
      {/* <ParallaxComponent /> */}
    </main>
  );
}
