import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsList, testimonialCategories } from '../data/testimonials';

export default function TestimonialsSection({ limit }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);

  const filtered = activeCategory === 'All'
    ? testimonialsList
    : testimonialsList.filter(t => t.category === activeCategory);

  const displayed = limit ? filtered.slice(0, limit) : filtered;
  const itemsPerPage = 1;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const featured = filtered[currentPage];

  const next = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prev = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <section className="py-20 md:py-28 border-t border-brand-border bg-white relative overflow-hidden" id="testimonials">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-[-5%] w-100 h-100 rounded-full bg-brand-yellow/3 blur-[120px]" />
        <div className="absolute bottom-1/4 right-[-5%] w-87.5 h-87.5 rounded-full bg-purple-500/3 blur-[100px]" />
      </div>

      <div className="w-full max-w-300 mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-text-muted">Client Stories</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight mt-3">
            Trusted by industry leaders
          </h2>
          <p className="text-brand-text-muted text-base md:text-lg max-w-135 mx-auto leading-relaxed mt-3">
            Real results from real teams who transformed their operations with AI agents.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['All', ...testimonialCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentPage(0); }}
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

        {limit ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayed.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
            <Link
              to="/testimonials"
              className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-brand-border bg-brand-bg-light/50 text-brand-text-muted hover:text-brand-dark hover:border-brand-text-muted transition-all duration-200 py-12 px-6 text-sm font-semibold group"
            >
              View all testimonials
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        ) : featured ? (
          <div className="max-w-200 mx-auto">
            <div className="relative">
              <div className="bg-white rounded-2xl border border-brand-border p-8 md:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-yellow" />

                <Quote size={32} className="mx-auto mb-6 text-brand-yellow/40" />

                <p className="text-lg md:text-xl text-brand-dark leading-relaxed font-medium italic mb-8">
                  &ldquo;{featured.quote}&rdquo;
                </p>

                {/* Star rating */}
                <div className="flex items-center justify-center gap-1 mb-5">
                  {Array.from({ length: featured.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-brand-yellow text-brand-yellow" />
                  ))}
                </div>

                <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center text-white text-sm font-bold font-heading mx-auto mb-3">
                  {featured.initials}
                </div>
                <div className="font-semibold text-brand-dark text-sm">{featured.name}</div>
                <div className="text-brand-text-muted text-xs">{featured.role}, {featured.company}</div>
              </div>

              {/* Navigation */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button onClick={prev} className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-dark hover:border-brand-dark transition-all duration-200 cursor-pointer">
                    <ChevronLeft size={16} />
                  </button>
                  <div className="flex gap-1.5">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                          i === currentPage ? 'bg-brand-dark w-5' : 'bg-brand-border'
                        }`}
                      />
                    ))}
                  </div>
                  <button onClick={next} className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-dark hover:border-brand-dark transition-all duration-200 cursor-pointer">
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-brand-text-muted text-sm">No testimonials found for this category.</p>
        )}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial: t }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-white p-6 flex flex-col gap-4 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 group">
      <div className="flex items-center gap-1">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={13} className="fill-brand-yellow text-brand-yellow" />
        ))}
      </div>

      <p className="text-sm text-brand-text-muted leading-relaxed line-clamp-4">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3 mt-auto pt-2">
        <div className="w-9 h-9 rounded-full bg-brand-dark flex items-center justify-center text-white text-[11px] font-bold font-heading shrink-0">
          {t.initials}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-brand-dark truncate">{t.name}</div>
          <div className="text-[11px] text-brand-text-muted truncate">{t.role}, {t.company}</div>
        </div>
      </div>
    </div>
  );
}
