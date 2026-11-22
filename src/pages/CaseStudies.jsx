import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { caseStudiesData } from './CaseStudyDetail';
import { useCalBooking } from '../components/CalBookingModal';
import { ArrowRight, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SitePreviewModal from '../components/SitePreviewModal';
import WebsiteCard from '../components/WebsiteCard';
import { buildBreadcrumbSchema } from '../seo/schemas';
import { featuredWebsites, websites } from '../data/websites';

const serviceCategories = ['All', 'AI Automation', 'Product Development', 'Voice AI', 'AI CRM'];

const categoryColors = {
  'AI Agriculture Platform': { bg: 'rgba(16, 185, 129, 0.08)', text: '#10B981', border: 'rgba(16, 185, 129, 0.2)' },
  'E-Commerce AI Architecture': { bg: 'rgba(249, 115, 22, 0.08)', text: '#F97316', border: 'rgba(249, 115, 22, 0.2)' },
  'E-Commerce & Logistics Automation': { bg: 'rgba(245, 158, 11, 0.08)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.2)' },
  'Premium Web Platform': { bg: 'rgba(168, 85, 247, 0.08)', text: '#A855F7', border: 'rgba(168, 85, 247, 0.2)' },
  'AI Lead Management & Routing': { bg: 'rgba(20, 184, 166, 0.08)', text: '#14B8A6', border: 'rgba(20, 184, 166, 0.2)' },
  'Robotics Web & Automation': { bg: 'rgba(59, 130, 246, 0.08)', text: '#3B82F6', border: 'rgba(59, 130, 246, 0.2)' }
};

// The three agents we build most often. Each links to its own page.
const orchestrationProjects = [
  {
    agentId: 'calling-agent',
    name: 'Calling Agent',
    tag: 'Voice AI',
    category: 'Voice AI',
    desc: 'Voice agents that call your leads, answer incoming enquiries, qualify prospects and book meetings, at any hour of the day.',
    tech: ['LiveKit', 'Gemini Realtime API', 'Twilio', 'WebRTC', 'FastAPI'],
    image: '/agent-calling.png',
    color: '#5E76E3',
    timeline: '3–5 weeks'
  },
  {
    agentId: 'whatsapp-telegram-agent',
    name: 'WhatsApp & Telegram Agent',
    tag: 'Chat automation',
    category: 'Chat Automation',
    desc: 'Chat agents inside WhatsApp and Telegram that capture leads, answer questions, share your catalogue and take orders as they come in.',
    tech: ['WhatsApp Cloud API', 'Telegram Bot API', 'Python', 'FastAPI', 'Redis'],
    image: '/agent-whatsapp.png',
    color: '#10B981',
    timeline: '2–4 weeks'
  },
  {
    agentId: 'ai-powered-crm',
    name: 'AI-Powered CRM',
    tag: 'Lead automation',
    category: 'AI CRM',
    desc: 'A CRM that finds leads, fills in the missing details, scores them and sends the right follow-up, so your sales team only talks to people who are ready to buy.',
    tech: ['Puppeteer', 'LangChain', 'PostgreSQL', 'Airtable API', 'SendGrid'],
    image: '/agent-crm.png',
    color: '#A855F7',
    timeline: '4–6 weeks'
  }
];

export default function CaseStudies() {
  const { openCalBooking } = useCalBooking();
  const [activeFilter, setActiveFilter] = useState('All');
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Convert object data to array and map category matching
  const allProjects = Object.entries(caseStudiesData).map(([id, data]) => {
    return {
      id,
      ...data,
      filters: [
        'All',
        data.tag === 'E-Commerce AI Architecture' || data.tag === 'AI Lead Management & Routing' || data.tag === 'Robotics Web & Automation' ? 'AI Automation' : null,
        data.tag === 'AI Agriculture Platform' || data.tag === 'E-Commerce & Logistics Automation' || data.tag === 'Premium Web Platform' || data.tag === 'Robotics Web & Automation' ? 'Product Development' : null,
        data.tag === 'E-Commerce AI Architecture' ? 'Voice AI' : null,
        data.tag === 'E-Commerce AI Architecture' || data.tag === 'E-Commerce & Logistics Automation' || data.tag === 'AI Lead Management & Routing' ? 'AI CRM' : null
      ].filter(Boolean)
    };
  });

  const filteredProjects = allProjects.filter(project =>
    activeFilter === 'All' || project.filters.includes(activeFilter)
  );

  return (
    <main className="w-full bg-white relative overflow-hidden pt-36 pb-24 font-body">
      <SEOHead
        title="Case Studies | AI Automation Results & Client Projects — GoRan AI"
        description="See how GoRan AI transformed businesses with custom AI agents, voice automation, WhatsApp bots, and AI-powered CRMs. Real results from real clients in India."
        canonicalPath="/case-studies"
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Case Studies' },
        ])}
      />
      {/* Decorative ambient background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[8%] left-[-5%] w-[450px] h-[450px] rounded-full bg-brand-yellow/3 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-500/2 blur-[130px]" />
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">

        {/* Editorial Header */}
        <div className="mb-12 border-b border-brand-border pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Case studies</span>
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold text-brand-dark leading-[1.02] tracking-tight">
                Work that is live,<br />
                <span className="text-brand-yellow">and paying off.</span>
              </h1>
            </div>
            <div className="max-w-xs shrink-0">
              <p className="text-brand-text-muted text-sm leading-relaxed border-l-2 border-brand-yellow pl-4 py-1">
                What each client was stuck on, what we built for them, and what changed once it went live.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-between border-b border-brand-border/40 pb-6 mb-16 gap-4">
          <div className="flex flex-wrap gap-1.5 bg-brand-bg-light p-1 rounded-xl border border-brand-border/80">
            {serviceCategories.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  type="button"
                  aria-pressed={isActive}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 border-none ${isActive
                      ? 'bg-brand-yellow text-brand-yellow-ink shadow-sm'
                      : 'bg-transparent text-brand-text-muted hover:text-brand-dark'
                    }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <p className="m-0 text-sm text-brand-text-muted" aria-live="polite">
            Showing {filteredProjects.length} of {allProjects.length}
          </p>
        </div>

        {/* Asymmetric Case Studies Grid */}
        <div className="w-full mb-36">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const catColor = categoryColors[project.tag] || categoryColors['AI Sales Automation'];
                const isSecondColumn = index % 2 === 1;

                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex flex-col justify-between pt-6 border-t border-brand-border hover:border-brand-yellow/30 transition-all duration-300 relative group min-w-0 ${isSecondColumn ? 'md:translate-y-12' : ''
                      }`}
                  >
                    <div>
                      {/* Card Header row */}
                      <div className="flex justify-between items-center mb-5 text-xs font-medium text-brand-text-muted">
                        <span>Case study {String(index + 1).padStart(2, '0')}</span>
                        <span>Built in {project.timeline.toLowerCase()}</span>
                      </div>

                      {/* Tag pill & impact badge */}
                      <div className="flex flex-wrap items-center gap-3.5 mb-4">
                        <span
                          className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                          style={{ backgroundColor: catColor.bg, color: catColor.text, border: `1px solid ${catColor.border}` }}
                        >
                          {project.tag}
                        </span>
                        <span className="text-xs font-semibold text-brand-yellow flex items-center gap-1.5 bg-brand-yellow/5 px-2 py-0.5 rounded border border-brand-yellow/20">
                          <CheckCircle size={12} />
                          {project.impact}
                        </span>
                      </div>

                      {/* Headline Link */}
                      <Link to={`/case-studies/${project.id}`} className="no-underline block mb-4 group/title">
                        <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-dark leading-snug group-hover/title:text-brand-yellow transition-colors duration-300">
                          {project.headline}
                        </h3>
                      </Link>

                      {/* Summary intro */}
                      <p className="text-sm text-brand-text-muted leading-relaxed mb-6 font-body">
                        {project.summary}
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 mb-8">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-brand-border text-brand-text-muted">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-brand-border text-brand-text-muted">
                            +{project.techStack.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer link trigger */}
                    <div className="flex justify-between items-center pt-4 border-t border-brand-border/30 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-dark text-white flex items-center justify-center font-heading font-semibold text-[10px] select-none">
                          {project.name.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-brand-dark">{project.name}</span>
                      </div>

                      <Link to={`/case-studies/${project.id}`} className="no-underline group/link">
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-dark group-hover/link:text-brand-yellow transition-colors duration-200">
                          Read case study
                          <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-0.5" />
                        </span>
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Websites */}
        <section className="mt-44 border-t border-brand-border pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="mb-3 inline-flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Websites</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-dark tracking-tight leading-[1.05] m-0">
                Websites we have shipped
              </h2>
            </div>
            <p className="text-brand-text-muted text-sm max-w-sm leading-relaxed border-l-2 border-brand-yellow pl-4 py-1 m-0">
              Stores, company sites and 3D experiences. Click any screenshot to open the live site right here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredWebsites.map((site) => (
              <WebsiteCard key={site.id} site={site} onPreview={setPreview} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/services/websites"
              className="inline-flex items-center gap-2 rounded-btn bg-brand-dark hover:bg-brand-dark-hover text-white font-semibold text-sm py-3 px-6 no-underline transition-all duration-200 hover:-translate-y-0.5"
            >
              See all {websites.length} websites <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* AI agents */}
        <section className="mt-44 border-t border-brand-border pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="mb-3 inline-flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">AI agents</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-dark tracking-tight leading-[1.05] m-0">
                Agents you can put to work
              </h2>
            </div>
            <p className="text-brand-text-muted text-sm max-w-sm leading-relaxed border-l-2 border-brand-yellow pl-4 py-1 m-0">
              The three agents behind most of the results above. Each one plugs into the tools you already use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orchestrationProjects.map((project) => (
              <div
                key={project.agentId}
                className="bg-[#FEFEFE] border border-brand-border hover:border-brand-yellow/50 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:shadow-card-hover min-w-0"
              >
                {/* Visual Cover image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-bg-light border-b border-brand-border select-none">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {/* Accent color overlay tint */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: project.color }} />
                  <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-brand-dark/85 text-white backdrop-blur-sm">
                    Live in {project.timeline}
                  </span>
                </div>

                {/* Content details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-brand-tint text-brand-text-muted">{project.tag}</span>
                    </div>
                    <h3 className="text-xl font-bold text-brand-dark font-heading leading-tight mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm text-brand-text-muted leading-relaxed mb-5 font-body">
                      {project.desc}
                    </p>
                  </div>

                  <div className="border-t border-brand-border/40 pt-4 mt-auto flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-[11px] font-medium text-brand-text-muted px-2 py-0.5 rounded-md bg-white border border-brand-border">
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/agents/${project.agentId}`}
                      className="no-underline shrink-0 flex items-center gap-1.5 text-sm font-semibold text-brand-yellow hover:text-brand-yellow-hover transition-colors duration-200"
                    >
                      How it works
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The same numbers the home page shows */}
        <div className="mt-40 border-t border-brand-border pt-20 text-center animate-fadeIn">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted mb-12 select-none">Engineered to industry leading standards</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-brand-bg-light border border-brand-border rounded-xl p-6">
              <div className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark leading-none">99.9%</div>
              <div className="text-xs text-brand-text-muted mt-2 font-medium">System Uptime</div>
            </div>
            <div className="bg-brand-bg-light border border-brand-border rounded-xl p-6">
              <div className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark leading-none">500k+</div>
              <div className="text-xs text-brand-text-muted mt-2 font-medium">Agent Executions Daily</div>
            </div>
            <div className="bg-brand-bg-light border border-brand-border rounded-xl p-6">
              <div className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark leading-none">4.9/5</div>
              <div className="text-xs text-brand-text-muted mt-2 font-medium">Client Satisfaction Rating</div>
            </div>
            <div className="bg-brand-bg-light border border-brand-border rounded-xl p-6">
              <div className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark leading-none">&lt;5hrs</div>
              <div className="text-xs text-brand-text-muted mt-2 font-medium">Avg. Response Time</div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-28 rounded-3xl p-8 md:p-14 text-white text-center relative overflow-hidden"
          style={{ background: 'var(--glass-dark)' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-yellow blur-[120px] opacity-25" />
          </div>
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-heading font-bold leading-tight mb-4">
              Want results like these?
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-8 font-body">
              Tell us which part of your business eats the most time. We will show you what an agent can take over and what it would save you.
            </p>
            <button
              onClick={openCalBooking}
              className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-yellow-ink font-semibold text-xs py-3.5 px-8 rounded-btn transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-brand-yellow/15 border-none cursor-pointer"
            >
              Book a Call
            </button>
          </div>
        </motion.div>

      </div>

      <SitePreviewModal site={preview} onClose={() => setPreview(null)} />
    </main>
  );
}
