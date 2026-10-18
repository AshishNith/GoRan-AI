import { useLayoutEffect, useRef } from 'react';
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

const STACK_TOP = 96; // px from the top of the screen where the first card sticks
const STACK_STEP = 20; // px each later card sticks lower, so the stack stays visible

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

function CaseCard({ item, index }) {
  const data = caseStudiesData[item.id];
  if (!data) return null;
  const flip = index % 2 === 1;
  const topOffset = STACK_TOP + index * STACK_STEP;

  return (
    <li
      data-case
      className="md:sticky md:top-[var(--stack-top)] md:h-[540px] mb-5 md:mb-14"
      style={{ '--stack-top': `${topOffset}px` }}
    >
      <div data-card className="group/card relative h-full origin-top">
        <article
          className="relative h-full overflow-hidden rounded-3xl text-white grid grid-cols-1 md:grid-cols-[1.02fr_1fr]"
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
              data-metric={item.metric}
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

          {/* Darkens the card as the next one slides over it */}
          <div data-dim aria-hidden className="absolute inset-0 rounded-3xl bg-black opacity-0 pointer-events-none" />
        </article>
      </div>
    </li>
  );
}

export default function CaseStudiesSection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    // The headline numbers count up the first time each card comes into view
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      root.querySelectorAll('[data-metric]').forEach((el) => {
        const { value, decimals, suffix } = parseMetric(el.dataset.metric);
        const counter = { v: 0 };
        el.textContent = formatMetric(0, decimals, suffix);
        gsap.to(counter, {
          v: value,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = formatMetric(counter.v, decimals, suffix); },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
    });

    // Desktop: each card shrinks back and dims as the next one slides up over it
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const items = root.querySelectorAll('[data-case]');
      items.forEach((item, i) => {
        const next = items[i + 1];
        if (!next) return;
        const card = item.querySelector('[data-card]');
        const dim = item.querySelector('[data-dim]');
        const scrollTrigger = {
          trigger: next,
          start: 'top bottom',
          end: `top ${STACK_TOP + (i + 1) * STACK_STEP}px`,
          scrub: true,
        };
        gsap.to(card, { scale: 0.94, ease: 'none', scrollTrigger });
        gsap.to(dim, { opacity: 0.45, ease: 'none', scrollTrigger });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-white border-t border-brand-border py-20 md:py-28" id="case-studies">
      <div className="w-full max-w-275 mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-text-muted">Our past work</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-[1.1] mt-3 mb-0 text-balance">
            Real stories. Real <span className="text-brand-yellow">business growth</span>
          </h2>
          <p className="text-brand-text-muted text-base md:text-lg leading-relaxed max-w-[520px] mx-auto mt-4 mb-0">
            Custom AI tools that solve actual operational headaches. Here is what we have delivered.
          </p>
        </div>

        <ol className="list-none m-0 p-0">
          {CASES.map((item, index) => (
            <CaseCard key={item.id} item={item} index={index} />
          ))}
        </ol>

        <div className="text-center mt-6 md:mt-4">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-semibold text-sm py-3 px-6 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-md"
          >
            View all case studies <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
