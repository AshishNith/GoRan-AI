import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { blogPostsList, categories } from '../data/blog';

const categoryColors = {
  'AI Strategy': { bg: 'rgba(192, 132, 252, 0.12)', text: '#C084FC', border: 'rgba(192, 132, 252, 0.25)' },
  'Process': { bg: 'rgba(74, 222, 128, 0.12)', text: '#4ADE80', border: 'rgba(74, 222, 128, 0.25)' },
  'Engineering': { bg: 'rgba(59, 130, 246, 0.12)', text: '#3B82F6', border: 'rgba(59, 130, 246, 0.25)' },
  'Business': { bg: 'rgba(245, 166, 35, 0.12)', text: '#F5A623', border: 'rgba(245, 166, 35, 0.25)' },
};

const accentColors = ['#C084FC', '#4ADE80', '#3B82F6', '#F5A623', '#F472B6', '#60A5FA'];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function isRecent(dateStr) {
  const postDate = new Date(dateStr);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return postDate >= thirtyDaysAgo;
}

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveSection(idx);
          }
        });
      },
      { rootMargin: '-50% 0px -40% 0px', threshold: 0 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeFilter]);

  const filtered = activeFilter === 'All'
    ? blogPostsList
    : blogPostsList.filter(p => p.category === activeFilter);

  return (
    <main className="w-full bg-white relative overflow-hidden pt-32 pb-24 font-body">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[8%] left-[-5%] w-100 h-100 rounded-full bg-brand-yellow/4 blur-[100px]" />
        <div className="absolute bottom-[15%] right-[-5%] w-125 h-125 rounded-full bg-purple-500/3 blur-[120px]" />
      </div>

      <div className="w-full max-w-300 mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow bg-brand-yellow/10 px-4 py-2 rounded-full inline-block mb-6"
          >
            Insights
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-bold text-brand-dark leading-[0.95] tracking-tight mb-6"
          >
            Thoughts on<br />
            <span className="text-brand-yellow">autonomous systems.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-brand-text-muted text-base md:text-lg leading-relaxed max-w-xl"
          >
            Engineering deep-dives, strategy guides, and practical advice for teams building AI-powered operations.
          </motion.p>
        </div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex gap-2 flex-wrap mb-16 pb-8 border-b border-brand-border"
        >
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-[11px] font-semibold uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-brand-dark text-white border-brand-dark shadow-sm'
                  : 'bg-white text-brand-text-muted border-brand-border hover:border-brand-text-muted/40 hover:text-brand-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Posts — editorial layout */}
        <div className="relative">
          {/* Scroll progress bar (left edge) */}
          <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-1 z-50">
            <ProgressBar />
          </div>

          <div className="flex flex-col gap-14 md:gap-20">
            {filtered.map((post, idx) => {
              const color = accentColors[idx % accentColors.length];
              const catColor = categoryColors[post.category] || categoryColors['AI Strategy'];
              const isActive = activeSection === idx;
              const isFirst = idx === 0;

              return (
                <PostCard
                  key={post.slug}
                  post={post}
                  idx={idx}
                  color={color}
                  catColor={catColor}
                  isActive={isActive}
                  isFirst={isFirst}
                  total={filtered.length}
                  sectionRefs={sectionRefs}
                />
              );
            })}
          </div>

          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-bg-light border border-brand-border flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <p className="text-brand-text-muted text-sm">No posts in this category yet.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-28 pt-20 border-t border-brand-border text-center relative"
        >
          <div className="absolute inset-0 pointer-events-none -top-20">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-100 h-100 rounded-full bg-brand-yellow/3 blur-[100px]" />
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow bg-brand-yellow/10 px-4 py-2 rounded-full inline-block mb-6">
              Get involved
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-tight mb-4">
              Want to contribute or<br />suggest a topic?
            </h2>
            <p className="text-brand-text-muted text-sm md:text-base leading-relaxed max-w-md mx-auto mb-10">
              We're always exploring new ideas. If there's something you'd like us to write about, we'd love to hear from you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-dark-hover text-white font-semibold text-sm py-3.5 px-8 rounded-full no-underline transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] group"
            >
              Start a Conversation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

