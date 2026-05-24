import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const servicesData = {
  'ai-audit': {
    name: 'AI Audit',
    tag: 'Discovery & Strategy',
    subtitle: 'Identify exactly where AI can cut costs, reduce manual effort, and unlock untapped leverage in your business — with a clear, prioritised implementation roadmap.',
    description: 'Most businesses already have the workflows and data AI needs to transform their operations — they just don\'t know where to start. Our AI Audit is a deep-dive engagement where we interview your team, map your existing stack, and stress-test every manual process to surface high-ROI automation opportunities.',
    outcome: 'You walk away with a detailed report: every workflow scored by effort and impact, a prioritised project backlog, tool recommendations, and an 8-week implementation plan you can hand directly to an engineering team.',
    checklist: [
      'Stakeholder interviews across ops, sales, finance, and product to map pain points and manual workflows.',
      'Full tech stack assessment: existing tools, APIs, data sources, and integration points.',
      'ROI scoring matrix: every identified opportunity ranked by implementation effort vs. business impact.',
      'Competitive AI landscape review: what your competitors are automating and how to leap ahead.',
      'Delivered as a fully documented report with executive summary and granular project backlog.'
    ],
    techStack: ['Notion', 'Figma', 'Miro', 'Airtable', 'Google Workspace', 'Slack'],
    deliverables: ['AI Opportunity Report', 'ROI Scoring Matrix', '8-Week Roadmap', 'Tool Recommendations', 'Executive Presentation'],
    timeline: '2–3 weeks',
    color: '#F6C744',
  },
  'product-development': {
    name: 'Product Development',
    tag: 'Engineering & Build',
    subtitle: 'We design and build AI-powered products end-to-end — from LLM integration and agentic backends to polished user interfaces — so you go from idea to production without an in-house team.',
    description: 'We act as your full-stack AI engineering partner. Whether you have a product spec or just a rough idea, we take ownership of the entire build — architecture design, backend agentic systems, frontend interfaces, and deployment — so you can move fast without growing headcount.',
    outcome: 'You get a production-ready, scalable AI product with clean documentation, handover materials, and optional ongoing support — typically shipped in 6–12 weeks.',
    checklist: [
      'Technical scoping and architecture design: selecting the right LLMs, databases, and infrastructure for your use case.',
      'Agentic backend development: building multi-step AI pipelines, tool use, memory, and orchestration layers.',
      'API and integration engineering: connecting your product to third-party services (CRMs, ERPs, data sources).',
      'Frontend UI development: clean, fast, and user-tested interfaces built with modern frameworks.',
      'Cloud deployment and CI/CD: containerised, auto-scaling infrastructure on AWS, GCP, or Azure.'
    ],
    techStack: ['Python', 'FastAPI', 'LangGraph', 'React', 'PostgreSQL', 'Docker', 'AWS'],
    deliverables: ['Technical Architecture Docs', 'Working Product Build', 'API Documentation', 'Deployment Scripts', 'Handover Session'],
    timeline: '6–12 weeks',
    color: '#60A5FA',
  },
  'product-management': {
    name: 'Product Management',
    tag: 'Strategy & Execution',
    subtitle: 'Embed an experienced AI product manager into your team. We own the roadmap, prioritise features, and ensure every sprint moves your product closer to measurable business outcomes.',
    description: 'Great AI products fail not because of poor engineering but because of poor product decisions — wrong features, unclear priorities, and no clear connection between user needs and technical work. We embed a senior AI product manager directly into your team to fix that, bringing structure, velocity, and strategic clarity.',
    outcome: 'Your team ships faster, with less confusion and rework. Every sprint is tied to a metric. Stakeholders stay aligned. Decisions get made.',
    checklist: [
      'Product discovery: user interviews, jobs-to-be-done mapping, and problem framing to ensure you\'re building the right thing.',
      'Roadmap ownership: maintaining a living, prioritised backlog tied to business metrics and user outcomes.',
      'Sprint facilitation: running planning, refinement, and retrospectives with your engineering team.',
      'Stakeholder communication: clear, regular updates that keep leadership aligned without engineering interruptions.',
      'AI feature strategy: advising on where and how to embed AI capabilities that genuinely improve the product.'
    ],
    techStack: ['Linear', 'Notion', 'Figma', 'Slack', 'Loom', 'Confluence'],
    deliverables: ['Product Strategy Doc', 'Prioritised Backlog', 'Sprint Cadence', 'Stakeholder Reports', 'AI Feature Roadmap'],
    timeline: 'Ongoing (monthly)',
    color: '#A78BFA',
  },
  'ai-training': {
    name: 'AI Training & Enablement',
    tag: 'Education & Upskilling',
    subtitle: 'Upskill your team with hands-on workshops, live walkthroughs, and custom learning programmes — from prompt engineering to building internal AI tools your staff will actually use.',
    description: 'AI tools are only as powerful as the people using them. Most corporate AI training is generic, theoretical, and forgotten within a week. We design practical, role-specific programmes where your team learns by building — using real workflows from your own business so the skills stick.',
    outcome: 'Your team leaves every session with a working artefact they built themselves — a custom prompt, an automated workflow, or an internal AI tool — and the confidence to keep building independently.',
    checklist: [
      'Role-specific curriculum: tailored tracks for executives, ops teams, sales teams, and developers — not one-size-fits-all content.',
      'Prompt engineering fundamentals: teaching your team how to extract high-quality outputs from LLMs for their specific job functions.',
      'No-code AI tool workshops: hands-on sessions building automations with tools like Make, Zapier, and ChatGPT Plugins.',
      'Internal tooling labs: guided sessions where your team builds real internal AI tools (chatbots, document summarisers, email drafters).',
      'Ongoing learning resources: recorded sessions, prompt libraries, and a private knowledge base your team can reference independently.'
    ],
    techStack: ['ChatGPT', 'Claude', 'Make.com', 'Zapier', 'Notion AI', 'Microsoft Copilot'],
    deliverables: ['Custom Curriculum', 'Workshop Sessions', 'Prompt Library', 'Recorded Walkthroughs', 'Private Knowledge Base'],
    timeline: '1 day – 6 weeks',
    color: '#4ADE80',
  },
};

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = servicesData[serviceId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="text-5xl mb-2">404</div>
        <h2 className="text-3xl font-heading font-bold text-brand-dark">Service Not Found</h2>
        <p className="text-brand-text-muted max-w-sm">The service page you're looking for doesn't exist or may have moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 no-underline bg-brand-dark text-white font-medium text-sm py-3 px-6 rounded-full mt-2 hover:bg-black transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">

      {/* ── Hero ── */}
      <section className="pt-36 pb-24 bg-white relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}/>
        <div className="w-full max-w-[1100px] mx-auto px-6 relative z-10">

          {/* Back link */}
          <Link to="/" className="inline-flex items-center gap-1.5 no-underline text-brand-text-muted text-sm font-medium mb-10 group transition-colors hover:text-brand-dark">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            All Services
          </Link>

          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full" style={{ background: service.color }}/>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">{service.tag}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-dark leading-[1.05] tracking-tight mb-6 max-w-3xl">
            {service.name}
          </h1>

          {/* Subtitle */}
          <p className="text-brand-text-muted text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            {service.subtitle}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted">Timeline</span>
              <span className="text-sm font-semibold text-brand-dark">{service.timeline}</span>
            </div>
            <div className="w-px h-8 bg-brand-border hidden sm:block"/>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted">Deliverables</span>
              <span className="text-sm font-semibold text-brand-dark">{service.deliverables.length} core outputs</span>
            </div>
            <div className="w-px h-8 bg-brand-border hidden sm:block"/>
            <Link to="/contact" className="inline-flex items-center gap-2 no-underline py-3 px-6 rounded-full font-semibold text-sm text-brand-dark transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ background: service.color }}>
              Start with this service
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-20 border-t border-brand-border">
        <div className="w-full max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">

          {/* Left: Overview + Capabilities */}
          <div className="flex flex-col gap-14">

            {/* Overview */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted mb-4">Overview</p>
              <p className="text-brand-text-main text-lg leading-relaxed mb-6">{service.description}</p>
              <div className="rounded-2xl p-6 border-l-4" style={{ background: `${service.color}0D`, borderLeftColor: service.color }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: service.color }}>What you get</p>
                <p className="text-brand-text-main text-base leading-relaxed">{service.outcome}</p>
              </div>
            </div>

            {/* Capabilities */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted mb-6">What's included</p>
              <div className="flex flex-col gap-0">
                {service.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 py-5 border-b border-brand-border last:border-b-0">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${service.color}20`, color: service.color }}>
                      <CheckIcon />
                    </div>
                    <p className="text-brand-text-main text-[0.95rem] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools we use */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted mb-4">Tools & technologies</p>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech, idx) => (
                  <span key={idx} className="text-sm font-medium bg-brand-bg-light border border-brand-border py-1.5 px-4 rounded-full text-brand-text-main">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Sticky sidebar */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-28 self-start">

            {/* Deliverables card */}
            <div className="rounded-2xl border border-brand-border p-6 bg-white">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted mb-4">Deliverables</p>
              <div className="flex flex-col gap-2.5">
                {service.deliverables.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: service.color }}/>
                    <span className="text-sm font-medium text-brand-text-main">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline card */}
            <div className="rounded-2xl border border-brand-border p-6 bg-white">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted mb-2">Typical Timeline</p>
              <p className="text-2xl font-heading font-bold text-brand-dark">{service.timeline}</p>
            </div>

            {/* CTA card */}
            <div className="rounded-2xl p-6 text-white" style={{ background: '#0E0E0E' }}>
              <p className="font-heading font-bold text-lg mb-2 leading-snug">Ready to get started?</p>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Book a free 30-minute scoping call. We'll review your situation and tell you exactly what's possible.
              </p>
              <Link to="/contact" className="block text-center no-underline font-semibold text-sm py-3 px-6 rounded-full transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: service.color, color: '#0E0E0E' }}>
                Book a Scoping Call
              </Link>
            </div>

            {/* Other services */}
            <div className="rounded-2xl border border-brand-border p-6 bg-white">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted mb-4">Other services</p>
              <div className="flex flex-col gap-1">
                {Object.entries(servicesData).filter(([id]) => id !== serviceId).map(([id, s]) => (
                  <Link key={id} to={`/services/${id}`} className="no-underline flex items-center justify-between py-2.5 border-b border-brand-border last:border-b-0 text-sm font-medium text-brand-text-main hover:text-brand-dark group transition-colors">
                    {s.name}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-text-muted transition-transform group-hover:translate-x-0.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
