import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
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

  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const progressOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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
    <main className="w-full bg-white relative overflow-hidden pb-24 font-body">
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-50 origin-left"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #F6C744, #C084FC)',
        }}
      />

      {/* Hero section */}
      <section className="relative pt-28 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-brand-yellow/[0.03] blur-[120px]" />
          <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[100px]" />
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs text-brand-text-muted mb-10"
          >
            <Link to="/" className="no-underline text-brand-text-muted hover:text-brand-dark transition-colors">Home</Link>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            <Link to="/blog" className="no-underline text-brand-text-muted hover:text-brand-dark transition-colors">Blog</Link>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            <span className="text-brand-dark font-medium truncate max-w-[280px]">{post.title}</span>
          </motion.div>

          {/* Floating date badge (desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex fixed right-8 top-1/3 flex-col items-center gap-2 z-40"
            style={{ opacity: progressOpacity, scale: progressScale }}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted/40">Published</span>
            <div className="w-px h-6 bg-brand-border" />
            <span className="text-xs font-medium text-brand-text-muted" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              {formatDate(post.date)}
            </span>
          </motion.div>

          {/* Hero content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-[860px]"
          >
            <div className="flex items-center gap-3 mb-5">
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
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-dark leading-[1.05] tracking-tight mb-6">
              {post.title}
            </h1>
            <p className="text-base md:text-lg text-brand-text-muted leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-10 pt-6 border-t border-brand-border">
              <div className="w-11 h-11 rounded-full bg-brand-dark flex items-center justify-center text-white text-xs font-bold font-heading">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-sm font-semibold text-brand-dark">{post.author}</div>
                <div className="text-[11px] text-brand-text-muted">{post.authorRole}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content area */}
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex gap-16 items-start">
          {/* Article */}
          <article className="flex-1 min-w-0 max-w-[720px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {post.content.map((block, i) => {
                switch (block.type) {
                  case 'heading': {
                    const id = slugify(block.text);
                    return (
                      <h2
                        id={id}
                        key={i}
                        className="font-heading font-bold text-xl md:text-[26px] text-brand-dark leading-snug mt-14 mb-5 scroll-mt-24 relative"
                      >
                        <span
                          className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full opacity-0 transition-opacity duration-300"
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
                      <p key={i} className="text-[15px] md:text-[17px] text-brand-text-main leading-[1.8] mb-6">
                        {i === 0 && post.content[0]?.type === 'paragraph'
                          ? <><span className="text-4xl font-heading font-bold text-brand-dark float-left leading-none mr-2 mt-1">{block.text.charAt(0)}</span>{block.text.slice(1)}</>
                          : block.text}
                      </p>
                    );
                  case 'blockquote':
                    return (
                      <figure key={i} className="relative my-10 pl-8 md:pl-12">
                        <span
                          className="absolute left-0 top-0 text-5xl font-heading font-bold leading-none select-none"
                          style={{ color: `${catColor.text}22` }}
                        >
                          &ldquo;
                        </span>
                        <blockquote className="border-l-[3px] pl-6 py-1" style={{ borderColor: catColor.text }}>
                          <p className="text-sm md:text-base text-brand-text-muted leading-relaxed italic">
                            {block.text}
                          </p>
                        </blockquote>
                      </figure>
                    );
                  case 'code':
                    return (
                      <div key={i} className="my-10 rounded-2xl overflow-hidden border border-white/[0.06]">
                        <div className="bg-[#0E0E0E] px-5 py-2.5 flex items-center gap-2 border-b border-white/[0.06]">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                          </div>
                          <span className="text-[10px] text-white/30 font-mono ml-2">code.py</span>
                        </div>
                        <pre className="p-5 overflow-x-auto text-sm leading-relaxed font-mono text-[#E4E4E7]">
                          <code>{block.text}</code>
                        </pre>
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </motion.div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mt-16 pt-8 border-t border-brand-border">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider text-brand-text-muted bg-brand-bg-light px-3 py-1.5 rounded-full border border-brand-border">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author card */}
            <div className="mt-10 rounded-2xl border border-brand-border p-6 md:p-8 flex items-start gap-5" style={{ background: '#FAFAFA' }}>
              <div className="w-14 h-14 rounded-full bg-brand-dark flex items-center justify-center text-white text-lg font-bold font-heading shrink-0">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-sm font-semibold text-brand-dark mb-1.5">Written by {post.author}</div>
                <div className="text-xs md:text-sm text-brand-text-muted leading-relaxed">
                  {post.authorRole}. Alex leads the team at Synapse, designing and deploying autonomous AI systems for businesses that need reliability at scale.
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-[240px] shrink-0 sticky top-28">
            {/* TOC */}
            <div className="mb-8">
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-5">On this page</div>
              <nav className="flex flex-col gap-1 relative">
                {/* Active indicator line */}
                <div
                  className="absolute left-0 top-0 w-0.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: catColor.text,
                    height: '28px',
                    transform: `translateY(${post.tableOfContents.findIndex(t => t.id === activeSection) * 36}px)`,
                    opacity: activeSection ? 1 : 0,
                  }}
                />
                {post.tableOfContents.map(({ label, id }, idx) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`text-xs leading-relaxed no-underline transition-all duration-200 pl-4 py-1.5 rounded-r-lg ${
                      activeSection === id
                        ? 'text-brand-dark font-semibold'
                        : 'text-brand-text-muted hover:text-brand-dark'
                    }`}
                    style={{
                      background: activeSection === id ? `${catColor.bg}` : 'transparent',
                    }}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Share */}
            <div className="pt-6 border-t border-brand-border">
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-4">Share</div>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-brand-bg-light border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-dark hover:border-brand-text-muted/40 hover:-translate-y-0.5 transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a
                  href={`https://linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-brand-bg-light border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-dark hover:border-brand-text-muted/40 hover:-translate-y-0.5 transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <button
                  onClick={() => { navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : ''); }}
                  className="w-9 h-9 rounded-xl bg-brand-bg-light border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-dark hover:border-brand-text-muted/40 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-28 pt-20 border-t border-brand-border">
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow bg-brand-yellow/10 px-4 py-2 rounded-full">
                Continue reading
              </span>
              <div className="h-px flex-1 bg-brand-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rp, idx) => {
                const rpColor = categoryColors[rp.category] || categoryColors['AI Strategy'];
                const accent = ['#C084FC', '#4ADE80', '#3B82F6', '#F5A623'][idx % 4];
                return (
                  <Link
                    key={rp.slug}
                    to={`/blog/${rp.slug}`}
                    className="group no-underline rounded-2xl border border-brand-border bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.03] hover:-translate-y-0.5"
                  >
                    <div className="h-1 w-full transition-all duration-300 group-hover:w-full" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}44)`, width: '40%' }} />
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: rpColor.bg, color: rpColor.text }}
                        >
                          {rp.category}
                        </span>
                        <span className="text-[10px] text-brand-text-muted">{rp.readTime}</span>
                      </div>
                      <h3 className="font-heading font-bold text-[17px] text-brand-dark leading-snug mb-2 group-hover:text-brand-yellow transition-colors">
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-2xl p-8 md:p-14 text-white text-center relative overflow-hidden"
          style={{ background: '#0E0E0E' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-yellow blur-[120px] opacity-10" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-heading font-bold leading-tight mb-4">
              Ready to build your own<br />autonomous system?
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-10">
              Book a free 30-minute scoping call. We'll review your operations and tell you exactly where AI can help.
            </p>
            <button
              onClick={openCalBooking}
              className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-semibold text-sm py-3.5 px-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-brand-yellow/20 border-none cursor-pointer"
            >
              Book a Scoping Call
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
