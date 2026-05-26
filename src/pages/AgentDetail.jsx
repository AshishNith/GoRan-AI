import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCalBooking } from '../components/CalBookingModal';
import { Phone, MessageSquare, Database, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Cpu, Wrench, Settings } from 'lucide-react';

const agentsData = {
  'calling-agent': {
    name: 'Calling Agent (AI Voice Caller)',
    tag: 'Autonomous Telephony & Voice AI',
    subtitle: 'Deploy natural-sounding, ultra-low latency AI voice agents that dial leads, qualify prospects, handle inbound customer inquiries, and schedule meetings 24/7.',
    description: 'Our Calling Agent system bridges state-of-the-art conversational LLMs with VoIP telephony. Operating at sub-800ms response latencies, these voice agents understand human context, handle interruptions gracefully, and execute complex business logic—like checking calendar availability or updating a CRM database—mid-conversation.',
    outcome: 'An active custom voice node configured to your specific business requirements, fully integrated with your phone lines, and connected to your booking systems.',
    timeline: '3–5 weeks',
    color: '#F6C744',
    icon: Phone,
    scope: [
      {
        title: 'Outbound Prospecting & Qualification',
        desc: 'Call newly registered leads within seconds. Qualify them using your sales criteria and dynamically route hot prospects directly to live sales representatives.'
      },
      {
        title: 'Inbound Support Triage',
        desc: 'Answer customer calls instantly with zero wait times. Handle common questions, troubleshoot issues, or transfer calls to human specialists when needed.'
      },
      {
        title: 'Automated Calendar Scheduling',
        desc: 'Enable voice agents to read your live calendar availability, offer open slots, book meetings on the fly, and send follow-up confirmation links.'
      },
      {
        title: 'Real-time CRM Syncing',
        desc: 'Automatically summarize every call, assign lead scores, and update details directly in Salesforce, HubSpot, or custom databases.'
      }
    ],
    techStack: ['LiveKit', 'Gemini Realtime API', 'Twilio API', 'Vapi / Retell', 'Node.js', 'WebRTC', 'FastAPI'],
    deliverables: ['Custom Voice Persona & Prompt Config', 'Telephony SIP Trunk Integration', 'Interruption Handling Routines', 'Call Summary & Analytics API', 'Salesforce/Hubspot Sync Webhook'],
    process: [
      {
        step: '01',
        phaseName: 'Voice Persona Design & Script Scoping',
        description: 'We design your agent\'s vocal tone (pitch, speed, accent) and map out conversational branches. We compile your knowledge bases and script exact safety guardrails to ensure the agent never hallucinates price lists or commitments.',
        deliverables: ['Voice accent & speed presets', 'Knowledge base vector store index', 'Conversational tree diagrams']
      },
      {
        step: '02',
        phaseName: 'Telephony & Calendar Integration',
        description: 'We wire up your telephony stack using SIP trunking or Twilio numbers, configure WebRTC channels for crystal-clear real-time communication, and establish active sync webhooks with your scheduling platforms (Calendly/Cal.com).',
        deliverables: ['Configured SIP trunk/DID routing', 'API event integrations', 'Bi-directional calendar sync nodes']
      },
      {
        step: '03',
        phaseName: 'Simulation & Guardrail Hardening',
        description: 'We run thousands of automated audio simulation tests to verify fallback logic. We test for voice interruptions, background noise, spelling/pronunciation anomalies, and force-escalation cases to ensure a bulletproof customer experience.',
        deliverables: ['Interruption response validation', 'Telephony stress test logs', 'Go-live voice configuration']
      }
    ]
  },
  'whatsapp-telegram-agent': {
    name: 'WhatsApp & Telegram Agent',
    tag: 'Conversational Chat Automation',
    subtitle: 'Deploy responsive, intelligent chat agents directly inside WhatsApp and Telegram to capture leads, answer questions, display catalogs, and orchestrate orders.',
    description: 'Connect with your clients on the platforms they use daily. Our Chat Agents use robust natural language understanding to process user text, recognize attachments, translate languages on the fly, and execute actions like booking tables, routing support tickets, or completing e-commerce checkouts.',
    outcome: 'An officially verified Meta WhatsApp API node and Telegram bot agent running conversational scripts, catalog displays, and automated lead triage.',
    timeline: '2–4 weeks',
    color: '#10B981',
    icon: MessageSquare,
    scope: [
      {
        title: 'Verified Business Onboarding',
        desc: 'Meta Business Manager setup and WhatsApp Cloud API verification, configuring automated template messages and official catalog links.'
      },
      {
        title: 'Autonomous Order & Catalog Browsing',
        desc: 'Allow users to search products, browse services, query pricing, and place orders directly in the chat with automated payments.'
      },
      {
        title: 'Multilingual Support & FAQs',
        desc: 'Understand and answer customer inquiries in over 40 languages instantly, resolving up to 80% of support volume without human intervention.'
      },
      {
        title: 'Smart Human Escalation Triage',
        desc: 'Identify when a user is frustrated or needs complex help, and instantly transfer the conversation to your live chat reps via Slack or CRM.'
      }
    ],
    techStack: ['WhatsApp Cloud API', 'Telegram Bot API', 'Meta Business SDK', 'Python', 'FastAPI', 'Redis Queue', 'PostgreSQL'],
    deliverables: ['WhatsApp API Verification Setup', 'Telegram Bot Routing Engine', 'Natural Language FAQ Database', 'Slack Escalation Integration', 'Media Processing Pipeline (Receipts/Docs)'],
    process: [
      {
        step: '01',
        phaseName: 'Meta API & Chat Channel Onboarding',
        description: 'We configure and verify your WhatsApp Cloud API credentials via Meta Developer Console and create Telegram bot handlers. We submit message templates for approval so you can initiate conversations with clients legally and securely.',
        deliverables: ['Verified Meta Developer App', 'Approved chat templates', 'Bot webhook endpoints']
      },
      {
        step: '02',
        phaseName: 'Conversational Knowledge & RAG Configuration',
        description: 'We index your business policies, FAQs, and product catalogs. We build specialized Retrieval-Augmented Generation (RAG) loops so the agent can look up real-time inventory and pricing details before answering chat queries.',
        deliverables: ['Vector database of business policies', 'Product catalog API integration', 'Smart contextual prompt framework']
      },
      {
        step: '03',
        phaseName: 'Live Escalation & Fallback Routing',
        description: 'We build integration nodes connecting chat channels to your internal support desk (Slack, Discord, Zendesk, or custom dashboard). When the bot detects complex issues, it seamlessly hands over the history to a human representative.',
        deliverables: ['Human fallback webhooks', 'Agent chat handover controls', 'Interactive messaging dashboard']
      }
    ]
  },
  'ai-powered-crm': {
    name: 'AI-Powered CRM & Pipeline',
    tag: 'Data Pipeline & Lead Automation',
    subtitle: 'Automate lead scraping, pipeline enrichment, intent scoring, and personalized outreach routing to 10x your sales team\'s operational velocity.',
    description: 'Say goodbye to manual data entry. Our AI-Powered CRM Orchestrator scrapes directories, auto-enriches incoming leads with demographic and company data, scores lead intent using customized models, drafts hyper-personalized responses, and routes deals to the right salesperson.',
    outcome: 'An automated lead processing pipeline that ingests data from multiple channels, scores leads, writes outreach drafts, and syncs directly with your sales CRM.',
    timeline: '4–6 weeks',
    color: '#A855F7',
    icon: Database,
    scope: [
      {
        title: 'Automated Lead Scraping & Ingestion',
        desc: 'Extract target lead data from business registries, website forms, directories, and emails using secure headless scraping clusters.'
      },
      {
        title: 'AI Demographic & Company Enrichment',
        desc: 'Look up company details, employee counts, tech stacks, and social profiles automatically to give sales reps a complete dossier on every prospect.'
      },
      {
        title: 'Predictive Intent Scoring',
        desc: 'Score incoming leads automatically using specialized classification models trained on your past sales data to prioritize high-value deals.'
      },
      {
        title: 'Personalized Outreach Drafting',
        desc: 'Generate custom-tailored outreach emails or WhatsApp follow-up drafts based on the prospect\'s pain points and company profile.'
      }
    ],
    techStack: ['Puppeteer / Playwright', 'Express.js', 'Airtable API', 'PostgreSQL', 'LangChain', 'OpenAI API', 'Claude API', 'SendGrid'],
    deliverables: ['Web Scraping Cluster Scripts', 'Intent Scoring Classification Engine', 'Outreach Draft Generator API', 'Slack Lead Routing Alerts', 'Airtable/PostgreSQL Database Architecture'],
    process: [
      {
        step: '01',
        phaseName: 'Data Pipeline & Source Audit',
        description: 'We audit your sales databases (Airtable, HubSpot, sheets) and identify all target lead sources. We map your current sales reps\' workloads and routing rules to build a logical automated distribution framework.',
        deliverables: ['Sales funnel data flow diagram', 'Lead scoring parameter sheet', 'Routing assignment matrix']
      },
      {
        step: '02',
        phaseName: 'Scraping & AI Inference Engine Engineering',
        description: 'We deploy scraper nodes to automatically extract lead profiles and configure LLM inference pipelines that analyze lead queries, assign intent scores, and draft contextual responses.',
        deliverables: ['Scraper deployment scripts', 'Enrichment API integrations', 'Personalized draft prompts']
      },
      {
        step: '03',
        phaseName: 'CRM Webhooks & Alert Routing Launch',
        description: 'We connect the pipeline to your database. We setup real-time Slack or Microsoft Teams alert channels to notify your sales team instantly when a high-intent, qualified lead is captured.',
        deliverables: ['Webhook routing handlers', 'Slack notification cards', 'Orchestration dashboard panels']
      }
    ]
  }
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

export default function AgentDetail() {
  const { openCalBooking } = useCalBooking();
  const { agentId } = useParams();
  const agent = agentsData[agentId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [agentId]);

  if (!agent) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-white text-brand-dark">
        <div className="text-5xl font-mono text-brand-yellow mb-2">404</div>
        <h2 className="text-3xl font-heading font-bold text-brand-dark">Agent Spec Not Found</h2>
        <p className="text-brand-text-muted max-w-sm font-body">The autonomous agent configuration you're looking for doesn't exist.</p>
        <Link to="/case-studies" className="inline-flex items-center gap-2 no-underline bg-brand-dark text-white font-semibold text-sm py-3 px-6 rounded-full mt-2 hover:bg-black transition-colors">
          <ArrowLeft size={14} />
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const IconComponent = agent.icon;

  return (
    <div className="w-full bg-white text-brand-dark min-h-screen relative overflow-hidden font-body">
      {/* Subtle ambient gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-[5%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.03]" 
          style={{ backgroundColor: agent.color }}
        />
        <div 
          className="absolute bottom-[20%] right-[-10%] w-[550px] h-[550px] rounded-full blur-[130px] opacity-[0.02]" 
          style={{ backgroundColor: '#A855F7' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}/>
      </div>

      <div className="w-full max-w-[1100px] mx-auto px-6 pt-36 pb-24 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link 
          to="/case-studies" 
          className="inline-flex items-center gap-1.5 no-underline text-brand-text-muted hover:text-brand-dark text-xs font-semibold uppercase tracking-widest mb-10 transition-colors"
        >
          <ArrowLeft size={12} />
          Back to Portfolio
        </Link>

        {/* Hero Header */}
        <motion.div 
          className="max-w-3xl mb-16"
          {...fadeUp}
        >
          <div className="inline-flex items-center gap-2 bg-brand-bg-light border border-brand-border rounded-full px-3 py-1 mb-5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: agent.color }} />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted">{agent.tag}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-bold text-brand-dark leading-[0.95] tracking-tight mb-6 flex items-center gap-4">
            <span className="p-3 bg-brand-bg-light rounded-2xl border border-brand-border shrink-0" style={{ color: agent.color }}>
              <IconComponent size={36} />
            </span>
            {agent.name}
          </h1>

          <p className="text-brand-text-muted text-lg md:text-xl leading-relaxed font-body">
            {agent.subtitle}
          </p>
        </motion.div>

        {/* Meta Stats Panel */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-3xl bg-brand-bg-light border border-brand-border mb-20 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div>
            <span className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider block mb-1">Onboarding Timeline</span>
            <span className="text-lg font-bold font-heading text-brand-dark">{agent.timeline}</span>
          </div>
          <div className="w-full h-px md:w-px md:h-10 bg-brand-border" />
          <div>
            <span className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider block mb-1">Standard Stack</span>
            <span className="text-lg font-bold font-heading text-brand-dark flex items-center gap-1.5">
              <Cpu size={16} style={{ color: agent.color }} />
              {agent.techStack.length} core dependencies
            </span>
          </div>
        </motion.div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
          
          {/* Left Column: Scope & Setup Process */}
          <div className="flex flex-col gap-20">
            
            {/* Overview Section */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted mb-6 flex items-center gap-1.5">
                <Wrench size={13} style={{ color: agent.color }} />
                System Overview &amp; capabilities
              </h2>
              <p className="text-brand-text-main text-base leading-relaxed mb-6 font-body">
                {agent.description}
              </p>
              <div 
                className="rounded-2xl p-6 border-l-4 bg-brand-bg-light/50 border border-brand-border border-l-brand-yellow" 
                style={{ borderLeftColor: agent.color }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: agent.color }}>Expected Outcome</p>
                <p className="text-brand-text-main text-sm leading-relaxed font-body">{agent.outcome}</p>
              </div>
            </div>

            {/* Scope Items */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted mb-8 flex items-center gap-1.5">
                <ShieldCheck size={13} style={{ color: agent.color }} />
                Implementation Scope
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agent.scope.map((item, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-white border border-brand-border hover:border-brand-border-hover hover:shadow-sm transition-all duration-300">
                    <CheckCircle2 size={18} className="mb-4" style={{ color: agent.color }} />
                    <h3 className="text-sm font-semibold text-brand-dark mb-2 font-heading">{item.title}</h3>
                    <p className="text-brand-text-muted text-xs leading-relaxed font-body">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Setup Timeline */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted mb-8 flex items-center gap-1.5">
                <Settings size={13} style={{ color: agent.color }} />
                Step-by-step Setup Process
              </h2>
              <div className="flex flex-col gap-10 relative pl-4 border-l border-brand-border ml-2">
                {agent.process.map((step, index) => (
                  <div key={index} className="relative group">
                    {/* Circle Dot indicator */}
                    <div 
                      className="absolute -left-[22.5px] top-1 w-4 h-4 rounded-full border-2 border-white bg-white flex items-center justify-center"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: agent.color }} />
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-brand-text-muted">PHASE {step.step}</span>
                      <h3 className="text-lg font-bold font-heading text-brand-dark">{step.phaseName}</h3>
                      <p className="text-brand-text-muted text-xs leading-relaxed max-w-2xl font-body">{step.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {step.deliverables.map((del, dIdx) => (
                          <span 
                            key={dIdx} 
                            className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-brand-bg-light border border-brand-border text-brand-text-muted"
                          >
                            {del}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sidebar */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 self-start">
            
            {/* Tech Stack list */}
            <div className="rounded-2xl border border-brand-border p-6 bg-white shadow-sm">
              <span className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-widest block mb-4">Core Dependencies</span>
              <div className="flex flex-wrap gap-2">
                {agent.techStack.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs font-mono bg-brand-bg-light border border-brand-border py-1 px-3 rounded-lg text-brand-text-main"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Deliverables list */}
            <div className="rounded-2xl border border-brand-border p-6 bg-white shadow-sm">
              <span className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-widest block mb-4">Standard Deliverables</span>
              <div className="flex flex-col gap-3">
                {agent.deliverables.map((del, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: agent.color }} />
                    <span className="text-xs font-medium text-brand-text-main">{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking call Card */}
            <div className="rounded-3xl p-8 text-white relative overflow-hidden" style={{ background: '#0E0E0E' }}>
              <div className="absolute inset-0 pointer-events-none">
                <div 
                  className="absolute top-[-30%] left-[20%] w-[200px] h-[200px] rounded-full blur-[80px] opacity-15" 
                  style={{ backgroundColor: agent.color }}
                />
              </div>
              <div className="relative z-10">
                <h4 className="font-heading font-bold text-lg mb-2 leading-snug">Let's scope this integration</h4>
                <p className="text-white/60 text-xs leading-relaxed mb-6 font-body">
                  Schedule a scoping session. We will examine your software infrastructure and define the custom agent rules.
                </p>
                <button 
                  onClick={openCalBooking} 
                  className="block w-full text-center font-bold text-xs py-3 px-6 rounded-full transition-all hover:-translate-y-0.5 shadow-md border-none cursor-pointer" 
                  style={{ backgroundColor: agent.color, color: '#0E0E0E' }}
                >
                  Book Scoping Session
                </button>
              </div>
            </div>

            {/* Other Agents solutions Links */}
            <div className="rounded-2xl border border-brand-border p-6 bg-white shadow-sm">
              <span className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-widest block mb-4">Other Agent Systems</span>
              <div className="flex flex-col gap-1.5">
                {Object.entries(agentsData).filter(([id]) => id !== agentId).map(([id, item]) => (
                  <Link 
                    key={id} 
                    to={`/agents/${id}`} 
                    className="no-underline flex items-center justify-between py-2 border-b border-brand-border last:border-b-0 text-xs font-semibold text-brand-text-main hover:text-brand-dark group transition-colors"
                  >
                    {item.name}
                    <ArrowRight size={12} className="text-brand-text-muted transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
