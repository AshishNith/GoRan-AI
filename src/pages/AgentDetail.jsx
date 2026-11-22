import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCalBooking } from '../components/CalBookingModal';
import SEOHead from '../components/SEOHead';
import { buildServiceSchema, buildBreadcrumbSchema } from '../seo/schemas';
import { Phone, MessageSquare, Database, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Cpu, Wrench, Settings } from 'lucide-react';

const agentsData = {
  'calling-agent': {
    name: 'AI Calling Agent',
    tag: 'Voice AI',
    subtitle: 'A natural-sounding voice agent that calls your leads, answers incoming calls, qualifies prospects and books meetings, at any hour of the day.',
    description: 'The calling agent connects a conversational AI model to your phone lines. It replies in under a second, follows the thread of the conversation, copes when the caller interrupts, and can do real work mid-call, such as checking your calendar or updating a record in your CRM.',
    outcome: 'A voice agent set up for your business, connected to your phone numbers and your booking system, and ready to take real calls.',
    timeline: '3–5 weeks',
    color: '#5E76E3',
    icon: Phone,
    scope: [
      {
        title: 'Calls new leads within seconds',
        desc: 'The agent rings every new lead straight away, asks your qualifying questions, and passes the serious ones to your sales team.'
      },
      {
        title: 'Answers every incoming call',
        desc: 'No hold music and no missed calls. It handles the common questions itself and transfers to a person when the caller needs one.'
      },
      {
        title: 'Books meetings on the call',
        desc: 'It reads your live calendar, offers open slots, books the meeting and sends the confirmation.'
      },
      {
        title: 'Keeps your CRM up to date',
        desc: 'Every call is summarised, scored and saved to Salesforce, HubSpot or your own database, with no typing from your team.'
      }
    ],
    techStack: ['LiveKit', 'Gemini Realtime API', 'Twilio API', 'Vapi / Retell', 'Node.js', 'WebRTC', 'FastAPI'],
    deliverables: ['A voice and script tuned to your brand', 'Connection to your phone lines', 'Natural handling of interruptions', 'Call summaries and reports', 'Automatic sync with your CRM'],
    process: [
      {
        step: '01',
        phaseName: 'Voice and script',
        description: 'We choose how your agent sounds (tone, pace, accent) and map out how its conversations should go. We load in what it needs to know about your business and set firm rules, so it never invents a price or makes a promise you would not.',
        deliverables: ['Chosen voice and pace', 'Your business knowledge loaded in', 'Conversation maps']
      },
      {
        step: '02',
        phaseName: 'Phones and calendar',
        description: 'We connect the agent to your phone numbers, tune the call audio so it sounds clear, and link it to your calendar (Calendly or Cal.com) so bookings land in the right place.',
        deliverables: ['Phone numbers connected', 'Links to your other tools', 'Two-way calendar sync']
      },
      {
        step: '03',
        phaseName: 'Testing before launch',
        description: 'We run thousands of test calls before a real customer hears it. We try interruptions, background noise, unusual names and situations where it should hand over to a person, until it holds up.',
        deliverables: ['Interruption tests passed', 'Results from heavy call volume', 'Final go-live setup']
      }
    ]
  },
  'whatsapp-telegram-agent': {
    name: 'WhatsApp & Telegram Agent',
    tag: 'Chat automation',
    subtitle: 'A chat agent that lives inside WhatsApp and Telegram. It captures leads, answers questions, shows your catalogue and takes orders, around the clock.',
    description: 'Talk to customers on the apps they already use every day. The agent understands what people type, reads the photos and files they send, replies in their language, and gets things done: booking a table, raising a support request or completing an order.',
    outcome: 'An official WhatsApp Business account and a Telegram bot, both answering customers, showing your catalogue and sorting your leads.',
    timeline: '2–4 weeks',
    color: '#10B981',
    icon: MessageSquare,
    scope: [
      {
        title: 'Official WhatsApp Business setup',
        desc: 'We handle the Meta verification, get your message templates approved, and link your product catalogue.'
      },
      {
        title: 'Browse and order in the chat',
        desc: 'Customers search products, check prices, place orders and pay without leaving the conversation.'
      },
      {
        title: 'Answers in the customer\'s language',
        desc: 'The agent replies instantly in more than 40 languages and resolves most routine questions without a person stepping in.'
      },
      {
        title: 'Hands over to your team when needed',
        desc: 'When someone is frustrated or needs detailed help, the chat moves to your team in Slack or your CRM with the full history attached.'
      }
    ],
    techStack: ['WhatsApp Cloud API', 'Telegram Bot API', 'Meta Business SDK', 'Python', 'FastAPI', 'Redis Queue', 'PostgreSQL'],
    deliverables: ['Verified WhatsApp Business account', 'Telegram bot', 'Answers to your common questions', 'Handover to your team in Slack', 'Reading of receipts and documents'],
    process: [
      {
        step: '01',
        phaseName: 'Account setup',
        description: 'We set up and verify your WhatsApp Business account with Meta and create your Telegram bot. We submit your message templates for approval, so you can start conversations with customers within the rules.',
        deliverables: ['Verified Meta account', 'Approved message templates', 'Bot connected and live']
      },
      {
        step: '02',
        phaseName: 'Teaching it your business',
        description: 'We load in your policies, FAQs and product catalogue. Before it answers, the agent looks up live stock and prices, so customers always get current information.',
        deliverables: ['Your policies and FAQs loaded', 'Catalogue connected', 'Replies in your tone of voice']
      },
      {
        step: '03',
        phaseName: 'Handover to people',
        description: 'We connect the chats to your support desk (Slack, Discord, Zendesk or a custom dashboard). When the agent meets something it should not handle, a person takes over with the whole conversation in front of them.',
        deliverables: ['Handover to your team', 'Controls for taking over a chat', 'A dashboard of every conversation']
      }
    ]
  },
  'ai-powered-crm': {
    name: 'AI-Powered CRM',
    tag: 'Lead automation',
    subtitle: 'A CRM that finds leads, fills in the missing details, scores them and drafts the follow-up, so your sales team spends its time selling.',
    description: 'No more manual data entry. The system gathers leads from your forms, inboxes and public directories, adds company and contact details, scores how likely each lead is to buy, drafts a personal reply, and sends the deal to the right salesperson.',
    outcome: 'A lead pipeline that runs by itself: leads come in from every channel, get scored and answered, and appear in your CRM ready for your team.',
    timeline: '4–6 weeks',
    color: '#A855F7',
    icon: Database,
    scope: [
      {
        title: 'Collects leads automatically',
        desc: 'Leads are pulled in from website forms, emails, business directories and registries, with no copy and paste.'
      },
      {
        title: 'Fills in the background',
        desc: 'Company size, the tools they use and their social profiles are looked up for you, so your team knows who they are talking to.'
      },
      {
        title: 'Scores every lead',
        desc: 'Each lead is scored against your past sales, so the best opportunities rise to the top of the list.'
      },
      {
        title: 'Drafts the first message',
        desc: 'A personal email or WhatsApp follow-up is written for each prospect, based on what they need and who they are.'
      }
    ],
    techStack: ['Puppeteer / Playwright', 'Express.js', 'Airtable API', 'PostgreSQL', 'LangChain', 'OpenAI API', 'Claude API', 'SendGrid'],
    deliverables: ['Automatic lead collection', 'Lead scoring', 'Drafted outreach messages', 'Slack alerts for hot leads', 'A structured CRM database'],
    process: [
      {
        step: '01',
        phaseName: 'Reviewing your leads and tools',
        description: 'We look at where your leads come from and where they are stored today (Airtable, HubSpot, spreadsheets). We map who handles what, so the automated system assigns work the way your team already does.',
        deliverables: ['A map of your sales process', 'Agreed scoring rules', 'Who gets which leads']
      },
      {
        step: '02',
        phaseName: 'Building the pipeline',
        description: 'We set up the lead collection and the AI that reads each lead, scores it and writes a reply that fits.',
        deliverables: ['Lead collection running', 'Background details added', 'Message drafts in your voice']
      },
      {
        step: '03',
        phaseName: 'Connecting your CRM and alerts',
        description: 'We connect everything to your CRM and set up alerts in Slack or Microsoft Teams, so your sales team hears the moment a strong lead arrives.',
        deliverables: ['CRM connected', 'Slack alerts', 'A pipeline dashboard']
      }
    ]
  }
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const seoTitles = {
  'calling-agent': 'AI Calling Agent | Voice AI for Lead Qualification & Scheduling — GoRan AI',
  'whatsapp-telegram-agent': 'WhatsApp AI Agent | Automated Chat Bot for Business — GoRan AI',
  'ai-powered-crm': 'AI-Powered CRM | Lead Scraping & Pipeline Automation — GoRan AI',
};

const seoDescriptions = {
  'calling-agent': 'Deploy natural-sounding AI voice calling agents that dial leads, qualify prospects, handle inbound inquiries, and schedule meetings 24/7. Built by GoRan AI, India\'s leading AI agency.',
  'whatsapp-telegram-agent': 'Deploy intelligent WhatsApp and Telegram AI agents that capture leads, answer questions, display catalogs, and orchestrate orders in real-time. Built by GoRan AI.',
  'ai-powered-crm': 'Automate lead scraping, pipeline enrichment, intent scoring, and personalized outreach routing with AI-powered CRM systems. Built by GoRan AI, India\'s leading AI agency.',
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
        <h2 className="text-3xl font-heading font-bold text-brand-dark">Agent not found</h2>
        <p className="text-brand-text-muted max-w-sm font-body">The agent page you're looking for doesn't exist.</p>
        <Link to="/case-studies" className="inline-flex items-center gap-2 no-underline bg-brand-dark text-white font-semibold text-sm py-3 px-6 rounded-btn mt-2 hover:bg-black transition-colors">
          <ArrowLeft size={14} />
          All case studies
        </Link>
      </div>
    );
  }

  const IconComponent = agent.icon;

  return (
    <div className="w-full bg-white text-brand-dark min-h-screen relative overflow-hidden font-body">
      <SEOHead
        title={seoTitles[agentId] || `${agent.name} | AI Agent`}
        description={seoDescriptions[agentId] || agent.subtitle}
        canonicalPath={`/agents/${agentId}`}
        schema={[
          buildServiceSchema({ ...agent, slug: agentId, description: agent.description }),
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Agents' },
            { name: agent.name },
          ]),
        ]}
      />
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
          All case studies
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

          <h1 className="text-4xl sm:text-6xl font-heading font-bold text-brand-dark leading-[0.95] tracking-tight mb-6 flex flex-col sm:flex-row sm:items-center items-start gap-4">
            <span className="p-3 bg-brand-bg-light rounded-xl border border-brand-border shrink-0" style={{ color: agent.color }}>
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
            <span className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider block mb-1">Live in</span>
            <span className="text-lg font-bold font-heading text-brand-dark">{agent.timeline}</span>
          </div>
          <div className="w-full h-px md:w-px md:h-10 bg-brand-border" />
          <div>
            <span className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider block mb-1">Built with</span>
            <span className="text-lg font-bold font-heading text-brand-dark flex items-center gap-1.5">
              <Cpu size={16} style={{ color: agent.color }} />
              {agent.techStack.length} proven tools
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
                How it works
              </h2>
              <p className="text-brand-text-main text-base leading-relaxed mb-6 font-body">
                {agent.description}
              </p>
              <div 
                className="rounded-xl p-6 border-l-4 bg-brand-bg-light/50 border border-brand-border border-l-brand-yellow" 
                style={{ borderLeftColor: agent.color }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: agent.color }}>What you end up with</p>
                <p className="text-brand-text-main text-sm leading-relaxed font-body">{agent.outcome}</p>
              </div>
            </div>

            {/* Scope Items */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted mb-8 flex items-center gap-1.5">
                <ShieldCheck size={13} style={{ color: agent.color }} />
                What it does for you
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agent.scope.map((item, index) => (
                  <div key={index} className="p-6 rounded-xl bg-white border border-brand-border hover:border-brand-border-hover hover:shadow-sm transition-all duration-300">
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
                How we set it up
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
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-text-muted">Step {step.step}</span>
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
            <div className="rounded-xl border border-brand-border p-6 bg-white shadow-sm">
              <span className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-widest block mb-4">Tools we use</span>
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
            <div className="rounded-xl border border-brand-border p-6 bg-white shadow-sm">
              <span className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-widest block mb-4">What you get</span>
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
            <div className="rounded-3xl p-8 text-white relative overflow-hidden" style={{ background: 'var(--glass-dark)' }}>
              <div className="absolute inset-0 pointer-events-none">
                <div 
                  className="absolute top-[-30%] left-[20%] w-[200px] h-[200px] rounded-full blur-[80px] opacity-15" 
                  style={{ backgroundColor: agent.color }}
                />
              </div>
              <div className="relative z-10">
                <h4 className="font-heading font-bold text-lg mb-2 leading-snug">Want this agent in your business?</h4>
                <p className="text-white/60 text-xs leading-relaxed mb-6 font-body">
                  Book a free call. We'll look at how you work today and tell you what this agent would take off your plate.
                </p>
                <button 
                  onClick={openCalBooking} 
                  className="block w-full text-center font-bold text-xs py-3 px-6 rounded-full transition-all hover:-translate-y-0.5 shadow-md border-none cursor-pointer" 
                  style={{ backgroundColor: agent.color, color: '#FFFFFF' }}
                >
                  Book a Call
                </button>
              </div>
            </div>

            {/* Other Agents solutions Links */}
            <div className="rounded-xl border border-brand-border p-6 bg-white shadow-sm">
              <span className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-widest block mb-4">Other agents</span>
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
