import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CircularGallery } from './ui/circular-gallery';
import { testimonialsList } from '../data/testimonials';

const galleryItems = testimonialsList.map((t, i) => ({
  common: t.name,
  binomial: `${t.role}, ${t.company}`,
  photo: {
    url: [
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=80',
    ][i],
    text: `${t.name} — ${t.role} at ${t.company}`,
    pos: ['50% 30%', '50% 30%', '50% 40%', '50% 40%', '50% 35%', '50% 40%'][i],
    by: t.quote,
  },
}));

export default function TestimonialsSection({ limit }) {
  return (
    <section className="border-t border-brand-border bg-white relative overflow-hidden" id="testimonials">
      {/* Heading */}
      <div className="text-center pt-20 md:pt-28 pb-4 px-6 relative z-10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-text-muted">Client Stories</span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight mt-3">
          Trusted by industry leaders
        </h2>
        <p className="text-brand-text-muted text-base md:text-lg max-w-135 mx-auto leading-relaxed mt-3">
          Real results from real teams who transformed their operations with AI agents.
        </p>
      </div>

      {/* Circular Gallery — scroll-driven 3D carousel */}
      <div className="relative" style={{ height: '500vh' }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-[-5%] w-100 h-100 rounded-full bg-brand-yellow/3 blur-[120px]" />
            <div className="absolute bottom-1/4 right-[-5%] w-87.5 h-87.5 rounded-full bg-purple-500/3 blur-[100px]" />
          </div>
          <div className="w-full h-full max-w-[1000px] mx-auto relative z-10">
            <CircularGallery items={galleryItems} radius={400} autoRotateSpeed={0.06} />
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center pb-20 md:pb-28 px-6 relative z-10 -mt-1">
        <div className="max-w-300 mx-auto border-t border-brand-border pt-8">
          <Link
            to="/testimonials"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-text-muted hover:text-brand-dark transition-colors group"
          >
            Read all client stories
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
