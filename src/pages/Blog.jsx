import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { blogPostsList, categories } from '../data/blog';
import { Grid, List, BookOpen, Search, ArrowRight, X, Cpu, Clock, Calendar, CornerDownRight, Tag, Sparkles } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { buildBreadcrumbSchema } from '../seo/schemas';

const categoryColors = {
  'AI Strategy': { bg: 'rgba(246, 199, 68, 0.08)', text: '#F6C744', border: 'rgba(246, 199, 68, 0.2)' },
  'Process': { bg: 'rgba(168, 85, 247, 0.08)', text: '#A855F7', border: 'rgba(168, 85, 247, 0.2)' },
  'Engineering': { bg: 'rgba(59, 130, 246, 0.08)', text: '#3B82F6', border: 'rgba(59, 130, 246, 0.2)' },
  'Business': { bg: 'rgba(236, 72, 153, 0.08)', text: '#EC4899', border: 'rgba(236, 72, 153, 0.2)' },
  'AI CRM': { bg: 'rgba(20, 184, 166, 0.08)', text: '#14B8A6', border: 'rgba(20, 184, 166, 0.2)' },
  'Voice AI': { bg: 'rgba(249, 115, 22, 0.08)', text: '#F97316', border: 'rgba(249, 115, 22, 0.2)' },
  'Growth': { bg: 'rgba(16, 185, 129, 0.08)', text: '#10B981', border: 'rgba(16, 185, 129, 0.2)' },
  'Web + AI': { bg: 'rgba(99, 102, 241, 0.08)', text: '#6366F1', border: 'rgba(99, 102, 241, 0.2)' },
  'Automation': { bg: 'rgba(239, 68, 68, 0.08)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.2)' },
  'Industry': { bg: 'rgba(107, 114, 128, 0.08)', text: '#6B7280', border: 'rgba(107, 114, 128, 0.2)' }
};

