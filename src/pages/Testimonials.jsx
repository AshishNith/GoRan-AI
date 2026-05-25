import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote, ArrowLeft, ChevronRight } from 'lucide-react';
import { testimonialsList, testimonialCategories } from '../data/testimonials';

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? testimonialsList
    : testimonialsList.filter(t => t.category === activeCategory);

  return (
    <main className="w-full bg-white relative overflow-hidden pt-32 pb-24 font-body min-h-screen">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[8%] left-[-5%] w-100 h-100 rounded-full bg-brand-yellow/4 blur-[100px]" />
        <div className="absolute bottom-[15%] right-[-5%] w-87.5 h-87.5 rounded-full bg-purple-500/4 blur-[100px]" />
      </div>

      <div className="w-full max-w-300 mx-auto px-6 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-brand-text-muted mb-8">
          <Link to="/" className="hover:text-brand-dark transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-dark font-medium">Testimonials</span>
        </div>

        {/* Header */}
        <div className="max-w-225 mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-text-muted">Client Stories</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark leading-tight mt-3">
            What our clients say
          </h1>
          <p className="text-brand-text-muted text-base md:text-lg max-w-135 leading-relaxed mt-3">
            Real results from real teams who transformed their operations with AI agents. Every testimonial is from a verified client.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['All', ...testimonialCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-1.5 px-3 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-brand-dark text-white border-brand-dark'
                  : 'bg-transparent text-brand-text-muted border-brand-border hover:border-brand-text-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Testimonials grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-brand-border bg-white p-6 md:p-7 flex flex-col gap-4 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={13} className="fill-brand-yellow text-brand-yellow" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-text-muted/60">
                    {t.category}
                  </span>
                </div>

                <Quote size={20} className="text-brand-yellow/30" />

                <p className="text-sm text-brand-text-muted leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 mt-auto pt-2 border-t border-brand-border/50">
                  <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white text-xs font-bold font-heading shrink-0">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-brand-dark truncate">{t.name}</div>
                    <div className="text-[11px] text-brand-text-muted truncate">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-brand-text-muted text-sm mb-4">No testimonials found for this category.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="text-sm font-semibold text-brand-dark underline underline-offset-4 hover:text-brand-yellow transition-colors cursor-pointer"
            >
              View all
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 text-center py-12 border-t border-brand-border">
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-brand-dark leading-tight mb-3">
            Ready to be our next success story?
          </h3>
          <p className="text-brand-text-muted text-sm md:text-base max-w-135 mx-auto leading-relaxed mb-6">
            Join the companies already running on autopilot. Let&rsquo;s build an agent for your business.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-brand-dark text-white font-semibold text-sm py-3 px-7 rounded-xl transition-all duration-300 hover:bg-brand-dark-hover hover:-translate-y-0.5"
          >
            Start a Project
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
