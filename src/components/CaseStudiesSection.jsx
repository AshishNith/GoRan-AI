import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { caseStudiesData } from '../pages/CaseStudyDetail';

gsap.registerPlugin(ScrollTrigger);

// The headline result, a short brief and the client's real site for each story shown on Home.
// Name, tag, timeline and tech come from the case study data so they stay in one place.
const CASES = [
  {
    id: 'anaaj-ai',
    metric: '12,000+',
    label: 'farmer queries resolved',
    desc: 'Rural farmers couldn\'t get prompt crop advice. We built a multilingual assistant that answers queries, spots crop disease from photos and automates the CRM.',
    image: '/case-studies/anaaj-ai.jpg',
  },
  {
    id: 'herbsera',
    metric: '92%',
    label: 'customer support automated',
    desc: 'Fragmented touchpoints slowed HerbsEra down. We unified the CRM, automated WhatsApp and added an AI voice agent that calls customers back.',
    image: '/case-studies/herbsera.jpg',
  },
  {
    id: 'hadoti-farms',
    metric: '3.5x',
    label: 'monthly order growth',
    desc: 'Hadoti Farms needed stock tracking and delivery automation. We shipped a headless store with live inventory and WhatsApp dispatch updates.',
    image: '/case-studies/hadoti-farms.jpg',
  },
  {
    id: 'greenwrench',
    metric: '88%',
    label: 'faster lead response',
    desc: 'Lead overload was stalling GreenWrench. We built a booking portal and an AI router that assigns every request to a technician in under 2 minutes.',
    image: '/case-studies/greenwrench.jpg',
  },
  {
    id: 'aroboticservices',
    metric: '65%',
    label: 'diagnostic bookings automated',
    desc: 'A Robotics Services needed dynamic scheduling. We built a premium portal with a diagnostic intake flow that books service visits with no manual work.',
    image: '/case-studies/arobotics.jpg',
  },
];

// Only this many case studies scroll in full. The rest are blurred behind a "Show more" button
const FULL = 3;

