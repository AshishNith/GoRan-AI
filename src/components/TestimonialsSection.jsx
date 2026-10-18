import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { StaggerTestimonials } from './ui/stagger-testimonials';
import { testimonialsList } from '../data/testimonials';

// The line each card leads with, taken from that client's own words
const PULL_QUOTES = {
  'dr-ankit-sharma': 'Patient scheduling became seamless.',
  'priyanshu-gupta': 'Our response speed improved instantly.',
  'neha-singh': 'Inquiries, reminders and records in one dashboard.',
  'rohit-verma': 'We close deals much faster than before.',
  'aditya-jain': 'Operational mistakes reduced massively.',
  'simran-kaur': 'Saved our team countless hours every week.',
};

export default function TestimonialsSection() {
  const [activeId, setActiveId] = useState(testimonialsList[0].id);

  const items = useMemo(
    () =>
      testimonialsList.map((item) => ({
        id: item.id,
        testimonial: PULL_QUOTES[item.id] ?? item.quote.split('. ')[0],
        by: `${item.name}, ${item.role}, ${item.company}`,
        initials: item.initials,
      })),
    [],
  );

  const current = testimonialsList.find((item) => item.id === activeId) ?? testimonialsList[0];

  return (
    <section className="border-t border-brand-border bg-white relative overflow-hidden py-16 md:py-24" id="testimonials">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-[-5%] w-100 h-100 rounded-full bg-brand-yellow/3 blur-[120px]" />
        <div className="absolute bottom-1/4 right-[-5%] w-87.5 h-87.5 rounded-full bg-purple-500/3 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col">
        <div className="text-center shrink-0 px-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-text-muted">Client Stories</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight mt-3">
            Trusted by industry leaders
          </h2>
          <p className="text-brand-text-muted text-base md:text-lg max-w-135 mx-auto leading-relaxed mt-3">
            Real results from real teams who transformed their operations with AI agents.
          </p>
        </div>

        <div className="w-full mt-8 md:mt-10">
          <StaggerTestimonials items={items} onCenterChange={setActiveId} height={560} />
        </div>

        {/* The full words behind the card in the middle */}
        <figure key={current.id} className="m-0 mx-auto mt-4 px-6 max-w-170 text-center min-h-44 md:min-h-36 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <blockquote className="m-0 text-base md:text-lg leading-relaxed text-brand-dark">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {current.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-brand-border bg-brand-bg-light px-3 py-1 text-xs font-medium text-brand-text-muted">
                {tag}
              </span>
            ))}
          </figcaption>
        </figure>

        <div className="text-center shrink-0 px-6">
          <div className="max-w-300 mx-auto border-t border-brand-border pt-8 md:pt-10">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-text-muted hover:text-brand-dark transition-colors group"
            >
              Read all client stories
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
