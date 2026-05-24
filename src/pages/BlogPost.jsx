import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCalBooking } from '../components/CalBookingModal';
import { blogPosts, blogPostsList } from '../data/blog';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const categoryColors = {
  'AI Strategy': { bg: 'rgba(192, 132, 252, 0.12)', text: '#C084FC', border: 'rgba(192, 132, 252, 0.25)' },
  'Process': { bg: 'rgba(74, 222, 128, 0.12)', text: '#4ADE80', border: 'rgba(74, 222, 128, 0.25)' },
  'Engineering': { bg: 'rgba(59, 130, 246, 0.12)', text: '#3B82F6', border: 'rgba(59, 130, 246, 0.25)' },
  'Business': { bg: 'rgba(245, 166, 35, 0.12)', text: '#F5A623', border: 'rgba(245, 166, 35, 0.25)' },
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts[slug];
  const { openCalBooking } = useCalBooking();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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
  const relatedPosts = blogPostsList
    .filter((p) => p.slug !== slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 2);

  return (
    <main className="w-full bg-white relative overflow-hidden pt-28 pb-24 font-body">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] right-[-8%] w-[500px] h-[500px] rounded-full bg-brand-yellow/[0.04] blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-8%] w-[600px] h-[600px] rounded-full bg-purple-500/[0.03] blur-[120px]" />
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-brand-text-muted mb-10">
          <Link to="/" className="no-underline text-brand-text-muted hover:text-brand-dark transition-colors">Home</Link>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          <Link to="/blog" className="no-underline text-brand-text-muted hover:text-brand-dark transition-colors">Blog</Link>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          <span className="text-brand-dark font-medium truncate max-w-[200px]">{post.title}</span>
        </div>

        {/* Hero */}
        <div className="max-w-[800px] mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ backgroundColor: catColor.bg, color: catColor.text, border: `1px solid ${catColor.border}` }}
            >
              {post.category}
            </span>
            <span className="text-[11px] text-brand-text-muted">{formatDate(post.date)}</span>
            <span className="w-1 h-1 rounded-full bg-brand-border" />
            <span className="text-[11px] text-brand-text-muted">{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-[1.08] tracking-tight mb-6">
            {post.title}
          </h1>
          <p className="text-base md:text-lg text-brand-text-muted leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>

          {/* Author line */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-brand-border">
            <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white text-xs font-bold font-heading">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="text-sm font-semibold text-brand-dark">{post.author}</div>
              <div className="text-[11px] text-brand-text-muted">{post.authorRole}</div>
            </div>
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="flex gap-16 items-start">
          {/* Article content */}
          <article className="flex-1 min-w-0 max-w-[720px]">
            {post.content.map((block, i) => {
              switch (block.type) {
                case 'heading': {
                  const id = slugify(block.text);
                  return (
                    <h2
                      id={id}
                      key={i}
                      className="font-heading font-bold text-xl md:text-2xl text-brand-dark leading-snug mt-12 mb-5 scroll-mt-24"
                    >
                      {block.text}
                    </h2>
                  );
                }
                case 'paragraph':
                  return (
                    <p key={i} className="text-[15px] md:text-base text-brand-text-main leading-[1.75] mb-5">
                      {i === 0 && post.content[0]?.type === 'paragraph'
                        ? <><span className="text-3xl font-heading font-bold text-brand-dark float-left leading-none mr-2 mt-0.5">{block.text.charAt(0)}</span>{block.text.slice(1)}</>
                        : block.text}
                    </p>
                  );
                case 'blockquote':
                  return (
                    <blockquote key={i} className="border-l-[3px] border-brand-yellow pl-5 my-8 py-1">
                      <p className="text-sm md:text-base text-brand-text-muted leading-relaxed italic">
                        {block.text}
                      </p>
                    </blockquote>
                  );
                case 'code':
                  return (
                    <pre key={i} className="bg-[#0E0E0E] text-[#E4E4E7] rounded-xl p-5 my-8 overflow-x-auto text-sm leading-relaxed font-mono border border-white/[0.06]">
                      <code>{block.text}</code>
                    </pre>
                  );
                default:
                  return null;
              }
            })}

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mt-12 pt-8 border-t border-brand-border">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider text-brand-text-muted bg-brand-bg-light px-3 py-1.5 rounded-full border border-brand-border">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author card */}
            <div className="mt-10 rounded-2xl bg-brand-bg-light border border-brand-border p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center text-white text-sm font-bold font-heading shrink-0">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-sm font-semibold text-brand-dark mb-1">Written by {post.author}</div>
                <div className="text-xs text-brand-text-muted leading-relaxed">
                  {post.authorRole}. Alex leads the team at Synapse, designing and deploying autonomous AI systems for businesses that need reliability at scale.
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar — table of contents (desktop) */}
          <aside className="hidden lg:block w-[240px] shrink-0 sticky top-28">
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-5">
              On this page
            </div>
            <nav className="flex flex-col gap-2">
              {post.tableOfContents.map(({ label, id }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`text-xs leading-relaxed no-underline transition-all duration-200 py-1.5 px-3 rounded-lg ${
                    activeSection === id
                      ? 'text-brand-dark font-semibold bg-brand-yellow/8'
                      : 'text-brand-text-muted hover:text-brand-dark'
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-brand-border">
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-4">Share</div>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-brand-bg-light border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-dark hover:border-brand-text-muted/40 transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a
                  href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-brand-bg-light border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-dark hover:border-brand-text-muted/40 transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <button
                  onClick={() => { navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : ''); }}
                  className="w-8 h-8 rounded-lg bg-brand-bg-light border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-dark hover:border-brand-text-muted/40 transition-all cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-brand-border">
            <h2 className="text-2xl font-heading font-bold text-brand-dark mb-10">Continue reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rp) => {
                const rpColor = categoryColors[rp.category] || categoryColors['AI Strategy'];
                return (
                  <Link
                    key={rp.slug}
                    to={`/blog/${rp.slug}`}
                    className="group no-underline rounded-2xl border border-brand-border bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.03] hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: rpColor.bg, color: rpColor.text }}
                      >
                        {rp.category}
                      </span>
                      <span className="text-[10px] text-brand-text-muted">{rp.readTime}</span>
                    </div>
                    <h3 className="font-heading font-bold text-brand-dark leading-snug mb-2 group-hover:text-brand-yellow transition-colors">
                      {rp.title}
                    </h3>
                    <p className="text-xs text-brand-text-muted leading-relaxed line-clamp-2">{rp.excerpt}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden" style={{ background: '#0E0E0E' }}>
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-[-50%] left-[-50%] w-full h-full rounded-full bg-brand-yellow blur-[120px]" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold leading-tight mb-4">
              Ready to build your own autonomous system?
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-8">
              Book a free 30-minute scoping call. We'll review your operations and tell you exactly where AI can help.
            </p>
            <button
              onClick={openCalBooking}
              className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-semibold text-sm py-3.5 px-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-brand-yellow/20 border-none cursor-pointer"
            >
              Book a Scoping Call
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
