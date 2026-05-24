import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
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

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = activeFilter === 'All'
    ? blogPostsList
    : blogPostsList.filter(p => p.category === activeFilter);

  return (
    <main className="w-full bg-white relative overflow-hidden pt-32 pb-24 font-body">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-8%] w-[500px] h-[500px] rounded-full bg-brand-yellow/[0.04] blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-8%] w-[600px] h-[600px] rounded-full bg-purple-500/[0.03] blur-[120px]" />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(229, 231, 235, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 231, 235, 0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="w-full max-w-[1100px] mx-auto px-6 relative z-10">
        <div className="mb-14 max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow bg-brand-yellow/10 px-4 py-2 rounded-full inline-block mb-5">
            Insights
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark leading-[1.05] tracking-tight mb-4">
            Thoughts on building{' '}
            <span className="text-brand-yellow">autonomous systems.</span>
          </h1>
          <p className="text-brand-text-muted text-base md:text-lg leading-relaxed max-w-xl">
            Engineering deep-dives, strategy guides, and practical advice for teams building AI-powered operations.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 flex-wrap mb-12 pb-8 border-b border-brand-border">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-[11px] font-semibold uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-brand-dark text-white border-brand-dark'
                  : 'bg-white text-brand-text-muted border-brand-border hover:border-brand-text-muted/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts — timeline journal layout */}
        <div className="relative">
          {/* Vertical timeline line (desktop) */}
          <div className="hidden md:block absolute left-[31px] top-0 bottom-0 w-px bg-brand-border" />

          <div className="flex flex-col gap-10">
            {filtered.map((post, idx) => {
              const color = accentColors[idx % accentColors.length];
              const catColor = categoryColors[post.category] || categoryColors['AI Strategy'];

              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="relative flex gap-6 md:gap-10"
                >
                  {/* Timeline dot + date (desktop) */}
                  <div className="hidden md:flex flex-col items-center shrink-0 w-[62px]">
                    <div
                      className="w-[62px] h-[62px] rounded-full flex items-center justify-center text-[10px] font-bold uppercase tracking-wider leading-tight text-center relative z-10 border-2"
                      style={{
                        backgroundColor: `${color}12`,
                        borderColor: `${color}30`,
                        color: color,
                      }}
                    >
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short' })}
                      <br />
                      {new Date(post.date).getDate()}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 min-w-0 group">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="no-underline block rounded-2xl border border-brand-border bg-white transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.03] hover:-translate-y-0.5 overflow-hidden"
                    >
                      {/* Color accent bar */}
                      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />

                      <div className="p-6 md:p-8">
                        {/* Category + date row */}
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
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
                        </div>

                        {/* Title */}
                        <h2 className="font-heading font-bold text-xl md:text-2xl text-brand-dark leading-snug mb-3 group-hover:text-brand-yellow transition-colors duration-200">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-sm text-brand-text-muted leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Tags + arrow */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2 flex-wrap">
                            {post.tags.map((tag) => (
                              <span key={tag} className="text-[10px] text-brand-text-muted/50 font-medium">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <span className="text-brand-text-muted group-hover:text-brand-yellow transition-colors duration-200">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-brand-text-muted text-sm">No posts in this category yet.</p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 pt-16 border-t border-brand-border text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-dark leading-tight mb-4">
            Want to contribute or suggest a topic?
          </h2>
          <p className="text-brand-text-muted text-sm leading-relaxed max-w-md mx-auto mb-8">
            We're always exploring new ideas. If there's something you'd like us to write about, we'd love to hear from you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-dark-hover text-white font-semibold text-sm py-3.5 px-8 rounded-full no-underline transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
          >
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
