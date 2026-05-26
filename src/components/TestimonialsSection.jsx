import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CircularGallery } from './ui/circular-gallery';
import { testimonialsList } from '../data/testimonials';

gsap.registerPlugin(ScrollTrigger);

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
    text: `${t.name} - ${t.role} at ${t.company}`,
    pos: ['50% 30%', '50% 30%', '50% 40%', '50% 40%', '50% 35%', '50% 40%'][i],
    by: t.quote,
  },
}));

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const [galleryRotation, setGalleryRotation] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(max-width: 767px)').matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: 'testimonials-gallery-trigger',
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * 1.15}`,
        scrub: 0.45,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setGalleryRotation(self.progress * 360);
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="border-t border-brand-border bg-white relative md:h-screen overflow-hidden" id="testimonials">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-[-5%] w-100 h-100 rounded-full bg-brand-yellow/3 blur-[120px]" />
        <div className="absolute bottom-1/4 right-[-5%] w-87.5 h-87.5 rounded-full bg-purple-500/3 blur-[100px]" />
      </div>

      <div className="relative z-10 flex h-full flex-col px-6 pt-16 pb-12 md:pt-20 md:pb-10">
        <div className="text-center shrink-0">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-text-muted">Client Stories</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight mt-3">
            Trusted by industry leaders
          </h2>
          <p className="text-brand-text-muted text-base md:text-lg max-w-135 mx-auto leading-relaxed mt-3">
            Real results from real teams who transformed their operations with AI agents.
          </p>
        </div>

        <div className="md:hidden grid grid-cols-1 gap-4 pt-10 pb-10">
          {testimonialsList.slice(0, 3).map((item) => (
            <div key={item.id} className="rounded-2xl border border-brand-border bg-white p-5 shadow-card">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#F6C744" stroke="#F6C744" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                ))}
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-4 border-t border-brand-border/60 pt-4">
                <div className="text-sm font-semibold text-brand-dark">{item.name}</div>
                <div className="text-xs text-brand-text-muted">{item.role}, {item.company}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative hidden md:flex min-h-0 flex-1 items-center justify-center pt-4 pb-8 md:pt-6 md:pb-12">
          <div className="w-full h-full max-h-[560px] max-w-[1000px] mx-auto relative">
            <CircularGallery
              items={galleryItems}
              radius={400}
              rotation={galleryRotation}
              autoRotate={false}
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

        <div className="text-center shrink-0">
          <div className="max-w-300 mx-auto border-t border-brand-border pt-10 md:pt-12">
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