/* ── Scroll progress bar ── */
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 origin-top"
      style={{
        scaleY,
        background: 'linear-gradient(to bottom, #F6C744, #C084FC, #3B82F6)',
      }}
    />
  );
}

/* ── Post Card ── */
function PostCard({ post, idx, color, catColor, isActive, isFirst, total, sectionRefs }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={(el) => { sectionRefs.current[idx] = el; el?.setAttribute('data-index', idx); }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Number + date column (desktop) */}
        <div className="hidden lg:flex flex-col items-center shrink-0 w-24 relative">
          {/* Connector line */}
          <div
            className={`absolute top-0 bottom-0 w-px transition-colors duration-500 ${
              isActive ? 'bg-brand-yellow/50' : 'bg-brand-border'
            }`}
          />
          {/* Dot */}
          <div
            className="absolute top-2 w-3 h-3 rounded-full z-10 transition-all duration-500"
            style={{
              backgroundColor: isActive ? color : '#E5E7EB',
              boxShadow: isActive ? `0 0 12px ${color}66` : 'none',
              scale: isActive ? 1 : 0.8,
            }}
          />
          {/* Large number background */}
          <span
            className="font-heading font-bold text-[72px] leading-none select-none transition-all duration-500"
            style={{
              color: isActive ? `${color}18` : '#F3F4F6',
              marginTop: '-12px',
            }}
          >
            {String(idx + 1).padStart(2, '0')}
          </span>
          {/* Date below number */}
          <span
            className="text-[11px] font-medium transition-colors duration-500 -mt-2"
            style={{ color: isActive ? color : '#D1D5DB' }}
          >
            {formatDate(post.date)}
          </span>
        </div>

        {/* Card */}
        <div
          ref={cardRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex-1 min-w-0 group relative"
        >
          <Link
            to={`/blog/${post.slug}`}
            className="no-underline block relative"
          >
            {/* Hover glow effect */}
            <div
              className="absolute -inset-0.5 rounded-2xl opacity-0 transition-all duration-500 blur-md"
              style={{
                opacity: isHovered ? 0.12 : 0,
                backgroundColor: color,
              }}
            />

            {/* Main card */}
            <div
              className={`relative rounded-2xl border transition-all duration-500 overflow-hidden ${
                isFirst && idx === 0
                  ? 'bg-white border-brand-border'
                  : 'bg-white border-brand-border'
              }`}
              style={{
                boxShadow: isHovered
                  ? `0 20px 60px -12px ${color}22, 0 4px 18px -6px ${color}11`
                  : '0 1px 3px rgba(0,0,0,0.03)',
                transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
              }}
            >
              {/* Accent line - expands on hover */}
              <motion.div
                className="h-1 w-full"
                animate={{ width: isHovered ? '100%' : '40%' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  background: `linear-gradient(90deg, ${color}, ${color}44, ${color}08)`,
                }}
              />

              <div className="p-6 md:p-8 lg:p-10">
                {/* Meta row */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: catColor.bg,
                      color: catColor.text,
                      border: `1px solid ${catColor.border}`,
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="text-[11px] text-brand-text-muted flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {post.readTime}
                  </span>
                  {isRecent(post.date) && (
                    <span className="text-[8px] font-bold uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 px-2 py-0.5 rounded">
                      New
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="font-heading font-bold text-2xl md:text-[28px] leading-[1.15] text-brand-dark mb-4 transition-colors duration-300 group-hover:text-brand-yellow">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm md:text-[15px] text-brand-text-muted leading-relaxed mb-5 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Bottom row: tags + arrow */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-brand-text-muted/40 font-mono font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <motion.span
                    className="shrink-0"
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-text-muted group-hover:text-brand-yellow transition-colors duration-300">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.span>
                </div>
              </div>
            </div>
          </Link>

          {/* Mobile date (hidden on desktop) */}
          <div className="lg:hidden mt-3 flex items-center gap-2">
            <span className="text-[10px] text-brand-text-muted/50 font-medium">
              {formatDate(post.date)}
            </span>
            <span className="w-px h-3 bg-brand-border" />
            <span className="text-[10px] text-brand-text-muted/50 font-medium">
              #{String(idx + 1).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
