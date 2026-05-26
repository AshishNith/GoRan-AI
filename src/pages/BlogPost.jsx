import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useCalBooking } from '../components/CalBookingModal';
import { blogPosts, blogPostsList } from '../data/blog';
import { ArrowLeft, Clock, Calendar, Share2, Copy, Check, ChevronUp, Sparkles, BookOpen, CheckCircle } from 'lucide-react';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

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

const postTakeaways = {
  'rise-of-autonomous-agents': [
    'Autonomous agents execute API actions end-to-end without manual copy-paste typing.',
    'GoRan AI builds systems operating at level 2–3 autonomy with reliable exception loops.',
    'Success requires structured logging pipelines, action guardrails, and human escalation gates.'
  ],
  'ai-audit-vs-consulting': [
    'An AI Audit maps operational bottlenecks to draft exact ROI potential before building.',
    'Full consulting makes sense when scope, team alignment, and budgets are pre-committed.',
    '60% of companies find hidden automation priority workflows during a 5-day audit.'
  ],
  'multi-agent-system-500k': [
    'Single-agent models crash under tool density; decompose workflows into Specialized Workers.',
    'Event-driven workers scale using message brokers (Redis) to process 500k+ daily actions.',
    'Observability trace IDs are required to replay runs, audit parameters, and monitor costs.'
  ],
  'hidden-cost-workflow-inefficiency': [
    'Operational latency and data-entry errors cost far more than manual labor hours.',
    'Rate processes by multiplying Volume × Complexity × Criticality to prioritize development.',
    'Automating top-funnel triggers improves client contact speeds from hours to under 4 minutes.'
  ],
  'from-chatbots-to-agents': [
    'FAQ bots are rigid; copilots are interactive but passive; autonomous agents execute actively.',
    'Autonomy shifts human efforts from manual operator to high-value system orchestrator.',
    'Next-gen networks leverage multi-agent dialogue loops to negotiate sub-system tasks.'
  ]
};

