import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { caseStudiesData } from './CaseStudyDetail';
import { useCalBooking } from '../components/CalBookingModal';
import { Cpu, ArrowRight, Sparkles, CheckCircle, Database, Layout, PhoneCall, Filter, Terminal, Activity, X, Laptop, Shield } from 'lucide-react';

const serviceCategories = ['All', 'AI Automation', 'Product Development', 'Voice AI', 'AI CRM'];

const categoryColors = {
  'AI Sales Automation': { bg: 'rgba(246, 199, 68, 0.08)', text: '#F6C744', border: 'rgba(246, 199, 68, 0.2)' },
  'AI Agriculture Platform': { bg: 'rgba(16, 185, 129, 0.08)', text: '#10B981', border: 'rgba(16, 185, 129, 0.2)' },
  'AI Voice Automation': { bg: 'rgba(249, 115, 22, 0.08)', text: '#F97316', border: 'rgba(249, 115, 22, 0.2)' },
  'AI Lead Management': { bg: 'rgba(168, 85, 247, 0.08)', text: '#A855F7', border: 'rgba(168, 85, 247, 0.2)' },
};

// Projects database split into 3 custom sections
const immersiveProjects = [
  {
    name: "Art Nexus Delta",
    client: "Art Collective Partner",
    category: "Immersive UI Website",
    desc: "Interactive art catalog displaying generative visual portfolios, horizontal scrolling grids, and web canvas layers.",
    tech: ["React.js", "Tailwind CSS", "Vite", "GSAP"],
    image: "https://image.thum.io/get/https://art-nexus-delta.vercel.app/",
    url: "https://art-nexus-delta.vercel.app/",
    status: "Active"
  },
  {
    name: "Aura Grid Layout",
    client: "Grid Layout Lab",
    category: "Modern UI Website",
    desc: "High-end CSS grid landing page showcasing fluid spacing, glassmorphic filters, and interactive UI nodes.",
    tech: ["HTML5", "Vanilla CSS", "JavaScript", "Vercel"],
    image: "https://image.thum.io/get/https://aura-grid-pi.vercel.app/",
    url: "https://aura-grid-pi.vercel.app/",
    status: "Active"
  },
  {
    name: "Raw Pressery Clone",
    client: "Juice Brand Replica",
    category: "E-Commerce UI",
    desc: "Cloned juice brand frontend highlighting fluid micro-animations, slide transitions, and typographic layouts.",
    tech: ["React.js", "Vite", "Tailwind CSS", "Framer Motion"],
    image: "https://image.thum.io/get/https://raw-pressery-two.vercel.app/",
    url: "https://raw-pressery-two.vercel.app/",
    status: "Active"
  },
  {
    name: "ASME Chapter Hub",
    client: "ASME Student Body",
    category: "Educational Portal",
    desc: "Mechanical engineering student chapter landing page featuring interactive structural timelines and team profiles.",
    tech: ["React.js", "Vite", "Framer Motion", "Tailwind CSS"],
    image: "https://image.thum.io/get/https://asme-seven.vercel.app/",
    url: "https://asme-seven.vercel.app/",
    status: "Active"
  },
  {
    name: "RoboWeek 3.0 Portal",
    client: "Robotics Symposium",
    category: "Festival Web App",
    desc: "Symposium portal loaded with retro cybernetic visuals, scheduler loops, and dynamic registration filters.",
    tech: ["React.js", "Vite", "Tailwind CSS", "GSAP"],
    image: "https://image.thum.io/get/https://roboweek-3-0.vercel.app/",
    url: "https://roboweek-3-0.vercel.app/",
    status: "Active"
  },
  {
    name: "Shree Care Patient Portal",
    client: "Shree Care Clinic",
    category: "Clinic Web App",
    desc: "Automated booking and patient database portal with real-time WhatsApp visit notifications.",
    tech: ["React.js", "Node.js", "Twilio API", "MongoDB"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    url: null,
    status: "Active"
  },
  {
    name: "Mathed Question Solver",
    client: "Mathed (NITH)",
    category: "Academic Web App",
    desc: "Interactive educational portal with visual crop disease solver and mandi pricing analytics tools.",
    tech: ["React.js", "Firebase", "Gemini Pro", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    url: null,
    status: "Active"
  }
];

const orchestrationProjects = [
  {
    name: "Urban Tadka Ordering Agent",
    client: "Urban Tadka Restaurant",
    category: "Conversational Automation",
    desc: "WhatsApp conversational bot parsing food orders, answering FAQ queries, and managing weekend table bookings.",
    tech: ["FastAPI", "Python", "WhatsApp Cloud API", "Gemini API"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
    status: "Active"
  },
  {
    name: "DESE Lab Scheduler",
    client: "DESE - IISc Bangalore",
    category: "Task Orchestration",
    desc: "Slack agent scheduling lab equipment usage, predicting device workloads, and managing queue exceptions.",
    tech: ["Python", "Slack API", "Redis Queue", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    status: "Active"
  },
  {
    name: "NandniVerse Creator Suite",
    client: "NandniVerse Channel",
    category: "AI SaaS Automation",
    desc: "Automated video script generation and YouTube audience demographic predictor agent for channel optimization.",
    tech: ["Next.js", "OpenAI API", "YouTube Analytics API"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
    status: "Active"
  }
];

const backendProjects = [
  {
    name: "Verma Property Lead Router",
    client: "Verma Property Consultants",
    category: "Database Integration",
    desc: "Automated lead scraper scraping portal listings, scoring user intent, and assigning to brokers on WhatsApp.",
    tech: ["Node.js", "Puppeteer", "OpenAI API", "Airtable"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
    status: "Active"
  },
  {
    name: "GreenWrench Service Router",
    client: "GreenWrench Solutions",
    category: "CRM Pipeline",
    desc: "AI ticket routing database mapping repair requests to field technicians by location and workload.",
    tech: ["React.js", "PostgreSQL", "Google Maps API", "Express.js"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    status: "Active"
  }
];

/* Interactive Browser Iframe Preview Modal */
function IframePreviewModal({ url, title, onClose }) {
  if (!url) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121212] w-full h-full max-w-6xl max-h-[85vh] rounded-2xl overflow-hidden flex flex-col border border-white/10 shadow-2xl relative">
        
        {/* Mock Browser Header */}
        <div className="bg-[#1c1c1c] px-4 py-3 flex items-center justify-between border-b border-white/[0.06] select-none">
          {/* Mac window controls */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] block" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] block" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] block" />
          </div>

          {/* Address Bar */}
          <div className="bg-white/5 border border-white/10 rounded-lg text-white/50 text-[10.5px] font-mono py-1 px-4 max-w-lg w-full text-center truncate flex items-center justify-center gap-1.5">
            <Shield size={10} className="text-green-500" />
            {url}
          </div>

          {/* Close trigger */}
          <button 
            onClick={onClose}
            className="flex items-center gap-1 text-[11px] font-mono text-white/50 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded transition-all cursor-pointer border-none"
          >
            <X size={12} />
            CLOSE
          </button>
        </div>

        {/* Live Interactive Frame */}
        <div className="w-full flex-1 bg-white relative">
          <iframe 
            src={url} 
            className="w-full h-full border-none bg-white" 
            sandbox="allow-scripts allow-same-origin allow-popups" 
            title={title}
          />
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const { openCalBooking } = useCalBooking();
  const [activeFilter, setActiveFilter] = useState('All');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewTitle, setPreviewTitle] = useState('');

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
        data.tag === 'AI Sales Automation' || data.tag === 'AI Voice Automation' || data.tag === 'AI Lead Management' ? 'AI Automation' : null,
        data.tag === 'AI Agriculture Platform' ? 'Product Development' : null,
        data.tag === 'AI Voice Automation' ? 'Voice AI' : null,
        data.tag === 'AI Sales Automation' || data.tag === 'AI Lead Management' ? 'AI CRM' : null
      ].filter(Boolean)
    };
  });

  const filteredProjects = allProjects.filter(project => 
    activeFilter === 'All' || project.filters.includes(activeFilter)
  );

  return (
    <main className="w-full bg-white relative overflow-hidden pt-36 pb-24 font-body">
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
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F6C744] mb-3.5 block flex items-center gap-1.5 select-none">
                <Sparkles size={11} className="fill-brand-yellow" />
                GoRan AI Deployments Portfolio
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold text-brand-dark leading-[0.95] tracking-tight">
                Proof of concept,<br />
                <span className="text-brand-yellow relative">
                  in production.
                </span>
              </h1>
            </div>
            <div className="max-w-xs shrink-0">
              <p className="text-brand-text-muted text-xs md:text-sm leading-relaxed border-l-2 border-[#A855F7] pl-4 py-1">
                We design, code, and deploy custom agent pipelines, database architectures, and production-grade applications that drive operational savings.
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
                  className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 border-none ${
                    isActive
                      ? 'bg-white text-brand-dark shadow-sm'
                      : 'text-brand-text-muted hover:text-brand-dark'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="text-right text-[10px] text-brand-text-muted font-mono uppercase tracking-widest flex items-center gap-1.5">
            <Filter size={11} />
            Showing {filteredProjects.length} Deployments
          </div>
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
                    className={`flex flex-col justify-between pt-6 border-t border-brand-border hover:border-brand-yellow/30 transition-all duration-300 relative group min-w-0 ${
                      isSecondColumn ? 'md:translate-y-12' : ''
                    }`}
                  >
                    <div>
                      {/* Card Header row */}
                      <div className="flex justify-between items-center mb-5 text-[10px] font-mono text-brand-text-muted/40 select-none">
                        <span>SYS_DEPLOY // #{String(index + 1).padStart(2, '0')}</span>
                        <span>{project.timeline} BUILD</span>
                      </div>

                      {/* Tag pill & impact badge */}
                      <div className="flex flex-wrap items-center gap-3.5 mb-4">
                        <span 
                          className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                          style={{ backgroundColor: catColor.bg, color: catColor.text, border: `1px solid ${catColor.border}` }}
                        >
                          {project.tag}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-brand-yellow flex items-center gap-1 bg-brand-yellow/5 px-2 py-0.5 rounded border border-brand-yellow/15 select-none">
                          <CheckCircle size={10} />
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
                      <p className="text-[13px] text-brand-text-muted leading-relaxed mb-6 font-body">
                        {project.challenge.substring(0, 180)}...
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 mb-8">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded bg-brand-bg-light border border-brand-border/60 text-brand-text-muted">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-brand-bg-light border border-brand-border/60 text-brand-text-muted/40">
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
                        <span className="text-[11px] font-bold text-brand-dark">{project.name}</span>
                      </div>

                      <Link to={`/case-studies/${project.id}`} className="no-underline group/link">
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-brand-dark group-hover/link:text-brand-yellow transition-colors duration-200">
                          Inspect Spec
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

        {/* SECTION 1: IMMERSIVE INTERFACES & DIGITAL FRONTENDS */}
        <section className="mt-44 border-t border-brand-border pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F6C744] mb-2.5 block flex items-center gap-1.5">
                <Laptop size={11} />
                CATEGORY // INTERFACE_LAYER
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-brand-dark tracking-tight leading-none">
                Immersive Interfaces &amp; Digital Frontends
              </h2>
            </div>
            <p className="text-brand-text-muted text-xs md:text-sm max-w-sm leading-relaxed border-l-2 border-brand-yellow pl-4 py-1">
              High-fidelity user experiences, micro-interactive websites, and responsive mobile client clone systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {immersiveProjects.map((project, idx) => (
              <div
                key={project.name}
                className="bg-white border border-brand-border hover:border-brand-yellow/30 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-sm hover:shadow-lg hover:shadow-black/[0.02] min-w-0"
              >
                {/* Visual Cover image container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-bg-light border-b border-brand-border select-none">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-102"
                    loading="lazy"
                  />
                  {/* Glassmorphic active status tag overlay on the image */}
                  <span className="absolute top-3.5 right-3.5 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-sm text-green-400 border border-green-400/20 flex items-center gap-1 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    ACTIVE
                  </span>
                </div>

                {/* Content details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-brand-text-muted/60">
                      <span>{project.client}</span>
                      <span className="text-[#F6C744] font-semibold">#{project.category}</span>
                    </div>
                    <h4 className="text-base font-bold text-brand-dark font-heading leading-tight mb-2 group-hover:text-brand-yellow transition-colors duration-200">
                      {project.name}
                    </h4>
                    <p className="text-[12px] text-brand-text-muted leading-relaxed mb-6 font-body">
                      {project.desc}
                    </p>
                  </div>

                  <div className="border-t border-brand-border/40 pt-4 mt-auto flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-[8.5px] font-mono text-brand-text-muted/65 px-1.5 py-0.5 rounded bg-brand-bg-light border border-brand-border/40 select-none">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    {project.url && (
                      <button
                        onClick={() => {
                          setPreviewUrl(project.url);
                          setPreviewTitle(project.name);
                        }}
                        className="bg-brand-dark hover:bg-brand-dark-hover text-white text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg border-none cursor-pointer flex items-center gap-1 transition-colors duration-150 shrink-0"
                      >
                        Live Sandbox
                        <ArrowRight size={10} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: AUTONOMOUS ORCHESTRATIONS & AGENTS */}
        <section className="mt-44 border-t border-brand-border pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#10B981] mb-2.5 block flex items-center gap-1.5">
                <Cpu size={11} />
                CATEGORY // INTELLIGENCE_LAYER
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-brand-dark tracking-tight leading-none">
                Autonomous Orchestrations &amp; Agents
              </h2>
            </div>
            <p className="text-brand-text-muted text-xs md:text-sm max-w-sm leading-relaxed border-l-2 border-[#10B981] pl-4 py-1">
              Conversational WhatsApp booking bots, AI script generators, and custom orchestrator task engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orchestrationProjects.map((project) => (
              <div
                key={project.name}
                className="bg-white border border-brand-border hover:border-brand-yellow/30 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-sm hover:shadow-lg hover:shadow-black/[0.02] min-w-0"
              >
                {/* Visual Cover image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-bg-light border-b border-brand-border select-none">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-102"
                    loading="lazy"
                  />
                  <span className="absolute top-3.5 right-3.5 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-sm text-green-400 border border-green-400/20 flex items-center gap-1 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    ACTIVE
                  </span>
                </div>

                {/* Content details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-brand-text-muted/60">
                      <span>{project.client}</span>
                      <span className="text-[#10B981] font-semibold">#{project.category}</span>
                    </div>
                    <h4 className="text-base font-bold text-brand-dark font-heading leading-tight mb-2 group-hover:text-brand-yellow transition-colors duration-200">
                      {project.name}
                    </h4>
                    <p className="text-[12px] text-brand-text-muted leading-relaxed mb-6 font-body">
                      {project.desc}
                    </p>
                  </div>

                  <div className="border-t border-brand-border/40 pt-4 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[8.5px] font-mono text-brand-text-muted/65 px-1.5 py-0.5 rounded bg-brand-bg-light border border-brand-border/40 select-none">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: DISTRIBUTED BACKENDS & CRM ENGINES */}
        <section className="mt-44 border-t border-brand-border pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#A855F7] mb-2.5 block flex items-center gap-1.5">
                <Database size={11} />
                CATEGORY // ARCHITECTURE_LAYER
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-brand-dark tracking-tight leading-none">
                Distributed Backends &amp; CRM Engines
              </h2>
            </div>
            <p className="text-brand-text-muted text-xs md:text-sm max-w-sm leading-relaxed border-l-2 border-[#A855F7] pl-4 py-1">
              Automated scraper nodes, location dispatch algorithms, and direct CRM data pipeline databases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {backendProjects.map((project) => (
              <div
                key={project.name}
                className="bg-white border border-brand-border hover:border-brand-yellow/30 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-sm hover:shadow-lg hover:shadow-black/[0.02] min-w-0"
              >
                {/* Visual Cover image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-bg-light border-b border-brand-border select-none">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-102"
                    loading="lazy"
                  />
                  <span className="absolute top-3.5 right-3.5 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-sm text-green-400 border border-green-400/20 flex items-center gap-1 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    ACTIVE
                  </span>
                </div>

                {/* Content details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-brand-text-muted/60">
                      <span>{project.client}</span>
                      <span className="text-[#A855F7] font-semibold">#{project.category}</span>
                    </div>
                    <h4 className="text-base font-bold text-brand-dark font-heading leading-tight mb-2 group-hover:text-brand-yellow transition-colors duration-200">
                      {project.name}
                    </h4>
                    <p className="text-[12px] text-brand-text-muted leading-relaxed mb-6 font-body">
                      {project.desc}
                    </p>
                  </div>

                  <div className="border-t border-brand-border/40 pt-4 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[8.5px] font-mono text-brand-text-muted/65 px-1.5 py-0.5 rounded bg-brand-bg-light border border-brand-border/40 select-none">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Operations Metric Section */}
        <div className="mt-40 border-t border-brand-border pt-20 text-center animate-fadeIn">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted mb-12 select-none">GoRan AI Global Benchmark Metrics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-brand-bg-light border border-brand-border/80 rounded-2xl p-6 shadow-sm">
              <div className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark leading-none">99.9%</div>
              <div className="text-xs text-brand-text-muted mt-2 font-medium">Uptime Guarantee</div>
            </div>
            <div className="bg-brand-bg-light border border-brand-border/80 rounded-2xl p-6 shadow-sm">
              <div className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark leading-none">500k+</div>
              <div className="text-xs text-brand-text-muted mt-2 font-medium">Actions Orchestrated Daily</div>
            </div>
            <div className="bg-brand-bg-light border border-brand-border/80 rounded-2xl p-6 shadow-sm">
              <div className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark leading-none">4.9/5</div>
              <div className="text-xs text-brand-text-muted mt-2 font-medium">Customer Trust Score</div>
            </div>
            <div className="bg-brand-bg-light border border-brand-border/80 rounded-2xl p-6 shadow-sm">
              <div className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark leading-none">&lt;5hrs</div>
              <div className="text-xs text-brand-text-muted mt-2 font-medium">Mean Response Time</div>
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
          style={{ background: '#0E0E0E' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-yellow blur-[120px] opacity-10" />
          </div>
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-heading font-bold leading-tight mb-4">
              Deploy your own autonomous operations
            </h2>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-lg mx-auto mb-8 font-body">
              Let's analyze your processes, build tailored system logic, and deploy autonomous execution nodes built on standard frameworks.
            </p>
            <button
              onClick={openCalBooking}
              className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-semibold text-xs py-3.5 px-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-brand-yellow/15 border-none cursor-pointer"
            >
              Request Custom Audit
            </button>
          </div>
        </motion.div>

      </div>

      {/* Interactive Sandbox Iframe Preview Modal */}
      <IframePreviewModal 
        url={previewUrl} 
        title={previewTitle} 
        onClose={() => setPreviewUrl(null)} 
      />
    </main>
  );
}
