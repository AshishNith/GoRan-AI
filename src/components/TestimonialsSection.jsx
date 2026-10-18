import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import PolaroidLineCarousel from './ui/polaroid-line-carousel';
import { testimonialsList } from '../data/testimonials';

const YELLOW = '#F6C744';
const INK = '#171717';

// The line each print leads with, taken from that client's own words
const PULL_QUOTES = {
  'dr-ankit-sharma': 'Patient scheduling became seamless.',
  'priyanshu-gupta': 'Our response speed improved instantly.',
  'neha-singh': 'Inquiries, reminders and records in one dashboard.',
  'rohit-verma': 'We close deals much faster than before.',
  'aditya-jain': 'Operational mistakes reduced massively.',
  'simran-kaur': 'Saved our team countless hours every week.',
};

// Face of one polaroid: alternating dark glass and brand yellow, sized in container units so it
// scales with the print
function PrintFace({ item, index }) {
  const dark = index % 2 === 0;
  const fg = dark ? '#FFFFFF' : INK;
  const accent = dark ? YELLOW : INK;
  return (
    <div
      className="absolute inset-0"
      style={{
        containerType: 'inline-size',
        background: dark
          ? 'radial-gradient(ellipse 70% 55% at 0% 0%, rgba(255,255,255,0.2), transparent 70%), linear-gradient(135deg, #222626 0%, #0d0f0f 60%)'
          : 'linear-gradient(135deg, #FBD766 0%, #F6C744 55%, #EDB62F 100%)',
        color: fg,
      }}
    >
      <div className="flex h-full flex-col justify-between" style={{ padding: '7cqw' }}>
        <div className="flex items-center justify-between" style={{ gap: '3cqw' }}>
          <span className="flex" style={{ gap: '1cqw' }}>
            {Array.from({ length: item.rating }).map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" fill={accent} style={{ width: '5.2cqw', height: '5.2cqw' }} aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </span>
          <span className="truncate font-bold uppercase" style={{ fontSize: 'max(7px, 3.6cqw)', letterSpacing: '0.14em', opacity: 0.7 }}>
            {item.category}
          </span>
        </div>

        <p className="m-0 font-heading font-bold" style={{ fontSize: 'max(11px, 9.4cqw)', lineHeight: 1.16, textWrap: 'balance' }}>
          <span style={{ color: accent }}>&ldquo;</span>
          {PULL_QUOTES[item.id] ?? item.quote.split('. ')[0]}
        </p>

        <div className="flex items-center" style={{ gap: '3cqw' }}>
          <span
            className="flex shrink-0 items-center justify-center rounded-full font-heading font-bold"
            style={{ width: '12cqw', height: '12cqw', fontSize: 'max(7px, 4.6cqw)', background: accent, color: dark ? INK : YELLOW }}
          >
            {item.initials}
          </span>
          <span className="truncate font-semibold" style={{ fontSize: 'max(8px, 4.4cqw)', opacity: 0.85 }}>
            {item.company}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const slides = useMemo(
    () =>
      testimonialsList.map((item, index) => ({
        title: item.name,
        caption: `${item.role}, ${item.company}`,
        alt: `${item.name}, ${item.role} at ${item.company}`,
        content: <PrintFace item={item} index={index} />,
      })),
    [],
  );

  const current = testimonialsList[active] ?? testimonialsList[0];

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

        <div className="w-full mt-6 md:mt-8">
          <PolaroidLineCarousel
            slides={slides}
            onChange={setActive}
            height="clamp(440px, 62vh, 620px)"
            cardWidth={280}
            autoplay={6500}
            background="transparent"
            ink={INK}
            string="#c4bfb5"
            ariaLabel="Client testimonials"
          />
        </div>

        {/* The full words behind the print in front */}
        <figure key={current.id} className="m-0 mx-auto mt-2 md:mt-4 px-6 max-w-170 text-center min-h-44 md:min-h-36 animate-in fade-in slide-in-from-bottom-2 duration-500">
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