function getTakeaways(slug, post) {
  if (postTakeaways[slug]) return postTakeaways[slug];
  return [
    `Insights on operational ${post.category || 'AI'} architectures, system dependencies, and deployment.`,
    `A practical breakdown of system KPIs, metrics, and backend code files.`,
    `Step-by-step instructions on deploying safety guardrails for this technical domain.`
  ];
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/* Premium CodeBlock with Line Numbers & Copy Button */
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const codeLines = code.trim().split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-10 rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0E0E0E]">
      <div className="bg-[#171717] px-5 py-3 flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <span className="text-[10px] text-white/40 font-mono ml-2">orchestrator.py</span>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] text-white/50 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded transition-all cursor-pointer font-mono border-none"
        >
          {copied ? (
            <>
              <Check size={11} className="text-[#F6C744]" />
              COPIED!
            </>
          ) : (
            <>
              <Copy size={11} />
              COPY
            </>
          )}
        </button>
      </div>
      <div className="flex font-mono text-[12.5px] leading-relaxed p-5 overflow-x-auto select-text">
        {/* Line Numbers */}
        <div className="text-white/25 text-right select-none pr-4 border-r border-white/5 flex flex-col">
          {codeLines.map((_, idx) => (
            <span key={idx} className="block text-[11px] leading-[22px] h-[22px]">
              {idx + 1}
            </span>
          ))}
        </div>
        {/* Code Content */}
        <pre className="pl-4 flex-1 text-[#E4E4E7] m-0">
          <code className="block">
            {codeLines.map((line, idx) => (
              <span key={idx} className="block h-[22px] leading-[22px] whitespace-pre">
                {line || ' '}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts[slug];
  const { openCalBooking } = useCalBooking();
  const [activeSection, setActiveSection] = useState('');
  const [tldrExpanded, setTldrExpanded] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const { scrollYProgress } = useScroll();
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  useEffect(() => {
    if (!post) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    post.tableOfContents.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [post]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!post) {
    return (
      <main className="w-full bg-white relative overflow-hidden pt-32 pb-24 font-body">
        <div className="w-full max-w-[800px] mx-auto px-6 text-center pt-20">
          <h1 className="text-3xl font-heading font-bold text-brand-dark mb-4">Post not found</h1>
          <p className="text-brand-text-muted text-sm mb-8">This blog post doesn't exist or may have been removed.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 bg-brand-dark text-white font-semibold text-sm py-3 px-6 rounded-full no-underline transition-all hover:bg-brand-dark-hover">
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const catColor = categoryColors[post.category] || categoryColors['AI Strategy'];
  const takeaways = getTakeaways(slug, post);
  const relatedPosts = blogPostsList
    .filter((p) => p.slug !== slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 2);

  return (
    <main className="w-full bg-white relative overflow-hidden pb-24 font-body">
      
      {/* Floating Scroll Radial Tracker + Top Button */}
      <AnimatePresence>
        {scrollPercent > 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2"
          >
            <button
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full bg-brand-dark hover:bg-brand-dark-hover text-white flex items-center justify-center shadow-lg relative border-none cursor-pointer transition-colors duration-300"
              title="Scroll to Top"
            >
              {/* Circular SVG Progress line */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  className="text-white/10"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="16"
                />
                <circle
                  className="text-brand-yellow transition-all duration-100"
                  strokeWidth="2.5"
                  strokeDasharray="100, 100"
                  strokeDashoffset={100 - scrollPercent}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="16"
                />
              </svg>
              <ChevronUp size={16} className="relative z-10" />
            </button>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-brand-dark text-white shadow-md select-none">
              {scrollPercent}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero section */}
      <section className="relative pt-28 pb-14 md:pb-18 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-brand-yellow/[0.02] blur-[120px]" />
          <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] rounded-full bg-purple-500/[0.02] blur-[100px]" />
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
          
          {/* Breadcrumb & Go Back */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-brand-border/40 pb-4">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-1.5 text-xs text-brand-text-muted hover:text-brand-dark no-underline font-semibold transition-colors group"
            >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
              Back to Insights
            </Link>

            <div className="flex items-center gap-2 text-xs text-brand-text-muted/60 select-none">
              <span>Home</span>
              <span>/</span>
              <span>Blog</span>
              <span>/</span>
              <span className="text-brand-dark font-medium truncate max-w-[180px]">{post.title}</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="max-w-[900px] mt-4">
            <div className="flex flex-wrap items-center gap-3.5 mb-5">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded"
                style={{ backgroundColor: catColor.bg, color: catColor.text, border: `1px solid ${catColor.border}` }}
              >
                {post.category}
              </span>
              <span className="text-[10.5px] text-brand-text-muted font-mono flex items-center gap-1">
                <Calendar size={10} />
                {formatDate(post.date)}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-border" />
              <span className="text-[10.5px] text-brand-text-muted font-mono flex items-center gap-1">
                <Clock size={10} />
                {post.readTime}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-brand-dark leading-[1.05] tracking-tight mb-6">
              {post.title}
            </h1>
            
            <p className="text-base sm:text-lg text-brand-text-muted leading-relaxed max-w-3xl font-body">
              {post.excerpt}
            </p>

            {/* Author Badge */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-brand-border/60">
              <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white text-xs font-bold font-heading">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-xs font-semibold text-brand-dark">{post.author}</div>
                <div className="text-[10px] text-brand-text-muted font-mono uppercase">{post.authorRole}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content area */}
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Article column */}
          <article className="flex-1 min-w-0 max-w-[760px]">
            
            {/* COLLAPSIBLE TL;DR SUMMARY DRAWER */}
            <div className="mb-10 rounded-2xl border border-brand-yellow/20 bg-brand-bg-light/50 overflow-hidden shadow-sm relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-yellow" />
              <button 
                onClick={() => setTldrExpanded(!tldrExpanded)}
                className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer border-none bg-transparent hover:bg-brand-yellow/5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-brand-yellow fill-brand-yellow" />
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-dark">TL;DR // Key Takeaways</span>
                </div>
                <span className="text-[10px] font-mono text-brand-text-muted/60 uppercase font-bold">
                  {tldrExpanded ? 'Collapse' : 'Expand'}
                </span>
              </button>
              
              <AnimatePresence initial={false}>
                {tldrExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-brand-border/40 flex flex-col gap-3 text-xs leading-relaxed text-brand-text-main font-body">
                      {takeaways.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                          <CheckCircle size={14} className="text-brand-yellow shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content blocks */}
            <div className="content-render">
              {post.content.map((block, i) => {
                switch (block.type) {
                  case 'heading': {
                    const id = slugify(block.text);
                    return (
                      <h2
                        id={id}
                        key={i}
                        className="font-heading font-bold text-xl sm:text-[24px] text-brand-dark leading-snug mt-12 mb-5 scroll-mt-24 relative flex items-center"
                      >
                        <span
                          className="absolute -left-4 w-1 h-6 rounded-r-full transition-opacity duration-300 hidden md:block"
                          style={{
                            backgroundColor: catColor.text,
                            opacity: activeSection === id ? 1 : 0,
                          }}
                        />
                        {block.text}
                      </h2>
                    );
                  }
                  case 'paragraph':
                    return (
                      <p key={i} className="text-[15px] sm:text-[16.5px] text-brand-text-main leading-[1.8] mb-6 font-body">
                        {/* Drop-cap for the absolute first paragraph block */}
                        {i === 0 && post.content[0]?.type === 'paragraph' ? (
                          <>
                            <span className="text-4xl sm:text-5xl font-heading font-bold text-brand-dark float-left leading-none mr-2.5 mt-1 select-none">
                              {block.text.charAt(0)}
                            </span>
                            {block.text.slice(1)}
                          </>
                        ) : (
                          block.text
                        )}
                      </p>
                    );
                  case 'blockquote':
                    return (
                      <figure key={i} className="relative my-10 pl-6 md:pl-8">
                        <span
                          className="absolute left-0 top-[-10px] text-5xl font-heading font-bold leading-none select-none pointer-events-none"
                          style={{ color: `${catColor.text}18` }}
                        >
                          “
                        </span>
                        <blockquote className="border-l-2 pl-5 py-1" style={{ borderColor: catColor.text }}>
                          <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed italic font-body">
                            {block.text}
                          </p>
                        </blockquote>
                      </figure>
                    );
                  case 'code':
                    return <CodeBlock key={i} code={block.text} />;
                  default:
                    return null;
                }
              })}
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mt-14 pt-8 border-t border-brand-border">
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-[9.5px] font-semibold uppercase tracking-wider text-brand-text-muted bg-brand-bg-light px-3 py-1.5 rounded-md border border-brand-border"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author profile card */}
            <div className="mt-10 rounded-2xl border border-brand-border p-6 sm:p-8 flex items-start gap-5 bg-brand-bg-light/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/[0.01] rounded-full blur-2xl pointer-events-none" />
              <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center text-white text-sm font-bold font-heading shrink-0 select-none">
                AR
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-brand-dark mb-1.5">Written by {post.author}</div>
                <div className="text-xs text-brand-text-muted leading-relaxed font-body">
                  {post.authorRole}. Ashish leads the engineering directions at GoRan AI, building complex automation nodes and deploying custom, failsafe agent pipelines for enterprise operations.
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-[240px] shrink-0 lg:sticky lg:top-28 flex flex-col gap-8">
            
            {/* Table of Contents */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-4 select-none">
                On this page
              </div>
              <nav className="flex flex-col gap-1 relative border-l border-brand-border/60">
                {/* Active indicator line overlay */}
                <div
                  className="absolute left-[-1px] top-0 w-0.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: catColor.text,
                    height: '24px',
                    transform: `translateY(${Math.max(0, post.tableOfContents.findIndex(t => t.id === activeSection)) * 34 + 6}px)`,
                    opacity: activeSection ? 1 : 0,
                  }}
                />
                {post.tableOfContents.map(({ label, id }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`text-xs leading-relaxed no-underline transition-all duration-200 pl-4 py-2 border-none block ${
                      activeSection === id
                        ? 'text-brand-dark font-bold'
                        : 'text-brand-text-muted hover:text-brand-dark'
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Share & Actions */}
            <div className="pt-6 border-t border-brand-border">
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-4 select-none">
                Share Article
              </div>
              <div className="flex gap-2.5">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-brand-bg-light border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-[#171717] hover:border-brand-text-muted/40 hover:-translate-y-0.5 transition-all no-underline"
                  title="Share on X"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a
                  href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-brand-bg-light border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-[#171717] hover:border-brand-text-muted/40 hover:-translate-y-0.5 transition-all no-underline"
                  title="Share on LinkedIn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <button
                  onClick={copyPageLink}
                  className="w-9 h-9 rounded-xl bg-brand-bg-light border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-[#171717] hover:border-brand-text-muted/40 hover:-translate-y-0.5 transition-all cursor-pointer border-none"
                  title="Copy Link"
                >
                  {copiedLink ? <Check size={14} className="text-[#F6C744]" /> : <Share2 size={14} />}
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-28 pt-20 border-t border-brand-border">
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow bg-brand-yellow/10 px-4 py-2 rounded-full select-none">
                Continue reading
              </span>
              <div className="h-px flex-1 bg-brand-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rp, idx) => {
                const rpColor = categoryColors[rp.category] || categoryColors['AI Strategy'];
                const accent = ['#F6C744', '#A855F7', '#3B82F6', '#EC4899'][idx % 4];
                return (
                  <Link
                    key={rp.slug}
                    to={`/blog/${rp.slug}`}
                    className="group no-underline rounded-2xl border border-brand-border bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.02] hover:-translate-y-0.5"
                  >
                    <div className="h-1 transition-all duration-300" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}44)`, width: '40%' }} />
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                          style={{ backgroundColor: rpColor.bg, color: rpColor.text, border: `1px solid ${rpColor.border}` }}
                        >
                          {rp.category}
                        </span>
                        <span className="text-[10px] text-brand-text-muted font-mono">{rp.readTime}</span>
                      </div>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-brand-dark leading-snug mb-2 group-hover:text-brand-yellow transition-colors duration-200">
                        {rp.title}
                      </h3>
                      <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed line-clamp-2">{rp.excerpt}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Scoping Call bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-3xl p-8 md:p-14 text-white text-center relative overflow-hidden"
          style={{ background: '#0E0E0E' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-yellow blur-[120px] opacity-10" />
          </div>
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-heading font-bold leading-tight mb-4">
              Ready to architect your own<br />autonomous system?
            </h2>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-lg mx-auto mb-8 font-body">
              Book a scoping call. We'll outline your operations, evaluate data readiness, and provide a concrete automation roadmap.
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
  );
}
