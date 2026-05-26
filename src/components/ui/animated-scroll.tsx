import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Stat {
  label: string;
  value: string;
}

interface CaseStudyContent {
  tag: string;
  heading: string;
  description: string;
  stats: Stat[];
}

interface PageData {
  leftBgImage: string | null;
  rightBgImage: string | null;
  leftContent: CaseStudyContent | null;
  rightContent: CaseStudyContent | null;
  path: string | null;
}

const pages: PageData[] = [
  {
    leftBgImage: '/case_study_intro.png',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      tag: 'Our Past Work',
      heading: 'Real Stories. Real Business Growth.',
      description: 'We don\'t build AI for the sake of it. We build smart, custom tools that solve actual headaches for real companies. Here is a look at what we have delivered.',
      stats: [
        { label: 'Client Feedback', value: '4.9/5 Rating' },
        { label: 'Core Focus', value: 'Efficiency & Sales' }
      ]
    },
    path: null
  },
  {
    leftBgImage: null,
    rightBgImage: '/audit_dashboard.png',
    leftContent: {
      tag: '01. AI Sales Automation',
      heading: 'Lead Response From 9 Hours to 3 Mins',
      description: 'Maruti Techno Rubber faced fragmented sales inquiries across web, email, and WhatsApp, losing potential deals to delays. We built an AI CRM that categorises and assigns leads instantly. Lead conversion increased by 73%.',
      stats: [
        { label: 'Client Partner', value: 'Maruti Techno' },
        { label: 'Conversion Boost', value: '73% Higher' }
      ]
    },
    rightContent: null,
    path: 'maruti-techno-rubber'
  },
  {
    leftBgImage: '/booking_dashboard.png',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      tag: '02. AI Agriculture Platform',
      heading: 'AI Advisor for 12,000+ Farmers',
      description: 'Farmers in rural India struggled to get prompt crop recommendations. We built Anaaj AI, a multilingual mobile assistant that answers queries, identifies diseases from images, and tracks mandi prices on autopilot.',
      stats: [
        { label: 'Client Partner', value: 'Anaaj AI' },
        { label: 'Queries Resolved', value: '12,000+ Queries' }
      ]
    },
    path: 'anaaj-ai'
  },
  {
    leftBgImage: null,
    rightBgImage: '/sorting_dashboard.png',
    leftContent: {
      tag: '03. AI Voice Automation',
      heading: '84% Inbound Calls Automated',
      description: 'NexaCall was overwhelmed by repetitive support queries and appointment bookings. We built a low-latency voice agent using LiveKit and Gemini Realtime API that handles natural phone conversations. 84% of calls are now automated.',
      stats: [
        { label: 'Client Partner', value: 'NexaCall' },
        { label: 'Call Automation', value: '84% Automated' }
      ]
    },
    rightContent: null,
    path: 'voice-agent-platform'
  },
  {
    leftBgImage: '/training_dashboard.png',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      tag: '04. AI Lead Management',
      heading: '3.2x Consultation Bookings Boost',
      description: 'EduConsult had high student lead volumes but struggled with counselor matching and delayed follow-ups. We deployed an AI-driven CRM that pre-scores leads and nurtures them automatically via email and WhatsApp.',
      stats: [
        { label: 'Client Partner', value: 'EduConsult' },
        { label: 'Bookings Increase', value: '3.2x Bookings' }
      ]
    },
    path: 'educonsult-ai'
  },
];

// ── Image Scroll Loop Component ──

const IMAGE_URLS = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
];

