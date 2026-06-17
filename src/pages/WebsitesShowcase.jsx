import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useCalBooking } from '../components/CalBookingModal';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Layout, 
  Filter, 
  X, 
  Laptop, 
  Shield, 
  Globe, 
  ExternalLink,
  ShoppingBag,
  Cpu,
  Layers,
  Settings
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Footer from '../components/Footer';

const categories = ['All', 'E-Commerce', 'Web App', 'Immersive', 'Corporate', 'Industrial'];

const categoryColors = {
  'E-Commerce': { bg: 'rgba(249, 115, 22, 0.08)', text: '#F97316', border: 'rgba(249, 115, 22, 0.2)' },
  'Web App': { bg: 'rgba(16, 185, 129, 0.08)', text: '#10B981', border: 'rgba(16, 185, 129, 0.2)' },
  'Immersive': { bg: 'rgba(168, 85, 247, 0.08)', text: '#A855F7', border: 'rgba(168, 85, 247, 0.2)' },
  'Corporate': { bg: 'rgba(59, 130, 246, 0.08)', text: '#3B82F6', border: 'rgba(59, 130, 246, 0.2)' },
  'Industrial': { bg: 'rgba(239, 68, 68, 0.08)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.2)' }
};

const websitesData = [
  {
    id: "hadoti-farms",
    name: "Hadoti Farms",
    category: "E-Commerce",
    desc: "Custom agritech marketplace and supply chain portal connecting farms to bulk buyers with real-time inventory management.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "REST APIs"],
    image: "/hadoti-farms.png",
    url: "https://hadotifarms.anaaj.ai/",
    impact: "Farm-to-buyer automation"
  },
  {
    id: "anaaj-ai",
    name: "Anaaj AI",
    category: "E-Commerce",
    desc: "Advanced agricultural trading platform leveraging AI algorithms to predict price fluctuations and manage distribution queues.",
    tech: ["React.js", "Vite", "Node.js", "Express.js"],
    image: "/anaaj-ai.png",
    url: "https://anaaj.ai/",
    impact: "AI price forecasting"
  },
  {
    id: "herbsera",
    name: "Herbsera Wellness",
    category: "E-Commerce",
    desc: "Premium direct-to-consumer store for herbal remedies and organic skincare, featuring smooth scroll aesthetics and rapid cart routing.",
    tech: ["React.js", "Tailwind CSS", "Vite", "Framer Motion"],
    image: "/herbsera.png",
    url: "https://herbsera.in/",
    impact: "Fluid D2C storefront"
  },
  {
    id: "arobotics-services",
    name: "ARobotics Services",
    category: "Industrial",
    desc: "Business hub and catalog for industrial robotics consulting, featuring interactive system diagrams and client engagement funnels.",
    tech: ["React.js", "GSAP", "Tailwind CSS", "Vite"],
    image: "/arobotics.png",
    url: "https://aroboticservices.com/",
    impact: "Enterprise B2B outreach"
  },
  {
    id: "art-nexus-delta",
    name: "Art Nexus Delta",
    category: "Immersive",
    desc: "Interactive art collective catalog displaying generative visual portfolios, horizontal scroll animations, and canvas-based hover states.",
    tech: ["React.js", "Tailwind CSS", "Vite", "GSAP"],
    image: "/art-nexus.png",
    url: "https://art-nexus-delta.vercel.app/",
    impact: "Immersive web gallery"
  },
  {
    id: "aura-grid",
    name: "Aura Grid Layout",
    category: "Immersive",
    desc: "A futuristic grid experimental system showcasing complex CSS alignments, responsive auto-fitting cards, and interactive glass filters.",
    tech: ["HTML5", "Vanilla CSS", "JavaScript", "Vercel"],
    image: "/aura-grid.png",
    url: "https://aura-grid-pi.vercel.app/",
    impact: "Grid styling benchmark"
  },
  {
    id: "asme-chapter",
    name: "ASME Student Body",
    category: "Corporate",
    desc: "Academic portal for the mechanical engineering student chapter, showcasing interactive event timelines, member directories, and project logs.",
    tech: ["React.js", "Vite", "Framer Motion", "Tailwind CSS"],
    image: "/asme.png",
    url: "https://asme-seven.vercel.app/",
    impact: "Student network hub"
  },
  {
    id: "roboweek-symposium",
    name: "RoboWeek 3.0",
    category: "Immersive",
    desc: "High-octane robotics symposium portal featuring a cyberpunk visual design, dynamic schedule filters, and animated registration prompts.",
    tech: ["React.js", "Vite", "Tailwind CSS", "GSAP"],
    image: "/roboweek.png",
    url: "https://roboweek-3-0.vercel.app/",
    impact: "Dynamic symposium registry"
  },
  {
    id: "codewave-it",
    name: "Codewave IT",
    category: "Corporate",
    desc: "Premium corporate website for a custom software consulting firm, highlighting enterprise capability boards and case study files.",
    tech: ["React.js", "Vite", "Tailwind CSS", "Framer Motion"],
    image: "/codewave.png",
    url: "https://codewave.it.com/",
    impact: "Lead intake optimization"
  },
  {
    id: "greenwrench-solutions",
    name: "Green Wrench Solutions",
    category: "Web App",
    desc: "Service management and scheduling system routing work orders to field technicians in real-time based on coordinate paths.",
    tech: ["React.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: "/greenwrench.png",
    url: "https://greenwrenchsolutions.in/",
    impact: "Autonomous ticket dispatch"
  },
  {
    id: "kumar-power",
    name: "Kumar Power Systems",
    category: "Industrial",
    desc: "Industrial power equipment showroom and logistical directory for commercial diesel generators and backup UPS pipelines.",
    tech: ["HTML5", "Tailwind CSS", "JavaScript", "Vercel"],
    image: "/kumar-power.png",
    url: "https://www.kumarpower.com/",
    impact: "Commercial catalog traffic"
  },
  {
    id: "saksham-dashboard",
    name: "Saksham Portal",
    category: "Web App",
    desc: "Custom training management dashboard tracking user metrics, course logs, and live classroom analytics with graphical widgets.",
    tech: ["React.js", "Vite", "Framer Motion", "Tailwind CSS"],
    image: "/saksham.png",
    url: "https://saksham-chi.vercel.app/",
    impact: "Visual analytics display"
  }
];

function IframePreviewModal({ url, title, onClose }) {
  if (!url) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121212] w-full h-full max-w-6xl max-h-[85vh] rounded-2xl overflow-hidden flex flex-col border border-white/10 shadow-2xl relative">
        
        {/* Mock Browser Header */}
        <div className="bg-[#1c1c1c] px-4 py-3 flex items-center justify-between gap-3 border-b border-white/[0.06] select-none">
          {/* Mac window controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] block" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] block" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] block" />
          </div>

          {/* Address Bar */}
          <div className="hidden sm:flex bg-white/5 border border-white/10 rounded-lg text-white/50 text-[11px] font-mono py-1 px-4 max-w-lg w-full text-center truncate items-center justify-center gap-1.5">
            <Shield size={10} className="text-green-500" />
            {url}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <a 
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-mono text-[#F6C744] hover:text-white bg-[#F6C744]/10 hover:bg-[#F6C744]/20 px-3 py-1.5 rounded transition-all cursor-pointer no-underline"
            >
              <ExternalLink size={12} />
              VISIT
            </a>
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-[11px] font-mono text-white/50 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded transition-all cursor-pointer border-none"
            >
              <X size={12} />
              CLOSE
            </button>
          </div>
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

export default function WebsitesShowcase() {
  const { openCalBooking } = useCalBooking();
  const [activeFilter, setActiveFilter] = useState('All');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewTitle, setPreviewTitle] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredWebsites = websitesData.filter(site => 
    activeFilter === 'All' || site.category === activeFilter
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEOHead 
        title="Websites Showcase | Web Design & E-Commerce Portfolio — GoRan AI"
        description="Browse our portfolio of custom web applications, high-converting D2C e-commerce stores, B2B company pages, and immersive frontend interfaces."
        canonicalPath="/services/websites"
      />

      <main className="w-full bg-white relative overflow-hidden pt-36 pb-24 flex-1">
        {/* Decorative background glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-brand-yellow/3 blur-[120px]" />
          <div className="absolute bottom-[15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-500/2 blur-[130px]" />
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
          
          {/* Back link */}
          <Link to="/" className="inline-flex items-center gap-1.5 no-underline text-brand-text-muted text-sm font-medium mb-8 group transition-colors hover:text-brand-dark">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            All Services
          </Link>

          {/* Editorial Header */}
          <div className="mb-12 border-b border-brand-border pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F6C744] mb-3.5 block flex items-center gap-1.5 select-none">
                  <Sparkles size={11} className="fill-brand-yellow" />
                  Portfolio Deployments
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold text-brand-dark leading-[0.95] tracking-tight">
                  Premium Web<br />
                  <span className="text-brand-yellow relative">
                    Showcase.
                  </span>
                </h1>
              </div>
              <div className="max-w-xs shrink-0">
                <p className="text-brand-text-muted text-xs md:text-sm leading-relaxed border-l-2 border-[#A855F7] pl-4 py-1">
                  A curated collection of e-commerce platforms, custom web apps, and corporate websites built to combine premium design with rapid performance.
                </p>
              </div>
            </div>
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap items-center justify-between border-b border-brand-border/40 pb-6 mb-16 gap-4">
            <div className="flex flex-wrap gap-1.5 bg-brand-bg-light p-1 rounded-xl border border-brand-border/80">
              {categories.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 border-none ${isActive
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
              Showing {filteredWebsites.length} Deployments
            </div>
          </div>

          {/* Interactive Websites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            <AnimatePresence mode="popLayout">
              {filteredWebsites.map((project, idx) => {
                const catColor = categoryColors[project.category] || categoryColors['Corporate'];
                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white border border-brand-border hover:border-brand-yellow/30 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-sm hover:shadow-lg hover:shadow-black/[0.02]"
                  >
                    {/* Visual Cover image container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-brand-bg-light border-b border-brand-border select-none">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-102"
                        loading="lazy"
                      />
                      {/* Glassmorphic active status tag overlay on the image */}
                      <span className="absolute top-3.5 right-3.5 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-sm text-green-400 border border-green-400/20 flex items-center gap-1 select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        LIVE SITE
                      </span>
                    </div>

                    {/* Content details */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span 
                            className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                            style={{ backgroundColor: catColor.bg, color: catColor.text, border: `1px solid ${catColor.border}` }}
                          >
                            {project.category}
                          </span>
                          <span className="text-[10px] font-mono text-brand-text-muted/65">{project.impact}</span>
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
                          {project.tech.map((t) => (
                            <span key={t} className="text-[8.5px] font-mono text-brand-text-muted/65 px-1.5 py-0.5 rounded bg-brand-bg-light border border-brand-border/40 select-none">
                              {t}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            setPreviewUrl(project.url);
                            setPreviewTitle(project.name);
                          }}
                          className="bg-brand-dark hover:bg-brand-dark-hover text-white text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg border-none cursor-pointer flex items-center gap-1 transition-colors duration-150 shrink-0 shadow-sm"
                        >
                          Live Sandbox
                          <ArrowRight size={10} />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 md:p-14 text-white text-center relative overflow-hidden"
            style={{ background: '#0E0E0E' }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-yellow blur-[120px] opacity-10" />
            </div>
            <div className="relative z-10 max-w-xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-heading font-bold leading-tight mb-4">
                Want to build a premium web experience?
              </h2>
              <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-lg mx-auto mb-8 font-body">
                Let's discuss how we can build a high-performance website, landing page, or custom product dashboard tailored for your business.
              </p>
              <button
                onClick={openCalBooking}
                className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-semibold text-xs py-3.5 px-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-brand-yellow/15 border-none cursor-pointer"
              >
                Book a Scoping Call
              </button>
            </div>
          </motion.div>

        </div>
      </main>


      {/* Interactive Sandbox Iframe Preview Modal */}
      <IframePreviewModal
        url={previewUrl}
        title={previewTitle}
        onClose={() => setPreviewUrl(null)}
      />
    </div>
  );
}