// Wide, tall-enough screens without reduced motion get the pinned horizontal track
const PIN_QUERY = '(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)';
const CARD_WIDTH = 'min(1100px, 86vw)';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = () => setMatches(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

const TILT_LEFT = 'md:[transform:rotateY(-8deg)_rotateX(3deg)] md:group-hover/card:[transform:rotateY(0deg)_rotateX(0deg)]';
const TILT_RIGHT = 'md:[transform:rotateY(8deg)_rotateX(3deg)] md:group-hover/card:[transform:rotateY(0deg)_rotateX(0deg)]';

function parseMetric(metric) {
  const match = metric.match(/^([\d,.]+)(.*)$/);
  const raw = match[1];
  return {
    value: parseFloat(raw.replace(/,/g, '')),
    decimals: (raw.split('.')[1] || '').length,
    suffix: match[2],
  };
}

const formatMetric = (value, decimals, suffix) =>
  (decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US')) + suffix;

function BrowserFrame({ name, image, flip }) {
  return (
    <div
      className={`w-full max-w-[560px] rounded-xl border border-white/15 bg-[#0d0f0f] overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out ${flip ? TILT_RIGHT : TILT_LEFT}`}
    >
      <div className="flex items-center gap-1.5 h-8 px-3 border-b border-white/10 bg-white/[0.05]">
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="mx-auto text-[10px] font-medium text-white/40 pr-8">{name}</span>
      </div>
      {/* The screenshots carry a scrollbar down the right edge; overscan the image to crop it out */}
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={`${name} website`}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block h-full w-[102%] max-w-none object-cover object-top"
        />
      </div>
    </div>
  );
}

// Sits over the first blurred card and sends people on to the full list
function ShowMore({ hidden, className = 'absolute inset-0 z-20 px-6', ...rest }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 text-center ${className}`} {...rest}>
      <span className="rounded-full border border-brand-border bg-white/80 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">
        {hidden} more case studies
      </span>
      <Link
        to="/case-studies"
        className="inline-flex items-center gap-2 rounded-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-semibold text-base py-3.5 px-8 shadow-[0_18px_40px_-12px_rgba(246,199,68,0.7)] transition-all duration-200 hover:-translate-y-0.5 no-underline"
      >
        Show more <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function CaseCard({ item, index, horizontal, blurred = false, overlay = null }) {
  const data = caseStudiesData[item.id];
  if (!data) return null;
  const flip = index % 2 === 1;

  return (
    <li
      data-case
      className={horizontal ? 'relative shrink-0 h-full' : 'relative mb-5 md:mb-8'}
      style={horizontal ? { width: CARD_WIDTH } : undefined}
    >
      {overlay}
      <div
        data-card
        inert={blurred || undefined}
        aria-hidden={blurred || undefined}
        className={`group/card relative h-full ${blurred ? 'blur-[10px] opacity-60 pointer-events-none select-none' : ''}`}
      >
        <article
          className={`relative h-full overflow-hidden rounded-3xl text-white grid ${horizontal ? 'grid-cols-[1.02fr_1fr]' : 'grid-cols-1 md:grid-cols-[1.02fr_1fr]'}`}
          style={{ background: 'linear-gradient(135deg, #1c1f1f 0%, #0d0f0f 55%, #0b0c0c 100%)' }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 45% 50% at 0% 0%, rgba(255,255,255,0.4), transparent 70%), conic-gradient(from 90deg at 0% 0%, transparent 8deg, rgba(255,255,255,0.26) 40deg, transparent 72deg)',
              maskImage: 'radial-gradient(circle at 0% 0%, #000 0%, #000 25%, transparent 90%)',
              WebkitMaskImage: 'radial-gradient(circle at 0% 0%, #000 0%, #000 25%, transparent 90%)',
            }}
          />
          <span
            aria-hidden
            className="absolute inset-0 rounded-3xl pointer-events-none p-px"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.06))',
              mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              maskComposite: 'exclude',
              WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
            }}
          />

          {/* Frame lines crossing the card, with a white dot riding them. Positions match the dot's
              offset path in index.css (22px top and bottom, 26px left and right). Desktop only, so
              the lines never cut across the stacked phone layout. */}
          <div aria-hidden className="hidden md:block absolute inset-0 pointer-events-none">
            <span className="absolute inset-x-0 top-[22px] h-px bg-gradient-to-r from-white/40 via-white/12 to-white/8" />
            <span className="absolute inset-x-0 bottom-[22px] h-px bg-gradient-to-r from-white/12 to-white/8" />
            <span className="absolute inset-y-0 left-[26px] w-px bg-gradient-to-b from-white/40 via-white/12 to-white/8" />
            <span className="absolute inset-y-0 right-[26px] w-px bg-gradient-to-b from-white/12 to-white/8" />
            <span className="card-dot hidden md:block" style={{ animationDelay: `${-index * 3.3}s` }} />
          </div>

          {/* Copy */}
          <div className={`relative flex flex-col justify-center p-7 md:p-12 ${flip ? 'md:order-2' : ''}`}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow shadow-[0_0_8px_rgba(246,199,68,0.9)]" />
                {data.name}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">{data.tag}</span>
            </div>

            <div
              data-metric={blurred ? undefined : item.metric}
              className="font-heading font-bold leading-none mt-5 text-6xl md:text-8xl bg-gradient-to-r from-white to-brand-yellow bg-clip-text text-transparent"
            >
              {item.metric}
            </div>
            <h3 className="m-0 mt-3 text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-white/70">{item.label}</h3>

            <p className="m-0 mt-5 max-w-[440px] text-sm md:text-[0.95rem] leading-relaxed text-white/55">{item.desc}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-4">
              <Link
                to={`/case-studies/${item.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-semibold text-sm py-2.5 px-5 transition-all duration-200 hover:-translate-y-0.5"
              >
                Read the case study <ArrowRight size={15} />
              </Link>
              <span className="text-xs text-white/40">{data.techStack.slice(0, 3).join(' · ')}</span>
            </div>
          </div>

          {/* The client's real site in a browser frame */}
          <div className={`relative flex items-center justify-center p-5 pt-0 md:p-8 [perspective:1400px] ${flip ? 'md:order-1' : ''} order-first md:order-none`}>
            <div className="relative w-full flex justify-center pt-5 md:pt-0">
              <BrowserFrame name={data.name} image={item.image} flip={flip} />
              <span className={`absolute bottom-3 md:bottom-0 ${flip ? 'right-6 md:right-4' : 'left-6 md:left-4'} inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 backdrop-blur px-3 py-1.5 text-xs font-semibold text-white`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live in {data.timeline.toLowerCase()}
              </span>
            </div>
          </div>

        </article>
      </div>
    </li>
  );
}

function SectionHeader({ className = '', align = 'center', children }) {
  return (
    <div className={className}>
      <div className={align === 'center' ? 'text-center' : ''}>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-text-muted">Our past work</span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-[1.1] mt-3 mb-0 text-balance">
          Real stories. Real <span className="text-brand-yellow">business growth</span>
        </h2>
        <p className={`text-brand-text-muted text-base md:text-lg leading-relaxed max-w-[520px] mt-4 mb-0 ${align === 'center' ? 'mx-auto' : ''}`}>
          Custom AI tools that solve actual operational headaches. Here is what we have delivered.
        </p>
      </div>
      {children}
    </div>
  );
}

function ViewAllLink() {
  return (
    <Link
      to="/case-studies"
      className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-semibold text-sm py-3 px-6 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-md shrink-0"
    >
      View all case studies <ArrowRight size={14} />
    </Link>
  );
}

// Desktop: the section pins and scrolling slides the case studies sideways, one at a time.
// Phones, short screens and reduced motion get a plain vertical list.
export default function CaseStudiesSection() {
  const rootRef = useRef(null);
  const segmentRefs = useRef([]);
  const horizontal = useMediaQuery(PIN_QUERY);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const countUp = (el, scrollTrigger) => {
      const { value, decimals, suffix } = parseMetric(el.dataset.metric);
      const counter = { v: 0 };
      el.textContent = formatMetric(0, decimals, suffix);
      gsap.to(counter, {
        v: value,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = formatMetric(counter.v, decimals, suffix); },
        scrollTrigger: { ...scrollTrigger, once: true },
      });
    };

    const ctx = gsap.context(() => {
      const metrics = Array.from(root.querySelectorAll('[data-metric]'));
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!horizontal) {
        if (!reduce) metrics.forEach((el) => countUp(el, { trigger: el, start: 'top 85%' }));
        return;
      }

      const pin = root.querySelector('[data-pin]');
      const track = root.querySelector('[data-track]');
      const cards = Array.from(track.children);
      const more = root.querySelector('[data-more]');
      const view = track.parentElement;
      const spacing = () => cards[1].offsetLeft - cards[0].offsetLeft;
      // Where the third card sits in the middle of the screen
      const centred = () => cards[FULL - 1].offsetLeft - cards[0].offsetLeft;
      // Then the track stops a little further on, with the third card near the left edge, so the
      // blurred cards and the Show more button fill the right side
      const distance = () => centred() + Math.max(0, (view.clientWidth - cards[FULL - 1].offsetWidth) / 2 - 24);
      const stops = () => [...Array(FULL).keys()].map((i) => (i * spacing()) / distance()).concat(1);
      const nearest = (value) => stops().reduce((best, stop) => (Math.abs(stop - value) < Math.abs(best - value) ? stop : best), 0);

      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          id: 'case-studies-horizontal',
          trigger: pin,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          // Settle on the nearest card, never fling past several on a fast scroll
          snap: { snapTo: nearest, inertia: false, duration: { min: 0.2, max: 0.6 }, delay: 0.1, ease: 'power1.inOut' },
          onUpdate: (self) => {
            const position = Math.min(FULL - 1, (self.progress * distance()) / spacing());
            segmentRefs.current.forEach((bar, idx) => {
              if (bar) bar.style.transform = `scaleX(${Math.min(1, Math.max(0, position - idx + 1))})`;
            });
            // The Show more button comes in once the last full card has settled
            if (more) {
              const show = Math.min(1, Math.max(0, (self.progress - 0.82) / 0.14));
              more.style.opacity = String(show);
              more.style.pointerEvents = show > 0.6 ? 'auto' : 'none';
            }
          },
        },
      });

      // The card in the middle is full size; its neighbours shrink back and fade
      cards.slice(0, FULL).forEach((card) => {
        gsap.timeline({
          scrollTrigger: { trigger: card, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true },
        })
          .fromTo(card, { scale: 0.88, opacity: 0.4 }, { scale: 1, opacity: 1, ease: 'none', duration: 1 })
          .to(card, { scale: 0.88, opacity: 0.4, ease: 'none', duration: 1 });
      });

      // Count up as each card arrives; the first one is already in place when the section arrives
      metrics.forEach((el, idx) => {
        countUp(el, idx === 0
          ? { trigger: pin, start: 'top 60%' }
          : { trigger: el, containerAnimation: slide, start: 'left 70%' });
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [horizontal]);

  if (horizontal) {
    return (
      <section ref={rootRef} className="bg-white border-t border-brand-border" id="case-studies">
        <div data-pin className="h-screen flex flex-col pt-24 pb-10 overflow-hidden">
          <SectionHeader align="left" className="w-full max-w-275 mx-auto px-6 flex items-end justify-between gap-10 shrink-0">
            <div className="flex flex-col items-end gap-5 shrink-0">
              <ViewAllLink />
              {/* Progress: one bar per case study */}
              <div className="flex gap-2" aria-hidden="true">
                {CASES.slice(0, FULL).map((item, idx) => (
                  <span key={item.id} className="block w-10 h-1 rounded-full bg-brand-border overflow-hidden">
                    <span
                      ref={(el) => { segmentRefs.current[idx] = el; }}
                      className="block h-full w-full bg-brand-yellow origin-left"
                      style={{ transform: `scaleX(${idx === 0 ? 1 : 0})` }}
                    />
                  </span>
                ))}
              </div>
            </div>
          </SectionHeader>

          <div className="relative flex-1 min-h-0 mt-8">
            <ol
              data-track
              className="list-none m-0 p-0 flex h-full gap-8 will-change-transform"
              style={{ paddingInline: `calc((100% - ${CARD_WIDTH}) / 2)` }}
            >
              {CASES.map((item, index) => (
                <CaseCard
                  key={item.id}
                  item={item}
                  index={index}
                  horizontal
                  blurred={index >= FULL}
                />
              ))}
            </ol>
            <ShowMore
              data-more
              hidden={CASES.length - FULL}
              className="absolute inset-y-0 right-0 z-20 w-[clamp(220px,20vw,300px)] opacity-0 pointer-events-none"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={rootRef} className="bg-white border-t border-brand-border py-20 md:py-28" id="case-studies">
      <div className="w-full max-w-275 mx-auto px-6">
        <SectionHeader className="mb-12 md:mb-16" />

        <ol className="list-none m-0 p-0">
          {CASES.slice(0, FULL + 1).map((item, index) => (
            <CaseCard
              key={item.id}
              item={item}
              index={index}
              blurred={index >= FULL}
              overlay={index === FULL ? <ShowMore hidden={CASES.length - FULL} /> : null}
            />
          ))}
        </ol>

        <div className="text-center mt-6 md:mt-4">
          <ViewAllLink />
        </div>
      </div>
    </section>
  );
}