const ImageScrollLoop = () => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-brand-bg-light flex items-center">
      <style>{`
        @keyframes scrollLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scroll-track {
          animation: scrollLoop 30s linear infinite;
        }
        .scroll-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="scroll-track flex gap-6 absolute left-0 top-1/2 -translate-y-1/2">
        {[...IMAGE_URLS, ...IMAGE_URLS].map((url, idx) => (
          <div
            key={idx}
            className="w-[280px] h-[200px] flex-shrink-0 rounded-2xl overflow-hidden shadow-card border border-brand-border/40"
          >
            <img
              src={url}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-brand-bg-light to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-brand-bg-light to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default function ScrollAdventure() {
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = pages.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightPanelsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Navigation via dots and chevrons
  const goToPage = (pageIndex: number) => {
    const trigger = ScrollTrigger.getById('case-studies-trigger');
    if (!trigger) return;

    const start = trigger.start;
    const end = trigger.end;
    const totalScroll = end - start;
    const progress = (pageIndex - 1) / (numOfPages - 1);
    const targetScroll = start + totalScroll * progress;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(max-width: 767px)').matches) return;

    // Create GSAP timeline linked to scroll pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'case-studies-trigger',
        trigger: container,
        start: 'top top',
        end: () => `+=${window.innerHeight * (numOfPages - 1)}`,
        scrub: 0.5, // slightly loose scrub for butter-smooth feeling
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Dynamically compute closest page (1 to 5)
          const activeIndex = Math.round(progress * (numOfPages - 1)) + 1;
          setCurrentPage(activeIndex);
        },
      },
    });

    // Animate pages 2 to 5 (index 1 to 4)
    for (let i = 1; i < numOfPages; i++) {
      const leftPanel = leftPanelsRef.current[i];
      const rightPanel = rightPanelsRef.current[i];

      if (leftPanel && rightPanel) {
        tl.to(leftPanel, { y: '0%', ease: 'none' }, `slide-${i}`)
          .to(rightPanel, { y: '0%', ease: 'none' }, `slide-${i}`);
      }
    }

    return () => {
      // Cleanup trigger on unmount
      ScrollTrigger.getById('case-studies-trigger')?.kill();
    };
  }, [numOfPages]);

  return (
    <>
    <section className="md:hidden bg-white border-t border-b border-brand-border py-16">
      <div className="w-full px-6">
        <div className="mb-10">
          <span className="text-[#B45309] font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
            Our Past Work
          </span>
          <h2 className="text-3xl font-heading font-bold text-brand-dark leading-tight tracking-tight">
            Real Stories. Real Business Growth.
          </h2>
          <p className="text-sm text-brand-text-muted leading-relaxed mt-4">
            Custom AI tools that solve actual operational headaches for real companies.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {pages.slice(1).map((page, i) => {
            const content = page.leftContent || page.rightContent;
            if (!content) return null;

            return (
              <article key={page.path || i} className="rounded-2xl border border-brand-border bg-white p-5 shadow-card">
                <span className="text-[#B45309] font-mono text-[10px] uppercase tracking-widest font-semibold block mb-3">
                  {content.tag}
                </span>
                <h3 className="text-2xl font-heading font-bold text-brand-dark leading-tight">
                  {content.heading}
                </h3>
                <p className="text-sm text-brand-text-muted leading-relaxed mt-4">
                  {content.description}
                </p>

                {content.stats && (
                  <div className="pt-5 mt-5 border-t border-brand-border grid grid-cols-1 min-[420px]:grid-cols-2 gap-4">
                    {content.stats.map((stat, sIdx) => (
                      <div key={sIdx}>
                        <span className="block text-[10px] uppercase font-mono text-brand-text-muted tracking-wider">
                          {stat.label}
                        </span>
                        <span className="text-base font-bold text-[#B45309] mt-1 block">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {page.path && (
                  <Link
                    to={`/case-studies/${page.path}`}
                    className="inline-flex items-center gap-1.5 mt-6 py-2.5 px-5 rounded-full text-xs font-semibold bg-brand-yellow text-brand-dark transition-all duration-300 hover:bg-brand-yellow-hover no-underline shadow-card"
                  >
                    Read Case Study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section
      ref={containerRef}
      className="relative hidden md:block overflow-hidden h-screen bg-white w-full border-t border-b border-brand-border"
    >
      {pages.map((page, i) => {
        const idx = i + 1;
        const isFirst = i === 0;

        return (
          <div
            key={idx}
            className="absolute inset-0 flex flex-col md:flex-row"
            style={{ 
              zIndex: idx,
              pointerEvents: currentPage === idx ? 'auto' : 'none'
            }}
          >
            {/* Left Panel */}
            <div
              ref={(el) => {
                leftPanelsRef.current[i] = el;
              }}
              className={`w-full md:w-3/5 h-1/2 md:h-full absolute top-0 left-0 ${page.leftContent ? 'md:w-2/5' : 'md:w-3/5'}`}
              style={{
                transform: isFirst ? 'none' : 'translateY(100vh)',
                willChange: 'transform',
              }}
            >
              <div
                className="w-full h-full relative bg-white overflow-hidden"
              >
                <div className="relative flex flex-col items-center justify-center h-full text-brand-text-main p-6 md:p-10 z-10 break-words">
                  {page.leftContent ? (
                    <div className="w-full max-w-md text-left bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-brand-border md:border-none md:p-0 md:bg-transparent md:backdrop-blur-none">
                      <span className="text-[#B45309] font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
                        {page.leftContent.tag}
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-heading font-bold text-brand-dark mb-4 tracking-tight leading-tight">
                        {page.leftContent.heading}
                      </h3>
                      <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed font-body mb-8">
                        {page.leftContent.description}
                      </p>

                      {page.leftContent.stats && (
                        <div className="pt-6 border-t border-brand-border grid grid-cols-2 gap-4">
                          {page.leftContent.stats.map((stat, sIdx) => (
                            <div key={sIdx}>
                              <span className="block text-[10px] uppercase font-mono text-brand-text-muted tracking-wider">
                                {stat.label}
                              </span>
                              <span className="text-base font-bold text-[#B45309] mt-1 block">
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {page.path && (
                        <Link 
                          to={`/case-studies/${page.path}`}
                          className="inline-flex items-center gap-1.5 mt-8 py-2.5 px-6 rounded-full text-xs font-semibold bg-brand-yellow text-brand-dark transition-all duration-300 hover:bg-brand-yellow-hover hover:translate-y-[-1px] no-underline shadow-card"
                        >
                          Read Case Study
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <ImageScrollLoop />
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div
              ref={(el) => {
                rightPanelsRef.current[i] = el;
              }}
              className={`w-full md:w-2/5 h-1/2 md:h-full absolute bottom-0 md:top-0 right-0 ${page.rightContent ? 'md:w-2/5' : 'md:w-3/5'}`}
              style={{
                transform: isFirst ? 'none' : 'translateY(-100vh)',
                willChange: 'transform',
              }}
            >
              <div
                className="w-full h-full relative bg-white overflow-hidden"
              >
                <div className="relative flex flex-col items-center justify-center h-full text-brand-text-main p-6 md:p-10 z-10 break-words">
                  {page.rightContent ? (
                    <div className="w-full max-w-md text-left bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-brand-border md:border-none md:p-0 md:bg-transparent md:backdrop-blur-none">
                      <span className="text-[#B45309] font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
                        {page.rightContent.tag}
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-heading font-bold text-brand-dark mb-4 tracking-tight leading-tight">
                        {page.rightContent.heading}
                      </h3>
                      <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed font-body mb-8">
                        {page.rightContent.description}
                      </p>

                      {page.rightContent.stats && (
                        <div className="pt-6 border-t border-brand-border grid grid-cols-2 gap-4">
                          {page.rightContent.stats.map((stat, sIdx) => (
                            <div key={sIdx}>
                              <span className="block text-[10px] uppercase font-mono text-brand-text-muted tracking-wider">
                                {stat.label}
                              </span>
                              <span className="text-base font-bold text-[#B45309] mt-1 block">
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {page.path && (
                        <Link 
                          to={`/case-studies/${page.path}`}
                          className="inline-flex items-center gap-1.5 mt-8 py-2.5 px-6 rounded-full text-xs font-semibold bg-brand-yellow text-brand-dark transition-all duration-300 hover:bg-brand-yellow-hover hover:translate-y-[-1px] no-underline shadow-card"
                        >
                          Read Case Study
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <ImageScrollLoop />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Navigation Dots */}
      <div className="absolute left-6 bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-[100] flex md:flex-col gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentPage === i + 1 ? 'bg-brand-yellow scale-125' : 'bg-black/20 hover:bg-black/40'
            }`}
          />
        ))}
      </div>

      {/* Slide Navigation Buttons */}
      <div className="absolute right-6 bottom-6 z-[100] flex gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Slide"
          className="w-10 h-10 rounded-full border border-brand-border bg-white text-brand-text-main flex items-center justify-center transition-all duration-200 hover:bg-black/5 hover:border-brand-text-muted disabled:opacity-30 disabled:pointer-events-none shadow-card"
        >
          <ChevronUp size={20} />
        </button>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === numOfPages}
          aria-label="Next Slide"
          className="w-10 h-10 rounded-full border border-brand-border bg-white text-brand-text-main flex items-center justify-center transition-all duration-200 hover:bg-black/5 hover:border-brand-text-muted disabled:opacity-30 disabled:pointer-events-none shadow-card"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Section Indicator Label */}
      <div className="absolute left-6 top-6 z-[100] hidden md:block">
        <span className="text-[10px] font-bold text-brand-text-muted tracking-[0.2em] uppercase">
          Case Studies — {currentPage} / {numOfPages}
        </span>
      </div>
    </section>
    </>
  );
}