const accentColors = ['#F6C744', '#A855F7', '#3B82F6', '#EC4899', '#14B8A6', '#F97316'];
const popularSearches = ['Agents', 'ROI', 'WhatsApp', 'Safety', 'Architecture'];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* Interactive SVG Orchestration Blueprint Component */
function AgentOrchestratorBlueprint() {
  const [activeNode, setActiveNode] = useState('orchestrator');

  const nodes = {
    ingest: {
      title: '1. Inbound Ingest',
      metrics: { latency: '< 12ms', source: 'Webhooks/WhatsApp', status: 'Listening' },
      desc: 'Ingests raw unstructured triggers—emails, PDFs, database rows, or real-time voice calls. Normalizes payloads instantly.',
      x: 60, y: 70
    },
    orchestrator: {
      title: '2. LLM Orchestrator',
      metrics: { latency: '85ms', model: 'GoRan-Reasoning-v2', status: 'Processing' },
      desc: 'Breaks down complex requirements into sequential tasks. Dynamically matches tool parameters and schedules execution paths.',
      x: 180, y: 140
    },
    workers: {
      title: '3. Specialized Workers',
      metrics: { speed: '120 t/s', active: '5 Sub-agents', status: 'Standby' },
      desc: 'Micro-agents execute domain tasks (e.g., parsing compliance rules, query building, writing outbound templates).',
      x: 300, y: 70
    },
    verification: {
      title: '4. Guardrails & Validation',
      metrics: { threshold: '98.5%', method: 'Dual-pass verify', status: 'Armed' },
      desc: 'Validates outputs against schemas and business rules. Automatically routes anomalies to Human-in-the-Loop escalation.',
      x: 300, y: 210
    },
    dispatch: {
      title: '5. Action Dispatcher',
      metrics: { channels: 'APIs/CRM/Slack', rate: '500k/day', status: 'Ready' },
      desc: 'Executes approved actions: writing records to Salesforce, sending WhatsApp replies, or triggering local database hooks.',
      x: 60, y: 210
    }
  };

  return (
    <div className="bg-[#0e0e0e] rounded-2xl border border-white/[0.06] p-6 lg:p-8 flex flex-col justify-between h-full min-h-[380px] text-white font-mono select-none overflow-hidden relative">
      <style>{`
        @keyframes marquee-path {
          to { stroke-dashoffset: -160; }
        }
        .animate-marquee-path {
          animation: marquee-path 2.5s linear infinite;
        }
      `}</style>
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-yellow/10 blur-[80px] pointer-events-none animate-pulse" />
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-white/50 tracking-wider">SYSTEM: ACTIVE_BLUEPRINT</span>
        </div>
        <span className="text-[9px] text-[#F6C744] bg-[#F6C744]/10 px-2 py-0.5 rounded border border-[#F6C744]/20">99.9% Uptime</span>
      </div>

      {/* SVG Canvas Area */}
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-center my-6 relative z-10">
        <div className="relative w-full aspect-[4/3] flex items-center justify-center bg-black/40 rounded-xl border border-white/5 p-4">
          <svg className="w-full h-full max-w-[360px] max-h-[270px]" viewBox="0 0 360 270" fill="none">
            {/* Animated paths between nodes */}
            {/* Ingest -> Orchestrator */}
            <path d="M 60 70 L 180 140" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" />
            <path d="M 60 70 L 180 140" stroke={activeNode === 'ingest' ? '#F6C744' : 'rgba(246, 199, 68, 0.2)'} strokeWidth="1.5" strokeDasharray="8 8" className="animate-marquee-path" />

            {/* Orchestrator -> Workers */}
            <path d="M 180 140 L 300 70" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" />
            <path d="M 180 140 L 300 70" stroke={activeNode === 'orchestrator' ? '#F6C744' : 'rgba(246, 199, 68, 0.2)'} strokeWidth="1.5" strokeDasharray="8 8" className="animate-marquee-path" />

            {/* Workers -> Verification */}
            <path d="M 300 70 L 300 210" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" />
            <path d="M 300 70 L 300 210" stroke={activeNode === 'workers' ? '#F6C744' : 'rgba(246, 199, 68, 0.2)'} strokeWidth="1.5" strokeDasharray="8 8" className="animate-marquee-path" />

            {/* Verification -> Dispatch */}
            <path d="M 300 210 L 60 210" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" />
            <path d="M 300 210 L 60 210" stroke={activeNode === 'verification' ? '#F6C744' : 'rgba(246, 199, 68, 0.2)'} strokeWidth="1.5" strokeDasharray="8 8" className="animate-marquee-path" />

            {/* Dispatch -> Ingest */}
            <path d="M 60 210 L 60 70" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" />
            <path d="M 60 210 L 60 70" stroke={activeNode === 'dispatch' ? '#F6C744' : 'rgba(246, 199, 68, 0.2)'} strokeWidth="1.5" strokeDasharray="8 8" className="animate-marquee-path" />

            {/* Interactive Circles / Nodes */}
            {Object.entries(nodes).map(([key, node]) => {
              const isActive = activeNode === key;
              return (
                <g 
                  key={key} 
                  className="cursor-pointer group" 
                  onClick={() => setActiveNode(key)}
                  onMouseEnter={() => setActiveNode(key)}
                >
                  <circle 
                    cx={node.x} 
                    cy={node.y} 
                    r="18" 
                    fill={isActive ? '#F6C744' : '#171717'} 
                    stroke={isActive ? '#F6C744' : 'rgba(255,255,255,0.25)'} 
                    strokeWidth="1.5" 
                    className="transition-all duration-300 group-hover:scale-110"
                  />
                  {isActive && (
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r="23" 
                      stroke="#F6C744" 
                      strokeWidth="1" 
                      fill="none" 
                      className="animate-ping opacity-25" 
                    />
                  )}
                  <text 
                    x={node.x} 
                    y={node.y + 3.5} 
                    textAnchor="middle" 
                    fill={isActive ? '#171717' : '#E5E7EB'} 
                    fontSize="8.5" 
                    fontWeight="bold"
                  >
                    {key === 'ingest' ? 'IN' : key === 'orchestrator' ? 'LLM' : key === 'workers' ? 'WRK' : key === 'verification' ? 'VRF' : 'DSP'}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex flex-col justify-center min-h-[170px] bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <div className="text-[10px] text-[#F6C744] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Cpu size={10} />
            {nodes[activeNode].title}
          </div>
          <p className="text-[10.5px] text-white/70 leading-relaxed mb-3 font-body">
            {nodes[activeNode].desc}
          </p>
          <div className="border-t border-white/5 pt-2 flex flex-col gap-1 text-[9px] text-white/40">
            {Object.entries(nodes[activeNode].metrics).map(([mKey, mVal]) => (
              <div key={mKey} className="flex justify-between">
                <span className="uppercase">{mKey}:</span>
                <span className="text-white/80 font-bold">{mVal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-between text-[9px] text-white/30">
        <span>RUNNING: ORCHESTRATION_CORE_v2.0</span>
        <span>HOVER OR CLICK NODES</span>
      </div>
    </div>
  );
}

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState('editorial'); // 'editorial' | 'technical' | 'grid'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter posts
  const filtered = blogPostsList.filter((post) => {
    const matchesCategory = activeFilter === 'All' || post.category === activeFilter;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Dynamically calculate counts
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = blogPostsList.filter(p => p.category === cat).length;
    return acc;
  }, { 'All': blogPostsList.length });

  // Featured post definition (only when Editorial, All filter, and no search query)
  const isDefaultView = activeFilter === 'All' && searchQuery === '';
  const showFeatured = layoutMode === 'editorial' && isDefaultView && filtered.length > 0;
  const featuredPost = showFeatured ? filtered[0] : null;
  const feedPosts = showFeatured ? filtered.slice(1) : filtered;

  return (
    <main className="w-full bg-white relative overflow-hidden pt-36 pb-24 font-body">
      <SEOHead
        title="GoRan AI Blog | AI Automation, Voice Agents & Business AI Insights"
        description="Deep-dives into multi-agent systems, AI automation playbooks, voice agent architectures, WhatsApp bots, and operational ROI metrics from GoRan AI."
        canonicalPath="/blog"
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog' },
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
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A855F7] mb-3.5 block flex items-center gap-1.5">
                <Sparkles size={11} className="text-brand-yellow" />
                GoRan AI Intelligence Journal
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold text-brand-dark leading-[0.95] tracking-tight">
                Architecting<br />
                <span className="text-brand-yellow relative">
                  autonomous systems.
                </span>
              </h1>
            </div>
            <div className="max-w-xs shrink-0">
              <p className="text-brand-text-muted text-xs md:text-sm leading-relaxed border-l-2 border-brand-yellow pl-4 py-1">
                Deep-dives into multi-agent systems, engineering playbooks, operational ROI metrics, and automation design principles.
              </p>
            </div>
          </div>
        </div>

        {/* Layout Control Bar & Category Quick Slider */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-brand-border/40 pb-6 mb-12 gap-4">
          {/* Layout buttons */}
          <div className="flex max-w-full items-center gap-1.5 overflow-x-auto bg-brand-bg-light p-1 rounded-xl border border-brand-border/80 scrollbar-hide">
            <button
              onClick={() => setLayoutMode('editorial')}
              className={`flex shrink-0 items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 ${
                layoutMode === 'editorial'
                  ? 'bg-white text-brand-dark shadow-sm'
                  : 'text-brand-text-muted hover:text-brand-dark'
              }`}
            >
              <BookOpen size={13} className={layoutMode === 'editorial' ? 'text-brand-yellow' : ''} />
              Editorial Journal
            </button>
            <button
              onClick={() => setLayoutMode('grid')}
              className={`flex shrink-0 items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 ${
                layoutMode === 'grid'
                  ? 'bg-white text-brand-dark shadow-sm'
                  : 'text-brand-text-muted hover:text-brand-dark'
              }`}
            >
              <Grid size={13} className={layoutMode === 'grid' ? 'text-brand-yellow' : ''} />
              Grid Cards
            </button>
            <button
              onClick={() => setLayoutMode('technical')}
              className={`flex shrink-0 items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 ${
                layoutMode === 'technical'
                  ? 'bg-white text-brand-dark shadow-sm'
                  : 'text-brand-text-muted hover:text-brand-dark'
              }`}
            >
              <List size={13} className={layoutMode === 'technical' ? 'text-brand-yellow' : ''} />
              Technical Logs
            </button>
          </div>

          <div className="text-right text-[10px] text-brand-text-muted font-mono uppercase tracking-widest hidden md:block">
            Displaying {filtered.length} of {blogPostsList.length} articles
          </div>
        </div>

        {/* Featured Article Block (Editorial Mode Spotlight Only) */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-text-muted mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              Featured Spotlight
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 bg-brand-bg-light/45 border border-brand-border rounded-3xl p-6 lg:p-10 transition-all duration-500 hover:border-brand-yellow/30 hover:shadow-[0_12px_40px_rgba(246,199,68,0.04)] relative">
              {/* Left side: content info */}
              <div className="flex flex-col justify-between py-2 min-w-0">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span 
                      className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: (categoryColors[featuredPost.category] || categoryColors['AI Strategy']).bg,
                        color: (categoryColors[featuredPost.category] || categoryColors['AI Strategy']).text,
                        border: `1px solid ${(categoryColors[featuredPost.category] || categoryColors['AI Strategy']).border}`,
                      }}
                    >
                      {featuredPost.category}
                    </span>
                    <span className="text-[11px] text-brand-text-muted flex items-center gap-1 font-mono">
                      <Clock size={11} />
                      {featuredPost.readTime}
                    </span>
                    <span className="text-[11px] text-brand-text-muted font-mono flex items-center gap-1">
                      <Calendar size={11} />
                      {formatDate(featuredPost.date)}
                    </span>
                  </div>

                  <Link to={`/blog/${featuredPost.slug}`} className="no-underline group/title">
                    <h2 className="text-2xl sm:text-4xl font-heading font-bold text-brand-dark leading-tight group-hover/title:text-brand-yellow transition-colors duration-300">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-brand-text-muted text-sm leading-relaxed font-body">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-border/60">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-white text-[10px] font-bold font-heading">
                      AR
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-brand-dark">{featuredPost.author}</div>
                      <div className="text-[10px] text-brand-text-muted">{featuredPost.authorRole}</div>
                    </div>
                  </div>

                  <Link to={`/blog/${featuredPost.slug}`} className="no-underline group/link">
                    <span className="flex items-center gap-2 text-xs font-bold text-brand-dark group-hover/link:text-brand-yellow transition-colors duration-300">
                      Read Blueprint
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right side: dynamic orchestrator interactive visual representation */}
              <div className="min-h-[380px]">
                <AgentOrchestratorBlueprint />
              </div>
            </div>
          </motion.div>
        )}

        {/* Two Column Layout: Sticky Sidebar Navigation & Dynamic Articles Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">
          
          {/* STICKY SIDEBAR: Search, Categories, Author Profile */}
          <aside className="lg:sticky lg:top-28 flex flex-col gap-10 z-20">
            {/* Search Input block */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted select-none">
                Search Articles
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Query system files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-bg-light/60 border border-brand-border rounded-xl pl-10 pr-10 py-2.5 text-xs text-brand-text-main font-mono outline-none focus:border-brand-yellow/60 focus:ring-2 focus:ring-brand-yellow/5 transition-all duration-200"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted/40">
                  <Search size={13} />
                </span>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-dark border-none bg-transparent cursor-pointer"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Search chips */}
              <div className="flex flex-wrap gap-1.5 mt-1">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-brand-bg-light border border-brand-border/60 text-brand-text-muted hover:text-brand-dark hover:border-brand-yellow/45 transition-colors cursor-pointer"
                  >
                    +{term}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories sidebar navigation */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-4 select-none">
                Categories
              </h3>
              <nav className="flex flex-col gap-1">
                {['All', ...categories].map((cat) => {
                  const isActive = activeFilter === cat;
                  const count = categoryCounts[cat] || 0;
                  // Calculate active index line height proportion
                  const percent = blogPostsList.length ? (count / blogPostsList.length) * 100 : 0;
                  
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveFilter(cat);
                        // Reset search if filtering category
                        setSearchQuery('');
                      }}
                      className={`group flex items-center justify-between text-left py-2 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 border-none ${
                        isActive
                          ? 'bg-brand-yellow/10 text-brand-dark'
                          : 'bg-transparent text-brand-text-muted hover:text-brand-dark hover:bg-brand-bg-light/40'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {/* Dot indicator representing state */}
                        <span 
                          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: isActive 
                              ? (categoryColors[cat]?.text || '#F6C744')
                              : 'transparent',
                            border: isActive 
                              ? 'none' 
                              : '1px solid rgba(115, 115, 115, 0.4)'
                          }}
                        />
                        <span>{cat}</span>
                      </div>
                      <span className={`text-[9.5px] px-2 py-0.5 rounded font-mono ${isActive ? 'bg-brand-yellow/20 text-brand-dark' : 'bg-brand-bg-light text-brand-text-muted/60'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Micro Author Biography Profile */}
            <div className="rounded-2xl border border-brand-border bg-brand-bg-light/40 p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/3 rounded-full blur-2xl pointer-events-none" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-4 select-none flex items-center gap-1.5">
                <Cpu size={10} className="text-purple-400" />
                Principal Architect
              </h4>
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-brand-dark text-white flex items-center justify-center font-heading font-semibold text-xs shrink-0 select-none">
                  AR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-dark">Ashish Ranjan</h4>
                  <p className="text-[10.5px] text-brand-text-muted leading-relaxed mt-1">
                    Designs autonomous multi-agent networks and API system loops. Advises enterprises on operational automation scaling.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* DYNAMIC FEED COLUMN */}
          <div className="w-full min-w-0">
            <AnimatePresence mode="wait">
              {/* EDITORIAL JOURNAL LAYOUT */}
              {layoutMode === 'editorial' && (
                <motion.div
                  key="editorial-feed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16"
                >
                  {feedPosts.map((post, index) => {
                    const totalIndex = showFeatured ? index + 1 : index;
                    const catColor = categoryColors[post.category] || categoryColors['AI Strategy'];
                    // Stagger second column translation
                    const isSecondColumn = index % 2 === 1;

                    // Dynamically set layout styles for rhythmic variety
                    const isWidePromo = index === 0; // Highlight the first post in grid as a wide item
                    
                    if (isWidePromo) {
                      return (
                        <div key={post.slug} className="col-span-full border-t border-brand-border hover:border-brand-yellow/30 pt-8 transition-colors duration-300 relative group min-w-0">
                          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 md:gap-10">
                            <div>
                              <div className="flex justify-between items-center mb-4 text-[10px] font-mono text-brand-text-muted/40 select-none">
                                <span>SYSTEM_FILE // #{String(totalIndex + 1).padStart(2, '0')}</span>
                                <span>{formatDate(post.date)}</span>
                              </div>
                              <div className="flex items-center gap-3.5 mb-3.5">
                                <span 
                                  className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                                  style={{ backgroundColor: catColor.bg, color: catColor.text, border: `1px solid ${catColor.border}` }}
                                >
                                  {post.category}
                                </span>
                                <span className="text-[10px] text-brand-text-muted flex items-center gap-1 font-mono">
                                  <Clock size={10} />
                                  {post.readTime}
                                </span>
                              </div>
                              <Link to={`/blog/${post.slug}`} className="no-underline block mb-3.5 group/title">
                                <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-dark leading-snug group-hover/title:text-brand-yellow transition-colors duration-300">
                                  {post.title}
                                </h3>
                              </Link>
                              <p className="text-[13px] text-brand-text-muted leading-relaxed font-body mb-6">
                                {post.excerpt}
                              </p>
                              <div className="flex items-center justify-between border-t border-brand-border/30 pt-4">
                                <div className="flex gap-2">
                                  {post.tags.map((tag) => (
                                    <span key={tag} className="text-[9px] text-brand-text-muted/50 font-mono flex items-center gap-0.5">
                                      <Tag size={8} />
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <Link to={`/blog/${post.slug}`} className="no-underline">
                                  <span className="flex items-center gap-1 text-[11px] font-bold text-brand-dark hover:text-brand-yellow transition-colors duration-200">
                                    Analyze
                                    <ArrowRight size={12} />
                                  </span>
                                </Link>
                              </div>
                            </div>
                            <div className="hidden md:flex bg-brand-bg-light/60 border border-brand-border/80 rounded-2xl p-6 flex-col justify-between select-none relative overflow-hidden group-hover:border-brand-yellow/20 transition-all duration-300">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/[0.02] rounded-full blur-xl" />
                              <div className="font-mono text-[9px] text-brand-text-muted/30">METRIC_LOG // {post.category.toUpperCase()}</div>
                              <div className="my-auto font-mono text-[10.5px] text-brand-text-muted leading-relaxed space-y-1">
                                <div>&gt; _STATUS: ARCHITECTED</div>
                                <div>&gt; _KEYWORD: {post.tags[0] || 'SYSTEM'}</div>
                                <div>&gt; _READ_CYCLE: {post.readTime}</div>
                              </div>
                              <span className="text-[9.5px] font-mono text-brand-yellow/60 font-semibold tracking-wider flex items-center gap-1">
                                <CornerDownRight size={10} />
                                DEPLOYED SPEC
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <motion.article
                        key={post.slug}
                        layout
                        className={`flex flex-col justify-between pt-6 border-t border-brand-border hover:border-brand-yellow/30 transition-all duration-300 relative group min-w-0 ${
                          isSecondColumn ? 'md:translate-y-8' : ''
                        }`}
                      >
                        <div>
                          {/* Upper row: Number & Date */}
                          <div className="flex justify-between items-center mb-5 text-[10px] font-mono text-brand-text-muted/40 select-none">
                            <span>#{String(totalIndex + 1).padStart(2, '0')}</span>
                            <span>{formatDate(post.date)}</span>
                          </div>

                          {/* Category & Readtime */}
                          <div className="flex items-center gap-3.5 mb-4">
                            <span 
                              className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                              style={{ backgroundColor: catColor.bg, color: catColor.text, border: `1px solid ${catColor.border}` }}
                            >
                              {post.category}
                            </span>
                            <span className="text-[10px] text-brand-text-muted flex items-center gap-1 font-mono">
                              <Clock size={10} />
                              {post.readTime}
                            </span>
                          </div>

                          {/* Title */}
                          <Link to={`/blog/${post.slug}`} className="no-underline block mb-3.5">
                            <h3 className="text-lg font-heading font-bold text-brand-dark leading-tight group-hover:text-brand-yellow transition-colors duration-300">
                              {post.title}
                            </h3>
                          </Link>

                          {/* Excerpt */}
                          <p className="text-[13px] text-brand-text-muted leading-relaxed line-clamp-2 mb-6 font-body">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Footer Row: Tags & Read Arrow */}
                        <div className="flex justify-between items-center pt-4 border-t border-brand-border/30 mt-auto">
                          <div className="flex gap-1.5 flex-wrap">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="text-[9.5px] text-brand-text-muted/40 font-mono">
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <Link to={`/blog/${post.slug}`} className="no-underline shrink-0">
                            <span className="w-7 h-7 rounded-full bg-brand-bg-light/40 group-hover:bg-brand-yellow/10 flex items-center justify-center transition-colors duration-300">
                              <ArrowRight size={11} className="text-brand-text-muted group-hover:text-brand-yellow transition-transform duration-300 group-hover:translate-x-0.5" />
                            </span>
                          </Link>
                        </div>

                        {/* Inject editorial decorative layout break inside the loop at a specific position */}
                        {totalIndex === 4 && isDefaultView && (
                          <div className="col-span-full my-8 bg-brand-bg-light/40 border border-brand-border rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden select-none">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/5 rounded-full blur-[80px] pointer-events-none" />
                            <div className="max-w-md">
                              <span className="text-[9.5px] font-mono uppercase text-brand-yellow tracking-widest block mb-2 font-bold">INSIGHT ARCHITECT</span>
                              <h4 className="text-base sm:text-lg font-heading font-bold text-brand-dark leading-snug">
                                "Our system integration methodology is simple: we map business operations first, then build autonomous agents with safety gates. No black-boxes."
                              </h4>
                              <span className="text-[10px] text-brand-text-muted mt-2.5 block">— Ashish Ranjan, Founder</span>
                            </div>
                            <div className="shrink-0 flex gap-2.5 text-center">
                              <div className="bg-white border border-brand-border rounded-2xl p-4 min-w-[90px] shadow-sm">
                                <div className="text-xl font-bold font-heading text-brand-dark">500k+</div>
                                <div className="text-[8.5px] text-brand-text-muted uppercase tracking-wider font-mono">Daily Tasks</div>
                              </div>
                              <div className="bg-white border border-brand-border rounded-2xl p-4 min-w-[90px] shadow-sm">
                                <div className="text-xl font-bold font-heading text-brand-dark">92%</div>
                                <div className="text-[8.5px] text-brand-text-muted uppercase tracking-wider font-mono">ROI Saved</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.article>
                    );
                  })}
                </motion.div>
              )}

              {/* GRID CARDS LAYOUT */}
              {layoutMode === 'grid' && (
                <motion.div
                  key="grid-feed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {filtered.map((post, index) => {
                    const catColor = categoryColors[post.category] || categoryColors['AI Strategy'];
                    return (
                      <motion.article
                        key={post.slug}
                        layout
                        className="bg-white border border-brand-border hover:border-brand-yellow/30 hover:shadow-lg hover:shadow-black/[0.02] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group min-w-0"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-4 text-[10px] font-mono text-brand-text-muted/40">
                            <span>#{String(index + 1).padStart(2, '0')}</span>
                            <span>{formatDate(post.date)}</span>
                          </div>

                          <div className="flex items-center gap-2.5 mb-3.5">
                            <span 
                              className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                              style={{ backgroundColor: catColor.bg, color: catColor.text, border: `1px solid ${catColor.border}` }}
                            >
                              {post.category}
                            </span>
                            <span className="text-[10px] text-brand-text-muted font-mono">{post.readTime}</span>
                          </div>

                          <Link to={`/blog/${post.slug}`} className="no-underline block mb-3 group/title">
                            <h3 className="text-base sm:text-lg font-heading font-bold text-brand-dark leading-snug group-hover/title:text-brand-yellow transition-colors duration-300">
                              {post.title}
                            </h3>
                          </Link>

                          <p className="text-[12.5px] text-brand-text-muted leading-relaxed line-clamp-3 mb-5 font-body">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-brand-border/30 mt-auto">
                          <span className="text-[9.5px] text-brand-text-muted/50 font-mono">#{post.tags[0]}</span>
                          <Link to={`/blog/${post.slug}`} className="no-underline text-xs font-bold text-brand-dark group-hover:text-brand-yellow transition-colors flex items-center gap-1">
                            Read Spec
                            <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              )}

              {/* TECHNICAL LOGS LAYOUT */}
              {layoutMode === 'technical' && (
                <motion.div
                  key="technical-feed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-brand-border/80 rounded-2xl bg-white overflow-hidden divide-y divide-brand-border/40 font-mono text-xs shadow-sm"
                >
                  {/* Table Header */}
                  <div className="hidden sm:grid sm:grid-cols-[60px_100px_130px_1fr_90px] bg-brand-bg-light px-6 py-3.5 text-[9.5px] text-brand-text-muted font-bold tracking-widest uppercase border-b border-brand-border/80">
                    <span>Index</span>
                    <span>Date</span>
                    <span>Category</span>
                    <span>Spec Title</span>
                    <span className="text-right">Read Time</span>
                  </div>

                  {/* Table Rows */}
                  {filtered.map((post, index) => {
                    const catColor = categoryColors[post.category] || categoryColors['AI Strategy'];
                    return (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="grid grid-cols-1 sm:grid-cols-[60px_100px_130px_1fr_90px] px-6 py-4 items-center hover:bg-brand-bg-light/45 transition-colors duration-200 group no-underline text-brand-text-main"
                      >
                        <span className="text-brand-text-muted/40 font-bold mb-1.5 sm:mb-0">
                          #{String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-brand-text-muted text-[11px] mb-1.5 sm:mb-0">
                          {formatDate(post.date)}
                        </span>
                        <div className="mb-2 sm:mb-0">
                          <span 
                            className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded inline-block"
                            style={{ backgroundColor: catColor.bg, color: catColor.text, border: `1px solid ${catColor.border}` }}
                          >
                            {post.category}
                          </span>
                        </div>
                        <span className="font-heading font-semibold text-[13.5px] sm:text-[13px] text-brand-dark group-hover:text-brand-yellow transition-colors duration-150 leading-snug pr-4 mb-2 sm:mb-0">
                          {post.title}
                        </span>
                        <span className="text-right text-brand-text-muted text-[11px] flex sm:inline-flex items-center justify-between sm:justify-end gap-1.5">
                          <span className="sm:hidden text-brand-text-muted/30">Read cycle:</span>
                          {post.readTime}
                        </span>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-20 bg-brand-bg-light/20 rounded-3xl border border-brand-border/60">
                <div className="w-12 h-12 rounded-xl bg-brand-bg-light border border-brand-border flex items-center justify-center mx-auto mb-4 select-none">
                  <X size={20} className="text-brand-text-muted/60" />
                </div>
                <h4 className="text-xs font-semibold text-brand-dark mb-1">No operational files matching query</h4>
                <p className="text-[11px] text-brand-text-muted">No posts found with search terms or active filters. Try clearing inputs.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                  className="mt-4 px-4 py-2 bg-brand-dark hover:bg-brand-dark-hover text-white text-[11px] font-bold rounded-lg border-none cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Newsletter / Suggested Contribution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 pt-20 border-t border-brand-border text-center relative"
        >
          <div className="absolute inset-0 pointer-events-none -top-20">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-80 h-80 rounded-full bg-brand-yellow/2 blur-[90px]" />
          </div>
          <div className="relative z-10 max-w-xl mx-auto">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-yellow bg-brand-yellow/10 px-4 py-2 rounded-full inline-block mb-6 select-none">
              Submit Scoping Brief
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-tight mb-4">
              Have an automation challenge?
            </h2>
            <p className="text-brand-text-muted text-xs md:text-sm leading-relaxed mb-8">
              We frequently write deep-dives analyzing actual reader workflows. If there is an integration block, multi-agent logic, or database pipeline you want mapped—propose the spec.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-dark-hover text-white font-semibold text-xs py-3.5 px-8 rounded-full no-underline transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] group"
            >
              Propose a Topic
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
